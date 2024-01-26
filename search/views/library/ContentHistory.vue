<template>
  <div class="col pt-lg-4">

    <div class="py-4 d-lg-none">
      <!-- TOGGLE TO SEE LIST OF GROUPS ON MOBILE -->
      <button
        @click="enableMobileSidebar()"
        class="btn btn-sidebar-toggle btn-light pl-3 ml-n3"
      >
        <font-awesome-icon :icon="['fas','folders']" fixed-width class="mr-1"></font-awesome-icon>
        {{ $t('favorites.see_all_folders') }}
      </button>
    </div>

    <!-- FAVORITE GROUP TITLE & ACTIONS -->
    <div class="d-flex flex-column flex-sm-row align-items-sm-start justify-content-between">
      <div class="project-info mb-3 text-center text-sm-left">
        <h4 class="">
          {{ $t('favorites.history') }}
        </h4>
      </div>
      <div class="project-actionables d-flex flex-column flex-xxl-row align-items-center align-items-sm-end align-items-xxl-center mb-3">
        <ul class="list-inline mb-2 mb-xxl-0 text-center text-sm-right">
        </ul>
      </div>
    </div>
    <!-- FAVORITE GROUP TITLE & ACTIONS -->

    <!-- TOOLBAR -->
    <div class="d-flex flex-row border-top border-bottom py-2 mb-3 align-items-stretch align-items-sm-center justify-content-between">
      <div class="d-flex align-items-center flex-grow-1">

        <!-- SELECT CHECKBOX & DROPDOWN BUTTON -->
        <div>
          <div class="btn-group">

            <!-- select all button -->
            <div class="btn btn-toolbar-btn btn-white-secondary btn-checkbox pr-0">
              <div class="custom-control custom-checkbox">
                <input
                  @click="selectAllElement"
                  v-model="isSelectedAllElements"
                  type="checkbox"
                  class="custom-control-input"
                  id="selectAll"
                >
                <label
                  class="custom-control-label"
                  for="selectAll"
                ></label>
              </div>
            </div>
            <!-- select all button -->

          </div>
        </div>

        <!-- SELECT CHECKBOX & DROPDOWN BUTTON -->

        <!-- desktop mode-->
        <div class="d-none d-md-flex">

          <!-- ELEMENT TOOLS i.e. move, copy, delete and tag -->
          <template v-if="(isSelectedElement === false)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>

              <a
                disabled
                @mouseenter="tooltipShow"
                :title="$t('favorites.add_to_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width/>
              </a>

            </div>
          </template>

          <template v-if="(isSelectedElement === true)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>
              <a
                @click="copyElements($event)"
                @mouseenter="tooltipShow"
                :title="$t('favorites.add_to_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width/>
              </a>

            </div>
          </template>

        </div>
        <!-- desktop mode-->

        <!-- mobile mode-->
        <div class="d-flex align-items-center d-md-none">

          <template v-if="(isSelectedElement === false)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>

              <a
                disabled
                @mouseenter="tooltipShow"
                :title="$t('favorites.add_to_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width></font-awesome-icon>
              </a>
            </div>
          </template>

          <template v-if="(isSelectedElement === true)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>
              <a
                @click="copyElements($event)"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width></font-awesome-icon>
              </a>
            </div>
          </template>
        </div>
        <!-- mobile mode-->

      </div>

      <div class="dropdown mr-2">
      </div>

      <!-- ADD TO CART BUTTON -->
      <div>

        <template v-if="(isSelectedElement === false)">
          <a
            disabled
            @mouseenter="tooltipShow"
            :title="$t('favorites.select_element_to_add_to_cart')"
            class="btn btn-toolbar-btn btn-primary d-inline-block"
            href="#"
          >
            <font-awesome-icon :icon="['far','shopping-cart']" fixed-width class="mr-1"></font-awesome-icon>
            <span class="d-none d-sm-inline">{{ $t('favorites.add_selected_to_cart') }}</span>
          </a>
        </template>

        <template v-if="(isSelectedElement === true)">
          <a
            @click="doAddElementsToCart()"
            class="btn btn-toolbar-btn btn-primary d-inline-block"
            href="#"
          >
            <font-awesome-icon :icon="['far','shopping-cart']" fixed-width class="mr-1"></font-awesome-icon>
            <span class="d-none d-sm-inline">{{ $t('favorites.add_selected_to_cart') }}</span>
          </a>
        </template>

      </div>
      <!-- ADD TO CART BUTTON -->

    </div>
    <!-- TOOLBAR -->

    <!-- FILTERS APPLIED -->
    <div class="row">
      <div class="col-12">
      </div>
    </div>
    <!-- FILTERS APPLIED -->

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
          <template v-if="(contentList.length === 0) && !isLoading">
            <div class="py-5 text-center">

              <!--
              <p>
                <font-awesome-icon :icon="['fal','folder-open']" size="4x"></font-awesome-icon>
              </p>

              <p class="h4">
                {{ $t('favorites.result_folder_empty_heading') }}
              </p>
              -->

            </div>
          </template>
          <!-- no element -->

          <template v-if="(contentList.length > 0) && !isLoading">
            <ElementDraggable
              v-for="element in contentList"
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
              ></ProductWrapper>
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
<!--        <HistoryPagination-->
<!--          :currentPage="this.pagination.currentPage"-->
<!--          :totalPage="this.pagination.totalPage"-->
<!--          :totalCount="this.pagination.totalCount"-->
<!--          :itemPerPage="this.pagination.itemPerPage"-->
<!--        ></HistoryPagination>-->
      </div>
    </div>
    <!-- PAGINATION -->


    <!-- MODALS -->
    <SettingsModal/>
    <HistoryCopyModal/>

    <DeleteFolderWarning
      id="deleteFolderWarning"
      type="danger"
    />

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'history-content',
  components: {
    ElementDraggable: () => import('@/views/library/sections/ElementDraggable.vue'),
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
    ElementCardLoader: () => import('frontend-modules/shared/modules/common/product/ElementCardLoader.vue'),

    SettingsModal: () => import('@/components/modules/favorites/modals/folder/Settings.vue'),

    // FolderCopyModal: () => import('@/components/modules/favorites/modals/folder/Copy.skip.vue'),

    HistoryCopyModal: () => import('@/components/modules/favorites/modals/history/Copy.vue'),
    Pagination: () => import('@motionelements/core/src/components/ui/BasePagination.vue'),

    DeleteFolderWarning: () => import('@/components/modules/favorites/modals/folder/DeleteFolder.vue'),
  },
  data() {
    return {
      // pagination: {
      //   currentPage: 0,
      //   totalPage: 0,
      //   totalCount: 0,
      //   itemPerPage: 10,
      // },
    };
  },
  computed: {
    ...mapState({
      isSelectedAllElementTypes: state => state.library.isSelectedAllElementTypes,
      selectedElementTypes: state => state.library.selectedElementTypes,
      selectedDownloadStatus: state => state.library.selectedDownloadStatus,

      // currentFolderInfo: state => state.library.currentFolderInfo,
      // currentFolderId: state => state.library.currentFolderId,
      // currentFolderCreatedTime: state => state.favorites.currentFolderInfo.created_at,

      isLoading: state => state.library.loading.status,

      isSelectedElement: state => state.product.isSelectedElement,

    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      sidebarList: 'library/getFavoritesFolders',
      showMoreFolder: 'library/showMoreFolder',

      // pagination
      currentPage: 'library/getCurrentPage',
      perPage: 'library/getPerPage',
      totalCount: 'library/getTotalCount',

    }),
    // hasFilterBar() {
    //   let checkStatus = false;
    //   const hasSelectedElementTypes = _.size(this.selectedElementTypes) ? true : false;
    //   const hasSelectedDownloadStatus = (this.selectedDownloadStatus !== 'all') ? true : false;

    //   if (hasSelectedElementTypes || hasSelectedDownloadStatus) {
    //     checkStatus = true;
    //   }

    //   return checkStatus;
    // },
    // currentFolderCreatedTime() {
    //   const currentFolderInfo = this.$store.getters['favorites/currentFolderInfo'];

    //   let createTime = new Date('1970-01-01T00:00:00Z');

    //   if (_.size(currentFolderInfo)) {
    //     createTime = new Date(currentFolderInfo.created_at);
    //   }

    //   return createTime;
    // },
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
    contentList() {
      // const list = this.$store.getters['favorites/contentList'];
      // console.log('contentList', list);
      // return this.$store.getters['favorites/contentList'];

      const list = this.$store.getters['library/contentList'];
      console.log('contentList : ', list);

      return list.slice(0, 50);
    },
  },
  created() {
    // const lang = this.$route.params.lang;
    // console.log('Payout created', this.$route.params);

    const hasPage = _.size(this.$route.query.page) ? true : false;
    if (!hasPage) {
      this.$router.push({
        path: this.$link('/history/list').fullPath(),
        query: {
          page: 1,
        },
      });
    }
  },
  mounted() {
  },
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

    enableMobileSidebar() {
      this.$store.dispatch('site/enableMobileSidebar');
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
    tooltipShow(event) {
      // console.log('tooltipShow', event.target);

      var $target = $(event.target);
      var text = event.target.title;
      // console.log('tooltipShow', text);

      if (!text) {
        return;
      }

      $target
        .attr('data-original-title', text)
        .tooltip({
          // title: text,
          container: 'body',
          placement: 'bottom',
        })
        .tooltip('show');
    },
    copyElements() {
      $('#favgrp-copy').modal('show');
    },
    // moveElements() {
    //   $('#favgrp-move').modal('show');
    // },
    // deleteElements() {
    //   $('#deleteElementWarning').modal('show');
    // },
    // filterElements() {
    //   this.$root.$emit('syncModalInput');
    //   $('#favgrp-filters').modal('show');
    // },
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
        console.log('addElementsToCart done : ', response);

        notificationService.alert({
          level: 'success',
          title: this.$i18n.t('favorites.element_added_to_your_cart'),
        });

        this.$store.dispatch('cart/setItems', response.data.data);
      });
    },
    cancelFilter(elementType) {
      const isCleanAll = (elementType === 'all') ? true : false;

      const folderId = this.$route.params.folderId;
      const filterDownloadable = this.$route.query.downloadable;
      const filterElementTypes = this.$route.query['mt[]'];

      console.log('cancelFilter', filterDownloadable);
      console.log('cancelFilter', filterElementTypes);

      if (!isCleanAll) {
        const queryString = {};

        if (elementType === 'downloadable') {
          queryString.downloadable = 'all';
        }

        // when only one filter selected will return string
        const onlyOneMediaType = typeof (filterElementTypes) === 'string' ? true : false;

        if (!onlyOneMediaType) {
          queryString['mt[]'] = _.remove(filterElementTypes, name => name !== elementType);
        }

        this.$router.push({
          path: this.$link(`/favorites/edit/${folderId}`).fullPath(),
          query: queryString,
        });
      }

      if (isCleanAll) {
        this.$router.push({
          path: this.$link(`/favorites/edit/${folderId}`).fullPath(),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-sidebar-toggle {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  // DISABLED BUTTONS
  .btn.disabled, .btn:disabled {
    cursor: not-allowed;
  }

  // EDIT BUTTON IN PROJECT NAME
  @include media-breakpoint-up(xl) {
    .folder-name {
      .folder-name-icon-edit {
        opacity: 0.25;
        transition: opacity .2s ease;
      }

      &:hover {
        .folder-name-icon-edit {
          opacity: 1;
        }
      }
    }
  }

  // DIVIDER IN TOOLBAR
  .vertical-divider {
    height: $line-height * $font-size-base;
    margin: 0 0.5rem;
    border-left: $hr-border-width solid $hr-border-color;
  }

  // RESPONSIVE SMALL BUTTON AND INPUTS ON SMALL SCREENS
  @include media-breakpoint-down(sm) {
    .btn-responsive-sm {
      @include button-size($btn-padding-y-sm,$btn-padding-x-sm,$btn-font-size-sm,$btn-line-height-sm,$btn-border-radius-sm);
    }

    .input-group-responsive-sm > .form-control:not(textarea),
    .input-group-responsive-sm > .custom-select {
      height: $input-height-sm;
    }

    .input-group-responsive-sm > .form-control,
    .input-group-responsive-sm > .custom-select,
    .input-group-responsive-sm > .input-group-prepend > .input-group-text,
    .input-group-responsive-sm > .input-group-append > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend > .btn,
    .input-group-responsive-sm > .input-group-append > .btn {
      padding: $input-padding-y-sm $input-padding-x-sm;
      @include font-size($input-font-size-sm);
      line-height: $input-line-height-sm;
      @include border-radius($input-border-radius-sm);
    }

    .input-group-responsive-sm > .input-group-prepend > .btn,
    .input-group-responsive-sm > .input-group-prepend > .input-group-text,
    .input-group-responsive-sm > .input-group-append:not(:last-child) > .btn,
    .input-group-responsive-sm > .input-group-append:not(:last-child) > .input-group-text,
    .input-group-responsive-sm > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),
    .input-group-responsive-sm > .input-group-append:last-child > .input-group-text:not(:last-child),
    .input-group-responsive-sm > .form-control:not(:last-child) {
      @include border-right-radius(0);
    }

    .input-group-responsive-sm > .input-group-append > .btn,
    .input-group-responsive-sm > .input-group-append > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend:not(:first-child) > .btn,
    .input-group-responsive-sm > .input-group-prepend:not(:first-child) > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend:first-child > .btn:not(:first-child),
    .input-group-responsive-sm > .input-group-prepend:first-child > .input-group-text:not(:first-child),
    .input-group-responsive-sm > .form-control:not(:first-child)  {
      @include border-left-radius(0);
    }
  }

  // REMOVE CARET FROM DROPDOWN .no-caret
  .dropdown-toggle.no-caret{
    &:after{
      display:none;
    }
  }

  //
  // COLORS
  //

  .btn-checkbox {
    &, &.active, &:active, &:hover, &:focus {
      background: $transparent;
      border-color: $transparent;
      box-shadow: 0 0 0 $transparent !important;
    }
  }

  .btn-toolbar-btn {
    &.btn-white-secondary {
      background: $transparent;
      border-color: $transparent;
    }

    &:disabled, &.disabled, &[disabled] {
      opacity: .5;
      cursor: no-drop;
    }
  }
</style>
