import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { CheckoutPage } from '../../pages/checkout.page'
import { CartPage } from '../../pages/cart.page'

test.describe('Feature: TASK-102 - Usuario puede completar una compra', () => {
  /*
   * Acceptance Criteria (from Jira):
   * 1. Usuario puede ir al checkout desde el carrito
   * 2. Usuario debe ingresar información de envío
   * 3. Usuario puede revisar el resumen antes de confirmar
   * 4. Usuario recibe confirmación al completar la compra
   * 5. El carrito se vacía después de completar la compra
   */

  test.beforeEach(async ({ page }) => {
    // Arrange: login y agregar producto al carrito
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await page.getByRole('button', { name: 'Add to cart' }).first().click()
  })

  // --- Tests para funcionalidad existente ---

  test('should navigate to checkout from cart', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)
    await cartPage.goto()

    // Act
    await cartPage.checkoutButton.click()

    // Assert
    await expect(page).toHaveURL('/checkout-step-one.html')
  })

  test('should complete purchase successfully', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    await cartPage.goto()
    await cartPage.checkoutButton.click()

    // Act
    await checkoutPage.fillInfo('QA', 'Tester', '12345')
    await checkoutPage.finish()

    // Assert
    await checkoutPage.expectSuccess()
  })

  // --- Tests pendientes (para el dev) ---

  test.fixme('should show order summary before confirming', async ({ page }) => {
    // TODO: Dev necesita implementar página de resumen
    // Steps:
    //   1. Completar información de envío
    //   2. Hacer clic en Continue
    // Expected: Página muestra resumen con productos y precio total
  })

  test.fixme('should empty cart after successful purchase', async ({ page }) => {
    // TODO: Dev necesita vaciar el carrito después de comprar
    // Steps:
    //   1. Completar compra exitosamente
    //   2. Volver a la página de productos
    // Expected: El contador del carrito muestra 0
  })

  // --- Edge cases ---

  test.fixme('should show error when zip code is invalid', async ({ page }) => {
    // TODO: Validación del código postal
    // Steps:
    //   1. En checkout, ingresar zip code "abc" (inválido)
    //   2. Hacer clic en Continue
    // Expected: Mensaje de error "Invalid zip code"
  })

  test.fixme('should show error when fields are empty', async ({ page }) => {
    // TODO: Validación de campos requeridos
    // Expected: Error "First Name is required" si se deja vacío
  })

})