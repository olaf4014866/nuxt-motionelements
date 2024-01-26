<template>
  <div>

    <!-- ELEMENTS HERE -->
    <div class="row">
      <div class="col col-elements position-relative">

        <!-- EACH MEDIATYPE -->

        <!-- result block -->
        <section class="mb-5">

          <!--
          <div class="py-3">
            <h6><font-awesome-icon :icon="['fas','me-after-effects-square']" fixed-width class="text-muted"></font-awesome-icon> After Effects Templates</h6>
          </div>
          -->

          <!-- result loading block -->
          <template v-if="isLoading">
            <div class="card-element-loader">
              <ElementCardLoader v-for="n in 12" :key="n" />
            </div>
          </template>
          <!-- result loading block -->

          <!-- result content -->

          <!-- no element -->
          <template v-else-if="isEmptyResults">
            <div class="py-5 text-center">
              <p>
                <font-awesome-icon :icon="['fal','folder-open']" size="4x"></font-awesome-icon>
              </p>
              <!--
              <p class="h4">
              0 Elements Shown
              </p>
              -->

              <p v-if="hasFilterBar" class="h4">
                {{ $t('favorites.result_no_match_heading') }}
              </p>


              <p v-if="!hasFilterBar && !showFirstIntroduction" class="h4">
                {{ $t('favorites.result_folder_empty_heading') }}
              </p>


              <p v-if="!hasFilterBar && showFirstIntroduction" class="h5">
                {{ $t('favorites.result_default_empty_heading') }}
              </p>

              <i18n path="favorites.result_default_empty_subheading"
                v-if="!hasFilterBar && showFirstIntroduction"
                tag="p"
                class="h5">
                <span slot="icon"><i class="fa-lg fa-fw far me-bmt icon-heart-regular text-secondary"></i></span>
              </i18n>

            </div>
          </template>
          <!-- no element -->
          <template v-else-if="products.length > 0">
            <ElementDraggable
              v-for="element in products"
              :key="`item-${element.id}`"
              :element="element"
            >
              <ProductWrapper
                :value="element.id"
                :element="element"
                :options="{
                  cardType: 'card',
                  favorites: false,
                  expand: true,
                  checkbox: true,
                  tagsInput: false,

                  hoverEvent: true,
                  enablePlayer: true,

                  showMediaTypeBadge: true,
                }"
              />
            </ElementDraggable>
          </template>
          <!-- result content -->

        </section>
        <!-- result block -->

      </div>
    </div>
    <!-- ELEMENTS HERE -->

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
import { mapState, mapGetters } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'library-content-results',
  props: {
    products: {
      type: Array,
      // required: true,
    },
  },
  components: {
    ElementDraggable: () => import('@/views/library/sections/ElementDraggable.vue'),

    // ProductWrapper: () => import('frontend-modules/shared/modules/common/product/ProductWrapper.vue'),
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
    ElementCardLoader: () => import('frontend-modules/shared/modules/common/product/ElementCardLoader.vue'),

    // Pagination: () => import('@/components/modules/favorites/content/Pagination.vue'),
    Pagination: () => import('@motionelements/core/src/components/ui/BasePagination.vue'),

  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isSelectedAllElementTypes: state => state.library.isSelectedAllElementTypes,
      selectedElementTypes: state => state.library.selectedElementTypes,
      selectedDownloadStatus: state => state.library.selectedDownloadStatus,


      isLoading: state => state.library.loading.status,

      isSelectedElement: state => state.product.isSelectedElement,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      currentFolder: 'library/getCurrentFolder',
      // pagination
      currentPage: 'library/getCurrentPage',
      perPage: 'library/getPerPage',
      totalCount: 'library/getTotalCount',
    }),
    isEmptyResults() {
      return this.products.length === 0 && !this.isLoading;
    },
    hasFilterBar() {
      let checkStatus = false;
      const hasSelectedElementTypes = !!_.size(this.selectedElementTypes);
      const hasSelectedDownloadStatus = (this.selectedDownloadStatus !== 'all');

      if (hasSelectedElementTypes || hasSelectedDownloadStatus) {
        checkStatus = true;
      }

      return checkStatus;
    },
    isSelectedAllElements: {
      get() {
        return this.$store.state.product.isSelectedAllElements;
      },
      set(bool) {
        console.log('isSelectedAllElements', bool);
        this.$store.dispatch('product/setIsSelectAllElements', bool);
      },
    },
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];
      // console.log(currentWindowWidth);

      let status = false;
      if (currentWindowWidth < 1200) {
        status = true;
      }

      return status;
    },
    isDefaultFolder() {
      return this.currentFolder.id === 'default';
    },
    itemCount() {
      return _.get(this.currentFolder, 'items.totalCount', 0);
    },
    showFirstIntroduction() {
      let showFirstIntroduction = false;

      const currentFolderInfo = this.currentFolder;
      const isUncategorized = this.isDefaultFolder;
      const hasElement = this.itemCount > 0;

      if (isUncategorized && !hasElement) {
        showFirstIntroduction = true;
      }

      if (_.isEmpty(currentFolderInfo)) {
        showFirstIntroduction = true;
      }

      return showFirstIntroduction;
    },
  },
  created() {
  },
  // mounted() {
  //   this.$root.$on('getFavoriteContent', () => {
  //     console.log('emit : getFavoriteContent 333');
  //   });
  // },
  methods: {
    onChangePage(page) {
      this.$store.dispatch('library/setCurrentPage', page);
      // push history state
      this.$router.push({
        query: {
          page: page,
        },
      });
    },
    selectAllElement(e) {
      console.log('selectAllElement', e.target.checked);

      this.$store.dispatch('product/setSelectedElementsId', []);

      const isChecked = e.target.checked;
      if (isChecked) {
        const selectElements = [];

        const elements = this.$store.getters['library/contentList'];
        // console.log(elements);

        if (elements) {
          Object.keys(elements).map((key) => {
            const elementId = elements[key].id;
            selectElements.push(elementId);
          });
        }

        this.$store.dispatch('product/setSelectedElementsId', selectElements);
      }
    },
    doAddElementsToCart() {
      // const currentFolderId = this.$store.getters['library/currentFolderId'];
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];

      // const info = {
      //   fromFolderId: currentFolderId,
      //   elements: selectedElementsId,
      // };
      const params = {
        // fromFolderId: currentFolderId,
        skus: selectedElementsId,
      };

      console.log('addElementsToCart', params);

      this.$store.dispatch('library/addElementsToCart', params).then((response) => {
        notificationService.alert({
          level: 'success',
          title: this.$i18n.t('favorites.element_added_to_your_cart'),
        });

        this.$store.dispatch('cart/setItems', response.data.data);
      });
    },
  },
};
</script>
