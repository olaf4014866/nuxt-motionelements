import * as api from '@/api/index';
import * as searchApi from '@/api/search.js';
import * as termsApi from '@/api/terms.js';
import axios from 'axios';

const state = {
  default: {
    filter: {
      productModal: 0,

      // inputSort: 'match',
      // sort: 'match',

      // itemPerPage: 50,
      //
      // pageTotal: 0,
      // page: 0,

      // mediaType: '',
      // searchKeyword: '',
      // program: '',
      //
      // subscription: 0,
      // editable: 0,
      // tutorial: 0,
      // plugin: 0,
      // skill: 0,
      // textspace: 0,
      // alpha: 0,
      // loop: 0,
      //
      // softwareVersion: '',
      // orientation: '',
      // resolution: '',
      // fps: '',
      //
      // type: '',
      // size: '',
      // category: '',
      // style: '',
      // color: '',
      // genre: '',
      // instrument: '',
      // mood: '',
      // durationRange: '',
      // framing: '',
      // bpmRange: '',
      // priceRange: '',
      // license: '',

      similar: '',

      // artist: '',
    },
    filterBar: {

      // subscription: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      //
      // editable: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // tutorial: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // plugin: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // skill: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // textspace: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // alpha: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // loop: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      //
      // softwareVersion: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // orientation: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // resolution: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // fps: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // type: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // size: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // category: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // style: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // color: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      //
      // genre: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // instrument: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // mood: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // durationRange: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // framing: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // bpmRange: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // priceRange: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      // license: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },
      //
      // artist: {
      //   status: false,
      //   value: '',
      //   text: '',
      // },

      similar: {
        status: false,
        mode: '',
        id: '',
        productName: '',
        productUrl: '',
        imageUrl: '',
        imageFilename: '',
        // audioUrl: '',
      },
    },
  },

  searchBar: {
    inputKeyword: '',
    isFocused: false,
    activeMenu: false,
  },

  // move out from filter.search
  keyword: '',

  terms: {},

  mediaType: null,

  // filter mapping list
  isMediaTypeTermsLoaded: false,
  softwareVersions: [],
  types: [],
  categories: [],
  styles: [],
  genres: [],
  instruments: [],
  moods: [],

  // @deprecated
  licenses: {},

  elements: {},
  collections: {},
  asideElements: {},
  crossSellElements: {},

  typeahead: {
    keywords: [],
  },
  // hasSuggestionKeyword: false,
  // hasSuggestionArtist: false,
  suggestion: {
    keywords: [],
    artists: [],
  },
  mediaTypeTabs: [
    {
      id: '',
      name: 'All',
      count: 0,
    },
  ],
  sort: 'popular',
  facets: {},
  filter: {},
  hasFilterBar: false,
  filterBar: {},
  error: {
    code: '',
    message: '',
  },

  // https://github.com/axios/axios/issues/1361#issuecomment-366807250
  // to cancel old search request to prevent race condition
  cancelTokens: {},

  pagination: {
    totalCount: 0,
    currentPage: 1,
    perPage: 50,
  },
};


const getters = {

  searchBar: state => state.searchBar,

  mediaTypeTabs: state => state.mediaTypeTabs,

  allSearchElements: state => state.elements,
  allSearchAsideElements: state => state.asideElements,
  allSearchCollections: state => state.collections,
  allSearchCrossSellElements: state => state.crossSellElements,

  hasAsideElements: state => _.size(state.asideElements) > 0,
  hasCrossSellElements: state => _.size(state.crossSellElements) > 0,

  allSearchFilter: state => state.filter,
  allSearchFilterBar: state => state.filterBar,
  allSearchFacets: state => state.facets,

  sort: state => state.sort,
  keyword: state => state.keyword,

  mapVersions: state => state.softwareVersions,
  // mapSizes: state => state.terms.size,
  mapTypes: state => state.types,
  mapGenres: state => state.genres,
  mapMoods: state => state.moods,
  mapInstruments: state => state.instruments,
  mapCategories: state => state.categories,
  mapStyles: state => state.styles,

  getFieldSchema: state => (field) => {
    switch (field) {
      case 'softwareVersion':
        return state.softwareVersions;
      case 'type':
        return state.types;
      case 'genre':
        return state.genres;
      case 'mood':
        return state.moods;
      case 'instrument':
        return state.instruments;
      case 'category':
        return state.categories;
      case 'style':
        return state.styles;
      default:
        return null;
    }
  },

  // facetAttribute: state => state.facets.attribute,
  // facetSizes: state => state.facets.size,

  facetMediaType: state => state.facets.mt,

  // facetEditable: state => state.facets.editable,
  // facetTutorial: state => state.facets.tutorial,
  // facetPlugin: state => state.facets.plugin,
  // facetSkill: state => state.facets.skill,
  // facetTextspace: state => state.facets.textspace,
  // facetAlpha: state => state.facets.alpha,
  // facetLoop: state => state.facets.loop,

  facetVersions: state => state.facets.software_version,
  facetOrientations: state => state.facets.orientation,
  facetResolutions: state => state.facets.resolution,
  facetFps: state => state.facets.fps,

  facetTypes: state => state.facets.type,
  facetSizes: state => state.facets.size,
  facetCategories: state => state.facets.category,
  facetStyles: state => state.facets.style,
  // facetColor: state => state.facets.style,

  facetGenres: state => state.facets.genre,
  facetInstruments: state => state.facets.instrument,
  facetMoods: state => state.facets.mood,

  facetDurationRange: state => state.facets.duration_range,
  facetFramings: state => state.facets.framing,

  facetBpmRange: state => state.facets.bpm_range,
  facetPriceRange: state => state.facets.price_range,
  facetLicenses: state => state.facets.license,

  perPage: state => state.pagination.perPage,
  currentPage: state => state.pagination.currentPage,
  totalCount: state => state.pagination.totalCount,
  totalPageCount: state => Math.ceil(state.pagination.totalRows / state.pagination.perPage),

};

function buildSearchParams(state) {
  const filter = state.filter;
  const pagination = state.pagination;
  const sort = state.sort;

  // use new sort
  delete filter.sort;
  delete filter.inputSort;


  const params = {
    page: pagination.currentPage || 1,
    perPage: pagination.perPage || 50,
    sort: sort,
    facetarray: 1, // return facets in array, to prevent camelCaseKeys issue
  };

  if (state.keyword) {
    params.q = state.keyword;
  }

  if (state.keyword.length && !sort) {
    params.sort = 'match';
  }

  if (filter.subscription === 1) {
    params.subscription = 1;
  }

  if (filter.category) {
    params.cat = filter.category;
  }

  if (filter.bpmRange) {
    params.tempo = filter.bpmRange;
  }

  if (filter.durationRange) {
    params.duration = filter.durationRange;
  }

  const validKeys = [
    'editable', 'tutorial', 'plugin',
    'skill', 'textspace', 'alpha', 'loop',

    'color',
    'orientation', 'resolution', 'fps',
    'type', 'size', 'style',

    // music
    'genre', 'instrument', 'mood',
    'noYoutubeContentId',

    'duration', 'framing',
    'license', 'artist',

    'similar', 'priceRange', 'softwareVersion', 'program',

    // 3d
    'polygon', 'format',
    'source',

    // ae
    'plugin',
    'noPlugin',
  ];

  // const params = new URLSearchParams();
  Object.keys(filter).forEach((key) => {
    if (validKeys.includes(key)) {
      const value = filter[key];

      // console.log(key, value);
      switch (key) {
        case 'noPlugin':
          if (value) {
            params.plugin = -1;
          }
          break;

        default:
          if (value || value === false) {
            params[key] = value;
          }
      }
    }
  });

  // if (filter.color) {
  //   params.similar = filter.color;
  // }

  return params;
}

/*
function tidySearchResultFacets(facets) {
 // console.log('tidySearchResult', result);
 // const currentMediaType = store.getters['site/currentMediaType'];
 // console.log('tidySearchResult mapVersions:', currentMediaType.mainMediaType);


 if (_.has(facets, 'softwareVersion')) {
   // set software_version
   const map = store.getters['search/getFieldSchema']('softwareVersion');

   if (map) {
     facets.softwareVersion.forEach((data) => {
       const schema = map.find(x => x.version === data.value);

       if (schema) {
         // old API
         data.name = schema.display_version;
       }
     });
   } else {
     console.error('MAP not found', 'softwareVersion');
   }
 }

 // eslint-disable-next-line no-plusplus
 ['type', 'genre', 'instrument', 'category', 'style', 'mood'].forEach((field) => {
   if (_.has(facets, field)) {
     // set software_version
     const map = store.getters['search/getFieldSchema'](field);

     if (map) {
       facets[field].forEach((data) => {
         const schema = map.find(x => x.id === data.value.toString());

         if (schema) {
           data.name = schema.name;
         }
       });
     } else {
       console.error('MAP not found', field);
     }
   }
 });

 // ['durationRange', 'bpmRange', 'priceRange'].forEach((field) => {
 //   if (_.has(facets, field)) {
 //     facets[field].forEach((data) => {
 //       const [min, max] = data.value;
 //       data.min = min;
 //       data.max = max;
 //     });
 //   }
 // });

 return facets;


   Object.keys(facets.softwareVersion).map((versionId) => {
     const data = _.get(facets.softwareVersion, versionId);

     // const hasValue = _.has(facets.softwareVersion, versionId) ? true : false;

     if (data) {
       const count = this.itemCountCheck(facets.softwareVersion[versionId]);
       const mapKey = _.findKey(mapVersions, { version: versionId });
       // console.log('software_version', versionId, mapKey);

       if (mapKey) {
         const name = mapVersions[mapKey].displayVersion;

         // only show version number when is resolve
         let textValue = this.$t('search.{version}_and_below', { version: name });
         if (currentMediaType.mainMediaType === 'resolve') {
           textValue = name;
         }

         const info = {
           value: mapKey,
           text: textValue,
           name: name,
           count: count,
         };

         facets.softwareVersion[versionId] = info;
       }

       // remove filter if not on api mapping list
       if (mapKey === undefined) {
         delete result.data.facets.softwareVersion[versionId];
       }
     }
   });
 }


 // set fps
 if (_.has(facets, 'fps')) {
   Object.keys(result.data.facets.fps).map((fpsId) => {
     const hasValue = _.has(result.data.facets.fps, fpsId) ? true : false;
     if (hasValue) {
       const count = this.itemCountCheck(result.data.facets.fps[fpsId]);

       const info = {
         value: fpsId,
         name: fpsId,
         count: count,
       };
       result.data.facets.fps[fpsId] = info;
     }
   });
 }


 // set price range and calculation currency
 const mapCurrencies = this.$store.getters['site/mapCurrencies'];
 const currentCurrency = this.$store.getters['site/currentCurrency'];

 console.log('tidySearchResult', mapCurrencies);
 console.log('tidySearchResult', currentCurrency);

 const currencyInfo = (mapCurrencies[currentCurrency]) || mapCurrencies.USD;

 console.log('tidySearchResult', currencyInfo);

 if (_.has(facets, 'priceRange')) {
   Object.keys(result.data.facets.price_range).map((priceString) => {
     if (!_.size(priceString)) {
       return;
     }

     let info = {};
     const count = this.itemCountCheck(result.data.facets.price_range[priceString]);

     if (priceString === '-1') {
       info = {
         value: '-1',
         text: this.$t('search.price_free'),
         low: '',
         high: '',
         count: count,
         symbol: '',
       };
     }

     if (priceString !== '-1') {
       const priceLow = priceString.split('-')[0];
       const priceHigh = priceString.split('-')[1];

       const isOnePrice = priceHigh === undefined;

       const symbol = currencyInfo.symbol;


       // console.log('facets.price_range', priceString, currencyInfo);

       let currencyText = '';
       if (isOnePrice) {
         currencyText = `${symbol} ${(priceLow * currencyInfo.rate)}`;
       } else {
         const priceLowString = `${symbol}${(priceLow * currencyInfo.rate)}`;
         const priceHighString = `${symbol}${(priceHigh * currencyInfo.rate)}`;
         currencyText = `${priceLowString} - ${priceHighString}`;

         // Less then US$ 20
         if (priceLow === '*') {
           currencyText = this.$t('search.less_than', { '0': priceHighString });
         }

         // US$ 40 or more
         if (priceHigh === '*') {
           currencyText = this.$t('search.or_more', { '0': priceLowString });
         }
       }

       info = {
         value: priceString,
         text: currencyText,
         low: priceLow,
         high: priceHigh,
         count: count,
         symbol: currencyInfo.symbol,
       };
     }

     // console.log(info);
     result.data.facets.price_range[priceString] = info;
   });
 }

 // set duration range
 if (_.has(facets, 'durationRange')) {
   Object.keys(result.data.facets.duration_range).map((durationString) => {
     if (_.size(durationString)) {
       const count = this.itemCountCheck(result.data.facets.duration_range[durationString]);

       const stringSeconds = this.$t('search.seconds');

       const durationLow = durationString.split('-')[0];
       const durationHigh = durationString.split('-')[1];

       const durationHighString = `${durationHigh}${stringSeconds}`;
       const durationLowString = `${durationLow}${stringSeconds}`;

       let durationText = `${durationLowString} - ${durationHighString}`;

       // Shorter than 20s
       if (durationLow === '*') {
         // durationText = `${stringShorter} ${durationHigh}${stringSeconds}`;
         durationText = this.$t('search.less_than', { '0': durationHighString });
       }

       // 120s or longer
       if (durationHigh === '*') {
         // durationText = `${durationLow}${stringSeconds} ${stringLonger} `;
         durationText = this.$t('search.or_more', { '0': durationLowString });
       }

       const info = {
         value: durationString,
         text: durationText,
         low: durationLow,
         high: durationHigh,
         count: count,
       };

       result.data.facets.duration_range[durationString] = info;
     }
   });
 }


 // set bpm range
 if (_.has(facets, 'bpmRange')) {
   Object.keys(result.data.facets.bpm_range).map((bpmString) => {
     if (_.size(bpmString)) {
       const count = this.itemCountCheck(result.data.facets.bpm_range[bpmString]);

       const bpmLow = bpmString.split(',')[0];
       const bpmHigh = bpmString.split(',')[1];

       let bpmText = '';
       switch (bpmString) {
         case '0,80':
           bpmText = this.$t('search.slow');
           break;
         case '70,110':
           bpmText = this.$t('search.moderate');
           break;
         case '110,150':
           bpmText = this.$t('search.fast');
           break;
         case '140,*':
           bpmText = this.$t('search.vary_fast');
           break;
         default:
           break;
       }

       const info = {
         value: bpmString,
         text: bpmText,
         low: bpmLow,
         high: bpmHigh,
         count: count,
       };

       result.data.facets.bpm_range[bpmString] = info;
     }
   });
 }

 // set license
 if (_.has(facets, 'license')) {
   Object.keys(result.data.facets.license).map((licenseId) => {
     const hasValue = _.has(result.data.facets.license, licenseId) ? true : false;
     if (hasValue) {
       const count = this.itemCountCheck(result.data.facets.license[licenseId]);

       let name = '';
       switch (licenseId) {
         case 'rf':
           name = this.$t('search.royalty_free_rf');
           break;
         case 'pro':
           name = this.$t('search.pro_registered');
           break;
         case 'editorial':
           name = this.$t('search.editorial');
           break;
         default:
           break;
       }

       const info = {
         value: licenseId,
         name: name,
         count: count,
       };
       result.data.facets.license[licenseId] = info;
     }
   });
 }


 // calculation colletcion's element currency
 // if (result.data.data.collections) {
 //   Object.keys(result.data.data.collections).map((collectionKey) => {
 //     const hasValue = _.has(result.data.data.collections, collectionKey) ? true : false;
 //     if (hasValue) {
 //       const price = result.data.data.collections[collectionKey].price;
 //       const priceOriginal = result.data.data.collections[collectionKey].price_original;

 //       result.data.data.collections[collectionKey].price = (price * currencyInfo.rate);
 //       result.data.data.collections[collectionKey].price_original = (priceOriginal * currencyInfo.rate);
 //     }
 //   });
 // }

 return facets;


}

  */

function refreshCancelToken(state, tokenName) {
  // cancel previous request
  if (_.has(state.cancelTokens, tokenName)) {
    state.cancelTokens[tokenName].cancel();
  }

  // create cancel token
  state.cancelTokens[tokenName] = axios.CancelToken.source();

  return state.cancelTokens[tokenName];
}

const actions = {

  setPagination({ commit }, payload) {
    if (_.get(payload, 'page') > 0) {
      commit('setCurrentPage', payload.page);
    }
    if (_.get(payload, 'perPage') > 0) {
      commit('setPerPage', payload.perPage);
    }
  },

  setCurrentPage({ commit }, number) {
    commit('setCurrentPage', number);
  },

  setPerPage({ commit }, number) {
    commit('setPerPage', number);
  },

  setSort({ commit }, payload) {
    commit('setSort', payload);
  },

  initFilter({ commit }) {
    commit('initFilter');
  },

  resetFilter({ commit }) {
    commit('resetFilters');
  },

  resetFilters({ commit }) {
    commit('resetFilters');
  },

  resetFilterBar({ commit }) {
    commit('resetFilterBar');
  },

  setSearchBar({ commit }, info) {
    commit('setSearchBar', info);
  },

  resetSearchBar({ commit }) {
    commit('resetSearchBar');
  },

  setMediaType({ commit }, mediaType) {
    commit('setMediaType', mediaType);
  },

  setMediaTypeTabs({ commit }, info) {
    commit('setMediaTypeTabs', info);
  },

  listAutoCompleteKeywords({ state, commit }, text) {
    const params = {
      q: text,
    };

    // clear first
    commit('setTypeaheads', []);
    return searchApi.listAutoCompleteKeywords(state.mediaType, params).then((response) => {
      // /suggest response is not wrapped in data.data
      const data = response.data;
      commit('setTypeaheads', data);
      return response;
    });
  },

  // @deprecated
  getTypeaheadResult({ rootState }, typeahead) {
    const { site } = rootState;

    const params = new URLSearchParams();
    params.append('q', typeahead);
    params.append('mt', site.currentMediaType.id);
    params.append('language', site.currentLanguage);

    return api.getSearchTypeaheadResult(params);
  },

  // @deprecated
  setTypeaheads({ commit }, typeaheads) {
    commit('setTypeaheads', typeaheads);
  },

  changeMediaType({ state, commit }, mediaType) {
    const { filter } = state;

    // this.$store.dispatch('site/setLoadingSearch', { status: true });

    // let filter = this.$store.getters['search/allSearchFilter'];
    // const keyword = state.keyword;
    const program = filter.program;
    // const keyword = filter.searchKeyword;
    const subscription = filter.subscription;
    const artist = filter.artist;
    const priceRange = filter.priceRange;
    const productModal = filter.productModal;

    // reset all filter
    commit('setElements', {});
    commit('setCollections', {});
    commit('initFilter');
    commit('resetFilterBar');
    commit('resetSearchBar');

    // set back searching keyword
    // filter = this.$store.getters['search/allSearchFilter'];
    filter.program = program;
    filter.subscription = subscription;
    // filter.searchKeyword = keyword;
    filter.artist = artist;
    filter.priceRange = priceRange;
    filter.productModal = productModal;

    commit('setFilter', filter);

    if (_.get(filter, 'page') > 0) {
      commit('setCurrentPage', filter.page, 10);
    }

    if (_.get(filter, 'itemPerPage') > 0) {
      commit('setPerPage', filter.itemPerPage);
    }

    // this.$store.dispatch('search/setFilter', filter);

    // const lang = this.$store.getters['site/currentLanguage'];
    // this.$router.push({
    //   path: `/${lang}/search/${mediaType}`,
    // });
    commit('setMediaType', mediaType);
  },

  changeSubMediaType({ state, commit }, mediaType) {
    const { filter } = state;


    // get current filter
    // const keyword = filter.searchKeyword;
    const sort = filter.sort;
    const subscription = filter.subscription;
    const artist = filter.artist;
    const priceRange = filter.priceRange;
    const productModal = filter.productModal;

    // reset all filter
    // reset all filter
    commit('setElements', {});
    commit('setCollections', {});
    commit('initFilter');
    commit('resetFilterBar');

    // set back filter
    // filter.searchKeyword = keyword;
    filter.sort = sort;
    filter.subscription = subscription;
    filter.artist = artist;
    filter.priceRange = priceRange;
    filter.productModal = productModal;

    commit('setFilter', filter);

    commit('setMediaType', mediaType);
  },

  // eslint-disable-next-line no-unused-vars
  // search for elements
  searchElements({ state, commit }) {
    // const { filter, pagination } = state;
    // const { site } = rootState;

    const params = buildSearchParams(state);

    console.log('searchElements PARAMS', params);

    // const tokenName = 'searchElements';
    //
    // // cancel previous request
    // if (_.has(state.cancelTokens, tokenName)) {
    //   state.cancelTokens[tokenName].cancel();
    // }

    const cancelToken = refreshCancelToken(state, 'searchElements');
    // create cancel token
    // state.cancelTokens[tokenName] = axios.CancelToken.source();

    return searchApi.searchElements(state.mediaType, params, {
      cancelToken: cancelToken.token,
    }).then((response) => {
      // const data = response.data.data;

      // tidyup result with mapping list
      // const result = this.tidySearchResult(response);

      // check apply filter have in response result or reset it
      // this.checkFilters(result);

      // this.generateSubMediaTypeMenu(result);
      // add facetsData
      const data = response.data;

      // data.facets = tidySearchResultFacets(data.facets);

      commit('setElementsResult', data);

      return response;
    }).catch((e) => {
      // handle canceled by cancelToken
      if (axios.isCancel(e)) {
        console.log('request canceled', e);
      }
    });
  },

  // searchCollections({ state, commit, rootState }) {
  searchCollections({ state, commit }) {
    // const { filter } = state;
    // const { site } = rootState;

    const params = buildSearchParams(state);

    delete params.priceRange;
    delete params.similar;
    params.perPage = 4;

    const cancelToken = refreshCancelToken(state, 'searchCollections');

    return searchApi.searchCollections(state.mediaType, params, {
      cancelToken: cancelToken.token,
    }).then((response) => {
      commit('setCollectionsResult', response.data);

      return response;
    }).catch((e) => {
      // handle canceled by cancelToken
      if (axios.isCancel(e)) {
        console.log('request canceled', e);
      }
    });
  },

  /*
  // eslint-disable-next-line no-unused-vars
  getSearchResult({ state, commit, rootState }) {
    const { filter } = state;
    const { site } = rootState;

    const params = new URLSearchParams();
    params.append('language', site.currentLanguage);
    params.append('page', filter.page || 1);
    params.append('per_page', filter.itemPerPage || 50);
    params.append('sort', filter.sort || 'match');
    // params.append('sort_by', filter.sortBy);
    // params.append('sort_order', filter.sortOrder);

    params.append('q', filter.searchKeyword);
    params.append('mt', filter.mediaType);

    params.append('program', filter.program);

    if (filter.subscription !== '-1') {
      params.append('subscription', filter.subscription);
    }

    params.append('editable', filter.editable);
    params.append('tutorial', filter.tutorial);
    params.append('plugin', filter.plugin);
    params.append('skill', filter.skill);
    params.append('textspace', filter.textspace);
    params.append('alpha', filter.alpha);
    params.append('loop', filter.loop);

    if (filter.softwareVersion) {
      params.append('software_version', filter.softwareVersion);
    }

    params.append('orientation', filter.orientation);
    params.append('resolution', filter.resolution);
    params.append('fps', filter.fps);
    params.append('type', filter.type);
    params.append('size', filter.size);
    params.append('cat', filter.category);
    params.append('style', filter.style);
    params.append('color', filter.color);

    params.append('genre', filter.genre);
    params.append('instrument', filter.instrument);
    params.append('mood', filter.mood);

    params.append('duration', filter.durationRange);
    params.append('framing', filter.framing);
    params.append('tempo', filter.bpmRange);
    params.append('price_range', filter.priceRange);
    params.append('license', filter.license);

    params.append('artist', filter.artist || '');

    params.append('similar', filter.similar);
    if (filter.color) {
      params.append('similar', filter.color);
    }

    return api.getSearchResult(params);
  },
  */

  setSearchResult({ commit }, result) {
    commit('setSearchResult', result);
  },

  listSuggestions({ state, commit }) {
    // const { filter } = state;

    const params = {
      q: state.keyword,
    };

    // cancel previous request
    if (state.listSuggestionsCancelToken) {
      state.listSuggestionsCancelToken.cancel();
    }

    // create cancel token
    const cancelToken = refreshCancelToken(state, 'listSuggestions');

    return searchApi.listSuggestions(state.mediaType, params, {
      cancelToken: cancelToken.token,
    }).then((response) => {
      const data = response.data.data;
      commit('setSuggestions', data);
    }).catch((e) => {
      // handle canceled by cancelToken
      if (axios.isCancel(e)) {
        console.log('request canceled', e);
      }
    });
  },

  setSearchSuggestionResult({ commit }, result) {
    commit('setSuggestions', result);
  },

  clearSuggestions({ commit }) {
    commit('clearSuggestions');
  },

  // eslint-disable-next-line no-unused-vars
  getSearchPaidResult({ state, commit, rootState }) {
    const { filter } = state;
    // const { site } = rootState;

    const itemPerPage = (filter.itemPerPage) * 0.2;

    const params = buildSearchParams(state);

    params.page = filter.page || 1;
    params.perPage = itemPerPage;
    params.sort = filter.sort || 'match';

    // overwrite
    delete params.subscription;
    params.priceRange = '1-*';

    const cancelToken = refreshCancelToken(state, 'getSearchPaidResult');

    return searchApi.searchElements(state.mediaType, params, {
      cancelToken: cancelToken.token,
    }).then((response) => {
      console.log('getSearchPaidResult', response);

      commit('setSearchPaidResult', response.data.data);
    }).catch((e) => {
      // handle canceled by cancelToken
      if (axios.isCancel(e)) {
        console.log('request canceled', e);
      }
    });
  },

  setSearchPaidResult({ commit }, result) {
    commit('setSearchPaidResult', result);
  },

  // eslint-disable-next-line no-unused-vars
  getSearchCrossSellResult({ state, commit }) {
    const { filter } = state;
    // const { site } = rootState;

    const params = buildSearchParams(state);

    params.page = filter.page || 1;
    params.perPage = 4;
    params.sort = filter.sort || 'match';

    // overwrite
    params.subscription = '-1';
    params.priceRange = '1-*';

    const cancelToken = refreshCancelToken(state, 'getSearchCrossSellResult');

    return searchApi.searchElements(state.mediaType, params, {
      cancelToken: cancelToken.token,
    }).then((response) => {
      console.log('getSearchCrossSellResult', response);
      commit('setSearchCrossSellResult', response.data.data);
    }).catch((e) => {
      // handle canceled by cancelToken
      if (axios.isCancel(e)) {
        console.log('request canceled', e);
      }
    });
    // return api.getSearchResult(params);
  },

  setSearchCrossSellResult({ commit }, result) {
    commit('setSearchCrossSellResult', result);
  },

  setElements({ commit }, elements) {
    commit('setElements', elements);
  },

  setCollections({ commit }, collections) {
    commit('setElements', collections);
  },

  setAsideElements({ commit }, elements) {
    commit('setAsideElements', elements);
  },

  // eslint-disable-next-line no-unused-vars
  getElementInfo({ state }, info) {
    return api.getElementInfo(info);
  },

  getTerms({ state }) {
    const info = state.filter;
    return api.getSearchTerms(info);
  },

  loadMediaTypeTerms({ state, commit }) {
    // const info = state.filter;

    return termsApi.listMediaTypeTerms(state.mediaType).then((response) => {
      // console.log('search/getTerms', result);

      const data = response.data.data;

      commit('setSoftwareVersions', _.get(data, 'softwareVersions', []));
      commit('setTypes', _.get(data, 'types', []));
      commit('setCategories', _.get(data, 'categories', []));
      commit('setStyles', _.get(data, 'styles', []));
      commit('setGenres', _.get(data, 'genres', []));
      commit('setInstruments', _.get(data, 'instruments', []));
      commit('setMoods', _.get(data, 'moods', []));
      commit('setMediaTypeTermsLoaded', true);
    });
  },

  setSoftwareVersions({ commit }, versions) {
    commit('setSoftwareVersions', versions);
  },
  setTypes({ commit }, types) {
    commit('setTypes', types);
  },
  setCategories({ commit }, categories) {
    commit('setCategories', categories);
  },
  setStyles({ commit }, styles) {
    commit('setStyles', styles);
  },
  setGenres({ commit }, genres) {
    commit('setGenres', genres);
  },
  setInstruments({ commit }, instruments) {
    commit('setInstruments', instruments);
  },
  setMoods({ commit }, moods) {
    commit('setMoods', moods);
  },
  setLicenses({ commit }, licenses) {
    commit('setLicenses', licenses);
  },

  setTerms({ commit }, terms) {
    commit('setTerms', terms);
  },

  getFilterBar({ state }) {
    return state.filterBar;
  },
  setFilterBar({ commit }, filterBar) {
    commit('setFilterBar', filterBar);
  },

  getFilter({ state }) {
    return state.filter;
  },
  setFilter({ commit }, filters) {
    // fix key to int
    Object.keys(filters).forEach((field) => {
      if (['subscription'].includes(field)) {
        filters[field] = parseInt(filters[field], 10);
      }
    });
    commit('setCurrentPage', 1);
    // filter = filter || {};
    // filter.page = 1;
    commit('setFilter', filters);
  },

  setFilters({ commit }, filters) {
    // filters = filters || {};

    if (filters) {
      const field = 'subscription';
      // fix key to int
      if (filters[field] !== undefined) {
        filters[field] = parseInt(filters[field], 10);
      }
    } else {
      filters = {};
    }

    // fix key to int
    // Object.keys(filters).forEach((field) => {
    //   if (['subscription'].includes(field)) {
    //     filters[field] = parseInt(filters[field], 10);
    //   } else if (['priceRange'].includes(field)) {
    //     filters[field] = filters[field].toString();
    //   }
    // });
    // filter valid filters
    commit('setFilters', filters);
  },

  setKeyword({ commit }, keyword) {
    commit('setCurrentPage', 1);
    commit('setKeyword', keyword);
  },

  getFacets({ state }) {
    return state.facets;
  },
  updateFacets({ commit }, facets) {
    commit('setFilter', facets);
  },
};

const mutations = {

  // pagination
  setCurrentPage(state, number) {
    state.pagination.currentPage = parseInt(number, 10);
  },

  setPerPage(state, number) {
    state.pagination.perPage = parseInt(number, 10);
  },

  setSort(state, payload) {
    state.sort = payload;
    console.log('setSort', payload);

    // @deprecated
    // state.filter.inputSort = payload;
    // state.filter.sort = payload;
  },

  initFilter() {
    console.log('initFilter');

    state.filter = JSON.parse(JSON.stringify(state.default.filter));
  },
  resetFilter() {
    console.log('resetFilter');

    const defaultFilter = JSON.parse(JSON.stringify(state.default.filter));

    Object.keys(defaultFilter).map((filterName) => {
      const ignoreFacets = [
        'sortBy',
        'sortOrder',
        'inputSort',
        'itemPerPage',
      ];

      if (ignoreFacets.indexOf(filterName) >= 0) {
        return;
      }

      if (state.filter[filterName]) {
        console.log('resetFilter - ', filterName, state.filter[filterName]);
        state.filter[filterName] = defaultFilter.filterName;
      }
    });
  },

  resetFilters() {
    console.log('resetFilter');

    const defaultFilter = JSON.parse(JSON.stringify(state.default.filter));

    Object.keys(defaultFilter).map((filterName) => {
      if (state.filter[filterName]) {
        console.log('resetFilter - ', filterName, state.filter[filterName]);
        state.filter[filterName] = defaultFilter.filterName;
      }
    });
  },

  resetFilterBar() {
    console.log('resetFilterBar');

    state.hasFilterBar = false;
    state.filterBar = JSON.parse(JSON.stringify(state.default.filterBar));
  },
  resetSearchBar() {
    console.log('resetSearchBar');
    state.searchBar.inputKeyword = '';
  },

  // setLoading(state, status) {
  //   state.isLoading = status;
  // },

  setSearchBar(state, info) {
    state.searchBar = info;
  },

  setMediaType(state, mediaType) {
    state.mediaType = mediaType.replace('-', '_');
    console.log('MEDIATYPE', state.mediaType);
  },

  setMediaTypeTabs(state, info) {
    state.mediaTypeTabs = info;
  },

  setTypeaheads(state, typeaheads) {
    state.typeahead.keywords = typeaheads;
  },

  setSearchResult(state, result) {
    state.elements = result.data.elements;
    state.collections = result.data.collections;
    // state.filter.page = result.page;
    // state.filter.pageTotal = result.total_count;
    // state.filter.itemPerPage = result.per_page;
    state.facets = result.facets;
  },

  setElementsResult(state, result) {
    console.log('setSearchElementsResult', result);
    state.elements = result.data;
    // state.filter.page = result.page;
    // state.filter.pageTotal = result.totalCount;
    // state.filter.itemPerPage = result.perPage;
    state.facets = result.facets;

    // set pagination
    state.pagination.currentPage = result.page;
    state.pagination.perPage = result.perPage;
    state.pagination.totalCount = result.totalCount;
  },

  setCollectionsResult(state, result) {
    state.collections = result.data;
    // state.filter.page = result.page;
    // state.filter.pageTotal = result.total_count;
    // state.filter.itemPerPage = result.per_page;
    // state.facets = result.facets;
  },

  setSuggestions(state, suggestions) {
    state.suggestion = {
      keywords: _.get(suggestions, 'keywords', []),
      artists: _.get(suggestions, 'artists', []),
      free: _.get(suggestions, 'free', false),
    };
  },

  clearSuggestions(state) {
    state.suggestion = {
      keywords: [],
      artists: [],
      free: false,
    };
  },

  setSearchPaidResult(state, elements) {
    state.asideElements = elements;
  },

  setSearchCrossSellResult(state, elements) {
    state.crossSellElements = elements;
  },

  setElements(state, elements) {
    state.elements = elements;
  },

  setAsideElements(state, elements) {
    state.asideElements = elements;
  },

  setCollections(state, collections) {
    state.collections = collections;
  },

  setSoftwareVersions(state, versions) {
    state.softwareVersions = versions;
  },
  setTypes(state, types) {
    state.types = types;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setStyles(state, styles) {
    state.styles = styles;
  },
  setGenres(state, genres) {
    state.genres = genres;
  },
  setInstruments(state, instruments) {
    state.instruments = instruments;
  },
  setMoods(state, moods) {
    state.moods = moods;
  },
  setLicense(state, license) {
    state.licenses = license;
  },

  setMediaTypeTermsLoaded(state, value) {
    state.isMediaTypeTermsLoaded = !!value;
  },

  setTerms(state, result) {
    state.terms = result.data;
  },

  setFilter: (state, filter) => {
    state.filter = filter;
  },

  setFilters: (state, filters) => {
    state.filter = filters || {};
  },

  setKeyword: (state, keyword) => {
    state.keyword = keyword || '';
  },

  setFilterBar: (state, filterBar) => {
    // if filterBar not have any filter enable disable it
    state.hasFilterBar = false;
    const HasFilterStatus = _.findKey(filterBar, { status: true });
    if (HasFilterStatus) {
      state.hasFilterBar = true;
    }

    state.filterBar = filterBar;
  },
  setFacets: (state, facets) => {
    state.facets = facets;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
