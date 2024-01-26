import * as api from '@/api/index';

const mediaTypeList = [
  // After Effects
  {
    id: 'ae',
    mt: 'ae',
    code: null,
    value: ['8', '19'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-after-effects-square',
    iconClassSecond: 'icon-after-effects',
    api: 'ae',
    mainMediaType: 'ae',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'ae-template',
    mt: '8',
    code: 8,
    value: ['8'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-after-effects-square',
    iconClassSecond: 'icon-after-effects',
    api: 'ae-template',
    mainMediaType: 'ae',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'ae-preset',
    mt: '19',
    code: 19,
    value: ['19'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-after-effects-square',
    iconClassSecond: 'icon-after-effects',
    api: 'ae-preset',
    mainMediaType: 'ae',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },

  // Premiere Pro
  {
    id: 'pr',
    mt: 'pr',
    code: null,
    value: ['15', '16', '20'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-premiere-pro',
    iconClassSecond: 'icon-premiere-pro',
    api: 'pr',
    mainMediaType: 'pr',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'pr-template',
    mt: '15',
    code: 15,
    value: ['15'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-premiere-pro',
    iconClassSecond: 'icon-premiere-pro',
    api: 'pr-template',
    mainMediaType: 'pr',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'pr-preset',
    mt: '20',
    code: 20,
    value: ['20'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-premiere-pro',
    iconClassSecond: 'icon-premiere-pro',
    api: 'pr-preset',
    mainMediaType: 'pr',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'mg-template',
    mt: '16',
    code: 16,
    value: ['16'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-mogrt',
    iconClassSecond: 'icon-mogrt',
    api: 'mg-template',
    mainMediaType: 'mg-template',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },

  // Videos
  {
    id: 'video',
    mt: 'video',
    code: null,
    value: ['3', '4'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-video',
    iconClassSecond: 'icon-video',
    api: 'video',
    mainMediaType: 'video',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'animation',
    mt: '3',
    code: 3,
    value: ['3'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-animation',
    iconClassSecond: 'icon-animation',
    api: 'animation',
    mainMediaType: 'video',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'video-live',
    mt: '4',
    code: 4,
    value: ['4'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-video',
    iconClassSecond: 'icon-video',
    api: 'video-live',
    mainMediaType: 'video',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },
  {
    id: 'video-vr',
    mt: '12',
    code: 12,
    value: ['12'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-vr',
    iconClassSecond: 'icon-vr',
    api: 'video-vr',
    mainMediaType: 'video',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },

  // Music
  {
    id: 'music',
    mt: '6',
    code: 6,
    value: ['6'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-music',
    iconClassSecond: 'icon-music',
    api: 'music',
    mainMediaType: 'music',
    isMainMediaType: true,
    isAudio: true,
    isImage: false,
  },

  // Image
  {
    id: 'image',
    mt: 'image',
    code: null,
    value: ['1', '2', '14'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-image',
    iconClassSecond: 'icon-image',
    api: 'image',
    mainMediaType: 'image',
    isMainMediaType: true,
    isAudio: false,
    isImage: true,
  },
  {
    id: 'photo',
    mt: '1',
    code: 1,
    value: ['1'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-image',
    iconClassSecond: 'icon-image',
    api: 'photo',
    mainMediaType: 'image',
    isMainMediaType: true,
    isAudio: false,
    isImage: true,
  },
  {
    id: 'vector',
    mt: '2',
    code: 2,
    value: ['2'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-vector',
    iconClassSecond: 'icon-vector',
    api: 'vector',
    mainMediaType: 'image',
    isMainMediaType: false,
    isAudio: false,
    isImage: true,
  },
  {
    id: 'gif',
    mt: '14',
    code: 14,
    value: ['14'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-images',
    iconClassSecond: 'icon-images',
    api: 'gif',
    mainMediaType: 'image',
    isMainMediaType: false,
    isAudio: false,
    isImage: true,
  },

  // Sound effect - SFX
  {
    id: 'sfx',
    mt: '7',
    code: 7,
    value: ['7'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-sfx',
    iconClassSecond: 'icon-sfx',
    api: 'sfx',
    mainMediaType: 'sfx',
    isMainMediaType: true,
    isAudio: true,
    isImage: false,
  },

  // Apple Motion Templates
  {
    id: 'motion-template',
    mt: '9',
    code: 9,
    value: ['9'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-apple-motion',
    iconClassSecond: 'icon-apple-motion',
    api: 'motion-template',
    mainMediaType: 'motion-template',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },

  // 3D Models
  {
    id: '3d-model',
    mt: '5',
    code: 5,
    value: ['5'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-3d-model',
    iconClassSecond: 'icon-3d-model',
    api: '3d-model',
    mainMediaType: '3d-model',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },

  // lottie
  {
    id: 'lottie',
    mt: '21',
    code: 21,
    value: ['21'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-lottie',
    iconClassSecond: 'icon-lottie',
    api: 'lottie',
    mainMediaType: 'lottie',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
];

const state = {
  window: {
    width: 1200,
  },
  notify: {
    searchBeta: {
      status: false,
    },
    messages: {
      status: false,
      contents: [],
    },
  },
  isMobile: false,
  isMobileFacetsActive: false,
  isMobileAccountSidebarActive: false,
  loadingSearch: {
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
  cart: {
    count: false,
    items: {},
  },
  favorites: {
    count: {
      default: false,
    },
  },
  terms: {},
  currentMediaType: {},
  supportedMediaTypes: mediaTypeList,
  currentLanguage: 'en',
  supportedLanguages: {
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
    'zh-hant': '中文(繁體)',
    'th': 'ไทย',
    'de': 'Deutsch',
    'es': 'Español',
    'fr': 'Français',
  },
  currentCurrency: 'usd',
  currentCurrencySymbol: 'US$',
  supportedCurrencies: {},
};

const getters = {
  windowWidth: state => state.window.width,

  notifySearchBeta: state => state.notify.searchBeta,
  notifyMessages: state => state.notify.messages,

  isMobile: state => state.isMobile,
  currentLanguage: state => state.currentLanguage,
  currentCurrency: state => state.currentCurrency,
  currentMediaType: state => state.currentMediaType,

  mapLanguages: state => state.supportedLanguages,
  mapCurrencies: state => state.supportedCurrencies,
  mapMediaTypes: state => state.supportedMediaTypes,

  favoritesCountDefault: state => state.favorites.count.default,
  cartItemsCount: state => state.cart.count,
  cartItemsInfo: () => state.cart.items,
};

const actions = {

  setWindowWidth({ commit }, width) {
    commit('setWindowWidth', width);
  },

  setNotifySearchBeta({ commit }, info) {
    commit('setNotifySearchBeta', info);
  },

  setNotifyMessages({ commit }, info) {
    commit('setNotifyMessages', info);
  },

  setIsMobile({ commit }, bool) {
    commit('setIsMobile', bool);
  },

  setSupportedMediaTypes({ commit }, info) {
    commit('setSupportedMediaTypes', info);
  },

  setCurrentMediaType({ commit }, info) {
    commit('setCurrentMediaType', info);
  },

  setSupportedCurrencies({ commit }, params) {
    commit('setSupportedCurrencies', params);
  },

  setLoadingSearch({ commit }, params) {
    commit('setLoadingSearch', params);
  },

  setLoadingLoop({ commit }, params) {
    commit('setLoadingLoop', params);
  },

  setLoadingProgress({ commit }, params) {
    commit('setLoadingProgress', params);
  },

  setCurrentCurrency({ commit }, currency) {
    commit('setCurrentCurrency', currency);
  },

  setCurrentLanguage({ commit }, lang) {
    commit('setCurrentLanguage', lang);
  },

  setFavoritesCount({ commit }, favorites) {
    commit('setFavoritesCount', favorites);
  },

  enableMobileFacets({ commit }) {
    commit('setMobileFacetsActive', true);
  },
  disableMobileFacets({ commit }) {
    commit('setMobileFacetsActive', false);
  },
  enableMobileAccountSidebar({ commit }) {
    commit('setMobileAccountSidebarActive', true);
  },
  disableMobileAccountSidebar({ commit }) {
    commit('setMobileAccountSidebarActive', false);
  },

  getUploadSetting() {
    return api.getUploadSetting();
  },

  // eslint-disable-next-line
  doUploadMediaToS3({ state }, params) {
    return api.doUploadMediaToS3(params);
  },

  // eslint-disable-next-line
  getUploadAnalyze({ state }, params) {
    return api.getUploadAnalyze(params);
  },

  getTerms({ rootState }) {
    const info = rootState.search.filter;
    return api.getSiteTerms(info);
  },
  getFavoritesCount() {
    const info = {
      favoritesId: 'default',
    };
    return api.getFavoritesCount(info);
  },
  addFavorites(state, element) {
    const info = {
      id: element.id,
    };
    return api.addFavorites(info);
  },
  getCart({ state }) {
    const info = state.filter;
    return api.getCartInfo(info);
  },
};

const mutations = {

  setNotifySearchBeta: (state, info) => {
    state.notify.searchBeta = info;
  },

  setNotifyMessages: (state, info) => {
    state.notify.messages = info;
  },

  setWindowWidth: (state, width) => {
    state.window.width = width;
  },

  setIsMobile: (state, bool) => {
    state.isMobile = bool;
  },

  setSupportedMediaTypes: (state, info) => {
    state.supportedMediaTypes = info;
  },

  setCurrentMediaType: (state, info) => {
    state.currentMediaType = info;
  },

  setSupportedCurrencies: (state, currencies) => {
    state.supportedCurrencies = currencies;
  },

  setCart(state, result) {
    state.cart.count = _.size(result.data);
    state.cart.items = result.data;
  },
  setFavoritesCount: (state, result) => {
    const favoriteId = result.data.id;
    state.favorites.count = {};
    state.favorites.count[favoriteId] = result.data.item_count;
  },

  setLoadingSearch: (state, params) => {
    state.loadingSearch.status = params.status;
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

  setCurrentCurrency: (state, currency) => {
    state.currentCurrency = currency.toLowerCase();
  },
  setCurrentLanguage: (state, lang) => {
    state.currentLanguage = lang;
  },
  setMobileFacetsActive: (state, active) => {
    state.isMobileFacetsActive = active;
  },
  setMobileAccountSidebarActive: (state, active) => {
    state.isMobileAccountSidebarActive = active;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
