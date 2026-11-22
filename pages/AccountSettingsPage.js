const { BasePage } = require('./BasePage');

class AccountSettingsPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.addressInput = page.locator('input[name="address"]');
    this.phoneNumberInput = page.locator('input[name="phone_number"]');
    this.updateButton = page.getByRole('button', { name: 'Update', exact: true });
  }

  /** Replaces first name, last name, address and phone, then saves. Email is left alone. */
  async updateProfile({ firstName, lastName, address, phoneNumber }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.updateButton.click();
  }
}

module.exports = { AccountSettingsPage };
