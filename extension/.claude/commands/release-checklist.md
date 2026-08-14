---
description: Run the Chrome Web Store publish readiness checklist
---
Walk the extension through publish readiness and report a pass/fail per item.

Verify and fix where trivial; otherwise list what's blocking:

- [ ] `yarn build` clean; `dist/manifest.json` valid MV3, version bumped.
- [ ] Permissions in `manifest.config.ts` are still minimal and each is justified in
      `README.md` and `store-assets/listing.md`.
- [ ] `host_permissions` matches the actual network target (OpenAI direct, or proxy).
- [ ] Privacy policy hosted; URL pasted into `store-assets/listing.md`.
      (`store-assets/privacy-policy.html` is the source.)
- [ ] Single-purpose statement + permission justifications filled in `listing.md`.
- [ ] Assets present and correct dims: icon 128, promo 440x280 + 1400x560,
      feature 1280x800, at least 1–5 screenshots 1280x800.
- [ ] Name/short/long descriptions finalized in `listing.md`.
- [ ] No secrets/keys committed anywhere; API key only via `chrome.storage.local`.
- [ ] Manual smoke test done: load unpacked, set key, translate + explain on a real
      German site, dark mode, collapse/restore, resize, history + cache.

Output a checklist with ✅/❌ and the exact next action for each ❌.
