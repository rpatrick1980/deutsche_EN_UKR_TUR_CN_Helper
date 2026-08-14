#!/usr/bin/env python3
"""Compose Chrome Web Store assets (promo tiles, feature graphic, screenshot mockup)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = HERE
BG = "/tmp/promo_bg.jpeg"
ICON = os.path.join(HERE, "..", "public", "icons", "icon-128.png")

FB = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
FR = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
FI = "/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf"

def font(path, size):
    return ImageFont.truetype(path, size)

def cover(img, w, h):
    """Center-crop resize to exactly w x h."""
    iw, ih = img.size
    scale = max(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    x = (nw - w) // 2
    y = (nh - h) // 2
    return img.crop((x, y, x + w, y + h))

def rounded(draw, box, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

ACCENT = (59, 76, 202)
ACCENT2 = (14, 159, 154)
WHITE = (255, 255, 255)

bg_src = Image.open(BG).convert("RGB")
icon = Image.open(ICON).convert("RGBA")

# ---------------------------------------------------------------- promo marquee 1400x560
def promo_marquee():
    W, H = 1400, 560
    im = cover(bg_src.copy(), W, H)
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    d.rectangle([0, 0, W, H], fill=(12, 16, 40, 90))
    im = Image.alpha_composite(im.convert("RGBA"), ov)
    d = ImageDraw.Draw(im)
    ic = icon.resize((150, 150), Image.LANCZOS)
    im.paste(ic, (90, 205), ic)
    d.text((280, 200), "German Reading Helper", font=font(FB, 62), fill=WHITE)
    d.text((282, 285), "Translate & explain German, right on the page.", font=font(FR, 32), fill=(220, 226, 245))
    d.text((282, 345), "English · Ukrainian · Turkish · Chinese", font=font(FB, 26), fill=(150, 220, 214))
    im.convert("RGB").save(os.path.join(OUT, "promo-marquee-1400x560.png"))

# ---------------------------------------------------------------- small promo 440x280
def promo_small():
    W, H = 440, 280
    im = cover(bg_src.copy(), W, H)
    ov = Image.new("RGBA", (W, H), (12, 16, 40, 95))
    im = Image.alpha_composite(im.convert("RGBA"), ov)
    d = ImageDraw.Draw(im)
    ic = icon.resize((92, 92), Image.LANCZOS)
    im.paste(ic, ((W - 92) // 2, 44), ic)
    def center(text, y, f, fill):
        w = d.textlength(text, font=f)
        d.text(((W - w) / 2, y), text, font=f, fill=fill)
    center("German Reading", 152, font(FB, 30), WHITE)
    center("Helper", 186, font(FB, 30), WHITE)
    center("Translate & grammar", 232, font(FR, 18), (150, 220, 214))
    im.convert("RGB").save(os.path.join(OUT, "promo-small-440x280.png"))

# ---------------------------------------------------------------- feature/hero 1280x800
def feature():
    W, H = 1280, 800
    im = cover(bg_src.copy(), W, H)
    ov = Image.new("RGBA", (W, H), (10, 14, 34, 120))
    im = Image.alpha_composite(im.convert("RGBA"), ov)
    d = ImageDraw.Draw(im)
    ic = icon.resize((120, 120), Image.LANCZOS)
    im.paste(ic, (100, 90), ic)
    d.text((240, 108), "German Reading Helper", font=font(FB, 52), fill=WHITE)
    d.text((242, 176), "Read German webpages with confidence.", font=font(FR, 28), fill=(214, 222, 245))
    feats = [
        "Right-click any German text — Translate or Explain Grammar",
        "Translations: English · Ukrainian · Turkish · Chinese",
        "Compact grammar notes: gender, tense, mood, voice & more",
        "Tidy side panel · compact / expanded · dark mode",
        "Local history & cache · private by design",
    ]
    y = 320
    for f in feats:
        d.ellipse([110, y + 10, 128, y + 28], fill=(56, 211, 203))
        d.text((150, y), f, font=font(FR, 30), fill=WHITE)
        y += 78
    im.convert("RGB").save(os.path.join(OUT, "feature-1280x800.png"))

# ---------------------------------------------------------------- screenshot mockup 1280x800
def screenshot():
    W, H = 1280, 800
    im = Image.new("RGB", (W, H), (238, 240, 247))
    d = ImageDraw.Draw(im)
    # browser chrome
    d.rectangle([0, 0, W, 56], fill=(255, 255, 255))
    for i, c in enumerate([(237, 106, 94), (245, 191, 79), (98, 197, 84)]):
        d.ellipse([24 + i * 26, 22, 40 + i * 26, 38], fill=c)
    rounded(d, [120, 16, 760, 40], 12, fill=(240, 242, 248))
    d.text((140, 20), "https://www.beispiel.de/rhein", font=font(FR, 16), fill=(120, 128, 145))
    d.line([0, 56, W, 56], fill=(226, 229, 239), width=1)

    # page article (left)
    d.text((70, 110), "Der Rhein — ein Fluss mit Geschichte", font=font(FB, 34), fill=(30, 33, 40))
    para = [
        "Der Rhein ist einer der längsten Flüsse Europas. Er fließt",
        "durch mehrere Länder und war schon immer eine wichtige",
        "Handelsroute. Viele Städte wurden an seinen Ufern",
        "gegründet, weil der Fluss Wasser und Transport bot.",
        "",
        "Im Mittelalter kontrollierten zahlreiche Fürsten den",
        "Handel entlang des Flusses und erhoben Zölle von den",
        "Kaufleuten.",
    ]
    y = 176
    for line in para:
        d.text((70, y), line, font=font(FR, 22), fill=(60, 66, 78))
        y += 40
    # highlighted selection
    d.rectangle([70, 176, 70 + d.textlength(para[0], font=font(FR, 22)), 204], fill=(59, 76, 202, 40), outline=None)
    d.text((70, 176), para[0], font=font(FR, 22), fill=(20, 24, 60))

    # ---- side panel (right)
    px = 900
    pw = W - px
    d.rectangle([px, 56, W, H], fill=(255, 255, 255))
    d.line([px, 56, px, H], fill=(226, 229, 239), width=1)
    # header
    d.rectangle([px, 56, W, 112], fill=(246, 247, 251))
    d.line([px, 112, W, 112], fill=(226, 229, 239), width=1)
    ic = icon.resize((26, 26), Image.LANCZOS)
    im.paste(ic, (px + 18, 71), ic)
    d.text((px + 52, 76), "German Reading Helper", font=font(FB, 15), fill=(30, 33, 40))

    # translate card
    cx0, cx1 = px + 16, W - 16
    rounded(d, [cx0, 132, cx1, 506], 14, fill=(246, 247, 251), outline=(226, 229, 239), width=1)
    rounded(d, [cx0, 132, cx1, 168], 14, fill=(232, 235, 246))
    rounded(d, [cx0 + 14, 142, cx0 + 108, 162], 10, fill=ACCENT)
    d.text((cx0 + 26, 144), "TRANSLATE", font=font(FB, 12), fill=WHITE)
    d.line([cx0 + 14, 194, cx0 + 14, 236], fill=ACCENT, width=3)
    d.text((cx0 + 26, 186), "Der Rhein ist einer der", font=font(FI, 15), fill=(120, 128, 145))
    d.text((cx0 + 26, 208), "längsten Flüsse Europas.", font=font(FI, 15), fill=(120, 128, 145))

    rows = [
        ("ENGLISH", "The Rhine is one of the longest rivers in Europe."),
        ("UKRAINIAN", "Рейн — одна з найдовших річок Європи."),
        ("TURKISH", "Ren, Avrupa'nın en uzun nehirlerinden biridir."),
    ]
    ry = 256
    for label, text in rows:
        d.text((cx0 + 20, ry), label, font=font(FB, 12), fill=ACCENT)
        # wrap simple
        words = text.split(" ")
        line = ""
        ly = ry + 20
        for w in words:
            test = (line + " " + w).strip()
            if d.textlength(test, font=font(FR, 17)) > pw - 60:
                d.text((cx0 + 20, ly), line, font=font(FR, 17), fill=(30, 33, 40))
                ly += 26
                line = w
            else:
                line = test
        d.text((cx0 + 20, ly), line, font=font(FR, 17), fill=(30, 33, 40))
        ry = ly + 42

    # grammar card
    rounded(d, [cx0, 518, cx1, 770], 14, fill=(246, 247, 251), outline=(226, 229, 239), width=1)
    rounded(d, [cx0, 518, cx1, 554], 14, fill=(224, 244, 242))
    rounded(d, [cx0 + 14, 528, cx0 + 100, 548], 10, fill=ACCENT2)
    d.text((cx0 + 26, 530), "GRAMMAR", font=font(FB, 12), fill=WHITE)
    bullets = [
        "\"kontrollierten\" = verb, 3rd person",
        "   plural, simple past (Präteritum)",
        "Infinitive: kontrollieren (to control)",
        "Weak verb: stem + -ten ending",
        "Active voice, indicative mood",
    ]
    by = 572
    for b in bullets:
        if not b.startswith("   "):
            d.ellipse([cx0 + 20, by + 8, cx0 + 28, by + 16], fill=ACCENT2)
        d.text((cx0 + 40, by), b.strip(), font=font(FR, 16), fill=(40, 44, 56))
        by += 34

    im.save(os.path.join(OUT, "screenshot-1-1280x800.png"))

promo_marquee()
promo_small()
feature()
screenshot()
print("assets written to", OUT)
for f in sorted(os.listdir(OUT)):
    if f.endswith(".png"):
        print(" -", f, Image.open(os.path.join(OUT, f)).size)
