# German Reading Helper — Developer Handoff (for Claude Code)

> Read this first. It's a complete map of the codebase, how it runs, the data
> flow, the conventions to keep, and where to extend next. Written so a coding
> agent can be productive immediately without re-deriving context.

---

## 1. What this is

A **Manifest V3 Chrome extension** (desktop Chrome) for adult German learners.
Select German text on any page → right-click → **Translate and Explain** → results appear
in a **fixed right-side panel** injected into the page: translations (English / Ukrainian /
Turkish), and for a single word (≤2 words, e.g. "der Hund") a German dictionary-style entry
(Artikel, Plural, stark/schwach, Formen, notes, 3 example sentences). Every result card has a
**follow-up chat** (answers always in German) and a **🔊 pronunciation** button (OpenAI TTS).
Cache is local; there is no history UI.

- **Stack:** React 18 + TypeScript, Vite 5, `@crxjs/vite-plugin` (MV3 wiring).
- **No backend, no database** in v1. OpenAI is called **directly** from the
  service worker using the user's **own API key** (stored in `chrome.storage.local`).
- **Privacy posture:** nothing runs automatically; text is sent to OpenAI only on
  an explicit context-menu action.

---

## 2. Repo layout (everything lives under `extension/`)

```
extension/
  manifest.config.ts          # MV3 manifest (defineManifest); permissions live here
  vite.config.ts              # main build (CRXJS) -> dist/
  vite.demo.config.ts         # standalone preview build -> ../frontend/public/grh-demo
  tsconfig.json
  package.json                # yarn; scripts: dev / build / build:only
  README.md                   # user-facing build + load-unpacked notes
  CLAUDE.md                   # (this file)

  src/
    background/
      service-worker.ts       # context menus; OpenAI call (cache-first); open options
    content/
      content-main.tsx        # THE ORCHESTRATOR: injects shadow-DOM panel, runs a lookup
      Panel.tsx               # Panel UI: cards (translations, DictionaryView, ChatBox, SpeakButton), resize
      panel-styles.ts         # all panel CSS as a string (injected into the shadow root)
    options/
      options.html            # options entry (CRXJS treats HTML as an entry)
      options.tsx             # React mount
      OptionsApp.tsx          # Settings UI (API key, languages, theme, panel mode, width)
      options.css
    services/
      openai.ts               # AI SERVICE LAYER (swap here for a proxy) — runs in SW
      prompts.ts              # detectLookupMode, lookup (JSON) + chat prompt builders
      textExtraction.ts       # selection/element capture + validation (German/length/noise)
      germanDetect.ts         # heuristic German detector
      storage.ts              # chrome.storage.local helpers: settings/cache
    shared/
      types.ts                # all shared TS types + ALL_LANGUAGES
      constants.ts            # DEFAULT_SETTINGS, STORAGE_KEYS, MAX_WORDS, TTLs, menu ids

  demo/                       # NOT shipped. Renders the REAL Panel/Options for screenshots + QA
    index.html + main.tsx     # article page + panel, variants via ?v=word|text|paragraph|loading|error|compact|dark
    settings.html + settings.tsx  # stubs chrome.storage so Options renders in a plain browser
  test/
    logic.test.ts             # pure-logic unit tests (germanDetect, validateText, prompt)
  store-assets/               # Chrome Web Store: promo tiles, feature graphic, live screenshots,
                              # listing.md, privacy-policy.html, build_assets.py, capture_live.py
```

---

## 3. Build & run

```bash
cd extension
yarn install
yarn build                # tsc --noEmit && vite build  ->  dist/   (load unpacked in Chrome)
# dev with HMR:
yarn dev                  # then Load unpacked from dist/
```

Load in Chrome: `chrome://extensions` → Developer mode → **Load unpacked** → pick
`extension/dist` → click the toolbar icon → paste OpenAI key in Settings.

### Preview build (for screenshots / browser QA — no Chrome APIs)
```bash
cd extension
npx vite build --config vite.demo.config.ts   # outputs to ../frontend/public/grh-demo
```
Served at `/grh-demo/index.html` (`?v=word|text|paragraph|loading|error|compact|dark`) and `/grh-demo/settings.html`.
This is how the UI is verified without loading the extension (see §8).

---

## 4. Runtime data flow (the important part)

```
User right-clicks selection
        │
        ▼
background/service-worker.ts
  contextMenus.onClicked ──► chrome.tabs.sendMessage(tab, {RUN_ACTION, selectionText})
        │ (if no content script yet: scripting.executeScript injects manifest content_scripts js, then retries ~3s; silent on restricted pages)
        ▼
content/content-main.tsx  (PanelController)
  1. resolve text:  selectionText → window.getSelection() → extractFromElement(lastRightClicked)
  2. validateText(): German-only + ≤700 words + noise/quality  (services/textExtraction.ts)
  3. mode = detectLookupMode(text): 'word' (≤2 words, no sentence punctuation) | 'text'
  4. mount shadow-DOM panel, render loading card
  5. chrome.runtime.sendMessage({LOOKUP_REQUEST, mode, text, languages})
        │
        ▼
background/service-worker.ts  onMessage(LOOKUP_REQUEST)
  - cache-first (getCache, 7-day TTL, key = lookup|mode|langs|text)
  - lookup()  (services/openai.ts)  → POST api.openai.com/v1/chat/completions
      * model + apiKey from settings; response_format: json_object
      * {translations:{Lang:...}} and, in word mode, entry:{lemma,wordType,article,plural,
        inflection,forms,notes[],examples[3]} (all German)
      * NOT_GERMAN / NO_API_KEY / RATE_LIMIT / TIMEOUT / NETWORK error codes
  - store cache; sendResponse(result)
        ▼
content-main renders result card (TranslationsView + DictionaryView + ChatBox)

Follow-up chat:  content {CHAT_REQUEST, sourceText, translations, entry, messages[]}
                 → chat() → chat/completions (system prompt: German tutor, ALWAYS answers in German)
Pronunciation:   content {TTS_REQUEST, text} → speak() → POST /v1/audio/speech
                 (model settings.ttsModel 'tts-1'|'tts-1-hd', voice 'alloy', mp3)
                 → base64 → content plays `new Audio('data:audio/mpeg;base64,…')`; cached per card
```

Key detail: **the OpenAI fetch runs in the service worker**, not the page. This
keeps the API key + host permission out of page context and dodges page CSP.
Content ↔ background talk via `chrome.runtime` messages typed in `shared/types.ts`.

---

## 5. The panel (content/Panel.tsx + content-main.tsx)

- Injected into a **Shadow DOM** (`host.attachShadow`) so page CSS can't leak in/out.
  All styles come from `panel-styles.ts` as a single injected `<style>` string.
- `PanelController` (in `content-main.tsx`) holds imperative state and calls
  `root.render(<Panel .../>)` on every change. **State is NOT React state** — it's a
  plain object on the controller; React only renders. Keep this pattern.
- **States:** empty · loading · error · result. Cards are an array;
  the single unpinned "live" card is replaced on each new lookup; **pinned** cards persist.
- **Modes:** `compact` (fixed ~300px, brand name + source quotes hidden, no resize handle)
  vs `expanded` (resizable). Toggle persists to `settings.panelMode`.
- **Collapse/restore:** collapsing shows a 46px right-edge tab (`.grh-reopen`); clicking
  it restores to the exact prior width.
- **Resize:** left-edge handle (`data-testid="panel-resize-handle"`). `startResize` in
  the controller adds document `pointermove/up` listeners, updates `state.widthPx`
  (clamp 320 … min(760, 80vw)), and on release persists `settings.panelWidthPct`.
- **Push vs overlay:** default overlays the page; `settings.pushContent` sets
  `document.documentElement.style.marginRight` instead.

---

## 6. Settings model (shared/types.ts `Settings`)

```ts
apiKey: string
model: string                       // default 'gpt-4o-mini' (see MODEL_OPTIONS in OptionsApp)
ttsModel: 'tts-1' | 'tts-1-hd'      // pronunciation quality (Settings → OpenAI section)
level: 'A1' | 'A2' | 'B1' | 'B2'    // learner level, default 'B1' → LEVEL_GUIDE in prompts.ts shapes German complexity
enabledLanguages: Record<TargetLanguage, boolean>  // English/Ukrainian/Turkish
darkMode: boolean
pushContent: boolean
panelMode: 'compact' | 'expanded'
panelWidthPct: number               // persisted; px derived at runtime from viewport
```
Defaults in `shared/constants.ts` → `DEFAULT_SETTINGS`. `getSettings()` deep-merges
stored over defaults (so new fields are safe to add).

---

## 7. Conventions to keep

- **Storage:** only through `services/storage.ts`. Keys namespaced `grh_*` in
  `STORAGE_KEYS`. Cache has a 7-day TTL.
- **Types/messages:** add new runtime messages to `shared/types.ts` and handle in
  both `service-worker.ts` and `content-main.tsx`.
- **Data-testids:** every interactive/important element has a kebab-case
  `data-testid` (e.g. `panel-collapse-button`, `panel-resize-handle`,
  `settings-save-button`). Keep this — it's how QA drives the UI through the shadow root.
- **German-only:** `germanDetect.ts` is lenient for ≤3 words (AI double-checks and can
  return `NOT_GERMAN`). Longer text needs stopword/umlaut signal.
- **Prompts:** `prompts.ts` requests strict JSON (`response_format: json_object`).
  Dictionary entry + chat answers must stay **in German**, pitched at `settings.level` (default B1). Examples: exactly 3, German only.
  Sentences/paragraphs get translations only (no grammar) — by user decision.
- **No secrets in code.** The API key is user-provided and lives only in
  `chrome.storage.local`.
- Keep components small; avoid adding a backend/DB unless doing the proxy work (§9).

---

## 8. Testing

- **Pure logic:** `test/logic.test.ts` (germanDetect, validateText, detectLookupMode,
  lookup/chat prompt contents). Run:
  ```bash
  cd extension
  npx esbuild test/logic.test.ts --bundle --platform=node --format=cjs --outfile=/tmp/t.cjs && node /tmp/t.cjs
  ```
- **UI/behavior:** a real MV3 extension can't be driven by headless automation
  (no context menus, no `chrome.*`). Instead the **demo build** renders the *exact
  same* `Panel`/`Options` components and replicates the collapse/resize handlers, then
  Playwright drives it via the preview URL. Regenerate + capture:
  ```bash
  cd extension && npx vite build --config vite.demo.config.ts
  cd store-assets && python3 capture_live.py   # 1280x800 shots into store-assets/
  ```
- **Manual smoke test** (the only true end-to-end): load unpacked, set key, select
  German text on a real site, run Translate and Explain on a word and a sentence, ask a follow-up, play 🔊.

---

## 9. Planned extension point: FastAPI proxy (Web Store hardening)

Shipping a public extension with each user's raw key is fine for v1, but to publish
with your own billing, add a small proxy and change **one file**:

- In `services/openai.ts`: point `OPENAI_ENDPOINT` at `${PROXY_URL}/api/ai`, send the
  `{ action, text, languages }` payload, and **drop the `Authorization` header**
  (the proxy holds the key server-side). The prompt building can move server-side too.
- In `manifest.config.ts`: remove `host_permissions: https://api.openai.com/*` and add
  your proxy host.
- Nothing else changes — the panel/controller are transport-agnostic. Add auth/rate
  limiting on the proxy as needed.

---

## 10. Known limitations / edge cases already handled

- No selection + unreadable target (canvas/img/svg/video/PDF viewer) → clear guidance,
  no crash (`textExtraction.ts`).
- >700 words / noisy / non-German → rejected locally with a specific message.
- Pages loaded before install / `chrome://` / Web Store pages → content script absent;
  background shows a "reload page" notice.
- Duplicate triggers replace the live card; pinned cards are preserved.
- Very narrow panel clamped to min width; compact mode for small screens.

---

## 11. Backlog (suggested next work)

- **P1** FastAPI proxy (§9) + remove per-user key requirement.
- **P1** Web Store submission: host `store-assets/privacy-policy.html`, finalize
  `store-assets/listing.md`, upload promo tiles + `screenshot-live-*` images.
- **P2** Per-site enable/disable; width readout + reset in Settings; error-state
  screenshot for the listing; basic PDF text handling; i18n of the panel chrome.
- **P2** Optional: stream results; copy-to-clipboard on each translation row;
  keyboard shortcut to open the panel.

---

## 12. Quick reference — where to change X

| Want to… | Edit |
|---|---|
| Change the AI model list / default | `options/OptionsApp.tsx` (MODEL_OPTIONS), `shared/constants.ts` (DEFAULT_MODEL) |
| Change translation/dictionary/chat behavior | `services/prompts.ts` |
| Add/adjust a target language | `shared/types.ts` (ALL_LANGUAGES, TargetLanguage) + Settings default |
| Tweak validation (word cap, German rule) | `services/textExtraction.ts`, `services/germanDetect.ts`, `shared/constants.ts` |
| Change panel look | `content/panel-styles.ts` (+ `Panel.tsx` markup) |
| Change panel behavior (resize/collapse/cards) | `content/content-main.tsx` |
| Add a permission | `manifest.config.ts` (justify in README + store listing) |
| Switch to a proxy | `services/openai.ts` + `manifest.config.ts` (§9) |
