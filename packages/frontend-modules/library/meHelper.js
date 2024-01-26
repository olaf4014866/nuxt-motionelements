/**
 * motionelements/frontend-modules v2.3.7
 * (c) MotionElements 2020
 * * meUrl into deprecated, please change to meHelper
 * - siteUrl: handle internal ME url w/ lang.
 * - site: handle outside ME url w/ lang.
 * - defaultLang: helper for url lang setting.
 * - term: handle mediatypes name variation.
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /**
   * get lang from payload;
   *
   * @param {String=} lang
   */
  var scopeLang = 'en';

  var defaultLang = function defaultLang() {
    var get = function get() {
      return scopeLang;
    };

    var set = function set(lang) {
      if (lang) scopeLang = lang;
    };

    return {
      get: get,
      set: set
    };
  }();

  // urlParser

  function mePageLang() {
    switch (defaultLang.get()) {
      case 'en':
        return '';

      default:
        return "/".concat(defaultLang.get());
    }
  }

  function adobeLang() {
    switch (defaultLang.get()) {
      case 'en':
        return '';

      case 'ja':
        return '/jp';

      case 'zh-hant':
        return '/tw';

      case 'ko':
        return '/kr';

      default:
        return "/".concat(defaultLang.get());
    }
  }

  function zendeskLang() {
    switch (defaultLang.get()) {
      case 'ja':
        return '/ja';

      case 'zh-hant':
        return '/zh-tw';

      case 'ko':
        return '/ko';

      default:
        return '/en-us';
    }
  }

  function wpLang() {
    switch (defaultLang.get()) {
      case 'ja':
        return '/ja/';

      case 'zh-hant':
        return '/zt/';

      case 'ko':
        return '/ko/';

      default:
        return '/';
    }
  }

  function urlParser(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      // origin: a.origin, IE11 no origin.
      // eslint-disable-next-line prefer-template
      origin: 'https://' + a.hostname,
      host: a.hostname,
      path: a.pathname.charAt(0) !== "/" ? "/".concat(a.pathname) : a.pathname,
      // patch IE 11 no lead slash
      search: a.search,
      href: a.href
    };
  }
  /**
   * map many url with lang
   * * watch out urlObj origin and path different
   * @param {String} url
   * @param {String=} lang
   */


  var mapUrlLang = function mapUrlLang(url, lang) {
    defaultLang.set(lang);
    var urlObj = urlParser(url);
    var returnUrl = url;
    console.log('map url lang: ', url, lang, urlObj);

    if (urlObj.origin.match('adobe')) {
      returnUrl = urlObj.origin + adobeLang() + urlObj.path + urlObj.search;
    }

    if (urlObj.origin.match('artists.motionelements.com') || urlObj.origin.match('www.motionelements.com')) {
      returnUrl = urlObj.origin + zendeskLang() + urlObj.path + urlObj.search;
    }

    if (urlObj.origin.match('help.motionelements.com') || urlObj.origin.match('artists.zendesk.com')) {
      // console.log(urlObj.path);
      returnUrl = "".concat(urlObj.origin, "/hc").concat(zendeskLang()).concat(urlObj.path.replace('/hc', '')).concat(urlObj.search);
    }

    if (urlObj.origin.match('go.motionelements.com') || urlObj.origin.match('tuts.motionelements.com') || urlObj.origin.match('press.motionelements.com')) {
      returnUrl = urlObj.origin + wpLang() + urlObj.path.replace('/', '') + urlObj.search;
    }

    if (url.match('motionelements.com/artists/')) {
      returnUrl = urlObj.origin + mePageLang() + urlObj.path;
    }

    if (urlObj.path.match('blog')) {
      // returnUrl = urlObj.origin + urlObj.path + wpLang() + urlObj.search;
      returnUrl = "".concat(urlObj.origin, "/blog").concat(wpLang()).concat(urlObj.path.replace('/blog/', '').replace('/blog', '')).concat(urlObj.search);
    }

    var obj = {
      url: function url() {
        return returnUrl;
      }
    };
    return obj;
  };
  /**
   * url lang converter
   *
   * @export
   * @param {String} url
   * @param {String} lang
   * @returns
   */


  function site (url, lang) {
    return mapUrlLang(url, lang);
  }

  // @ts-ignore
  var prodUrl = 'https://www.motionelements.com';
  var searchUrl = 'https://www.motionelements.com';

  if (window.location.hostname === 'stage.motionelements.com') {
    prodUrl = 'https://stage.motionelements.com';
    searchUrl = 'https://stage.motionelements.com';
  }

  var convertRoute = function convertRoute(path) {
    switch (path) {
      case 'home':
      case '/':
        return '';

      case 'video':
      case 'music':
      case 'animation':
      case 'lottie':
      case 'davinci-resolve-templates':
        return path;

      case '3d':
      case '3d-model':
        return '3d';

      case 'image':
        return 'stock-image';

      case 'sfx':
      case 'sound':
      case 'sound-effect':
        return 'sound-effects';

      case 'pr':
      case 'pr-template':
      case 'pr-templates':
      case 'premiere-pro-template':
        return 'premiere-pro-templates';

      case 'ae':
      case 'ae-template':
      case 'ae-templates':
      case 'after-effects-template':
        return 'after-effects-templates';

      case 'motion':
      case 'motion-template':
      case 'motion-templates':
      case 'apple-motion-template':
      case 'fcpx':
      case 'fcpx-template':
      case 'fcpx-templates':
        return 'apple-motion-templates';

      case 'resolve':
      case 'resolve-template':
      case 'resolve-templates':
      case 'resolve-macro':
        return 'davinci-resolve-templates';

      default:
        return path;
    }
  };

  var convertSearchRoute = function convertSearchRoute(path, type) {
    if (type === 'preset') {
      switch (path) {
        case 'pr':
        case 'pr-preset':
        case 'pr-presets':
          return 'pr-preset';

        case 'ae':
        case 'ae-preset':
        case 'ae-presets':
          return 'ae-preset';

        default:
          return 'ae-preset';
      }
    } // if (type === 'plugin') {
    //   switch (path) {
    //     case 'pr':
    //     case 'pr-preset':
    //     case 'pr-presets':
    //       return 'pr-preset';
    //     case 'ae':
    //     case 'ae-preset':
    //     case 'ae-presets':
    //       return 'ae-preset';
    //     default:
    //       return 'ae-preset';
    //   }
    // }


    switch (path) {
      case 'video':
      case 'music':
      case 'animation':
      case 'image':
      case 'photo':
      case 'vector':
      case 'gif':
        return path;

      case 'gifs':
        return 'gif';

      case 'live':
        return 'video-live';

      case '360':
      case 'vr':
        return 'video-vr';

      case 'pr':
        return 'pr';

      case 'pr-template':
      case 'pr-templates':
        return 'pr-template';

      case 'ae':
        return 'ae';

      case 'ae-template':
      case 'ae-templates':
        return 'ae-template';

      case 'resolve':
        return 'resolve';

      case 'resolve_template':
      case 'resolve_templates':
      case 'resolve-template':
      case 'resolve-templates':
        return 'resolve-template';

      case 'resolve_macro':
      case 'resolve-macro':
        return 'resolve-macro';

      case 'motion':
      case 'motion-template':
      case 'motion-templates':
      case 'fcp':
      case 'fcpx':
      case 'fcpx-template':
      case 'fcpx-templates':
        return 'motion-template';

      case 'mg':
      case 'motion-graphic':
      case 'motion-graphics':
        return 'mg-template';

      case 'sfx':
      case 'sound':
      case 'sound-effects':
        return 'sfx';

      case '3d':
      case '3d-models':
        return '3d-model';

      default:
        return path;
    }
  };
  /**
   * @param {String} path
   * @param {String=} lang
   */


  var getSiteUrl = function getSiteUrl(path, lang) {
    defaultLang.set(lang);
    var domain = prodUrl; // // if stage + prerender, return renderUrl
    // if (process.env.VUE_APP_NOINDEX === 'true' && process.env.VUE_APP_PRERENDER === 'true') {
    //   domain = renderUrl;
    // }

    var doShortEngLang = true;
    var isSearch = false;
    var isRouter = false;
    var isFree = false;
    var type = 'template';
    var isSort = false;
    var sort = 'popular';
    var obj = {
      shortEngLang: function shortEngLang() {
        var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        doShortEngLang = bool;
        return this;
      },
      search: function search() {
        isSearch = true;
        domain = searchUrl;
        return this;
      },
      // render() {
      //   domain = renderUrl;
      //   return this;
      // },
      www: function www() {
        domain = prodUrl;
        return this;
      },
      router: function router() {
        isRouter = true;
        domain = '';
        return this;
      },
      template: function template() {
        type = 'template';
        return this;
      },
      preset: function preset() {
        type = 'preset';
        return this;
      },
      // plugin() {
      //   type = 'plugin';
      //   return this;
      // },
      free: function free() {
        isFree = true;
        return this;
      },
      popular: function popular() {
        isSort = true;
        sort = 'popular';
        return this;
      },
      latest: function latest() {
        isSort = true;
        sort = 'latest';
        return this;
      },
      url: function url() {
        var p = path;

        if (path.startsWith('/')) {
          p = path.replace('/', '');
        }

        var doAppendLangPrefix = true; // not append lang prefix when is en site and shortEngLang(false)

        var isEnglishLang = defaultLang.get() === 'en' ? true : false;

        if (isEnglishLang && doShortEngLang) {
          doAppendLangPrefix = false;
        }

        var route = convertRoute(p);

        if (isSearch) {
          route = convertSearchRoute(p, type);

          if (isSort) {
            return "".concat(domain, "/").concat(defaultLang.get(), "/search/").concat(route, "?sort=").concat(sort);
          }

          return "".concat(domain, "/").concat(defaultLang.get(), "/search/").concat(route);
        }

        if (isFree) {
          route = "/free/".concat(route);
        }

        if (isRouter) {
          if (path === 'home') {
            if (defaultLang.get() === 'en') {
              return '/';
            }

            return "/".concat(defaultLang.get(), "/");
          }

          if (process.env.VUE_APP_PRERENDER === 'true') {
            return "".concat(domain).concat(doAppendLangPrefix ? "/".concat(defaultLang.get()) : '').concat(route ? "/".concat(route) : '/');
          }

          return "".concat(doAppendLangPrefix ? "/".concat(defaultLang.get()) : '').concat(route ? "/".concat(route) : '/');
        }

        if (doAppendLangPrefix) {
          return "".concat(domain, "/").concat(defaultLang.get()).concat(route ? "/".concat(route) : '/');
        }

        return "".concat(domain).concat(route ? "/".concat(route) : '/');
      }
    };
    return obj;
  };
  /**
   * site url helper
   *
   * @export
   * @param {String} path
   * @param {String} lang - lang from store
   * @returns
   */


  function siteUrl (path, lang) {
    return getSiteUrl(path, lang);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;
  var isArray_1 = isArray;

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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /** Detect free variable `global` from Node.js. */

  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */

  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  /** Built-in value references. */

  var _Symbol2 = _root.Symbol;
  var _Symbol = _Symbol2;

  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$1 = objectProto$1.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && _typeof(value) == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */

  function isSymbol(value) {
    return _typeof(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */

  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */

  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
      return true;
    }

    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  var _isKey = isKey;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */

  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */

  var coreJsData = _root['__core-js_shared__'];
  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString = funcProto.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$1 = funcProto$1.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }

    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */

  var nativeCreate = _getNative(Object, 'create');
  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$3 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet(key) {
    var data = this.__data__;

    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? data[key] !== undefined : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */

  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;
  var _Hash = Hash;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf(array, key) {
    var length = array.length;

    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */

  var arrayProto = Array.prototype;
  /** Built-in value references. */

  var splice = arrayProto.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */

  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;
  var _ListCache = ListCache;

  /* Built-in method references that are verified to be native. */

  var Map = _getNative(_root, 'Map');
  var _Map = Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash(),
      'map': new (_Map || _ListCache)(),
      'string': new _Hash()
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */

  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;
  var _MapCache = MapCache;

  /** Error message constants. */

  var FUNC_ERROR_TEXT = 'Expected a function';
  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */

  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }

    var memoized = function memoized() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }

      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };

    memoized.cache = new (memoize.Cache || _MapCache)();
    return memoized;
  } // Expose `MapCache`.


  memoize.Cache = _MapCache;
  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */

  var MAX_MEMOIZE_SIZE = 500;
  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */

  function memoizeCapped(func) {
    var result = memoize_1(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }

      return key;
    });
    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */

  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar = /\\(\\)?/g;
  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */

  var stringToPath = _memoizeCapped(function (string) {
    var result = [];

    if (string.charCodeAt(0) === 46
    /* . */
    ) {
        result.push('');
      }

    string.replace(rePropName, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });
  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */

  var INFINITY = 1 / 0;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */

  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }

    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */

  function toString(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */

  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }

    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** Used as references for various `Number` constants. */

  var INFINITY$1 = 1 / 0;
  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */

  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */

  function baseGet(object, path) {
    path = _castPath(path, object);
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }

    return index && index == length ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */

  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /** `Object#toString` result references. */

  var numberTag = '[object Number]';
  /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */

  function isNumber(value) {
    return typeof value == 'number' || isObjectLike_1(value) && _baseGetTag(value) == numberTag;
  }

  var isNumber_1 = isNumber;

  /**
   * Checks if `value` is `NaN`.
   *
   * **Note:** This method is based on
   * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
   * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
   * `undefined` and other non-number values.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   * @example
   *
   * _.isNaN(NaN);
   * // => true
   *
   * _.isNaN(new Number(NaN));
   * // => true
   *
   * isNaN(undefined);
   * // => true
   *
   * _.isNaN(undefined);
   * // => false
   */

  function isNaN(value) {
    // An `NaN` primitive is the only value that is not equal to itself.
    // Perform the `toStringTag` check first to avoid errors with some
    // ActiveX objects in IE.
    return isNumber_1(value) && value != +value;
  }

  var _isNaN = isNaN;

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array == null ? 0 : array.length;

    if (initAccum && length) {
      accumulator = array[++index];
    }

    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }

    return accumulator;
  }

  var _arrayReduce = arrayReduce;

  /**
   * The base implementation of `_.propertyOf` without support for deep paths.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyOf(object) {
    return function (key) {
      return object == null ? undefined : object[key];
    };
  }

  var _basePropertyOf = basePropertyOf;

  /** Used to map Latin Unicode letters to basic Latin letters. */

  var deburredLetters = {
    // Latin-1 Supplement block.
    '\xc0': 'A',
    '\xc1': 'A',
    '\xc2': 'A',
    '\xc3': 'A',
    '\xc4': 'A',
    '\xc5': 'A',
    '\xe0': 'a',
    '\xe1': 'a',
    '\xe2': 'a',
    '\xe3': 'a',
    '\xe4': 'a',
    '\xe5': 'a',
    '\xc7': 'C',
    '\xe7': 'c',
    '\xd0': 'D',
    '\xf0': 'd',
    '\xc8': 'E',
    '\xc9': 'E',
    '\xca': 'E',
    '\xcb': 'E',
    '\xe8': 'e',
    '\xe9': 'e',
    '\xea': 'e',
    '\xeb': 'e',
    '\xcc': 'I',
    '\xcd': 'I',
    '\xce': 'I',
    '\xcf': 'I',
    '\xec': 'i',
    '\xed': 'i',
    '\xee': 'i',
    '\xef': 'i',
    '\xd1': 'N',
    '\xf1': 'n',
    '\xd2': 'O',
    '\xd3': 'O',
    '\xd4': 'O',
    '\xd5': 'O',
    '\xd6': 'O',
    '\xd8': 'O',
    '\xf2': 'o',
    '\xf3': 'o',
    '\xf4': 'o',
    '\xf5': 'o',
    '\xf6': 'o',
    '\xf8': 'o',
    '\xd9': 'U',
    '\xda': 'U',
    '\xdb': 'U',
    '\xdc': 'U',
    '\xf9': 'u',
    '\xfa': 'u',
    '\xfb': 'u',
    '\xfc': 'u',
    '\xdd': 'Y',
    '\xfd': 'y',
    '\xff': 'y',
    '\xc6': 'Ae',
    '\xe6': 'ae',
    '\xde': 'Th',
    '\xfe': 'th',
    '\xdf': 'ss',
    // Latin Extended-A block.
    "\u0100": 'A',
    "\u0102": 'A',
    "\u0104": 'A',
    "\u0101": 'a',
    "\u0103": 'a',
    "\u0105": 'a',
    "\u0106": 'C',
    "\u0108": 'C',
    "\u010A": 'C',
    "\u010C": 'C',
    "\u0107": 'c',
    "\u0109": 'c',
    "\u010B": 'c',
    "\u010D": 'c',
    "\u010E": 'D',
    "\u0110": 'D',
    "\u010F": 'd',
    "\u0111": 'd',
    "\u0112": 'E',
    "\u0114": 'E',
    "\u0116": 'E',
    "\u0118": 'E',
    "\u011A": 'E',
    "\u0113": 'e',
    "\u0115": 'e',
    "\u0117": 'e',
    "\u0119": 'e',
    "\u011B": 'e',
    "\u011C": 'G',
    "\u011E": 'G',
    "\u0120": 'G',
    "\u0122": 'G',
    "\u011D": 'g',
    "\u011F": 'g',
    "\u0121": 'g',
    "\u0123": 'g',
    "\u0124": 'H',
    "\u0126": 'H',
    "\u0125": 'h',
    "\u0127": 'h',
    "\u0128": 'I',
    "\u012A": 'I',
    "\u012C": 'I',
    "\u012E": 'I',
    "\u0130": 'I',
    "\u0129": 'i',
    "\u012B": 'i',
    "\u012D": 'i',
    "\u012F": 'i',
    "\u0131": 'i',
    "\u0134": 'J',
    "\u0135": 'j',
    "\u0136": 'K',
    "\u0137": 'k',
    "\u0138": 'k',
    "\u0139": 'L',
    "\u013B": 'L',
    "\u013D": 'L',
    "\u013F": 'L',
    "\u0141": 'L',
    "\u013A": 'l',
    "\u013C": 'l',
    "\u013E": 'l',
    "\u0140": 'l',
    "\u0142": 'l',
    "\u0143": 'N',
    "\u0145": 'N',
    "\u0147": 'N',
    "\u014A": 'N',
    "\u0144": 'n',
    "\u0146": 'n',
    "\u0148": 'n',
    "\u014B": 'n',
    "\u014C": 'O',
    "\u014E": 'O',
    "\u0150": 'O',
    "\u014D": 'o',
    "\u014F": 'o',
    "\u0151": 'o',
    "\u0154": 'R',
    "\u0156": 'R',
    "\u0158": 'R',
    "\u0155": 'r',
    "\u0157": 'r',
    "\u0159": 'r',
    "\u015A": 'S',
    "\u015C": 'S',
    "\u015E": 'S',
    "\u0160": 'S',
    "\u015B": 's',
    "\u015D": 's',
    "\u015F": 's',
    "\u0161": 's',
    "\u0162": 'T',
    "\u0164": 'T',
    "\u0166": 'T',
    "\u0163": 't',
    "\u0165": 't',
    "\u0167": 't',
    "\u0168": 'U',
    "\u016A": 'U',
    "\u016C": 'U',
    "\u016E": 'U',
    "\u0170": 'U',
    "\u0172": 'U',
    "\u0169": 'u',
    "\u016B": 'u',
    "\u016D": 'u',
    "\u016F": 'u',
    "\u0171": 'u',
    "\u0173": 'u',
    "\u0174": 'W',
    "\u0175": 'w',
    "\u0176": 'Y',
    "\u0177": 'y',
    "\u0178": 'Y',
    "\u0179": 'Z',
    "\u017B": 'Z',
    "\u017D": 'Z',
    "\u017A": 'z',
    "\u017C": 'z',
    "\u017E": 'z',
    "\u0132": 'IJ',
    "\u0133": 'ij',
    "\u0152": 'Oe',
    "\u0153": 'oe',
    "\u0149": "'n",
    "\u017F": 's'
  };
  /**
   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
   * letters to basic Latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */

  var deburrLetter = _basePropertyOf(deburredLetters);
  var _deburrLetter = deburrLetter;

  /** Used to match Latin Unicode letters (excluding mathematical operators). */

  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  /** Used to compose unicode character classes. */

  var rsComboMarksRange = "\\u0300-\\u036f",
      reComboHalfMarksRange = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange = "\\u20d0-\\u20ff",
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
  /** Used to compose unicode capture groups. */

  var rsCombo = '[' + rsComboRange + ']';
  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */

  var reComboMark = RegExp(rsCombo, 'g');
  /**
   * Deburrs `string` by converting
   * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
   * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
   * letters to basic Latin letters and removing
   * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to deburr.
   * @returns {string} Returns the deburred string.
   * @example
   *
   * _.deburr('déjà vu');
   * // => 'deja vu'
   */

  function deburr(string) {
    string = toString_1(string);
    return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
  }

  var deburr_1 = deburr;

  /** Used to match words composed of alphanumeric characters. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  /**
   * Splits an ASCII `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */

  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }

  var _asciiWords = asciiWords;

  /** Used to detect strings that need a more robust regexp to match words. */
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  /**
   * Checks if `string` contains a word composed of Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a word is found, else `false`.
   */

  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }

  var _hasUnicodeWord = hasUnicodeWord;

  /** Used to compose unicode character classes. */
  var rsAstralRange = "\\ud800-\\udfff",
      rsComboMarksRange$1 = "\\u0300-\\u036f",
      reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsDingbatRange = "\\u2700-\\u27bf",
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = "\\u2000-\\u206f",
      rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = "\\ufe0e\\ufe0f",
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  /** Used to compose unicode capture groups. */

  var rsApos = "['\u2019]",
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo$1 = '[' + rsComboRange$1 + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = "\\ud83c[\\udffb-\\udfff]",
      rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = "\\u200d";
  /** Used to compose unicode regexes. */

  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
  /** Used to match complex or compound words. */

  var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
  /**
   * Splits a Unicode `string` into an array of its words.
   *
   * @private
   * @param {string} The string to inspect.
   * @returns {Array} Returns the words of `string`.
   */

  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }

  var _unicodeWords = unicodeWords;

  /**
   * Splits `string` into an array of its words.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to inspect.
   * @param {RegExp|string} [pattern] The pattern to match words.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the words of `string`.
   * @example
   *
   * _.words('fred, barney, & pebbles');
   * // => ['fred', 'barney', 'pebbles']
   *
   * _.words('fred, barney, & pebbles', /[^, ]+/g);
   * // => ['fred', 'barney', '&', 'pebbles']
   */

  function words(string, pattern, guard) {
    string = toString_1(string);
    pattern = guard ? undefined : pattern;

    if (pattern === undefined) {
      return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
    }

    return string.match(pattern) || [];
  }

  var words_1 = words;

  /** Used to compose unicode capture groups. */

  var rsApos$1 = "['\u2019]";
  /** Used to match apostrophes. */

  var reApos = RegExp(rsApos$1, 'g');
  /**
   * Creates a function like `_.camelCase`.
   *
   * @private
   * @param {Function} callback The function to combine each word.
   * @returns {Function} Returns the new compounder function.
   */

  function createCompounder(callback) {
    return function (string) {
      return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
    };
  }

  var _createCompounder = createCompounder;

  /**
   * Converts `string` to
   * [snake case](https://en.wikipedia.org/wiki/Snake_case).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to convert.
   * @returns {string} Returns the snake cased string.
   * @example
   *
   * _.snakeCase('Foo Bar');
   * // => 'foo_bar'
   *
   * _.snakeCase('fooBar');
   * // => 'foo_bar'
   *
   * _.snakeCase('--FOO-BAR--');
   * // => 'foo_bar'
   */

  var snakeCase = _createCompounder(function (result, word, index) {
    return result + (index ? '_' : '') + word.toLowerCase();
  });
  var snakeCase_1 = snakeCase;

  var enJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "Stock Image ・ Animated GIF",
  		name_plural: "Stock Image ・ Animated GIF",
  		name_seo: "Stock Image ・ Animated GIF",
  		name_seo_plural: "Stock Image ・ Animated GIF",
  		name_short: "Image",
  		name_short_plural: "Image",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "Stock video footage",
  		name_plural: "Stock video footage",
  		name_seo: "Stock video footage",
  		name_seo_plural: "Stock video footage",
  		name_short: "Video",
  		name_short_plural: "Video",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Apple Motion / FCPX Templates",
  		name_plural: "Apple Motion / FCPX Templates",
  		name_seo: "Apple Motion / FCPX Templates",
  		name_seo_plural: "Apple Motion / FCPX Templates",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "3D models",
  		name_plural: "3D models",
  		name_seo: "3D models",
  		name_seo_plural: "3D models",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "Stock Photo",
  		name_plural: "Stock Photo",
  		name_seo: "Stock Photo",
  		name_seo_plural: "Stock Photo",
  		name_short: "Photo",
  		name_short_plural: "Photo",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "Stock Vector",
  		name_plural: "Stock Vector",
  		name_seo: "Stock Vector",
  		name_seo_plural: "Stock Vector",
  		name_short: "Vector",
  		name_short_plural: "Vector",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "Stock Animation",
  		name_plural: "Stock Animation",
  		name_seo: "Stock Animation",
  		name_seo_plural: "Stock Animation",
  		name_short: "Animation",
  		name_short_plural: "Animation",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Live Action",
  		name_plural: "Live Action",
  		name_seo: "Live Action",
  		name_seo_plural: "Live Action",
  		name_short: "Live Action",
  		name_short_plural: "Live Action",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "3D models",
  		name_plural: "3D models",
  		name_seo: "3D models",
  		name_seo_plural: "3D models",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "Background music for video",
  		name_plural: "Background music for video",
  		name_seo: "Background music for video",
  		name_seo_plural: "Background music for video",
  		name_short: "Music",
  		name_short_plural: "Music",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "Sound Effects for Video",
  		name_plural: "Sound Effects for Video",
  		name_seo: "Sound Effects for Video",
  		name_seo_plural: "Sound Effects for Video",
  		name_short: "SFX",
  		name_short_plural: "SFX",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "After Effects templates",
  		name_plural: "After Effects templates",
  		name_seo: "After Effects templates",
  		name_seo_plural: "After Effects templates",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Apple Motion templates",
  		name_plural: "Apple Motion templates",
  		name_seo: "Apple Motion templates",
  		name_seo_plural: "Apple Motion templates",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "360° Photo",
  		name_plural: "360° Photo",
  		name_seo: "360° Photo",
  		name_seo_plural: "360° Photo",
  		name_short: "360° Photo",
  		name_short_plural: "360° Photo",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "360° Video",
  		name_plural: "360° Video",
  		name_seo: "360° Video",
  		name_seo_plural: "360° Video",
  		name_short: "360° Video",
  		name_short_plural: "360° Video",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Premiere Pro Template",
  		name_plural: "Premiere Pro Template",
  		name_seo: "Premiere Pro Template",
  		name_seo_plural: "Premiere Pro Template",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "Motion Graphics Template",
  		name_plural: "Motion Graphics Template",
  		name_seo: "Motion Graphics Template",
  		name_seo_plural: "Motion Graphics Template",
  		name_short: "Motion Graphics",
  		name_short_plural: "Motion Graphics",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "After Effects Animation Preset",
  		name_plural: "After Effects Animation Preset",
  		name_seo: "After Effects Animation Preset",
  		name_seo_plural: "After Effects Animation Preset",
  		name_short: "AE Preset",
  		name_short_plural: "AE Preset",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Premiere Pro Effect Preset",
  		name_plural: "Premiere Pro Effect Preset",
  		name_seo: "Premiere Pro Effect Preset",
  		name_seo_plural: "Premiere Pro Effect Preset",
  		name_short: "Premiere Preset",
  		name_short_plural: "Premiere Preset",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Lottie Animation",
  		name_plural: "Lottie Animation",
  		name_seo: "Lottie Animation",
  		name_seo_plural: "Lottie Animation",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "Free Animated GIFs",
  		name_plural: "Free Animated GIFs",
  		name_short: "Free Stock GIFs",
  		name_short_plural: "Free Stock GIFs",
  		name_seo: "Free Animated GIFs",
  		name_seo_plural: "Free Animated GIFs"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Free Stock Footage",
  		name_plural: "Free Stock Footage",
  		name_short: "Free Stock Video",
  		name_short_plural: "Free Stock Video",
  		name_seo: "Free Stock Footage",
  		name_seo_plural: "Free Stock Footage"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Free After Effects Templates",
  		name_plural: "Free After Effects Templates",
  		name_short: "Free AE Templates",
  		name_short_plural: "Free AE Templates",
  		name_seo: "Free After Effects Templates",
  		name_seo_plural: "Free After Effects Templates"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Free Premiere Pro Templates",
  		name_plural: "Free Premiere Pro Templates",
  		name_short: "Free Motion Graphics Template",
  		name_short_plural: "Free Motion Graphics Template",
  		name_seo: "Free Premiere Pro Templates",
  		name_seo_plural: "Free Premiere Pro Templates"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Free FCPX Motion Templates",
  		name_plural: "Free FCPX Motion Templates",
  		name_short: "Free Final Cut Pro Templates",
  		name_short_plural: "Free Final Cut Pro Templates",
  		name_seo: "Free FCPX Motion Templates",
  		name_seo_plural: "Free FCPX Motion Templates"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "Free Background Music for Video",
  		name_plural: "Free Background Music for Video",
  		name_short: "Royalty Free Stock Music",
  		name_short_plural: "Royalty Free Stock Music",
  		name_seo: "Free Background Music for Video",
  		name_seo_plural: "Free Background Music for Video"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "Free Sound Effects",
  		name_plural: "Free Sound Effects",
  		name_short: "Free SFX",
  		name_short_plural: "Free SFX",
  		name_seo: "Free Sound Effects",
  		name_seo_plural: "Free Sound Effects"
  	}
  ];

  var jaJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "画像素材 ・ GIF画像",
  		name_plural: "画像素材 ・ GIF画像",
  		name_seo: "画像素材 ・ GIF画像",
  		name_seo_plural: "画像素材 ・ GIF画像",
  		name_short: "画像",
  		name_short_plural: "画像",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "動画素材",
  		name_plural: "動画素材",
  		name_seo: "動画素材",
  		name_seo_plural: "動画素材",
  		name_short: "動画",
  		name_short_plural: "動画",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Apple Motion ・ Final Cut Pro X テンプレート",
  		name_plural: "Apple Motion ・ Final Cut Pro X テンプレート",
  		name_seo: "Apple Motion ・ Final Cut Pro X テンプレート",
  		name_seo_plural: "Apple Motion ・ Final Cut Pro X テンプレート",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "3Dモデル",
  		name_plural: "3Dモデル",
  		name_seo: "3Dモデル",
  		name_seo_plural: "3Dモデル",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "写真素材",
  		name_plural: "写真素材",
  		name_seo: "写真素材",
  		name_seo_plural: "写真素材",
  		name_short: "フォト",
  		name_short_plural: "フォト",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "ベクター素材",
  		name_plural: "ベクター素材",
  		name_seo: "ベクター素材",
  		name_seo_plural: "ベクター素材",
  		name_short: "ベクター",
  		name_short_plural: "ベクター",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "CG動画素材",
  		name_plural: "CG動画素材",
  		name_seo: "CG動画素材",
  		name_seo_plural: "CG動画素材",
  		name_short: "CG動画",
  		name_short_plural: "CG動画",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "ライブ動画",
  		name_plural: "ライブ動画",
  		name_seo: "ライブ動画",
  		name_seo_plural: "ライブ動画",
  		name_short: "ライブ動画",
  		name_short_plural: "ライブ動画",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "3Dモデル",
  		name_plural: "3Dモデル",
  		name_seo: "3Dモデル",
  		name_seo_plural: "3Dモデル",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "ロイヤリティフリー音楽素材",
  		name_plural: "ロイヤリティフリー音楽素材",
  		name_seo: "ロイヤリティフリー音楽素材",
  		name_seo_plural: "ロイヤリティフリー音楽素材",
  		name_short: "音楽",
  		name_short_plural: "音楽",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "効果音",
  		name_plural: "効果音",
  		name_seo: "効果音",
  		name_seo_plural: "効果音",
  		name_short: "効果音",
  		name_short_plural: "効果音",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "After Effectsテンプレート",
  		name_plural: "After Effectsテンプレート",
  		name_seo: "After Effectsテンプレート",
  		name_seo_plural: "After Effectsテンプレート",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Apple Motionテンプレート",
  		name_plural: "Apple Motionテンプレート",
  		name_seo: "Apple Motionテンプレート",
  		name_seo_plural: "Apple Motionテンプレート",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "360° 写真",
  		name_plural: "360° 写真",
  		name_seo: "360° 写真",
  		name_seo_plural: "360° 写真",
  		name_short: "360° 写真",
  		name_short_plural: "360° 写真",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "360° 動画",
  		name_plural: "360° 動画",
  		name_seo: "360° 動画",
  		name_seo_plural: "360° 動画",
  		name_short: "360° 動画",
  		name_short_plural: "360° 動画",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Premiere Proテンプレート",
  		name_plural: "Premiere Proテンプレート",
  		name_seo: "Premiere Proテンプレート",
  		name_seo_plural: "Premiere Proテンプレート",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "モーショングラフィックステンプレート",
  		name_plural: "モーショングラフィックステンプレート",
  		name_seo: "モーショングラフィックステンプレート",
  		name_seo_plural: "モーショングラフィックステンプレート",
  		name_short: "Motion Graphics",
  		name_short_plural: "Motion Graphics",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "After Effectsアニメーションプリセット",
  		name_plural: "After Effectsアニメーションプリセット",
  		name_seo: "After Effectsアニメーションプリセット",
  		name_seo_plural: "After Effectsアニメーションプリセット",
  		name_short: "AEプリセット",
  		name_short_plural: "AEプリセット",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Premiere Proエフェクトプリセット",
  		name_plural: "Premiere Proエフェクトプリセット",
  		name_seo: "Premiere Proエフェクトプリセット",
  		name_seo_plural: "Premiere Proエフェクトプリセット",
  		name_short: "Premiereプリセット",
  		name_short_plural: "Premiereプリセット",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Lottie アニメーション",
  		name_plural: "Lottie アニメーション",
  		name_seo: "Lottie アニメーション",
  		name_seo_plural: "Lottie アニメーション",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolveテンプレート",
  		name_plural: "DaVinci Resolveテンプレート",
  		name_seo: "DaVinci Resolveテンプレート",
  		name_seo_plural: "DaVinci Resolveテンプレート",
  		name_short: "DaVinci Resolveテンプレート",
  		name_short_plural: "DaVinci Resolveテンプレート",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "無料<wbr>GIF<wbr>アニメーション",
  		name_plural: "無料<wbr>GIF<wbr>アニメーション",
  		name_short: "無料<wbr>GIF<wbr>アニメーション",
  		name_short_plural: "無料<wbr>GIF<wbr>アニメーション",
  		name_seo: "無料<wbr>GIF<wbr>アニメーション",
  		name_seo_plural: "無料<wbr>GIF<wbr>アニメーション"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "無料<wbr>動画素材",
  		name_plural: "無料<wbr>動画素材",
  		name_short: "無料<wbr>動画素材",
  		name_short_plural: "無料<wbr>動画素材",
  		name_seo: "無料<wbr>動画素材",
  		name_seo_plural: "無料<wbr>動画素材"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "無料<wbr>After<wbr> Effects<wbr>テンプレート",
  		name_plural: "無料<wbr>After<wbr> Effects<wbr>テンプレート",
  		name_short: "無料<wbr>After<wbr> Effects<wbr>テンプレート",
  		name_short_plural: "無料<wbr>After<wbr> Effects<wbr>テンプレート",
  		name_seo: "無料<wbr>After<wbr> Effects<wbr>テンプレート",
  		name_seo_plural: "無料<wbr>After<wbr> Effects<wbr>テンプレート"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "無料<wbr> Premiere Pro <wbr>テンプレート",
  		name_plural: "無料<wbr> Premiere Pro <wbr>テンプレート",
  		name_short: "無料<wbr> Premiere Pro <wbr>テンプレート",
  		name_short_plural: "無料<wbr> Premiere Pro <wbr>テンプレート",
  		name_seo: "無料<wbr> Premiere Pro <wbr>テンプレート",
  		name_seo_plural: "無料<wbr> Premiere Pro <wbr>テンプレート"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート",
  		name_plural: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート",
  		name_short: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート",
  		name_short_plural: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート",
  		name_seo: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート",
  		name_seo_plural: "無料<wbr> Final Cut Pro<wbr> Motion<wbr> テンプレート"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "フリー<wbr>BGM",
  		name_plural: "フリー<wbr>BGM",
  		name_short: "フリー<wbr>BGM",
  		name_short_plural: "フリー<wbr>BGM",
  		name_seo: "フリー<wbr>BGM",
  		name_seo_plural: "フリー<wbr>BGM"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "無料<wbr>効果音",
  		name_plural: "無料<wbr>効果音",
  		name_short: "無料<wbr>効果音",
  		name_short_plural: "無料<wbr>効果音",
  		name_seo: "無料<wbr>効果音",
  		name_seo_plural: "無料<wbr>効果音"
  	}
  ];

  var koJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "스톡 이미지 ・ 애니메이션 GIF",
  		name_plural: "스톡 이미지 ・ 애니메이션 GIF",
  		name_seo: "스톡 이미지 ・ 애니메이션 GIF",
  		name_seo_plural: "스톡 이미지 ・ 애니메이션 GIF",
  		name_short: "이미지",
  		name_short_plural: "이미지",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "영상 소스",
  		name_plural: "영상 소스",
  		name_seo: "영상 소스",
  		name_seo_plural: "영상 소스",
  		name_short: "비디오",
  		name_short_plural: "비디오",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "애프터 이펙트",
  		name_plural: "애프터 이펙트",
  		name_seo: "애프터 이펙트",
  		name_seo_plural: "애프터 이펙트",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "프리미어 프로",
  		name_plural: "프리미어 프로",
  		name_seo: "프리미어 프로",
  		name_seo_plural: "프리미어 프로",
  		name_short: "프리미어",
  		name_short_plural: "프리미어",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "애플 모션 ・ FCPX 템플릿",
  		name_plural: "애플 모션 ・ FCPX 템플릿",
  		name_seo: "애플 모션 ・ FCPX 템플릿",
  		name_seo_plural: "애플 모션 ・ FCPX 템플릿",
  		name_short: "FCPX ・ 모션",
  		name_short_plural: "FCPX ・ 모션",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "다빈치 리졸브",
  		name_plural: "다빈치 리졸브",
  		name_seo: "다빈치 리졸브",
  		name_seo_plural: "다빈치 리졸브",
  		name_short: "다빈치 리졸브",
  		name_short_plural: "다빈치 리졸브",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "3D 모델",
  		name_plural: "3D 모델",
  		name_seo: "3D 모델",
  		name_seo_plural: "3D 모델",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "스톡 사진",
  		name_plural: "스톡 사진",
  		name_seo: "스톡 사진",
  		name_seo_plural: "스톡 사진",
  		name_short: "사진",
  		name_short_plural: "사진",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "스톡 벡터",
  		name_plural: "스톡 벡터",
  		name_seo: "스톡 벡터",
  		name_seo_plural: "스톡 벡터",
  		name_short: "벡터",
  		name_short_plural: "벡터",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "애니메이션",
  		name_plural: "애니메이션",
  		name_seo: "애니메이션",
  		name_seo_plural: "애니메이션",
  		name_short: "애니메이션",
  		name_short_plural: "애니메이션",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "실사 촬영",
  		name_plural: "실사 촬영",
  		name_seo: "실사 촬영",
  		name_seo_plural: "실사 촬영",
  		name_short: "실사 촬영",
  		name_short_plural: "실사 촬영",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "3D 모델",
  		name_plural: "3D 모델",
  		name_seo: "3D 모델",
  		name_seo_plural: "3D 모델",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "저작권 무료 음악",
  		name_plural: "저작권 무료 음악",
  		name_seo: "저작권 무료 음악",
  		name_seo_plural: "저작권 무료 음악",
  		name_short: "음악",
  		name_short_plural: "음악",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "음향 효과",
  		name_plural: "음향 효과",
  		name_seo: "음향 효과",
  		name_seo_plural: "음향 효과",
  		name_short: "SFX",
  		name_short_plural: "SFX",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "에프터 이펙트 소스",
  		name_plural: "에프터 이펙트 소스",
  		name_seo: "에프터 이펙트 소스",
  		name_seo_plural: "에프터 이펙트 소스",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "애플 모션 템플릿",
  		name_plural: "애플 모션 템플릿",
  		name_seo: "애플 모션 템플릿",
  		name_seo_plural: "애플 모션 템플릿",
  		name_short: "애플 모션",
  		name_short_plural: "애플 모션",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "360° 사진",
  		name_plural: "360° 사진",
  		name_seo: "360° 사진",
  		name_seo_plural: "360° 사진",
  		name_short: "360° 사진",
  		name_short_plural: "360° 사진",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "360° 영상",
  		name_plural: "360° 영상",
  		name_seo: "360° 영상",
  		name_seo_plural: "360° 영상",
  		name_short: "360° 영상",
  		name_short_plural: "360° 영상",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "프리미어 프로 템플릿",
  		name_plural: "프리미어 프로 템플릿",
  		name_seo: "프리미어 프로 템플릿",
  		name_seo_plural: "프리미어 프로 템플릿",
  		name_short: "프리미어",
  		name_short_plural: "프리미어",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "모션 그래픽 템플릿",
  		name_plural: "모션 그래픽 템플릿",
  		name_seo: "모션 그래픽 템플릿",
  		name_seo_plural: "모션 그래픽 템플릿",
  		name_short: "모션 그래픽",
  		name_short_plural: "모션 그래픽",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "애프터 이펙트 애니메이션 프리셋",
  		name_plural: "애프터 이펙트 애니메이션 프리셋",
  		name_seo: "애프터 이펙트 애니메이션 프리셋",
  		name_seo_plural: "애프터 이펙트 애니메이션 프리셋",
  		name_short: "AE 프리셋",
  		name_short_plural: "AE 프리셋",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "프리미어 프로 이펙트 프리셋",
  		name_plural: "프리미어 프로 이펙트 프리셋",
  		name_seo: "프리미어 프로 이펙트 프리셋",
  		name_seo_plural: "프리미어 프로 이펙트 프리셋",
  		name_short: "프리미어 프리셋",
  		name_short_plural: "프리미어 프리셋",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Lottie 애니메이션",
  		name_plural: "Lottie 애니메이션",
  		name_seo: "Lottie 애니메이션",
  		name_seo_plural: "Lottie 애니메이션",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "다빈치 리졸브 템플릿",
  		name_plural: "다빈치 리졸브 템플릿",
  		name_seo: "다빈치 리졸브 템플릿",
  		name_seo_plural: "다빈치 리졸브 템플릿",
  		name_short: "다빈치 리졸브 템플릿",
  		name_short_plural: "다빈치 리졸브 템플릿",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "무료 애니메이션 GIF",
  		name_plural: "무료 애니메이션 GIF",
  		name_short: "무료 이미지 사이트, 무료 GIF",
  		name_short_plural: "무료 이미지 사이트, 무료 GIF",
  		name_seo: "무료 애니메이션 GIF",
  		name_seo_plural: "무료 애니메이션 GIF"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "무료 영상 소스",
  		name_plural: "무료 영상 소스",
  		name_short: "무료 스톡 영상",
  		name_short_plural: "무료 스톡 영상",
  		name_seo: "무료 영상 소스",
  		name_seo_plural: "무료 영상 소스"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "무료 애프터이펙트 템플릿",
  		name_plural: "무료 애프터이펙트 템플릿",
  		name_short: "무료 에펙 소스, 무료 애펙 템플릿",
  		name_short_plural: "무료 에펙 소스, 무료 애펙 템플릿",
  		name_seo: "무료 애프터이펙트 템플릿",
  		name_seo_plural: "무료 애프터이펙트 템플릿"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "프리미어 무료 템플릿",
  		name_plural: "프리미어 무료 템플릿",
  		name_short: "무료 프리미어 소스",
  		name_short_plural: "무료 프리미어 소스",
  		name_seo: "프리미어 무료 템플릿",
  		name_seo_plural: "프리미어 무료 템플릿"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "파이널컷 무료 템플릿",
  		name_plural: "파이널컷 무료 템플릿",
  		name_short: "모션 무료 템플릿",
  		name_short_plural: "모션 무료 템플릿",
  		name_seo: "파이널컷 무료 템플릿",
  		name_seo_plural: "파이널컷 무료 템플릿"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "무료 BGM",
  		name_plural: "무료 BGM",
  		name_short: "영상 배경음악, 저작권 무료 음악",
  		name_short_plural: "영상 배경음악, 저작권 무료 음악",
  		name_seo: "무료 BGM",
  		name_seo_plural: "무료 BGM"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "무료 효과음",
  		name_plural: "무료 효과음",
  		name_short: "무료 효과음",
  		name_short_plural: "무료 효과음",
  		name_seo: "무료 효과음",
  		name_seo_plural: "무료 효과음"
  	}
  ];

  var zh_hantJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "圖片素材 ・ GIF 動畫",
  		name_plural: "圖片素材 ・ GIF 動畫",
  		name_seo: "圖片素材 ・ GIF 動畫",
  		name_seo_plural: "圖片素材 ・ GIF 動畫",
  		name_short: "圖片",
  		name_short_plural: "圖片",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "影片素材",
  		name_plural: "影片素材",
  		name_seo: "影片素材",
  		name_seo_plural: "影片素材",
  		name_short: "影片",
  		name_short_plural: "影片",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Apple Motion/FCPX 模板",
  		name_plural: "Apple Motion/FCPX 模板",
  		name_seo: "Apple Motion/FCPX 模板",
  		name_seo_plural: "Apple Motion/FCPX 模板",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "3D模型",
  		name_plural: "3D模型",
  		name_seo: "3D模型",
  		name_seo_plural: "3D模型",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "照片素材",
  		name_plural: "照片素材",
  		name_seo: "照片素材",
  		name_seo_plural: "照片素材",
  		name_short: "相片",
  		name_short_plural: "相片",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "向量素材",
  		name_plural: "向量素材",
  		name_seo: "向量素材",
  		name_seo_plural: "向量素材",
  		name_short: "向量",
  		name_short_plural: "向量",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "動畫素材",
  		name_plural: "動畫素材",
  		name_seo: "動畫素材",
  		name_seo_plural: "動畫素材",
  		name_short: "動畫",
  		name_short_plural: "動畫",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Live影片",
  		name_plural: "Live影片",
  		name_seo: "Live影片",
  		name_seo_plural: "Live影片",
  		name_short: "Live影片",
  		name_short_plural: "Live影片",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "3D模型",
  		name_plural: "3D模型",
  		name_seo: "3D模型",
  		name_seo_plural: "3D模型",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "背景音樂素材",
  		name_plural: "背景音樂素材",
  		name_seo: "背景音樂素材",
  		name_seo_plural: "背景音樂素材",
  		name_short: "音樂",
  		name_short_plural: "音樂",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "音效素材",
  		name_plural: "音效素材",
  		name_seo: "音效素材",
  		name_seo_plural: "音效素材",
  		name_short: "音效",
  		name_short_plural: "音效",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "AE模版",
  		name_plural: "AE模版",
  		name_seo: "AE模版",
  		name_seo_plural: "AE模版",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Motion 模板",
  		name_plural: "Motion 模板",
  		name_seo: "Motion 模板",
  		name_seo_plural: "Motion 模板",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "360° 相片",
  		name_plural: "360° 相片",
  		name_seo: "360° 相片",
  		name_seo_plural: "360° 相片",
  		name_short: "360° 相片",
  		name_short_plural: "360° 相片",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "360° 影片",
  		name_plural: "360° 影片",
  		name_seo: "360° 影片",
  		name_seo_plural: "360° 影片",
  		name_short: "360° 影片",
  		name_short_plural: "360° 影片",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF 動畫",
  		name_plural: "GIF 動畫",
  		name_seo: "GIF 動畫",
  		name_seo_plural: "GIF 動畫",
  		name_short: "GIF 動畫",
  		name_short_plural: "GIF 動畫",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "PR模板",
  		name_plural: "PR模板",
  		name_seo: "PR模板",
  		name_seo_plural: "PR模板",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "動態圖形模板",
  		name_plural: "動態圖形模板",
  		name_seo: "動態圖形模板",
  		name_seo_plural: "動態圖形模板",
  		name_short: "動態圖型",
  		name_short_plural: "動態圖型",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "After Effects 動畫預設模組",
  		name_plural: "After Effects 動畫預設模組",
  		name_seo: "After Effects 動畫預設模組",
  		name_seo_plural: "After Effects 動畫預設模組",
  		name_short: "AE 預設模組",
  		name_short_plural: "AE 預設模組",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Premiere Pro 特效預設模組",
  		name_plural: "Premiere Pro 特效預設模組",
  		name_seo: "Premiere Pro 特效預設模組",
  		name_seo_plural: "Premiere Pro 特效預設模組",
  		name_short: "Premiere 預設模組",
  		name_short_plural: "Premiere 預設模組",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Lottie 動畫",
  		name_plural: "Lottie 動畫",
  		name_seo: "Lottie 動畫",
  		name_seo_plural: "Lottie 動畫",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve 模板",
  		name_plural: "DaVinci Resolve 模板",
  		name_seo: "DaVinci Resolve 模板",
  		name_seo_plural: "DaVinci Resolve 模板",
  		name_short: "DaVinci Resolve 模板",
  		name_short_plural: "DaVinci Resolve 模板",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "免費 GIF 動畫素材",
  		name_plural: "免費 GIF 動畫素材",
  		name_short: "免費GIF動態圖庫、免費GIF動態素材",
  		name_short_plural: "免費GIF動態圖庫、免費GIF動態素材",
  		name_seo: "免費 GIF 動畫素材",
  		name_seo_plural: "免費 GIF 動畫素材"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "免費影片素材",
  		name_plural: "免費影片素材",
  		name_short: "免費影片庫、免費影片背景",
  		name_short_plural: "免費影片庫、免費影片背景",
  		name_seo: "免費影片素材",
  		name_seo_plural: "免費影片素材"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "免費 After Effects (AE) 模板",
  		name_plural: "免費 After Effects (AE) 模板",
  		name_short: "免費AE素材、免費AE特效",
  		name_short_plural: "免費AE素材、免費AE特效",
  		name_seo: "免費 After Effects (AE) 模板",
  		name_seo_plural: "免費 After Effects (AE) 模板"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "免費 Pr 模板",
  		name_plural: "免費 Pr 模板",
  		name_short: "免費 Adobe Premiere Pro 模板",
  		name_short_plural: "免費 Adobe Premiere Pro 模板",
  		name_seo: "免費 Pr 模板",
  		name_seo_plural: "免費 Pr 模板"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "免費 FCPX Motion 模板",
  		name_plural: "免費 FCPX Motion 模板",
  		name_short: "免費 Final Cut Pro 模板",
  		name_short_plural: "免費 Final Cut Pro 模板",
  		name_seo: "免費 FCPX Motion 模板",
  		name_seo_plural: "免費 FCPX Motion 模板"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "免費背景音樂",
  		name_plural: "免費背景音樂",
  		name_short: "免費免版稅音樂、免費配樂素材",
  		name_short_plural: "免費免版稅音樂、免費配樂素材",
  		name_seo: "免費背景音樂",
  		name_seo_plural: "免費背景音樂"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "免費音效素材",
  		name_plural: "免費音效素材",
  		name_short: "免費背景音效、免費罐頭音效",
  		name_short_plural: "免費背景音效、免費罐頭音效",
  		name_seo: "免費音效素材",
  		name_seo_plural: "免費音效素材"
  	}
  ];

  var thJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "ภาพสต็อก ・ GIF แบบเคลื่อนไหว",
  		name_plural: "ภาพสต็อก ・ GIF แบบเคลื่อนไหว",
  		name_seo: "ภาพสต็อก ・ GIF แบบเคลื่อนไหว",
  		name_seo_plural: "ภาพสต็อก ・ GIF แบบเคลื่อนไหว",
  		name_short: "ภาพไม่มีลิขสิทธิ์",
  		name_short_plural: "ภาพไม่มีลิขสิทธิ์",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "Stock Video",
  		name_plural: "Stock Video",
  		name_seo: "Stock Video",
  		name_seo_plural: "Stock Video",
  		name_short: "วิดีโอ",
  		name_short_plural: "วิดีโอ",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Template FCP/Motion",
  		name_plural: "Template FCP/Motion",
  		name_seo: "Template FCP/Motion",
  		name_seo_plural: "Template FCP/Motion",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "Model 3D",
  		name_plural: "Model 3D",
  		name_seo: "Model 3D",
  		name_seo_plural: "Model 3D",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "ภาพสต็อก",
  		name_plural: "ภาพสต็อก",
  		name_seo: "ภาพสต็อก",
  		name_seo_plural: "ภาพสต็อก",
  		name_short: "ภาพถ่าย",
  		name_short_plural: "ภาพถ่าย",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "เวกเตอร์สต็อก",
  		name_plural: "เวกเตอร์สต็อก",
  		name_seo: "เวกเตอร์สต็อก",
  		name_seo_plural: "เวกเตอร์สต็อก",
  		name_short: "เวกเตอร์",
  		name_short_plural: "เวกเตอร์",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "ภาพเคลื่อนไหว",
  		name_plural: "ภาพเคลื่อนไหว",
  		name_seo: "ภาพเคลื่อนไหว",
  		name_seo_plural: "ภาพเคลื่อนไหว",
  		name_short: "ภาพเคลื่อนไหว",
  		name_short_plural: "ภาพเคลื่อนไหว",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "การเคลื่อนไหวแบบสด",
  		name_plural: "การเคลื่อนไหวแบบสด",
  		name_seo: "การเคลื่อนไหวแบบสด",
  		name_seo_plural: "การเคลื่อนไหวแบบสด",
  		name_short: "การเคลื่อนไหวแบบสด",
  		name_short_plural: "การเคลื่อนไหวแบบสด",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "Model 3D",
  		name_plural: "Model 3D",
  		name_seo: "Model 3D",
  		name_seo_plural: "Model 3D",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "เพลงไม่มีลิขสิทธิ์",
  		name_plural: "เพลงไม่มีลิขสิทธิ์",
  		name_seo: "เพลงไม่มีลิขสิทธิ์",
  		name_seo_plural: "เพลงไม่มีลิขสิทธิ์",
  		name_short: "เพลง",
  		name_short_plural: "เพลง",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "เสียงเอฟเฟค",
  		name_plural: "เสียงเอฟเฟค",
  		name_seo: "เสียงเอฟเฟค",
  		name_seo_plural: "เสียงเอฟเฟค",
  		name_short: "เสียงเอฟเฟค",
  		name_short_plural: "เสียงเอฟเฟค",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "Template After Effect",
  		name_plural: "Template After Effect",
  		name_seo: "Template After Effect",
  		name_seo_plural: "Template After Effect",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Template FCP/Motion",
  		name_plural: "Template FCP/Motion",
  		name_seo: "Template FCP/Motion",
  		name_seo_plural: "Template FCP/Motion",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "ภาพ 360°",
  		name_plural: "ภาพ 360°",
  		name_seo: "ภาพ 360°",
  		name_seo_plural: "ภาพ 360°",
  		name_short: "ภาพ 360°",
  		name_short_plural: "ภาพ 360°",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "วิดีโอ 360°",
  		name_plural: "วิดีโอ 360°",
  		name_seo: "วิดีโอ 360°",
  		name_seo_plural: "วิดีโอ 360°",
  		name_short: "วิดีโอ 360°",
  		name_short_plural: "วิดีโอ 360°",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "เทมเพลต Premiere Pro ",
  		name_plural: "เทมเพลต Premiere Pro ",
  		name_seo: "เทมเพลต Premiere Pro ",
  		name_seo_plural: "เทมเพลต Premiere Pro ",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "เทมเพลตกราฟิกเคลื่อนไหว",
  		name_plural: "เทมเพลตกราฟิกเคลื่อนไหว",
  		name_seo: "เทมเพลตกราฟิกเคลื่อนไหว",
  		name_seo_plural: "เทมเพลตกราฟิกเคลื่อนไหว",
  		name_short: "กราฟิกเคลื่อนไหว",
  		name_short_plural: "กราฟิกเคลื่อนไหว",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "พรีเซ็ตภาพเคลื่อนไหว After Effects",
  		name_plural: "พรีเซ็ตภาพเคลื่อนไหว After Effects",
  		name_seo: "พรีเซ็ตภาพเคลื่อนไหว After Effects",
  		name_seo_plural: "พรีเซ็ตภาพเคลื่อนไหว After Effects",
  		name_short: "พรีเซ็ต AE",
  		name_short_plural: "พรีเซ็ต AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "พรีเซ็ตเอฟเฟค Premiere Pro",
  		name_plural: "พรีเซ็ตเอฟเฟค Premiere Pro",
  		name_seo: "พรีเซ็ตเอฟเฟค Premiere Pro",
  		name_seo_plural: "พรีเซ็ตเอฟเฟค Premiere Pro",
  		name_short: "พรีเซ็ต Premiere",
  		name_short_plural: "พรีเซ็ต Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "ภาพเคลื่อนไหว Lottie",
  		name_plural: "ภาพเคลื่อนไหว Lottie",
  		name_seo: "ภาพเคลื่อนไหว Lottie",
  		name_seo_plural: "ภาพเคลื่อนไหว Lottie",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "GIF Free",
  		name_plural: "GIF Free",
  		name_short: "GIF เคลื่อนไหวฟรี",
  		name_short_plural: "GIF เคลื่อนไหวฟรี",
  		name_seo: "GIF Free",
  		name_seo_plural: "GIF Free"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Free Stock Video",
  		name_plural: "Free Stock Video",
  		name_short: "Free Video Background",
  		name_short_plural: "Free Video Background",
  		name_seo: "Free Stock Video",
  		name_seo_plural: "Free Stock Video"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Free After Effects Template",
  		name_plural: "Free After Effects Template",
  		name_short: "แจก Template After Effect ฟรี",
  		name_short_plural: "แจก Template After Effect ฟรี",
  		name_seo: "Free After Effects Template",
  		name_seo_plural: "Free After Effects Template"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Template Premiere Pro ฟรี",
  		name_plural: "Template Premiere Pro ฟรี",
  		name_short: "Template Premiere Pro ฟรี",
  		name_short_plural: "Template Premiere Pro ฟรี",
  		name_seo: "Template Premiere Pro ฟรี",
  		name_seo_plural: "Template Premiere Pro ฟรี"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Template FCPX/Motion ฟรี",
  		name_plural: "Template FCPX/Motion ฟรี",
  		name_short: "Template FCPX/Motion ฟรี",
  		name_short_plural: "Template FCPX/Motion ฟรี",
  		name_seo: "Template FCPX/Motion ฟรี",
  		name_seo_plural: "Template FCPX/Motion ฟรี"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "เพลงไม่มีลิขสิทธิ์ฟรี",
  		name_plural: "เพลงไม่มีลิขสิทธิ์ฟรี",
  		name_short: "เพลง Background",
  		name_short_plural: "เพลง Background",
  		name_seo: "เพลงไม่มีลิขสิทธิ์ฟรี",
  		name_seo_plural: "เพลงไม่มีลิขสิทธิ์ฟรี"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "sound effect ฟรี",
  		name_plural: "sound effect ฟรี",
  		name_short: "เสียงเอฟเฟคฟรี",
  		name_short_plural: "เสียงเอฟเฟคฟรี",
  		name_seo: "sound effect ฟรี",
  		name_seo_plural: "sound effect ฟรี"
  	}
  ];

  var deJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "Lizenzfreie Bilder ・ Animiertes GIF",
  		name_plural: "Lizenzfreie Bilder ・ Animiertes GIF",
  		name_seo: "Lizenzfreie Bilder ・ Animiertes GIF",
  		name_seo_plural: "Lizenzfreie Bilder ・ Animiertes GIF",
  		name_short: "Bild",
  		name_short_plural: "Bild",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "Lizenzfreie Videos",
  		name_plural: "Lizenzfreie Videos",
  		name_seo: "Lizenzfreie Videos",
  		name_seo_plural: "Lizenzfreie Videos",
  		name_short: "Video",
  		name_short_plural: "Video",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Apple Motion ・ Final Cut Pro Templates",
  		name_plural: "Apple Motion ・ Final Cut Pro Templates",
  		name_seo: "Apple Motion ・ Final Cut Pro Templates",
  		name_seo_plural: "Apple Motion ・ Final Cut Pro Templates",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "3D Modelle",
  		name_plural: "3D Modelle",
  		name_seo: "3D Modelle",
  		name_seo_plural: "3D Modelle",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "Stock Fotos",
  		name_plural: "Stock Fotos",
  		name_seo: "Stock Fotos",
  		name_seo_plural: "Stock Fotos",
  		name_short: "Foto",
  		name_short_plural: "Foto",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "Vektorgrafik",
  		name_plural: "Vektorgrafik",
  		name_seo: "Vektorgrafik",
  		name_seo_plural: "Vektorgrafik",
  		name_short: "Vektorgrafik",
  		name_short_plural: "Vektorgrafik",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "Video Hintergrund",
  		name_plural: "Video Hintergrund",
  		name_seo: "Video Hintergrund",
  		name_seo_plural: "Video Hintergrund",
  		name_short: "Animation",
  		name_short_plural: "Animation",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Live-Action",
  		name_plural: "Live-Action",
  		name_seo: "Live-Action",
  		name_seo_plural: "Live-Action",
  		name_short: "Live-Action",
  		name_short_plural: "Live-Action",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "3D Modelle",
  		name_plural: "3D Modelle",
  		name_seo: "3D Modelle",
  		name_seo_plural: "3D Modelle",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "Hintergrundmusik",
  		name_plural: "Hintergrundmusik",
  		name_seo: "Hintergrundmusik",
  		name_seo_plural: "Hintergrundmusik",
  		name_short: "Musik",
  		name_short_plural: "Musik",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "Soundeffekte",
  		name_plural: "Soundeffekte",
  		name_seo: "Soundeffekte",
  		name_seo_plural: "Soundeffekte",
  		name_short: "SFX",
  		name_short_plural: "SFX",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "After Effects Templates",
  		name_plural: "After Effects Templates",
  		name_seo: "After Effects Templates",
  		name_seo_plural: "After Effects Templates",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Final Cut Pro / Motion Templates",
  		name_plural: "Final Cut Pro / Motion Templates",
  		name_seo: "Final Cut Pro / Motion Templates",
  		name_seo_plural: "Final Cut Pro / Motion Templates",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "360-Grad-Foto",
  		name_plural: "360-Grad-Foto",
  		name_seo: "360-Grad-Foto",
  		name_seo_plural: "360-Grad-Foto",
  		name_short: "360-Grad-Foto",
  		name_short_plural: "360-Grad-Foto",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "360-Grad-Video",
  		name_plural: "360-Grad-Video",
  		name_seo: "360-Grad-Video",
  		name_seo_plural: "360-Grad-Video",
  		name_short: "360-Grad-Video",
  		name_short_plural: "360-Grad-Video",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Premiere Pro Template",
  		name_plural: "Premiere Pro Template",
  		name_seo: "Premiere Pro Template",
  		name_seo_plural: "Premiere Pro Template",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "Animationsvorlage",
  		name_plural: "Animationsvorlage",
  		name_seo: "Animationsvorlage",
  		name_seo_plural: "Animationsvorlage",
  		name_short: "Motion-Design",
  		name_short_plural: "Motion-Design",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "After Effects Animation Voreinstellung",
  		name_plural: "After Effects Animation Voreinstellung",
  		name_seo: "After Effects Animation Voreinstellung",
  		name_seo_plural: "After Effects Animation Voreinstellung",
  		name_short: "AE Voreinstellung",
  		name_short_plural: "AE Voreinstellung",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Premiere Pro Effekt Voreinstellung",
  		name_plural: "Premiere Pro Effekt Voreinstellung",
  		name_seo: "Premiere Pro Effekt Voreinstellung",
  		name_seo_plural: "Premiere Pro Effekt Voreinstellung",
  		name_short: "Premium Voreinstellung",
  		name_short_plural: "Premium Voreinstellung",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Lottie Animation",
  		name_plural: "Lottie Animation",
  		name_seo: "Lottie Animation",
  		name_seo_plural: "Lottie Animation",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "GIFs kostenlos",
  		name_plural: "GIFs kostenlos",
  		name_short: "animierte GIFs kostenlos",
  		name_short_plural: "animierte GIFs kostenlos",
  		name_seo: "GIFs kostenlos",
  		name_seo_plural: "GIFs kostenlos"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Free Stock Video",
  		name_plural: "Free Stock Video",
  		name_short: "Kostenlose Videos",
  		name_short_plural: "Kostenlose Videos",
  		name_seo: "Free Stock Video",
  		name_seo_plural: "Free Stock Video"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Free After Effects Templates",
  		name_plural: "Free After Effects Templates",
  		name_short: "After Effects Vorlagen kostenlos",
  		name_short_plural: "After Effects Vorlagen kostenlos",
  		name_seo: "Free After Effects Templates",
  		name_seo_plural: "Free After Effects Templates"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Free Premiere Pro Templates",
  		name_plural: "Free Premiere Pro Templates",
  		name_short: "Free Motion Graphics Template",
  		name_short_plural: "Free Motion Graphics Template",
  		name_seo: "Free Premiere Pro Templates",
  		name_seo_plural: "Free Premiere Pro Templates"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Free FCPX/Motion Templates",
  		name_plural: "Free FCPX/Motion Templates",
  		name_short: "Free Final Cut Templates",
  		name_short_plural: "Free Final Cut Templates",
  		name_seo: "Free FCPX/Motion Templates",
  		name_seo_plural: "Free FCPX/Motion Templates"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "GEMAfreie Musik kostenlos",
  		name_plural: "GEMAfreie Musik kostenlos",
  		name_short: "kostenlose Hintergrundmusik",
  		name_short_plural: "kostenlose Hintergrundmusik",
  		name_seo: "GEMAfreie Musik kostenlos",
  		name_seo_plural: "GEMAfreie Musik kostenlos"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "Soundeffekte kostenlos",
  		name_plural: "Soundeffekte kostenlos",
  		name_short: "Geräusche kostenlos",
  		name_short_plural: "Geräusche kostenlos",
  		name_seo: "Soundeffekte kostenlos",
  		name_seo_plural: "Soundeffekte kostenlos"
  	}
  ];

  var esJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "Banco de imágenes ・ GIF animado",
  		name_plural: "Banco de imágenes ・ GIF animado",
  		name_seo: "Banco de imágenes ・ GIF animado",
  		name_seo_plural: "Banco de imágenes ・ GIF animado",
  		name_short: "Imagen",
  		name_short_plural: "Imagen",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "Banco de Videos",
  		name_plural: "Banco de Videos",
  		name_seo: "Banco de Videos",
  		name_seo_plural: "Banco de Videos",
  		name_short: "Video",
  		name_short_plural: "Video",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Plantillas de Apple Motion ・ Final Cut Pro X",
  		name_plural: "Plantillas de Apple Motion ・ Final Cut Pro X",
  		name_seo: "Plantillas de Apple Motion ・ Final Cut Pro X",
  		name_seo_plural: "Plantillas de Apple Motion ・ Final Cut Pro X",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_plural: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_seo: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_seo_plural: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "Banco de imágenes",
  		name_plural: "Banco de imágenes",
  		name_seo: "Banco de imágenes",
  		name_seo_plural: "Banco de imágenes",
  		name_short: "Fotografía",
  		name_short_plural: "Fotografía",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "Banco de vectores",
  		name_plural: "Banco de vectores",
  		name_seo: "Banco de vectores",
  		name_seo_plural: "Banco de vectores",
  		name_short: "Vector",
  		name_short_plural: "Vector",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "Banco de Videos Animados",
  		name_plural: "Banco de Videos Animados",
  		name_seo: "Banco de Videos Animados",
  		name_seo_plural: "Banco de Videos Animados",
  		name_short: "Videos animados",
  		name_short_plural: "Videos animados",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Acción en vivo",
  		name_plural: "Acción en vivo",
  		name_seo: "Acción en vivo",
  		name_seo_plural: "Acción en vivo",
  		name_short: "Acción en vivo",
  		name_short_plural: "Acción en vivo",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_plural: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_seo: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_seo_plural: "Modelo 3D Para Realidad Virtual y Aumentada (RV/RA)",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "Música de Fondo Para Videos",
  		name_plural: "Música de Fondo Para Videos",
  		name_seo: "Música de Fondo Para Videos",
  		name_seo_plural: "Música de Fondo Para Videos",
  		name_short: "Música",
  		name_short_plural: "Música",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "Efectos de Sonido Para Videos",
  		name_plural: "Efectos de Sonido Para Videos",
  		name_seo: "Efectos de Sonido Para Videos",
  		name_seo_plural: "Efectos de Sonido Para Videos",
  		name_short: "Efectos especiales",
  		name_short_plural: "Efectos especiales",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "Plantillas de After Effects",
  		name_plural: "Plantillas de After Effects",
  		name_seo: "Plantillas de After Effects",
  		name_seo_plural: "Plantillas de After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Plantillas de Apple Motion / Final Cut Pro X",
  		name_plural: "Plantillas de Apple Motion / Final Cut Pro X",
  		name_seo: "Plantillas de Apple Motion / Final Cut Pro X",
  		name_seo_plural: "Plantillas de Apple Motion / Final Cut Pro X",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "Fotografía en 360°",
  		name_plural: "Fotografía en 360°",
  		name_seo: "Fotografía en 360°",
  		name_seo_plural: "Fotografía en 360°",
  		name_short: "Fotografía en 360°",
  		name_short_plural: "Fotografía en 360°",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "Video en 360°",
  		name_plural: "Video en 360°",
  		name_seo: "Video en 360°",
  		name_seo_plural: "Video en 360°",
  		name_short: "Video en 360°",
  		name_short_plural: "Video en 360°",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Plantillas de Premiere Pro",
  		name_plural: "Plantillas de Premiere Pro",
  		name_seo: "Plantillas de Premiere Pro",
  		name_seo_plural: "Plantillas de Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "Plantillas de Motion Graphics",
  		name_plural: "Plantillas de Motion Graphics",
  		name_seo: "Plantillas de Motion Graphics",
  		name_seo_plural: "Plantillas de Motion Graphics",
  		name_short: "Motion Graphics",
  		name_short_plural: "Motion Graphics",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "Ajuste preestablecido de animación de After Effects",
  		name_plural: "Ajuste preestablecido de animación de After Effects",
  		name_seo: "Ajuste preestablecido de animación de After Effects",
  		name_seo_plural: "Ajuste preestablecido de animación de After Effects",
  		name_short: "Ajuste preestablecido de AE",
  		name_short_plural: "Ajuste preestablecido de AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Ajuste preestablecido de Premiere Pro Effect",
  		name_plural: "Ajuste preestablecido de Premiere Pro Effect",
  		name_seo: "Ajuste preestablecido de Premiere Pro Effect",
  		name_seo_plural: "Ajuste preestablecido de Premiere Pro Effect",
  		name_short: "Ajuste preestablecido de Premiere",
  		name_short_plural: "Ajuste preestablecido de Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Animación de Lottie",
  		name_plural: "Animación de Lottie",
  		name_seo: "Animación de Lottie",
  		name_seo_plural: "Animación de Lottie",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "Gifs Gratis",
  		name_plural: "Gifs Gratis",
  		name_short: "GIFs Para Uso Comercial Gratis",
  		name_short_plural: "GIFs Para Uso Comercial Gratis",
  		name_seo: "Gifs Gratis",
  		name_seo_plural: "Gifs Gratis"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Videos Libres de Derechos Gratis",
  		name_plural: "Videos Libres de Derechos Gratis",
  		name_short: "Banco de Videos Gratis",
  		name_short_plural: "Banco de Videos Gratis",
  		name_seo: "Videos Libres de Derechos Gratis",
  		name_seo_plural: "Videos Libres de Derechos Gratis"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Plantillas de After Effects Gratis",
  		name_plural: "Plantillas de After Effects Gratis",
  		name_short: "Proyectos de After Effects Gratis",
  		name_short_plural: "Proyectos de After Effects Gratis",
  		name_seo: "Plantillas de After Effects Gratis",
  		name_seo_plural: "Plantillas de After Effects Gratis"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Plantillas de Premiere Pro Gratis",
  		name_plural: "Plantillas de Premiere Pro Gratis",
  		name_short: "Proyectos de Premiere Pro Gratis",
  		name_short_plural: "Proyectos de Premiere Pro Gratis",
  		name_seo: "Plantillas de Premiere Pro Gratis",
  		name_seo_plural: "Plantillas de Premiere Pro Gratis"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Plantillas Gratis de Apple Motion / Final Cut Pro X Gratis",
  		name_plural: "Plantillas Gratis de Apple Motion / Final Cut Pro X Gratis",
  		name_short: "Proyectos Gratis de Apple Motion / Final Cut Pro X",
  		name_short_plural: "Proyectos Gratis de Apple Motion / Final Cut Pro X",
  		name_seo: "Plantillas Gratis de Apple Motion / Final Cut Pro X Gratis",
  		name_seo_plural: "Plantillas Gratis de Apple Motion / Final Cut Pro X Gratis"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "Música Gratis para Videos de YouTube",
  		name_plural: "Música Gratis para Videos de YouTube",
  		name_short: "Música Sin Copyright",
  		name_short_plural: "Música Sin Copyright",
  		name_seo: "Música Gratis para Videos de YouTube",
  		name_seo_plural: "Música Gratis para Videos de YouTube"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "Efectos de Sonido Gratis",
  		name_plural: "Efectos de Sonido Gratis",
  		name_short: "Banco de Efectos de Sonido Gratis",
  		name_short_plural: "Banco de Efectos de Sonido Gratis",
  		name_seo: "Efectos de Sonido Gratis",
  		name_seo_plural: "Efectos de Sonido Gratis"
  	}
  ];

  var frJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "Image de Stock ・ GIF Animé",
  		name_plural: "Image de Stock ・ GIF Animé",
  		name_seo: "Image de Stock ・ GIF Animé",
  		name_seo_plural: "Image de Stock ・ GIF Animé",
  		name_short: "Image",
  		name_short_plural: "Image",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "Vidéo Libre de Droits",
  		name_plural: "Vidéo Libre de Droits",
  		name_seo: "Vidéo Libre de Droits",
  		name_seo_plural: "Vidéo Libre de Droits",
  		name_short: "Vidéo",
  		name_short_plural: "Vidéo",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "Modèles Apple Motion ・ Final Cut Pro",
  		name_plural: "Modèles Apple Motion ・ Final Cut Pro",
  		name_seo: "Modèles Apple Motion ・ Final Cut Pro",
  		name_seo_plural: "Modèles Apple Motion ・ Final Cut Pro",
  		name_short: "FCPX ・ Motion",
  		name_short_plural: "FCPX ・ Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "Modèles 3D Pour RV/RA",
  		name_plural: "Modèles 3D Pour RV/RA",
  		name_seo: "Modèles 3D Pour RV/RA",
  		name_seo_plural: "Modèles 3D Pour RV/RA",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "Photo de Stock",
  		name_plural: "Photo de Stock",
  		name_seo: "Photo de Stock",
  		name_seo_plural: "Photo de Stock",
  		name_short: "Photo",
  		name_short_plural: "Photo",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "Image Vectorielle de Stock",
  		name_plural: "Image Vectorielle de Stock",
  		name_seo: "Image Vectorielle de Stock",
  		name_seo_plural: "Image Vectorielle de Stock",
  		name_short: "Image Vectorielle",
  		name_short_plural: "Image Vectorielle",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "Vidéos Animées Libres de Droits",
  		name_plural: "Vidéos Animées Libres de Droits",
  		name_seo: "Vidéos Animées Libres de Droits",
  		name_seo_plural: "Vidéos Animées Libres de Droits",
  		name_short: "Animation",
  		name_short_plural: "Animation",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Film Live",
  		name_plural: "Film Live",
  		name_seo: "Film Live",
  		name_seo_plural: "Film Live",
  		name_short: "Film Live",
  		name_short_plural: "Film Live",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "Modèles 3D Pour RV/RA",
  		name_plural: "Modèles 3D Pour RV/RA",
  		name_seo: "Modèles 3D Pour RV/RA",
  		name_seo_plural: "Modèles 3D Pour RV/RA",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "Musique Libre de Droits",
  		name_plural: "Musique Libre de Droits",
  		name_seo: "Musique Libre de Droits",
  		name_seo_plural: "Musique Libre de Droits",
  		name_short: "Musique",
  		name_short_plural: "Musique",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "Effets Sonores Pour Vidéos",
  		name_plural: "Effets Sonores Pour Vidéos",
  		name_seo: "Effets Sonores Pour Vidéos",
  		name_seo_plural: "Effets Sonores Pour Vidéos",
  		name_short: "SFX",
  		name_short_plural: "SFX",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "Modèles After Effects",
  		name_plural: "Modèles After Effects",
  		name_seo: "Modèles After Effects",
  		name_seo_plural: "Modèles After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "Modèles Apple Motion / Final Cut Pro X",
  		name_plural: "Modèles Apple Motion / Final Cut Pro X",
  		name_seo: "Modèles Apple Motion / Final Cut Pro X",
  		name_seo_plural: "Modèles Apple Motion / Final Cut Pro X",
  		name_short: "Apple Motion",
  		name_short_plural: "Apple Motion",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "Photo 360°",
  		name_plural: "Photo 360°",
  		name_seo: "Photo 360°",
  		name_seo_plural: "Photo 360°",
  		name_short: "Photo 360°",
  		name_short_plural: "Photo 360°",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "Vidéo 360°",
  		name_plural: "Vidéo 360°",
  		name_seo: "Vidéo 360°",
  		name_seo_plural: "Vidéo 360°",
  		name_short: "Vidéo 360°",
  		name_short_plural: "Vidéo 360°",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Modèle Premiere Pro",
  		name_plural: "Modèle Premiere Pro",
  		name_seo: "Modèle Premiere Pro",
  		name_seo_plural: "Modèle Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "ModèleMotion Graphics",
  		name_plural: "ModèleMotion Graphics",
  		name_seo: "ModèleMotion Graphics",
  		name_seo_plural: "ModèleMotion Graphics",
  		name_short: "Motion Graphics",
  		name_short_plural: "Motion Graphics",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "Préréglage Animation After Effects",
  		name_plural: "Préréglage Animation After Effects",
  		name_seo: "Préréglage Animation After Effects",
  		name_seo_plural: "Préréglage Animation After Effects",
  		name_short: "Préréglage AE",
  		name_short_plural: "Préréglage AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Préréglage Effet Premiere Pro",
  		name_plural: "Préréglage Effet Premiere Pro",
  		name_seo: "Préréglage Effet Premiere Pro",
  		name_seo_plural: "Préréglage Effet Premiere Pro",
  		name_short: "Préréglage Premiere",
  		name_short_plural: "Préréglage Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Animation Lottie",
  		name_plural: "Animation Lottie",
  		name_seo: "Animation Lottie",
  		name_seo_plural: "Animation Lottie",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "Gif Gratuit",
  		name_plural: "Gif Gratuit",
  		name_short: "GIF à Usage Commercial Gratuit",
  		name_short_plural: "GIF à Usage Commercial Gratuit",
  		name_seo: "Gif Gratuit",
  		name_seo_plural: "Gif Gratuit"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Banque de Vidéos Gratuites",
  		name_plural: "Banque de Vidéos Gratuites",
  		name_short: "Fond Vidéo Gratuit",
  		name_short_plural: "Fond Vidéo Gratuit",
  		name_seo: "Banque de Vidéos Gratuites",
  		name_seo_plural: "Banque de Vidéos Gratuites"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Modèles After Effects Gratuits",
  		name_plural: "Modèles After Effects Gratuits",
  		name_short: "Projets After Effects Gratuits",
  		name_short_plural: "Projets After Effects Gratuits",
  		name_seo: "Modèles After Effects Gratuits",
  		name_seo_plural: "Modèles After Effects Gratuits"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Modèles Premiere Pro Gratuits",
  		name_plural: "Modèles Premiere Pro Gratuits",
  		name_short: "Projets Premiere Pro Gratuits",
  		name_short_plural: "Projets Premiere Pro Gratuits",
  		name_seo: "Modèles Premiere Pro Gratuits",
  		name_seo_plural: "Modèles Premiere Pro Gratuits"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Modèles Apple Motion / Final Cut Pro X Gratuits",
  		name_plural: "Modèles Apple Motion / Final Cut Pro X Gratuits",
  		name_short: "Projets Apple Motion / Final Cut Pro X Gratuits",
  		name_short_plural: "Projets Apple Motion / Final Cut Pro X Gratuits",
  		name_seo: "Modèles Apple Motion / Final Cut Pro X Gratuits",
  		name_seo_plural: "Modèles Apple Motion / Final Cut Pro X Gratuits"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "Musique Libre de Droits Gratuite",
  		name_plural: "Musique Libre de Droits Gratuite",
  		name_short: "Musique Sans Copyright",
  		name_short_plural: "Musique Sans Copyright",
  		name_seo: "Musique Libre de Droits Gratuite",
  		name_seo_plural: "Musique Libre de Droits Gratuite"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "Effets Sonores Gratuits",
  		name_plural: "Effets Sonores Gratuits",
  		name_short: "Banque d'Effets Sonores Gratuits",
  		name_short_plural: "Banque d'Effets Sonores Gratuits",
  		name_seo: "Effets Sonores Gratuits",
  		name_seo_plural: "Effets Sonores Gratuits"
  	}
  ];

  var ptJson = [
  	{
  		object: "media_type",
  		id: "image",
  		code: "image",
  		name: "Imagem em stock ・ GIF animado",
  		name_plural: "Imagem em stock ・ GIF animado",
  		name_seo: "Imagem em stock ・ GIF animado",
  		name_seo_plural: "Imagem em stock ・ GIF animado",
  		name_short: "Imagem",
  		name_short_plural: "Imagem",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  			"photo",
  			"vector",
  			"gif"
  		]
  	},
  	{
  		object: "media_type",
  		id: "video",
  		code: "video",
  		name: "[seo video - 1]",
  		name_plural: "[seo video - 1]",
  		name_seo: "[seo video - 1]",
  		name_seo_plural: "[seo video - 1]",
  		name_short: "Vídeo",
  		name_short_plural: "Vídeo",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  			"animation",
  			"video_live",
  			"video_vr"
  		]
  	},
  	{
  		object: "media_type",
  		id: "ae",
  		code: "ae",
  		name: "After Effects",
  		name_plural: "After Effects",
  		name_seo: "After Effects",
  		name_seo_plural: "After Effects",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  			"ae_template",
  			"ae_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "pr",
  		code: "pr",
  		name: "Premiere Pro",
  		name_plural: "Premiere Pro",
  		name_seo: "Premiere Pro",
  		name_seo_plural: "Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  			"pr_template",
  			"mg_template",
  			"pr_preset"
  		]
  	},
  	{
  		object: "media_type",
  		id: "fcp",
  		code: "fcp",
  		name: "[seo fcp - 1]",
  		name_plural: "[seo fcp - 1]",
  		name_seo: "[seo fcp - 1]",
  		name_seo_plural: "[seo fcp - 1]",
  		name_short: "FCPX ・ Movimento",
  		name_short_plural: "FCPX ・ Movimento",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  			"motion_template"
  		]
  	},
  	{
  		object: "media_type",
  		id: "resolve",
  		code: "resolve",
  		name: "DaVinci Resolve",
  		name_plural: "DaVinci Resolve",
  		name_seo: "DaVinci Resolve",
  		name_seo_plural: "DaVinci Resolve",
  		name_short: "DaVinci Resolve",
  		name_short_plural: "DaVinci Resolve",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  			"resolve_template",
  			"resolve_macro"
  		]
  	},
  	{
  		object: "media_type",
  		id: "3d",
  		code: "3d",
  		name: "[seo 3d - 1]",
  		name_plural: "[seo 3d - 1]",
  		name_seo: "[seo 3d - 1]",
  		name_seo_plural: "[seo 3d - 1]",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  			"3d_model"
  		]
  	},
  	{
  		object: "media_type",
  		id: "1",
  		code: "photo",
  		name: "Foto em stock",
  		name_plural: "Foto em stock",
  		name_seo: "Foto em stock",
  		name_seo_plural: "Foto em stock",
  		name_short: "Foto",
  		name_short_plural: "Foto",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "2",
  		code: "vector",
  		name: "Vetor em stock",
  		name_plural: "Vetor em stock",
  		name_seo: "Vetor em stock",
  		name_seo_plural: "Vetor em stock",
  		name_short: "Vetor",
  		name_short_plural: "Vetor",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "3",
  		code: "animation",
  		name: "[seo animation - 1]",
  		name_plural: "[seo animation - 1]",
  		name_seo: "[seo animation - 1]",
  		name_seo_plural: "[seo animation - 1]",
  		name_short: "Animação",
  		name_short_plural: "Animação",
  		video: true,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "4",
  		code: "video_live",
  		name: "Ação ao vivo",
  		name_plural: "Ação ao vivo",
  		name_seo: "Ação ao vivo",
  		name_seo_plural: "Ação ao vivo",
  		name_short: "Ação ao vivo",
  		name_short_plural: "Ação ao vivo",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "5",
  		code: "3d_model",
  		name: "[seo 3d - 1]",
  		name_plural: "[seo 3d - 1]",
  		name_seo: "[seo 3d - 1]",
  		name_seo_plural: "[seo 3d - 1]",
  		name_short: "3D",
  		name_short_plural: "3D",
  		video: false,
  		audio: false,
  		group: "3d",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "6",
  		code: "music",
  		name: "[seo music - 1]",
  		name_plural: "[seo music - 1]",
  		name_seo: "[seo music - 1]",
  		name_seo_plural: "[seo music - 1]",
  		name_short: "Música",
  		name_short_plural: "Música",
  		video: false,
  		audio: true,
  		group: "music",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "7",
  		code: "sfx",
  		name: "[seo sfx - 1]",
  		name_plural: "[seo sfx - 1]",
  		name_seo: "[seo sfx - 1]",
  		name_seo_plural: "[seo sfx - 1]",
  		name_short: "SFX",
  		name_short_plural: "SFX",
  		video: false,
  		audio: true,
  		group: "sfx",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "8",
  		code: "ae_template",
  		name: "[seo ae - 1]",
  		name_plural: "[seo ae - 1]",
  		name_seo: "[seo ae - 1]",
  		name_seo_plural: "[seo ae - 1]",
  		name_short: "AE",
  		name_short_plural: "AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "9",
  		code: "motion_template",
  		name: "[seo motion - 1]",
  		name_plural: "[seo motion - 1]",
  		name_seo: "[seo motion - 1]",
  		name_seo_plural: "[seo motion - 1]",
  		name_short: "Movimento Apple",
  		name_short_plural: "Movimento Apple",
  		video: false,
  		audio: false,
  		group: "fcp",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "11",
  		code: "photo_vr",
  		name: "Foto 360º",
  		name_plural: "Foto 360º",
  		name_seo: "Foto 360º",
  		name_seo_plural: "Foto 360º",
  		name_short: "Foto 360º",
  		name_short_plural: "Foto 360º",
  		video: false,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "12",
  		code: "video_vr",
  		name: "Vídeo 360º",
  		name_plural: "Vídeo 360º",
  		name_seo: "Vídeo 360º",
  		name_seo_plural: "Vídeo 360º",
  		name_short: "Vídeo 360º",
  		name_short_plural: "Vídeo 360º",
  		video: false,
  		audio: false,
  		group: "video",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "14",
  		code: "gif",
  		name: "GIF",
  		name_plural: "GIF",
  		name_seo: "GIF",
  		name_seo_plural: "GIF",
  		name_short: "GIF",
  		name_short_plural: "GIF",
  		video: true,
  		audio: false,
  		group: "image",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "15",
  		code: "pr_template",
  		name: "Modelo Premiere Pro",
  		name_plural: "Modelo Premiere Pro",
  		name_seo: "Modelo Premiere Pro",
  		name_seo_plural: "Modelo Premiere Pro",
  		name_short: "Premiere",
  		name_short_plural: "Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "16",
  		code: "mg_template",
  		name: "Modelo Motion Graphics",
  		name_plural: "Modelo Motion Graphics",
  		name_seo: "Modelo Motion Graphics",
  		name_seo_plural: "Modelo Motion Graphics",
  		name_short: "Motion Graphics",
  		name_short_plural: "Motion Graphics",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "19",
  		code: "ae_preset",
  		name: "Predefinido de animação After Effects",
  		name_plural: "Predefinido de animação After Effects",
  		name_seo: "Predefinido de animação After Effects",
  		name_seo_plural: "Predefinido de animação After Effects",
  		name_short: "Predefinido AE",
  		name_short_plural: "Predefinido AE",
  		video: false,
  		audio: false,
  		group: "ae",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "20",
  		code: "pr_preset",
  		name: "Predefinido efeito Premiere Pro",
  		name_plural: "Predefinido efeito Premiere Pro",
  		name_seo: "Predefinido efeito Premiere Pro",
  		name_seo_plural: "Predefinido efeito Premiere Pro",
  		name_short: "Predefinido Premiere",
  		name_short_plural: "Predefinido Premiere",
  		video: false,
  		audio: false,
  		group: "pr",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "21",
  		code: "lottie",
  		name: "Animação Lottie",
  		name_plural: "Animação Lottie",
  		name_seo: "Animação Lottie",
  		name_seo_plural: "Animação Lottie",
  		name_short: "Lottie",
  		name_short_plural: "Lottie",
  		video: true,
  		audio: false,
  		group: "lottie",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "22",
  		code: "resolve_template",
  		name: "DaVinci Resolve Template",
  		name_plural: "DaVinci Resolve Template",
  		name_seo: "DaVinci Resolve Template",
  		name_seo_plural: "DaVinci Resolve Template",
  		name_short: "DaVinci Resolve Template",
  		name_short_plural: "DaVinci Resolve Templates",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		object: "media_type",
  		id: "23",
  		code: "resolve_macro",
  		name: "DaVinci Resolve Macro",
  		name_plural: "DaVinci Resolve Macro",
  		name_seo: "DaVinci Resolve Macro",
  		name_seo_plural: "DaVinci Resolve Macro",
  		name_short: "DaVinci Resolve Macro",
  		name_short_plural: "DaVinci Resolve Macro",
  		video: false,
  		audio: false,
  		group: "resolve",
  		sub_media_types: [
  		]
  	},
  	{
  		id: "gif_free",
  		code: "gif_free",
  		name: "GIFs gratuitos",
  		name_plural: "GIFs gratuitos",
  		name_short: "GIFs gratuitos Para Uso Comercial",
  		name_short_plural: "GIFs gratuitos Para Uso Comercial",
  		name_seo: "GIFs gratuitos",
  		name_seo_plural: "GIFs gratuitos"
  	},
  	{
  		id: "video_free",
  		code: "video_free",
  		name: "Banco de Videos gratuitos",
  		name_plural: "Banco de Videos gratuitos",
  		name_short: "Vídeos de Fondo gratuitos",
  		name_short_plural: "Vídeos de Fondo gratuitos",
  		name_seo: "Banco de Videos gratuitos",
  		name_seo_plural: "Banco de Videos gratuitos"
  	},
  	{
  		id: "ae_free",
  		code: "ae_free",
  		name: "Modelos gratuitos de After Effects",
  		name_plural: "Modelos gratuitos de After Effects",
  		name_short: "Projetos gratuitos de After Effects",
  		name_short_plural: "Projetos gratuitos de After Effects",
  		name_seo: "Modelos gratuitos de After Effects",
  		name_seo_plural: "Modelos gratuitos de After Effects"
  	},
  	{
  		id: "pr_free",
  		code: "pr_free",
  		name: "Modelos gratuitos de Premiere Pro",
  		name_plural: "Modelos gratuitos de Premiere Pro",
  		name_short: "Projetos gratuitos de Premiere Pro",
  		name_short_plural: "Projetos gratuitos de Premiere Pro",
  		name_seo: "Modelos gratuitos de Premiere Pro",
  		name_seo_plural: "Modelos gratuitos de Premiere Pro"
  	},
  	{
  		id: "fcp_free",
  		code: "fcp_free",
  		name: "Modelos gratuitos de Apple Motion / Final Cut Pro X",
  		name_plural: "Modelos gratuitos de Apple Motion / Final Cut Pro X",
  		name_short: "Projetos gratuitos de Apple Motion / Final Cut Pro X",
  		name_short_plural: "Projetos gratuitos de Apple Motion / Final Cut Pro X",
  		name_seo: "Modelos gratuitos de Apple Motion / Final Cut Pro X",
  		name_seo_plural: "Modelos gratuitos de Apple Motion / Final Cut Pro X"
  	},
  	{
  		id: "music_free",
  		code: "music_free",
  		name: "Músicas gratuitos para video",
  		name_plural: "Músicas gratuitos para video",
  		name_short: "Biblioteca de audio YouTube",
  		name_short_plural: "Biblioteca de audio YouTube",
  		name_seo: "Músicas gratuitos para video",
  		name_seo_plural: "Músicas gratuitos para video"
  	},
  	{
  		id: "sfx_free",
  		code: "sfx_free",
  		name: "Efeitos sonoros gratis",
  		name_plural: "Efeitos sonoros gratis",
  		name_short: "Banco de efeitos audio gratuitos",
  		name_short_plural: "Banco de efeitos audio gratuitos",
  		name_seo: "Efeitos sonoros gratis",
  		name_seo_plural: "Efeitos sonoros gratis"
  	}
  ];

  /* eslint-disable */
  var appMediaTypes = {
    'en': enJson,
    'ja': jaJson,
    'ko': koJson,
    'zh-hant': zh_hantJson,
    'th': thJson,
    'de': deJson,
    'es': esJson,
    'fr': frJson,
    'pt': ptJson
  };

  // @ts-nocheck
  /**
   * get mediaType name input mediatype code(ae),
   * @param {String||Number} type ae, pr,
   */

  var getMediaType = function getMediaType(type) {
    defaultLang.get();
    var mediaType = type;

    if (type.match('-')) {
      mediaType = snakeCase_1(type);
    } // handle number mt


    if (!_isNaN(Number(type))) {
      // const types = appMediaTypesList.filter(i => i.value.indexOf(type.toString()) > -1);
      var types = appMediaTypes.en.filter(function (i) {
        return i.id === Number(type);
      });
      mediaType = get_1(types[0], 'code');
    } // ae_template, ae_plugin, ae_preset


    var isTemplate = false;
    var isPlugin = false;
    var isPreset = false; // ae_free

    var isFree = false; // name_short, name_seo
    // name_short_plural, name_seo_plural

    var isShort = false;
    var isSeo = false;
    var isPlural = false;

    function resetIsStatus() {
      isTemplate = false;
      isPlugin = false;
      isPreset = false; // isFree = false;
    }

    function getMtCode(name) {
      var returnCode = name;

      if (isTemplate) {
        returnCode += '_template';
      }

      if (isPreset) {
        returnCode += '_preset';
      }

      if (isPlugin) {
        returnCode += '_plugin';
      }

      if (isFree) {
        returnCode += '_free';
      } // console.log('get mt code: ', name, returnCode);


      return returnCode;
    }

    function getMtName(code) {
      var name = 'name';

      if (isSeo) {
        name += '_seo';
      }

      if (isShort) {
        name += '_short';
      }

      if (isPlural) {
        name += '_plural';
      } // console.log('get mt name: ', code, name);
      // add en mediatypes fallback


      var arr = appMediaTypes[defaultLang.get()].filter(function (x) {
        return x.code === code;
      }) || appMediaTypes.en.filter(function (x) {
        return x.code === code;
      }); // console.log('get mt name: ', get(arr[0], 'name'));

      return get_1(arr[0], name);
    }

    function getMtEnName(code) {
      var name = 'name';

      if (isSeo) {
        name += '_seo';
      }

      if (isShort) {
        name += '_short';
      }

      if (isPlural) {
        name += '_plural';
      } // console.log('get mt name: ', code, name);


      var arr = appMediaTypes.en.filter(function (x) {
        return x.code === code;
      }); // console.log('get mt name: ', get(arr[0], 'name'));

      return get_1(arr[0], name);
    }

    function getMtObj() {
      var ids = appMediaTypes.en.filter(function (i) {
        return i.code === mediaType;
      });
      return ids[0];
    }

    var obj = {
      preset: function preset() {
        resetIsStatus();
        isPreset = true;
        return this;
      },
      plugin: function plugin() {
        resetIsStatus();
        isPlugin = true;
        return this;
      },
      template: function template() {
        resetIsStatus();
        isTemplate = true;
        return this;
      },
      free: function free() {
        // resetIsStatus();
        // name += '_free';
        isFree = true;
        return this;
      },
      // code() {
      //   const arr = appMediaTypes[defaultLang.get()].filter(x => x.code === mediaType);
      //   if (arr.length) {
      //     ans = arr[0].code;
      //   }
      //   return this;
      // },
      short: function short() {
        isShort = true;
        isSeo = false; // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
        // if (arr.length) {
        //   ans = arr[0].name_short;
        // }

        return this;
      },
      seo: function seo() {
        isShort = false;
        isSeo = true; // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
        // if (arr.length && arr[0].name_seo) {
        //   ans = arr[0].name_seo;
        // }

        return this; // return this.name();
      },
      plural: function plural() {
        // name += '_plural';
        isPlural = true; // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
        // if (arr.length) {
        //   ans = arr[0].name;
        // }

        return this;
      },
      name: function name() {
        return this;
      },
      renderHtml: function renderHtml() {
        return getMtName(getMtCode(mediaType));
      },
      renderEnHtml: function renderEnHtml() {
        return getMtEnName(getMtCode(mediaType));
      },
      object: function object() {
        var id = getMtObj();

        if (id) {
          return id;
        }

        console.info("[MediaType Terms]: ".concat(type, " no MediaType id or object")); // return this.renderEnHtml().replace(/<wbr>/g, '');

        return '';
      },
      code: function code() {
        var id = getMtObj();

        if (id) {
          return id.code;
        }

        console.info("[MediaType Terms]: ".concat(type, " no MediaType code or input not Number")); // return this.renderEnHtml().replace(/<wbr>/g, '');

        return '';
      },
      id: function id() {
        var id = getMtObj();

        if (id) {
          return id.id;
        }

        console.info("[MediaType Terms]: ".concat(type, " no MediaType id or input not Number")); // return this.renderEnHtml().replace(/<wbr>/g, '');

        return '';
      },
      text: function text() {
        var ans = this.renderHtml();

        if (ans) {
          return ans.replace(/<wbr>/g, '');
        }

        console.info("[MediaType Terms]: ".concat(type, " no MediaType or i18n strings")); // return this.renderEnHtml().replace(/<wbr>/g, '');

        return '';
      },
      html: function html() {
        var ans = this.renderHtml();

        if (ans) {
          return ans;
        }

        console.info("[MediaType Terms]: ".concat(type, " no MediaType or i18n strings")); // return this.renderEnHtml();

        return '';
      }
    };
    return obj;
  };

  function term (type, payload) {
    if (type === 'mediaType') {
      return getMediaType(payload);
    }
  }

  // @ts-ignore
  /*! https://mths.be/startswith v0.2.0 by @mathias */

  if (!String.prototype.startsWith) {
    (function () {

      var defineProperty = function () {
        // IE 8 only supports `Object.defineProperty` on DOM elements
        try {
          var object = {};
          var $defineProperty = Object.defineProperty;
          var result = $defineProperty(object, object, object) && $defineProperty;
        } catch (error) {}

        return result;
      }();

      var toString = {}.toString;

      var startsWith = function startsWith(search) {
        if (this == null) {
          throw TypeError();
        }

        var string = String(this);

        if (search && toString.call(search) == '[object RegExp]') {
          throw TypeError();
        }

        var stringLength = string.length;
        var searchString = String(search);
        var searchLength = searchString.length;
        var position = arguments.length > 1 ? arguments[1] : undefined; // `ToInteger`

        var pos = position ? Number(position) : 0;

        if (pos != pos) {
          // better `isNaN`
          pos = 0;
        }

        var start = Math.min(Math.max(pos, 0), stringLength); // Avoid the `indexOf` call if no match is possible

        if (searchLength + start > stringLength) {
          return false;
        }

        var index = -1;

        while (++index < searchLength) {
          if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
            return false;
          }
        }

        return true;
      };

      if (defineProperty) {
        defineProperty(String.prototype, 'startsWith', {
          'value': startsWith,
          'configurable': true,
          'writable': true
        });
      } else {
        String.prototype.startsWith = startsWith;
      }
    })();
  }

  module.exports = {
    defaultLang: defaultLang,
    site: site,
    siteUrl: siteUrl,
    term: term
  };

}));
