import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { CartPage } from '../../pages/cart.page'
import { CheckoutPage } from '../../pages/checkout.page'

test.describe('Feature: TASK-104 - Usuario puede ver detalle de producto', () => {
  /*
   * Acceptance Criteria (from Jira):
   * 1. Usuario puede hacer clic en un producto y ver su detalle
   * 2. La página de detalle muestra nombre, descripción y precio
   * 3. Usuario puede agregar el producto al carrito desde el detalle
   * 4. Usuario puede volver a la lista de productos
   * 5. El botón cambia a "Remove" después de agregar al carrito
   */

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  // --- Tests para funcionalidad existente ---

  test('should navigate to product detail page', async ({ page }) => {
    // Act
    await page.locator('.inventory_item_name').first().click()

    // Assert
    await expect(page).toHaveURL(/inventory-item/)
    await expect(page.locator('.inventory_details_name')).toBeVisible()
  })

  test('should display product name, description and price', async ({ page }) => {
    // Act
    await page.locator('.inventory_item_name').first().click()

    // Assert
    await expect(page.locator('.inventory_details_name')).toBeVisible()
    await expect(page.locator('.inventory_details_desc')).toBeVisible()
    await expect(page.locator('.inventory_details_price')).toBeVisible()
  })

  test('should add product to cart from detail page', async ({ page }) => {
    // Arrange
    const cartPage = new CartPage(page)
    await page.locator('.inventory_item_name').first().click()

    // Act
    await page.getByRole('button', { name: 'Add to cart' }).click()

    // Assert
    await cartPage.expectItemCount(1)
  })

  test('should go back to products list', async ({ page }) => {
    // Arrange
    await page.locator('.inventory_item_name').first().click()

    // Act
    await page.getByRole('button', { name: 'Back to products' }).click()

    // Assert
    await expect(page).toHaveURL('/inventory.html')
  })

  // --- Tests pendientes (para el dev) ---

  test.fixme('should change button to Remove after adding to cart', async ({ page }) => {
    // TODO: Dev necesita cambiar el botón de "Add to cart" a "Remove"
    // Steps:
    //   1. Ir al detalle de un producto
    //   2. Hacer clic en "Add to cart"
    // Expected: El botón cambia a "Remove"
  })

  test.fixme('should remove product from cart from detail page', async ({ page }) => {
    // TODO: Dev necesita implementar "Remove" desde detalle
    // Steps:
    //   1. Agregar producto desde detalle
    //   2. Hacer clic en "Remove"
    // Expected: El contador del carrito vuelve a 0
  })

  // --- Edge cases ---

  test.fixme('should show correct product when navigating directly via URL', async ({ page }) => {
    // TODO: Navegación directa por URL debe mostrar el producto correcto
    // Expected: /inventory-item.html?id=1 muestra el producto con id 1
  })

})