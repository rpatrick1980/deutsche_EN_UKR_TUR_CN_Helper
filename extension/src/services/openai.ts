// AI service layer. v1 calls OpenAI directly from the background service worker
// using the user's own API key. This is isolated here so a FastAPI proxy can be
// dropped in later by only changing the endpoint + auth (see PROXY note below).
import { ActionType, TargetLanguage, OpenAIResponseMessage } from '../shared/types'
import { buildGrammarMessages, buildTranslationMessages } from './prompts'
import { getSettings } from './storage'

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
const REQUEST_TIMEOUT_MS = 30000

// PROXY: to harden for the Web Store, point this at your FastAPI proxy instead
// (e.g. `${PROXY_URL}/api/ai`) and send the action/text/languages payload; drop
// the Authorization header. The rest of the extension stays unchanged.

interface CallArgs {
  action: ActionType
  text: string
  languages: TargetLanguage[]
}

export async function callOpenAI({ action, text, languages }: CallArgs): Promise<OpenAIResponseMessage> {
  const settings = await getSettings()

  if (!settings.apiKey) {
    return { ok: false, error: 'NO_API_KEY' }
  }

  const messages =
    action === 'translate'
      ? buildTranslationMessages(text, languages)
      : buildGrammarMessages(text)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const res = await fetch(OPENAI_ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        temperature: 0.2,
        response_format: { type: 'json_object' },
        messages,
      }),
    })

    if (!res.ok) {
      if (res.status === 401) return { ok: false, error: 'INVALID_API_KEY' }
      if (res.status === 429) return { ok: false, error: 'RATE_LIMIT' }
      const body = await res.text()
      return { ok: false, error: `HTTP_${res.status}`, ...(body ? {} : {}) }
    }

    const data = await res.json()
    const content: string = data?.choices?.[0]?.message?.content ?? ''
    let parsed: any
    try {
      parsed = JSON.parse(content)
    } catch {
      return { ok: false, error: 'BAD_RESPONSE' }
    }

    if (parsed?.error === 'NOT_GERMAN') {
      return { ok: false, error: 'NOT_GERMAN' }
    }

    if (action === 'translate') {
      return { ok: true, translations: parsed?.translations ?? {} }
    }
    return { ok: true, explanation: parsed?.explanation ?? '' }
  } catch (err: any) {
    if (err?.name === 'AbortError') return { ok: false, error: 'TIMEOUT' }
    return { ok: false, error: 'NETWORK' }
  } finally {
    clearTimeout(timeout)
  }
}
