import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Navegar para a página da Jornada
            page.goto("http://localhost:5173/jornada")

            # 2. Localizar o contêiner da Etapa 2
            etapa_2_container = page.locator("div.transition-opacity").filter(
                has_text="Etapa 2: Semeando com Propósito"
            )

            # 3. Localizar o botão "Marcar" e verificar seu estado inicial
            marcar_button = etapa_2_container.get_by_role("button", name="Marcar")
            expect(marcar_button).to_be_visible()

            # 4. Clicar no botão para concluir a etapa
            marcar_button.click()

            # 5. Verificar se a UI foi atualizada e o botão agora mostra "✓ Feito"
            # Esta é a prova de que a mutação e a revalidação da query funcionaram.
            feito_button = etapa_2_container.get_by_role("button", name="✓ Feito")
            expect(feito_button).to_be_visible(timeout=5000)

            # 6. Tirar uma captura de tela do resultado final
            page.screenshot(path="jules-scratch/verification/verification.png")

            print("Verification script ran successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()