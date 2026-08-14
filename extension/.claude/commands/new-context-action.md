---
description: Add a new right-click context-menu action end-to-end
argument-hint: <ActionName> — short description of what it does
---
Add a new context-menu action: **$ARGUMENTS**.

Wire it through the full message flow described in `CLAUDE.md` §4. Steps:

1. `src/shared/types.ts` — extend `ActionType` with the new action; add any new
   result fields and a message type if the payload differs from existing ones.
2. `src/shared/constants.ts` — add a `CONTEXT_MENU` id for it.
3. `src/background/service-worker.ts` — create the menu item in `createMenus()` and
   map `contextMenus.onClicked` → `RUN_ACTION` for it. Handle its `OPENAI_REQUEST`
   branch (cache key already includes the action).
4. `src/services/prompts.ts` — add a prompt builder returning strict JSON
   (`response_format: json_object`). Keep output compact.
5. `src/services/openai.ts` — route the new action to its prompt builder and parse
   its result into the `{ ok, ... }` shape.
6. `src/content/content-main.tsx` — no branch needed if it reuses the card flow;
   otherwise render its result in `Panel.tsx` with a new card body + `data-testid`.
7. `src/content/Panel.tsx` — add a pill label/colour for the new action if desired.

Keep German-only validation and the ≤700-word cap. Add a `data-testid` to any new
interactive element. Run `yarn build` + logic tests and report results.
