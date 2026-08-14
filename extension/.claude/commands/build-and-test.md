---
description: Build the extension, run logic tests, and report a clean status
---
Do a full verification pass and report concisely.

1. `cd extension && yarn build` — must pass `tsc --noEmit` and `vite build`.
   If it fails, fix type/build errors (do not disable strictness).
2. Run the logic unit tests:
   `npx esbuild test/logic.test.ts --bundle --platform=node --format=cjs --outfile=/tmp/t.cjs && node /tmp/t.cjs`
   All must pass.
3. Rebuild the demo preview so UI can be inspected:
   `npx vite build --config vite.demo.config.ts`
4. Report: build result, test pass/fail counts, and anything you changed.

Do NOT introduce a backend or new dependencies for this command. Keep it read/verify
plus minimal fixes only.
