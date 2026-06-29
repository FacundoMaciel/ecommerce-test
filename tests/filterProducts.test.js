import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts } from '../scripts/utils/filterProducts.js';

const mockProducts = [
  { name: 'Black Athletic Socks',        keywords: ['socks', 'sports', 'apparel'] },
  { name: 'Intermediate Size Basketball', keywords: ['sports', 'basketballs'] },
  { name: 'Plain Cotton T-Shirt',         keywords: ['tshirts', 'apparel', 'mens'] },
  { name: 'Electric Water Kettle',        keywords: ['appliances', 'kitchen'] },
  { name: 'Women\'s Knit Ballet Flat',    keywords: ['shoes', 'flats', 'womens'] },
];

test('empty query returns all products', () => {
  assert.equal(filterProducts(mockProducts, '').length, 5);
});

test('whitespace-only query returns all products', () => {
  assert.equal(filterProducts(mockProducts, '   ').length, 5);
});

test('filters by product name (exact word)', () => {
  const result = filterProducts(mockProducts, 'basketball');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Intermediate Size Basketball');
});

test('filters by keyword', () => {
  const result = filterProducts(mockProducts, 'apparel');
  assert.equal(result.length, 2);
});

test('search is case-insensitive', () => {
  assert.equal(filterProducts(mockProducts, 'SOCKS').length, 1);
  assert.equal(filterProducts(mockProducts, 'socks').length, 1);
  assert.equal(filterProducts(mockProducts, 'Socks').length, 1);
});

test('partial name match works', () => {
  const result = filterProducts(mockProducts, 'kettle');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Electric Water Kettle');
});

test('returns empty array when nothing matches', () => {
  assert.equal(filterProducts(mockProducts, 'xxxxxxxx').length, 0);
});

test('matches across name and keywords simultaneously', () => {
  // "sports" is a keyword on both socks and basketball
  const result = filterProducts(mockProducts, 'sports');
  assert.equal(result.length, 2);
});

test('handles products with no keywords array', () => {
  const noKeywords = [{ name: 'Some Product' }];
  const result = filterProducts(noKeywords, 'some');
  assert.equal(result.length, 1);
});

test('does not return product when query matches neither name nor keywords', () => {
  const result = filterProducts(mockProducts, 'laptop');
  assert.equal(result.length, 0);
});
