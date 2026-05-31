import { type Page, type Locator, expect } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartIcon: Locator
  readonly cartBadge: Locator
  readonly checkoutButton: Locator
  readonly cartItems: Locator
  readonly removeButton: Locator

  constructor(page: Page) {
    this.page = page
    this.cartIcon = page.locator('.shopping_cart_link')
    this.cartBadge = page.locator('.shopping_cart_badge')
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
    this.cartItems = page.locator('.cart_item')
    this.removeButton = page.locator('[data-test^="remove"]').first()
  }

  async goto() {
    await this.cartIcon.click()
  }

  async expectItemCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count))
  }

  async expectEmpty() {
    await expect(this.cartItems).toHaveCount(0)
  }

  async removeFirstItem() {
    await this.removeButton.click()
  }
}