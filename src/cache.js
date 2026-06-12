'use strict';

const store = new Map();

function set(key, value, ttlMs) {
  const expiresAt = ttlMs ? Date.now() + ttlMs : Infinity;
  store.set(key, { value, expiresAt });
}

function get(key) {
  const entry = store.get(key);
  if (entry.expiresAt > Date.now()) {
    return entry.value;
  }
  store.delete(key);
  return undefined;
}

function clear() {
  store.clear();
}

module.exports = { set, get, clear };
