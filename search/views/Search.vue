<template>
  <div>
    <div :class="isActiveClass" class="file-drop-wrapper is-fullscreen">
      <div v-show="isLoadingLoopClass" :class="isLoadingLoopClass" class="overlay">
        <slot>
          <div class="overlay-content flex-column">
            <div class="container text-center">
              <p>{{loadingLoopMessage}}</p>
              <div class="d-inline-block ui-loading"></div>
            </div>
          </div>
        </slot>
      </div>
      <div v-show="isLoadingProgressClass" :class="isLoadingProgressClass" class="overlay">
        <slot>
          <div class="overlay-content flex-column">
            <div class="container text-center">
              <p>{{loadingProgressMessage}}</p>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{ width: loadingProgress+'%' }"
                  :aria-valuenow="loadingProgress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </slot>
      </div>
      <!-- Progress Bar -->
      <!-- TO DISPLAY .file-drop-target WHEN FILE IS DRAGGED ONTO THE BROWSER WINDOW -->
      <div class="file-drop" :class="uploadAreaVisibleClass">
        <slot>
          <div class="file-drop-content">
            <div class="text-center">
              <p>
                <font-awesome-layers class="fa-6x fa-fw">
                  <font-awesome-icon :icon="['fas', 'cloud']" fixed-width class="text-muted" />
                  <font-awesome-icon :icon="['fas', 'file-upload']" fixed-width class="text-white" transform="shrink-8 down-1" />
                </font-awesome-layers>
              </p>
              <p>{{ isAudio ? $t('search.drop_audio_here') : $t('search.drop_image_here') }}</p>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <!-- END .file-drop-target -->
    <div class="container-fluid">
      <div class="row">
        <!-- FACETS FILTERS COLUMN-->
        <SearchFacets/>
        <!-- FACETS FILTERS COLUMN -->
        <!-- SEARCH RESULTS COLUMN -->
        <SearchContent/>
        <!-- SEARCH RESULTS COLUMN -->
      </div>
    </div>

    <!-- SEARCH RESULT MOBILE MODAL -->
    <!--
    <div class="modal fade show" tabindex="-1" role="dialog" style="display:block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header p-0" style="overflow:hidden;">
            <div class="embed-responsive embed-responsive-16by9">
              <video
                loop
                poster="https://d31l02nbp0owar.cloudfront.net/m/t/1426/9416064/a-0060.jpg"
                controls
              >
                <source
                  src="https://s3-us-west-2.amazonaws.com/v.motionelements.com/v/1426/9416064_a-01.mp4"
                  type="video/mp4"
                >
                <source
                  src="https://s3-us-west-2.amazonaws.com/v.motionelements.com/v/1426/9416064_a-01.webm"
                  type="video/webm"
                >
              </video>
            </div>
          </div>
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title text-truncate">
              <i class="fas me-bmt icon-after-effects-square text-muted"></i> Simple Flat Logo CS6+
            </h5>
          </div>
          <div class="modal-footer">
            <a class="btn btn-light text-primary">
              <i class="fas fa-fw me-bmt icon-heart"></i>
            </a>
            <a class="btn btn-light text-primary">
              <i class="fas fa-fw me-bmt icon-search-solid"></i>
            </a>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SearchFacets from '@/views/search/Facets.vue';
import SearchContent from '@/views/search/Content.vue';

import {
  changeMediaType,
  changeSubMediaType,
} from '@/services/search.service.js';
import searchPlayerMixin from '@/views/search/searchPlayer.mixin.js';
// import fileSearchMixin from '@/views/search/fileSearch.mixin.js';
import fileSearchMixin from '@/views/search/mixins/file-search.mixin.js';
import { getMediaTypeInfo, isProductType } from '@motionelements/core/src/services/catalog.service.js';

import { camelCaseKeys } from '@motionelements/core/src/helpers/string.js';


export default {
  name: 'view-search',
  mixins: [searchPlayerMixin, fileSearchMixin],
  components: {
    SearchFacets,
    SearchContent,
  },
  data() {
    return {
      uploadAreaVisible: false,
      uploadLastTarget: null,
      currentPlayingElementId: null,
    };
  },
  computed: {
    ...mapState({
      subscriptions: state => state.user.member.subscriptions,
      loadingLoopClass: state => state.site.loadingLoop.status,
      loadingLoopMessage: state => state.site.loadingLoop.message,

      loadingProgressClass: state => state.site.loadingProgress.status,
      loadingProgressMessage: state => state.site.loadingProgress.message,
      loadingProgress: state => state.site.loadingProgress.progress,

      // by marksun
      currentMediaType: state => state.search.mediaType,
      // searchKeyword: state => state.search.filter.searchKeyword,
      memberSubscriptions: state => state.user.member.subscriptions,

      perPage: state => state.search.pagination.perPage,
      filters: state => state.search.filter,

      // isLogin: state => state.member.isLogin,
      isLoggedIn: state => state.user.isLoggedIn,
    }),
    ...mapGetters({
      // by marksun
      // pagination
      searchKeyword: 'search/keyword',
    }),
    isSearchFreeElement() {
      return _.get(this.filters, 'priceRange') === '-1';
    },
    uploadAreaVisibleClass() {
      return {
        active: this.uploadAreaVisible,
      };
    },
    isLoadingLoopClass() {
      return {
        active: this.loadingLoopClass,
      };
    },
    isLoadingProgressClass() {
      return {
        active: this.loadingProgressClass,
      };
    },
    isActiveClass() {
      return {
        active: this.uploadAreaVisible || this.loadingLoopClass || this.loadingProgressClass,
      };
    },
    isAudio() {
      return isProductType('audio', this.currentMediaType);
    },
    isSubscriber() {
      return _.size(this.subscriptions) > 0;
    },
    isAppliedSubscription() {
      return _.get(this.filters, 'subscription') === 1;
      // return !!_.get(this.filters, 'subscription');
    },
  },
  created() {
    console.log('search - created');
    console.log('search created - query.mt ', this.$route.query.mt);

    // add in mediaType first
    // this.updateCurrentMediaTypeFromRouter();

    /*
    // redirect `mt` quertstring
    const hasLang = _.size(this.$route.params.lang) ? true : false;
    const hasQueryMediaType = _.size(this.$route.query.mt) ? true : false;
    if (hasLang && hasQueryMediaType) {
      console.log('redirect : querystring have ?mt=ae');

      const lang = this.$route.params.lang;

      const mt = this.$route.query.mt || '';
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
      const info = _.find(mapSupportedMediaTypes, { mt: mt });
      const mediaType = info.api;

      const queryString = this.$route.query;

      this.$router.push({
        path: `/${lang}/search/${mediaType}`,
        query: queryString,
      });
    }
    */

    this.$store.dispatch('search/initFilter');
    this.$store.dispatch('search/resetFilterBar');

    this.initSearch();
  },
  methods: {
    onPlayerStart(element) {
      console.log('emit : playerStart', element);
      if (this.currentPlayingElementId !== element.id) {
        this.currentPlayingElementId = element.id;
        this.$teleport.event('product_previewed', element);
      }
    },
    initSearch() {
      this.updateCurrentMediaTypeFromRouter();

      console.log('initSearch');

      // this.parseRouteQuery();

      this.updateFilterForMobile();

      // trigger facets click event
      this.search();

      // async load terms

      this.$store.dispatch('search/loadMediaTypeTerms');
    },

    getSearchPaidContent() {
      this.$store.dispatch('search/getSearchPaidResult');
    },
    getSearchCrossSellContent() {
      this.$store.dispatch('search/getSearchCrossSellResult');
    },
    search() {
      console.log('doSearch', this.isSearching);

      // if (this.isSearching) {
      //   return;
      // }
      this.isSearching = true;

      this.parseRouteQuery();

      this.$scrollToTop();

      try {
        this.doAudioPlayerStop();
        this.doVideoPlayerStop();
      } catch (error) {
        console.error('do player stop error :', error);
      }

      this.$store.dispatch('site/setLoadingSearch', { status: true });

      this.$store.dispatch('search/searchElements')
        .then((response) => {
          // check response is undefined? might be canceled
          if (response) {
            console.log('route', 'searchElements', response);
            const elements = response.data.data;

            this.$store.dispatch('site/setLoadingSearch', { status: false });

            // prepare teleport product_searched request
            const searchParams = { ...this.filters };
            delete searchParams.productModal;
            delete searchParams.inputSort;

            this.isSearching = false;

            const teleportSearchInfo = {
              'search': {
                'page': response.data.page,
                'per_page': response.data.perPage,
                'total_count': response.data.totalCount,
                'params': searchParams,
              },
              'products': elements,
            };

            // dispatch collection search before firing teleport
            this.$store.dispatch('search/searchCollections')
              .then((response) => {
                const collections = response.data.data;

                teleportSearchInfo.products = _.concat(elements, collections);

                this.$teleport.event('product_searched', teleportSearchInfo);
              }).catch(() => {
                this.$teleport.event('product_searched', teleportSearchInfo);
              });


            if (this.isSearchFreeElement) {
              this.getSearchPaidContent();
            }

            if (this.isAppliedSubscription) {
              this.getSearchCrossSellContent();
            }
          }
        });

      this.$store.dispatch('site/disableMobileFacets');
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
    parseRouteQuery() {
      this.updateFilterFromRouter();
    },
    updateCurrentMediaTypeFromRouter() {
      // set current searching mediatype
      const mediaType = this.$route.params.mediatype;
      this.$store.dispatch('site/setCurrentMediaType', getMediaTypeInfo(mediaType));

      // new 2020-08-16
      this.$store.dispatch('search/setMediaType', mediaType);
    },
    updateFilterFromRouter() {
      // get params from URL and set to vuex
      // const route = this.$store.getters['route/allQueryString'];
      // console.log('updateFilterFromRouter', route);

      // if (!_.size(this.$route.query)) {
      //   return false;
      // }

      const searchParams = { ...this.$route.query };
      // const route = this.$route.query;

      console.log('updateFilterFromRouter', searchParams);

      // const isProductModalMode = (this.$route.query.product_modal === '1') ? true : false;

      // reset filter
      this.$store.dispatch('search/resetFilter');
      // this.$store.dispatch('search/resetFilterBar');

      // const currentMediaType = this.$store.getters['site/currentMediaType'];
      // console.log(currentMediaType);

      // const filter = this.$store.getters['search/allSearchFilter'];
      // const filterBar = this.$store.getters['search/allSearchFilterBar'];
      // const searchBar = this.$store.getters['search/searchBar'];

      /*
      // sync router's querystring to vuex filter
      Object.keys(route).map((name) => {
        const value = route[name];
        console.log('updateFilterFromRouter - ', name, value);

        switch (name) {
          case 'product_modal':
            filter.productModal = value;
            break;

          default:
            break;
        }

        return true;
      });
      */

      // parse all query into camelCase filter
      const filters = camelCaseKeys(searchParams);

      if (_.has(filters, 'cat')) {
        filters.category = filters.cat;
        delete filters.cat;
        this.$router.replace({
          query: filters,
        });
      }

      if (_.has(filters, 's')) {
        this.$store.dispatch('search/setKeyword', filters.s);
        delete filters.s;
      }

      this.setDefaultSort();
      // if (_.has(filters, 'sort')) {
      //   // this.$store.dispatch('search/setSort', filters.sort);
      //   this.$store.dispatch('search/setSort', sort);
      //   delete filters.sort;
      // }

      delete filters.page;

      // set current search filter from URL params
      this.$store.dispatch('search/setFilters', filters);

      this.$store.dispatch('search/setCurrentPage', this.$route.query.page || 1);
    },
    setDefaultSort() {
      // const query = { ...this.$route.query };
      const query = this.$route.query;
      // const filters = camelCaseKeys(query);

      // preference is set only when user change sort order specifically
      // const preference = JSON.parse(sessionStorage.getItem('search:preferences'));
      // console.log('setDefaultSort', preference, query);

      let sort;

      switch (true) {
        // use sort if set in query
        case (_.has(query, 'sort')):
          sort = query.sort;
          break;
        // use match if has keywords
        case (_.has(query, 's') && query.s.length > 0):
          sort = 'match';
          break;
        // use sort if set in preference
        // case (_.has(preference, 'sort')):
        //   sort = preference.sort;
        //   break;
        // sort as latest if loggedin
        case (this.isLoggedIn):
          sort = 'latest';
          break;
        default:
          sort = 'popular';
          break;
      }

      this.$store.dispatch('search/setSort', sort);

      // do not set in preference here
      // if (_.get(preference, 'sort') !== sort) {
      //   sessionStorage.setItem('search:preferences', JSON.stringify({ sort: sort }));
      // }
      console.log('setDefaultSort', sort);
    },
    changeSubMediaType(mediaType) {
      console.log('changeSubMediaType');
      changeSubMediaType(mediaType);
    },
    filterSimilar(element) {
      console.log('filterSimilar : ', element);

      const filter = this.$store.getters['search/allSearchFilter'];
      filter.similar = element.id;
      filter.page = 1;
      filter.searchKeyword = '';

      const filterBar = this.$store.getters['search/allSearchFilterBar'];
      filterBar.similar.status = true;
      filterBar.similar.mode = 'element';
      filterBar.similar.id = decodeURIComponent(element.id);
      filterBar.similar.imageFilename = '';
      filterBar.similar.imageUrl = '';

      const currentMediaType = this.$store.getters['site/currentMediaType'];
      const currentLanguage = this.$store.getters['site/currentLanguage'];

      var info = {
        mediaType: currentMediaType.api,
        id: element.id,
        language: currentLanguage,
      };

      this.$store.dispatch('search/setFilter', filter);

      this.updateRoute('similar', filter.similar);

      this.$store.dispatch('search/getElementInfo', info)
        .then((result) => {
          console.log('filterSimilar', result);

          if (_.size(result.data.data.name)) {
            const productName = _.truncate(result.data.data.name, {
              'length': 16,
            });
            filterBar.similar.productName = productName;
          }

          if (_.size(result.data.data.previews.jpg)) {
            const elementImageUrl = result.data.data.previews.jpg.url;
            filterBar.similar.imageUrl = decodeURIComponent(elementImageUrl);
          }
        });

      // this.search();
      // this.$root.$emit('doSearch', filter);
    },
    updateRoute(filterKey, value) {
      const query = {
        ...this.$route.query,
        page: 1,
      };

      query[filterKey] = value;

      this.$router.push({
        query: query,
      });
    },

    updateSubscriptionFilter() {
      // update search checkbox
      const storageSubscriptionFilter = sessionStorage.getItem('ME_subscriptionFilter');

      // if not have check filter and member info have subscribe
      const isFilterArtist = !!_.size(this.$route.query.artist);

      const isSubscriber = _.size(this.memberSubscriptions) > 0;

      if (!storageSubscriptionFilter && !isFilterArtist && isSubscriber) {
        console.log('set queryString subscription');

        sessionStorage.setItem('ME_subscriptionFilter', '1');

        // this.$router.push({
        //   path: `/${lang}/search/${mediaType}`,
        //   query: Object.assign({}, this.$route.query, { subscription: '1' }),
        // });

        this.$router.push({
          query: {
            ...this.$route.query,
            subscription: '1',
          },
        });
      }

      sessionStorage.setItem('ME_subscriptionType', JSON.stringify(this.memberSubscriptions));
    },
  },
  mounted() {
    // me-modules product wrapper will trigger event when first play
    this.$root.$on('audioPlayerStart', this.onPlayerStart);
    this.$root.$on('videoPlayerStart', this.onPlayerStart);

    this.$root.$on('changeSubMediaType', this.changeSubMediaType);
    this.$root.$on('updateCurrentMediaTypeFromRouter', this.updateCurrentMediaTypeFromRouter);
    this.$root.$on('updateFilterFromRouter', this.updateFilterFromRouter);

    // this.$root.$on('changeSubMediaType', (mediaType) => {
    //   this.changeSubMediaType(mediaType);
    // });
    // this.$root.$on('updateCurrentMediaTypeFromRouter', () => {
    //   this.updateCurrentMediaTypeFromRouter();
    // });

    // this.$root.$on('updateFilterFromRouter', () => {
    //   this.updateFilterFromRouter();
    // });

    // this.$root.$on('updateRouterFromFilter', () => {
    //   // this.updateRouterFromFilter();
    // });

    // this.$root.$on('filterSimilar', (element) => {
    //   console.log('emit : filterSimilar');
    //   this.filterSimilar(element);
    // });
    this.$root.$on('filterSimilar', this.filterSimilar);
  },
  beforeCreate() {
    console.log('BEFORE create');

    // cannot use this.method in beforeCreate
    // set route value
    const mediaType = this.$route.params.mediatype;
    this.$store.dispatch('site/setCurrentMediaType', getMediaTypeInfo(mediaType));

    // new 2020-08-16
    this.$store.dispatch('search/setMediaType', mediaType);

    this.$store.dispatch('site/setLoadingSearch', { status: true });

    let queryMediaType = this.$route.query.mt;

    if (queryMediaType) {
      queryMediaType = queryMediaType.replace('-', '_');
      changeMediaType(queryMediaType);
    }
  },
  beforeDestroy() {
    this.$root.$off('audioPlayerStart', this.onPlayerStart);
    this.$root.$off('videoPlayerStart', this.onPlayerStart);

    this.$root.$off('changeSubMediaType', this.changeSubMediaType);
    this.$root.$off('updateCurrentMediaTypeFromRouter', this.updateCurrentMediaTypeFromRouter);
    this.$root.$off('updateFilterFromRouter', this.updateFilterFromRouter);

    this.$root.$off('filterSimilar', this.filterSimilar);
  },
  watch: {
    '$route'(to, from) {
      console.log('WATCH route changed', from, to);
      console.log('route kw:', this.searchKeyword);

      if (from.path !== to.path) {
        // check for subMediaType?
        this.initSearch();
      } else {
        this.search();
      }
    },
    searchKeyword(to) {
      this.$store.dispatch('search/clearSuggestions');
      if (to && to.length > 2) {
        this.$store.dispatch('search/listSuggestions');
      }
    },
    // currentMediaType() {
    //   console.log('WATCH mediaType changed');
    //   // this.initSearch();
    // },
    perPage() {
      this.search();
    },
    memberSubscriptions(to, from) {
      console.log('WATCHED memberSubscriptions', to, from);
      this.updateSubscriptionFilter();
    },
  },
  metaInfo() {
    return {
      title: this.searchKeyword || this.$i18n.t('search.page_title'),
      meta: [
        { vmid: 'robots', name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
};
</script>

<style lang="scss">
.badge-vs,
.btn-vs {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  overflow: hidden;
  vertical-align: middle;

  img {
    max-height: 1.625rem;
  }
}

$file-drop-text-color: map-get($theme-text-colors, "muted");
$file-drop-font-size: 4rem;

.file-drop-wrapper {
  display: none;

  &.active {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;

    &.is-fullscreen {
      position: fixed;
    }
  }
}

.file-drop, .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
  transition: visibility 200ms, opacity 200ms;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.overlay {
  .overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

.file-drop {
  .file-drop-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &:before {
      border: 4px dashed $file-drop-text-color;
      border-radius: $spacer/2;
      content: "";
      position: absolute;
      top: 3rem;
      right: 2rem;
      bottom: 3rem;
      left: 2rem;
    }
  }
}

// COLORS

.file-drop, .overlay {
  background-color: $overlay-color;

  .ui-dark & {
    background-color: $overlay-color-dark;
  }
}
</style>
