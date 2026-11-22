// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

// The trailing slash matters: the app is hosted under /teebay-buggy/ on GitHub Pages,
// and relative navigation only resolves correctly against a base URL that ends in "/".
const baseURL =
  process.env.BASE_URL || 'https://ehsanur-rahman-sazim.github.io/teebay-buggy/';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },

  // Sequential on purpose: the app simulates its backend and data resets on logout,
  // so tests must not share state or run side by side.
  fullyParallel: false,
  workers: 1,

  // One retry so that "trace on first retry" has something to record.
  retries: 1,

    reporter: [['html', { open: 'never' }], ['allure-playwright'], ['list']],

  use: {
    baseURL,
    headless: true, // override with: npm run test:headed
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
