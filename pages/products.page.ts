import { type Page, type Locator, expect } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly heading: Locator
  readonly productList: Locator
  readonly cartIcon: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByText('Products')
    this.productList = page.locator('.inventory_list')
    this.cartIcon = page.locator('.shopping_cart_link')
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible()
  }

  async expectProductCount(count: number) {
    await expect(this.page.locator('.inventory_item')).toHaveCount(count)
  }

  async addProductToCart(productName: string) {
    await this.page.getByText(productName).first().click()
    await this.page.getByRole('button', { name: 'Add to cart' }).click()
  }
}