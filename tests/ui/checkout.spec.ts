import { test, expect } from '../../fixtures/page_fixture';
import { users } from '../../test_data/users';
import { Constants } from '../../test_data/constants';

test.describe('Checkout', () => {
  test('user can complete checkout with two products', async ({
    loginPage,
    productsPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage
  }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);
    await productsPage.addProductsToCart([
      Constants.products.backpack,
      Constants.products.bikeLight
    ]);
    await productsPage.openCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo(Constants.customer);
    await checkoutPage.continue();
    await checkoutPage.finishOrder();

    await expect(checkoutCompletePage.completeHeader).toHaveText(
      Constants.orderCompleteMessage
    );
  });
});
