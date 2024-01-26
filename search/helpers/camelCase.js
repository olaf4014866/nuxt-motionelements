/* eslint-disable */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.camelCase = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var isObject = function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }; // Customized for this use-case


  var isObjectCustom = function isObjectCustom(value) {
    return isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
  };

  var mapObject = function mapObject(object, mapper, options) {
    var isSeen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new WeakMap();
    options = _objectSpread2({
      deep: false,
      target: {}
    }, options);

    if (isSeen.has(object)) {
      return isSeen.get(object);
    }

    isSeen.set(object, options.target);
    var _options = options,
        target = _options.target;
    delete options.target;

    var mapArray = function mapArray(array) {
      return array.map(function (element) {
        return isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element;
      });
    };

    if (Array.isArray(object)) {
      return mapArray(object);
    }

    for (var _i = 0, _Object$entries = Object.entries(object); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      var _mapper = mapper(key, value, object),
          _mapper2 = _slicedToArray(_mapper, 2),
          newKey = _mapper2[0],
          newValue = _mapper2[1];

      if (options.deep && isObjectCustom(newValue)) {
        newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper, options, isSeen);
      }

      target[newKey] = newValue;
    }

    return target;
  };

  var mapObj = function mapObj(object, mapper, options) {
    if (!isObject(object)) {
      throw new TypeError("Expected an object, got `".concat(object, "` (").concat(_typeof(object), ")"));
    }

    return mapObject(object, mapper, options);
  };

  var preserveCamelCase = function preserveCamelCase(string) {
    var isLastCharLower = false;
    var isLastCharUpper = false;
    var isLastLastCharUpper = false;

    for (var i = 0; i < string.length; i++) {
      var character = string[i];

      if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
        string = string.slice(0, i) + '-' + string.slice(i);
        isLastCharLower = false;
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = true;
        i++;
      } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
        string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = false;
        isLastCharLower = true;
      } else {
        isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
        isLastLastCharUpper = isLastCharUpper;
        isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
      }
    }

    return string;
  };

  var camelCase = function camelCase(input, options) {
    if (!(typeof input === 'string' || Array.isArray(input))) {
      throw new TypeError('Expected the input to be `string | string[]`');
    }

    options = Object.assign({
      pascalCase: false
    }, options);

    var postProcess = function postProcess(x) {
      return options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;
    };

    if (Array.isArray(input)) {
      input = input.map(function (x) {
        return x.trim();
      }).filter(function (x) {
        return x.length;
      }).join('-');
    } else {
      input = input.trim();
    }

    if (input.length === 0) {
      return '';
    }

    if (input.length === 1) {
      return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
    }

    var hasUpperCase = input !== input.toLowerCase();

    if (hasUpperCase) {
      input = preserveCamelCase(input);
    }

    input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (_, p1) {
      return p1.toUpperCase();
    }).replace(/\d+(\w|$)/g, function (m) {
      return m.toUpperCase();
    });
    return postProcess(input);
  };

  var camelcase = camelCase; // TODO: Remove this for the next major release

  var default_1 = camelCase;
  camelcase.default = default_1;

  var QuickLRU =
  /*#__PURE__*/
  function () {
    function QuickLRU() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, QuickLRU);

      if (!(options.maxSize && options.maxSize > 0)) {
        throw new TypeError('`maxSize` must be a number greater than 0');
      }

      this.maxSize = options.maxSize;
      this.cache = new Map();
      this.oldCache = new Map();
      this._size = 0;
    }

    _createClass(QuickLRU, [{
      key: "_set",
      value: function _set(key, value) {
        this.cache.set(key, value);
        this._size++;

        if (this._size >= this.maxSize) {
          this._size = 0;
          this.oldCache = this.cache;
          this.cache = new Map();
        }
      }
    }, {
      key: "get",
      value: function get(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }

        if (this.oldCache.has(key)) {
          var value = this.oldCache.get(key);
          this.oldCache.delete(key);

          this._set(key, value);

          return value;
        }
      }
    }, {
      key: "set",
      value: function set(key, value) {
        if (this.cache.has(key)) {
          this.cache.set(key, value);
        } else {
          this._set(key, value);
        }

        return this;
      }
    }, {
      key: "has",
      value: function has(key) {
        return this.cache.has(key) || this.oldCache.has(key);
      }
    }, {
      key: "peek",
      value: function peek(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }

        if (this.oldCache.has(key)) {
          return this.oldCache.get(key);
        }
      }
    }, {
      key: "delete",
      value: function _delete(key) {
        var deleted = this.cache.delete(key);

        if (deleted) {
          this._size--;
        }

        return this.oldCache.delete(key) || deleted;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
      }
    }, {
      key: "keys",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function keys() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key;

        return regeneratorRuntime.wrap(function keys$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = this[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 12;
                  break;
                }

                _step$value = _slicedToArray(_step.value, 1), key = _step$value[0];
                _context.next = 9;
                return key;

              case 9:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 18:
                _context.prev = 18;
                _context.prev = 19;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 21:
                _context.prev = 21;

                if (!_didIteratorError) {
                  _context.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context.finish(21);

              case 25:
                return _context.finish(18);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, keys, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      })
    }, {
      key: "values",
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function values() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, value;

        return regeneratorRuntime.wrap(function values$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 3;
                _iterator2 = this[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 12;
                  break;
                }

                _step2$value = _slicedToArray(_step2.value, 2), value = _step2$value[1];
                _context2.next = 9;
                return value;

              case 9:
                _iteratorNormalCompletion2 = true;
                _context2.next = 5;
                break;

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 18:
                _context2.prev = 18;
                _context2.prev = 19;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 21:
                _context2.prev = 21;

                if (!_didIteratorError2) {
                  _context2.next = 24;
                  break;
                }

                throw _iteratorError2;

              case 24:
                return _context2.finish(21);

              case 25:
                return _context2.finish(18);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, values, this, [[3, 14, 18, 26], [19,, 21, 25]]);
      })
    }, {
      key: Symbol.iterator,
      value:
      /*#__PURE__*/
      regeneratorRuntime.mark(function value() {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _item, _item2, key;

        return regeneratorRuntime.wrap(function value$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context3.prev = 3;
                _iterator3 = this.cache[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context3.next = 12;
                  break;
                }

                item = _step3.value;
                _context3.next = 9;
                return item;

              case 9:
                _iteratorNormalCompletion3 = true;
                _context3.next = 5;
                break;

              case 12:
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](3);
                _didIteratorError3 = true;
                _iteratorError3 = _context3.t0;

              case 18:
                _context3.prev = 18;
                _context3.prev = 19;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 21:
                _context3.prev = 21;

                if (!_didIteratorError3) {
                  _context3.next = 24;
                  break;
                }

                throw _iteratorError3;

              case 24:
                return _context3.finish(21);

              case 25:
                return _context3.finish(18);

              case 26:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context3.prev = 29;
                _iterator4 = this.oldCache[Symbol.iterator]();

              case 31:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context3.next = 40;
                  break;
                }

                _item = _step4.value;
                _item2 = _slicedToArray(_item, 1), key = _item2[0];

                if (this.cache.has(key)) {
                  _context3.next = 37;
                  break;
                }

                _context3.next = 37;
                return _item;

              case 37:
                _iteratorNormalCompletion4 = true;
                _context3.next = 31;
                break;

              case 40:
                _context3.next = 46;
                break;

              case 42:
                _context3.prev = 42;
                _context3.t1 = _context3["catch"](29);
                _didIteratorError4 = true;
                _iteratorError4 = _context3.t1;

              case 46:
                _context3.prev = 46;
                _context3.prev = 47;

                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }

              case 49:
                _context3.prev = 49;

                if (!_didIteratorError4) {
                  _context3.next = 52;
                  break;
                }

                throw _iteratorError4;

              case 52:
                return _context3.finish(49);

              case 53:
                return _context3.finish(46);

              case 54:
              case "end":
                return _context3.stop();
            }
          }
        }, value, this, [[3, 14, 18, 26], [19,, 21, 25], [29, 42, 46, 54], [47,, 49, 53]]);
      })
    }, {
      key: "size",
      get: function get() {
        var oldCacheSize = 0;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.oldCache.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var key = _step5.value;

            if (!this.cache.has(key)) {
              oldCacheSize++;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        return this._size + oldCacheSize;
      }
    }]);

    return QuickLRU;
  }();

  var quickLru = QuickLRU;

  var has = function has(array, key) {
    return array.some(function (x) {
      if (typeof x === 'string') {
        return x === key;
      }

      x.lastIndex = 0;
      return x.test(key);
    });
  };

  var cache = new quickLru({
    maxSize: 100000
  }); // Reproduces behavior from `map-obj`

  var isObject$1 = function isObject(value) {
    return _typeof(value) === 'object' && value !== null && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
  };

  var camelCaseConvert = function camelCaseConvert(input, options) {
    if (!isObject$1(input)) {
      return input;
    }

    options = _objectSpread2({
      deep: false,
      pascalCase: false
    }, options);
    var _options = options,
        exclude = _options.exclude,
        pascalCase = _options.pascalCase,
        stopPaths = _options.stopPaths,
        deep = _options.deep;
    var stopPathsSet = new Set(stopPaths);

    var makeMapper = function makeMapper(parentPath) {
      return function (key, value) {
        if (deep && isObject$1(value)) {
          var path = parentPath === undefined ? key : "".concat(parentPath, ".").concat(key);

          if (!stopPathsSet.has(path)) {
            value = mapObj(value, makeMapper(path));
          }
        }

        if (!(exclude && has(exclude, key))) {
          var cacheKey = pascalCase ? "".concat(key, "_") : key;

          if (cache.has(cacheKey)) {
            key = cache.get(cacheKey);
          } else {
            var ret = camelcase(key, {
              pascalCase: pascalCase
            });

            if (key.length < 100) {
              // Prevent abuse
              cache.set(cacheKey, ret);
            }

            key = ret;
          }
        }

        return [key, value];
      };
    };

    return mapObj(input, makeMapper(undefined));
  };

  var camelcaseKeys = function camelcaseKeys(input, options) {
    if (Array.isArray(input)) {
      return Object.keys(input).map(function (key) {
        return camelCaseConvert(input[key], options);
      });
    }

    return camelCaseConvert(input, options);
  };

  return camelcaseKeys;

}));
