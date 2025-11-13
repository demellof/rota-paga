import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Construct the file path to be absolute
        file_path = f"file://{os.path.abspath('isolated_test.html')}"
        await page.goto(file_path)
        await page.screenshot(path="isolated_test.png")
        await browser.close()
        print("Screenshot saved to isolated_test.png")

if __name__ == "__main__":
    asyncio.run(main())
