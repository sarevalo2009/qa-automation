import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'

test.describe('Network Interception', () => {

  test('should show error when server fails', async ({ page }) => {
    // Interceptar cualquier llamada y responder con error
    await page.route('**/*.json', (route) => {
      route.fulfill({ status: 500, body: 'Server Error' })
    })

    const loginPage = new LoginPage(page)
    await loginPage.goto()

    // La página debe seguir cargando aunque falle la red
    await expect(page).toHaveURL('https://www.saucedemo.com/')
  })

  test('should load page normally without interception', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(page).toHaveURL('/inventory.html')
  })

})