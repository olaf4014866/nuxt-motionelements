// import cookies from 'js-cookie';
import * as api from '@/api/index';

// import newMediaTypeList from '@motionelements/helper/mediatypes/index.js';

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
    id: 'fcp',
    mt: 'fcp',
    code: null,
    value: ['9'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-apple-motion',
    iconClassSecond: 'icon-apple-motion',
    api: 'fcp',
    mainMediaType: 'fcp',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
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
    mainMediaType: 'fcp',
    isMainMediaType: false,
    isAudio: false,
    isImage: false,
  },

  // 3D Models
  {
    id: '3d',
    mt: '3d',
    code: null,
    value: ['5'],
    name: '',
    nameShort: '',
    iconClassDefault: 'icon-3d-model',
    iconClassSecond: 'icon-3d-model',
    api: '3d',
    mainMediaType: '3d',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
  },
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
    mainMediaType: '3d',
    isMainMediaType: false,
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
  // resolve
  {
    id: 'resolve',
    mt: 'resolve',
    code: null,
    value: ['22', '23'],
    iconClassDefault: 'icon-davinci-resolve',
    iconClassSecond: 'icon-davinci-resolve-outline',
    api: 'resolve',
    mainMediaType: 'resolve',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
    hasAiSearch: false,
  },
  {
    id: 'resolve-template',
    mt: '22',
    code: 22,
    value: ['22'],
    iconClassDefault: 'icon-davinci-resolve',
    iconClassSecond: 'icon-davinci-resolve-outline',
    api: 'resolve-template',
    mainMediaType: 'resolve',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
    hasAiSearch: false,
  },
  {
    id: 'resolve-macro',
    mt: '23',
    code: 23,
    value: ['23'],
    iconClassDefault: 'icon-davinci-resolve',
    iconClassSecond: 'icon-davinci-resolve-outline',
    api: 'resolve-macro',
    mainMediaType: 'resolve',
    isMainMediaType: true,
    isAudio: false,
    isImage: false,
    hasAiSearch: false,
  },
];
//
// function tidyMediaTypesName(data) {
//   const mapMediaTypesName = data;
//
//   const supportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
//
//   // console.log('tidyMediaTypesName', mapMediaTypesName);
//   // console.log('tidyMediaTypesName', supportedMediaTypes);
//
//   Object.keys(supportedMediaTypes).map((key) => {
//     const mediaType = supportedMediaTypes[key].id;
//
//     let info = '';
//     switch (mediaType) {
//       default:
//       case 'ae':
//         info = _.find(mapMediaTypesName, { id: 'ae' });
//         break;
//       case 'ae-template':
//         info = _.find(mapMediaTypesName, { id: '8' });
//         break;
//       case 'ae-preset':
//         info = _.find(mapMediaTypesName, { id: '19' });
//         break;
//
//       case 'pr':
//         info = _.find(mapMediaTypesName, { id: 'pr' });
//         break;
//       case 'pr-template':
//         info = _.find(mapMediaTypesName, { id: '15' });
//         break;
//       case 'pr-preset':
//         info = _.find(mapMediaTypesName, { id: '20' });
//         break;
//       case 'mg-template':
//         info = _.find(mapMediaTypesName, { id: '16' });
//         break;
//
//       case 'video':
//         info = _.find(mapMediaTypesName, { id: 'video' });
//         break;
//       case 'video-live':
//         info = _.find(mapMediaTypesName, { id: '4' });
//         break;
//       case 'animation':
//         info = _.find(mapMediaTypesName, { id: '3' });
//         break;
//       case 'video-vr':
//         info = _.find(mapMediaTypesName, { id: '12' });
//         break;
//
//       case 'music':
//         info = _.find(mapMediaTypesName, { id: '6' });
//         break;
//
//       case 'image':
//         // case 'images':
//         info = _.find(mapMediaTypesName, { id: 'image' });
//         break;
//
//       case 'photo':
//         info = _.find(mapMediaTypesName, { id: '1' });
//         break;
//
//       case 'vector':
//         info = _.find(mapMediaTypesName, { id: '2' });
//         break;
//
//       case 'gif':
//         info = _.find(mapMediaTypesName, { id: '14' });
//         break;
//
//       case 'sfx':
//         info = _.find(mapMediaTypesName, { id: '7' });
//         break;
//
//       case 'fcp':
//         info = _.find(mapMediaTypesName, { id: 'fcp' });
//         break;
//
//       case 'motion-template':
//         info = _.find(mapMediaTypesName, { id: '9' });
//         break;
//
//       case '3d':
//         info = _.find(mapMediaTypesName, { id: '3d' });
//         break;
//       case '3d-model':
//         info = _.find(mapMediaTypesName, { id: '5' });
//         break;
//
//       case 'lottie':
//         info = _.find(mapMediaTypesName, { id: '21' });
//         break;
//
//       case 'resolve':
//         info = _.find(mapMediaTypesName, { id: 'resolve' });
//         break;
//       case 'resolve-template':
//         info = _.find(mapMediaTypesName, { id: '22' });
//         break;
//       case 'resolve-macro':
//         info = _.find(mapMediaTypesName, { id: '23' });
//         break;
//     }
//
//     supportedMediaTypes[key].name = _.get(info, 'name', '');
//     supportedMediaTypes[key].nameShort = _.get(info, 'name_short', '');
//   });
//   // console.log(supportedMediaTypes);
// }
//
// // set from cookie first
// function getMediaTypeList(languageCode) {
//   const data = mediaTypeList;
//
//   // const item = camelCaseKeys(mediaTypeList[languageCode || 'en']);
//
//   // convert to site format
//   return {
//     id: item.id,
//     mt: item.id,
//     code: item.code,
//     value: [],
//     name: item.name,
//     nameShort: item.nameShort,
//     iconClassDefault: '',
//     iconClassSecond: '',
//     api: item.id,
//     mainMediaType: item.group,
//     isMainMediaType: item.subMediaTypes.length > 0,
//     isAudio: item.audio,
//     isImage: item.group === 'image',
//   };
// }

const languageList = {
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'zh-hant': '中文(繁體)',
  'th': 'ไทย',
  'de': 'Deutsch',
  'es': 'Español',
  'fr': 'Français',
  'pt': 'Portuguese',
  'hu': 'Magyar',
  'it': 'Italiano',
  'ru': 'Pусский',
  'tr': 'Türkçe',
};

const state = {
  // core (@todo to move into core)
  isLoading: false,
  window: {
    width: 0,
  },
  supportedLanguageCodes: ['en'],
  isMobile: false,

  // search specific
  notify: {
    searchBeta: {
      status: false,
    },
    messages: {
      status: false,
      contents: [],
    },
  },

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
  // supportedMediaTypes: getMediaTypeList(),
  currentLanguage: 'en', // getInitialLanguageCode(),
  currentCurrency: 'usd', // getInitialCurrencyCode(),
  // currentLanguage: 'en',
  supportedLanguages: languageList,
  // currentCurrency: 'usd',
  currentCurrencySymbol: 'US$',
  supportedCurrencies: {},

  mediaTypes: ['video', 'music', 'ae', 'pr', 'fcp', 'resolve', 'image', 'sfx', '3d', 'lottie'],
};

const getters = {
  windowWidth: state => state.window.width,
  // windowWidth: () => window.innerWidth,

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

  mediaTypes: state => state.mediaTypes,
};

const actions = {

  // core
  setLoading({ commit }, bool) {
    commit('setLoading', bool);
  },

  setIsMobile({ commit }, bool) {
    commit('setIsMobile', bool);
  },

  setWindowWidth({ commit }, width) {
    commit('setWindowWidth', width);
  },

  setSupportedLanguageCodes({ commit }, languageCodes) {
    commit('setSupportedLanguageCodes', languageCodes);
  },

  setSupportedCurrencies({ commit }, params) {
    commit('setSupportedCurrencies', params);
  },

  // search specific
  setNotifySearchBeta({ commit }, info) {
    commit('setNotifySearchBeta', info);
  },

  setNotifyMessages({ commit }, info) {
    commit('setNotifyMessages', info);
  },

  setSupportedMediaTypes({ commit }, info) {
    commit('setSupportedMediaTypes', info);
  },

  setCurrentMediaType({ commit }, info) {
    commit('setCurrentMediaType', info);
  },

  setCart({ commit }, result) {
    commit('setCart', result);
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

  setCurrentLanguage({ commit }, languageCode) {
    // console.log('font', this.currentLanguage, languageCode);
    if (this.currentLanguage !== languageCode) {
      // const html = document.documentElement;
      // // set the html tag to local lang
      // html.setAttribute('lang', languageCode);

      commit('setCurrentLanguage', languageCode);
      // loadFonts(languageCode);
    }
  },

  setFavoritesDefaultCount({ commit }, count) {
    commit('setFavoritesDefaultCount', count);
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
  getMediaTypesInfo() {
    return api.getMediaTypesInfo();
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
  // eslint-disable-next-line
  async getProductDetails({ state }, sku) {
    const request = await api.getProductDetails(sku);
    return request;
  },
  // eslint-disable-next-line
  async getArtist({ state }, username1) {
    const request = await api.getArtist(username1);
    return request;
  },
};

const mutations = {

  // core
  setLoading: (state, bool) => {
    state.isLoading = bool;
  },

  setIsMobile: (state, bool) => {
    state.isMobile = bool;
  },

  setWindowWidth(state, width) {
    state.window.width = width;
    // @deprecated
    state.windowWidth = width;
  },

  setSupportedLanguageCodes: (state, languageCodes) => {
    state.supportedLanguageCodes = languageCodes;
  },

  // search specific
  setSupportedCurrencies: (state, currencies) => {
    const currencyMap = {};

    console.log('setCurrencies', currencies);

    currencies.forEach((element) => {
      const currencyName = element.code;
      currencyMap[currencyName] = element;
    });

    state.supportedCurrencies = currencyMap;
  },

  setNotifySearchBeta: (state, info) => {
    state.notify.searchBeta = info;
  },

  setNotifyMessages: (state, info) => {
    state.notify.messages = info;
  },

  setSupportedMediaTypes: (state, info) => {
    state.supportedMediaTypes = info;
  },

  setCurrentMediaType: (state, info) => {
    state.currentMediaType = info;
  },


  setCart(state, result) {
    state.cart.count = _.size(result.data);
    state.cart.items = result.data;
  },

  setFavoritesDefaultCount: (state, count) => {
    state.favorites.count.default = count;
  },
  setFavoritesCount: (state, result) => {
    const favoriteId = result.data.id;
    state.favorites.count[favoriteId] = result.data.items.total_count;
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
    if (currency) {
      state.currentCurrency = currency.toLowerCase();
    }
  },
  setCurrentLanguage: (state, languageCode) => {
    state.currentLanguage = languageCode;
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
