import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { ProductsPage } from '../../pages/products.page'

test.describe('Products', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('should display 6 products', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.expectLoaded()
    await productsPage.expectProductCount(6)
  })

  test('should show shopping cart icon', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await expect(productsPage.cartIcon).toBeVisible()
  })

  test('should add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.addProductToCart('Sauce Labs Backpack')
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
  })

})