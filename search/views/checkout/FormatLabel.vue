<template>
  <div class="div-ver d-block btn btn-white disabled shadow">
    <div
      class="d-flex justify-content-between align-items-center"
    >
      <div class="d-flex flex-column align-items-start">
        <p class="ver-label text-dark">
          {{ getFormatLabel(selectedVariant.format) }}
        </p>
        <p v-if="moreInfo" class="ver-label-info small text-muted mb-0">
          {{ moreInfo }}
        </p>
      </div>
      <div v-if="gifVariant && showGifVariant" class="d-flex flex-column align-items-start">
        <p class="ver-label text-dark">
          {{ getFormatLabel(gitVariant.format) }}
        </p>
        <p class="ver-label-info small text-muted mb-0">
          640 x 360 (Max)
        </p>
      </div>
      <div v-if="showPrice" class="ver-price text-right">
        <!-- <template v-if="isFree">
        </template>
        <template v-else-if="isDownloadable">
        </template>
        <template v-else-if="isSubscriber">
          <PriceLabelFreeSubscription/>
        </template>
        <template v-else-if="isSubscriptionOnly">
          Subscription Only
        </template>
        <template v-else>
          <VariantPriceLabel
            :variant="selectedVariant"
          />
        </template> -->
        <template v-if="!isAvailable">
          <p class="mb-0">
            {{ $t('product.not_available') }}
          </p>
        </template>
        <template v-else-if="isFree">
          <p class="mb-0">
            {{ $t('product.free') }}
          </p>
        </template>
        <template v-else-if="isSubscriber">
          <PriceLabelFreeSubscription />
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
          <p class="mb-0">
            {{ $t('product.not_available') }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import {
//   isElementVariantDownloadableBySubscription,
// } from '@/services/download.service.js';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';
import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';

export default {
  name: 'format-label',
  props: {
    element: {
      type: Object,
      required: true,
    },
    variant: {
      type: Object,
      required: true,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    showGifVariant: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
    PriceLabelFreeSubscription: () => import('@/views/product/components/cta/PriceLabelFreeSubscription.vue'),
  },
  computed: {
      //zeus
    ...mapState({
      memberSubscriptions: state => state.user.member.subscriptions,
    }), variantFormat() {
      const formatCode = _.get(this.variant, 'format');

      if (!formatCode) {
        return this.$i18n.t('product.custom');
      }
      switch (formatCode) {
        case 'vimage':
          return `${_.toUpper(this.$i18n.t('product.image'))}/${_.toUpper(this.$i18n.t('product.animated_gif'))}`;
        default:
          return _.toUpper(this.variant.format);
      }
    },
    isSubscriptionOnly() {
      return !this.isFree && this.variant.credits === false && this.variant.subscription === true;
    },
    isShowFormat() {
      switch (true) {
        case isProductType('video', this.element.mediaType):
        case isProductType('3d', this.element.mediaType):
        case isProductType('gif', this.element.mediaType):
        case isProductType('lottie', this.element.mediaType):
          return true;
        default:
          return false;
      }
    },
    // variant() {
    //   if (this.element.variants[0]) {
    //     return this.element.variants[0];
    //   }
    //   return null;
    // },
    credits() {
      return this.variant.credits;
    },
    isFree() {
      return this.variant ? !!this.variant.free : false;
    },
    isDownloadable() {
      return this.variant && !!this.variant.downloadable;
    },
    isSubscriber() {
      //zeus
      return isElementVariantDownloadableBySubscription(this.element, this.variant, this.memberSubscriptions);
    },
    isAvailable() {
      //zeus
      return this.isFree || this.variant.subscription || this.isDownloadable || this.variant.credits > 0;
    },
    selectedVariant() {
      //zeus
      if (this.collection) {
        return {};
      }

      return this.element.variants.slice(-1)[0];
    },
    moreInfo() {
      if (this.collection) {
        return '';
      }

      switch (this.element.mediaType) {
        case 'music':
        case 'sfx':
          return `${this.$tools.secondToMinutes(this.element.mediaTypeDetails.duration)}`;
        default:
          if (this.selectedVariant.width && this.selectedVariant.height) {
            return `${this.selectedVariant.width} x ${this.selectedVariant.height}`;
          }
          return '';
      }
    },
    gifVariant() {
      //zeus
      const variant = this.element.variants.find(x => x.format === 'vimage');
      if (variant) {
        // variant.format = 'gif';
        return { ...variant, ...{ format: 'gif' } };
        // return variant;
      }
      return false;
    },
  },
  methods: {
    getFormatLabel(format) {
      switch (format) {
        case 'vimage':
          return 'Image';
        default:
          return format.toUpperCase();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.div-ver {
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
</style>
