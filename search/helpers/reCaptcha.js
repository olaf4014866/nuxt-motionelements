/* eslint-disable */
// ref: https://developers.google.com/recaptcha/docs/v3

const siteKey = process.env.VUE_APP_RECAPTCHA;

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
 */
export function load(lang) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?hl=${convertLang(lang)}&render=${siteKey}`
  head.appendChild(script);
}

/**
 *
 * @param {String} action edm_subscribe, free_invite
 */
export function getToken(action) {
  return window.grecaptcha.execute(siteKey, { action: action }).then(token => {
    return token;
  });
  // window.grecaptcha.ready(() => {
  //   // console.log('g-re-captcha-ready');
  //   window.grecaptcha.execute(siteKey, { action: action }).then(token => {
  //     console.log(token);
  //   });
  // })
}
