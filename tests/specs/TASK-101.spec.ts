import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { ProductsPage } from '../../pages/products.page'
import { CartPage } from '../../pages/cart.page'

test.describe('Feature: TASK-101 - Usuario puede gestionar el carrito', () => {
  /*
   * Acceptance Criteria (from Jira):
   * 1. Usuario puede agregar productos al carrito
   * 2. Usuario puede eliminar productos del carrito
   * 3. El contador del carrito se actualiza en tiempo real
   * 4. Usuario puede agregar múltiples productos
   * 5. El carrito persiste al navegar entre páginas
   */

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  // --- Tests para funcionalidad existente ---

  test('should add product to cart and update counter', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)

    // Act
    await page.getByRole('button', { name: 'Add to cart' }).first().click()

    // Assert
    await cartPage.expectItemCount(1)
  })

  test('should remove product from cart', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)
    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await cartPage.goto()

    // Act
    await cartPage.removeFirstItem()

    // Assert
    await cartPage.expectEmpty()
  })

  test('should add multiple products to cart', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)

    // Act
    const addButtons = page.getByRole('button', { name: 'Add to cart' })
    await addButtons.nth(0).click()
    await addButtons.nth(1).click()
    await addButtons.nth(2).click()

    // Assert
    await cartPage.expectItemCount(3)
  })

  // --- Tests pendientes (para el dev) ---

  test.fixme('should persist cart when navigating between pages', async ({ page }) => {
    // TODO: Dev necesita verificar que el carrito persiste
    // Steps:
    //   1. Agregar un producto al carrito
    //   2. Navegar al detalle de un producto
    //   3. Volver a la lista de productos
    // Expected: El contador del carrito sigue mostrando 1
  })

  test.fixme('should show empty cart message when no products', async ({ page }) => {
    // TODO: Dev necesita implementar mensaje de carrito vacío
    // Steps:
    //   1. Ir al carrito sin agregar productos
    // Expected: Mensaje "Your cart is empty" visible
  })

  // --- Edge cases ---

  test.fixme('should not allow adding same product twice', async ({ page }) => {
    // TODO: Validación - el botón debe cambiar a "Remove" después de agregar
    // Expected: No puede haber duplicados del mismo producto
  })

})