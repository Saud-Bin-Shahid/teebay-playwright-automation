const { test, expect } = require('../../fixtures/testFixtures');
const { seedProducts } = require('../../test-data/productData');

test.describe('Browse products - view count', () => {
  test('opening product details adds one view; browsing the listing adds none @regression', async ({
    browseProductsPage,
    productDetailsPage,
  }) => {
    const title = seedProducts.forViewCount;

    await browseProductsPage.navigateToBrowseProducts();
    const initialViews = await browseProductsPage.getViewCount(title);

    await browseProductsPage.openProductDetails(title);
    await expect(productDetailsPage.viewsLabel).toBeVisible();

    await browseProductsPage.navigateToBrowseProducts();
    await expect
      .poll(() => browseProductsPage.getViewCount(title))
      .toBe(initialViews + 1);

    // Leaving the listing and coming back, without opening the product, must not add views.
    await browseProductsPage.navigateToMyProducts();
    await browseProductsPage.navigateToBrowseProducts();
    expect(await browseProductsPage.getViewCount(title)).toBe(initialViews + 1);
  });
});
