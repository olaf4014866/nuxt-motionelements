import lodashGet from 'lodash/get';
import cookies from 'js-cookie';
import {
  changeLanguage, changeCurrency, changeUiMode, setUiMode,
} from '@motionelements/core/src/services/account.service';
import store from '@/store/index.js';
import * as accountApi from '@motionelements/core/src/api/account';

import { loadFonts } from '@motionelements/core/src/services/app.service';

// set from cookie first
// function getInitialLanguageCode() {
//   const jwt = cookies.get('ME_jwt');
//   if (!jwt) {
//     const value = cookies.get('ME_lang');
//     console.log('getInitialLanguageCode:', value);
//     return value ? value : 'en';
//   }
//   return 'en';
// }

function getInitialCurrencyCode() {
  const value = cookies.get('ME_currency');
  console.log('getInitialCurrencyCode:', value);
  return value ? value.toLowerCase() : 'usd';
}

function hasInitialCurrencyCode() {
  const value = cookies.get('ME_currency');
  return !!value;
}

function getInitialUiMode() {
  const value = cookies.get('ME_ui_mode');
  console.log('getInitialUiMode:', value);
  return value || 'light';
}

function initLanguage(state, languageCode) {
  const html = document.documentElement;
  // set the html tag to local lang
  html.setAttribute('lang', languageCode);

  console.log('init language', languageCode);
  if (!state.languageFontsLoaded.includes(languageCode)) {
    console.log('init language', 'loadFonts', languageCode);

    loadFonts(languageCode);
    state.languageFontsLoaded.push(languageCode);
  } else {
    console.log('init language', 'already loaded Fonts', languageCode);
  }
}

const defaultMemberState = {
  roles: [],
  credits: 0,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  emailVerified: null,
  country: '',
  currency: 'usd',
  language: 'en',
  avatar: {
    url: null,
  },
  registeredAt: '',
  organization: {
    id: 0,
    name: '',
    legalName: '',
  },
  organizationRole: '',
  subscriptions: [],
  freeDownloads: {
    remaining: null,
    interval: 'week',
  },
};

const state = {
  isLoggedIn: false,
  isMember: false,
  isArtist: false,
  isReseller: false,
  isAdmin: false,
  isOrganization: false,
  language: 'en',
  currency: getInitialCurrencyCode(),
  currencyCode: null, // final
  defaultCurrency: 'USD',
  useDefaultCurrency: !hasInitialCurrencyCode(),
  member: defaultMemberState,
  preferences: {
    ui: {
      mode: getInitialUiMode(),
      artist: {
        version: null,
        allow_v3: false,
      },
    },
  },
  // array of fontsLoaded
  languageFontsLoaded: [],
};


const getters = {
  // @deprecated
  isLogin: state => state.isLogin,
  // @deprecated
  isNotLogin: state => state.isNotLogin,

  isMember: state => state.isMember,
  isArtist: state => state.isArtist,
  isReseller: state => state.isReseller,
  isAdmin: state => state.isAdmin,
  isOrganization: state => state.isOrganization,

  isResellerCustomer: state => state.member.roles.includes('reseller_customer'),

  getMemberInfo: state => state.info,
  getOrganizationInfo: state => state.info.organization,

  getPreferencesUIMode: state => state.info.preferences.ui.mode,
  getPreferencesArtistVersion: state => state.info.preferences.ui.artist.version,
  getPreferencesArtistAllowV3: state => state.info.preferences.ui.artist.allow_v3,

  // @deprecated
  language: state => state.language,
  currency: state => state.currency,

  // @deprecated
  getLanguageCode: state => state.language,
  // @deprecated
  getCurrencyCode: state => state.currencyCode || (state.useDefaultCurrency ? state.defaultCurrency : state.currency.toUpperCase()),


  languageCode: state => state.language,
  // uppercase
  currencyCode: state => state.currencyCode || (state.useDefaultCurrency ? state.defaultCurrency : state.currency.toUpperCase()),

  isFontLoaded: (state) => {
    if (state.language) {
      return !!state.fontsLoaded.find(v => v.language === state.language);
    }
    return false;
  },

  freeDownloadsRemaining: state => state.member.freeDownloads.remaining,

  hasUnlimitedSubscription: state => Array.isArray(state.member.subscriptions) && state.member.subscriptions.includes('unlimited'), // console.log('sub', state.member);
  // return false;
  // return state.member.subscriptions.find(x => x.id === currentSku);


  getDisplayName: (state) => {
    if (!state.isMember) {
      return '';
    }
    const member = state.member;
    if (member.username) {
      return member.username;
    }
    if (member.firstName) {
      return member.firstName;
    }
    if (member.lastName) {
      return member.lastName;
    }
    return member.email.split('@')[0];
  },

  friendlyName: (state) => {
    if (!state.isMember) {
      return '';
    }
    const member = state.member;

    // prefer last name
    if (['ja'].includes(state.language)) {
      if (member.lastName) {
        return member.lastName;
      }
    } else {
      if (member.firstName) {
        return member.firstName;
      }

      if (member.lastName) {
        return member.lastName;
      }
    }

    return member.email.split('@')[0];
  },

  getAvatarUrl: (state) => {
    if (!state.isMember) {
      return null;
    }
    return state.member.avatar.url;
  },
};

const actions = {

  setMember({ commit }, data) {
    if (_.has(data, 'preferences.ui.mode')) {
      setUiMode(lodashGet(data.preferences, 'ui.mode', 'light'));
    }
    commit('setMember', data);
  },

  // logout or expired
  clearMember({ commit }) {
    commit('clearMember');
  },

  setDefaultCurrency({ commit }, currencyCode) {
    if (currencyCode) {
      currencyCode = currencyCode.toUpperCase();
      commit('setDefaultCurrency', currencyCode);
    }
  },

  setCurrency({ commit }, currencyCode) {
    if (currencyCode) {
      currencyCode = currencyCode.toLowerCase();
      if (currencyCode !== state.currency) {
        commit('setCurrency', currencyCode);
        // changeCurrency(currencyCode);
      }
      store.dispatch('site/setCurrentCurrency', currencyCode);
    }
  },

  setCurrencyCode({ commit }, currencyCode) {
    if (currencyCode) {
      currencyCode = currencyCode.toUpperCase();
      if (currencyCode !== state.currencyCode) {
        commit('setCurrencyCode', currencyCode);
      }
    }
  },

  changeCurrency({ commit }, currencyCode) {
    if (currencyCode) {
      currencyCode = currencyCode.toLowerCase();
      if (currencyCode !== state.currency) {
        commit('setCurrency', currencyCode);
        store.dispatch('site/setCurrentCurrency', currencyCode);
        changeCurrency(currencyCode);
      }
    }
  },

  setLanguage({ state, commit }, languageCode) {
    if (languageCode !== state.language) {
      commit('setLanguage', languageCode);
    }
    initLanguage(state, languageCode);

    store.dispatch('site/setCurrentLanguage', languageCode);
  },

  changeLanguage({ state, rootState }, languageCode) {
    if (languageCode !== state.language) {
      // commit('setLanguage', languageCode);
      // store.dispatch('site/setCurrentLanguage', languageCode);
      const supportedLanguages = rootState.site.supportedLanguages;
      if (Object.keys(supportedLanguages).includes(languageCode)) {
        // valid language code
        store.dispatch('blocker/show', { message: supportedLanguages[languageCode] });
        return changeLanguage(languageCode);
      }
    }
  },

  changeUiMode({ commit }, mode) {
    mode = mode === 'dark' ? 'dark' : 'light';

    changeUiMode(mode);

    commit('setUiMode', mode);
  },

  setFreeDownloadsRemaining({ commit }, payload) {
    commit('setFreeDownloadsRemaining', payload);
  },

  getFreeDownloadsRemaining({ commit }) {
    return accountApi.getFreeDownloadsRemaining().then((response) => {
      commit('setFreeDownloadsRemaining', response.data.data);
    });
  },


};


const mutations = {
  setDefaultCurrency: (state, currencyCode) => {
    state.defaultCurrency = currencyCode;
  },

  setCurrency: (state, currencyCode) => {
    state.useDefaultCurrency = false;
    state.currency = currencyCode;
    state.member.currency = currencyCode;
  },

  setCurrencyCode: (state, currencyCode) => {
    state.useDefaultCurrency = false;
    state.currencyCode = currencyCode;
  },

  setLanguage: (state, languageCode) => {
    state.language = languageCode;
    state.member.language = languageCode;
  },

  setUiMode: (state, value) => {
    state.preferences.ui.mode = value;
  },

  setMember(state, data) {
    console.log('setMember', data);

    // make sure roles is array
    if (_.has(data, 'roles') && !Array.isArray(data.roles)) {
      data.roles = [];
    }

    state.member = { ...state.member, ...data };

    // derived values
    state.isLoggedIn = !!_.get(data, 'email');
    state.isMember = !!_.get(data, 'email');
    state.isArtist = !!_.get(data, 'artist');
    state.isReseller = !!_.get(data, 'reseller');
    state.isAdmin = !!_.get(data, 'admin');
    state.isOrganization = !!_.get(data, 'organization.id');

    if (_.has(data, 'preferences')) {
      state.preferences.ui.mode = lodashGet(data.preferences, 'ui.mode', 'light');
      state.preferences.ui.artist.version = lodashGet(data.preferences, 'ui.artist.version', null);
      state.preferences.ui.artist.allow_v3 = lodashGet(data.preferences, 'ui.artist.allowV3', false);
    }

    const currencyCode = _.get(data, 'currency');

    if (currencyCode) {
      state.useDefaultCurrency = false;
      state.currency = data.currency.toLowerCase();
      state.member.currency = data.currency.toLowerCase();
    }

    if (_.has(data, 'language')) {
      state.language = data.language;
    }
  },

  clearMember(state) {
    state.isLoggedIn = false;
    state.member = defaultMemberState;
  },

  setFreeDownloadsRemaining: (state, downloads) => {
    state.member.freeDownloads.remaining = downloads;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
