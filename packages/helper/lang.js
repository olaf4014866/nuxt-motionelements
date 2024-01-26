/**
 * get lang from payload;
 *
 * @param {String=} lang
 */

let scopeLang = 'en';

const defaultLang = (function defaultLang() {
  const get = () => scopeLang;

  const set = (lang) => {
    if (lang) scopeLang = lang;
  };

  return {
    get,
    set,
  };
}());

export default defaultLang;
