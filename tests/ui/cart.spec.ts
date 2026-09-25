import { test, expect } from '../../fixtures/page_fixture';
import { users } from '../../test_data/users';
import { Constants } from '../../test_data/constants';

const productsToAdd = [
  Constants.products.backpack,
  Constants.products.bikeLight
];

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);
    await productsPage.addProductsToCart(productsToAdd);
  });

  test('cart badge shows the number of added products', async ({
    productsPage
  }) => {
    await expect(productsPage.cartBadge).toHaveText(
      String(productsToAdd.length)
    );
  });

  test('cart page lists the added products', async ({
    productsPage,
    cartPage
  }) => {
    await productsPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(productsToAdd.length);
    for (const product of productsToAdd) {
      await expect(
        cartPage.cartItems.filter({ hasText: product })
      ).toBeVisible();
    }
  });
});
