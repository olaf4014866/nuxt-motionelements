import cookies from 'js-cookie';
import * as accountApi from '@motionelements/core/src/api/account.js';
import { getJwtPayload } from '@motionelements/core/src/services/jwt.service';
import store from '@/store/index.js';
import notificationService from '@motionelements/core/src/services/notification.service';
import link from '@motionelements/core/src/helpers/link';

// cache jwt payload
let jwtPayload = getJwtPayload();

function replacePathLanguageCode(path, languageCode, validLanguageCodes) {
  // remove language from path
  path = path.replace(new RegExp(`^/(${validLanguageCodes.join('|')})/`), '/');

  if (languageCode !== 'en') {
    path = `/${languageCode}${path}`;
  }

  return path;
}

function redirectToLanguageUrl(languageCode) {
  if (store.state.user.language === languageCode) {
    store.dispatch('blocker/hide');
    return;
  }

  let path = store.getters['route/fullPath'];

  path = replacePathLanguageCode(path, languageCode, store.state.site.supportedLanguageCodes);

  window.location.replace(path);
}

export async function getAccount() {
  return accountApi.getAccount().then(res => res.data.data);
}

export async function updateAccount(params) {
  return accountApi.updateAccount(params).then((response) => {
    const data = response.data.data;
    if (_.has(data, 'currency')) {
      store.dispatch('user/setCurrency', data.currency);
    }
    if (_.has(data, 'language')) {
      redirectToLanguageUrl(data.language);
      // store.dispatch('user/setLanguage', data.language);
    }
  });
}

export function getLanguageCode() {
  return _.get(jwtPayload, 'language', null);
}


export function getCurrencyCode() {
  return _.get(jwtPayload, 'currency', null);
}

function isLoggedIn() {
  return _.has(jwtPayload, 'sub');
}

export function getCookieLanguageCode() {
  if (isLoggedIn()) {
    return _.get(jwtPayload, 'language', null);
  }
  return cookies.get('ME_lang');
}

export function getUiModeByCookie() {
  return cookies.get('ME_ui_mode');
}


export function setUiMode(mode) {
  mode = mode === 'dark' ? 'dark' : 'light';

  // cookies.set('ME_SITE_UI_MODE', mode, { domain: '.motionelements.com', secure: true });
  cookies.set('ME_ui_mode', mode, { domain: '.motionelements.com', secure: true });

  if (process.env.NODE_ENV === 'development') {
    cookies.set('ME_ui_mode', mode); // localhost fallback
  }

  if (mode === 'dark') {
    document.documentElement.classList.add('ui-dark');
  } else {
    document.documentElement.classList.remove('ui-dark');
  }
}

// called from vuex
// handle non vuex related functions
export function changeLanguage(languageCode) {
  console.log('account service changeLanguage: ', languageCode);
  // set cookie, etc
  // const lang = languageCode;
  // this.$store.dispatch('site/setCurrentLanguage', lang);
  cookies.set('ME_lang', languageCode, { domain: '.motionelements.com', secure: true });

  if (process.env.NODE_ENV === 'development') {
    cookies.set('ME_lang', languageCode); // localhost fallback
  }

  if (isLoggedIn()) {
    // update lazily
    accountApi.updateAccount({
      language: languageCode,
    })
      .then((response) => {
        console.log(response);
        redirectToLanguageUrl(languageCode);
      });
    // .then((response) => {
    //   // this.$root.$emit('updateGoogleTagManager', response.data.data);
    //   return response;
    // });
  } else {
    redirectToLanguageUrl(languageCode);
  }
}

// called from vuex
// handle non vuex related functions
export function changeCurrency(currencyCode) {
  console.log('account service changeCurrency: ', currencyCode);
  currencyCode = currencyCode.toUpperCase();

  cookies.set('ME_currency', currencyCode, { domain: '.motionelements.com', secure: true });

  if (process.env.NODE_ENV === 'development') {
    cookies.set('ME_currency', currencyCode); // localhost fallback
  }

  if (isLoggedIn()) {
    // update lazily
    accountApi.updateAccount({
      currency: currencyCode,
    })
      .then((response) => {
        console.log(response);
        window.location.reload(true);
      });
    // .then((response) => {
    //   // this.$root.$emit('updateGoogleTagManager', response.data.data);
    //   return response;
    // });
  } else {
    window.location.reload(true);
  }
}


// called from vuex
// handle non vuex related functions
export function changeUiMode(mode) {
  setUiMode(mode);

  if (isLoggedIn()) {
    // update lazily
    accountApi.updateAccount({
      ui_mode: mode,
    })
      .then((response) => {
        console.log(response);
        // redirectToLanguageUrl(languageCode);
      });
  }
}

// eslint-disable-next-line no-unused-vars
function updateGoogleTagManager(info) {
  console.log('updateGoogleTagManager', info);

  let memberType = 'member';
  if (info.artist) {
    memberType = 'artist';
  }
  if (info.admin) {
    memberType = 'admin';
  }
  if (info.reseller) {
    memberType = 'reseller';
  }

  this.$gtm.trackEvent({
    event: 'vue_root_created',
    userId: info.id,
    username: info.username,
    firstName: info.firstName,
    lastName: info.lastName,
    fullName: info.fullName,
    email: info.email,
    memberType: memberType,
    industry: info.industry,
    language: info.language,
    countryCode: info.country,
    jobFunction: info.jobFunction,
  });
}

function mapJwtData(jwtPayload) {
  return {
    firstName: _.get(jwtPayload, 'given_name'),
    lastName: _.get(jwtPayload, 'family_name'),
    username: _.get(jwtPayload, 'preferred_username'),
    language: _.get(jwtPayload, 'language', 'en'),
    currency: _.get(jwtPayload, 'currency', 'USD'),
    email: _.get(jwtPayload, 'email'),
    avatar: {
      url: _.get(jwtPayload, 'picture'),
    },
    subscriptions: _.get(jwtPayload, 'subscriptions'),
    artist: _.get(jwtPayload, 'artist'),
  };
}

function initCart() {
  store.dispatch('cart/listItems');
}

let refreshJwtLanguageRetries = 0;

function refreshJwtLanguage(languageCode) {
  if (process.env.VUE_APP_ENV === 'development') {
    // cannot set localhost cookie
    return false;
  }

  if (isLoggedIn()
      // don't return more than 3 times
      && refreshJwtLanguageRetries < 3) {
    try {
      accountApi.refreshJwt().then(() => {
        // new JWT
        jwtPayload = getJwtPayload();
        console.log('LANG new payload', jwtPayload);
        // verify that new JWT has same language as data.language passed in
        if (_.get(jwtPayload, 'language') === languageCode) {
          redirectToLanguageUrl(languageCode);
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      refreshJwtLanguageRetries += 1;
    }
  }
}

// initAccount via API
export function initAccount() {
  if (!isLoggedIn()) {
    // set final currency from cookie
    const cookieCurrencyCode = cookies.get('ME_currency');
    if (cookieCurrencyCode) {
      store.dispatch('user/setCurrencyCode', cookieCurrencyCode);
    }
    return null;
  }

  if (jwtPayload) {
    // map data from standard JWT fields
    const data = mapJwtData(jwtPayload);

    store.dispatch('user/setMember', data);
    // store.dispatch('site/setCurrentLanguage', data.language);
    // store.dispatch('site/setCurrentCurrency', data.currency);

    // wico code @deprecated
    const tokenInfo = jwtPayload;

    const memberName = {
      first_name: tokenInfo.given_name,
      last_name: tokenInfo.family_name,
      username: tokenInfo.username,
      email: tokenInfo.email,
      avatar: tokenInfo.picture,
      subscriptions: tokenInfo.subscription,
    };

    if (memberName.email) {
      store.dispatch('member/setMemberName', memberName);
      store.dispatch('member/setLoginStatus', true);
    }
  }

  // return store.dispatch('member/checkToken')
  return accountApi.getAccount().then((response) => {
    store.dispatch('member/setLoginStatus', true);

    const data = response.data.data;

    if (data) {
      // check if route language is same as account language?
      if (getCookieLanguageCode() !== data.language) {
        console.log('LANG DIFF', getCookieLanguageCode(), data.language);
        refreshJwtLanguage(data.language);
      }

      console.log('get member info: ', data);
      store.dispatch('site/setCurrentCurrency', data.currency);
      store.dispatch('user/setCurrencyCode', data.currency);
      store.dispatch('user/setMember', data);
      store.dispatch('member/setMemberInfo', data);
      // updateGoogleTagManager(data);
      // store.dispatch('user/setLoaded', true);
    }

    if (_.has(data, 'favoritesCount')) {
      store.dispatch('site/setFavoritesDefaultCount', data.favoritesCount);
    }

    initCart();

    return response;
  }).catch((error) => {
    if (error.response.status === 401) {
      // unset JWT
      // need to specify full path and domain
      cookies.remove('ME_jwt', { path: '/', domain: '.motionelements.com' });
      cookies.remove('ME_jwt_sig', { path: '/', domain: '.motionelements.com' });

      if (process.env.VUE_APP_ENV === 'development') {
        cookies.remove('ME_jwt');
        cookies.remove('ME_jwt_sig');
      }
      store.dispatch('user/clearMember');
      notificationService.handleResponseNotification({
        data: {
          messages: [
            {
              type: 'alert',
              level: 'info',
              title: 'Login again',
              details: 'Please login again.',
            },
          ],
        },
      });

      // route to login only if it's not login
      const currentPath = store.getters['route/fullPath'];

      if (currentPath.indexOf('/account/login') === -1) {
        window.location.href = link('/account/login').param('redirect', currentPath).url();
      } else {
        console.log('skip redirect to same login page');
      }

      // window.location.pathname = `/account/login?redirect=${encodeURIComponent(returnPath)}`;
    }
  });
}

export async function signUp(payload) {
  return accountApi.signUp(payload);
}

// PROFILE

export async function listMemberSubscriptions() {
  return accountApi.listMemberSubscriptions();
}

export async function cancelMemberSubscriptions(payload) {
  return accountApi.cancelMemberSubscriptions(payload);
}

export async function getAccountProfileCompletion() {
  return accountApi.getAccountProfileCompletion();
}

export async function getAccountProfileDetails() {
  return accountApi.getAccountProfileDetails();
}

export async function getPayoneerPayee() {
  return accountApi.getPayoneerPayee();
}

export async function createPayoneerPayee(payload) {
  return accountApi.createPayoneerPayee(payload);
}

// export async function getPayoneerJobStatus(payload) {
//   return accountApi.getPayoneerJobStatus(payload);
// }

// export async function getJobStatus(payload) {
//   return accountApi.getJobStatus(payload);
// }

export async function listSubscriptionPlans() {
  return accountApi.listSubscriptionPlans();
}

export async function getSubscriptionPlan(payload) {
  return accountApi.getSubscriptionPlan(payload);
}

export async function updateAvatar(payload) {
  return accountApi.updateAvatar(payload);
}
