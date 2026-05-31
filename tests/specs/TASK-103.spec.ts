import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

test.describe('Feature: TASK-103 - Usuario puede ordenar y filtrar productos', () => {
  /*
   * Acceptance Criteria (from Jira):
   * 1. Usuario puede ordenar productos por nombre A-Z
   * 2. Usuario puede ordenar productos por nombre Z-A
   * 3. Usuario puede ordenar por precio menor a mayor
   * 4. Usuario puede ordenar por precio mayor a menor
   * 5. El orden se mantiene al navegar
   */

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('should sort products A to Z by default', async ({ page }) => {
    const firstProduct = page.locator('.inventory_item_name').first()
    await expect(firstProduct).toHaveText('Sauce Labs Backpack')
  })

  test('should sort products by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi')
    const firstPrice = page.locator('.inventory_item_price').first()
    await expect(firstPrice).toHaveText('$7.99')
  })

  test('should sort products Z to A', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za')
    const firstProduct = page.locator('.inventory_item_name').first()
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)')
  })

  test.fixme('should sort products by price high to low', async ({ page }) => {
    // TODO: Dev necesita implementar ordenamiento por precio mayor a menor
    // Steps:
    //   1. Seleccionar "Price (high to low)" en el dropdown
    // Expected: El producto más caro aparece primero ($49.99)
  })

  test.fixme('should maintain sort order after adding to cart', async ({ page }) => {
    // TODO: El orden no debe cambiar al interactuar con el carrito
  })

  test.fixme('should show all products after removing filter', async ({ page }) => {
    // TODO: Resetear filtros debe mostrar todos los productos
  })

})