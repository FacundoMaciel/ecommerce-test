import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getPageProducts, getTotalPages, PRODUCTS_PER_PAGE } from '../scripts/utils/pagination.js';

const items = Array.from({ length: 50 }, (_, i) => ({ id: i + 1 }));

test('PRODUCTS_PER_PAGE is 12', () => {
  assert.equal(PRODUCTS_PER_PAGE, 12);
});

test('getTotalPages: 50 items = 5 pages', () => {
  assert.equal(getTotalPages(50), 5);
});

test('getTotalPages: 49 items = 5 pages (rounds up)', () => {
  assert.equal(getTotalPages(49), 5);
});

test('getTotalPages: 12 items = 1 page', () => {
  assert.equal(getTotalPages(12), 1);
});

test('getTotalPages: 0 items = 0 pages', () => {
  assert.equal(getTotalPages(0), 0);
});

test('getPageProducts: page 1 returns first 12', () => {
  const page = getPageProducts(items, 1);
  assert.equal(page.length, 12);
  assert.equal(page[0].id, 1);
  assert.equal(page[11].id, 12);
});

test('getPageProducts: page 2 returns items 13-24', () => {
  const page = getPageProducts(items, 2);
  assert.equal(page.length, 12);
  assert.equal(page[0].id, 13);
  assert.equal(page[11].id, 24);
});

test('getPageProducts: last page returns remaining items', () => {
  const page = getPageProducts(items, 5);
  assert.equal(page.length, 2);
  assert.equal(page[0].id, 49);
  assert.equal(page[1].id, 50);
});

test('getPageProducts: accepts custom perPage', () => {
  const page = getPageProducts(items, 1, 5);
  assert.equal(page.length, 5);
  assert.equal(page[0].id, 1);
});

test('getPageProducts: empty list returns empty array', () => {
  assert.deepEqual(getPageProducts([], 1), []);
});
