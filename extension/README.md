# German Reading Helper — Chrome Extension (MV3)

A desktop Chrome extension for adult German learners. Select German text on any
webpage, right-click, and get **compact translations** (English, Ukrainian,
Turkish, Chinese) and **grammar explanations** in a fixed right-side panel —
without leaving the page.

Built with **React + TypeScript + Vite** (Manifest V3).

---

## Features

- **Context menu actions:** *Translate* and *Explain Grammar*.
- **Text source:** highlighted selection first; best-effort extraction from the
  right-clicked element as a fallback. Clear guidance when extraction fails.
- **German-only:** local heuristic + AI double-check reject non-German input.
- **Guardrails:** rejects selections over 700 words and noisy/non-text content.
- **Right-side overlay panel:** ~25% viewport width (configurable 20–40%), the
  page stays stable. Optional *push page content* mode. Collapse / close.
- **Grammar output:** under 200 words, bullet points; word / sentence /
  paragraph aware (gender, part of speech, tense, mood, voice, etc.).
- **Result pinning:** pin a result while you look up something else.
- **Local history & cache:** stored in `chrome.storage.local`, auto-expires
  (default 30 days), cached results avoid repeat API calls. Nothing leaves the
  device except the text you explicitly send to OpenAI.
- **Dark mode.**

---

## Permissions rationale (minimal)

| Permission | Why |
|---|---|
| `contextMenus` | Add the *Translate* / *Explain Grammar* right-click items. |
| `storage` | Save settings, history and cache locally. |
| `activeTab` | Act on the tab you invoked the action on. |
| `scripting` | Show a "please reload" notice on pages loaded before install. |
| `host_permissions: https://api.openai.com/*` | v1 calls the OpenAI API directly. |

No background tracking. No automatic page reading — the extension does nothing
until you click a context-menu item.

---

## Build & load (unpacked)

```bash
cd extension
yarn install
yarn build          # outputs to extension/dist
```

Then in Chrome:

1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the `extension/dist` folder.
4. Open the extension **Settings** (click the toolbar icon), paste your OpenAI
   API key (`sk-...`), pick languages, and save.
5. On any webpage, select German text → right-click → *Translate* /
   *Explain Grammar*.

> Note: content scripts can't run on `chrome://` pages, the Chrome Web Store, or
> some PDF/canvas/image content. On a page that was open before you installed the
> extension, reload it once.

Dev mode with HMR: `yarn dev` (then Load unpacked from `dist`).

---

## Architecture

```
src/
  background/service-worker.ts   # context menus, OpenAI call, cache
  content/
    content-main.tsx             # injects the shadow-DOM panel, orchestrates a lookup
    Panel.tsx                    # panel UI (loading/error/result/history/pin)
    panel-styles.ts              # scoped CSS injected into the shadow root
  options/                       # settings page (API key, languages, theme, etc.)
  services/
    openai.ts                    # AI service layer (swap for a proxy later)
    prompts.ts                   # translation & grammar prompts
    textExtraction.ts            # selection/element capture + validation
    germanDetect.ts              # heuristic German detector
    storage.ts                   # chrome.storage helpers (settings/history/cache)
  shared/                        # types + constants
```

The OpenAI call lives in the **service worker** (`services/openai.ts`), so the
API key and network request never run in the page context.

### Hardening for the Web Store (proxy)

v1 calls OpenAI directly with the user's own key (per project decision). To
publish with your own billing, introduce a small **FastAPI proxy**:

- In `services/openai.ts`, change `OPENAI_ENDPOINT` to your proxy URL, send the
  `{ action, text, languages }` payload, and drop the `Authorization` header.
- Remove `host_permissions: https://api.openai.com/*` and add your proxy host.
- No other code changes needed — the rest of the extension is proxy-agnostic.

---

## Privacy disclosure (for the listing)

This extension sends the German text you explicitly select — only when you click
*Translate* or *Explain Grammar* — to the OpenAI API to produce translations and
grammar explanations. It does not read pages automatically, does not track
browsing, and stores settings/history/cache only on your device.
