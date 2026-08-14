import React from 'react'
import { createRoot } from 'react-dom/client'
import { Panel, Card } from '../src/content/Panel'
import { PANEL_STYLES } from '../src/content/panel-styles'
import { LookupResult } from '../src/shared/types'

const theme = location.hash === '#dark' ? 'dark' : 'light'

const host = document.createElement('div')
const shadow = host.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = PANEL_STYLES
shadow.appendChild(style)
const mount = document.createElement('div')
shadow.appendChild(mount)
document.body.appendChild(host)

const cards: Card[] = [
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

createRoot(mount).render(
  <Panel
    theme={theme}
    collapsed={false}
    widthPct={25}
    cards={cards}
    history={history}
    historyOpen={true}
    onClose={noop}
    onToggleCollapse={noop}
    onToggleHistory={noop}
    onPinCard={noop}
    onCloseCard={noop}
    onOpenHistory={noop}
    onClearHistory={noop}
    onOpenSettings={noop}
  />
)
