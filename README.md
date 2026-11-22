# Teebay-Buggy – Playwright Automation

UI test automation for **Teebay-Buggy**, a simple buy/rent marketplace used in the Sazim Automation Challenge.
Built with **Playwright (JavaScript)** and the **Page Object Model**. The suite covers positive (happy-path) scenarios.

- App under test: https://ehsanur-rahman-sazim.github.io/teebay-buggy/
- The app simulates its backend: data changes last only for the current login session and reset after logout.

## Tech stack

| Area | Tool |
|---|---|
| Language | JavaScript (ES6+) |
| Test runner | Playwright Test |
| Pattern | Page Object Model |
| Runtime / packages | Node.js, npm |
| Reports | Playwright HTML report (Allure optional, see below) |

## Project structure

```
teebay-playwright-automation/
├── pages/                  Page objects (locators + page actions)
│   ├── BasePage.js           navigation links, toast helper
│   ├── LoginPage.js
│   ├── MyProductsPage.js
│   ├── AddProductPage.js
│   ├── AccountSettingsPage.js
│   ├── BrowseProductsPage.js
│   └── ProductDetailsPage.js  details page + buy and rent workflows
├── tests/                  Specs, grouped by module
│   ├── auth/  account/  products/  browse/  transactions/
├── fixtures/testFixtures.js  Logged-in page objects (fresh login per test)
├── test-data/              Static test data (products, account values)
├── utils/                  Data generator and helpers
├── playwright.config.js
├── .env.example            Template for environment variables
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer (check with `node -v`)
- Git (only if you clone the repository)
- Java 8+ (only needed to generate Allure reports)

## Setup

```bash
git clone <repository-url>
cd teebay-playwright-automation
npm install
npx playwright install chromium
```

Create your environment file from the template:

```bash
# macOS / Linux
cp .env.example .env
# Windows (PowerShell)
Copy-Item .env.example .env
```

Then edit `.env`:

```
BASE_URL=https://ehsanur-rahman-sazim.github.io/teebay-buggy/
TEEBAY_USERNAME=<username from the challenge document>
TEEBAY_PASSWORD=<password from the challenge document>
```

`.env` is gitignored, so credentials are never committed. To run against a local copy of the app
(`yarn install && yarn start`), set `BASE_URL=http://localhost:3000/` (keep the trailing slash).

## Running the tests

| Command | What it does |
|---|---|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run tests tagged `@smoke` |
| `npm run test:regression` | Run tests tagged `@regression` |
| `npm run test:headed` | Run all tests in a visible browser |
| `npm run test:file -- tests/transactions/buy-product.spec.js` | Run one spec file |
| `npm run report` | Open the HTML report of the last run |

Tests run **sequentially** (one worker) because the app's simulated backend resets on logout and tests must not share data.
A failed test is retried once.

## Reports and failure evidence

- **HTML report:** `playwright-report/` (open with `npm run report`)
- **Screenshots, videos, traces (failed tests):** `test-results/`
- Open a trace with `npx playwright show-trace <path-to-trace.zip>`

## How the Page Object Model is used

- Each page has its own class in `pages/`. Locators and page actions (`login()`, `createProduct()`, `buyProduct()`, ...) live there.
- Test files in `tests/` describe the scenario and hold the assertions. They contain no raw locators.
- Each page object receives the Playwright `page` through its constructor and extends `BasePage` for shared navigation.
- `fixtures/testFixtures.js` logs in through the UI before each test, so tests never repeat login code and never depend on each other.

## Known application behaviour and limitations

Observed while building the suite (not modified or worked around):

- Refreshing the browser on an inner page returns a **404** (hosted on GitHub Pages), so tests navigate only through the UI.
- Editing a product through the edit form creates a **duplicate** product instead of updating the original; the form's submit button is labelled "Add Product".
- User registration and keyword product search are known to be non-functional and are **excluded** from this suite.
- Buy and Rent buttons are hidden for the user's own products and for SOLD products.

## Test coverage

| Module | Status |
|---|---|
| Login | Automated |
| Account settings (first name, last name, address, phone) | Automated |
| Create product | Automated |
| Product view count | Automated |
| Buy product | Automated |
| Rent product | Automated |
| Read, update, delete product | Planned |
| Browse products, category filter | Planned |
| Buy/rent eligibility rules | Planned |

Tests that fail because of an application defect are kept, not skipped, and the defect is recorded separately.
