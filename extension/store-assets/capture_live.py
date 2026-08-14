#!/usr/bin/env python3
"""Capture real in-browser screenshots of the actual Panel + Settings UI
(rendered React components) at Chrome Web Store dimensions (1280x800)."""
import asyncio, os
from playwright.async_api import async_playwright

OUT = os.path.dirname(os.path.abspath(__file__))
BASE = "http://localhost:3000/grh-demo"

SHOTS = [
    ("index.html",            "screenshot-live-1-translate-1280x800.png"),
    ("index.html?v=grammar",  "screenshot-live-2-grammar-1280x800.png"),
    ("index.html?v=compact",  "screenshot-live-3-compact-1280x800.png"),
    ("index.html?v=dark",     "screenshot-live-4-dark-1280x800.png"),
    ("settings.html",         "screenshot-live-5-settings-1280x800.png"),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(args=["--no-sandbox"])
        page = await browser.new_page(viewport={"width": 1280, "height": 800},
                                      device_scale_factor=1)
        for path, out in SHOTS:
            await page.goto(f"{BASE}/{path}", wait_until="networkidle")
            await page.wait_for_timeout(1200)  # let entrance animations settle
            await page.screenshot(path=os.path.join(OUT, out), full_page=False)
            print("captured", out)
        await browser.close()

asyncio.run(main())
