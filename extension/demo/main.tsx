import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Panel, Card } from '../src/content/Panel'
import { PANEL_STYLES } from '../src/content/panel-styles'
import { LookupResult } from '../src/shared/types'

const params = new URLSearchParams(location.search)
const v = params.get('v') || ''
const initialTheme = v === 'dark' ? 'dark' : 'light'
const initialMode = v === 'compact' ? 'compact' : 'expanded'
const grammarOnly = v === 'grammar'
const longText = v === 'long'
const paragraph = v === 'paragraph'

const host = document.createElement('div')
const shadow = host.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = PANEL_STYLES
shadow.appendChild(style)
const mount = document.createElement('div')
shadow.appendChild(mount)
document.body.appendChild(host)

const translateCard: Card = {
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
    Chinese: '萊茵河是歐洲最長的河流之一。',
  },
}

const grammarCard: Card = {
  id: 'c2',
  action: 'grammar',
  sourceText: 'kontrollierten zahlreiche Fürsten den Handel',
  languages: [],
  status: 'result',
  pinned: false,
  ts: Date.now(),
  explanation:
    '- „kontrollierten" = Verb, 3. Person Plural, Präteritum (einfache Vergangenheit)\n- Infinitiv: kontrollieren; schwaches Verb, Stamm + -ten\n- Aktiv, Indikativ\n- „zahlreiche Fürsten" = Subjekt (Nominativ, Plural)\n- „den Handel" = Akkusativobjekt (maskulin, Singular)',
}

const longTranslateCard: Card = {
  id: 'cl',
  action: 'translate',
  sourceText:
    'Im Mittelalter kontrollierten zahlreiche Fürsten den Handel entlang des Flusses und erhoben Zölle von den Kaufleuten, was den Warenverkehr erheblich verteuerte.',
  languages: ['English', 'Ukrainian', 'Turkish', 'Chinese'],
  status: 'result',
  pinned: false,
  ts: Date.now(),
  translations: {
    English:
      'In the Middle Ages, numerous princes controlled trade along the river and levied tolls on the merchants, which considerably increased the cost of moving goods and slowed commerce throughout the whole region.',
    Ukrainian:
      'У середні віки численні князі контролювали торгівлю вздовж річки та стягували мита з купців, що значно підвищувало вартість перевезення товарів і сповільнювало торгівлю в усьому регіоні протягом століть.',
    Turkish:
      'Orta Çağ’da çok sayıda prens nehir boyunca ticareti kontrol ediyor ve tüccarlardan geçiş vergisi alıyordu; bu da malların taşınma maliyetini önemli ölçüde artırıyor ve tüm bölgede ticareti yavaşlatıyordu.',
    Chinese:
      '在中世紀，眾多諸侯控制著沿河的貿易，並向商人徵收通行稅，這大大提高了貨物運輸的成本，並使整個地區的商業活動長期放緩。',
  },
}

const repeat = (s: string, n: number) => Array.from({ length: n }, () => s).join(' ')
const paragraphCard: Card = {
  ...longTranslateCard,
  id: 'cp',
  sourceText: repeat(longTranslateCard.sourceText, 4),
  translations: {
    English: repeat(longTranslateCard.translations!.English!, 5),
    Ukrainian: repeat(longTranslateCard.translations!.Ukrainian!, 5),
    Turkish: repeat(longTranslateCard.translations!.Turkish!, 5),
    Chinese: repeat(longTranslateCard.translations!.Chinese!, 5),
  },
}

const cards: Card[] = paragraph
  ? [paragraphCard]
  : longText
  ? [longTranslateCard]
  : grammarOnly
  ? [grammarCard]
  : [translateCard, grammarCard]

const baseHistory: LookupResult[] = [
  { id: 'h1', ts: Date.now() - 86400000, action: 'translate', sourceText: 'Viele Städte wurden an seinen Ufern gegründet.', languages: ['English'] },
  { id: 'h2', ts: Date.now() - 2 * 86400000, action: 'grammar', sourceText: 'erhoben', languages: [] },
]
const history: LookupResult[] = paragraph
  ? Array.from({ length: 14 }, (_, i) => ({
      ...baseHistory[i % 2],
      id: `h${i}`,
      ts: Date.now() - i * 86400000,
      sourceText: `${i + 1}. ${baseHistory[i % 2].sourceText}`,
    }))
  : baseHistory

const noop = () => {}

function Demo() {
  const [mode, setMode] = useState<'compact' | 'expanded'>(initialMode)
  const [historyOpen, setHistoryOpen] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(Math.round(window.innerWidth * 0.26))

  const clamp = (px: number) => Math.max(320, Math.min(Math.min(760, window.innerWidth * 0.8), px))

  const onResizeStart = (e: React.PointerEvent) => {
    e.preventDefault()
    const onMove = (ev: PointerEvent) => setWidth(clamp(window.innerWidth - ev.clientX))
    const onUp = () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  return (
    <Panel
      theme={initialTheme}
      collapsed={collapsed}
      mode={mode}
      width={width}
      cards={cards}
      history={history}
      historyOpen={historyOpen}
      onClose={noop}
      onToggleCollapse={() => setCollapsed((c) => !c)}
      onToggleMode={() => setMode((m) => (m === 'compact' ? 'expanded' : 'compact'))}
      onResizeStart={onResizeStart}
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
