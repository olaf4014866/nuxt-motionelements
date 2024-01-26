import * as appApi from '@/api/app.js';
import * as elementsApi from '@/api/elements.js';
import * as collectionsApi from '@/api/collections.js';

const defaultCurrentProductState = {
  sku: null,
  element: null,
  variant: null,
  variantSku: null,
  customFileType: null,
  collection: null,
  collectionElements: null,
  recommendedMusicElements: [],
  relatedElements: [],
  compatibleSoftwares: null,
  archiveEntries: null,
  embedCode: null,
  isGone: false,
  isNotFound: false,
};

const state = {
  // favorites page
  isDraggingElement: false,
  isDraggingGroup: false,
  draggingElementId: '',

  isSelectedAllElements: false,
  isSelectedElement: false,
  selectedCount: 0,
  selectedElementsId: [],


  // by marksun
  current: { ...defaultCurrentProductState },
  // currentElement: null,
  // currentCollection: null,
  // selectedVariantSku: null,
  // archiveEntries: null,
  // // use null to track for not loaded
  // compatibleSoftwares: null,
  // embedCode: null,
  // recommendedMusicElements: [],
  // relatedElements: [],
  elementSchema: {},
  // collectionItems: [],
  // sku: null,
  // isGone: false,
  // isNotFound: false,
};

const getters = {
  // favorites page
  isDraggingElement: state => state.isDraggingElement,
  isDraggingGroup: state => state.isDraggingGroup,
  draggingElementId: state => state.draggingElementId,

  isSelectedAll: state => state.isSelectedAll,
  isSelectedElement: state => state.isSelectedElement,
  selectedCount: state => state.selectedCount,
  selectedElementsId: state => state.selectedElementsId,

  // @deprecated naming, no 'get' for getters
  getCurrentElement: state => state.current.element,
  getCurrentCollection: state => state.current.collection,
  getRelatedElements: state => state.current.relatedElements,
  getRecommendedMusicElements: state => state.current.recommendedMusicElements,

  currentElement: state => state.current.element,
  currentCollection: state => state.current.collection,
  relatedElements: state => state.current.relatedElements,
  recommendedMusicElements: state => state.current.recommendedMusicElements,

  currentVariant: (state) => {
    if (state.current.collection) {
      return null;
    }

    const currentSku = state.current.sku;

    let variant;

    console.log('currentSku', currentSku);

    if (currentSku) {
      if (currentSku.indexOf('-') > 0) {
        // has element.id - variant.id
        variant = state.current.element.variants.find(x => x.id === currentSku);

        console.log('vvv1', variant);

        if (variant) {
          return variant;
        }
      } else {
        // do not auto select
        // only element.id
        // get master variant
        // current sku has no variant
        // variant = state.current.element.variants.find(x => x.master === true);
        //
        // console.log('vvv2', variant);
        // if (variant) {
        //   return variant;
        // }
      }

      if (state.current.element.variants.length === 1) {
        // if only 1 variant, return it as current
        return state.current.element.variants.slice(-1)[0];
      }


      // if (state.current.element.media_type)
    }

    return null;
  },


};

const actions = {

  setIsDraggingElement({ commit }, bool) {
    commit('setIsDraggingElement', bool);
  },

  setIsDraggingGroup({ commit }, bool) {
    commit('setIsDraggingGroup', bool);
  },

  setDraggingElementId({ commit }, elementId) {
    commit('setDraggingElementId', elementId);
  },

  setIsSelectAllElements({ commit }, bool) {
    commit('setIsSelectAllElements', bool);
  },

  setSelectedElementsId({ commit }, elements) {
    commit('setSelectedElementsId', elements);
  },

  addSelectedElement({ commit }, elementId) {
    commit('addSelectedElement', elementId);
  },

  setSelectedVariantSku({ commit }, sku) {
    commit('setSelectedVariantSku', sku);
  },

  setProductSku({ commit }, sku) {
    commit('setProductSku', sku);
  },

  clearCurrentProduct({ commit }) {
    commit('clearCurrentProduct');
  },

  // by marksun
  async getElementSchema({ commit }) {
    return appApi.listProductSchema({
    }).then((response) => {
      commit('setElementSchema', response.data.data);
      return response;
    });
  },

  async getElementArchiveEntries({ commit }, payload) {
    return elementsApi.listElementArchiveEntries(payload.id, {
    }).then((response) => {
      // console.log('getttt111', response);
      commit('setArchiveEntries', response.data.data);
      return response;
    });
  },

  async getCompatibleSoftwares({ commit }, payload) {
    return elementsApi.listCompatibleSoftwares(payload.id, {
    }).then((response) => {
      // console.log('getttt111', response);
      commit('setCompatibleSoftwares', response.data.data);
      return response;
    });
  },

  async getEmbedCode({ commit }, payload) {
    return elementsApi.getEmbedCode(payload.id, {
    }).then((response) => {
      commit('setEmbedCode', response.data.data.html);
      return response;
    });
  },

  async getElementDetails({ commit }, payload) {
    // console.log(this.name, params);
    commit('clearCurrentProduct');

    const sku = payload.sku;
    const relationType = payload.relationType;
    // console.log('vuex', 'sku', sku, relationType);

    commit('setProductSku', sku);

    return elementsApi.getElement(sku, {
      'fields[element]': 'details',
      'include': relationType,
      preview: _.get(payload, 'preview'),
    }).then((response) => {
      console.log('getElementDetails response', response);
      const element = response.data.data;
      commit('setCurrentElement', element);

      if (_.has(response.data, 'relationships')) {
        const relationship = response.data.relationships[0];

        if (_.has(relationship, 'recommendedMusic')) {
          commit('setRecommendedMusicElements', relationship.recommendedMusic.data);
        } else if (_.has(relationship, 'relatedElements')) {
          commit('setRelatedElements', relationship.relatedElements.data);
        }
        // response.data.relationships[0].forEach((relatedData, relationshipKey) => {
        //   console.log('rrrrrrrr', relationshipKey, relatedData);
        //   switch (relationshipKey) {
        //     case 'recommendedMusic':
        //       commit('setRecommendedMusicElements', relatedData.data);
        //       break;
        //     case 'relatedElements':
        //       commit('setRelatedElements', relatedData.data);
        //       break;
        //     default:
        //       break;
        //   }
        // });
      }
      return response;
    }).catch((error) => {
      const statusCode = _.get(error, 'response.status');
      if (statusCode === 410) {
        commit('setStatusGone', sku);
      } else if (statusCode === 404) {
        commit('setStatusNotFound', sku);
      }
    });
  },

  async getCollectionDetails({ commit }, payload) {
    // console.log(this.name, params);
    commit('clearCurrentProduct');

    const sku = payload.sku;

    commit('setProductSku', sku);
    // const params = {
    //   'fields[collections]': 'details',
    // };
    // return collectionsApi.getCollection(sku, params).then((res) => {
    //   console.log('getCollection', res);
    // });
    return collectionsApi.getCollection(sku, {
      'fields[collections]': 'details',
      preview: _.get(payload, 'preview'),
    }).then((response) => {
      const collection = response.data.data;
      commit('setCurrentCollection', collection);
      return response;
    }).catch((error) => {
      const statusCode = _.get(error, 'response.status');
      if (statusCode === 410) {
        commit('setStatusGone', sku);
      } else if (statusCode === 404) {
        commit('setStatusNotFound', sku);
      }
    });
  },

  async getCollectionElements({ commit }, payload) {
    // console.log(this.name, params);

    // const sku = this.state.sku;
    const sku = _.get(payload, 'sku');

    return collectionsApi.listCollectionItems(sku, {
      page: _.get(payload, 'page', 1),
      perPage: _.get(payload, 'perPage', 3),
    }).then((response) => {
      commit('setCollectionElements', response.data.data);
      return response;
    });
  },
  // export async function listCollectionItems(sku, params) {
  //   return collectionsApi.listCollectionItems(sku, params).then((res) => {
  //     console.log('getCollection', res);
  //   });
  // }

};

const mutations = {

  // favorites page
  setIsDraggingElement(state, bool) {
    state.isDraggingElement = bool;
  },

  setIsDraggingGroup(state, bool) {
    state.isDraggingGroup = bool;
  },

  setDraggingElementId(state, elementId) {
    state.draggingElementId = elementId;
  },

  setIsSelectAllElements(state, bool) {
    state.isSelectedAllElements = bool;
  },

  setSelectedElementsId(state, elements) {
    console.log('setSelectedElementsId', elements);
    state.selectedElementsId = elements;
    state.isSelectedElement = _.size(elements) ? true : false;
    state.selectedCount = elements.length;
  },

  addSelectedElement(state, elementsId) {
    console.log('addSelectedElement', elementsId);
    state.selectedElementsId = elementsId;
    state.isSelectedElement = _.size(elementsId) ? true : false;
    state.selectedCount = elementsId.length;
  },

  setSelectedVariantSku(state, sku) {
    // state.selectedVariantSku = sku;
    state.current.variantSku = sku;
    state.current.sku = sku;
  },

  // // by marksun
  // clearElement(state) {
  //   state.current = defaultCurrentProductState;
  // },

  // clear current Element and Collection
  clearCurrentProduct(state) {
    state.current = { ...defaultCurrentProductState };
  },

  // by marksun
  setCurrentElement(state, element) {
    state.current = { ...defaultCurrentProductState };
    state.current.element = element;
    state.current.sku = element.id;

    // @deprecated
    // state.currentElement = element;
    // // reset related
    // state.archiveEntries = null;
    // state.compatibleSoftwares = null;
    // state.recommendedMusicElements = [];
    // state.relatedElements = [];
  },

  // by marksun
  setCurrentCollection(state, collection) {
    state.current = { ...defaultCurrentProductState };
    state.current.collection = collection;
    state.current.sku = collection.id;

    // state.currentCollection = collection;
  },

  setCollectionElements(state, items) {
    state.current.collectionElements = items;
  },

  setRecommendedMusicElements(state, data) {
    // state.recommendedMusicElements = data;
    state.current.recommendedMusicElements = data;
  },

  setArchiveEntries(state, data) {
    // state.currentElement.archiveEntries = data;
    // state.archiveEntries = data;
    state.current.archiveEntries = data;
  },

  setCompatibleSoftwares(state, data) {
    // state.compatibleSoftwares = data;
    state.current.compatibleSoftwares = data;
  },

  setEmbedCode(state, data) {
    // state.embedCode = data;
    state.current.embedCode = data;
  },

  setRelatedElements(state, data) {
    // state.relatedElements = data;
    state.current.relatedElements = data;
  },

  setElementSchema(state, data) {
    state.elementSchema = data;
  },

  setProductSku(state, sku) {
    if (sku) {
      const skuParts = sku.split('-');

      if (skuParts.length >= 3) {
        const customFileType = skuParts.length >= 3 ? skuParts[2] : null;
        sku = `${skuParts[0]}-${skuParts[1]}`;
        state.current.customFileType = customFileType;
      }
    }

    state.current.sku = sku;
  },

  setStatusNotFound(state) {
    state.current.isNotFound = true;
  },

  setStatusGone(state) {
    // if (sku) {
    //   state.sku = sku;
    // }
    state.current.isGone = true;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
