const { BasePage } = require('./BasePage');

class MyProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.addProductButton = page.getByRole('button', { name: 'Add Product' });
  }

  /**
   * The card for one product, found through its (unique) title. The generated CSS class
   * names are unstable, so the card is "the innermost div holding this title and the
   * 'Categories:' line".
   */
  productCard(title) {
    return this.page
      .locator('div')
      .filter({ has: this.page.getByText(title, { exact: true }) })
      .filter({ hasText: 'Categories:' })
      .last();
  }

  async clickAddProduct() {
    await this.addProductButton.click();
  }
}

module.exports = { MyProductsPage };
