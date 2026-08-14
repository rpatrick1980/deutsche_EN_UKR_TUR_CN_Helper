import React from 'react'
import { ActionType, LookupResult, TargetLanguage } from '../shared/types'

export interface Card {
  id: string
  action: ActionType
  sourceText: string
  languages: TargetLanguage[]
  status: 'loading' | 'error' | 'result'
  reason?: string
  translations?: Partial<Record<TargetLanguage, string>>
  explanation?: string
  pinned: boolean
  ts: number
}

export interface PanelProps {
  theme: 'light' | 'dark'
  collapsed: boolean
  mode: 'compact' | 'expanded'
  width: number
  cards: Card[]
  history: LookupResult[]
  historyOpen: boolean
  onClose: () => void
  onToggleCollapse: () => void
  onToggleMode: () => void
  onResizeStart: (e: React.PointerEvent) => void
  onToggleHistory: () => void
  onPinCard: (id: string) => void
  onCloseCard: (id: string) => void
  onOpenHistory: (item: LookupResult) => void
  onClearHistory: () => void
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

function ExplanationView({ text }: { text: string }) {
  const lines = text
    .split('\n')
    .map((l) => l.replace(/^\s*[-•]\s?/, '').trim())
    .filter(Boolean)
  return (
    <div className="grh-explain" data-testid="grammar-explanation">
      <ul>
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

function CardView({
  card,
  onPin,
  onClose,
}: {
  card: Card
  onPin: (id: string) => void
  onClose: (id: string) => void
}) {
  return (
    <div className="grh-card" data-testid={`card-${card.action}`}>
      <div className="grh-card-head">
        <span className={`grh-pill ${card.action === 'grammar' ? 'grh-grammar' : ''}`}>
          {card.action === 'translate' ? 'Translate' : 'Grammar'}
        </span>
        <span className="grh-spacer" />
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

        {card.status === 'loading' && (
          <div className="grh-loading" data-testid="panel-loading">
            <span className="grh-spinner" />
            {card.action === 'translate' ? 'Translating…' : 'Analysing grammar…'}
          </div>
        )}

        {card.status === 'error' && <ErrorBlock reason={card.reason} />}

        {card.status === 'result' && card.action === 'translate' && (
          <div data-testid="translation-result">
            {card.languages.map((lang) => (
              <div className="grh-lang-row" key={lang}>
                <div className="grh-lang-label">{lang}</div>
                <div className="grh-lang-text">
                  {card.translations?.[lang] ?? '—'}
                </div>
              </div>
            ))}
          </div>
        )}

        {card.status === 'result' && card.action === 'grammar' && (
          <ExplanationView text={card.explanation ?? ''} />
        )}
      </div>
    </div>
  )
}

export function Panel(props: PanelProps) {
  const {
    theme,
    collapsed,
    mode,
    width,
    cards,
    history,
    historyOpen,
  } = props

  const compact = mode === 'compact'

  if (collapsed) {
    return (
      <div className="grh-root grh-collapsed" data-theme={theme} data-testid="grh-panel">
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

      <div className="grh-body">
        {cards.length === 0 ? (
          <div className="grh-empty" data-testid="panel-empty">
            <span className="grh-emoji">📖</span>
            Select German text on the page, then right-click and choose
            <b> Translate</b> or <b> Explain Grammar</b>.
          </div>
        ) : (
          cards.map((c) => (
            <CardView
              key={c.id}
              card={c}
              onPin={props.onPinCard}
              onClose={props.onCloseCard}
            />
          ))
        )}
      </div>

      <div className="grh-history" data-testid="panel-history">
        <div className="grh-hist-head" onClick={props.onToggleHistory} data-testid="history-toggle">
          <span>{historyOpen ? '▾' : '▸'}</span>
          <span>Recent ({history.length})</span>
          <span className="grh-spacer" />
          {history.length > 0 && (
            <button
              className="grh-linkbtn"
              data-testid="history-clear-button"
              onClick={(e) => {
                e.stopPropagation()
                props.onClearHistory()
              }}
            >
              Clear
            </button>
          )}
        </div>
        {historyOpen && (
          <div className="grh-hist-list">
            {history.length === 0 && (
              <div className="grh-empty" style={{ padding: '14px' }}>
                No lookups yet.
              </div>
            )}
            {history.map((h) => (
              <button
                key={h.id}
                className="grh-hist-item"
                data-testid="history-item"
                onClick={() => props.onOpenHistory(h)}
              >
                <div className="grh-hist-meta">
                  {h.action === 'translate' ? 'Translate' : 'Grammar'} ·{' '}
                  {new Date(h.ts).toLocaleDateString()}
                </div>
                <div className="grh-hist-text">{h.sourceText}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
