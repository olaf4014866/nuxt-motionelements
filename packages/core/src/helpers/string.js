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

export function stripHtml(string) {
  return string.replace(/(<([^>]+)>)/gi, '');
}

export function truncateString(str, len, append) {
  let newLength;
  append = append || ''; // Optional: append a string to str after truncating. Defaults to an empty string if no value is given

  if (append.length > 0) {
    append = ` ${append}`; // Add a space to the beginning of the appended text
  }
  if (str.indexOf(' ') + append.length > len) {
    return str; // if the first word + the appended text is too long, the function returns the original String
  }

  if (str.length + append.length > len) {
    newLength = len - append.length;
  } else {
    newLength = str.length;
  } // if the length of original string and the appended string is greater than the max length, we need to truncate, otherwise, use the original string

  let tempString = str.substring(0, newLength); // cut the string at the new length
  tempString = tempString.replace(/\s+\S*$/, ''); // find the last space that appears before the substringed text

  if (append.length > 0) {
    tempString += append;
  }
  return tempString;
}

// import createHumps from './createHumps'
// Only export the one default. Be friendly to CommonJS.
// export default createHumps(camelCase);

export const camelCaseKeys = createHumps(camelCase);

export const snakeCaseKeys = createHumps(snakeCase);
