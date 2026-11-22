const { test, expect } = require('../../fixtures/testFixtures');
const { seedProducts } = require('../../test-data/productData');

test.describe('Buy product', () => {
  test('user can buy an available product @smoke @regression', async ({
    browseProductsPage,
    productDetailsPage,
  }) => {
    await browseProductsPage.navigateToBrowseProducts();
    await browseProductsPage.openProductDetails(seedProducts.forBuying);

    await expect(productDetailsPage.statusBadge('Available')).toBeVisible();
    await expect(productDetailsPage.buyButton).toBeVisible();

    await productDetailsPage.buyProduct();

    await expect(productDetailsPage.statusBadge('SOLD')).toBeVisible();
    await expect(productDetailsPage.buyButton).toHaveCount(0);
    await expect(productDetailsPage.rentButton).toHaveCount(0);
  });
});
