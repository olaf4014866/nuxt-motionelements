// import {
//   ja,
//   // ko,
//   // zhTW,
//   // th,
//   // de,
//   // es,
//   // fr,
//   // ru,
// } from 'date-fns/locale';
import {
  fromUnixTime,
  format,
} from 'date-fns';

import store from '@/store/index.js';

function isIE() {
  const ua = navigator.userAgent;
  // MSIE used to detect old browsers and Trident used to newer ones
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

// const dateFnsLocales = {
//   ja,
//   ko,
//   zhTW,
//   th,
//   de,
//   es,
//   fr,
//   ru,
// };


const dateHelper = (timestamp) => {
  // check if timestamp is not empty
  const date = timestamp > 0 ? fromUnixTime(timestamp) : null;

  return {
    formatLocalized(formatString, params) {
      if (!date) return null;

      params = params || {};

      // const languageCode = store.state.user.language;
      const languageCode = store.getters['user/languageCode'];

      if (!isIE()) {
        switch (true) {
          case languageCode === 'en':
            break;

            // case languageCode === 'ja':
            //   params.locale = () => import('date-fns/locale/ja');
            //   // params.locale = ja;
            //
            //   console.log('isLocale: ', params.locale);
            //   break;
            //
            // case languageCode === 'ko':
            //   // params.locale = () => import('date-fns/locale/ko');
            //   break;
            // case languageCode === 'zh-hant':
            //   params.locale = dateFnsLocales.zhTW;
            //   break;
            //
            // case _.has(dateFnsLocales, languageCode):
            //   params.locale = dateFnsLocales[languageCode];
            //   break;

          default:
            // if unsupported language
            // format in yyyy-mm-dd
            if (formatString === 'PPP') {
              formatString = 'yyyy-MM-dd';
            }
            break;
        }
      } else if (formatString === 'PPP') {
        // if unsupported language
        // format in yyyy-mm-dd
        formatString = 'yyyy-MM-dd';
      }

      // if (!isIE) {
      //   const ja = () => import('date-fns/locale/ja');
      //   params.locale = ja;
      // }

      // let dateFnsLocale = dateFnsLocales[languageCode];
      // // switch (currentLanguage) {
      // //   case 'zh-hant':
      // //     localeLang = dateFnsLocales.zhTW;
      // //     break;
      // //   case 'en':
      // //     localeLang = dateFnsLocales.enUS;
      // //     break;
      // //   default:
      // //     localeLang = dateFnsLocales[currentLanguage];
      // //     break;
      // // }
      //
      // switch (languageCode) {
      //   case 'ja':
      //     params.locale = ja;
      //     break;
      //   case 'ko':
      //     params.locale = ko;
      //     break;
      //   case 'de':
      //     params.locale = de;
      //     break;
      //   case 'ru':
      //     params.locale = ru;
      //     break;
      //   case 'es':
      //     params.locale = es;
      //     break;
      //   case 'zh-hant':
      //     params.locale = zhTW;
      //     break;
      //   case 'fr':
      //     params.locale = fr;
      //     break;
      //   case 'th':
      //     params.locale = th;
      //     break;
      //   case 'en':
      //     break;
      //   default:
      //     // if unsupported language
      //     // format in yyyy-mm-dd
      //     if (formatString === 'PPP') {
      //       formatString = 'yyyy-MM-dd';
      //     }
      //     break;
      // }

      return format(date, formatString, params);
    },
  };
};

export default dateHelper;
