export type TargetLanguage = 'English' | 'Ukrainian' | 'Turkish'

export const ALL_LANGUAGES: TargetLanguage[] = ['English', 'Ukrainian', 'Turkish']

export type TtsModel = 'tts-1' | 'tts-1-hd'

/** 'word' = single word / short lexical unit → dictionary entry; 'text' = sentence/paragraph → translations only. */
export type LookupMode = 'word' | 'text'

export interface Settings {
  apiKey: string
  model: string
  ttsModel: TtsModel
  enabledLanguages: Record<TargetLanguage, boolean>
  darkMode: boolean
  pushContent: boolean
  panelMode: 'compact' | 'expanded'
  panelWidthPct: number
}

export type Translations = Partial<Record<TargetLanguage, string>>

export interface DictionaryEntry {
  lemma: string
  wordType: string
  article?: string | null
  plural?: string | null
  inflection?: string | null
  forms?: string | null
  notes: string[]
  examples: string[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

export interface CacheEntry {
  ts: number
  translations?: Translations
  entry?: DictionaryEntry
}

// Messages: content <-> background
export interface RunActionMessage {
  type: 'RUN_ACTION'
  selectionText: string
}

export interface LookupRequestMessage {
  type: 'LOOKUP_REQUEST'
  mode: LookupMode
  text: string
  languages: TargetLanguage[]
}

export interface LookupResponseMessage {
  ok: boolean
  error?: string
  translations?: Translations
  entry?: DictionaryEntry
  cached?: boolean
}

export interface ChatRequestMessage {
  type: 'CHAT_REQUEST'
  sourceText: string
  translations?: Translations
  entry?: DictionaryEntry
  messages: ChatMessage[]
}

export interface ChatResponseMessage {
  ok: boolean
  error?: string
  reply?: string
}

export interface TtsRequestMessage {
  type: 'TTS_REQUEST'
  text: string
}

export interface TtsResponseMessage {
  ok: boolean
  error?: string
  audio?: string // base64 mp3
}

export type RuntimeMessage =
  | RunActionMessage
  | LookupRequestMessage
  | ChatRequestMessage
  | TtsRequestMessage
