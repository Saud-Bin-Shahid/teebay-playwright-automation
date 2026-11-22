const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MyProductsPage } = require('../pages/MyProductsPage');
const { AddProductPage } = require('../pages/AddProductPage');
const { AccountSettingsPage } = require('../pages/AccountSettingsPage');
const { BrowseProductsPage } = require('../pages/BrowseProductsPage');
const { ProductDetailsPage } = require('../pages/ProductDetailsPage');

const { expect } = base;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value;
}

const test = base.test.extend({
  // Unauthenticated page object, for the login tests themselves.
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  // Logs in through the UI for every test. A fresh login per test is intentional:
  // the simulated backend resets its data on logout, and a page refresh breaks the
  // session (404), so storageState is not a reliable option for this app.
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(requireEnv('TEEBAY_USERNAME'), requireEnv('TEEBAY_PASSWORD'));
    await expect(loginPage.logoutLink).toBeVisible();
    await use(page);
  },

  // Page objects for logged-in tests. Asking for any of them logs in first.
  myProductsPage: async ({ authenticatedPage }, use) => {
    await use(new MyProductsPage(authenticatedPage));
  },
  addProductPage: async ({ authenticatedPage }, use) => {
    await use(new AddProductPage(authenticatedPage));
  },
  accountSettingsPage: async ({ authenticatedPage }, use) => {
    await use(new AccountSettingsPage(authenticatedPage));
  },
  browseProductsPage: async ({ authenticatedPage }, use) => {
    await use(new BrowseProductsPage(authenticatedPage));
  },
  productDetailsPage: async ({ authenticatedPage }, use) => {
    await use(new ProductDetailsPage(authenticatedPage));
  },
});

module.exports = { test, expect };
