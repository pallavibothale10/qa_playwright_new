import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
