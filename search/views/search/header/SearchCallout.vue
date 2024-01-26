<template>
  <div v-if="isFreeFilterApplied && !isLoggedIn"
    class="col-callout col-12 col-xl-3 col-xxl-6 mb-3 mb-xl-0">
    <div class="callout-free bg-gradient-free p-3 rounded">
      <div class="d-flex flex-row justify-content-between align-items-center flex-xl-column align-items-xl-stretch flex-xxl-row align-items-xxl-center">
        <p class="mb-0 text-dark no-invert">
          {{ $t('search.callout_free_edm_heading') }}
        </p>
        <button
          @click="onClickFreeEdm()"
          class="btn btn-white-primary btn-sm"
        >
          {{ $t('search.callout_free_edm_cta') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'search-content-callout',
  components: {
  },
  data: function () {
    return {
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
    }),
    isFreeFilterApplied() {
      return this.$route.query.price_range === '-1'
        || this.$route.query.priceRange === '-1';
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getFreeEdmPath() {
      switch (true) {
        case isProductType('ae', this.mediaType):
          return '/free/after-effects-templates';
        case isProductType('music', this.mediaType):
          return '/free/background-music';
        case isProductType('sfx', this.mediaType):
          return '/free/sound-effects';
        case isProductType('pr', this.mediaType):
          return '/free/premiere-pro-templates';
        case isProductType('fcp', this.mediaType):
          return '/free/fcpx-motion-templates';
        case isProductType('gif', this.mediaType):
        case isProductType('image', this.mediaType):
          return '/free/gifs';
        case isProductType('video', this.mediaType):
        default:
          return '/free/stock-footage';
      }
    },
    onClickFreeEdm() {
      window.location.href = this.$link(this.getFreeEdmPath()).param('edm', 'subscribe').url();
    },
  },
};
</script>

<style lang="scss" scoped>

// CALLOUTS

.col-callout {
  position: relative;

  .callout-free {
    @include media-breakpoint-up(xl) {
      position: absolute;
      left: 0;
      right: $spacer;
    }
  }
}

</style>
