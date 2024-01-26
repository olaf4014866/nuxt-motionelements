import * as api from '@/api/index';

const state = {
  isTokenAuth: false,
  isMember: false,
  isLogin: false,
  isNotLogin: false,
  isArtist: false,
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
  isAdmin: state => state.isAdmin,
  isOrganization: state => state.isOrganization,
  getMemberInfo: state => state.info,
  getOrganizationInfo: state => state.info.organization,

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

  setMemberInfo(state, result) {
    state.isLogin = result.data.email ? true : false;
    state.isNotLogin = result.data.email ? false : true;
    state.isArtist = result.data.artist ? true : false;
    state.isAdmin = result.data.admin ? true : false;
    state.isOrganization = result.data.organization.id ? true : false;
    state.credits = result.data.credits;
    state.info.firstName = result.data.first_name;
    state.info.lastName = result.data.last_name;
    state.info.userName = result.data.username;
    state.info.email = result.data.email;
    state.info.country = result.data.country;
    state.info.language = result.data.language;
    state.info.currency = result.data.currency;
    state.info.language = result.data.language;
    state.info.avatar = result.data.avatar;
    state.info.registeredAt = result.data.registered_at;
    state.info.organization.id = result.data.organization.id;
    state.info.organization.name = result.data.organization.name;
    state.info.organization.legalName = result.data.organization.legal_name;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
