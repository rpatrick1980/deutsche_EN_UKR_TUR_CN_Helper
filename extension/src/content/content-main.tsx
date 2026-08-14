import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { Panel, Card } from './Panel'
import { PANEL_STYLES } from './panel-styles'
import { getSelectedText, extractFromElement, validateText } from '../services/textExtraction'
import { getSettings, saveSettings, addHistory, getHistory, clearHistory } from '../services/storage'
import {
  ActionType,
  LookupResult,
  OpenAIResponseMessage,
  RunActionMessage,
  Settings,
  TargetLanguage,
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

const ERROR_COPY: Record<string, string> = {
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

class PanelController {
  private host: HTMLDivElement | null = null
  private root: Root | null = null
  private settings: Settings | null = null

  private state = {
    open: false,
    collapsed: false,
    mode: 'expanded' as 'compact' | 'expanded',
    theme: 'light' as 'light' | 'dark',
    widthPct: 25,
    cards: [] as Card[],
    history: [] as LookupResult[],
    historyOpen: true,
  }

  private async ensureMounted() {
    this.settings = await getSettings()
    this.state.theme = this.settings.darkMode ? 'dark' : 'light'
    this.state.widthPct = this.settings.panelWidthPct
    this.state.mode = this.settings.panelMode
    this.state.history = await getHistory()

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

  private applyPushContent() {
    if (!this.settings?.pushContent) return
    document.documentElement.style.transition = 'margin-right 0.28s ease'
    const width = this.state.mode === 'compact' ? '300px' : `${this.state.widthPct}vw`
    document.documentElement.style.marginRight =
      this.state.open && !this.state.collapsed ? width : ''
  }

  private render() {
    if (!this.root) return
    if (!this.state.open) {
      this.root.render(<></>)
      if (this.host) this.host.style.display = 'none'
      document.documentElement.style.marginRight = ''
      return
    }
    if (this.host) this.host.style.display = ''
    this.applyPushContent()
    this.root.render(
      <Panel
        theme={this.state.theme}
        collapsed={this.state.collapsed}
        mode={this.state.mode}
        widthPct={this.state.widthPct}
        cards={this.state.cards}
        history={this.state.history}
        historyOpen={this.state.historyOpen}
        onClose={() => {
          this.state.open = false
          this.render()
        }}
        onToggleCollapse={() => {
          this.state.collapsed = !this.state.collapsed
          this.render()
        }}
        onToggleMode={() => {
          this.state.mode = this.state.mode === 'compact' ? 'expanded' : 'compact'
          if (this.settings) {
            this.settings.panelMode = this.state.mode
            saveSettings(this.settings)
          }
          this.render()
        }}
        onToggleHistory={() => {
          this.state.historyOpen = !this.state.historyOpen
          this.render()
        }}
        onPinCard={(id) => {
          const c = this.state.cards.find((x) => x.id === id)
          if (c) c.pinned = !c.pinned
          this.render()
        }}
        onCloseCard={(id) => {
          this.state.cards = this.state.cards.filter((x) => x.id !== id)
          this.render()
        }}
        onOpenHistory={(item) => this.openFromHistory(item)}
        onClearHistory={async () => {
          await clearHistory()
          this.state.history = []
          this.render()
        }}
        onOpenSettings={() => chrome.runtime.sendMessage({ type: 'OPEN_OPTIONS' })}
      />
    )
  }

  private enabledLanguages(): TargetLanguage[] {
    const en = this.settings?.enabledLanguages
    return ALL_LANGUAGES.filter((l) => en?.[l])
  }

  private openFromHistory(item: LookupResult) {
    const card: Card = {
      id: `card_${Date.now()}`,
      action: item.action,
      sourceText: item.sourceText,
      languages: item.languages,
      status: 'result',
      translations: item.translations,
      explanation: item.explanation,
      pinned: false,
      ts: item.ts,
    }
    this.addCard(card)
    this.render()
  }

  private addCard(card: Card) {
    // Replace the single existing unpinned live card; keep pinned cards.
    this.state.cards = this.state.cards.filter((c) => c.pinned)
    this.state.cards.unshift(card)
  }

  async run(action: ActionType, selectionText: string) {
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
      action,
      sourceText: text || '(no text found)',
      languages,
      status: 'loading',
      pinned: false,
      ts: Date.now(),
    }
    this.addCard(card)
    this.render()

    // Fallback extraction failed entirely.
    if (!text) {
      card.status = 'error'
      card.reason = fallbackReason || ERROR_COPY.NO_API_KEY
      this.render()
      return
    }

    // Local validation (German-only, length, quality).
    const valid = validateText(text)
    card.sourceText = valid.text
    if (!valid.ok) {
      card.status = 'error'
      card.reason = valid.reason
      this.render()
      return
    }

    if (action === 'translate' && languages.length === 0) {
      card.status = 'error'
      card.reason = ERROR_COPY.NO_LANG
      this.render()
      return
    }

    // Ask background to call OpenAI (keeps key + fetch out of the page).
    const response: OpenAIResponseMessage = await chrome.runtime.sendMessage({
      type: 'OPENAI_REQUEST',
      action,
      text: valid.text,
      languages,
    })

    if (!response?.ok) {
      card.status = 'error'
      card.reason = ERROR_COPY[response?.error ?? 'NETWORK'] || 'Something went wrong. Please try again.'
      this.render()
      return
    }

    card.status = 'result'
    card.translations = response.translations
    card.explanation = response.explanation
    this.render()

    // Persist to history.
    const entry: LookupResult = {
      id: card.id,
      ts: card.ts,
      action,
      sourceText: valid.text,
      languages,
      translations: response.translations,
      explanation: response.explanation,
    }
    this.state.history = await addHistory(entry)
    this.render()
  }
}

const controller = new PanelController()

chrome.runtime.onMessage.addListener((message: RunActionMessage) => {
  if (message?.type === 'RUN_ACTION') {
    controller.run(message.action, message.selectionText)
  }
})
