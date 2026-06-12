'use strict';

const store = new Map();

function set(key, value) {
  store.set(key, { value });
}

function get(key) {
  const entry = store.get(key);
  return entry ? entry.value : undefined;
}

function clear() {
  store.clear();
}

module.exports = { set, get, clear };
