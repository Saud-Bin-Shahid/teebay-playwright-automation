const { test, expect } = require('../../fixtures/testFixtures');

test.describe('Authentication', () => {
  test('login page is displayed @smoke @regression', async ({ loginPage }) => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('user can log in with valid credentials @smoke @regression', async ({ loginPage, page }) => {
    await loginPage.login(process.env.TEEBAY_USERNAME, process.env.TEEBAY_PASSWORD);

    // Login lands on My Products (there is no separate dashboard).
    await expect(loginPage.logoutLink).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Product' })).toBeVisible();
    await expect(loginPage.signInButton).toHaveCount(0);
  });

  test('logged-in user can access the main navigation @regression', async ({ loginPage }) => {
    await loginPage.login(process.env.TEEBAY_USERNAME, process.env.TEEBAY_PASSWORD);

    await expect(loginPage.myProductsLink).toBeVisible();
    await expect(loginPage.browseProductsLink).toBeVisible();
    await expect(loginPage.accountSettingsLink).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });
});
