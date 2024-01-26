// https://github.com/cape-io/lodash-humps/blob/master/src/createHumps.js
// import { camelCase } from 'lodash/fp';

import { transform, set } from 'lodash';
import {
  camelCase,
  snakeCase,
  isArray, isObjectLike, isPlainObject, map,
} from 'lodash/fp';

function createIteratee(converter, self) {
  return (result, value, key) => set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

function createHumps(keyConverter) {
  return function humps(node) {
    if (isArray(node)) return map(humps, node);
    if (isPlainObject(node)) return transform(node, createIteratee(keyConverter, humps));
    return node;
  };
}

// import createHumps from './createHumps'
// Only export the one default. Be friendly to CommonJS.
// export default createHumps(camelCase);

export const camelCaseKeys = createHumps(camelCase);

export const snakeCaseKeys = createHumps(snakeCase);


export function getUrl(path) {
  return new URL(path);
}

export function getUrlSearchParams(params) {
  return new URLSearchParams(params);
}
