// @ts-ignore

// import defaultLang from './lang';
import store from '@/store/index.js';

/**
 * @param {String} path
 * @param {String=} lang
 */

let baseUrl = 'https://www.motionelements.com';

if (window.location.hostname.indexOf('localhost') === 0) {
  // check if is in route
  // else
  baseUrl = 'https://stage.motionelements.com';
  // baseUrl = window.location.host;
} else if (window.location.hostname === 'stage.motionelements.com') {
  baseUrl = 'https://stage.motionelements.com';
}

// get from store?
const validLanguageCodes = [
  'en',
  'ja',
  'ko',
  'zh-hant',
  'th',
  'de',
  'es',
  'fr',
  'pt',
];

// store not ready yet
// let currentLanguageCode;

const link = (path, targetLanguage) => {
  const addQueryParams = {};

  // cache it in constant
  // include zendesk, blog locales
  const localesString = `${validLanguageCodes.join('|')}|en-us|zt|zh-tw|zh`;
  const localesRegex = new RegExp(`^/(${localesString})/`);

  function normalizePathname(pathname) {
    return pathname.replace(localesRegex, '/');
  }

  function toBlogLocale(languageCode) {
    switch (languageCode) {
      case 'zh-hant':
        return 'zt';
      case 'ja':
      case 'ko':
        return languageCode;
      default:
        return '';
    }
  }

  function toHelpCenterLocale(languageCode) {
    switch (languageCode) {
      case 'zh-hant':
        return 'zh-tw';
      case 'ja':
      case 'ko':
        return languageCode;
      default:
        return 'en-us';
    }
  }

  function toArtistHelpCenterLocale(languageCode) {
    switch (languageCode) {
      case 'ja':
      case 'ko':
        return languageCode;
      default:
        return 'en-us';
    }
  }

  // function getCurrentLanguageCode() {
  //   // if (currentLanguageCode) {
  //   //   return currentLanguageCode;
  //   // }
  //
  //   // get from store
  //   currentLanguageCode = store.state.user.language;
  //
  //   return currentLanguageCode;
  // }

  function renderUrl(path) {
    // const languageCode = getCurrentLanguageCode();

    const languageCode = targetLanguage || store.state.user.language;

    let urlPath = path;

    let hasDomain = true;


    if (path.indexOf('/') === 0) {
      urlPath = `${baseUrl}${path}`;
      hasDomain = false;
    } else if (path.indexOf('http://localhost:') === 0) {
      // bug with localhost:xxxx port
      path.replace(/(http:\/\/localhost:[0-9]+)/, baseUrl);
    }

    // https://javascript.info/url
    // need polyfill for IE11
    const url = new URL(urlPath);

    // console.log('URL', url);
    if (Object.keys(addQueryParams).length) {
      Object.entries(addQueryParams).forEach(([k, v]) => {
        url.searchParams.set(k, v);
      });
    }

    const hostname = url.hostname;
    const subdomain = hostname.split('.')[0];

    let pathname = '';
    let module = '';
    let pathParts = [];

    // check for special case sites
    switch (true) {
      case ['help.motionelements.com', 'artists.motionelements.com', 'artists.zendesk.com'].includes(hostname):
      case url.pathname.indexOf('/blog') === 0:
        // remove language
        pathParts = url.pathname.replace(/^\/|\/$/g, '').split('/');
        module = pathParts[0] || '';
        pathname = normalizePathname(`/${pathParts.slice(1).join('/')}`);
        break;
      default:
        // remove language
        pathname = normalizePathname(url.pathname);
    }

    let languagePath;

    let locale = languageCode;

    switch (true) {
      case ['help.motionelements.com'].includes(hostname):
        languagePath = `/${toHelpCenterLocale(languageCode)}`;
        return `https://${hostname}/${module}${languagePath}${pathname}${url.search}${url.hash}`;

      case ['artists.motionelements.com', 'artists.zendesk.com'].includes(hostname):
        languagePath = `/${toArtistHelpCenterLocale(languageCode)}`;
        return `https://${hostname}/${module}${languagePath}${pathname}${url.search}${url.hash}`;

      case ['go', 'tuts', 'press'].includes(subdomain):
        locale = toBlogLocale(languageCode);
        languagePath = locale ? `/${locale}` : '';
        return `https://${hostname}${languagePath}${pathname}${url.search}${url.hash}`;

      case module === 'blog':
        locale = toBlogLocale(languageCode);
        languagePath = locale ? `/${locale}` : '';
        return `https://www.motionelements.com/${module}${languagePath}${pathname}${url.search}${url.hash}`;

      // vue / PHP pages
      default:
        switch (module) {
          case 'search':
          case 'favorites':
            languagePath = `/${languageCode}`;
            break;

          default:
            languagePath = languageCode !== 'en' ? `/${languageCode}` : '';
            break;
        }
    }

    if (hasDomain) {
      const scheme = `${url.protocol}//`;
      return scheme + url.host + languagePath + pathname + url.search + url.hash;
    }

    // check if need to set hostname?
    if (window.location.hostname.indexOf('localhost') === 0) {
      // check if is in route
      // else
      return baseUrl + languagePath + pathname + url.search + url.hash;
    }

    return languagePath + pathname + url.search + url.hash;
  }


  return {
    param(key, value) {
      addQueryParams[key] = value;
      return this;
    },
    fullPath() {
      const finalPath = renderUrl(path);

      // if path is full url
      if (finalPath.indexOf('http') === 0) {
        // convert url to path only
        const url = new URL(finalPath);
        return url.pathname + url.search + url.hash;
      }

      // already is path
      return finalPath;

      /*
      return url.pathname + url.search + url.hash;
       */
    },
    url() {
      return renderUrl(path);
    },
    toString() {
      return renderUrl(path);
    },
  };
};

/**
 * site url helper
 *
 * @export
 * @param {String} path
 * @param {String} [languageCode] - lang from store
 * @returns
 */
export default link;
