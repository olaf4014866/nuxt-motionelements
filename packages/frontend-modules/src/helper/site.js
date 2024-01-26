// urlParser
// get absolute url
// get relative url

import defaultLang from './lang';

function mePageLang() {
  switch (defaultLang.get()) {
    case 'en':
      return '';
    default:
      return `/${defaultLang.get()}`;
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
      return `/${defaultLang.get()}`;
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
  const a = document.createElement('a');
  a.href = url;
  return {
    // origin: a.origin, IE11 no origin.
    // eslint-disable-next-line prefer-template
    origin: 'https://' + a.hostname,
    host: a.hostname,
    path: a.pathname.charAt(0) !== "/" ? `/${a.pathname}` : a.pathname, // patch IE 11 no lead slash
    search: a.search,
    href: a.href,
  };
}

/**
 * map many url with lang
 * * watch out urlObj origin and path different
 * @param {String} url
 * @param {String=} lang
 */

const mapUrlLang = (url, lang) => {
  defaultLang.set(lang);
  const urlObj = urlParser(url);
  let returnUrl = url;
  console.log('map url lang: ', url, lang, urlObj);
  if (urlObj.origin.match('adobe')) {
    returnUrl = urlObj.origin + adobeLang() + urlObj.path + urlObj.search;
  }
  if (urlObj.origin.match('artists.motionelements.com')
    || urlObj.origin.match('www.motionelements.com')) {
    returnUrl = urlObj.origin + zendeskLang() + urlObj.path + urlObj.search;
  }
  if (urlObj.origin.match('help.motionelements.com')
  || urlObj.origin.match('artists.zendesk.com')) {
    // console.log(urlObj.path);
    returnUrl = `${urlObj.origin}/hc${zendeskLang()}${urlObj.path.replace('/hc', '')}${urlObj.search}`;
  }
  if (
    urlObj.origin.match('go.motionelements.com')
    || urlObj.origin.match('tuts.motionelements.com')
    || urlObj.origin.match('press.motionelements.com')
  ) {
    returnUrl = urlObj.origin + wpLang() + urlObj.path.replace('/', '') + urlObj.search;
  }
  if (url.match('motionelements.com/artists/')) {
    returnUrl = urlObj.origin + mePageLang() + urlObj.path;
  }
  if (urlObj.path.match('blog')) {
    // returnUrl = urlObj.origin + urlObj.path + wpLang() + urlObj.search;
    returnUrl = `${urlObj.origin}/blog${wpLang()}${urlObj.path.replace('/blog/', '').replace('/blog', '')}${urlObj.search}`;
  }
  const obj = {
    url() {
      return returnUrl;
    },
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
export default function (url, lang) {
  return mapUrlLang(url, lang);
}
