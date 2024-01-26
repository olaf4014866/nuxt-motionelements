
/**
 * get single cookie by string name
 * @param {String} name ex: appConst.ME_TOKEN
 */
export const getSingleCookie = (name) => {
  const cookies = document.cookie.split('; ');
  try {
    const singleCookie = cookies.find(x => x.match(`${name}=`));
    return singleCookie.replace(`${name}=`, '');
    // return cookies.filter(x => x.match(name))[0].replace(`${name}=`, '');
  } catch {
    console.log('no cookie: ', name);
    return false;
  }
};

/**
 * convert json new line symbol, return with html tag
 * @param {String} json
 * @param {String} tag default <p></p>
 */
export const nl2p = (json, tag = 'p') => {
  const paragraph = JSON.stringify(json).replace(/(\\r\\n)|(\\r)|(\\n)/g, `</${tag}><${tag}>`).replace(/"/g, '');
  return `<${tag}>${paragraph}</${tag}>`;
};

export const emailValidator = (email) => {
  // const validator = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'i');
  const validator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validator.test(email);
};

/**
 * currency by lang
 * @param {String} lang - will convert to LowerCase
 * @return {String} return currency String
 */
export const currencyByLang = (lang) => {
  switch (lang.toLowerCase()) {
    case 'en':
      return 'usd';
    case 'ja':
      return 'jpy';
    case 'ko':
      return 'krw';
    case 'zh-hant':
      return 'twd';
    case 'th':
      return 'thb';
    case 'de':
      return 'eur';
    case 'es':
      return 'eur';
    default:
      return 'usd';
  }
};

/**
 *
 */
export const convertRouteMediatypeShort = (mt) => {
  switch (true) {
    case /pr|premiere/.test(mt.toLowerCase()):
      return 'pr';
    case /ae|after/.test(mt.toLowerCase()):
      return 'ae';
    case /davinci|resolve/.test(mt.toLowerCase()):
      return 'resolve';
    case /motion|apple/.test(mt.toLowerCase()):
      return 'motion-template';
    case /sfx|sound/.test(mt.toLowerCase()):
      return 'sfx';
    case /3d/.test(mt.toLowerCase()):
      return '3d-model';
    default:
      return mt.toLowerCase();
  }
};

/**
 *
 */
export const convertMediatypeShortToCode = (mt) => {
  switch (mt.toLowerCase()) {
    case 'pr':
    case 'premiere-pro':
      return 'pr_template';
    case 'ae':
    case 'after-effects':
      return 'ae_template';
    case 'motion':
    case 'apple-motion':
      return 'motion_template';
    case 'resolve':
    case 'resolve-templates':
    case 'resolve_templates':
      return 'resolve_templates';
    case 'sound':
    case 'sound-effects':
      return 'sfx';
    case '3d-model':
      return '3d';
    default:
      return mt.toLowerCase();
  }
};

export const isOverWindowWidth = size => (size > window.innerWidth ? true : false);

export const isMobileLayout = () => (window.innerWidth < 1200 ? true : false);

export const filterHtmlTag = (content) => {
  const temp = document.createElement('div');
  const temp2 = document.createElement('div');
  temp.innerHTML = content;
  temp2.innerHTML = temp.textContent || temp.innerText;
  return temp2.textContent || temp2.innerText;
};

/**
 * convert object to Form Data
 */
export const convertObj2FormData = (obj) => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => formData.append(key, obj[key]));
  return formData;
};

export const getProductDetailsByMediatype = (mediatype) => {
  console.log('getProductDetailsByMediatype', mediatype);
  switch (Number(mediatype)) {
    case 1:
    case 14:
      return {
        left: ['dimension', 'image_type', 'alpha'],
        right: ['model_release', 'property_release', 'location', 'source'],
        all: ['dimension', 'image_type', 'alpha', 'model_release', 'property_release', 'location', 'source'],
      };
    case 2:
      return {
        left: ['image_type'],
        right: ['source'],
        all: ['image_type', 'source'],
      };
    case 3:
    case 4:
      return {
        left: ['loop', 'duration', 'aspect_ratio', 'alpha'],
        right: ['model_release', 'property_release', 'location', 'source', 'rendering'],
        all: ['loop', 'duration', 'aspect_ratio', 'alpha', 'model_release', 'property_release', 'location', 'source', 'rendering'],
      };
    case 5:
      return {
        left: ['geometry', 'vertices', 'polygons'],
        right: ['source', 'rendering'],
        all: ['geometry', 'vertices', 'polygons', 'source', 'rendering'],
      };
    case 6:
      return {
        left: ['edit_type', 'loop', 'duration', 'bpm', 'musical_key', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels', 'file_size'],
        right: ['musical_works', 'composers', 'publishers', 'source'],
        all: ['edit_type', 'loop', 'duration', 'bpm', 'musical_key', 'composer', 'publisher', 'musical_works', 'format', 'file_size', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels', 'source'],
      };
    case 7:
      return {
        left: ['duration', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels', 'file_size'],
        right: ['source'],
        all: ['duration', 'source', 'format', 'file_size', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels'],
      };
    case 8:
      return {
        left: ['software_required', 'plugins_required', 'expression', 'durations', 'dimensions', 'file_size'],
        right: ['has_music', 'has_sfx', 'has_video'],
        all: ['has_pre_render', 'expression', 'composition', 'duration', 'resolution', 'file_size', 'has_music', 'has_sfx', 'has_video'],
      };
    case 9:
      return {
        left: ['software_required', 'plugins_required', 'editable_in_fcp', 'durations', 'dimensions', 'file_size'],
        // left: ['has_pre_render', 'duration', 'resolution', 'file_size'],
        right: ['has_music', 'has_sfx', 'has_video'],
        all: ['has_pre_render', 'duration', 'resolution', 'file_size', 'has_music', 'has_sfx', 'has_video'],
      };
    case 15:
    case 16:
      return {
        left: ['software_required', 'plugins_required', 'durations', 'dimensions', 'file_size'],
        right: ['has_music', 'has_sfx', 'has_video'],
        all: ['duration', 'resolution', 'file_size', 'has_music', 'has_sfx', 'has_video'],
      };
    case 19:
    case 20:
      return {
        left: ['software_required', 'file_size'],
        right: [],
      };
    case 11:
      return {
        left: ['projection', 'viewing_field', 'resolution', 'file_size'],
        right: ['property_release', 'location', 'source', 'rendering'],
        all: ['projection', 'viewing_field', 'resolution', 'file_size', 'model_release', 'property_release', 'location', 'source', 'rendering'],
      };
    case 12:
      return {
        left: ['projection', 'viewing_field', 'duration', 'resolution', 'file_size'],
        right: ['property_release', 'location', 'source', 'rendering'],
        all: ['projection', 'viewing_field', 'duration', 'resolution', 'file_size', 'model_release', 'property_release', 'location', 'source', 'rendering'],
      };
    case 21:
      return {
        left: ['software_required', 'dimensions', 'background'],
        right: ['format', 'json_file_size', 'source', 'rendering'],
        all: ['dimensions', 'background', 'bodymovin_version', 'format', 'file_size', 'source', 'rendering'],
      };
    default:
      return {
        left: [],
        right: [],
      };
  }
};
/**
 * input locale to convert to AddToAny supported locale String
 * https://www.addtoany.com/buttons/customize/translation_localization
 * @param {String} locale
 * @returns {String}
 */
export const convertAddToAnyLang = (locale) => {
  let lang = 'en-US';
  switch (lang) {
    case 'ja':
      lang = 'ja-JP';
      break;
    case 'ko':
      lang = 'ko-KR';
      break;
    case 'zh-hant':
      lang = 'zh-TW';
      break;
    default:
      lang = locale;
      break;
  }
  return lang;
};

/**
 * get URL search param data
 * if no name will return first keyword in param
 * @param {String} name
 * @return {*} keyword
 */
export const getUrlParamData = (name) => {
  const paramArr = decodeURI(window.location.search).replace('?', '').split('&');
  if (paramArr.length) {
    const keywordArr = paramArr.filter(x => x.match(name));
    const keyword = keywordArr.length ? keywordArr[0].replace(`${name}=`, '') : null;
    return keyword;
  }
  return null;
};

export const getUrlParamObject = () => {
  if (window.location.search) {
    // eslint-disable-next-line
    // return Object.fromEntries(new URLSearchParams(decodeURIComponent(window.location.search)));
    var pairs = window.location.search.slice(1).split('&');

    var result = {};
    pairs.forEach((pair) => {
      var p = pair.split('=');
      result[p[0]] = decodeURIComponent(p[1] || '');
    });
    return result;
  }
};

export const getAddUrlParamObject = (search) => {
  // eslint-disable-next-line
  var pairs = search.slice(1).split('&');

  var result = {};
  pairs.forEach((pair) => {
    var p = pair.split('=');
    result[p[0]] = decodeURIComponent(p[1] || '');
  });
  return result;
};

/**
   *  convert element api payload object to URL query string
   * @param {Object} payload
   * @return {String}
   */
export const toQueryString = payload => Object.keys(payload).map(key => `?${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`).join('&');


/**
 * productDetailsFormatter
 * @param {Object} details
 * @return {Object} filtered
 * ref doc:
 * https://docs.google.com/spreadsheets/d/1Q5pkgMlr-yZJg4sZhfNM4aF0ee7NbyJNHz00kKwY3P4/edit#gid=319078228
 */
export const productDetailsFormatter = details => details;

export const productVersionsFormatter = (versions) => {
  const obj = {
    // id: versions.id,
    // type: versions.type,
    // format: versions.format,
    // file_size: versions.file_size,
    // width: versions.width,
    // height: versions.height,
    // height: versions.height,
    // software_version_name: versions.software_version_name,
    // required_version: versions.required_version,
    // software_version_number: versions.software_version_number,
    // plugins_required: versions.plugins_required,
    // required_plugins: versions.required_plugins,
    price: versions.price,
    currency: versions.currency,
  };
  if (versions.width) {
    obj.dimension = `${versions.width} x ${versions.height}`;
  }
  return obj;
};

export const productVersionsLength = (versions) => {
  let length = 0;

  if (versions) {
    length = Object.keys(versions).length;
  }

  return length;
};

export const secondToMinutes = (seconds) => {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;

  if (hours < 1) {
    return [minutes, seconds % 60].map(format).join(':');
  }

  return [hours, minutes, seconds % 60].map(format).join(':');
};

export const secondToIso8601Duration = (seconds) => {
  // const format = val => `0${Math.floor(val)}`.slice(-2);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  seconds %= 60;

  if (hours > 0) {
    return `PT${hours}H${minutes}M${seconds}S`;
  }

  // if (minutes > 0) {
  return `PT${minutes}M${seconds}S`;
  // }

  // return `PT${seconds}S`;
};

export const convertByteToMb = (num) => {
  const t = (num / 1024 / 1024).toFixed(2);
  return t;
};

export const isIE = () => {
  const ua = navigator.userAgent;
  // MSIE used to detect old browsers and Trident used to newer ones
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
};
