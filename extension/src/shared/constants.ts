import { Settings, ALL_LANGUAGES, TargetLanguage } from './types'

export const MAX_WORDS = 700

/** Selections with at most this many words get a dictionary entry (e.g. "Hund", "der Hund"). */
export const WORD_MODE_MAX_WORDS = 2

export const DEFAULT_MODEL = 'gpt-4o-mini'
export const DEFAULT_TTS_MODEL = 'tts-1'
export const TTS_VOICE = 'alloy'
export const TTS_MAX_CHARS = 4096

export const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export const STORAGE_KEYS = {
  settings: 'grh_settings',
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
  ttsModel: DEFAULT_TTS_MODEL,
  enabledLanguages: allEnabled(),
  darkMode: false,
  pushContent: false,
  panelMode: 'expanded',
  panelWidthPct: 25,
}

export const CONTEXT_MENU = {
  lookup: 'grh_lookup',
} as const
