'use strict';

const store = new Map();

function set(key, value) {
  store.set(key, { value });
}

function get(key) {
  const entry = store.get(key);
  return entry ? entry.value : undefined;
}

function getOrSet(key, factory) {
  if (store.has(key)) return store.get(key).value;
  const value = factory();
  if (value !== undefined) set(key, value);
  return value;
}

function del(key) {
  return store.delete(key);
}

function keys() {
  return store.keys();
}

function clear() {
  store.clear();
}

module.exports = { set, get, getOrSet, delete: del, keys, clear };
