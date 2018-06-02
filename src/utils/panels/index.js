import parseInt from 'lodash/parseInt';

export function indexFromKey(key = 'p0') {
  return parseInt(key.replace('p', ''));
}
