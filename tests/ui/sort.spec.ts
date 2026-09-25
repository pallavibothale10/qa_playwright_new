import { test, expect } from '../../fixtures/page_fixture';
import { users } from '../../test_data/users';
import { Constants } from '../../test_data/constants';

test.describe('Product Sorting', () => {
  test('sorting by price low to high orders products by ascending price', async ({
    loginPage,
    productsPage
  }) => {
    await loginPage.navigate();
    await loginPage.loginAs(users.standard);

    await productsPage.sortBy(Constants.sortOptions.priceLowToHigh);

    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
