<template>

  <div class="d-flex py-2 border-bottom border-light" v-if="showSubscription || !isSubscriber">
    <div class="flex-grow-1 px-3">
      <div class="row">

        <div class="col-12 col-lg-4 mb-2 mb-lg-0">

          <div class="d-flex">
            <ElementThumbnailMini
              :element="product"
              class="mr-3"
            />
            <p class="mb-0 flex-grow-1">
              <ProductIcon
                :productType="product.mediaType"
                fixed-width
                class="text-muted mr-1"
              />
              <a :href="product.html.url">
                {{ product.name }}
              </a>
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-4 mb-2 mb-lg-0">
          <template v-if="element && product.variants.length > 1">
            <VersionMultipleDropdown
              :product="product"
              :sku="currentSku"
              :showPrice="false"
              @select-variant="onSelectVariant"
            />
          </template>

          <template v-else>
            <FormatLabel
              :element="product"
              :showPrice="false"
            />
          </template>
        </div>

        <div class="col-12 col-lg-4 mb-2 mb-lg-0">
          <div class="row">
            <div class="col text-right">
              <p class="mb-0">
                <span class="small text-muted d-inline d-lg-none mr-2">On-Demand: </span>
                <small>{{ price.getSymbol() }}</small>
                {{ price.toFormat('0,0') }}
              </p>
            </div>
            <div class="col-12 col-sm-6 col-md-4 col-lg-6 text-right">
              <p class="mb-0">
                <span class="small text-muted d-inline d-lg-none mr-2">Note: </span>
                <span
                  v-if="isSubscriber"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Subscription Item"
                >
                  <font-awesome-icon
                    :icon="['fal','me-lightning']"
                    fixed-width
                    class="text-info"
                  />
                </span>
                <span
                  v-else-if="isDownloadable"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Purchased Item"
                >
                  <font-awesome-icon
                    :icon="['fal','me-download']"
                    fixed-width
                  />
                </span>
                <span
                  v-else
                >
                  <small>{{ price.getSymbol() }}</small>
                  {{ price.toFormat('0,0') }}
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="px-3">
      <button
        class="btn btn-sm btn-light"
        data-toggle="tooltip"
        data-placement="top"
        title="Remove"
        @click="onRemoveItem"
      >
        <font-awesome-icon
          :icon="['fal','trash-alt']"
          fixed-width
        />
      </button>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Money from '@motionelements/money';
import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';

export default {
  name: 'checkout',
  components: {
    ElementThumbnailMini: () => import('@/views/checkout/ElementThumbnailMini.vue'),
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
    // MediaTypeIcon: () => import('@/components/modules/common/MediaTypeIcon.vue'),
    // VersionMultipleDropdownItem: () => import('@/views/product/modals/download/VersionMultipleDropdownItem.vue'),
    VersionMultipleDropdown: () => import('@/views/product/modals/download/VersionMultipleDropdown.vue'),
    FormatLabel: () => import('@/views/checkout/FormatLabel.vue'),
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    showSubscription: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      selectedSku: null,
    };
  },
  computed: {
    ...mapState({
      memberSubscriptions: state => state.user.member.subscriptions,
    }),
    ...mapGetters({
    }),
    element() {
      return this.product.object === 'element' ? this.product : null;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    isSubscriber() {
      if (this.collection) {
        return false;
      }
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    isDownloadable() {
      if (this.collection) {
        return _.get(this.collection, 'downloadable');
      }
      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    currentSku() {
      return this.selectedSku || this.product.sku;
    },
    selectedVariant() {
      if (!this.element) {
        return null;
      }

      return this.element.variants.find(x => x.sku === this.product.sku);
    },
    price() {
      if (this.selectedVariant) {
        return Money({ amount: this.selectedVariant.price, currency: this.selectedVariant.currency });
      }

      return Money({ amount: this.product.price, currency: this.product.currency });
    },
  },
  methods: {
    onSelectVariant(sku) {
      this.selectedSku = sku;
      this.$store.dispatch('cart/updateProductVariant', {
        currentSku: this.product.sku,
        newSku: sku,
      });
      console.log('selected variant', sku);
    },
    onRemoveItem() {
      this.$store.dispatch('cart/removeItem', this.product.sku);
      console.log('remove item', this.product.sku);
    },
  },
};
</script>

<style lang="scss" scoped>
.column-spacer {
  width: 63px;
  min-width: 63px;
}

.custom-control-label {
  &:before {
    left:0;
  }
}

.custom-switch + .custom-control-text-label {
  cursor: pointer;
}

.custom-control-label-show-sub-items {
  &:before, &:after {
    cursor: pointer;
  }

  &.active {
    &:before {
      color: $black;
      // background-color: $custom-control-indicator-checked-bg;
      // border-color: $custom-control-indicator-checked-border-color;
      background-color: $primary;
      border-color: map-get(map-get($theme-colors-variants,"primary"),"-1");

      .ui-dark & {
        color: $black;
        // background-color: $custom-control-indicator-checked-bg-dark;
        // border-color: $custom-control-indicator-checked-border-color-dark;
        background-color: $primary;
        border-color: $light;
      }
    }

    &:after {
      transform: translateX(0.9375rem);
      background-color: $white;

      .ui-dark & {
        background-color: $black;
      }
    }
  }
}
</style>
