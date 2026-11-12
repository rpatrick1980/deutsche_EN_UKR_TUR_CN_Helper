# German Reading Helper — Chrome Extension (MV3)

A desktop Chrome extension for adult German learners. Select German text on any
webpage, right-click **Translate and Explain**, and get **compact translations**
(English, Ukrainian, Turkish), a **dictionary-style German explanation** for single
words, a **follow-up chat** and **pronunciation playback** in a fixed right-side
panel — without leaving the page.

Built with **React + TypeScript + Vite** (Manifest V3).

---

## Features

- **One context menu action:** *Translate and Explain*.
- **Text source:** highlighted selection first; best-effort extraction from the
  right-clicked element as a fallback. Clear guidance when extraction fails.
- **German-only:** local heuristic + AI double-check reject non-German input.
- **Guardrails:** rejects selections over 700 words and noisy/non-text content.
- **Right-side overlay panel:** ~25% viewport width (configurable 20–40%), the
  page stays stable. Optional *push page content* mode. Collapse / close.
- **Word lookups** (≤2 words, e.g. "der Hund"): dictionary-style entry in German —
  Artikel, Plural, stark/schwach, key forms, short notes and 3 example sentences.
  Sentences and paragraphs get translations only.
- **Follow-up chat** under every result; the tutor always answers in German.
- **Learner level** (A1–B2, default B1) in Settings tunes the German used in notes, examples and chat.
- **Pronunciation:** 🔊 plays the selected text with OpenAI text-to-speech
  (`tts-1` or `tts-1-hd`, selectable in Settings).
- **Result pinning:** pin a result while you look up something else.
- **Local cache:** results are cached in `chrome.storage.local` for 7 days to
  avoid repeat API calls. Nothing leaves the device except the text you
  explicitly send to OpenAI.
- **Dark mode.**

---

## Permissions rationale (minimal)

| Permission | Why |
|---|---|
| `contextMenus` | Add the *Translate and Explain* right-click item. |
| `storage` | Save settings and cache locally. |
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
5. On any webpage, select German text → right-click → *Translate and Explain*.

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
    Panel.tsx                    # panel UI (loading/error/result/dictionary/chat/speak/pin)
    panel-styles.ts              # scoped CSS injected into the shadow root
  options/                       # settings page (API key, languages, theme, etc.)
  services/
    openai.ts                    # AI service layer (swap for a proxy later)
    prompts.ts                   # lookup (translation + dictionary) & chat prompts
    textExtraction.ts            # selection/element capture + validation
    germanDetect.ts              # heuristic German detector
    storage.ts                   # chrome.storage helpers (settings/cache)
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
*Translate and Explain*, a follow-up question, or 🔊 — to the OpenAI API to produce
translations, dictionary explanations, chat answers and speech audio. It does not
read pages automatically, does not track browsing, and stores settings/cache only
on your device.
