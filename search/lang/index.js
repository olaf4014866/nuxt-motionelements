/* eslint-disable */
const en  = require('./json/en.json');
const ja  = require('./json/ja.json');
const ko  = require('./json/ko.json');
const zh_hant = require('./json/zh_hant.json');
const th  = require('./json/th.json');
const de  = require('./json/de.json');
const es  = require('./json/es.json');
const fr  = require('./json/fr.json');
const pt  = require('./json/pt.json');

const hu  = require('./json/hu.json');
const it  = require('./json/it.json');
const ru  = require('./json/ru.json');
const tr  = require('./json/tr.json');

const languages = {
  'en': en,
  'ja': ja,
  'ko': ko,
  'zh-hant': zh_hant,
  'th': th,
  'de': de,
  'es': es,
  'fr': fr,
  'pt': pt,

  'hu': hu,
  'it': it,
  'ru': ru,
  'tr': tr,
};

const supportedLanguageCodes = Object.keys(languages);

const languageList = supportedLanguageCodes;

module.exports = {
  languages,
  languageList,
  supportedLanguageCodes,
};
