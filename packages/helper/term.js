// @ts-nocheck

import get from 'lodash/get';
import isNaN from 'lodash/isNaN';
import snakeCase from 'lodash/snakeCase';

import appMediaTypes from './mediatypes/index.js';

import defaultLang from './lang';
/**
 * get mediaType name input mediatype code(ae),
 * @param {String||Number} type ae, pr,
 */

const renderMediaType = function (type) {
  // console.log('[mediatype terms]', type);
  defaultLang.get();
  var mediaType = type;

  if (type.match('-')) {
    mediaType = snakeCase(type);
  }
  // handle templates
  if (type.match('templates')) {
    mediaType = type.replace('templates', 'template');
  }

  // handle number mt
  if (!isNaN(Number(type))) {
    // const types = appMediaTypesList.filter(i => i.value.indexOf(type.toString()) > -1);
    const types = appMediaTypes.en.filter(i => i.id === Number(type));
    mediaType = get(types[0], 'code');
    // mediaType = get(types[0], 'group');
  }
  // ae_template, ae_plugin, ae_preset
  var isTemplate = false;
  var isPlugin = false;
  var isPreset = false;

  // ae_free
  var isFree = false;

  // name_short, name_seo
  // name_short_plural, name_seo_plural
  var isShort = false;
  var isSeo = false;
  var isPlural = false;

  if (type.match('-')) {
    mediaType = snakeCase(type);
  }

  // replace free string
  if (type.match('free')) {
    mediaType = type.replace('_free', '');
    isSeo = true; // free only has name_seo_free
    isFree = true;
  }

  // console.log('mediatype terms', type);
  // console.log('mediatype terms is free', isFree);

  // handle number mt
  if (!isNaN(Number(type))) {
    // const types = appMediaTypesList.filter(i => i.value.indexOf(type.toString()) > -1);
    const types = appMediaTypes.en.filter(i => i.id === Number(type));
    mediaType = get(types[0], 'code');
  }

  function resetIsStatus() {
    isTemplate = false;
    isPlugin = false;
    isPreset = false;
    // isFree = false;
  }

  function getMtCode(name) {
    let returnCode = name;
    if (isTemplate) {
      returnCode += '_template';
    }
    if (isPreset) {
      returnCode += '_preset';
    }
    if (isPlugin) {
      returnCode += '_plugin';
    }
    // if (isFree) {
    //   returnCode += '_free';
    // }
    // console.log('get mt code: ', name, returnCode);
    return returnCode;
  }

  function getMtName(code) {
    let name = 'name';

    if (isShort) {
      name += '_short';
    }
    // if (isFree) {
    //   name = 'name_seo_free';
    // }
    if (isSeo) {
      name += '_seo';
    }
    if (isPlural) {
      name += '_plural';
    }
    // name add free
    if (isFree) {
      name += '_free';
    }
    // console.log('[mediatype terms] get mt name: ', code, name);
    // add en mediatypes fallback to en;
    let arr;
    try {
      arr = appMediaTypes[defaultLang.get()].filter(x => x.code === code);
    } catch (error){
      console.log(error);
      arr = appMediaTypes.en.filter(x => x.code === code);
    }
    // console.log('get mt name: ', get(arr[0], 'name'));
    return get(arr[0], name);
  }
  function getMtEnName(code) {
    let name = 'name';

    if (isSeo) {
      name += '_seo';
    }
    if (isShort) {
      name += '_short';
    }
    if (isPlural) {
      name += '_plural';
    }
    // console.log('get mt name: ', code, name);
    const arr = appMediaTypes.en.filter(x => x.code === code);
    // console.log('get mt name: ', get(arr[0], 'name'));
    return get(arr[0], name);
  }
  function getMtObj() {
    const ids = appMediaTypes.en.filter(i => i.code === mediaType);
    return ids[0];
  }

  var obj = {
    preset() {
      resetIsStatus();
      isPreset = true;
      return this;
    },
    plugin() {
      resetIsStatus();
      isPlugin = true;
      return this;
    },
    template() {
      resetIsStatus();
      isTemplate = true;
      return this;
    },
    free() {
      // resetIsStatus();
      // name += '_free';
      isSeo = true; // free only has name_seo_free
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
    short() {
      isShort = true;
      isSeo = false;
      // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
      // if (arr.length) {
      //   ans = arr[0].name_short;
      // }
      return this;
    },
    seo() {
      isShort = false;
      isSeo = true;
      // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
      // if (arr.length && arr[0].name_seo) {
      //   ans = arr[0].name_seo;
      // }
      return this;
      // return this.name();
    },
    plural() {
      // name += '_plural';
      isPlural = true;
      // const arr = mediaTypes[defaultLang.get()].filter(x => x.code === name);
      // if (arr.length) {
      //   ans = arr[0].name;
      // }
      return this;
    },
    name() {
      return this;
    },
    renderHtml() {
      return getMtName(getMtCode(mediaType));
    },
    renderEnHtml() {
      return getMtEnName(getMtCode(mediaType));
    },
    object() {
      const id = getMtObj();
      if (id) {
        return id;
      }
      console.info(`[MediaType Terms]: ${type} no MediaType id or object`);
      // return this.renderEnHtml().replace(/<wbr>/g, '');
      return '';
    },
    code() {
      const id = getMtObj();
      if (id) {
        return id.code;
      }
      console.info(`[MediaType Terms]: ${type} no MediaType code or input not Number`);
      // return this.renderEnHtml().replace(/<wbr>/g, '');
      return '';
    },
    id() {
      const id = getMtObj();
      if (id) {
        return id.id;
      }
      console.info(`[MediaType Terms]: ${type} no MediaType id or input not Number`);
      // return this.renderEnHtml().replace(/<wbr>/g, '');
      return '';
    },
    text() {
      const ans = this.renderHtml();
      if (ans) {
        return ans.replace(/<wbr>/g, '');
      }
      console.info(`[MediaType Terms]: ${type} no MediaType or i18n strings`);
      // return this.renderEnHtml().replace(/<wbr>/g, '');
      return '';
    },
    html() {
      const ans = this.renderHtml();
      if (ans) {
        return ans;
      }
      console.info(`[MediaType Terms]: ${type} no MediaType or i18n strings`);
      // return this.renderEnHtml();
      return '';
    },
  };
  return obj;
};


const renderLanguage = function (languageCode) {

  const languageList = {
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
    'zh-hant': '中文(繁體)',
    'th': 'ไทย',
    'de': 'Deutsch',
    'es': 'Español',
    'fr': 'Français',
    'pt': 'Portuguese',
    'hu': 'Magyar',
    'it': 'Italiano',
    'ru': 'Pусский',
    'tr': 'Türkçe',
  };

  return {
    text() {
      if (_.has(languageList, languageCode)) {
        return languageList[languageCode];
      }

      return languageCode;
    },
  };
};

export default function (type, payload) {
  switch(type) {
    case 'mediaType':
      return renderMediaType(payload);
    case 'language':
      return renderLanguage(payload);
  }
}
