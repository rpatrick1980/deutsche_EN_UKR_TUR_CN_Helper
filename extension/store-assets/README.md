# Chrome Web Store assets

Ready-to-upload graphics + copy for publishing German Reading Helper.

| File | Size | Use |
|---|---|---|
| `../public/icons/icon-128.png` | 128×128 | Store icon |
| `promo-small-440x280.png` | 440×280 | Small promo tile |
| `promo-marquee-1400x560.png` | 1400×560 | Marquee promo tile |
| `feature-1280x800.png` | 1280×800 | Feature / hero graphic |
| `screenshot-1-1280x800.png` | 1280×800 | Listing screenshot |
| `listing.md` | — | Name, descriptions, permission justifications |
| `privacy-policy.html` | — | Privacy policy (host it and paste the URL in the listing) |

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
The composed `screenshot-1` is an accurate mockup. For extra authenticity you can
also capture the real UI: load the unpacked extension, open a German article,
trigger Translate/Explain Grammar, and screenshot at 1280×800. A live design
preview of the panel is available at `/grh-demo/index.html` (add `#compact` or
`#dark` to the URL).
