
const state = {
  show: false,
  message: '',
};

const getters = {
};

const actions = {

  show({ commit }, payload) {
    commit('show', payload);
  },

  hide({ commit }) {
    commit('hide');
  },

};

const mutations = {

  show: (state, payload) => {
    state.show = true;
    state.message = _.get(payload, 'message') || '';
  },

  hide: (state) => {
    state.show = false;
    state.message = '';
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
