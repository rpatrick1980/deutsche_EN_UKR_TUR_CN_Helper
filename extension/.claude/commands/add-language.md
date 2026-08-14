---
description: Add a new target translation language end-to-end
argument-hint: <LanguageName> (e.g. French)
---
Add a new target translation language: **$ARGUMENTS**.

Follow the codebase conventions in `CLAUDE.md`. Make ALL of these changes:

1. `src/shared/types.ts` — add "$ARGUMENTS" to the `TargetLanguage` union and to
   `ALL_LANGUAGES`.
2. `src/shared/constants.ts` — `DEFAULT_SETTINGS.enabledLanguages` gets "$ARGUMENTS": true
   (via the `allEnabled()` helper it should be automatic — verify it is).
3. `src/services/prompts.ts` — if "$ARGUMENTS" needs a script/variant note (like Chinese =
   Traditional/Taiwan), add a one-line instruction in `buildTranslationMessages`.
4. `src/options/OptionsApp.tsx` — confirm the language checkbox renders (it maps over
   `ALL_LANGUAGES`, so it should appear automatically; verify the `data-testid`
   `settings-lang-$ARGUMENTS` is produced).
5. Update `test/logic.test.ts` if a language-specific assertion is warranted.

Then:
- Run `yarn build` and the logic tests (see CLAUDE.md §8). Fix any type errors.
- Do NOT touch storage migration — `getSettings()` deep-merges defaults, so existing
  users get the new language enabled by default.
Report exactly which files changed and the build/test result.
