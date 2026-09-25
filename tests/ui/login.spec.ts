import { test, expect } from '../../fixtures/page_fixture';
import { users } from '../../test_data/users';
import { Constants } from '../../test_data/constants';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('standard user lands on the products page', async ({
    page,
    loginPage,
    productsPage
  }) => {
    await loginPage.loginAs(users.standard);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(productsPage.pageTitle).toHaveText(
      Constants.pageTitles.products
    );
  });

  test('locked out user sees an error and stays on the login page', async ({
    page,
    loginPage
  }) => {
    await loginPage.loginAs(users.locked);

    await expect(loginPage.errorMessage).toHaveText(
      Constants.lockedUserError
    );
    await expect(page).not.toHaveURL(/inventory\.html/);
  });
});
