import lodashGet from 'lodash/get';
import * as api from '@/api/index';

const state = {
  isTokenAuth: false,
  isMember: false,
  isLogin: false,
  isNotLogin: false,
  isArtist: false,
  isReseller: false,
  isAdmin: false,
  isOrganization: false,
  credits: 0,
  info: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    country: '',
    language: '',
    avatar: '',
    registeredAt: '',
    organization: {
      id: '',
      name: '',
      legalName: '',
    },
    organizationRole: '',
    subscriptions: [],
    preferences: {
      ui: {
        mode: null,
        artist: {
          version: null,
          allow_v3: false,
        },
      },
    },
  },
  upload: {
    status: false,
    progress: 0,
  },
};

const getters = {
  isLogin: state => state.isLogin,
  isNotLogin: state => state.isNotLogin,
  isMember: state => state.isMember,
  isArtist: state => state.isArtist,
  isReseller: state => state.isReseller,
  isAdmin: state => state.isAdmin,
  isOrganization: state => state.isOrganization,

  getMemberInfo: state => state.info,
  getOrganizationInfo: state => state.info.organization,

  getPreferencesUIMode: state => state.info.preferences.ui.mode,
  getPreferencesArtistVersion: state => state.info.preferences.ui.artist.version,
  getPreferencesArtistAllowV3: state => state.info.preferences.ui.artist.allow_v3,
};

const actions = {

  checkToken() {
    return api.getMemberInfo();
  },

  setLoginStatus({ commit }, bool) {
    commit('setLoginStatus', bool);
  },

  getMember() {
    return api.getMemberInfo();
  },

  setMemberName({ commit }, info) {
    commit('setMemberName', info);
  },

  setMemberInfo({ commit }, info) {
    commit('setMemberInfo', info);
  },

  // eslint-disable-next-line
  doChangeMemberSetting({ state }, payload) {
    return api.changeMemberSetting(payload);
  },

};

const mutations = {

  setLoginStatus(state, bool) {
    if (bool === true) {
      state.isTokenAuth = true;
      state.isLogin = true;
      state.isNotLogin = false;
      state.isMember = true;
    } else {
      state.isTokenAuth = false;
      state.isLogin = false;
      state.isNotLogin = true;
      state.isMember = false;
    }
  },

  setMemberName(state, member) {
    state.isLogin = member.email ? true : false;
    state.info.firstName = member.first_name;
    state.info.lastName = member.last_name;
    state.info.userName = member.username;
    state.info.email = member.email;
    state.info.avatar = member.avatar;
    state.info.subscriptions = member.subscriptions;

    // direct by marksun
    state.info.firstName = member.first_name;
    state.info.lastName = member.last_name;
    state.info.username = member.username;
    state.info.email = member.email;
    state.info.avatar = member.avatar;
    state.info.subscriptions = member.subscriptions;
  },

  setMemberInfo(state, result) {
    state.isLogin = result.email ? true : false;
    state.isNotLogin = result.email ? false : true;
    state.isArtist = result.artist ? true : false;
    state.isReseller = result.reseller ? true : false;
    state.isAdmin = result.admin ? true : false;
    state.isOrganization = result.organization.id ? true : false;

    state.credits = result.credits;
    state.info.firstName = result.first_name;
    state.info.lastName = result.last_name;
    state.info.userName = result.username;
    state.info.email = result.email;
    state.info.country = result.country;
    state.info.currency = result.currency;
    state.info.language = result.language;
    state.info.avatar = result.avatar.url;
    state.info.registeredAt = result.registered_at;
    state.info.subscriptions = result.subscriptions;

    state.info.organization.id = result.organization.id;
    state.info.organization.name = result.organization.name;
    state.info.organization.legalName = result.organization.legal_name;
    state.info.organizationRole = result.organization_role;

    state.info.preferences.ui.mode = lodashGet(result.preferences.ui, 'mode', 'light');
    state.info.preferences.ui.artist.version = lodashGet(result.preferences.ui.artist, 'version', null);
    state.info.preferences.ui.artist.allow_v3 = lodashGet(result.preferences.ui.artist, 'allow_v3', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
