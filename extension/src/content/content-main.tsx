import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Panel, Card } from './Panel'
import { PANEL_STYLES } from './panel-styles'
import { getSelectedText, extractFromElement, validateText } from '../services/textExtraction'
import { detectLookupMode } from '../services/prompts'
import { getSettings, saveSettings } from '../services/storage'
import {
  ChatResponseMessage,
  LookupResponseMessage,
  RunActionMessage,
  Settings,
  TargetLanguage,
  TtsResponseMessage,
  ALL_LANGUAGES,
} from '../shared/types'

// Track the element under the last right-click (best-effort fallback source).
let lastTarget: Element | null = null
document.addEventListener(
  'contextmenu',
  (e) => {
    lastTarget = e.target as Element | null
  },
  true
)

export const ERROR_COPY: Record<string, string> = {
  NO_API_KEY:
    'No OpenAI API key set. Open Settings (gear icon) and paste your key to start.',
  INVALID_API_KEY: 'Your OpenAI API key was rejected. Please check it in Settings.',
  RATE_LIMIT: 'OpenAI is rate-limiting or out of quota right now. Please wait a moment and try again.',
  TIMEOUT: 'The request timed out. Please check your connection and try again.',
  NETWORK: 'Network error reaching OpenAI. Please try again.',
  BAD_RESPONSE: 'The AI returned an unexpected response. Please try again.',
  NOT_GERMAN: 'The AI could not read this as German. This tool only supports German source text.',
  NO_LANG: 'No target languages are enabled. Open Settings and enable at least one language.',
}

const errorText = (code?: string) =>
  ERROR_COPY[code ?? 'NETWORK'] || 'Something went wrong. Please try again.'

class PanelController {
  private host: HTMLDivElement | null = null
  private root: Root | null = null
  private settings: Settings | null = null
  private audio: HTMLAudioElement | null = null

  private state = {
    open: false,
    collapsed: false,
    mode: 'expanded' as 'compact' | 'expanded',
    theme: 'light' as 'light' | 'dark',
    widthPct: 25,
    widthPx: 380,
    cards: [] as Card[],
    resizing: false,
  }

  private async ensureMounted() {
    this.settings = await getSettings()
    this.state.theme = this.settings.darkMode ? 'dark' : 'light'
    this.state.widthPct = this.settings.panelWidthPct
    this.state.widthPx = this.clampWidth(
      Math.round((window.innerWidth * this.settings.panelWidthPct) / 100)
    )
    this.state.mode = this.settings.panelMode

    if (this.host) return

    const host = document.createElement('div')
    host.id = 'grh-panel-host'
    host.style.all = 'initial'
    const shadow = host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = PANEL_STYLES
    shadow.appendChild(style)
    const mount = document.createElement('div')
    shadow.appendChild(mount)
    document.documentElement.appendChild(host)
    this.host = host
    this.root = createRoot(mount)
  }

  private clampWidth(px: number): number {
    const max = Math.min(760, Math.round(window.innerWidth * 0.8))
    return Math.max(320, Math.min(max, px))
  }

  private setResizing(on: boolean) {
    const root = this.host?.shadowRoot?.querySelector('.grh-root') as HTMLElement | null
    root?.classList.toggle('grh-resizing', on)
  }

  private startResize = (e: React.PointerEvent) => {
    e.preventDefault()
    this.state.resizing = true
    this.setResizing(true)
    const prevUserSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'ew-resize'

    const onMove = (ev: PointerEvent) => {
      this.state.widthPx = this.clampWidth(window.innerWidth - ev.clientX)
      this.render()
    }
    const onUp = () => {
      this.state.resizing = false
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.body.style.userSelect = prevUserSelect
      document.body.style.cursor = ''
      this.setResizing(false)
      if (this.settings) {
        this.settings.panelWidthPct = Math.round((this.state.widthPx / window.innerWidth) * 100)
        this.state.widthPct = this.settings.panelWidthPct
        saveSettings(this.settings)
      }
      this.render()
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  private applyPushContent() {
    if (!this.settings?.pushContent) return
    document.documentElement.style.transition = 'margin-right 0.28s ease'
    const width = this.state.collapsed
      ? '46px'
      : this.state.mode === 'compact'
      ? '300px'
      : `${this.state.widthPx}px`
    document.documentElement.style.marginRight = this.state.open ? width : ''
  }

  private render() {
    if (!this.root) return
    if (!this.state.open) {
      this.root.render(<></>)
      if (this.host) this.host.style.display = 'none'
      document.documentElement.style.marginRight = ''
      this.stopAudio()
      return
    }
    if (this.host) this.host.style.display = ''
    this.applyPushContent()
    this.root.render(
      <Panel
        theme={this.state.theme}
        collapsed={this.state.collapsed}
        mode={this.state.mode}
        width={this.state.widthPx}
        cards={this.state.cards}
        onClose={() => {
          this.state.open = false
          this.render()
        }}
        onToggleCollapse={() => {
          this.state.collapsed = !this.state.collapsed
          this.render()
        }}
        onResizeStart={this.startResize}
        onToggleMode={() => {
          this.state.mode = this.state.mode === 'compact' ? 'expanded' : 'compact'
          if (this.settings) {
            this.settings.panelMode = this.state.mode
            saveSettings(this.settings)
          }
          this.render()
        }}
        onPinCard={(id) => {
          const c = this.state.cards.find((x) => x.id === id)
          if (c) c.pinned = !c.pinned
          this.render()
        }}
        onCloseCard={(id) => {
          const c = this.state.cards.find((x) => x.id === id)
          if (c?.speaking) this.stopAudio()
          this.state.cards = this.state.cards.filter((x) => x.id !== id)
          this.render()
        }}
        onSendChat={(id, text) => this.sendChat(id, text)}
        onSpeak={(id) => this.speak(id)}
        onOpenSettings={() => chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' })}
      />
    )
  }

  private enabledLanguages(): TargetLanguage[] {
    const en = this.settings?.enabledLanguages
    return ALL_LANGUAGES.filter((l) => en?.[l])
  }

  private addCard(card: Card) {
    // Replace the single existing unpinned live card; keep pinned cards.
    const replaced = this.state.cards.find((c) => !c.pinned)
    if (replaced?.speaking) this.stopAudio()
    this.state.cards = this.state.cards.filter((c) => c.pinned)
    this.state.cards.unshift(card)
  }

  private stopAudio() {
    if (this.audio) {
      this.audio.pause()
      this.audio = null
    }
    this.state.cards.forEach((c) => (c.speaking = false))
  }

  private async speak(id: string) {
    const card = this.state.cards.find((c) => c.id === id)
    if (!card) return
    if (card.speaking) {
      this.stopAudio()
      this.render()
      return
    }
    this.stopAudio()

    if (!card.audio) {
      card.ttsStatus = 'loading'
      card.ttsError = undefined
      this.render()
      const res: TtsResponseMessage = await chrome.runtime.sendMessage({
        type: 'TTS_REQUEST',
        text: card.sourceText,
      })
      if (!res?.ok || !res.audio) {
        card.ttsStatus = 'error'
        card.ttsError = errorText(res?.error)
        this.render()
        return
      }
      card.audio = res.audio
    }
    card.ttsStatus = 'idle'

    const audio = new Audio(`data:audio/mpeg;base64,${card.audio}`)
    this.audio = audio
    card.speaking = true
    this.render()
    const done = () => {
      if (this.audio === audio) this.audio = null
      card.speaking = false
      this.render()
    }
    audio.onended = done
    audio.onerror = () => {
      card.ttsStatus = 'error'
      card.ttsError = 'Could not play the audio. Please try again.'
      done()
    }
    audio.play().catch(() => {
      card.ttsStatus = 'error'
      card.ttsError = 'Playback was blocked by the browser. Click the speaker again.'
      done()
    })
  }

  private async sendChat(id: string, text: string) {
    const card = this.state.cards.find((c) => c.id === id)
    const question = text.trim()
    if (!card || !question || card.chatStatus === 'loading') return

    card.chat.push({ role: 'user', content: question })
    card.chatStatus = 'loading'
    this.render()

    const res: ChatResponseMessage = await chrome.runtime.sendMessage({
      type: 'CHAT_REQUEST',
      sourceText: card.sourceText,
      translations: card.translations,
      entry: card.entry,
      messages: card.chat,
    })

    if (res?.ok && res.reply) {
      card.chat.push({ role: 'assistant', content: res.reply })
    } else {
      card.chat.push({ role: 'assistant', content: errorText(res?.error), error: true })
    }
    card.chatStatus = 'idle'
    this.render()
  }

  async run(selectionText: string) {
    await this.ensureMounted()
    this.state.open = true
    this.state.collapsed = false

    // Resolve source text: explicit selection > live selection > element fallback.
    let text = selectionText || getSelectedText()
    let fallbackReason: string | undefined
    if (!text) {
      const outcome = extractFromElement(lastTarget)
      if (outcome.text) text = outcome.text
      else fallbackReason = outcome.reason
    }

    const languages = this.enabledLanguages()

    const card: Card = {
      id: `card_${Date.now()}`,
      mode: detectLookupMode(text || ''),
      sourceText: text || '(no text found)',
      languages,
      status: 'loading',
      pinned: false,
      chat: [],
      chatStatus: 'idle',
      ttsStatus: 'idle',
      speaking: false,
      ts: Date.now(),
    }
    this.addCard(card)
    this.render()

    if (!text) {
      card.status = 'error'
      card.reason = fallbackReason || ERROR_COPY.NO_API_KEY
      this.render()
      return
    }

    const valid = validateText(text)
    card.sourceText = valid.text
    card.mode = detectLookupMode(valid.text)
    if (!valid.ok) {
      card.status = 'error'
      card.reason = valid.reason
      this.render()
      return
    }

    if (languages.length === 0) {
      card.status = 'error'
      card.reason = ERROR_COPY.NO_LANG
      this.render()
      return
    }

    // Ask background to call OpenAI (keeps key + fetch out of the page).
    const response: LookupResponseMessage = await chrome.runtime.sendMessage({
      type: 'LOOKUP_REQUEST',
      mode: card.mode,
      text: valid.text,
      languages,
    })

    if (!response?.ok) {
      card.status = 'error'
      card.reason = errorText(response?.error)
      this.render()
      return
    }

    card.status = 'result'
    card.translations = response.translations
    card.entry = response.entry
    this.render()
  }
}

const controller = new PanelController()

chrome.runtime.onMessage.addListener((message: RunActionMessage, _sender, sendResponse) => {
  if (message?.type === 'RUN_ACTION') {
    sendResponse({ received: true })
    controller.run(message.selectionText)
  }
})
