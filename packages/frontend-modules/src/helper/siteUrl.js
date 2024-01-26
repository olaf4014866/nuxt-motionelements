// @ts-ignore

import defaultLang from './lang';

let prodUrl = 'https://www.motionelements.com';
let searchUrl = 'https://www.motionelements.com';
//zeus
/* if (window.location.hostname === 'stage.motionelements.com') {
  prodUrl = 'https://stage.motionelements.com';
  searchUrl = 'https://stage.motionelements.com';
} */
prodUrl = 'https://stage.motionelements.com';
searchUrl = 'https://stage.motionelements.com';

const convertRoute = (path) => {
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

const convertSearchRoute = (path, type) => {
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
  }
  // if (type === 'plugin') {
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

const getSiteUrl = (path, lang) => {
  defaultLang.set(lang);
  let domain = prodUrl;

  // // if stage + prerender, return renderUrl
  // if (process.env.VUE_APP_NOINDEX === 'true' && process.env.VUE_APP_PRERENDER === 'true') {
  //   domain = renderUrl;
  // }

  let doShortEngLang = true;

  let isSearch = false;
  let isRouter = false;
  let isFree = false;

  let type = 'template';

  let isSort = false;
  let sort = 'popular';

  const obj = {
    shortEngLang(bool = true) {
      doShortEngLang = bool;
      return this;
    },
    search() {
      isSearch = true;
      domain = searchUrl;
      return this;
    },
    // render() {
    //   domain = renderUrl;
    //   return this;
    // },
    www() {
      domain = prodUrl;
      return this;
    },
    router() {
      isRouter = true;
      domain = '';
      return this;
    },
    template() {
      type = 'template';
      return this;
    },
    preset() {
      type = 'preset';
      return this;
    },
    // plugin() {
    //   type = 'plugin';
    //   return this;
    // },
    free() {
      isFree = true;
      return this;
    },
    popular() {
      isSort = true;
      sort = 'popular';
      return this;
    },
    latest() {
      isSort = true;
      sort = 'latest';
      return this;
    },
    url() {
      let p = path;
      if (path.startsWith('/')) {
        p = path.replace('/', '');
      }

      let doAppendLangPrefix = true;

      // not append lang prefix when is en site and shortEngLang(false)
      const isEnglishLang = (defaultLang.get() === 'en') ? true : false;
      if (isEnglishLang && doShortEngLang) {
        doAppendLangPrefix = false;
      }

      let route = convertRoute(p);

      if (isSearch) {
        route = convertSearchRoute(p, type);
        if (isSort) {
          return `${domain}/${defaultLang.get()}/search/${route}?sort=${sort}`;
        }
        return `${domain}/${defaultLang.get()}/search/${route}`;
      }

      if (isFree) {
        route = `/free/${route}`;
      }

      if (isRouter) {
        if (path === 'home') {
          if (defaultLang.get() === 'en') {
            return '/';
          }
          return `/${defaultLang.get()}/`;
        }
        if (process.env.VUE_APP_PRERENDER === 'true') {
          return `${domain}${doAppendLangPrefix ? `/${defaultLang.get()}` : ''}${route ? `/${route}` : '/'}`;
        }
        return `${doAppendLangPrefix ? `/${defaultLang.get()}` : ''}${route ? `/${route}` : '/'}`;
      }

      if (doAppendLangPrefix) {
        return `${domain}/${defaultLang.get()}${route ? `/${route}` : '/'}`;
      }

      return `${domain}${route ? `/${route}` : '/'}`;
    },
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
export default function (path, lang) {
  return getSiteUrl(path, lang);
}
