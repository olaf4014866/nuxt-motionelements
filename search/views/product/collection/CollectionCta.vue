<template>
  <div class="py-3 sticky-top">

    <div class="border border-light rounded p-3 mb-3">

      <!-- Pricing, Versions, CTA -->
      <div>
        <div
          class="d-flex align-items-center justify-content-between flex-nowrap mb-2"
        >
          <!-- <p v-if="isShowFormat" class="ver-label text-muted mb-0">
          </p> -->
          <p class="ver-label text-muted mb-0">
            {{ $t('product_page.{count}_elements', { count: collection.items.totalCount }) }}
          </p>

          <div
            class="ver-price"
            :class="{ 'text-right': isShowFormat }"
          >
            <template v-if="isSubscriber">
              <!-- don't show anything-->
            </template>
            <template v-else-if="!isAvailable">
              <p class="mb-0">
                {{ $t('product.not_available') }}
              </p>
            </template>
            <template v-else-if="isDownloadable">
              <p class="mb-0">
                {{ $t('product.purchased') }}
              </p>
            </template>
            <template v-else>
              <VariantPriceLabel
                :variant="collection"
                class="text-right"
              />
              <!-- <PriceLabel
                :collection="collection"
              /> -->
            </template>
          </div>
        </div>

        <div class="d-flex mb-3">
          <div v-if="isSubscriber"
            :icon="['fas','me-lightning']"
            class="flex-grow-1"
          >
            {{ $t('product.subscribed') }}
          </div>
          <ButtonLadda v-else
            :icon="['fas','me-download']"
            class="btn btn-primary flex-grow-1"
            @button-click="onClickCta()"
          >
            {{ ctaLabel }}
          </ButtonLadda>
          <ButtonLadda
            :icon="['far','heart']"
            class="btn btn-simple-primary ml-2"
            data-toggle="tooltip" data-placement="bottom"
            :title="$t('search.element_added_to_your_favorites')"
            @button-click="addFavorites()"
          >
          </ButtonLadda>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'cta-section',
  components: {
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
    // PriceLabel: () => import('@/views/product/collection/CollectionPriceLabel.vue'),
    VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
  },
  props: {
    collection: {
      type: Object,
      required: true,
    },
    useCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      sku: false,
    };
  },
  computed: {
    ...mapState({
      collectionElements: state => state.product.current.collectionElements,
    }),
    ...mapGetters({
      hasUnlimitedSubscription: 'user/hasUnlimitedSubscription',
    }),
    selectedSku() {
      return this.collection.id;
    },
    isSubscriber() {
      if (!Array.isArray(this.collectionElements)) {
        return false;
      }

      return this.hasUnlimitedSubscription && _.size(this.collectionElements.find(element => element.subscription === true)) > 0;
    },
    isFree() {
      return false;
    },
    credits() {
      return this.collection.credits;
    },
    isShowFormat() {
      return false;
    },
    isDownloadable() {
      return !!_.get(this.collection, 'downloadable');
    },
    isAvailable() {
      return true;
    },
    ctaLabel() {
      if (this.useCart) {
        return this.$t('cta.add_to_cart');
      }

      return this.$t('cta.download');
    },
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    onClickCta() {
      this.$emit('select-download', this.selectedSku);
    },
    addFavorites() {
      this.$bus.$emit('product-favorited', this.collection, 'default');
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-ver {
    .ver-label, .ver-price, .ver-price p {
      margin-bottom: 0;
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
