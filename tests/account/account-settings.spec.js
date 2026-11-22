const { test, expect } = require('../../fixtures/testFixtures');
const { updatedAccount } = require('../../test-data/accountData');

test.describe('Account settings', () => {
  test('user can update name, address and phone number @regression', async ({
    accountSettingsPage,
  }) => {
    await accountSettingsPage.navigateToAccountSettings();
    await expect(accountSettingsPage.firstNameInput).toBeVisible();

    await accountSettingsPage.updateProfile(updatedAccount);

    await expect(accountSettingsPage.toast('User updated!')).toBeVisible();
    await expect(accountSettingsPage.firstNameInput).toHaveValue(updatedAccount.firstName);
    await expect(accountSettingsPage.lastNameInput).toHaveValue(updatedAccount.lastName);
    await expect(accountSettingsPage.addressInput).toHaveValue(updatedAccount.address);
    await expect(accountSettingsPage.phoneNumberInput).toHaveValue(updatedAccount.phoneNumber);

    // The saved values must still be there after leaving the page and coming back.
    await accountSettingsPage.navigateToMyProducts();
    await accountSettingsPage.navigateToAccountSettings();
    await expect(accountSettingsPage.firstNameInput).toHaveValue(updatedAccount.firstName);
    await expect(accountSettingsPage.lastNameInput).toHaveValue(updatedAccount.lastName);
    await expect(accountSettingsPage.addressInput).toHaveValue(updatedAccount.address);
    await expect(accountSettingsPage.phoneNumberInput).toHaveValue(updatedAccount.phoneNumber);
  });
});
