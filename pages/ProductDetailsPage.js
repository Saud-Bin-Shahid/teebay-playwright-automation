const { BasePage } = require('./BasePage');

/**
 * Product details page, including the buy and rent workflows (both happen on this page,
 * so they are not split into separate page objects).
 */
class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.buyButton = page.getByRole('button', { name: 'Buy', exact: true });
    this.rentButton = page.getByRole('button', { name: 'Rent', exact: true });
    this.confirmBuyButton = page.getByRole('button', { name: 'Yes!' });
    this.startDateInput = page.locator('input[name="start_date"]');
    this.endDateInput = page.locator('input[name="end_date"]');
    this.bookRentButton = page.getByRole('button', { name: 'Book rent' });
    this.viewsLabel = page.getByText('Views:');
    this.ownProductMessage = page.getByText('You own the product');
  }

  /** Status text on the page: "Available", "SOLD" or "CURRENTLY RENTED". */
  statusBadge(status) {
    return this.page.getByText(status, { exact: true });
  }

  async buyProduct() {
    await this.buyButton.click();
    await this.confirmBuyButton.click();
  }

  async rentProduct({ startDate, endDate }) {
    await this.rentButton.click();
    await this.startDateInput.fill(startDate);
    await this.endDateInput.fill(endDate);
    await this.bookRentButton.click();
  }
}

module.exports = { ProductDetailsPage };
