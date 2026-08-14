# Chrome Web Store assets

Ready-to-upload graphics + copy for publishing German Reading Helper.

| File | Size | Use |
|---|---|---|
| `../public/icons/icon-128.png` | 128×128 | Store icon |
| `promo-small-440x280.png` | 440×280 | Small promo tile |
| `promo-marquee-1400x560.png` | 1400×560 | Marquee promo tile |
| `feature-1280x800.png` | 1280×800 | Feature / hero graphic |
| `screenshot-live-1-translate-1280x800.png` | 1280×800 | **Listing screenshot** — translate + grammar |
| `screenshot-live-2-grammar-1280x800.png` | 1280×800 | **Listing screenshot** — grammar |
| `screenshot-live-3-compact-1280x800.png` | 1280×800 | **Listing screenshot** — compact mode |
| `screenshot-live-4-dark-1280x800.png` | 1280×800 | **Listing screenshot** — dark mode |
| `screenshot-live-5-settings-1280x800.png` | 1280×800 | **Listing screenshot** — settings |
| `screenshot-1-1280x800.png` | 1280×800 | Composed mockup (backup) |
| `listing.md` | — | Name, descriptions, permission justifications |
| `privacy-policy.html` | — | Privacy policy (host it and paste the URL in the listing) |

The `screenshot-live-*` files are **real captures of the actual React UI** (the same
Panel and Settings components the extension ships), rendered over a realistic German
news article and photographed at exactly 1280×800.

## Regenerate the live screenshots
```bash
cd extension
npx vite build --config vite.demo.config.ts   # builds the preview into frontend/public/grh-demo
cd store-assets
python3 capture_live.py    # headless Chromium → captures the 5 shots at 1280x800
```
Variants are driven by query params: `index.html`, `?v=grammar`, `?v=compact`,
`?v=dark`, and `settings.html`.

## Privacy policy
`privacy-policy.html` is also served from the frontend preview at:
`https://deutsch-helper-13.preview.emergentagent.com/privacy.html`
Host it anywhere public and paste that URL into the store listing.

## Regenerate the graphics
```bash
cd extension/store-assets
python3 build_assets.py   # requires Pillow; reads /tmp/promo_bg.jpeg + the extension icon
```

## Tip: capture live screenshots
The `screenshot-live-*` PNGs are already real captures of the running UI (see the
regeneration commands above). For even more authenticity you can also load the
unpacked extension, trigger a lookup on any German site, and screenshot at 1280×800.
A live design preview is at `/grh-demo/index.html` (`?v=compact`, `?v=dark`,
`?v=grammar`) and `/grh-demo/settings.html`.
