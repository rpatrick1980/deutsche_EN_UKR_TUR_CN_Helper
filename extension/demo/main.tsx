import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Panel, Card } from '../src/content/Panel'
import { PANEL_STYLES } from '../src/content/panel-styles'
import { ChatMessage } from '../src/shared/types'

// Variants: ?v=word | text | paragraph | dark | compact | loading | error
const params = new URLSearchParams(location.search)
const v = params.get('v') || ''
const initialTheme = v === 'dark' ? 'dark' : 'light'
const initialMode = v === 'compact' ? 'compact' : 'expanded'

const host = document.createElement('div')
const shadow = host.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = PANEL_STYLES
shadow.appendChild(style)
const mount = document.createElement('div')
shadow.appendChild(mount)
document.body.appendChild(host)

const base = {
  languages: ['English', 'Ukrainian', 'Turkish'] as Card['languages'],
  status: 'result' as const,
  pinned: false,
  chat: [] as ChatMessage[],
  chatStatus: 'idle' as const,
  ttsStatus: 'idle' as const,
  speaking: false,
  ts: Date.now(),
}

const wordCard: Card = {
  ...base,
  id: 'w1',
  mode: 'word',
  sourceText: 'Fürsten',
  translations: { English: 'princes', Ukrainian: 'князі', Turkish: 'prensler' },
  entry: {
    lemma: 'der Fürst',
    wordType: 'Nomen',
    article: 'der',
    plural: 'die Fürsten',
    inflection: 'schwach',
    forms: 'des Fürsten',
    notes: [
      'Bedeutung: ein adliger Herrscher über ein Gebiet (Fürstentum).',
      'Schwache Deklination (n-Deklination): alle Formen außer Nominativ Singular enden auf -en.',
      '„Fürsten" = hier Nominativ Plural (Subjekt des Satzes).',
    ],
    examples: [
      'Der Fürst regierte das kleine Land viele Jahre.',
      'Im Mittelalter hatten die Fürsten viel Macht.',
      'Das Schloss gehörte einem reichen Fürsten.',
    ],
  },
}

const textCard: Card = {
  ...base,
  id: 't1',
  mode: 'text',
  sourceText: 'Im Mittelalter kontrollierten zahlreiche Fürsten den Handel entlang des Flusses.',
  translations: {
    English: 'In the Middle Ages, numerous princes controlled trade along the river.',
    Ukrainian: 'У середні віки численні князі контролювали торгівлю вздовж річки.',
    Turkish: 'Orta Çağ’da çok sayıda prens nehir boyunca ticareti kontrol ediyordu.',
  },
  chat: [
    { role: 'user', content: 'Why is it "des Flusses"?' },
    {
      role: 'assistant',
      content:
        '„Des Flusses" ist Genitiv Singular.\n- Die Präposition „entlang" steht hier mit Genitiv.\n- „der Fluss" → Genitiv: „des Flusses" (starkes Nomen, Endung -es).',
    },
  ],
}

const repeat = (s: string, n: number) => Array.from({ length: n }, () => s).join(' ')
const paragraphCard: Card = {
  ...textCard,
  id: 'p1',
  chat: [],
  sourceText: repeat(textCard.sourceText, 4),
  translations: {
    English: repeat(textCard.translations!.English!, 6),
    Ukrainian: repeat(textCard.translations!.Ukrainian!, 6),
    Turkish: repeat(textCard.translations!.Turkish!, 6),
  },
}

const loadingCard: Card = { ...base, id: 'l1', mode: 'text', status: 'loading', sourceText: 'Viele Städte wurden an seinen Ufern gegründet.' }
const errorCard: Card = {
  ...base,
  id: 'e1',
  mode: 'text',
  status: 'error',
  sourceText: 'Viele Städte wurden an seinen Ufern gegründet.',
  reason: 'No OpenAI API key set. Open Settings (gear icon) and paste your key to start.',
}

const initialCards: Card[] =
  v === 'word' ? [wordCard]
  : v === 'text' ? [textCard]
  : v === 'paragraph' ? [paragraphCard]
  : v === 'loading' ? [loadingCard]
  : v === 'error' ? [errorCard]
  : [wordCard, { ...textCard, pinned: true }]

const noop = () => {}

function Demo() {
  const [mode, setMode] = useState<'compact' | 'expanded'>(initialMode)
  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(Math.round(window.innerWidth * 0.26))
  const [cards, setCards] = useState<Card[]>(initialCards)

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

  const patch = (id: string, fn: (c: Card) => Card) =>
    setCards((cs) => cs.map((c) => (c.id === id ? fn(c) : c)))

  // Mocked chat: echoes a German reply after a short delay.
  const onSendChat = (id: string, text: string) => {
    patch(id, (c) => ({ ...c, chat: [...c.chat, { role: 'user', content: text }], chatStatus: 'loading' }))
    setTimeout(() => {
      patch(id, (c) => ({
        ...c,
        chatStatus: 'idle',
        chat: [...c.chat, { role: 'assistant', content: `Gute Frage! (Demo-Antwort auf: „${text}")` }],
      }))
    }, 600)
  }

  // Mocked speak: toggles the playing state.
  const onSpeak = (id: string) =>
    patch(id, (c) => ({ ...c, speaking: !c.speaking }))

  return (
    <Panel
      theme={initialTheme}
      collapsed={collapsed}
      mode={mode}
      width={width}
      cards={cards}
      onClose={noop}
      onToggleCollapse={() => setCollapsed((c) => !c)}
      onToggleMode={() => setMode((m) => (m === 'compact' ? 'expanded' : 'compact'))}
      onResizeStart={onResizeStart}
      onPinCard={(id) => patch(id, (c) => ({ ...c, pinned: !c.pinned }))}
      onCloseCard={(id) => setCards((cs) => cs.filter((c) => c.id !== id))}
      onSendChat={onSendChat}
      onSpeak={onSpeak}
      onOpenSettings={noop}
    />
  )
}

createRoot(mount).render(<Demo />)
