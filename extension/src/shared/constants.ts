import { Settings, ALL_LANGUAGES, TargetLanguage } from './types'

export const MAX_WORDS = 700

export const DEFAULT_MODEL = 'gpt-4o-mini'

export const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export const STORAGE_KEYS = {
  settings: 'grh_settings',
  history: 'grh_history',
  cache: 'grh_cache',
} as const

function allEnabled(): Record<TargetLanguage, boolean> {
  return ALL_LANGUAGES.reduce((acc, l) => {
    acc[l] = true
    return acc
  }, {} as Record<TargetLanguage, boolean>)
}

export const DEFAULT_SETTINGS: Settings = {
  apiKey: '',
  model: DEFAULT_MODEL,
  enabledLanguages: allEnabled(),
  darkMode: false,
  pushContent: false,
  panelMode: 'expanded',
  panelWidthPct: 25,
  historyAutoExpireDays: 30,
  historyLimit: 50,
}

export const CONTEXT_MENU = {
  translate: 'grh_translate',
  grammar: 'grh_grammar',
} as const
