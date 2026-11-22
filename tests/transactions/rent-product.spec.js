const { test, expect } = require('../../fixtures/testFixtures');
const { seedProducts } = require('../../test-data/productData');
const { formatDate } = require('../../utils/helpers');

test.describe('Rent product', () => {
  test('user can rent an available product @smoke @regression', async ({
    browseProductsPage,
    productDetailsPage,
  }) => {
    await browseProductsPage.navigateToBrowseProducts();
    await browseProductsPage.openProductDetails(seedProducts.forRenting);

    await expect(productDetailsPage.rentButton).toBeVisible();

    await productDetailsPage.rentProduct({
      startDate: formatDate(1),
      endDate: formatDate(3),
    });

    await expect(productDetailsPage.statusBadge('CURRENTLY RENTED')).toBeVisible();
  });
});
