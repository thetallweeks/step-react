/**
 * Helper functions for working with data without mutating
 * All functions return a new version of the collection
 */

import get from 'lodash/get';
import isFunction from 'lodash/isFunction';

// Function lodash components (no not mutate)
import set from 'lodash/fp/set';

/**
 * Set (overwrite) the value at the path
 * @param collection which holds the nested collection
 * @param path
 * @param updater function called on data at given path, or raw data to override
 * @returns collection
 */
export function setIn(collection, path, updater) {
  const data = isFunction(updater) ? updater(get(collection, path)) : updater;
  // NOTE: argument order is different for fp methods
  return set(path, data, collection);
}
