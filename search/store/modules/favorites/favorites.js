import * as api from '@/api/favorites-page.js';

const state = {
  isSelectedAllElementTypes: false,
  selectedElementTypes: [],
  selectedDownloadStatus: 'all',

  currentListMode: 'folder',
  currentFolderId: '',
  currentFolderInfo: {},

  contentList: [],
  sidebarList: [],

  showMoreFolder: false,

  editingFolderInfo: {},

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
    pageNow: 1,
    pageTotal: 0,
    itemPerPage: 12,
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

  pageNow: state => state.pagination.pageNow,
  pageTotal: state => state.pagination.pageTotal,
  itemPerPage: state => state.pagination.itemPerPage,
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

  // eslint-disable-next-line
  getFavoritesContentList({ commit }, info) {
    // console.log('getFavoritesContentList', info);

    const folderId = info.id;
    const params = new URLSearchParams();

    params.append('language', info.currentLanguage);
    params.append('page', info.pageNow);
    params.append('per_page', info.itemPerPage);
    params.append('downloadable', info.downloadable);

    // todo : fix safari cache issue
    params.append('timestamp', new Date().getTime());

    if (_.isArray(info.elementTypes)) {
      info.elementTypes.forEach((elementType) => {
        params.append('mt[]', elementType);
      });
    }

    return api.getFavoritesContentList(folderId, params);
  },

  setFavoriteContentList({ commit }, list) {
    commit('setFavoriteContentList', list);
  },

  resetFavoritesContentList({ commit }) {
    commit('resetFavoritesContentList');
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
  doCopyFavorites({ commit }, info) {
    console.log('doCopyFavorites', info);

    if (!_.size(info.fromFolderId) || !_.size(info.elements)) {
      return false;
    }

    const fromFolderId = info.fromFolderId;
    const params = new URLSearchParams();
    info.elements.forEach((element) => {
      params.append('skus[]', element);
    });

    return api.copyFavorites(fromFolderId, params);
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

    const params = new URLSearchParams();
    info.elements.forEach((element) => {
      params.append('skus[]', element);
    });
    console.log(params);

    return api.addElementsToCart(params);
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

  setPageNow({ commit }, page) {
    commit('setPageNow', page);
  },

  setPageTotal({ commit }, page) {
    commit('setPageTotal', page);
  },

  setItemPerPage({ commit }, number) {
    commit('setItemPerPage', number);
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
  setPageNow(state, page) {
    state.pagination.pageNow = page;
  },

  setPageTotal(state, page) {
    state.pagination.pageTotal = page;
  },

  setItemPerPage(state, number) {
    state.pagination.itemPerPage = number;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
