/* eslint-disable */
// ref: https://developers.google.com/recaptcha/docs/v3
// ref: https://gist.github.com/aellerton/92f33cef04a1df76636a658571e07724
// ref: https://gist.github.com/hypeJunction/05ddb40d38da4e107ea73b097656d1d2

// CHANGELOG: add recaptcha v2 and fallback localhost key, please check Login.vue page to see how to use

// import notificationService from "@motionelements/core/src/services/notification.service.js";

let siteKeyV2 = process.env.VUE_APP_GOOGLE_RECAPTCHA_V2;
let siteKey   = process.env.VUE_APP_GOOGLE_RECAPTCHA_V3;

const devSecretKey = '6LcxBcUUAAAAANqApCLSDVH92JW_6Hv4D00Q90Jl';

// https://developers.google.com/recaptcha/docs/faq
const devSecretKeyV2 = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

// if (process.env.VUE_APP_ENV === 'development') {
//   siteKey = devSiteKey;
//   siteKeyV2 = devSiteKeyV2;
// }

/**
 * input ME site i18n.locale convert to google lang code
 * @param {String} lang default='en'
 */
function convertLang(lang = 'en') {
  switch (lang) {
    case 'zh-hant':
      return 'zh-TW';
    case 'zh-hans':
      return 'zh-CN';
    case 'es':
      return 'es-419';
    default:
      return lang;
  }
}

/**
 * load Google reCaptcha v3 and return key
 * @param {String} lang ME site store lang code
 * @param {Boolean} isCallback default no fallback
 */
export function load(lang, isCallback = false) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?hl=${convertLang(lang)}&render=${siteKey}${isCallback ? '&onload=onloadCallback' : ''}`
  script.async = true;
  script.defer = true;
  head.appendChild(script);
}

/**
 * load Google reCaptcha v2 and render to element
 * callback {Object} expiredCallback, errorCallback
 */
export function renderV2(callback) {
  // window.grecaptcha.reset();
  window.grecaptcha.render('g-recaptchav2', {
    'sitekey' : siteKeyV2,
    'expired-callback': callback.expiredCallback,
    'error-callback': callback.errorCallback,
  });
}
/**
 *
 * @param {String} action edm_subscribe, free_invite
 */
export function getToken(action) {
  // if (window.location.port) {
  if (process.env.VUE_APP_ENV === 'development') {
    return devSecretKey;
  }
  // return window.grecaptcha.execute(siteKey, { action: action });
  // window.grecaptcha.ready(function() {
  return window.grecaptcha.execute(siteKey, { action: action }).catch((payload) => {
    console.error('getToken error', payload);
    // notificationService.alert({
    //   level: 'danger',
    //   title: this.$i18n.t('error.recaptcha_failed_to_load'),
    // });
  });
      // });
  // return null;
}

/**
 * get reCaptcha v2 response content
 */
export function getV2Response() {
  // return window.grecaptcha.getResponse();
  // window.grecaptcha.ready(function() {
    return window.grecaptcha.getResponse();
  // });
  // return null;
}

/**
 * get reCaptcha v2 reset content
 */
export function resetV2() {
  // return window.grecaptcha.getResponse();
  // window.grecaptcha.ready(function() {
    return window.grecaptcha.reset();
  // });
  // return null;
}

/**
 *
 */
export function getDevTokenV2() {
  return devSecretKeyV2;
}
