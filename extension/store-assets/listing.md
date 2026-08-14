# Chrome Web Store — Listing Copy

## Name
German Reading Helper — Translate & Grammar

## Summary (132 chars max)
Read German webpages with confidence. Right-click to translate and get compact grammar explanations in a tidy side panel.

## Category
Education (secondary: Productivity)

## Language
English (UI); helps translate German into English, Ukrainian, Turkish & Chinese

---

## Detailed description

**Read German the smart way — without leaving the page.**

German Reading Helper is built for adult learners reading real German websites,
news, and articles. Highlight any German text, right-click, and instantly get:

• **Translations** into the languages you choose — English, Ukrainian, Turkish, and Chinese.
• **Compact grammar explanations** — gender, part of speech, tense, mood, voice and more, in clear bullet points under 200 words.

Everything appears in a clean side panel pinned to the right of the page, so you
never lose your place. Switch between **expanded and compact** modes, pin results
while you look up the next word, and revisit your **recent history** any time.

**Why learners like it**
- Two right-click actions: Translate and Explain Grammar.
- Works on the text you select — plus best-effort capture when you don't.
- German-only focus with helpful guidance when text can't be read.
- Light and dark mode.
- Local history and cache — fast, private, and on your device.

**Privacy first**
Nothing is read automatically. Text is sent to OpenAI only when you explicitly
choose Translate or Explain Grammar. No tracking, no analytics, no server of ours.
Full policy: see the "Privacy Policy" link below.

**Setup (1 minute)**
1. Install and click the toolbar icon to open Settings.
2. Paste your OpenAI API key (from platform.openai.com/api-keys).
3. Pick your languages and start reading.

*Requires your own OpenAI API key. Desktop Chrome only for v1.*

---

## Privacy policy URL
Host `privacy.html` (included in this repo) and paste the public URL here.
Preview build serves it at: https://deutsch-helper-13.preview.emergentagent.com/privacy.html

## Single purpose (for the store form)
The extension translates selected German text and explains its grammar, shown in
an on-page side panel, only when the user invokes it via the context menu.

## Permission justifications (for the store form)
- contextMenus: to provide the "Translate" and "Explain Grammar" right-click actions.
- storage: to save user settings and a local history/cache of lookups on the device.
- activeTab: to read the user's selected text and show the panel on the current tab.
- scripting: to display a reload notice on pages loaded before the extension was installed.
- host permission (https://api.openai.com/*): to send selected text to OpenAI for translation/explanation.

## Asset checklist
- [x] Icon 128x128 (extension/public/icons/icon-128.png)
- [x] Small promo tile 440x280 (store-assets/promo-small-440x280.png)
- [x] Marquee promo tile 1400x560 (store-assets/promo-marquee-1400x560.png)
- [x] Feature/hero graphic 1280x800 (store-assets/feature-1280x800.png)
- [x] Screenshots 1280x800 — real captures of the running UI:
      - screenshot-live-1-translate-1280x800.png (translate + grammar over an article)
      - screenshot-live-2-grammar-1280x800.png (grammar explanation)
      - screenshot-live-3-compact-1280x800.png (compact mode, all 4 languages)
      - screenshot-live-4-dark-1280x800.png (dark mode)
      - screenshot-live-5-settings-1280x800.png (settings page)
- [x] Composed screenshot mockup (store-assets/screenshot-1-1280x800.png) — optional backup
