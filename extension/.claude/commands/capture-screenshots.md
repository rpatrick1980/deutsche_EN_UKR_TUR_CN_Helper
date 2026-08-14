---
description: Regenerate the Chrome Web Store screenshots and promo tiles
---
Regenerate the store assets in `extension/store-assets/`.

1. Rebuild the preview that renders the real UI:
   `cd extension && npx vite build --config vite.demo.config.ts`
   (variants: `index.html`, `?v=grammar`, `?v=compact`, `?v=dark`, `settings.html`)
2. Capture the 1280x800 live screenshots (headless Chromium via Playwright):
   `cd store-assets && python3 capture_live.py`
   Requires `pip install playwright && python -m playwright install chromium` once.
3. Regenerate promo tiles + feature graphic (Pillow):
   `python3 build_assets.py`
4. Verify sizes: promo-small 440x280, promo-marquee 1400x560, feature/screenshots
   1280x800. Update `store-assets/listing.md` if screenshots changed.

If the demo isn't served locally, either run the preview build's output through a
static server or point the capture script's BASE at the correct host. Report which
files were (re)generated.
