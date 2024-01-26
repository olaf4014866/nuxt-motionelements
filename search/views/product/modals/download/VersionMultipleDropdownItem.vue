<template>
  <div
    v-if="isAvailable"
    class="dropdown-item"
  >
    <div
      class="d-flex justify-content-between align-items-center"
      @click="$emit('select-variant', variant.id)"
      style="min-height: 2rem"
    >
      <div class="d-flex flex-column align-items-start">
        <p class="ver-label text-dark">
          {{ format ? _.toUpper(format) : $t('product.custom') }}
        </p>
        <p v-if="showInfo && moreInfo" class="ver-label-info small text-muted mb-0">
          {{ moreInfo }}
        </p>
      </div>
      <div class="ver-price text-right">
        <template v-if="isFree">
          {{ $t('product.free') }}
        </template>
        <template v-else-if="isDownloadable">
          Purchased
        </template>
        <template v-else-if="isSubscriber">
          <PriceLabelFreeSubscription/>
        </template>
        <template v-else-if="isSubscriptionOnly">
          Subscription Only
        </template>
        <template v-else-if="credits > 0">
          <VariantPriceLabel
            :variant="variant"
          />
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';

export default {
  name: 'version-multiple',
  props: {
    element: {
      type: Object,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
    showInfo: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // PriceLabel: () => import('@/views/product/components/cta/PriceLabel.vue'),
    VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
    PriceLabelFreeSubscription: () => import('@/views/product/components/cta/PriceLabelFreeSubscription.vue'),
  },
  computed: {
    ...mapState({
      memberSubscriptions: state => state.user.member.subscriptions,
    }),
    format() {
      return this.variant.format;
    },
    credits() {
      return this.variant.credits;
    },
    isFree() {
      return !!this.variant.free;
    },
    isAvailable() {
      return this.isFree || this.variant.subscription || this.isDownloadable || this.variant.credits > 0;
    },
    isDownloadable() {
      // if (this.isSubscriber) {
      //   return true;
      // }
      return this.variant && !!this.variant.downloadable;
    },
    isSubscriptionOnly() {
      return !this.isFree && this.variant.credits === false && this.variant.subscription === true;
    },
    isSubscriber() {
      return isElementVariantDownloadableBySubscription(this.element, this.variant, this.memberSubscriptions);
    },
    moreInfo() {
      switch (this.element.mediaType) {
        default:
          if (this.variant.width && this.variant.height) {
            return `${this.variant.width} x ${this.variant.height}`;
          }
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ver-label, .ver-price, .ver-price p {
  margin-bottom: 0;
}

.ver-label, .ver-label-info {
  line-height: 1.5;
}

.ver-label {
  font-weight: bold;
}

// &.active {
//   padding: 0.125rem 0.875rem;
//   border-width: .125rem;
//   border-color: $primary !important;
// }

.ver-price {
  line-height: 1.5;
}

// COLORS

.dropdown-item {
  &.active, &:hover {
    color: $dark;
    cursor: pointer;

    .ui-dark & {
      color: $light;
    }
  }

  &.active {
    background: map-get(map-get($theme-colors-variants,"light"),"1");
  }
  &:hover {
    &:not(.active) {
      background: map-get(map-get($theme-colors-variants,"light"),"0");
    }
  }

  .ui-dark & {
    &.active {
      background: map-get(map-get($theme-colors-variants,"dark"),"0");
    }
    &:hover {
      &:not(.active) {
        background: map-get(map-get($theme-colors-variants,"dark"),"1");
      }
    }
  }

}
</style>
