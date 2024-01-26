<template>
  <div
    :class="{
      'has-padding' : hasPadding,
      'w-100' : isFullWidth,
      'card-wrapper-lg' : isLargeCard,
      'w-custom' : options.customWidth,
    }"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
    class="card-wrapper card-16-9 d-inline-block mb-3"
  >
    <div class="card card-element border-0 bg-white rounded overflow-hidden">

      <!-- checkbox bar -->
      <div
        v-if="options.checkbox"
        @click.prevent="clickCheckboxBar"
        class="card-header border-0 py-1 py-xl-2 pl-3 pr-2 d-flex justify-content-between"
      >
        <div class="custom-control custom-checkbox">
          <input
            @click.prevent="clickCheckboxBar"
            v-model="selectedElementsId"
            :value="element.id"
            :id="'checkbox-'+element.id"
            class="custom-control-input"
            type="checkbox"
          >
          <label
            :for="'checkbox-'+element.id"
            class="custom-control-label"
          ></label>
        </div>
        <div class="fav-labels text-right d-flex align-items-center justify-content-end">
          <p class="mb-0 small">

            <!-- isPurchased -->
            <!--
            <span
              @mouseover="tooltipShow"
              class="badge badge-pill badge-success fav-label ml-n1"
              title="Purchased"
            >
              <font-awesome-icon :icon="['far','dollar-sign']"></font-awesome-icon>
            </span>
            -->
            <!-- isPurchased -->

            <!-- isDownloadable -->
            <span
              v-show="element.downloadable === true"
              @mouseover="tooltipShow"
              class="badge badge-pill badge-primary fav-label ml-n1"
              :title="$t('product.downloadable')"
            >
              <font-awesome-icon :icon="['far','me-download']"></font-awesome-icon>
            </span>
            <!-- isDownloadable -->

          </p>
        </div>
      </div>
      <!-- checkbox bar -->

      <template v-if="!isAudio">
        <ElementCardVisual
          :element="element"
          :options="options"
          :cardPlayStatus.sync="cardPlayStatus"
          :isExpanded="isExpanded"
        />
      </template>

      <template v-if="isAudio && audioCardType === 'list'">
        <ElementCardAudioList
          :element="element"
          :options="options"
          :cardHoverStatus="cardHoverStatus"
        />
      </template>

      <template v-if="isAudio && audioCardType === 'list-min'">
        <ElementCardAudioListMinimal
          :element="element"
          :options="options"
          :cardHoverStatus="cardHoverStatus"
          :cardPlayStatus.sync="cardPlayStatus"
        />
      </template>

      <template v-if="isAudio && audioCardType === 'card'">
        <ElementCardAudioCard
          :element="element"
          :options="options"
          :isExpanded="isExpanded"
          :cardPlayStatus.sync="cardPlayStatus"
        />
      </template>

      <div
        v-if="options.tagsInput"
        class="card-footer small px-2 border-0"
      >
        <VueInputTag
          v-model="tags"
          :placeholder="tags[0] ? '' : 'Add tags here'"
          :add-tag-on-blur="true"
          :limit="10"
        ></VueInputTag>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

// import '@/assets/scss/vue-input-tag/style.scss';
import '@motionelements/assets/src/scss/vue-input-tag/style.scss';

export default {
  name: 'product-wrapper',
  components: {
    VueInputTag: () => import('vue-input-tag'),
    ElementCardVisual: () => import('./ElementCardVisual.vue'),
    ElementCardAudioList: () => import('./ElementCardAudioList.vue'),
    ElementCardAudioCard: () => import('./ElementCardAudioCard.vue'),
    ElementCardAudioListMinimal: () => import('./ElementCardAudioListMinimal.vue'),
  },
  props: {
    element: Object,
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => ({
        cardType: 'card',
        // cardType: 'list', // only accepts 'list' on audio mediatype

        expand: true,
        favorites: true,
        checkbox: false,

        tagsInput: false,
        fullWidth: false,
        customWidth: false,

        hoverEvent: true,
        enablePlayer: true,

        showMediaTypeBadge: false,

        // showFavoritesIcon: false,
        // showMediaTypeBadge: false,

        // layoutDetailExpand: false,
        // layoutCheckbox: false,
        // layoutTagsInput: false,
      }),
    },

  },
  data() {
    return {
      cardHoverStatus: false,
      cardPlayStatus: '',
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.site.isMobile,
    }),
    isElement() {
      return _.get(this.element, 'object') === 'element';
    },
    isCollection() {
      return _.get(this.element, 'object') === 'collection';
    },
    mediaType() {
      // @deprecated fallback to 'media_type'
      return _.get(this.element, 'mediaType', _.get(this.element, 'media_type'));
    },
    selectedElementsId: {
      get() {
        return this.$store.state.product.selectedElementsId;
      },
      set(elementsId) {
        console.log('selectedElementsId', elementsId);
        this.$store.dispatch('product/addSelectedElement', elementsId);
      },
    },
    isExpanded() {
      const isMobile = this.$store.getters['site/isMobile'];
      let status = false;

      // if option for this.expand is true, no need for cardHoverStatus & cardPlayStatus
      if (this.options.expand) {
        status = true;
      }

      // if option for this.expand is false, determine by cardHoverStatus & cardPlayStatus
      // eslint-disable-next-line default-case
      switch (this.cardPlayStatus) {
        case 'playing':
        case 'paused':
          status = true;
          break;
      }

      if (!isMobile && this.cardHoverStatus) {
        status = true;
      }

      // force enable when is those mediatype or collection on mobile
      let forceExpanded = false;
      const enableList = [
        'image',
        '3d_model',
        'photo',
        'vector',
        'gif',
        'lottie',
      ];
      if (enableList.indexOf(this.mediaType) >= 0) {
        forceExpanded = true;
      }
      if (this.isCollection) {
        forceExpanded = true;
      }
      if (isMobile && forceExpanded) {
        status = true;
      }


      // force enable when is 3d model on desktop
      if (!isMobile && ['3d_model'].includes(this.mediaType)) {
        status = true;
      }


      // force enable when set `options.hoverEvent` true from product wrapper
      if (_.isBoolean(this.options.hoverEvent)) {
        status = (this.options.hoverEvent) ? true : false;
      }

      // console.log('isExpanded - ', isMobile, this.isImage, this.cardHoverStatus, this.isCollection, status);

      return status;
    },
    isFullWidth() {
      if (this.options.fullWidth === true) {
        return true;
      }

      if (this.isAudio && (this.audioCardType === 'list' || this.audioCardType === 'list-min')) {
        return true;
      }

      return false;
    },
    hasPadding() {
      let status = true;

      // if option for this.expand is true, no need for padding at all
      if (this.expand || this.isExpanded) {
        status = false;
      }

      // padding not needed on mobile
      // if (this.isMobileLayout()) {
      //   status = false;
      // }

      // padding not needed for audio mediatype
      if (this.isAudio) {
        status = false;
      }

      return status;
    },
    isImage() {
      const imageList = [
        'image',
        'photo',
        'photo_vr',
        'vector',
        'gif',
      ];

      return imageList.includes(this.mediaType);
    },
    isAudio() {
      const audioList = [
        'music',
        'sfx',
      ];

      return audioList.includes(this.mediaType);
    },
    isLargeCard() {
      if (this.isCollection) {
        return true;
      }

      const largeCardType = [
        'ae_template',
        'ae_preset',
        'pr_template',
        'pr_preset',
        'mg_template',
        'resolve_template',
        'resolve_macro',
        'motion_template',
        'music',
        'sfx',
      ];

      return largeCardType.includes(this.mediaType);
    },
    audioCardType() {
      let status = 'list'; // show list by default for audio

      if (this.options.cardType) {
        status = this.options.cardType; // override with options
      }

      if (this.isMobileLayout()) {
        status = 'card'; // always show card on mobile
      }

      return status;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    clickCheckboxBar() {
      const clickElementId = this.element.id;
      let selectedElementsId = this.$store.getters['product/selectedElementsId'];

      // @todo what is this?
      const isAdd = selectedElementsId.indexOf(clickElementId) >= 0;

      if (isAdd) {
        selectedElementsId = _.without(selectedElementsId, clickElementId);
      }

      if (!isAdd) {
        selectedElementsId.push(clickElementId);
      }

      console.log('clickCheckboxBar', selectedElementsId);

      this.$store.dispatch('product/setSelectedElementsId', selectedElementsId);
      this.$store.dispatch('product/setIsSelectAllElements', false);
    },
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      let status = false;
      if (currentWindowWidth < 1200) {
        status = true;
      }

      return status;
    },
    tooltipShow(event) {
      const $target = $(event.target);
      const text = _.startCase(event.target.title);

      if (!text) {
        return;
      }

      $target
        .attr('data-original-title', text)
        .tooltip({
          container: 'body',
          placement: 'bottom',
        })
        .tooltip('show');
    },
    toggleHover(bool) {
      if (this.hoverEvent) {
        this.cardHoverStatus = bool;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

  &:not(.w-custom) {

    // SETTING WIDTH
    // --
    // -- FOR SMALL SIZE
    // --

    // add margin right spacer when more than 1 thumbnail per row
    @media (min-width: map-get(map-get($card-breakpoints,"sm"),2)) {
      margin-right: $spacer;
    }

    @each $num, $minWidth in map-get($card-breakpoints,"sm") {
      @if $num == 1 {

        // width when only 1 thumbnail per row
        @media (max-width: map-get(map-get($card-breakpoints,"sm"),$num + 1) - 0.05px) {
          width: 100%;
        }

      } @else {

        @if $num < length(map-get($card-breakpoints,"sm")) {

          // width when more than 2 thumbnails per row, but not the largest value
          @media (min-width: $minWidth) and (max-width: map-get(map-get($card-breakpoints,"sm"),$num + 1) - 0.05px) {
            width: calc(#{(100% / $num)} - 1rem);
          }

        } @else {

          // fixed width when larger than largest value
          @media (min-width: $minWidth) {
            &.card-16-9 {
              width: map-get($card-max-height,"sm") * 16 / 9;
            }

            &.card-9-16, &.card-1-1 {
              width: map-get($card-max-height,"sm");
            }
          }
        }
      }
    }

    // SETTING WIDTH
    // --
    // -- FOR LARGE SIZE
    // --

    &.card-wrapper-lg {
      @media (min-width: map-get(map-get($card-breakpoints,"lg"),2)) {
        margin-right: $spacer;
      }

      @each $num, $minWidth in map-get($card-breakpoints,"lg") {
        @if $num == 1 {

          // width when only 1 thumbnail per row
          @media (max-width: map-get(map-get($card-breakpoints,"lg"),$num + 1) - 0.05px) {
            width: 100%;
          }

        } @else {

          @if $num < length(map-get($card-breakpoints,"lg")) {

            // width when more than 2 thumbnails per row, but not the largest value
            @media (min-width: $minWidth) and (max-width: map-get(map-get($card-breakpoints,"lg"),$num + 1) - 0.05px) {
              width: calc(#{(100% / $num)} - 1rem);
            }

          } @else {

            // fixed width when larger than largest value
            @media (min-width: $minWidth) {
              &.card-16-9 {
                width: map-get($card-max-height,"lg") * 16 / 9;
              }

              &.card-9-16, &.card-1-1 {
                width: map-get($card-max-height,"lg");
              }
            }
          }
        }
      }
    }
  }

}

// ADD SHADOWS

.card-element {
  transition: box-shadow 0.15s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  @include box-shadow($box-shadow-sm);

  .card-wrapper:hover & {
    @include box-shadow($box-shadow);
  }
}

// ADD PADDING FOR VISUAL CARDS ON NON-EXPANDED
.has-padding {
  padding-bottom: map-get($spacers,5)
}

// CHANGE CURSOR TO MOVE CURSOR ON SELECTED
.card-header {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}
</style>
