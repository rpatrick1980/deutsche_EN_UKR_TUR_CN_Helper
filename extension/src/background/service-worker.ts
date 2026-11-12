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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Pages opened before the extension was (re)loaded have no content script yet:
// inject it on demand and retry instead of bothering the user.
// The content script acknowledges with {received:true}; a rejection means no receiver.
async function deliverRunAction(tabId: number, message: RunActionMessage) {
  const tryDeliver = async () => {
    const res = await chrome.tabs.sendMessage(tabId, message)
    if (!res?.received) throw new Error('no receiver')
  }
  try {
    await tryDeliver()
    return
  } catch {
    // no receiver yet
  }
  const files = chrome.runtime.getManifest().content_scripts?.[0]?.js ?? []
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files })
  } catch {
    return // restricted page (chrome://, Web Store, PDF viewer) — nothing we can do
  }
  for (let i = 0; i < 20; i++) {
    await sleep(150)
    try {
      await tryDeliver()
      return
    } catch {
      // loader still importing the module
    }
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.id || info.menuItemId !== CONTEXT_MENU.lookup) return
  deliverRunAction(tab.id, {
    type: 'RUN_ACTION',
    selectionText: (info.selectionText ?? '').trim(),
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
