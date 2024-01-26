/* eslint-disable */
import get from 'lodash/get';
import companyJson from './schema/company.json';

// get from repo store
import { languageList } from '@/lang/index.js';
// import store from '@/store/index.js';

import enJson from './schema/en.json';
import zh_hantJson from './schema/zh_hant.json';
import thJson from './schema/th.json';
import jaJson from './schema/ja.json';
import koJson from './schema/ko.json';
import esJson from './schema/es.json';
import deJson from './schema/de.json';
import frJson from './schema/fr.json';
import ptJson from './schema/pt.json';
import huJson from './schema/hu.json';
import itJson from './schema/it.json';
import ruJson from './schema/ru.json';
import trJson from './schema/tr.json';

let defaultLang = 'en';

const company = {
  type: 'application/ld+json',
  json: companyJson,
};

/**
 * get lang from payload or vuex store;
 *
 * @param {String=} lang
 */
function setDefaultLang(lang) {
  if (lang) {
    defaultLang = lang;
  } /* else if (store) {
    defaultLang = store.getters['site/currentLanguage'];
  } else {
    console.log('no default lang, set to en');
  } */
  // console.log('term lang : ', defaultLang);
}

const getHrefLang = (path = 'video', lang) => {
  setDefaultLang(lang);
  const pathName = path.replace('/', '').replace('lang-', '').replace('home', '').replace('free', 'free/');
  let canonicalName = `${lang === 'en' ? '' : lang + '/'}${pathName}`;
  if (pathName.match('dlp')) {
    canonicalName = `${lang === 'en' ? '' : lang + '/'}${path}`;
  }
  const langListFilterEn = languageList.filter(lang => lang !== 'en');
  const langAlternateArray = [];
  langListFilterEn.forEach((lang) => {
    langAlternateArray.push(
      {
        rel: 'alternate',
        hreflang: lang,
        href: `https://www.motionelements.com/${lang}/${pathName}`,
      },
    );
  });
  return [
    { rel: 'canonical', href: `https://www.motionelements.com/${canonicalName}` },
    { rel: 'alternate', hreflang: 'x-default', href: `https://www.motionelements.com/${pathName}` },
    { rel: 'alternate', hreflang: 'en', href: `https://www.motionelements.com/${pathName}` },
    ...langAlternateArray,
    // { rel: 'alternate', hreflang: 'ja', href: `https://www.motionelements.com/ja/${pathName}` },
    // { rel: 'alternate', hreflang: 'ko', href: `https://www.motionelements.com/ko/${pathName}` },
    // { rel: 'alternate', hreflang: 'zh-hant', href: `https://www.motionelements.com/zh-hant/${pathName}` },
    // { rel: 'alternate', hreflang: 'th', href: `https://www.motionelements.com/th/${pathName}` },
    // { rel: 'alternate', hreflang: 'de', href: `https://www.motionelements.com/de/${pathName}` },
    // { rel: 'alternate', hreflang: 'es', href: `https://www.motionelements.com/es/${pathName}` },
    // { rel: 'alternate', hreflang: 'fr', href: `https://www.motionelements.com/fr/${pathName}` },
    // { rel: 'alternate', hreflang: 'pt', href: `https://www.motionelements.com/pt/${pathName}` },
  ];
};

const getCanonicalUrl = (path = 'video', lang) => {
  setDefaultLang(lang);
  const pathName = path.replace('/', '').replace('lang-', '').replace('home', '').replace('free', 'free/');
  let canonicalName = `${lang === 'en' ? '' : lang + '/'}${pathName}`;
  if (pathName.match('dlp')) {
    canonicalName = `${lang === 'en' ? '' : lang + '/'}${path}`;
  }
  return `https://www.motionelements.com/${canonicalName}`;
};

const getOgLang = (lang) => {
  setDefaultLang(lang);
  switch (defaultLang) {
    case 'zh-hant':
      return 'zh_TW';
    case 'ja':
      return 'ja_JP';
    case 'es':
      return 'es_ES';
    case 'th':
      return 'th_TH';
    case 'ko':
      return 'ko_KR';
    case 'de':
      return 'de_DE';
    case 'fr':
      return 'fr_FR';
    case 'pt':
      return 'pt_PT';
    case 'hu':
      return 'hu_HU';
    case 'it':
      return 'it_IT';
    case 'ru':
      return 'ru_RU';
    case 'tr':
      return 'tr_TR';
    default:
      return 'en_US';
  }
};

const getPageSearchSchema = (page = 'video', lang) => {
  setDefaultLang(lang);
  return {
    type: 'application/ld+json',
    json: {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      'name': 'MotionElements',
      'url': 'https://www.motionelements.com/',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `https://www.motionelements.com/${defaultLang}/search/${page}?s={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
  };
};


/**
 * get breadcrumb ld+json
 * @param {String} path ex: /video, /ja/video
 * @param {String} mediatype media type name
 */
// const getBreadcrumbJsonLd = (path = 'video', mediatype = 'video') => {
//   return {
//     type: 'application/ld+json',
//     json: {
//       '@context': 'http://schema.org',
//       '@type': 'BreadcrumbList',
//       'itemListElement':
//       [
//         {
//           '@type': 'ListItem',
//           'position': 1,
//           'item':
//             {
//               '@id': `${process.env.VUE_APP_SITE_URL}${path}`,
//               'name': term('mediaType', mediatype).seo().text() || 'Home',
//             },
//         },
//       ],
//     },
//   };
// };

/**
 *
 * @param {String} page default video
 * @param {String=} lang
 */
const getPageByLang = (page = 'video', lang) => {
  setDefaultLang(lang);
  // console.log(page);
  let pageJson;
  let pageName = page
    .replace('lang-', '')
    .replace('apple-motion-templates', 'motion')
    .replace('after-effects-templates', 'ae')
    .replace('premiere-pro-templates', 'pr')
    .replace('3d-model', '3d')
    .replace('stock-image', 'image')
    .replace('sound-effects', 'sfx')
    .replace('davinci-resolve-templates', 'resolve');

  switch (defaultLang) {
    case 'en':
      pageJson = enJson;
      break;
    case 'zh-hant':
      pageJson = zh_hantJson;
      break;
    case 'ja':
      pageJson = jaJson;
      break;
    case 'th':
      pageJson = thJson;
      break;
    case 'ko':
      pageJson = koJson;
      break;
    case 'es':
      pageJson = esJson;
      break;
    case 'de':
      pageJson = deJson;
      break;
    case 'fr':
      pageJson = frJson;
      break;
    case 'pt':
      pageJson = ptJson;
      break;
    case 'hu':
      pageJson = huJson;
      break;
    case 'it':
      pageJson = itJson;
      break;
    case 'ru':
      pageJson = ruJson;
      break;
    case 'tr':
      pageJson = trJson;
      break;
    default:
      pageJson = enJson;
      break;
  }
  // @ts-ignore
  try {
    return get(pageJson, pageName);
  } catch (error) {
    console.log(error);
  }
};

export default {
  'company': company,
  'getPageByLang': getPageByLang,
  'getOgLang': getOgLang,
  'getPageSearchSchema': getPageSearchSchema,
  'getHrefLang': getHrefLang,
  'getCanonicalUrl': getCanonicalUrl,
  // 'getBreadcrumbJsonLd': getBreadcrumbJsonLd,
};
