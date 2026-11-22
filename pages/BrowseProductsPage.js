const { BasePage } = require('./BasePage');
const { parseCount } = require('../utils/helpers');

const VIEWS_PATTERN = /\d[\d,]* views/;

class BrowseProductsPage extends BasePage {
  /**
   * The card for one product: the innermost div holding the product title and its
   * "N views" text (generated CSS class names are unstable, so none are used).
   */
  productCard(title) {
    return this.page
      .locator('div')
      .filter({ has: this.page.getByText(title, { exact: true }) })
      .filter({ hasText: VIEWS_PATTERN })
      .last();
  }

  async openProductDetails(title) {
    // The title can also appear elsewhere on screen, so take the first match.
    await this.page.getByText(title, { exact: true }).first().click();
  }

  /** View count shown on the listing card, e.g. 202 for "202 views". */
  async getViewCount(title) {
    const card = this.productCard(title);
    await card.waitFor();
    const text = await card.getByText(VIEWS_PATTERN).first().textContent();
    return parseCount(text);
  }
}

module.exports = { BrowseProductsPage };
