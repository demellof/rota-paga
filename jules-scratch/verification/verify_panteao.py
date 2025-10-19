from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Navigate to the app. The dev server runs on port 5173 by default.
            page.goto("http://localhost:5173")

            # 2. Navigate to Panteão page
            page.get_by_role("link", name="O Panteão").click()

            # 3. Wait for the page title to be visible, which indicates the page has loaded
            expect(page.get_by_role("heading", name="O Panteão")).to_be_visible()

            # 4. Take a screenshot of the initial state
            page.screenshot(path="jules-scratch/verification/panteao_initial.png")

            # 5. Click the favorite button on the first archetype
            first_card = page.locator(".content-card").first
            favorite_button = first_card.get_by_role("button", name="Favoritar")
            favorite_button.click()

            # 6. Wait for the icon to change
            expect(favorite_button).to_have_attribute("aria-label", "Desfavoritar")

            # 7. Take a screenshot of the favorited state
            page.screenshot(path="jules-scratch/verification/panteao_favorited.png")

            print("Verification script completed successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()