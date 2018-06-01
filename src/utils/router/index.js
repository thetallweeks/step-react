import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import get from 'lodash/get';
import map from 'lodash/map';
import parseInt from 'lodash/parseInt';
import reduce from 'lodash/reduce';
import startsWith from 'lodash/startsWith';

import flow from 'lodash/fp/flow';
import keyBy from 'lodash/fp/keyBy';
import mapValues from 'lodash/fp/mapValues';

import {setIn} from '../immutable';

import history from '../history';

const argDelimeter = '!';

function indexFromKey(key = 'p0') {
  return parseInt(key.replace('p', ''));
}

function ensureValidSearch(_search = '') {
  let search = _search;
  // must start with ?
  if (!startsWith(search, '?')) {
    search = `?${search}`;
  }

  return search;
}

/**
 * takes a string like version=ESV!ref=Exod.3 and converts to an object
 * @param {string} argString
 * @returns {object}
 */
function parseArgString(argString = '') {
  return flow(
    keyBy(argString => argString.split('=')[0]),
    mapValues(argString => argString.split('=')[1])
  )(argString.split(argDelimeter));
}

/**
 * takes a search string like ?p0=version=ESV!ref=Exod.3&p1=ref=Exod.12 and converts to an object
 * with panel ids as the keys
 * @param {string} search
 * @returns {object}
 */
function parseSearch(search = '') {
  // ensure ? is removed from front. replace stops after first match
  const searchWithoutQ = search.replace('?', '');

  // compact removes empty values from the array
  const parts = compact(searchWithoutQ.split(/&?(p\d)=([^&]*)/g));

  // chunk into arrays of [key, value]
  const keyValuePairs = chunk(parts, 2);

  return reduce(keyValuePairs, (result, pair) => {
    const key = get(pair, 0);
    return {
      ...result,
      [key]: parseArgString(get(pair, 1))
    };
  }, {});
}

/**
 * takes a search object (output from parseSearch) and converts it back to a
 * url search string
 * @param {object} parsedSearch
 * @returns {string}
 */
function stringifySearch(parsedSearch) {
  const panelStrings = map(parsedSearch, (value, key) => {
    const panelArgs = map(value, (argValue, argKey) => {
      return `${argKey}=${argValue}`;
    });

    return `p${indexFromKey(key)}=${panelArgs.join(argDelimeter)}`;
  });

  return ensureValidSearch(panelStrings.join('&'));
}

function getUpdatedUrlForPanel(search, data, panelIndex = 0) {
  const parsedSearch = parseSearch(search);

  // TODO: Handle more than just ref=osisId
  const updatedSearch = setIn(parsedSearch, [`p${panelIndex}`, 'ref'], get(data, 'osisId'));
  return stringifySearch(updatedSearch);
}

/**
 * main function used by the app to "navigate" panels
 * @param {object} data
 * @param {number} panelIndex
 * @returns {Promise}
 */
function navigate(data, panelIndex = 0) {
  const search = window.location.search;
  const newSearch = getUpdatedUrlForPanel(search, data, panelIndex);

  return history.push({
    search: newSearch
  });
}

const router = {
  navigate,
  listen: history.listen,
  parseSearch,
  stringifySearch,
  ensureValidSearch,
  parseArgString,
  getUpdatedUrlForPanel
};

export default router;
