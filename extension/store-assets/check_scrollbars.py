import asyncio, sys
from playwright.async_api import async_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000/grh-demo/index.html?v=paragraph'

JS = """() => {
  const sr = [...document.querySelectorAll('div')].map(d => d.shadowRoot).find(Boolean)
  const m = (el) => ({ scrollH: el.scrollHeight, clientH: el.clientHeight, barW: el.offsetWidth - el.clientWidth })
  return { body: m(sr.querySelector('.grh-body')), hist: m(sr.querySelector('.grh-hist-list')) }
}"""

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(ignore_default_args=['--hide-scrollbars'])
        pg = await b.new_page(viewport={'width': 1440, 'height': 800})
        await pg.goto(URL, wait_until='networkidle')
        await pg.wait_for_timeout(800)
        print(await pg.evaluate(JS))
        await pg.screenshot(path='/tmp/scrollbars.png', clip={'x': 1050, 'y': 0, 'width': 390, 'height': 800})
        await b.close()

asyncio.run(main())
