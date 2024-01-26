<template>
  <div class="mb-3">
    <transition name="fade" mode="out-in">
      <div v-if="isLoaded"
        key="collection-elements-loaded"
      >
        <div class="text-right">
          <div class="d-inline-block">
            <div class="input-group input-group-sm mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="perPageSelect">
                  {{ $t('search.results') }}
                </label>
              </div>
              <select class="custom-select" id="perPageSelect" v-model="perPage">
                <option :value=4>4</option>
                <option :value=12>12</option>
                <option :value=50 v-if="totalRows >= 50">50</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mx-n2">
          <template v-for="element in collectionElements">
            <ProductWrapper
              class="carousel-cell"
              :class="{ 'mx-0' : isProductType('audio', element.mediaType) }"
              :key="element.id"
              :value="element.id"
              :element="element"
              :options="{
                cardType: 'list',
                expand: true,
                favorites: false,
                checkbox: false,
                tagsInput: false,
                // new options
                enablePlayer: true,
                hoverEvent: true,
                showFavoritesIcon: false,
                showSimilarIcon: false,
                showMediaTypeBadge: true,
                layoutDetailExpand: false,
                layoutCheckbox: false,
                layoutTagsInput: false,
              }"
            />
          </template>
        </div>
      </div>
      <div
        v-else
        key="collection-elements-loading"
        class="text-center mb-3">
        <LoaderSpin/>
      </div>
    </transition>

    <Pagination
      :totalRows="collection.items.totalCount"
      :perPage="perPage"
      :currentPage="currentPage"
      @change="onChangePage"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'product-collection-elements',
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapperContainer.vue'),
    Pagination: () => import('@motionelements/core/src/components/ui/BasePagination.vue'),
    LoaderSpin: () => import('@motionelements/core/src/components/ui/LoaderSpin.vue'),
  },
  data() {
    return {
      currentPage: 1,
      perPage: 12,
      isLoaded: false,
    };
  },
  created() {
    this.getCollectionElements();
  },
  computed: {
    ...mapState({
      collectionElements: state => state.product.current.collectionElements,
    }),
    totalRows() {
      return _.get(this.collection, 'items.totalCount', 0);
    },
  },
  // mounted() {
  //   this.getCollectionItems();
  // },
  methods: {
    isProductType(productType, mediaType) {
      return isProductType(productType, mediaType);
    },
    getCollectionElements() {
      this.isLoaded = false;
      this.$store.dispatch('product/getCollectionElements', {
        sku: this.collection.id,
        page: this.currentPage,
        perPage: this.perPage,
      }).then((response) => {
        if (response.status === 200) {
          this.isLoaded = true;
        } else {
          this.isLoaded = true;
        }
      });
    },
    onChangePage(page) {
      this.currentPage = page;
      this.getCollectionElements();
    },
  },
  watch: {
    perPage() {
      this.currentPage = 1;
      this.getCollectionElements();
    },
  },
};
</script>
