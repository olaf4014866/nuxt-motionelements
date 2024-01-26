<template>
  <div>
    <div class="container pt-3">
      <ProductTitle
        v-if="product"
        :product="product"
      />
    </div>

    <ProductPreview v-if="product"
      :product="product"
      :recommendedMusicElements="recommendedMusicElements"
    />

    <section v-if="product"
      ref="sectionContent">
      <div class="container">
        <div class="row flex-column-reverse flex-lg-row">
          <div class="col-12 col-lg-8 pt-3">

            <viewport-helper size=">=lg">
              <div v-if="element && previewType === 'video'" class="pb-5">
                <PreviewSmall
                  :element="element"
                />
              </div>
            </viewport-helper>

            <ProductInfo
              :product="product"
            />

            <ProductRecommendations
              v-if="element"
              :product="product"
            />

          </div>
          <div class="col-12 col-lg-4">
            <ElementCta
              :element="element"
              :relatedElements="relatedElements"
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
import { mapState, mapGetters } from 'vuex';

// import Steve recommended music playback functions
// import productPlayerMixin from '@/views/product/productPlayer.mixin';
// import productPlayerMixin from '@/views/search/searchPlayer.mixin';
// import {
//   isProductType,
// } from '@motionelements/core/src/services/catalog.service.js';
// import notificationService from '@motionelements/core/src/services/notification.service.js';
// import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';

import ProductTitle from '@/views/product/sections/ProductTitle.vue';

export default {
  name: 'element-page',
  // mixins: [productPlayerMixin],
  props: {
    element: {
      type: Object,
      required: true,
    }
  },
  components: {
    'viewport-helper': () => import('@/components/modules/common/ViewportHelper.vue'),
    PreviewSmall: () => import('@/views/product/preview/PreviewSmall.vue'),

    // ProductTitle: () => import('@/views/product/sections/ProductTitle.vue'),
    ProductTitle,
    ProductPreview: () => import('@/views/product/sections/ProductPreview.vue'),
    ProductInfo: () => import('@/views/product/sections/ProductInfo.vue'),
    // ElementModals: () => import('@/views/product/sections/ElementModals.vue'),
    ProductRecommendations: () => import('@/views/product/sections/Recommendations.vue'),

    ElementCta: () => import('@/views/product/element/ElementCta.vue'),
  },
  data() {
    return {
      useCart: true,
      useGifCreator: true, // process.env.VUE_APP_ENV !== 'production',
      // selectedSku: null,
    };
  },
  computed: { 
    ...mapState({
      isLoggedIn: false, //state => state.user.isLoggedIn,
      currentSku: state => state.product.current.sku,
      currentCustomFileType: state => state.product.current.customFileType,
      memberSubscriptions: state => state.user.member.subscriptions,
    }),
    ...mapGetters({
      relatedElements: 'product/getRelatedElements',
      recommendedMusicElements: 'product/getRecommendedMusicElements',
    }),
    product() {
      console.log(this.element)
      return this.element ? this.element : null;
    },
    previewType() {
          return 'video';
      switch (true) {
        case isProductType('video_template', this.mediaType):
          return 'template';
        case isProductType('vr', this.mediaType):
          return 'vr';
        case isProductType('audio', this.mediaType):
          return 'audio';
        // case isProductType('gif', this.mediaType):
        //   return 'gif';
        default:
          return 'video';
      }
    },
    mediaType() {
      return this.element ? this.element.mediaType : null;
    },
    isMultipleVariantElement() {
      return isProductType('image', this.mediaType)
        || isProductType('video', this.mediaType)
        || isProductType('3d_model', this.mediaType);
    },
    variants() {
      const variants = _.get(this.element, 'variants', []);

      // $hasMultipleDisplayVersions = in_array($mediaType, array(1, 2, 3, 4, 5, 14), true);
      // check if element is single or multi variant
      if (this.isMultipleVariantElement) {
        return variants;
      }

      // default to return only master for safety
      return [variants.find(x => x.master === true)];
      // return variants;
    },
  },
  created() {
    if (_.has(this.$route.query, 'sku')) {
      this.$store.dispatch('product/setProductSku', this.$route.query.sku);
    }
  },
  mounted() {
    console.log(this.element)
    // auto show download modal if is returned from credits purchase
    /* if (this.$route.query.payment_status) {
      this.showDownloadModal();
    }

    if (this.memberSubscriptions.includes('unlimited')
     || this.memberSubscriptions.includes('video-motion')
    ) {
      if (isProductType('video', this.element.mediaType)) {
        // if member is subscriber, select HD by default
        // reverse it to get most expensive variant
        const variants = [...this.variants];

        const variant = variants.reverse().find(x => x.subscription === true);
        if (variant) {
          this.onSelectVariant(variant.id);
        }
      }
    } */
  },
  methods: {
    onSelectVariant(sku) {
      console.log('selected variant1', sku);
      if (sku !== this.currentSku) {
        this.$store.dispatch('product/setProductSku', sku);
        this.$router.replace({ query: { ...this.$route.query, sku: sku } });
      }
    },
    selectDefaultVariant() {
      // select cheapest variant as default
      // return state.current.element.variants.slice(-1)[0];
      // const variant = this.variants.find(x => x.master === true);

      // get most expensive subscription version
      // reversed variatns
      // const variants = { ...this.variants };
      const variants = [...this.variants].reverse();
      // const variant = this.variants.slice(-1)[0];

      let variant;

      variant = variants.find(x => x.subscription === true);

      if (!variant) {
        variant = variants.slice(-1)[0];
      }

      if (variant) {
        this.onSelectVariant(variant.id);
        return variant;
      }

      return null;
    },
    showDownloadModal() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/product/modals/Download.vue'),
        }),
        props: {
          product: this.element,
          sku: this.currentSku,
          useCart: this.useCart,
        },
      });
    },

    showDownloadGifModal() {
      const Modal = () => ({
        component: import('@/views/product/modals/GifCreator.vue'),
      });

      this.$store.dispatch('modal/show', {
        component: Modal,
        props: {
          element: this.element,
          // sku: this.currentSku,
          // useCart: this.useCart,
        },
      });
    },

    // showDownloadVideoImageModal() {
    //   this.$store.dispatch('modal/show', {
    //     component: () => ({
    //       component: import('@/views/product/modals/DownloadVideoImage.vue'),
    //     }),
    //     props: {
    //       element: this.element,
    //       // sku: this.currentSku,
    //       // useCart: this.useCart,
    //     },
    //   });
    // },

    // handle show purchase / subscription / free download / etc
    onSelectDownload(sku) {
      console.log('onSelect', sku);

      if (sku) {
        this.$store.dispatch('product/setSelectedVariantSku', sku);
        this.$store.dispatch('product/setProductSku', sku);
      }

      if (!this.isLoggedIn && this.mediaType !== 'gif') {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      if (sku) {
        const selectedVariant = this.getSelectedVariant(sku);

        if (this.useCart && this.mediaType !== 'gif') {
          if (!_.get(selectedVariant, 'free')
            // && this.mediaType !== 'gif'
            && !this.isSubscriber(selectedVariant)) {
            this.addElementToCart(sku);
            return;
          }
        }

        if (this.mediaType === 'gif' && this.useGifCreator) {
          if (this.currentCustomFileType === 'gif') {
            // show add to cart inside
            this.showDownloadGifModal();
            return;
          }
          // vimage show in download
        }
      } else {
        // no sku selected
        this.selectDefaultVariant();
      }

      // if (this.mediaType === 'gif' && this.useGifCreator) {
      //   this.showDownloadGifModal();
      // } else {
      this.showDownloadModal();
      // }
    },
    getSelectedVariant(sku) {
      return this.element.variants.find(variant => variant.id === sku);
    },
    isSubscriber(variant) {
      return isElementVariantDownloadableBySubscription(this.element, variant, this.memberSubscriptions);
    },
    addElementToCart(sku) {
      const params = {
        skus: [sku],
      };

      console.log('addElementsToCart', params);

      this.$store.dispatch('library/addElementsToCart', params).then((response) => {
        notificationService.alert({
          level: 'success',
          title: this.$i18n.t('favorites.element_added_to_your_cart'),
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
