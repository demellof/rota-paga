import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_forjador_page(page: Page):
    """
    Verifies the functionality of the Forjador de Sigilos page.
    1. Navigates to the page.
    2. Fills out the form to create a new sigil.
    3. Clicks the 'Save' button.
    4. Waits for the gallery to update and confirms the new sigil is present.
    5. Takes a screenshot.
    """
    print("Navigating to the Forjador page...")
    # 1. Navigate to the Forjador page (using the default Vite port)
    page.goto("http://localhost:5173/forjador")

    # Wait for the initial content to be loaded, specifically the static ancient seals
    print("Waiting for the gallery of ancient seals to be visible...")
    expect(page.get_by_text("Selos Antigos de Poder")).to_be_visible(timeout=10000)

    # Also wait for the user sigils section to be ready
    print("Waiting for the user sigils section to load...")
    expect(page.get_by_text("Carregando seus sigilos...")).to_be_visible()
    # Wait for the loading message to disappear
    expect(page.get_by_text("Carregando seus sigilos...")).not_to_be_visible(timeout=10000)

    # Define the intention for the new sigil
    intention_text = "Clareza Mental"
    print(f"Typing intention: '{intention_text}'")

    # 2. Fill out the form
    page.get_by_label("Intenção:").fill(intention_text)

    print("Selecting planet: 'Sol'")
    page.get_by_label("Corpo Celeste:").select_option("Sol")

    # 3. Click the save button
    print("Clicking 'Salvar no Grimório'...")
    page.get_by_role("button", name="Salvar no Grimório").click()

    # 4. Wait for the gallery to update and assert the new sigil is present
    print("Waiting for the new sigil to appear in the gallery...")
    # We look for a card that contains the text of our intention
    new_sigil_card = page.locator(".grid .content-card-sm", has_text=intention_text)

    expect(new_sigil_card).to_be_visible(timeout=10000)
    print("New sigil is visible in the gallery.")

    # 5. Take a screenshot for visual confirmation
    screenshot_path = "jules-scratch/verification/verification.png"
    print(f"Taking screenshot and saving to {screenshot_path}")
    page.screenshot(path=screenshot_path, full_page=True)

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_forjador_page(page)
            print("Verification script completed successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()