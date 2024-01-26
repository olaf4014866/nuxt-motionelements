"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _fp = require("lodash/fp");

// https://github.com/cape-io/lodash-humps/blob/master/src/createHumps.js
// import { camelCase } from 'lodash/fp';
function createIteratee(converter, self) {
  return function (result, value, key) {
    return (0, _lodash.set)(result, converter(key), (0, _fp.isObjectLike)(value) ? self(value) : value);
  };
}

function createHumps(keyConverter) {
  return function humps(node) {
    if ((0, _fp.isArray)(node)) return (0, _fp.map)(humps, node);
    if ((0, _fp.isPlainObject)(node)) return (0, _lodash.transform)(node, createIteratee(keyConverter, humps));
    return node;
  };
} // import createHumps from './createHumps'
// Only export the one default. Be friendly to CommonJS.


var _default = createHumps(_fp.camelCase);

exports.default = _default;
