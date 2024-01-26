/**
 * motionelements/frontend-modules v1.6.0
 * (c) MotionElements 2019
 * - siteUrl: handle internal ME url w/ lang.
 * - site: handle outside ME url w/ lang.
 * - defaultLang: helper for url lang setting.
 * - terms: handle mediatypes name variation.
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
      path: a.pathname,
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
  var searchUrl = 'https://search.motionelements.com';

  var convertRoute = function convertRoute(path) {
    switch (path) {
      case 'home':
      case '/':
        return '';

      case 'video':
      case 'music':
      case 'animation':
      case 'lottie':
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

    var isSearch = false;
    var isRouter = false;
    var isFree = false;
    var type = 'template';
    var isSort = false;
    var sort = 'popular';
    var obj = {
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

        var isLang = true;

        if (defaultLang.get() === 'en') {
          isLang = false;
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
            return "".concat(domain).concat(isLang ? "/".concat(defaultLang.get()) : '').concat(route ? "/".concat(route) : '/');
          }

          return "".concat(isLang ? "/".concat(defaultLang.get()) : '').concat(route ? "/".concat(route) : '/');
        }

        if (isLang) {
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
    siteUrl: siteUrl
  };

}));
