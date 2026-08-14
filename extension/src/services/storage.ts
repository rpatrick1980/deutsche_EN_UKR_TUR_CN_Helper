import { CacheEntry, LookupResult, Settings } from '../shared/types'
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '../shared/constants'

export async function getSettings(): Promise<Settings> {
  const raw = await chrome.storage.local.get(STORAGE_KEYS.settings)
  const stored = raw[STORAGE_KEYS.settings] as Partial<Settings> | undefined
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    enabledLanguages: {
      ...DEFAULT_SETTINGS.enabledLanguages,
      ...(stored?.enabledLanguages ?? {}),
    },
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.settings]: settings })
}

export async function getHistory(): Promise<LookupResult[]> {
  const settings = await getSettings()
  const raw = await chrome.storage.local.get(STORAGE_KEYS.history)
  let history = (raw[STORAGE_KEYS.history] as LookupResult[] | undefined) ?? []
  // Auto-expire
  const cutoff = Date.now() - settings.historyAutoExpireDays * 24 * 60 * 60 * 1000
  history = history.filter((h) => h.ts >= cutoff)
  return history.slice(0, settings.historyLimit)
}

export async function addHistory(entry: LookupResult): Promise<LookupResult[]> {
  const settings = await getSettings()
  const current = await getHistory()
  const next = [entry, ...current].slice(0, settings.historyLimit)
  await chrome.storage.local.set({ [STORAGE_KEYS.history]: next })
  return next
}

export async function clearHistory(): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.history]: [] })
}

export async function getCache(): Promise<Record<string, CacheEntry>> {
  const raw = await chrome.storage.local.get(STORAGE_KEYS.cache)
  return (raw[STORAGE_KEYS.cache] as Record<string, CacheEntry> | undefined) ?? {}
}

export async function setCache(key: string, entry: CacheEntry): Promise<void> {
  const cache = await getCache()
  cache[key] = entry
  await chrome.storage.local.set({ [STORAGE_KEYS.cache]: cache })
}

export async function clearCache(): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.cache]: {} })
}
