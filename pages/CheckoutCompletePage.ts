import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.completeHeader = page.getByTestId('complete-header');
  }
}
