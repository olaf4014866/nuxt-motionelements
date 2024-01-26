<template>
  <label
    v-if="isAvailable"
    class="btn btn-ver btn-block btn-simple-secondary mb-2"
  >
    <input type="radio" autocomplete="off">
    <div
      class="d-flex justify-content-between align-items-center variant-body"
      @click="$emit('select-variant', variant.id)"
    >
      <div class="d-flex flex-column align-items-start">
        <p class="ver-label text-dark">
          {{ variantFormat }}
        </p>
        <p v-if="showInfo && moreInfo" class="ver-label-info small text-muted mb-0">
          {{ moreInfo }}
        </p>
      </div>
      <div class="ver-price text-right">
        <template v-if="isFree">
          {{ $t('product.free') }}
        </template>
        <template v-else-if="isSubscriber">
          <PriceLabelFreeSubscription/>
        </template>
        <template v-else-if="isDownloadable">
          {{ $t('product.purchased') }}
        </template>
        <template v-else-if="isSubscriptionOnly">
          {{ $t('product.download_by_subscription') }}
        </template>
        <template v-else-if="credits > 0">
          <VariantPriceLabel
            :variant="variant"
          />
        </template>
        <template v-else>
          {{ $t('product.not_available') }}
        </template>
      </div>
    </div>

  </label>
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
    variantFormat() {
      const formatCode = _.get(this.variant, 'format');

      if (!formatCode) {
        return this.$i18n.t('product.custom');
      }
      switch (formatCode) {
        case 'vimage':
          return this.$i18n.t('product.image');
        case 'gif':
          return this.$i18n.t('product.animated_gif');
        default:
          return _.toUpper(this.variant.format);
      }
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
      return this.variant && !!this.variant.downloadable;
    },
    isSubscriptionOnly() {
      return false;
      // return !this.isFree && this.variant.credits === false && this.variant.subscription === true;
    },
    isSubscriber() {
      return isElementVariantDownloadableBySubscription(this.element, this.variant, this.memberSubscriptions);
    },
    moreInfo() {
      switch (this.variant.format) {
        case 'gif':
          if (this.variant.width && this.variant.height) {
            return `${this.variant.width} x ${this.variant.height} (${this.$i18n.t('product.max')})`;
          }
          break;

        default:
          if (this.variant.width && this.variant.height) {
            return `${this.variant.width} x ${this.variant.height}`;
          }
      }

      return '';
    },
  },
  mounted() {
    console.log(this.element);
  },
};
</script>

<style lang="scss" scoped>
.btn-ver {
  .ver-label, .ver-price, .ver-price p {
    margin-bottom: 0;
  }

  .ver-label, .ver-label-info {
    line-height: 1.5;
  }

  .ver-label {
    font-weight: bold;
  }

  &.active {
    padding: 0.125rem 0.875rem;
    border-width: .125rem;
    border-color: $primary !important;
  }
}

.variant-body {
  min-height: 2.75rem;
}

.ver-price {
  line-height: 1.5;
}
</style>
