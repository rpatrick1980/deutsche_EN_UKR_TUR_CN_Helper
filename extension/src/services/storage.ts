import { CacheEntry, Settings } from '../shared/types'
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
