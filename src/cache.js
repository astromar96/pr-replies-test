'use strict';

const store = new Map();

function set(key, value) {
  store.set(key, { value });
}

function get(key) {
  const entry = store.get(key);
  return entry ? entry.value : undefined;
}

function has(key) {
  return store.get(key) !== undefined;
}

function setMany(entries) {
  for (const [key, value] of entries) {
    set(key, value);
  }
}

function size() {
  return store.size;
}

function clear() {
  store.clear();
}

module.exports = { set, get, has, setMany, size, clear };
