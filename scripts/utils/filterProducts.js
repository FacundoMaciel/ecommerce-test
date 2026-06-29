export function filterProducts(products, query) {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(product => {
    if (product.name.toLowerCase().includes(q)) return true;
    if (Array.isArray(product.keywords)) {
      return product.keywords.some(k => k.toLowerCase().includes(q));
    }
    return false;
  });
}
