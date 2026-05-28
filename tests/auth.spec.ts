import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page).toHaveURL('/inventory.html')
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('wrong_user')
    await page.getByPlaceholder('Password').fill('wrong_password')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Username and password do not match')).toBeVisible()
  })

  test('should load products page after login', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Username').fill('standard_user')
    await page.getByPlaceholder('Password').fill('secret_sauce')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Products')).toBeVisible()  
})
})