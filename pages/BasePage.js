/**
 * Common elements and actions shared by every page: top navigation and toast messages.
 * Navigation uses UI clicks only. Do NOT use page.goto() or page.reload() on inner
 * routes: the app is hosted on GitHub Pages and a refresh on an inner route returns a 404.
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.logoutLink = page.getByText('Logout', { exact: true });
    this.browseProductsLink = page.getByText('Browse Products', { exact: true });
    this.myProductsLink = page.getByText('My Products', { exact: true });
    this.accountSettingsLink = page.getByText('Account Settings', { exact: true });
  }

  async navigateToBrowseProducts() {
    await this.browseProductsLink.click();
  }

  async navigateToMyProducts() {
    await this.myProductsLink.click();
  }

  async navigateToAccountSettings() {
    await this.accountSettingsLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  /** Toast / notification message locator, e.g. "New product added!" or "User updated!". */
  toast(message) {
    return this.page.getByText(message, { exact: true });
  }
}

module.exports = { BasePage };
