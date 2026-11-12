import { CONTEXT_MENU, CACHE_TTL_MS } from '../shared/constants'
import { lookup, chat, speak } from '../services/openai'
import { getCache, setCache } from '../services/storage'
import { LookupRequestMessage, RunActionMessage } from '../shared/types'

function createMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU.lookup,
      title: 'Translate and Explain',
      contexts: ['selection', 'page'],
    })
  })
}

chrome.runtime.onInstalled.addListener(createMenus)
chrome.runtime.onStartup.addListener(createMenus)

// Clicking the toolbar icon opens the settings page.
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id || info.menuItemId !== CONTEXT_MENU.lookup) return
  const message: RunActionMessage = {
    type: 'RUN_ACTION',
    selectionText: (info.selectionText ?? '').trim(),
  }
  chrome.tabs.sendMessage(tab.id, message, () => {
    if (chrome.runtime.lastError) {
      // Content script not present (page loaded before install, or restricted page).
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id! },
          func: () =>
            alert(
              'German Reading Helper: please reload this page once, then try again. (The extension cannot run on this page — e.g. Chrome Web Store or chrome:// pages.)'
            ),
        })
        .catch(() => {})
    }
  })
})

function cacheKey(msg: LookupRequestMessage): string {
  const langs = msg.languages.slice().sort().join(',')
  return `lookup|${msg.mode}|${langs}|${msg.text}`
}

async function handleLookup(message: LookupRequestMessage) {
  const key = cacheKey(message)
  const cache = await getCache()
  const cached = cache[key]
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return { ok: true, translations: cached.translations, entry: cached.entry, cached: true }
  }
  const result = await lookup({ mode: message.mode, text: message.text, languages: message.languages })
  if (result.ok) {
    await setCache(key, { ts: Date.now(), translations: result.translations, entry: result.entry })
  }
  return result
}

chrome.runtime.onMessage.addListener((message: any, _sender, sendResponse) => {
  switch (message?.type) {
    case 'OPEN_OPTIONS':
      chrome.runtime.openOptionsPage()
      return
    case 'LOOKUP_REQUEST':
      handleLookup(message).then(sendResponse)
      return true
    case 'CHAT_REQUEST':
      chat(message).then(sendResponse)
      return true
    case 'TTS_REQUEST':
      speak(message.text).then(sendResponse)
      return true
  }
})
