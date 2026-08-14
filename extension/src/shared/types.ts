export type ActionType = 'translate' | 'grammar'

export type TargetLanguage = 'English' | 'Ukrainian' | 'Turkish' | 'Chinese'

export const ALL_LANGUAGES: TargetLanguage[] = [
  'English',
  'Ukrainian',
  'Turkish',
  'Chinese',
]

export interface Settings {
  apiKey: string
  model: string
  enabledLanguages: Record<TargetLanguage, boolean>
  darkMode: boolean
  pushContent: boolean
  panelMode: 'compact' | 'expanded'
  panelWidthPct: number
  historyAutoExpireDays: number
  historyLimit: number
}

export interface TranslationResult {
  translations: Partial<Record<TargetLanguage, string>>
}

export interface GrammarResult {
  explanation: string
}

export interface LookupResult {
  id: string
  ts: number
  action: ActionType
  sourceText: string
  languages: TargetLanguage[]
  translations?: Partial<Record<TargetLanguage, string>>
  explanation?: string
}

export interface CacheEntry {
  ts: number
  translations?: Partial<Record<TargetLanguage, string>>
  explanation?: string
}

// Messages: content <-> background
export interface RunActionMessage {
  type: 'RUN_ACTION'
  action: ActionType
  selectionText: string
}

export interface OpenAIRequestMessage {
  type: 'OPENAI_REQUEST'
  action: ActionType
  text: string
  languages: TargetLanguage[]
}

export interface OpenAIResponseMessage {
  ok: boolean
  error?: string
  translations?: Partial<Record<TargetLanguage, string>>
  explanation?: string
}

export type RuntimeMessage = RunActionMessage | OpenAIRequestMessage
