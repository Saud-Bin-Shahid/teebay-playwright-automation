// Defaults used when the tests create a product. Values mirror what the app accepted
// while exploring it (purchase price and rent price are both required by the form).
const productDefaults = {
  description: 'Product created through Playwright automation.',
  category: 'Electronics',
  purchasePrice: '500',
  rentPrice: '50',
  rentPeriod: 'Daily',
};

// Products that exist in the app's seed data (they belong to other users, so they can be
// bought or rented). The data resets on every login, so each test starts from this state.
const seedProducts = {
  forBuying: 'Blender',
  forRenting: 'Funshine bear',
  forViewCount: 'Blender',
};

module.exports = { productDefaults, seedProducts };
