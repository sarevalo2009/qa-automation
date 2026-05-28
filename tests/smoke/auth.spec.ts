import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { ProductsPage } from '../../pages/products.page'

test.describe('Authentication', () => {

  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)

    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await productsPage.expectLoaded()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('wrong_user', 'wrong_password')
    await loginPage.expectError('Username and password do not match')
  })

  test('should show error when username is empty', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('', 'secret_sauce')
    await loginPage.expectError('Username is required')
  })

})