import { type Page, type Locator, expect } from '@playwright/test'

export class CheckoutPage {
  readonly page: Page
  readonly firstNameInput: Locator
  readonly lastNameInput: Locator
  readonly zipCodeInput: Locator
  readonly continueButton: Locator
  readonly finishButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.firstNameInput = page.getByPlaceholder('First Name')
    this.lastNameInput = page.getByPlaceholder('Last Name')
    this.zipCodeInput = page.getByPlaceholder('Zip/Postal Code')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.finishButton = page.getByRole('button', { name: 'Finish' })
    this.successMessage = page.getByText('Thank you for your order!')
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.zipCodeInput.fill(zipCode)
    await this.continueButton.click()
  }

  async finish() {
    await this.finishButton.click()
  }

  async expectSuccess() {
    await expect(this.successMessage).toBeVisible()
  }
}