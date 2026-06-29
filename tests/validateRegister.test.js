import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateRegister } from '../scripts/utils/validateRegister.js';

test('returns null for valid inputs', () => {
  assert.equal(validateRegister('John Doe', 'john@test.com', 'pass123', 'pass123'), null);
});

test('returns error for empty name', () => {
  assert.notEqual(validateRegister('', 'john@test.com', 'pass123', 'pass123'), null);
});

test('returns error for whitespace-only name', () => {
  assert.notEqual(validateRegister('   ', 'john@test.com', 'pass123', 'pass123'), null);
});

test('returns error for empty email', () => {
  assert.notEqual(validateRegister('John', '', 'pass123', 'pass123'), null);
});

test('returns error for email without @', () => {
  assert.notEqual(validateRegister('John', 'johntest.com', 'pass123', 'pass123'), null);
});

test('returns error for password shorter than 6 characters', () => {
  assert.notEqual(validateRegister('John', 'john@test.com', '123', '123'), null);
});

test('returns error when passwords do not match', () => {
  assert.notEqual(validateRegister('John', 'john@test.com', 'pass123', 'pass456'), null);
});

test('returns error when confirm password is empty', () => {
  assert.notEqual(validateRegister('John', 'john@test.com', 'pass123', ''), null);
});

test('accepts exactly 6 character password', () => {
  assert.equal(validateRegister('John', 'john@test.com', 'abc123', 'abc123'), null);
});
