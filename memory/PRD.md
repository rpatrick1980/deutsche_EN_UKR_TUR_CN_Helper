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
- Phase 4b: compact vs expanded panel mode (header toggle + default in Settings, persisted).
- Phase 5: minimal permissions + rationale, hosted privacy policy page
  (frontend/public/privacy.html + store-assets/privacy-policy.html), README, and
  Web Store assets — promo tiles (440x280, 1400x560), feature graphic + screenshot
  (1280x800), and listing copy in extension/store-assets/ (regen: build_assets.py).
- Verified: `yarn build` produces valid dist/manifest.json; 10/10 logic unit tests pass;
  panel (expanded + compact) visually verified via /grh-demo; privacy page live.

## Not done / backlog
- P1: FastAPI proxy for Web Store hardening (code is structured for it).
- P2: per-site enable/disable; PDF text handling; optional live screenshots from the
  loaded extension for the listing.
- Note: real end-to-end Chrome behavior (context menu → live page) must be verified by
  loading unpacked in Chrome — cannot be automated in this environment.

## Build
cd extension && yarn install && yarn build  → load `extension/dist` unpacked in Chrome.


## Iteration (2026-06) — bug fixes + resize
- BUG: Chinese now Traditional (Taiwan) — prompts.ts requests 正體/繁體中文 (Taiwan).
- BUG: Collapse now shows a slim right-edge tab with a clear restore button that
  returns the panel to its exact original width (Panel.tsx grh-reopen / grh-collapsed).
- FEATURE: Panel is drag-resizable via a left-edge handle (data-testid panel-resize-handle);
  width clamps 320px..min(760, 80vw) and persists as panelWidthPct. Compact mode hides the handle.
- Verified by testing_agent iteration_1.json: frontend 100%, all 3 items pass; 11/11 logic unit tests pass.
- Downloadable zips refreshed: frontend/public/german-reading-helper-dist.zip (+ -source.zip).

## Iteration (2026-06) — translation panel scroll fix
- BUG: long translations clipped — only top (English) row showed; lower languages unreachable.
- ROOT CAUSE: cards were flex children of the flex-column body and shrank (flex-shrink:1),
  so the body never overflowed and no scrollbar appeared.
- FIX (panel-styles.ts): .grh-body flex:1 1 auto + min-height:0 + overflow-y:auto;
  '.grh-body > * { flex:0 0 auto }'; header + history flex:0 0 auto (pinned);
  .grh-hist-list max-height:30vh scroll; added data-testid="panel-body"; header brand-name nowrap/ellipsis.
- Verified: testing_agent iteration_3.json frontend 100% (12/12) — all 4 languages reachable via body scroll; regressions pass. Zips refreshed.
