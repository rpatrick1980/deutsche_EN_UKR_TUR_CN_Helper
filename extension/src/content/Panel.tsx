import React, { useState } from 'react'
import { ChatMessage, DictionaryEntry, LookupMode, TargetLanguage, Translations } from '../shared/types'

export interface Card {
  id: string
  mode: LookupMode
  sourceText: string
  languages: TargetLanguage[]
  status: 'loading' | 'error' | 'result'
  reason?: string
  translations?: Translations
  entry?: DictionaryEntry
  chat: ChatMessage[]
  chatStatus: 'idle' | 'loading'
  ttsStatus: 'idle' | 'loading' | 'error'
  ttsError?: string
  audio?: string
  speaking: boolean
  pinned: boolean
  ts: number
}

export interface PanelProps {
  theme: 'light' | 'dark'
  collapsed: boolean
  mode: 'compact' | 'expanded'
  width: number
  fontScale: number
  cards: Card[]
  onClose: () => void
  onToggleCollapse: () => void
  onToggleMode: () => void
  onResizeStart: (e: React.PointerEvent) => void
  onPinCard: (id: string) => void
  onCloseCard: (id: string) => void
  onSendChat: (id: string, text: string) => void
  onSpeak: (id: string) => void
  onOpenSettings: () => void
}

function ErrorBlock({ reason }: { reason?: string }) {
  return (
    <div className="grh-error" data-testid="panel-error">
      <b>Couldn't process this</b>
      {reason || 'Something went wrong. Please try again.'}
    </div>
  )
}

function TranslationsView({ card }: { card: Card }) {
  return (
    <div data-testid="translation-result">
      {card.languages.map((lang) => (
        <div className="grh-lang-row" key={lang}>
          <div className="grh-lang-label">{lang}</div>
          <div className="grh-lang-text">{card.translations?.[lang] ?? '—'}</div>
        </div>
      ))}
    </div>
  )
}

function DictionaryView({ entry }: { entry: DictionaryEntry }) {
  const meta = [entry.wordType, entry.inflection].filter(Boolean).join(' · ')
  const facts: [string, string | null | undefined][] = [
    ['Artikel', entry.article],
    ['Plural', entry.plural],
    ['Formen', entry.forms],
  ]
  return (
    <div className="grh-dict" data-testid="dictionary-entry">
      <div className="grh-dict-head">
        <span className="grh-dict-lemma" data-testid="dictionary-lemma">{entry.lemma}</span>
        {meta && <span className="grh-dict-meta">{meta}</span>}
      </div>
      <dl className="grh-dict-facts">
        {facts
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <React.Fragment key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </React.Fragment>
          ))}
      </dl>
      {entry.notes.length > 0 && (
        <ul className="grh-dict-notes" data-testid="dictionary-notes">
          {entry.notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
      {entry.examples.length > 0 && (
        <div className="grh-dict-examples" data-testid="dictionary-examples">
          <div className="grh-lang-label">Beispiele</div>
          <ol>
            {entry.examples.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

function ChatBox({ card, onSend }: { card: Card; onSend: (text: string) => void }) {
  const [draft, setDraft] = useState('')
  const busy = card.chatStatus === 'loading'
  const submit = () => {
    if (!draft.trim() || busy) return
    onSend(draft)
    setDraft('')
  }
  return (
    <div className="grh-chat" data-testid="chat-box">
      <div className="grh-lang-label">Nachfragen</div>
      {card.chat.length > 0 && (
        <div className="grh-chat-log" data-testid="chat-log">
          {card.chat.map((m, i) => (
            <div
              key={i}
              className={`grh-msg grh-msg-${m.role}${m.error ? ' grh-msg-error' : ''}`}
              data-testid={`chat-message-${m.role}`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="grh-msg grh-msg-assistant grh-msg-typing" data-testid="chat-typing">
              <span className="grh-spinner" /> Denkt nach…
            </div>
          )}
        </div>
      )}
      <div className="grh-chat-row">
        <input
          className="grh-chat-input"
          placeholder="Frag die KI zu diesem Text…"
          value={draft}
          disabled={busy}
          data-testid="chat-input"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            }
          }}
        />
        <button
          className="grh-chat-send"
          title="Send"
          disabled={busy || !draft.trim()}
          data-testid="chat-send-button"
          onClick={submit}
        >
          ➤
        </button>
      </div>
    </div>
  )
}

function SpeakButton({ card, onSpeak }: { card: Card; onSpeak: () => void }) {
  const loading = card.ttsStatus === 'loading'
  return (
    <button
      className={`grh-iconbtn${card.speaking ? ' grh-active' : ''}`}
      title={card.speaking ? 'Stop' : 'Play pronunciation'}
      data-testid="card-speak-button"
      disabled={loading}
      onClick={onSpeak}
    >
      {loading ? <span className="grh-spinner grh-spinner-sm" /> : card.speaking ? '■' : '🔊'}
    </button>
  )
}

function CardView({
  card,
  onPin,
  onClose,
  onSendChat,
  onSpeak,
}: {
  card: Card
  onPin: (id: string) => void
  onClose: (id: string) => void
  onSendChat: (id: string, text: string) => void
  onSpeak: (id: string) => void
}) {
  const ready = card.status === 'result'
  return (
    <div className="grh-card" data-testid={`card-${card.mode}`}>
      <div className="grh-card-head">
        <span className={`grh-pill ${card.mode === 'word' ? 'grh-grammar' : ''}`}>
          {card.mode === 'word' ? 'Wort' : 'Text'}
        </span>
        <span className="grh-spacer" />
        {ready && <SpeakButton card={card} onSpeak={() => onSpeak(card.id)} />}
        <button
          className="grh-iconbtn"
          title={card.pinned ? 'Unpin' : 'Pin this result'}
          data-testid="card-pin-button"
          onClick={() => onPin(card.id)}
        >
          {card.pinned ? '📌' : '📍'}
        </button>
        <button
          className="grh-iconbtn"
          title="Dismiss"
          data-testid="card-close-button"
          onClick={() => onClose(card.id)}
        >
          ✕
        </button>
      </div>
      <div className="grh-card-body">
        <div className="grh-source" title={card.sourceText}>
          {card.sourceText}
        </div>
        {card.ttsError && (
          <div className="grh-tts-error" data-testid="tts-error">{card.ttsError}</div>
        )}

        {card.status === 'loading' && (
          <div className="grh-loading" data-testid="panel-loading">
            <span className="grh-spinner" />
            Translating & explaining…
          </div>
        )}

        {card.status === 'error' && <ErrorBlock reason={card.reason} />}

        {ready && <TranslationsView card={card} />}
        {ready && card.entry && <DictionaryView entry={card.entry} />}
        {ready && <ChatBox card={card} onSend={(t) => onSendChat(card.id, t)} />}
      </div>
    </div>
  )
}

export function Panel(props: PanelProps) {
  const { theme, collapsed, mode, width, cards, fontScale } = props
  const compact = mode === 'compact'
  const scaleVar = { '--grh-fs': fontScale / 100 } as React.CSSProperties

  if (collapsed) {
    return (
      <div className="grh-root grh-collapsed" data-theme={theme} data-testid="grh-panel" style={scaleVar}>
        <button
          className="grh-reopen"
          title="Expand German Reading Helper"
          data-testid="panel-collapse-button"
          onClick={props.onToggleCollapse}
        >
          <span className="grh-dot">ä</span>
          <span className="grh-reopen-label">German Reading Helper</span>
          <span className="grh-reopen-chevron">‹</span>
        </button>
      </div>
    )
  }

  const dims = {
    width: compact ? 300 : width,
    minWidth: compact ? 260 : 320,
    maxWidth: compact ? 320 : 760,
    ...scaleVar,
  }

  return (
    <div
      className={`grh-root${compact ? ' grh-compact' : ''}`}
      data-theme={theme}
      data-testid="grh-panel"
      style={dims}
    >
      {!compact && (
        <div
          className="grh-resize"
          data-testid="panel-resize-handle"
          title="Drag to resize"
          onPointerDown={props.onResizeStart}
        />
      )}
      <div className="grh-header">
        <div className="grh-brand">
          <span className="grh-dot">ä</span>
          <span className="grh-brand-name">German Reading Helper</span>
        </div>
        <span className="grh-spacer" />
        <button
          className="grh-iconbtn"
          title={compact ? 'Switch to expanded mode' : 'Switch to compact mode'}
          data-testid="panel-mode-button"
          onClick={props.onToggleMode}
        >
          {compact ? '⤢' : '⤡'}
        </button>
        <button
          className="grh-iconbtn"
          title="Settings"
          data-testid="panel-settings-button"
          onClick={props.onOpenSettings}
        >
          ⚙
        </button>
        <button
          className="grh-iconbtn"
          title="Collapse to side"
          data-testid="panel-collapse-button"
          onClick={props.onToggleCollapse}
        >
          ›
        </button>
        <button
          className="grh-iconbtn"
          title="Close"
          data-testid="panel-close-button"
          onClick={props.onClose}
        >
          ✕
        </button>
      </div>

      <div className="grh-body" data-testid="panel-body">
        {cards.length === 0 ? (
          <div className="grh-empty" data-testid="panel-empty">
            <span className="grh-emoji">📖</span>
            Select German text on the page, then right-click and choose
            <b> Translate and Explain</b>.
          </div>
        ) : (
          cards.map((c) => (
            <CardView
              key={c.id}
              card={c}
              onPin={props.onPinCard}
              onClose={props.onCloseCard}
              onSendChat={props.onSendChat}
              onSpeak={props.onSpeak}
            />
          ))
        )}
      </div>
    </div>
  )
}
