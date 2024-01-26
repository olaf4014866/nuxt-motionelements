import * as favoritesApi from '@/api/favorites.js';

const state = {
  defaultFolder: {
    totalCount: 0,
  },
};

const getters = {
};

const actions = {

  async addFavoriteItem({ commit }, payload) {
    const folderId = _.get(payload, 'folderId', 'default');
    const sku = _.get(payload, 'product.id');
    return favoritesApi.addFavoriteItem(sku, folderId).then((response) => {
      // if (response.status === 201) {
      if (folderId === 'default' && _.has(response, 'data.data.totalCount')) {
        commit('setDefaultFolderTotalCount', response.data.data.totalCount);
      }
      // }
      return response;
    });
  },
};

const mutations = {

  setDefaultFolderTotalCount: (state, count) => {
    state.defaultFolder.totalCount = count;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
