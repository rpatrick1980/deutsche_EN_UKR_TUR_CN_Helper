# German Reading Helper — Chrome Extension (MV3)

## Original problem statement
Desktop Chrome extension for adult German learners. Right-click selected German text
to Translate (English/Ukrainian/Turkish/Chinese) or Explain Grammar in a fixed
right-side overlay panel. Local history + cache, dark mode, minimal permissions.
React + TypeScript, MV3, direct OpenAI (user's own key) for v1, structured so a
FastAPI proxy can be added later.

## User choices (locked)
- OpenAI called **directly from extension using the user's own API key** (v1).
- Model default: **gpt-4o-mini** (changeable in settings).
- History **auto-expires after 30 days** (also capped at 50 entries).
- **Pin feature** enabled (keep a result while doing another lookup).
- All four target languages enabled by default.

## Tech stack
- React 18 + TypeScript, Vite 5 + @crxjs/vite-plugin (MV3).
- chrome.storage.local for settings/history/cache. No backend, no MongoDB.

## Architecture
- `background/service-worker.ts`: context menus, OpenAI call (cache-first), open options.
- `content/content-main.tsx`: shadow-DOM panel injection + lookup orchestration.
- `content/Panel.tsx` + `panel-styles.ts`: panel UI (loading/error/result/history/pin).
- `options/`: settings page.
- `services/`: openai, prompts, textExtraction, germanDetect, storage.
- OpenAI call isolated in service worker → swap endpoint for a proxy later.

## Implemented (2026-06)
- Phase 1: MV3 manifest, context menus (Translate / Explain Grammar), settings page.
- Phase 2: selection capture + best-effort element fallback; German-only heuristic;
  700-word + noise/quality validation; clear failure guidance.
- Phase 3: translation (multi-language JSON) + compact grammar (<200 words, bullets);
  NOT_GERMAN safety from AI.
- Phase 4: fixed right overlay panel (~25%, 20–40% configurable), overlay/push modes,
  collapse/close, history list, local caching (7-day TTL), dark mode, result pinning.
- Phase 5 (partial): minimal permissions + rationale, privacy text, README with build/
  load-unpacked/publish notes.
- Verified: `yarn build` produces valid dist/manifest.json; 10/10 logic unit tests pass;
  panel visually verified via /grh-demo preview.

## Not done / backlog
- P1: FastAPI proxy for Web Store hardening (code is structured for it).
- P1: Web Store listing assets (screenshots, promo tiles) + hosted privacy policy page.
- P2: compact vs expanded panel mode; per-site enable/disable; PDF text handling.
- Note: real end-to-end Chrome behavior (context menu → live page) must be verified by
  loading unpacked in Chrome — cannot be automated in this environment.

## Build
cd extension && yarn install && yarn build  → load `extension/dist` unpacked in Chrome.
