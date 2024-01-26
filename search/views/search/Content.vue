<template>
  <div class="col pt-4">
    <div class="row flex-column-reverse flex-xl-row">

      <!-- SEARCH INPUT BOX -->
      <div class="col-12 col-xl-9 col-xxl-6">
        <SearchBar/>
      </div>
      <!-- SEARCH INPUT BOX -->

      <!-- CALLOUT -->
      <SearchCallout v-if="isFreeFilterApplied && !isLoggedIn"/>
      <!-- CALLOUT -->

    </div>

    <div
      class="pb-3 mb-3"
    >
      <!-- v-show="hasSuggestions" -->

      <Suggestions
        class="div-search-suggestions position-absolute"
        :class="{ 'show': hasSuggestions }"
      />
    </div>

    <!-- SEARCH RESULTS QUERY: show if there's keyword search -->
    <div
      v-show="searchKeyword && searchKeyword.length"
      class="row"
    >
      <div class="col">
        <h4 id="search-results-heading" class="mt-3 mb-0">“{{searchKeyword}}” {{ $t('search.search_results') }}</h4>
      </div>
    </div>

    <div>
      <!-- SEARCH HEADER - Mediatypes & Display Settings -->
      <div class="d-flex flex-column-reverse d-xl-flex flex-xl-row align-items-xl-center border-bottom justify-content-between mb-3">
        <!-- SUB-MEDIA TYPE + RESULTS COUNT TABS -->
        <SubMediaTypeTabs
          @change="onChangeSubMediaType"
        />

        <!-- DISPLAY SETTINGS & MOBILE FILTER TOGGLE -->
        <div class="py-3 py-lg-0">
          <div class="d-flex justify-content-between justify-content-lg-end justify-content-xl-between align-items-center">

            <!-- MOBILE FILTER TOGGLE BUTTON -->
            <div class="d-block d-lg-none d-xl-none">
              <button
                @click="enableMobileFacets"
                :class="appliedFilterCount > 0 ? 'btn-success' : 'btn-light'"
                class="btn btn-sidebar-toggle btn btn-light pl-3 ml-n3">
                <font-awesome-icon :icon="['fas','filter']" class="mr-1"/>
                {{ $t('search.filter') }}
                <div v-if="appliedFilterCount > 0"
                  class="badge badge-dark"
                >
                  {{ appliedFilterCount }}
                </div>
              </button>
            </div>
            <!-- MOBILE FILTER TOGGLE BUTTON -->

            <!-- MORE DISPLAY SETTINGS BUTTON -->
            <div class="d-block">

              <SortBy/>

              <button
                class="btn lg:btn-sm btn-light"
                @click="showSettingsModal"
              >
                <font-awesome-icon :icon="['fas','cog']" class="mr-1 mr-md-0"/>
                <span class="d-inline d-md-none"> {{ $t('search.settings') }}</span>
              </button>
              <!--
              <div
                class="modal fade"
                id="search-display-settings"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">{{ $t('search.settings') }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body text-left text-sm-right">
                      <form>
                        <div class="form-group row d-flex d-md-none">
                          <label
                            class="col-sm-6 col-form-label"
                            for="sort-by"
                          >{{ $t('search.sort_by') }}</label>
                          <div class="col-sm-6">
                            <SelectSortBy
                              id="sort-by"
                            />
                          </div>
                        </div>
                        <div class="form-group row">
                          <label
                            for="itemsPerPage"
                            class="col-sm-6 col-form-label"
                          >{{ $t('search.result') }}</label>
                          <div class="col-sm-6">
                            <select
                              v-model="itemPerPage"
                              class="custom-select"
                              id="itemsPerPage"
                              name="itemsPerPage"
                            >
                              <option value="10">10</option>
                              <option value="50" selected>50</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        </div>

                      </form>

                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >{{ $t('search.close') }}</button>
                    </div>
                  </div>
                </div>
              </div>
              -->

              <!--
              <a
                :href="`${siteRedirectSearchV3}`"
                class="btn btn-light btn-sm ml-3 track-search-v3 d-none d-sm-inline-block"
                data-toggle="tooltip"
                :title="$t('search.switch_back_to_old_ui_hint')"
              >
                <font-awesome-icon :icon="['fas','arrow-alt-right']" fixed-width></font-awesome-icon>
                {{ $t('search.switch_back_to_old_ui') }}
              </a>
              -->

            </div>
            <!-- MORE DISPLAY SETTINGS BUTTON -->

          </div>
        </div>
        <!-- DISPLAY SETTINGS & MOBILE FILTER TOGGLE -->
      </div>

      <!-- FILTERS APPLIED -->
      <div class="row">
        <div class="col-12">

          <!-- FILTER BAR block-->
          <FilterBar/>

          <!-- FILTER BAR block-->
        </div>

        <!-- FILTERS Visual Search div -->
        <div v-cloak v-if="isAppliedSimilar" class="col-12 col-md-6 col-xxl-4 mb-5">
          <SearchSimilar/>
        </div>
        <!-- FILTERS Visual Search div -->

      </div>
      <!-- FILTERS APPLIED -->

      <!-- SEARCH RESULTS -->
      <div id="search-results-elements" class="row">
        <transition name="fade" mode="out-in">
          <ModalWrapperProduct
            v-if="isModal"
            @modal-close="handleModalClose"
            @button-prev="handleModalPrev"
            @button-next="handleModalNext"
            :isFirst="isFirst"
            :isLast="isLast"
          >
            <template slot="header">
              <div class="flex-column">
                <h2
                  class="h6 element-title"
                >
                  <ProductIcon
                    :productType="currentMediaTypeCode"
                    class="fa-lg mr-1 me-bmt text-muted"
                  />
                  {{ elementData.name }}
                </h2>
                <div class="btn-categories">
                  <a
                    v-for="category in displayCategories"
                    :key="`category-${category.id}`"
                    class="btn btn-sm btn-simple-secondary"
                    :href="$siteUrl(`/${currentMediaTypeCode.replace('_', '-')}?cat=${category.id}`).search().url()"
                  >
                    {{ category.name }}
                  </a>
                </div>
              </div>
            </template>
            <ProductPageMobile :element="elementData" @close-product-modal="handleModalClose()" />
          </ModalWrapperProduct>
        </transition>
        <ContentResult>

          <!-- result loading block -->
          <transition>
            <div v-if="isLoadingSearch" class="card-element-loader">

              <!-- audio layout -->
              <template v-if="isAudioLayout">
                <ElementCardAudioLoader v-for="n in 12" :key="`loader-audio-${n}`" />
              </template>
              <!-- audio layout -->
              <!-- normal layout -->
              <template v-else>
                <ElementCardLoader v-for="n in 24" :key="`loader-video-${n}`" />
              </template>
              <!-- normal layout -->

            </div>
          </transition>
          <!-- result loading block -->

          <!-- result block -->
          <transition>
            <div v-if="!isLoadingSearch">

              <template v-if="isNormalLayout">
                <ProductWrapper
                  v-for="element in allSearchElements"
                  :key="`item-video-${element.id}`"
                  :value="element.id"
                  :element="element"
                  :options="{
                    cardType: 'card',
                    expand: false,
                    favorites: true,
                    enablePlayer: true,
                    hoverEvent: true,
                  }"
                />
              </template>
              <template v-else-if="isAudioLayout && !isSearchFreeElement">
                <ProductWrapper
                  v-for="element in allSearchElements"
                  :key="`item-audio-${element.id}`"
                  :value="element.id"
                  :element="element"
                  :options="{
                    cardType: 'list',
                    expand: false,
                    favorites: true,
                    fullWidth: true,
                    enablePlayer: true,
                    hoverEvent: true,
                  }"
                />
              </template>
              <template v-else-if="isAudioLayout && isSearchFreeElement">
                <ProductWrapper
                  v-for="element in allSearchElements"
                  :key="`item-audio-${element.id}`"
                  :value="element.id"
                  :element="element"
                  :options="{
                    cardType: 'list-min',
                    favorites: true,
                    fullWidth: true,
                    enablePlayer: true,
                    hoverEvent: true,
                  }"
                />
              </template>

              <!--
              <template v-if="isNormalLayout && isMobileLayout">
              </template>

              <template v-if="isAudioLayout && isMobileLayout">
              </template>
              -->

            </div>
          </transition>
          <!-- result block -->

        </ContentResult>


        <ContentAside v-if="showPaidElementsAside">
          <transition>
            <AsideElement />
          </transition>
        </ContentAside>

      </div>
      <!-- SEARCH RESULTS -->

    </div>

    <!-- COLLECTIONS RESULTS -->
    <template v-if="!isLoadingSearch">

      <hr v-cloak v-if="hasCollections" class="mt-0 mb-5">

      <div v-if="hasCollections" class="row mb-3">
        <div class="col-12">
          <h6 class="mb-0">
            <i class="fas fa-fw me-bmt icon-collection"></i>
            {{ $t('search.bundles') }}
          </h6>
        </div>
      </div>

      <div v-if="hasCollections"
           id="search-results-collections"
           class="row">
        <div class="col col-elements position-relative">

<!--          <template v-if="isNormalLayout">-->
<!--            <ProductWrapper-->
<!--              v-for="element in allSearchCollections"-->
<!--              :key="`collection-${element.id}`"-->
<!--              :value="element.id"-->
<!--              :element="element"-->
<!--              :options="{-->
<!--                cardType: 'card',-->
<!--                expand: true,-->
<!--                favorites: true,-->
<!--              }"-->
<!--            />-->
<!--          </template>-->
<!--          <template v-else-if="isAudioLayout">-->
            <ProductWrapper
              v-for="element in allSearchCollections"
              :key="`collection-${element.id}`"
              :value="element.id"
              :element="element"
              :options="{
                cardType: isAudioLayout ? 'list' : 'card',
                expand: true,
                favorites: true,
              }"
            />
<!--          </template>-->

        </div>
      </div>

    </template>
    <!-- COLLECTIONS RESULTS -->

    <!-- CROSS SELL ON DEMAND RESULTS -->
    <transition name="fade" mode="out-in">
      <template v-if="isAppliedSubscription && !isSearchFreeElement && !isLoadingSearch && hasCrossSellElements">
        <ContentCrossSell
          class="mx-n3 my-5"
          :isNormalLayout="isNormalLayout"
          :isAudioLayout="isAudioLayout"
        />
      </template>
    </transition>
    <!-- CROSS SELL ON DEMAND RESULTS -->

    <!-- PAGINATION -->
    <div class="row pt-3 pb-6">
      <div class="col">
        <Pagination
          :totalRows="totalCount"
          :perPage="perPage"
          :currentPage="currentPage"
          @change="onChangePage"
        />
      </div>
    </div>
    <!-- PAGINATION -->

  </div>
</template>

<script>
import SearchBar from '@/views/search/SearchBar.vue';
import ProductIcon from '@motionelements/core/src/components/product/ProductIcon.vue';
import SubMediaTypeTabs from '@/views/search/header/SearchSubMediaTypeTabs.vue';
import ContentResult from '@/views/search/ContentResult.vue';
import SortBy from '@/views/search/header/SearchSortBy.vue';
import ElementCardLoader from '@/components/modules/common/ElementCardLoader.vue';
import ElementCardAudioLoader from '@/components/modules/common/ElementCardAudioLoader.vue';

import { mapState, mapGetters } from 'vuex';
import { changeSubMediaType } from '@/services/search.service.js';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'search-content',
  components: {
    SearchBar,
    ProductIcon,
    // SearchBar: () => import('@/views/search/SearchBar.vue'),
    // ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),

    ElementCardLoader,
    ElementCardAudioLoader,
    // ElementCardLoader: () => import('@/components/modules/common/ElementCardLoader.vue'),
    // ElementCardAudioLoader: () => import('@/components/modules/common/ElementCardAudioLoader.vue'),
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
    // ProductWrapper: () => import('frontend-modules/shared/modules/common/product/ProductWrapper.vue'),

    // ContentResult: () => import('@/components/modules/search/ContentResult.vue'),
    ContentResult,
    // ContentResult: () => import('@/views/search/ContentResult.vue'),
    ContentCrossSell: () => import('@/views/search/ContentCrossSell.vue'),

    // ContentAside: () => import('@/components/modules/search/ContentAside.vue'),
    ContentAside: () => import('@/views/search/ContentAside.vue'),
    AsideElement: () => import('@/views/search/AsideElement.vue'),

    // Pagination: () => import('@/components/modules/search/Pagination.vue'),
    Pagination: () => import('@motionelements/core/src/components/ui/BasePagination.vue'),
    ProductPageMobile: () => import('@/views/product/ProductPage.Mobile.vue'),
    ModalWrapperProduct: () => import('@/components/modules/common/modals/ModalWrapper.Product.vue'),

    SubMediaTypeTabs,
    // SubMediaTypeTabs: () => import('@/views/search/header/SearchSubMediaTypeTabs.vue'),
    Suggestions: () => import('@/views/search/header/SearchSuggestions.vue'),
    SearchCallout: () => import('@/views/search/header/SearchCallout.vue'),
    SearchSimilar: () => import('@/views/search/header/SearchSimilar.vue'),
    SortBy,
    // SortBy: () => import('@/views/search/header/SearchSortBy.vue'),
    FilterBar: () => import('@/views/search/header/SearchFilterBar.vue'),
  },
  data: function () {
    return {
      isSearching: false,
      isModal: false,
      elementId: '',
      elementData: {},
      isFirst: false,
      isLast: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      isMobile: state => state.site.isMobile,

      isLoadingSearch: state => state.site.loadingSearch.status,

      suggestionKeywords: state => state.search.suggestion.keywords,
      suggestionArtists: state => state.search.suggestion.artists,

      hasCollections: state => _.size(state.search.collections) > 0,
      currentMediaTypeCode: state => state.search.mediaType,
      filters: state => state.search.filter,

    }),
    ...mapGetters({
      // by marksun
      // pagination
      currentPage: 'search/currentPage',
      perPage: 'search/perPage',
      totalCount: 'search/totalCount',

      asideElements: 'search/allSearchAsideElements',
      hasAsideElements: 'search/hasAsideElements',
      hasCrossSellElements: 'search/hasCrossSellElements',

      searchKeyword: 'search/keyword',
    }),
    appliedFilterCount() {
      // check non-empty filters
      const filters = { ...this.filters };
      // delete filters.searchKeyword;
      // delete filters.inputSort;
      // delete filters.sort;
      delete filters.mediaType;

      if (_.get(filters, 'subscription') === -1) {
        delete filters.subscription; // skip
      }

      // console.log('filterCount', filters);

      // return _.size(_.pickBy(filters));
      return _.size(_.filter(filters, v => v && v !== '0'));
    },
    isAppliedSimilar() {
      return !!_.get(this.filters, 'similar');
    },
    hasSuggestions() {
      return _.size(this.suggestionKeywords) || _.size(this.suggestionArtists);
    },
    isAppliedSubscription() {
      return _.get(this.filters, 'subscription') === 1;
    },
    suggestionFilters() {
      return [
        {
          type: 'price',
          value: 'free',
        },
      ];
    },
    suggestionSubcategories() {
      return ['Subcategory1', 'Subcategory2'];
    },
    siteUrl: function () {
      return process.env.VUE_APP_SITE_URL;
    },
    isImage() {
      return isProductType('image', this.currentMediaTypeCode);
    },
    showPaidElementsAside() {
      return this.isSearchFreeElement && this.hasAsideElements;
    },
    isSearchFreeElement() {
      return _.get(this.filters, 'priceRange') === '-1';
      // return (this.$route.query.price_range === '-1') ? true : false;
    },
    isFreeFilterApplied() {
      return this.$route.query.price_range === '-1'
        || this.$route.query.priceRange === '-1';
    },
    isProductModalMode() {
      return false;
      // return (this.$route.query.product_modal === '1') ? true : false;
    },
    isNormalLayout() {
      return !this.isAudioLayout;
    },
    isAudioLayout() {
      return isProductType('audio', this.currentMediaTypeCode);
    },
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];
      return currentWindowWidth < 1200;
    },
    allSearchElements() {
      return this.$store.getters['search/allSearchElements'];
    },
    allSearchCollections() {
      let allSearchCollections = this.$store.getters['search/allSearchCollections'];
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      // only show 3 collection on windows width 800~1433px
      if (_.inRange(currentWindowWidth, 800, 1433)) {
        allSearchCollections = _.slice(allSearchCollections, 0, 3);
      }

      return allSearchCollections;
    },
    displayCategories() {
      if (this.elementData && this.elementData.genres) {
        return this.elementData.genres;
      }
      return this.elementData.categories;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showSettingsModal() {
      // const ModalContent = () => ({
      //   component: import('@/views/search/modals/Settings.vue'),
      // });
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/search/modals/Settings.vue'),
        }),
        props: {
        },
      });
    },
    onChangePage(page) {
      this.$store.dispatch('search/setCurrentPage', page);
      // push history state
      this.$router.push({
        query: {
          ...this.$route.query,
          page: page,
        },
      });
    },
    handleMobileClick(element) {
      // console.log('handle mobile click /touch');
      if (this.isMobile) {
        this.isModal = false;
        const id = element.id;
        this.elementData = Object.freeze(element);
        const elementArr = this.allSearchElements.findIndex(x => x.id === id);
        // alert(elementArr + 1);
        this.elementId = id;
        this.isFirst = false;
        this.isLast = false;
        if (elementArr === this.allSearchElements.length - 1) {
          this.isLast = true;
        }
        if (elementArr === 0) {
          this.isFirst = true;
        }
        this.isModal = true;
        const body = document.querySelector('body');
        body.style.height = '100%';
        body.style.overflow = 'hidden';
      }
    },
    handleModalPrev() {
      const prevNum = this.allSearchElements.findIndex(x => x.id === this.elementId);
      const prevElement = this.allSearchElements[prevNum - 1];
      // this.handleMobileClick(prevElement.id);
      this.handleMobileClick(prevElement);
    },
    handleModalNext() {
      const nextNum = this.allSearchElements.findIndex(x => x.id === this.elementId);
      const nextElement = this.allSearchElements[nextNum + 1];
      // this.handleMobileClick(nextElement.id);
      this.handleMobileClick(nextElement);
    },
    handleModalClose() {
      this.isModal = false;
      this.elementData = {};
      try {
        this.doAudioPlayerStop();
        this.doVideoPlayerStop();
      } catch (error) {
        console.error(error);
      }
      const body = document.querySelector('body');
      body.style = '';
    },

    getSearchPaidContent() {
      console.log('getSearchPaidContent');

      this.$store.dispatch('search/getSearchPaidResult').then((response) => {
        // console.log('getSearchPaidResult', response);
        this.$store.dispatch('search/setSearchPaidResult', response.data);
      });
    },
    getSearchCrossSellContent() {
      console.log('getSearchCrossSellContent');

      this.$store.dispatch('search/getSearchCrossSellResult').then((response) => {
        // console.log('getSearchCrossSellResult', response);
        this.$store.dispatch('search/setSearchCrossSellResult', response.data);
      });
    },
    updateFilterForMobile() {
      // if is mobile, default show 10 elements
      const isMobile = this.$store.state.site.isMobile;
      const notSetCookie = true;
      if (isMobile && notSetCookie) {
        const filter = this.$store.getters['search/allSearchFilter'];
        filter.itemPerPage = 10;
        this.$store.dispatch('search/setFilter', filter);
      }
    },
    enableMobileFacets() {
      this.$store.dispatch('site/enableMobileFacets');
    },
    disableMobileFacets() {
      this.$store.dispatch('site/disableMobileFacets');
    },
    onChangeSubMediaType(mediaType) {
      changeSubMediaType(mediaType);
    },
  },
};
</script>

<style lang="scss" scoped>
// sidebar toggle on mobile
.btn-sidebar-toggle {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

// responsive display settings

@include media-breakpoint-up(lg) {
  .lg\:btn-sm {
    @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $font-size-sm, $line-height-sm, $border-radius);
  }
  .lg\:small {
    font-size: 80%;
    font-weight: 400;
  }

  .lg\:custom-select-sm {
    height: calc(2em + 0.125rem + 2px);
    padding-top: 0.0625rem;
    padding-bottom: 0.0625rem;
    padding-left: 0.4375rem;
    font-size: 0.75rem;
  }
}

.media {
  &.media-vs {
    .media-wrapper {
      border-radius: $border-radius;
      overflow: hidden;
      position: relative;
      max-width: 33.333%;

      img {
        max-width: 14rem;
        max-height: 4rem;
      }

      .media-play {
        &:after {
          font-family: "Font Awesome 5 Pro";
          font-weight: 900;
          content: "\f04b";

          color: white;
          font-size: 1.5rem;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: $text-shadow-3;

          opacity: 0;
          -webkit-transition: opacity 0.15s ease-in-out;
          -moz-transition: opacity 0.15s ease-in-out;
          -ms-transition: opacity 0.15s ease-in-out;
          -o-transition: opacity 0.15s ease-in-out;
          transition: opacity 0.15s ease-in-out;
        }
      }

      &:hover {
        .media-play:after {
          opacity: 1;
        }
      }
    }
  }
  .media-body {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}

.col-elements {
  line-height: 1;
}

// STYLE IMG OF AUDIOSEARCH WAVEFORM
//.img-waveform {
//  width: 100%;
//  height: 3rem;
//  filter: grayscale(100%);
//  opacity: 1;
//}

// PRODUCT MODAL HEADER

.btn-categories {
  .btn {
    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }
  }
}

// SUGGESTIONS

.div-search-suggestions {
  opacity: 0;
  transition: opacity .2s ease;

  &.show {
    opacity: 1;
  }
}

//
// COLORS
//

// COLOR FILTER APPLIED

.filter-applied-color {
  text-shadow: -1px -1px 0 $gray, 1px -1px 0 $gray, -1px 1px 0 $gray, 1px 1px 0 $gray;

  .ui-dark & {
    text-shadow: -1px -1px 0 $light, 1px -1px 0 $light, -1px 1px 0 $light, 1px 1px 0 $light;
  }
}
</style>
