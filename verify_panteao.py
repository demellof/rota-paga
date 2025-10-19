import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("http://localhost:3000", timeout=10000)

            # Navigate to Panteão page
            await page.get_by_role("link", name="O Panteão").click()

            # Wait for the first archetype card to become visible.
            # This is a reliable way to know the async data has loaded.
            first_card = page.locator(".content-card").first
            await expect(first_card).to_be_visible(timeout=15000)

            await page.screenshot(path="panteao_final.png")
            print("Screenshot saved to panteao_final.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="panteao_error.png")
        finally:
            await browser.close()

asyncio.run(main())