<template>
  <div>
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

            <!--
            <button
              type="button"
              class="btn btn-toolbar-btn btn-white-secondary dropdown-toggle dropdown-toggle-split btn-checkbox btn-checkbox-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-reference="parent"
            >
              <span class="sr-only">Toggle Dropdown</span>
            </button>

            <div class="dropdown-menu">
              <a class="dropdown-item" href="#">All</a>
              <a class="dropdown-item" href="#">Purchased</a>
              <a class="dropdown-item" href="#">Not purchased</a>
            </div>
            -->

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
                :title="$t('favorites.move_to_folder')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width></font-awesome-icon>
              </a>

              <a
                disabled
                @mouseenter="tooltipShow"
                :title="$t('favorites.remove_from_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','trash-alt']" fixed-width></font-awesome-icon>
              </a>

              <!-- TAG BUTTON : disabled until developed -->
              <!--
              <a
                @mouseenter="tooltipShow"
                title="Add tags"
                class="btn btn-toolbar-btn btn-white-secondary py-1 px-2"
              >
                <font-awesome-icon :icon="['fal','tag']" fixed-width></font-awesome-icon>
              </a>
              -->
              <!-- TAG BUTTON : disabled until developed -->

            </div>
          </template>

          <template v-if="(isSelectedElement === true)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>
              <a
                @click="onClickMoveToFolder"
                @mouseenter="tooltipShow"
                :title="$t('favorites.move_to_folder')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width/>
              </a>
              <a
                @click="onClickRemove()"
                @mouseenter="tooltipShow"
                :title="$t('favorites.remove_from_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','trash-alt']" fixed-width/>
              </a>

              <!-- TAG BUTTON : disabled until developed -->
              <!--
              <a
                @mouseenter="tooltipShow"
                title="Add tags"
                class="btn btn-toolbar-btn btn-white-secondary py-1 px-2"
              >
                <font-awesome-icon :icon="['fal','tag']" fixed-width></font-awesome-icon>
              </a>
              -->
              <!-- TAG BUTTON : disabled until developed -->

            </div>
          </template>

          <!-- ELEMENT TOOLS i.e. move, copy, delete and tag -->

          <!-- QUOTATION BUTTON -->
          <!--
          <div class="d-flex align-items-center">
            <div class="vertical-divider"></div>
            <a
              @mouseenter="tooltipShow"
              title="Generate Quotation"
              class="btn btn-toolbar-btn btn-white-secondary py-1 px-2"
            >
              <font-awesome-icon :icon="['fal','file-invoice-dollar']" fixed-width></font-awesome-icon>
            </a>
          </div>
          -->
          <!-- QUOTATION BUTTON -->
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
                :title="$t('favorites.move_selected_to_folder')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width/>
              </a>

              <a
                disabled
                @mouseenter="tooltipShow"
                :title="$t('favorites.remove_selected_from_favorites')"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','trash-alt']" fixed-width/>
              </a>

              <!-- TAG BUTTON : disabled until developed -->
              <!--
              <a
                @mouseenter="tooltipShow"
                title="Add tags"
                class="btn btn-toolbar-btn btn-white-secondary py-1 px-2"
              >
                <font-awesome-icon :icon="['fal','tag']" fixed-width></font-awesome-icon>
              </a>
              -->
              <!-- TAG BUTTON : disabled until developed -->

            </div>
          </template>

          <template v-if="(isSelectedElement === true)">
            <div
              class="align-items-center d-flex"
            >
              <div class="vertical-divider"></div>
              <a
                @click="onClickMoveToFolder"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','me-folder-move']" fixed-width/>
              </a>
              <a
                @click="onClickRemove"
                class="btn btn-toolbar-btn btn-white-secondary px-2"
              >
                <font-awesome-icon :icon="['fal','trash-alt']" fixed-width/>
              </a>

            </div>
          </template>
        </div>
        <!-- mobile mode-->

        <!-- MORE BUTTON -->
        <!--
        <div class="d-flex align-items-center d-md-none">
          <div class="vertical-divider"></div>
          <div class="dropdown">

            <button
              @mouseenter="tooltipShow"
              :title="$t('favorites.more')"
              class="btn btn-white-secondary dropdown-toggle no-caret"
              type="button"
              id="menuMore"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <font-awesome-icon :icon="['far','ellipsis-v']" fixed-width></font-awesome-icon>
              <span class="sr-only">More Actions</span>
            </button>

            <div class="dropdown-menu" aria-labelledby="menuMore">
              <button class="dropdown-item d-block d-md-none" type="button" @click="moveElements()">
                {{ $t('favorites.move_to') }}
              </button>
              <button class="dropdown-item d-block d-md-none" type="button" @click="copyElements()">Copy To</button>
              <button class="dropdown-item d-block d-md-none" type="button" @click="deleteElements()">
                {{ $t('favorites.delete') }}
              </button>
              <div class="dropdown-divider d-block d-md-none"></div>
              <button class="dropdown-item" type="button">Generate Quotation</button>
            </div>
          </div>
        </div>
        -->
        <!-- MORE BUTTON -->

      </div>

      <div class="dropdown mr-2">
        <button
          @click="filterElements()"
          class="btn btn-light text-body"
          type="button"
        >
          <font-awesome-icon :icon="['far','filter']" fixed-width size="sm" class="mr-1"></font-awesome-icon>
          <span class="d-none d-sm-inline">
              {{ $t('favorites.filter') }}
            </span>
        </button>
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
        <!-- FILTER BAR block-->
        <p class="d-none d-lg-block">

          <template
            v-if="isSelectedAllElementTypes === false"
          >
            <a
              @click="cancelFilter('ae')"
              v-if="(selectedElementTypes.indexOf('ae') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-after-effects-square"></i>
              {{ $term('mediaType', 'ae').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('pr')"
              v-if="(selectedElementTypes.indexOf('pr') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-premiere-pro"></i>
              {{ $term('mediaType', 'pr').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('resolve')"
              v-if="(selectedElementTypes.indexOf('resolve') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-davinci-resolve"></i>
              {{ $term('mediaType', 'resolve').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('motion')"
              v-if="(selectedElementTypes.indexOf('motion') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-apple-motion"></i>
              {{ $term('mediaType', 'fcp').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('video')"
              v-if="(selectedElementTypes.indexOf('video') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-video"></i>
              {{ $term('mediaType', 'video').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('image')"
              v-if="(selectedElementTypes.indexOf('image') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-image"></i>
              {{ $term('mediaType', 'image').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('music')"
              v-if="(selectedElementTypes.indexOf('music') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-music"></i>
              {{ $term('mediaType', 'music').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('sfx')"
              v-if="(selectedElementTypes.indexOf('sfx') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-sfx"></i>
              {{ $term('mediaType', 'sfx').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('3d')"
              v-if="(selectedElementTypes.indexOf('3d') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-3d-model"></i>
              {{ $term('mediaType', '3d').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('lottie')"
              v-if="(selectedElementTypes.indexOf('lottie') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-lottie"></i>
              {{ $term('mediaType', 'lottie').text() }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

            <a
              @click="cancelFilter('collection')"
              v-if="(selectedElementTypes.indexOf('collection') >= 0)"
              v-cloak
              class="btn btn-sm btn-success mr-2"
            >
              <i class="fas fa-fw me-bmt icon-collection"></i>
              {{ $t('term.collection') }}
              <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
            </a>

          </template>

          <a
            @click="cancelFilter('downloadable')"
            v-if="(selectedDownloadStatus === '1')"
            v-cloak
            class="btn btn-sm btn-success mr-2"
          >
            <font-awesome-icon :icon="['fas', 'me-download']" fixed-width />
            {{ $t('favorites.downloadable') }}
            <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
          </a>

          <a
            @click="cancelFilter('downloadable')"
            v-if="(selectedDownloadStatus === '-1')"
            v-cloak
            class="btn btn-sm btn-success mr-2"
          >
            <font-awesome-layers fixed-width>
              <font-awesome-icon :icon="['fas', 'me-download']" />
              <font-awesome-icon :icon="['fas', 'ban']" class="text-body" transform="shrink-3" />
            </font-awesome-layers>
            {{ $t('favorites.not_downloadable') }}
            <font-awesome-icon :icon="['fas','times']" fixed-width></font-awesome-icon>
          </a>

          <a
            @click.prevent="cancelFilter('all')"
            v-if="hasFilterBar"
            v-cloak
            class="small font-weight-bold ml-2">{{ $t('search.clear_all_filters') }}
          </a>
        </p>
        <!-- FILTER BAR block-->
      </div>

    </div>
    <!-- FILTERS APPLIED -->
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'library-toolbar',
  components: {
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
    }),
    hasFilterBar() {
      let checkStatus = false;
      const hasSelectedElementTypes = _.size(this.selectedElementTypes) ? true : false;
      const hasSelectedDownloadStatus = (this.selectedDownloadStatus !== 'all') ? true : false;

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
  },
  created() {
  },
  methods: {
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
    onClickMoveToFolder() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderMove.vue'),
        }),
        props: {
        },
      });
    },
    // moveElements() {
    //   $('#favgrp-move').modal('show');
    // },
    onClickRemove() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderConfirmRemoveElement.vue'),
        }),
        props: {
        },
      });
      // $('#deleteElementWarning').modal('show');
    },
    filterElements() {
      this.$root.$emit('syncModalInput');

      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FavoritesFilters.vue'),
        }),
        props: {
        },
      });
      // $('#favgrp-filters').modal('show');
    },
    doAddElementsToCart() {
      // const currentFolderId = this.currentFolderId;
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
        // this.$store.dispatch('cart/listItems');
      });
    },
    cancelFilter(elementType) {
      const isCleanAll = (elementType === 'all') ? true : false;

      // const folderId = this.$route.params.folderId;
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
        const onlyOneMediaType = typeof (filterElementTypes) === 'string';

        if (!onlyOneMediaType) {
          queryString['mt[]'] = _.remove(filterElementTypes, name => name !== elementType);
        }

        this.$router.push({
          query: queryString,
        });

        // this.$router.push({
        //   path: this.$link(`/favorites/edit/${folderId}`).url(),
        //   query: queryString,
        // });
      }

      if (isCleanAll) {
        // console.log('isCleanAll:', this.$link(`/favorites/edit/${folderId}`).url());
        this.$router.push({
          query: {},
        });
      }
    },
  },
};
</script>
