// AI service layer. v1 calls OpenAI directly from the background service worker
// using the user's own API key. Isolated here so a FastAPI proxy can be dropped
// in later by only changing the endpoints + auth.
import {
  ChatRequestMessage,
  ChatResponseMessage,
  LookupMode,
  LookupResponseMessage,
  TargetLanguage,
  TtsResponseMessage,
} from '../shared/types'
import { TTS_MAX_CHARS, TTS_VOICE } from '../shared/constants'
import { buildChatMessages, buildLookupMessages } from './prompts'
import { getSettings } from './storage'

const CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
const TTS_ENDPOINT = 'https://api.openai.com/v1/audio/speech'
const REQUEST_TIMEOUT_MS = 30000

type Fail = { ok: false; error: string }

async function post(endpoint: string, apiKey: string, body: unknown): Promise<Response | Fail> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      if (res.status === 401) return { ok: false, error: 'INVALID_API_KEY' }
      if (res.status === 429) return { ok: false, error: 'RATE_LIMIT' }
      return { ok: false, error: `HTTP_${res.status}` }
    }
    return res
  } catch (err: any) {
    if (err?.name === 'AbortError') return { ok: false, error: 'TIMEOUT' }
    return { ok: false, error: 'NETWORK' }
  } finally {
    clearTimeout(timeout)
  }
}

function isFail(r: Response | Fail): r is Fail {
  return (r as Fail).ok === false
}

interface LookupArgs {
  mode: LookupMode
  text: string
  languages: TargetLanguage[]
}

export async function lookup({ mode, text, languages }: LookupArgs): Promise<LookupResponseMessage> {
  const settings = await getSettings()
  if (!settings.apiKey) return { ok: false, error: 'NO_API_KEY' }

  const res = await post(CHAT_ENDPOINT, settings.apiKey, {
    model: settings.model,
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: buildLookupMessages(text, languages, mode),
  })
  if (isFail(res)) return res

  const data = await res.json()
  const content: string = data?.choices?.[0]?.message?.content ?? ''
  let parsed: any
  try {
    parsed = JSON.parse(content)
  } catch {
    return { ok: false, error: 'BAD_RESPONSE' }
  }
  if (parsed?.error === 'NOT_GERMAN') return { ok: false, error: 'NOT_GERMAN' }

  const entry = mode === 'word' && parsed?.entry ? normalizeEntry(parsed.entry) : undefined
  return { ok: true, translations: parsed?.translations ?? {}, entry }
}

function normalizeEntry(raw: any) {
  const arr = (v: unknown) => (Array.isArray(v) ? v.map(String).filter(Boolean) : [])
  return {
    lemma: String(raw.lemma ?? ''),
    wordType: String(raw.wordType ?? ''),
    article: raw.article || null,
    plural: raw.plural || null,
    inflection: raw.inflection || null,
    forms: raw.forms || null,
    notes: arr(raw.notes),
    examples: arr(raw.examples).slice(0, 3),
  }
}

export async function chat(msg: ChatRequestMessage): Promise<ChatResponseMessage> {
  const settings = await getSettings()
  if (!settings.apiKey) return { ok: false, error: 'NO_API_KEY' }

  const res = await post(CHAT_ENDPOINT, settings.apiKey, {
    model: settings.model,
    temperature: 0.4,
    messages: buildChatMessages(msg.sourceText, msg.translations, msg.entry, msg.messages),
  })
  if (isFail(res)) return res

  const data = await res.json()
  const reply: string = (data?.choices?.[0]?.message?.content ?? '').trim()
  if (!reply) return { ok: false, error: 'BAD_RESPONSE' }
  return { ok: true, reply }
}

export async function speak(text: string): Promise<TtsResponseMessage> {
  const settings = await getSettings()
  if (!settings.apiKey) return { ok: false, error: 'NO_API_KEY' }

  const res = await post(TTS_ENDPOINT, settings.apiKey, {
    model: settings.ttsModel,
    voice: TTS_VOICE,
    input: text.slice(0, TTS_MAX_CHARS),
    response_format: 'mp3',
  })
  if (isFail(res)) return res

  const bytes = new Uint8Array(await res.arrayBuffer())
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return { ok: true, audio: btoa(bin) }
}
