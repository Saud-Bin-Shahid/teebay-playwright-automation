const { BasePage } = require('./BasePage');

class AddProductPage extends BasePage {
  constructor(page) {
    super(page);
    // The inputs have no label or placeholder: the "name" attribute is the stable option.
    this.titleInput = page.locator('input[name="title"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.purchasePriceInput = page.locator('input[name="purchase_price"]');
    this.rentPriceInput = page.locator('input[name="rent_price"]');
    // Both dropdowns are listboxes; each is told apart by one of its own options.
    this.rentPeriodDropdown = page.getByRole('listbox').filter({ hasText: 'Hourly' });
    this.categoryDropdown = page.getByRole('listbox').filter({ hasText: 'Electronics' });
    this.submitButton = page.getByRole('button', { name: 'Add Product' });
  }

  async selectRentPeriod(period) {
    await this.rentPeriodDropdown.click();
    await this.page.getByRole('option', { name: period }).click();
  }

  async selectCategory(category) {
    await this.categoryDropdown.click();
    await this.page.getByRole('option', { name: category }).click();
  }

  /** Fills the whole form and submits it. `product` comes from buildProduct(). */
  async createProduct(product) {
    await this.titleInput.fill(product.title);
    await this.descriptionInput.fill(product.description);
    await this.purchasePriceInput.fill(product.purchasePrice);
    await this.rentPriceInput.fill(product.rentPrice);
    await this.selectRentPeriod(product.rentPeriod);
    await this.selectCategory(product.category);
    await this.submitButton.click();
  }
}

module.exports = { AddProductPage };
