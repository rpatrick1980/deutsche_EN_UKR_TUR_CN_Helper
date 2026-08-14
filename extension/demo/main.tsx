import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Panel, Card } from '../src/content/Panel'
import { PANEL_STYLES } from '../src/content/panel-styles'
import { LookupResult } from '../src/shared/types'

const initialTheme = location.hash.includes('dark') ? 'dark' : 'light'
const initialMode = location.hash.includes('compact') ? 'compact' : 'expanded'

const host = document.createElement('div')
const shadow = host.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = PANEL_STYLES
shadow.appendChild(style)
const mount = document.createElement('div')
shadow.appendChild(mount)
document.body.appendChild(host)

const baseCards: Card[] = [
  {
    id: 'c1',
    action: 'translate',
    sourceText: 'Der Rhein ist einer der längsten Flüsse Europas.',
    languages: ['English', 'Ukrainian', 'Turkish', 'Chinese'],
    status: 'result',
    pinned: true,
    ts: Date.now(),
    translations: {
      English: 'The Rhine is one of the longest rivers in Europe.',
      Ukrainian: 'Рейн — одна з найдовших річок Європи.',
      Turkish: 'Ren, Avrupa’nın en uzun nehirlerinden biridir.',
      Chinese: '莱茵河是欧洲最长的河流之一。',
    },
  },
  {
    id: 'c2',
    action: 'grammar',
    sourceText: 'kontrollierten',
    languages: [],
    status: 'result',
    pinned: false,
    ts: Date.now(),
    explanation:
      '- "kontrollierten" = verb, 3rd person plural, simple past (Präteritum)\n- Infinitive: kontrollieren (to control)\n- Weak verb: stem + -ten ending\n- Active voice, indicative mood\n- Subject here: "zahlreiche Fürsten" (many princes)',
  },
]

const history: LookupResult[] = [
  { id: 'h1', ts: Date.now() - 86400000, action: 'translate', sourceText: 'Viele Städte wurden an seinen Ufern gegründet.', languages: ['English'] },
  { id: 'h2', ts: Date.now() - 2 * 86400000, action: 'grammar', sourceText: 'erhoben', languages: [] },
]

const noop = () => {}

function Demo() {
  const [mode, setMode] = useState<'compact' | 'expanded'>(initialMode)
  const [historyOpen, setHistoryOpen] = useState(true)
  return (
    <Panel
      theme={initialTheme}
      collapsed={false}
      mode={mode}
      widthPct={25}
      cards={baseCards}
      history={history}
      historyOpen={historyOpen}
      onClose={noop}
      onToggleCollapse={noop}
      onToggleMode={() => setMode((m) => (m === 'compact' ? 'expanded' : 'compact'))}
      onToggleHistory={() => setHistoryOpen((v) => !v)}
      onPinCard={noop}
      onCloseCard={noop}
      onOpenHistory={noop}
      onClearHistory={noop}
      onOpenSettings={noop}
    />
  )
}

createRoot(mount).render(<Demo />)
