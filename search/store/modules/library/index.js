import * as api from '@/api/favorites-page.js';
import * as favoritesApi from '@/api/favorites.js';
import * as historyApi from '@/api/history.js';
import * as cartApi from '@motionelements/core/src/api/cart';

const state = {
  isSelectedAllElementTypes: false,
  selectedElementTypes: [],
  selectedDownloadStatus: 'all',

  currentListMode: 'folder',
  currentFolderId: '',
  currentFolderInfo: {
    items: {
      totalCount: 0,
    },
  },

  contentList: [],
  sidebarList: [],

  folders: [],

  showMoreFolder: false,

  editingFolderInfo: {
    items: {
      totalCount: 0,
    },
  },

  isMobileSidebarActive: false,
  loading: {
    status: true,
  },
  loadingLoop: {
    status: false,
    message: '',
  },
  loadingProgress: {
    status: false,
    message: '',
    progress: 0,
  },

  pagination: {
    // new
    totalCount: 0,
    currentPage: 1,
    perPage: 24,

    // pageNow: 1,
    // pageTotal: 0,
    // itemPerPage: 12,
  },
};

const getters = {
  isSelectedAllelementTypes: state => state.isSelectedAllelementTypes,
  selectedElementTypes: state => state.selectedElementTypes,
  selectedDownloadStatus: state => state.selectedDownloadStatus,

  currentListMode: state => state.currentListMode,
  currentFolderId: state => state.currentFolderId,
  currentFolderInfo: state => state.currentFolderInfo,

  contentList: state => state.contentList,
  sidebarList: state => state.sidebarList,
  showMoreFolder: state => state.showMoreFolder,

  editingFolderInfo: state => state.editingFolderInfo,

  getFavoritesFolders: state => state.sidebarList,
  // pageNow: state => state.pagination.pageNow,
  // pageTotal: state => state.pagination.pageTotal,
  // itemPerPage: state => state.pagination.itemPerPage,

  getPerPage: state => state.pagination.perPage,
  getCurrentPage: state => state.pagination.currentPage,
  getTotalCount: state => state.pagination.totalCount,
  getTotalPageCount: state => Math.ceil(state.pagination.totalRows / state.pagination.perPage),

  getCurrentFolder: (state) => {
    if (state.currentFolderId) {
      // return state.folders.filter(item => item.id === state.currentFolderId);
      return state.folders.find(folder => folder.id === state.currentFolderId);
    }
    return null;
  },

  // getCurrentFolder: state => state.editingFolderInfo,

  // getCurrentPage: state => state.pagination.pageNow,
  // getPageTotal: state => state.pagination.pageTotal,
  // getItemPerPage: state => state.pagination.itemPerPage,
};

const actions = {

  setIsSelectedAllelementTypes({ commit }, bool) {
    commit('setIsSelectedAllelementTypes', bool);
  },

  setSelectedElementTypes({ commit }, elementTypes) {
    commit('setSelectedElementTypes', elementTypes);
  },

  setSelectedDownloadStatus({ commit }, status) {
    commit('setSelectedDownloadStatus', status);
  },

  setCurrentListMode({ commit }, mode) {
    commit('setCurrentListMode', mode);
  },

  setCurrentFolderId({ commit }, folderId) {
    commit('setCurrentFolderId', folderId);
  },

  setCurrentFolderInfo({ commit }, info) {
    commit('setCurrentFolderInfo', info);
  },

  changeFolder({ commit }, folderId) {
    console.log('changeFolderId', folderId);

    // reset all values
    commit('setCurrentFolderId', folderId);
  },


  setFavoriteContentList({ commit }, list) {
    commit('setFavoriteContentList', list);
  },

  resetFavoritesContentList({ commit }) {
    commit('resetFavoritesContentList');
  },

  // eslint-disable-next-line no-unused-vars
  listFavoritesFolders({ commit }, params) {
    return favoritesApi.listFolders(params).then((response) => {
      console.log('library/getFavoriteSidebarList', response.data.data);

      const sidebarList = response.data.data;

      // let mapKey = '';

      Object.keys(sidebarList).map((key) => {
        // create text for sitebar menu
        sidebarList[key].text = sidebarList[key].name;
        if (sidebarList[key].name === '') {
          // sidebarList[key].text = this.$i18n.t('favorites.untitled');
          sidebarList[key].text = 'untitled';
        }
      });

      commit('setFolders', sidebarList);
    })
      .catch((error) => {
        // handle error
        console.error('library/listFavoritesFolders', error);
        commit('setLoading', { status: false });
      });
  },

  // eslint-disable-next-line
  listFavoritesFolderItems({ commit, state }, info) {

    console.log('listFavoritesFolderItems', info);

    commit('setLoading', { status: true });

    const folderId = info.id;

    const pagination = state.pagination;

    const params = {
      page: pagination.currentPage,
      per_page: pagination.perPage,
      downloadable: _.get(info, 'downloadable'),
      // todo : fix safari cache issue
      timestamp: new Date().getTime(),
    };

    // const params = new URLSearchParams();

    // const pageNow = state.pageNow;
    // const itemPerPage = this.$store.getters['library/itemPerPage'];


    // setup pagination
    // params.append('page', pagination.pageNow);
    // params.append('per_page', pagination.itemPerPage);

    // params.append('downloadable', _.get(info, 'downloadable'));

    if (_.isArray(info.elementTypes)) {
      params.mt = info.elementTypes;
      // info.elementTypes.forEach((elementType) => {
      //   params.append('mt[]', elementType);
      // });
    }

    return favoritesApi.listFolderItems(folderId, params).then((response) => {
      console.log('getFavoritesContentList', response);

      // delete empty object from result
      // const result = _.compact(response.data.data);
      const data = response.data.data;

      // set pagination
      commit('setCurrentPage', response.data.page);
      commit('setPerPage', response.data.perPage);
      commit('setTotalCount', response.data.totalCount);

      commit('setFavoriteContentList', data);

      commit('setLoading', { status: false });
    })
      .catch((error) => {
        // handle error
        console.error('favorites/getFavoritesContentList error - ', error);
        commit('setLoading', { status: false });
      });
  },

  // eslint-disable-next-line
  listHistoryItems({ commit }, info) {
    // console.log('getFavoritesHistoryProductList', info);
    commit('setLoading', { status: true });

    const pagination = state.pagination;

    const params = {
      page: pagination.currentPage,
      per_page: pagination.perPage,
      // todo : fix safari cache issue
      timestamp: new Date().getTime(),
    };

    return historyApi.listHistoryItems('product-viewed', params).then((response) => {
      console.log('listHistoryItems', response);

      const data = response.data.data;

      // set pagination
      commit('setCurrentPage', response.data.page);
      commit('setPerPage', response.data.perPage);
      commit('setTotalCount', response.data.totalCount);

      commit('setFavoriteContentList', data);

      commit('setLoading', { status: false });
    })
      .catch((error) => {
        // handle error
        console.log('favorites/getFavoritesContentList error - ', error);
        commit('setLoading', { status: false });
      });
  },

  // eslint-disable-next-line no-unused-vars
  getFavoriteSidebarList({ state, commit, rootState }) {
    // const { filter } = state;
    const { site } = rootState;

    const params = new URLSearchParams();
    params.append('language', site.currentLanguage);

    return api.getFavoritesSidebarList(params);
  },

  setSidebarList({ commit }, list) {
    commit('setSidebarList', list);
  },

  // eslint-disable-next-line no-unused-vars
  createFavoritesFolder({ commit }, info) {
    console.log('doCreateFavoritesFolder', info);
    const params = new URLSearchParams();
    params.append('name', info.name);

    return api.createFavoritesFolder(params);
  },

  // eslint-disable-next-line no-unused-vars
  doCreateFavoritesFolder({ commit }, info) {
    console.log('doCreateFavoritesFolder', info);
    const params = new URLSearchParams();
    params.append('name', info.name);

    return api.createFavoritesFolder(params);
  },

  // eslint-disable-next-line no-unused-vars
  doDeleteFavoritesFolder({ commit }, folderId) {
    return api.deleteFavoritesFolder(folderId);
  },

  // eslint-disable-next-line no-unused-vars
  doRenameFavoritesFolder({ commit }, info) {
    const folderId = info.folderId;
    const params = new URLSearchParams();
    params.append('name', info.folderName);

    return api.renameFavoritesFolder(folderId, params);
  },

  // eslint-disable-next-line no-unused-vars
  doCopyFavorites({ commit }, params) {
    console.log('doCopyFavorites', params);

    if (!_.size(params.skus)) {
      return false;
    }

    const folderId = params.folderId || 'default';
    // const toFolderId = info.fromFolderId;
    // const params = new URLSearchParams();
    // const skus = [];
    // info.elements.forEach((element) => {
    //   params.append('skus[]', element);
    // });

    const skus = params.skus;
    return favoritesApi.addFavoriteItems(skus, folderId);
    // return api.copyFavorites(fromFolderId, params);
  },


  // eslint-disable-next-line no-unused-vars
  doMoveFavorites({ commit }, info) {
    console.log('doMoveFavorites', info);

    if (!_.size(info.fromFolderId) || !_.size(info.toFolderId) || !_.size(info.elements)) {
      return false;
    }

    const fromFolderId = info.fromFolderId;

    const params = new URLSearchParams();
    params.append('target_id', info.toFolderId);
    info.elements.forEach((element) => {
      params.append('skus[]', element);
    });

    console.log(fromFolderId);
    console.log(params);

    return api.moveFavorites(fromFolderId, params);
  },

  // eslint-disable-next-line no-unused-vars
  doDeleteFavorites({ commit }, info) {
    console.log('doDeleteFavorites', info);

    if (!_.size(info.fromFolderId) || !_.size(info.elements)) {
      return false;
    }

    const fromFolderId = info.fromFolderId;

    const params = new URLSearchParams();
    info.elements.forEach((element) => {
      params.append('skus[]', element);
    });

    console.log(fromFolderId);
    console.log(params);

    return api.deleteFavorites(fromFolderId, params);
  },

  // eslint-disable-next-line no-unused-vars
  doShareFavorites({ commit }, info) {
    console.log('doShareFavorites', info);

    if (!_.size(info.folderId) || !_.size(info.emails)) {
      console.log('doShareFavorites no info');
      return false;
    }

    const folderId = info.folderId;

    const params = new URLSearchParams();

    const recaptchaToken = info.recaptchaToken;
    params.append('g-recaptcha-v3-response', recaptchaToken);

    info.emails.forEach((email) => {
      params.append('emails[]', email);
    });

    // console.log('doShareFavorites', folderId);
    // console.log('doShareFavorites', params);

    return api.shareFavorites(folderId, params);
  },

  // eslint-disable-next-line no-unused-vars
  doAddElementsToCart({ commit }, info) {
    console.log('doAddElementsToCart', info);

    if (!_.size(info.elements)) {
      return false;
    }

    const params = {
      skus: [],
    };

    // const params = new URLSearchParams();
    info.elements.forEach((element) => {
      params.skus.push(element);
      // params.append('skus[]', element);
    });
    console.log(params);

    return cartApi.addItems(params);
  },

  // new
  // eslint-disable-next-line no-unused-vars
  addElementsToCart({ commit }, payload) {
    console.log('doAddElementsToCart', payload);

    if (!_.size(payload.skus)) {
      return false;
    }

    const params = {
      skus: payload.skus,
    };

    return cartApi.addItems(params).then((response) => {
      console.log('added elements to cart', response);
      return response;
    });
  },

  setShowMoreFolder({ commit }, bool) {
    commit('setShowMoreFolder', bool);
  },

  setEditingFolderInfo({ commit }, info) {
    commit('setEditingFolderInfo', info);
  },

  // mobile sidebar
  enableMobileSidebar({ commit }) {
    commit('setMobileSidebarActive', true);
  },
  disableMobileSidebar({ commit }) {
    commit('setMobileSidebarActive', false);
  },

  // loading
  setLoading({ commit }, params) {
    commit('setLoading', params);
  },

  setLoadingLoop({ commit }, params) {
    commit('setLoadingLoop', params);
  },

  setLoadingProgress({ commit }, params) {
    commit('setLoadingProgress', params);
  },

  setCurrentPage({ commit }, number) {
    commit('setCurrentPage', parseInt(number, 10));
  },

  setTotalCount({ commit }, number) {
    commit('setTotalCount', parseInt(number, 10));
  },

  setPerPage({ commit }, number) {
    commit('setPerPage', parseInt(number, 10));
  },


};

const mutations = {

  setIsSelectedAllelementTypes(state, bool) {
    state.isSelectedAllelementTypes = bool;
  },

  setSelectedElementTypes(state, elementTypes) {
    state.selectedElementTypes = elementTypes;
  },

  setSelectedDownloadStatus(state, status) {
    state.selectedDownloadStatus = status;
  },

  setCurrentListMode(state, mode) {
    state.currentListMode = mode;
  },

  setFavoriteContentList(state, list) {
    state.contentList = list;
  },

  resetFavoritesContentList(state) {
    state.contentList = [];
  },

  setCurrentFolderId(state, folderId) {
    state.currentFolderId = folderId;
  },

  setCurrentFolderInfo(state, info) {
    state.currentFolderInfo = info;
  },

  setSidebarList(state, list) {
    state.sidebarList = list;
    state.folders = list;
  },

  setFolders(state, list) {
    state.sidebarList = list;
    state.folders = list;
  },

  setShowMoreFolder(state, bool) {
    state.showMoreFolder = bool;
  },

  setEditingFolderInfo(state, info) {
    console.log(info);
    state.editingFolderInfo = info;
  },

  setMobileSidebarActive: (state, active) => {
    state.isMobileSidebarActive = active;
  },

  setLoading: (state, params) => {
    state.loading.status = params.status;
  },
  setLoadingLoop: (state, params) => {
    state.loadingLoop.status = params.status;

    if (params.message) {
      state.loadingLoop.message = params.message;
    }
  },
  setLoadingProgress: (state, params) => {
    state.loadingProgress.status = params.status;

    if (params.message) {
      state.loadingProgress.message = params.message;
    }

    if (params.progress) {
      state.loadingProgress.progress = params.progress;
    }
  },

  // pagination
  setCurrentPage(state, number) {
    state.pagination.currentPage = number;
  },

  setPerPage(state, number) {
    state.pagination.perPage = number;
  },

  setTotalCount(state, number) {
    state.pagination.totalCount = number;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
