import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { ProductsPage } from '../../pages/products.page'
import { CartPage } from '../../pages/cart.page'
import { CheckoutPage } from '../../pages/checkout.page'

test.describe('Smoke: Carrito y Compra', () => {

  test.beforeEach(async ({ page }) => {
    // ARRANGE: login antes de cada test
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('should add product to cart', async ({ page }) => {
    // ARRANGE
    const cartPage = new CartPage(page)

    // ACT
    await page.getByRole('button', { name: 'Add to cart' }).first().click()

    // ASSERT
    await cartPage.expectItemCount(1)
  })

  test('should remove product from cart', async ({ page }) => {
    // ARRANGE — agregar producto primero
    const cartPage = new CartPage(page)
    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await cartPage.goto()

    // ACT
    await cartPage.removeFirstItem()

    // ASSERT
    await cartPage.expectEmpty()
  })

  test('should complete a purchase', async ({ page }) => {
    // ARRANGE — agregar producto y ir al carrito
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await cartPage.goto()

    // ACT — completar el checkout
    await cartPage.checkoutButton.click()
    await checkoutPage.fillInfo('QA', 'Tester', '12345')
    await checkoutPage.finish()

    // ASSERT
    await checkoutPage.expectSuccess()
  })

})