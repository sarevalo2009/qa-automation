import { type Page } from '@playwright/test'
import { LoginPage } from '../pages/login.page'

export async function loginAsQA(page: Page) {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(
    process.env.QA_USERNAME || 'standard_user',
    process.env.QA_PASSWORD || 'secret_sauce'
  )
}