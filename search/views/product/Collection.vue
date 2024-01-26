<template>
  <div>
    <div class="container pt-3">
      <ProductTitle
        v-if="product"
        :product="product"
      />
    </div>

    <ProductPreview
      :product="product"
    />

    <section ref="sectionContent">
      <div class="container">
        <div class="row flex-column-reverse flex-lg-row">
          <div class="col-12 col-lg-8 pt-3">
            <ProductInfo
              :product="product"
            />
          </div>
          <div class="col-12 col-lg-4">
            <CollectionCta
              :collection="collection"
              :useCart="useCart"
              @select-download="onSelectDownload"
            />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';
import productPlayerMixin from '@/views/search/searchPlayer.mixin';

export default {
  name: 'collection-page',
  mixins: [productPlayerMixin],
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductTitle: () => import('@/views/product/sections/ProductTitle.vue'),
    ProductPreview: () => import('@/views/product/sections/ProductPreview.vue'),
    ProductInfo: () => import('@/views/product/sections/ProductInfo.vue'),
    CollectionCta: () => import('@/views/product/collection/CollectionCta.vue'),
  },
  data() {
    return {
      element: false,
      useCart: true,
    };
  },
  computed: {
    ...mapState({
      // isLoggedIn: state => state.user.isLoggedIn,
    }),
    product() {
      return this.collection ? this.collection : null;
    },
    previewType() {
      return 'collection';
    },
  },
  mounted() {
    // auto show download modal if is returned from credits purchase
    if (this.$route.query.payment_status) {
      this.showDownloadModal();
    }

    if (_.has(this.$route.query, 'sku')) {
      this.selectedSku = this.$route.query.sku;
    }
  },
  methods: {
    showDownloadModal() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/product/modals/Download.vue'),
        }),
        props: {
          product: this.collection,
          sku: this.collection.id,
        },
      });
    },
    onSelectDownload(sku) {
      this.selectedSku = sku;

      if (!this.isLoggedIn) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      if (this.useCart) {
        this.addCollectionToCart(this.collection);
        return;
      }

      return this.showDownloadModal();
    },
    addCollectionToCart(collection) {
      const params = {
        skus: [collection.id],
      };

      console.log('addElementsToCart', params);

      this.$store.dispatch('library/addElementsToCart', params).then((response) => {
        notificationService.alert({
          level: 'success',
          title: this.$i18n.t('favorites.collection_added_to_your_cart'),
        });

        this.$store.dispatch('cart/setItems', response.data.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-keywords {
    &:not(:last-child) {
      margin-right: map-get($spacers, 1)
    }
  }

  .pre-formatted {
    white-space: pre-wrap;
  }

  // SIZING RECOMMENDED ELEMENTS

  .card-element-recommended {
    width: 100%;

    @include media-breakpoint-between(sm,lg) {
      width: calc(50% - #{$spacer}) !important;
    }

    @include media-breakpoint-up(xl) {
      width: calc(33% - #{$spacer}) !important;
    }
  }
</style>
