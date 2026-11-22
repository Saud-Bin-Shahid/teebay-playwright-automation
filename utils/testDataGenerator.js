const { productDefaults } = require('../test-data/productData');

/** Builds a product with a unique title so runs never collide on name. */
function buildProduct(overrides = {}) {
  return {
    ...productDefaults,
    title: `Automation Product ${Date.now()}`,
    ...overrides,
  };
}

module.exports = { buildProduct };
