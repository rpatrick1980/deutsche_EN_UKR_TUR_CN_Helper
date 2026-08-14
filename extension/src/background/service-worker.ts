import { CONTEXT_MENU, STORAGE_KEYS, CACHE_TTL_MS } from '../shared/constants'
import { callOpenAI } from '../services/openai'
import { getCache, setCache } from '../services/storage'
import { OpenAIRequestMessage, RunActionMessage } from '../shared/types'

function createMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU.translate,
      title: 'Translate (German → your languages)',
      contexts: ['selection', 'page'],
    })
    chrome.contextMenus.create({
      id: CONTEXT_MENU.grammar,
      title: 'Explain Grammar',
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
  if (!tab?.id) return
  const action =
    info.menuItemId === CONTEXT_MENU.translate ? 'translate' : 'grammar'
  const message: RunActionMessage = {
    type: 'RUN_ACTION',
    action,
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

function cacheKey(msg: OpenAIRequestMessage): string {
  const langs = msg.languages.slice().sort().join(',')
  return `${msg.action}|${langs}|${msg.text}`
}

chrome.runtime.onMessage.addListener((message: any, _sender, sendResponse) => {
  if (message?.type === 'OPEN_OPTIONS') {
    chrome.runtime.openOptionsPage()
    return
  }
  if (message?.type !== 'OPENAI_REQUEST') return

  ;(async () => {
    const key = cacheKey(message)
    const cache = await getCache()
    const cached = cache[key]
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      sendResponse({
        ok: true,
        translations: cached.translations,
        explanation: cached.explanation,
        cached: true,
      })
      return
    }

    const result = await callOpenAI({
      action: message.action,
      text: message.text,
      languages: message.languages,
    })

    if (result.ok) {
      await setCache(key, {
        ts: Date.now(),
        translations: result.translations,
        explanation: result.explanation,
      })
    }
    sendResponse(result)
  })()

  return true // async response
})

// Keep the key namespace referenced (avoids unused import in some build modes).
void STORAGE_KEYS
