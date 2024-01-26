<template>
  <div class="dropdown">
    <div
      class="div-ver-dropdown d-block btn btn-simple-secondary d-flex justify-content-between align-items-center dropdown-toggle active"
      @click.prevent="dropdownActive = !dropdownActive"
    >
      <div
        class="flex-grow-1 d-flex justify-content-between align-items-center mr-2"
      >
        <div class="d-flex flex-column align-items-start">
          <p class="ver-label text-dark">
            {{ _.get(selectedVariant, 'format', '').toUpperCase() }}
          </p>
          <p v-if="moreInfo" class="ver-label-info small text-muted mb-0">
            {{ moreInfo }}
          </p>
        </div>
        <div v-if="showPrice" class="ver-price text-right">
          <template v-if="isFree">
          </template>
          <template v-else-if="isDownloadable">
          </template>
          <template v-else-if="isSubscriber">
            <PriceLabelFreeSubscription></PriceLabelFreeSubscription>
          </template>
          <template v-else-if="isSubscriptionOnly">
            {{ $t('product.download_by_subscription') }}
          </template>
          <template v-else>
            <VariantPriceLabel
              :variant="selectedVariant"
            />
          </template>
        </div>
      </div>
    </div>
    <transition name="fade">
    <div
      v-if="dropdownActive"
      class="dropdown-menu show w-100 border border-light shadow"
      key="ver-dropdown"
    >
      <VersionMultipleDropdownItem
        v-for="variant in element.variants"
        :element="element"
        :variant="variant"
        :key="variant.id"
        @select-variant="onSelectVariant(variant.id)"
        :class="{ active: currentSku === variant.id }"
        :showInfo="true"
      />
    </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  isElementVariantDownloadableBySubscription,
} from '@/services/download.service.js';

export default {
  name: 'version-multiple-dropdown',
  props: {
    product: {
      type: Object,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    VersionMultipleDropdownItem: () => import('@/views/product/modals/download/VersionMultipleDropdownItem.vue'),

    PriceLabelFreeSubscription: () => import('@/views/product/components/cta/PriceLabelFreeSubscription.vue'),
    VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
  },
  data() {
    return {
      dropdownActive: false,
    };
  },
  computed: {
    ...mapState({
      currentSku: state => state.product.current.sku,
    }),
    ...mapGetters({
      currentVariant: 'product/currentVariant',
    }),
    element() {
      return this.product.object === 'element' ? this.product : null;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    selectedVariant() {
      if (this.collection) {
        return {};
      }

      if (this.currentVariant) {
        return this.currentVariant;
      }

      let variant;
      if (this.sku) {
        variant = this.element.variants.find(x => x.id === this.sku);
        if (variant) {
          return variant;
        }
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
    isFree() {
      if (this.collection) {
        return false;
      }
      return !!_.get(this.selectedVariant, 'free');
    },
    isDownloadable() {
      if (this.collection) {
        return _.get(this.collection, 'downloadable');
      }
      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    isSubscriber() {
      if (this.collection) {
        return false;
      }
      // return this.$tools.isElementDownloadableBySubscription(this.selectedVariant, this.memberSubscriptions);
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    isSubscriptionOnly() {
      if (this.collection) {
        return false;
      }
      return !this.isFree && !this.selectedProductCredits && this.isVariantDownloadableBySubscription;
    },
  },
  methods: {
    onSelectVariant(sku) {
      if (sku === this.currentSku) {
        return;
      }
      console.log('selected variant', sku);
      this.$emit('select-variant', sku);
      this.dropdownActive = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.div-ver-dropdown {
  .ver-label, .ver-price, .ver-price p {
    margin-bottom: 0;
  }

  .ver-label, .ver-label-info {
    line-height: 1.5;
  }

  .ver-label {
    font-weight: bold;
  }
}
</style>
