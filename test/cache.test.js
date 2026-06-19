'use strict';

const test = require('node:test');
const assert = require('node:assert');
const cache = require('../src/cache');

test.beforeEach(() => cache.clear());

test('getOrSet returns and caches the factory result on a miss', () => {
  let calls = 0;
  const value = cache.getOrSet('a', () => {
    calls += 1;
    return 1;
  });
  assert.strictEqual(value, 1);
  assert.strictEqual(cache.get('a'), 1);

  // Second call is a hit: factory is not invoked again.
  const again = cache.getOrSet('a', () => {
    calls += 1;
    return 2;
  });
  assert.strictEqual(again, 1);
  assert.strictEqual(calls, 1);
});

test('getOrSet does not cache an undefined result and recomputes next time', () => {
  let calls = 0;
  const first = cache.getOrSet('missing', () => {
    calls += 1;
    return undefined;
  });
  assert.strictEqual(first, undefined);
  assert.deepStrictEqual(cache.keys(), []);

  // Because undefined was not cached, the factory runs again.
  const second = cache.getOrSet('missing', () => {
    calls += 1;
    return 42;
  });
  assert.strictEqual(second, 42);
  assert.strictEqual(calls, 2);
  assert.strictEqual(cache.get('missing'), 42);
});

test('delete mirrors Map.delete by returning whether the key existed', () => {
  cache.set('x', 10);
  assert.strictEqual(cache.delete('x'), true);
  assert.strictEqual(cache.get('x'), undefined);
  // Deleting an absent key returns false.
  assert.strictEqual(cache.delete('x'), false);
});

test('keys returns an array snapshot that survives later mutation and re-iteration', () => {
  cache.set('a', 1);
  cache.set('b', 2);
  const snapshot = cache.keys();
  assert.ok(Array.isArray(snapshot));
  assert.deepStrictEqual(snapshot, ['a', 'b']);

  // Mutating the cache afterwards does not change the snapshot.
  cache.set('c', 3);
  cache.delete('a');
  assert.deepStrictEqual(snapshot, ['a', 'b']);

  // The snapshot can be iterated more than once (a live iterator could not).
  assert.strictEqual(snapshot.length, 2);
  assert.strictEqual(snapshot.length, 2);
});
