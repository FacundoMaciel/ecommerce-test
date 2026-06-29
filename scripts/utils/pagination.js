export const PRODUCTS_PER_PAGE = 12;

export function getPageProducts(items, page, perPage = PRODUCTS_PER_PAGE) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

export function getTotalPages(totalItems, perPage = PRODUCTS_PER_PAGE) {
  return Math.ceil(totalItems / perPage);
}
