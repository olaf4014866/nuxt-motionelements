<template>
  <div
    class="card-wrapper card-wrapper-lg card-16-9 d-inline-block mb-3"
    :class="!showTitle ? 'hide-title' : ''"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
  >
    <!-- IF NOT IMAGE OR VIDEO, ADD .card-wrapper-lg FOR LARGER SIZE -->

    <div class="card card-element border-0 bg-white rounded overflow-hidden">

      <div class="card-header border-0 py-1 py-xl-2 pl-3 pr-2 d-flex justify-content-between">
        <div class="custom-control custom-checkbox">
          <input
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

            <span class="badge badge-pill badge-success fav-label ml-n1" @mouseover="tooltipShow" title="Purchased">
              <font-awesome-icon :icon="['far','dollar-sign']"></font-awesome-icon>
            </span>

            <span class="badge badge-pill badge-info fav-label ml-n1" @mouseover="tooltipShow" title="Downloaded">
              <font-awesome-icon :icon="['far','me-download']"></font-awesome-icon>
            </span>

          </p>
        </div>
      </div>

      <template>
        <ElementCardVisual
          :element="element"
          :hideTitle="hideTitle"
          :isHover="isHover"
        ></ElementCardVisual>
      </template>

      <div class="card-footer small px-2 border-0">
        <input-tag
            v-model="tags"
            :placeholder="tags[0] ? '' : 'Add tags here'"
            :add-tag-on-blur="true"
            :limit="10"></input-tag>
      </div>

    </div>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag';

// import '@/assets/scss/vue-input-tag/style.scss';
// load it on "<style lang="scss" scoped>"

export default {
  name: 'product-wrapper',
  components: {
    'input-tag': InputTag,
    ElementCardVisual: () => import('@/views/demo/content/ElementCardVisual.vue'),
  },
  data: function () {
    return {
      isHover: false,
    };
  },
  props: {
    element: Object,
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    hideTitle: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    showTitle() {
      if (this.isHover || !this.hideTitle) {
        return true;
      }
      return false;
    },
  },
  methods: {
    tooltipShow: function (event) {
      var $target = $(event.target);
      var text = event.target.title;

      if (text) {
        $target
          .tooltip({
            container: 'body',
            title: text,
            placement: 'top',
          })
          .tooltip('show');
      }
    },
    toggleHover(bool) {
      this.isHover = bool;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@motionelements/assets/src/scss/vue-input-tag/style.scss';
// import '@/assets/scss/vue-input-tag/style.scss';

.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

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

// ADD SHADOWS

.card-element {
  transition: box-shadow 0.15s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  @include box-shadow($box-shadow-sm);

  .card-wrapper:hover & {
    @include box-shadow($box-shadow);
  }
}

// ADD PADDING FOR HOVER
.hide-title {
  padding-bottom: map-get($spacers,5)
}
</style>
