import * as api from '@/api/index';

const state = {
  default: {
    filter: {
      inputSort: 'match',
      sort: 'match',

      itemPerPage: 50,

      pageTotal: 0,
      page: 0,

      mediaType: '',
      searchKeyword: '',

      subscription: 0,

      editable: 0,
      tutorial: 0,
      plugin: 0,
      skill: 0,
      textspace: 0,
      alpha: 0,
      loop: 0,

      softwareVersion: '',
      orientation: '',
      resolution: '',
      type: '',
      size: '',
      category: '',
      style: '',
      color: '',
      genre: '',
      instrument: '',
      mood: '',
      durationRange: '',
      framing: '',
      bpmRange: '',
      priceRange: '',
      license: '',

      similar: '',

      artist: '',
    },
    filterBar: {

      subscription: {
        status: false,
        value: '',
        text: '',
      },

      editable: {
        status: false,
        value: '',
        text: '',
      },
      tutorial: {
        status: false,
        value: '',
        text: '',
      },
      plugin: {
        status: false,
        value: '',
        text: '',
      },
      skill: {
        status: false,
        value: '',
        text: '',
      },
      textspace: {
        status: false,
        value: '',
        text: '',
      },
      alpha: {
        status: false,
        value: '',
        text: '',
      },
      loop: {
        status: false,
        value: '',
        text: '',
      },

      softwareVersion: {
        status: false,
        value: '',
        text: '',
      },
      orientation: {
        status: false,
        value: '',
        text: '',
      },
      resolution: {
        status: false,
        value: '',
        text: '',
      },
      type: {
        status: false,
        value: '',
        text: '',
      },
      size: {
        status: false,
        value: '',
        text: '',
      },
      category: {
        status: false,
        value: '',
        text: '',
      },
      style: {
        status: false,
        value: '',
        text: '',
      },
      color: {
        status: false,
        value: '',
        text: '',
      },

      genre: {
        status: false,
        value: '',
        text: '',
      },
      instrument: {
        status: false,
        value: '',
        text: '',
      },
      mood: {
        status: false,
        value: '',
        text: '',
      },
      durationRange: {
        status: false,
        value: '',
        text: '',
      },
      framing: {
        status: false,
        value: '',
        text: '',
      },
      bpmRange: {
        status: false,
        value: '',
        text: '',
      },
      priceRange: {
        status: false,
        value: '',
        text: '',
      },
      license: {
        status: false,
        value: '',
        text: '',
      },

      artist: {
        status: false,
        value: '',
        text: '',
      },

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
  terms: {},

  // filter mapping list
  types: {},
  categories: {},
  styles: {},
  genres: {},
  instruments: {},
  moods: {},
  licenses: {},

  elements: {},
  collections: {},
  typeahead: {
    keywords: [],
  },
  hasSuggestionKeyword: false,
  hasSuggestionArtist: false,
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
  facets: {},
  filter: {},
  hasFilterBar: false,
  filterBar: {},
  error: {
    code: '',
    message: '',
  },
};

const getters = {

  searchBar: state => state.searchBar,

  mediaTypeTabs: state => state.mediaTypeTabs,

  allSearchElements: state => state.elements,
  allSearchCollections: state => state.collections,
  allSearchFilter: state => state.filter,
  allSearchFilterBar: state => state.filterBar,
  allSearchFacets: state => state.facets,

  mapVersions: state => state.terms.software_versions,
  // mapSizes: state => state.terms.size,
  mapTypes: state => state.types,
  mapGenres: state => state.genres,
  mapMoods: state => state.moods,
  mapInstruments: state => state.instruments,
  mapCategories: state => state.categories,
  mapStyles: state => state.styles,

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
};

const actions = {

  initFilter({ commit }) {
    commit('initFilter');
  },

  resetFilter({ commit }) {
    commit('resetFilter');
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

  setMediaTypeTabs({ commit }, info) {
    commit('setMediaTypeTabs', info);
  },

  getTypeaheadResult({ rootState }, typeahead) {
    const { site } = rootState;

    const params = new URLSearchParams();
    params.append('q', typeahead);
    params.append('mt', site.currentMediaType.id);
    params.append('language', site.currentLanguage);

    return api.getSearchTypeaheadResult(params);
  },
  setTypeaheads({ commit }, typeaheads) {
    commit('setTypeaheads', typeaheads);
  },

  // eslint-disable-next-line no-unused-vars
  getResult({ state, commit, rootState }) {
    const { filter } = state;
    const { site } = rootState;

    const params = new URLSearchParams();
    params.append('language', site.currentLanguage);
    params.append('page', filter.page);
    params.append('per_page', filter.itemPerPage);

    params.append('sort', filter.sort);

    // params.append('sort_by', filter.sortBy);
    // params.append('sort_order', filter.sortOrder);

    params.append('q', filter.searchKeyword);
    params.append('mt', filter.mediaType);

    params.append('subscription', filter.subscription);

    params.append('editable', filter.editable);
    params.append('tutorial', filter.tutorial);
    params.append('plugin', filter.plugin);
    params.append('skill', filter.skill);
    params.append('textspace', filter.textspace);
    params.append('alpha', filter.alpha);
    params.append('loop', filter.loop);

    params.append('software_version', filter.softwareVersion);
    params.append('orientation', filter.orientation);
    params.append('resolution', filter.resolution);
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

    params.append('artist', filter.artist);

    params.append('similar', filter.similar);
    if (filter.color) {
      params.append('similar', filter.color);
    }

    return api.getSearchResult(params);
  },

  setElements({ commit }, elements) {
    commit('setElements', elements);
  },

  setCollections({ commit }, collections) {
    commit('setElements', collections);
  },

  // eslint-disable-next-line no-unused-vars
  getElementInfo({ state }, info) {
    return api.getElementInfo(info);
  },

  getTerms({ state }) {
    const info = state.filter;
    return api.getSearchTerms(info);
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

  getFilterBar({ state }) {
    return state.filterBar;
  },
  setFilterBar({ commit }, filterBar) {
    commit('setFilterBar', filterBar);
  },

  getFilter({ state }) {
    return state.filter;
  },
  setFilter({ commit }, filter) {
    commit('setFilter', filter);
  },

  getFacets({ state }) {
    return state.facets;
  },
  updateFacets({ commit }, facets) {
    commit('setFilter', facets);
  },
};

const mutations = {

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
  resetFilterBar() {
    console.log('resetFilterBar');

    state.hasFilterBar = false;
    state.filterBar = JSON.parse(JSON.stringify(state.default.filterBar));
  },

  resetSearchBar() {
    console.log('resetSearchBar');
    state.searchBar.inputKeyword = '';
  },

  setLoading(state, status) {
    state.isLoading = status;
  },

  setSearchBar(state, info) {
    state.searchBar = info;
  },

  setMediaTypeTabs(state, info) {
    state.mediaTypeTabs = info;
  },

  setTypeaheads(state, typeaheads) {
    state.typeahead.keywords = typeaheads;
  },

  setResult(state, result) {
    state.elements = result.data.elements;
    state.collections = result.data.collections;
    state.filter.page = result.page;
    state.filter.pageTotal = result.total_count;
    state.filter.itemPerPage = result.per_page;
    state.facets = result.facets;

    state.hasSuggestionKeyword = false;
    state.hasSuggestionArtist = false;

    state.suggestion = {
      keywords: [],
      artists: [],
    };
    if (parseInt(result.page, 10) <= 1) {
      const hasKeywords = _.size(result.suggestions.keywords) ? true : false;
      const hasArtists = _.size(result.suggestions.artists) ? true : false;

      if (hasKeywords) {
        state.hasSuggestionKeyword = true;
        state.suggestion.keywords = result.suggestions.keywords;
      }

      if (hasArtists) {
        state.hasSuggestionArtist = true;
        state.suggestion.artists = result.suggestions.artists;
      }
    }
  },

  setElements(state, elements) {
    state.elements = elements;
  },
  setCollections(state, collections) {
    state.collections = collections;
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

  setTerms(state, result) {
    state.terms = result.data;
  },

  setFilter: (state, filter) => {
    state.filter = filter;
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
