import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

test.describe('Smoke: Navigation', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('should sort products by price low to high', async ({ page }) => {
    // ARRANGE
    const sortDropdown = page.locator('[data-test="product-sort-container"]')

    // ACT
    await sortDropdown.selectOption('lohi')

    // ASSERT — el primer producto debe ser el más barato
    const firstPrice = page.locator('.inventory_item_price').first()
    await expect(firstPrice).toHaveText('$7.99')
  })

  test('should view product detail', async ({ page }) => {
    // ACT — clic en el primer producto
    await page.locator('.inventory_item_name').first().click()

    // ASSERT — debe mostrar el detalle
    await expect(page.locator('.inventory_details_name')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible()
  })

  test('should show all 6 products', async ({ page }) => {
    // ASSERT
    await expect(page.locator('.inventory_item')).toHaveCount(6)
  })

})