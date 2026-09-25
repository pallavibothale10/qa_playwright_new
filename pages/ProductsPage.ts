import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly itemPrices: Locator;
  readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.pageTitle = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async addProduct(productName: string): Promise<void> {
    await this.inventoryItems
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async addProductsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.addProduct(productName);
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(optionLabel: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: optionLabel });
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.itemPrices.allTextContents();

    return prices.map((price) => Number(price.replace('$', '')));
  }
}
