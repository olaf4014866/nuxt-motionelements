<template>
  <div
    :class="{'col-aux-lg' : isLargeCard }"
    class="col-aux mb-3"
  >
    <div class="div-aux shadow-sm rounded overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'content-aside',
  props: {
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      currentMediaTypeCode: state => state.search.mediaType,
    }),
    largeCardMediaType() {
      return isProductType('video_template', this.currentMediaTypeCode)
        || isProductType('audio', this.currentMediaTypeCode);

      /*
      const currentMediaType = this.$store.getters['site/currentMediaType'];

      let status = false;
      const largeCardType = [
        'ae',
        'ae-template',
        'ae-preset',
        'pr',
        'pr-template',
        'pr-preset',
        'mg-template',
        'motion-template',
        'music',
        'sfx',
      ];

      if (largeCardType.indexOf(currentMediaType.id) >= 0) {
        status = true;
      }

      return status;

       */
    },
    isLargeCard() {
      return (this.largeCardMediaType || this.size === 'lg');
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.col-aux {
  // SET FULL WIDTH BY DEFAULT
  width: 100%;
  margin-right: $spacer;

  @include media-breakpoint-down(md) {
    margin-left: $spacer;
  }

  @each $num, $size in map-get($card-breakpoints,'sm') {

    @if $num == length(map-get($card-breakpoints,'sm')) {
      // IF LARGEST BREAKPOINT, SET FIXED WIDTH
      @media (min-width: $size) {
        width: calc(#{map-get($card-max-height, 'sm') * 16 / 9} + 2rem);
      }

    } @else {
      // IF NOT, USE COMPLICATED FORMULA
      @media (min-width: max($size, 768px)) {
        width: calc( (100% - 5rem - #{$num}rem) / #{$num + 1} + 2rem )
      }
    }
  }

  &.col-aux-lg {
    @each $num, $size in map-get($card-breakpoints,'lg') {

      @if $num == length(map-get($card-breakpoints,'lg')) {
        // IF LARGEST BREAKPOINT, SET FIXED WIDTH
        @media (min-width: $size) {
          width: calc(#{map-get($card-max-height, 'lg') * 16 / 9} + 2rem);
        }

      } @else {
        // IF NOT, USE COMPLICATED FORMULA
        @media (min-width: max($size, 768px)) {
          width: calc( (100% - 5rem - #{$num}rem) / #{$num + 1} + 2rem )
        }
      }
    }
  }
}
</style>
