
const state = {
  path: '',
  fullPath: '',
};

const getters = {
  path: () => state.path,
  fullPath: () => state.fullPath,
};

const actions = {
  setRoute({ commit }, route) {
    commit('setPath', route.path);
    commit('setFullPath', route.fullPath);
  },
};

const mutations = {
  setPath(state, path) {
    state.path = path;
  },

  setFullPath(state, path) {
    state.fullPath = path;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
