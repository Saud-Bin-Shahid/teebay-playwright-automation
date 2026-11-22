const { test, expect } = require('../../fixtures/testFixtures');
const { buildProduct } = require('../../utils/testDataGenerator');

test.describe('Product management - create', () => {
  test('user can create a product and see it in My Products @smoke @regression', async ({
    myProductsPage,
    addProductPage,
  }) => {
    const product = buildProduct();

    await myProductsPage.navigateToMyProducts();
    await myProductsPage.clickAddProduct();
    await addProductPage.createProduct(product);

    await expect(addProductPage.toast('New product added!')).toBeVisible();

    await myProductsPage.navigateToMyProducts();
    const card = myProductsPage.productCard(product.title);
    await expect(card).toBeVisible();
    await expect(card).toContainText(product.description);
    await expect(card).toContainText(product.category);
    await expect(card).toContainText(`Price: $${product.purchasePrice}`);
    await expect(card).toContainText(
      new RegExp(`Rent:\\s*\\$${product.rentPrice}\\s*${product.rentPeriod}`, 'i'),
    );
  });
});
