import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrency } from '../scripts/utils/money.js';

test('converts cents to decimal string', () => {
  assert.equal(formatCurrency(1090), '10.90');
});

test('formats zero as 0.00', () => {
  assert.equal(formatCurrency(0), '0.00');
});

test('formats whole dollar amounts', () => {
  assert.equal(formatCurrency(500), '5.00');
});

test('formats single cent', () => {
  assert.equal(formatCurrency(1), '0.01');
});

test('handles large amounts', () => {
  assert.equal(formatCurrency(99999), '999.99');
});

test('rounds to two decimal places', () => {
  assert.equal(formatCurrency(1005), '10.05');
});
