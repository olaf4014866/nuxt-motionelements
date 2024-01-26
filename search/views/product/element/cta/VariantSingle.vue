<template>
  <div
    class="d-flex align-items-center justify-content-between flex-nowrap mb-2"
  >
    <div v-if="element.mediaType === 'gif'">
      <p>
        {{ _.toUpper($t('product.image')) }}
        <br><small>({{variant.width}}x{{variant.height}})</small><br>
        {{ _.toUpper($t('product.animated_gif')) }}
        <br><small>(630x360 {{ $t('product.max') }})</small>
      </p>
    </div>
    <p v-else-if="isShowFormat" class="ver-label text-muted mb-0">
      {{ variantFormat }}
    </p>

    <div
      class="ver-price"
      :class="{ 'text-right': isShowFormat }"
    >
      <template v-if="!isAvailable">
        <p class="h5 mb-0">
          {{ $t('product.not_available') }}
        </p>
      </template>
      <template v-else-if="isFree">
        <p class="h5 mb-0">
          {{ $t('product.free') }}
        </p>
      </template>
      <template v-else-if="isDownloadable">
        <PriceLabelFreeSubscription class="h5"/>
      </template>
      <template v-else-if="isSubscriptionOnly">
        {{ $t('product.download_by_subscription') }}
      </template>
      <template v-else-if="credits > 0">
        <VariantPriceLabel
          class="h5"
          :variant="variant"
        />
      </template>
      <template v-else>
        <p class="h5 mb-0">
          {{ $t('product.not_available') }}
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'version-single',
  components: {
    // PriceLabel: () => import('@/views/product/components/cta/PriceLabel.vue'),
    VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
    PriceLabelFreeSubscription: () => import('@/views/product/components/cta/PriceLabelFreeSubscription.vue'),
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
    }),
    variantFormat() {
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
      return false;
      // return !this.isFree && this.variant.credits === false && this.variant.subscription === true;
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
    variant() {
      if (this.element.variants[0]) {
        return this.element.variants[0];
      }
      return null;
    },
    credits() {
      return this.variant.credits;
    },
    isFree() {
      return this.variant ? !!this.variant.free : false;
    },
    isDownloadable() {
      return this.variant && !!this.variant.downloadable;
    },
    isAvailable() {
      return this.isFree || this.variant.subscription || this.isDownloadable || this.variant.credits > 0;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
