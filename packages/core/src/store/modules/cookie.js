const state = {
  info: {},
};

const getters = {
  getApiToken: state => state.info.ME_jwt,
  getCookies: state => state.info,
};

const actions = {

  setApiToken({ commit }, token) {
    commit('setApiToken', token);
  },
  setCookies({ commit }, cookies) {
    commit('setCookies', cookies);
  },

};

const mutations = {

  setApiToken: (state, token) => {
    state.info.ME_jwt = token;
  },
  setCookies: (state, cookies) => {
    state.info = cookies;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
