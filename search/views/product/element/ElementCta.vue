<template>
  <div class="py-3 sticky-top">
    <div class="border border-light rounded p-3 mb-3">

      <!-- Pricing, Versions, CTA -->
      <div>
        <template v-if="variants.length === 1">
          <!-- <VariantSingle
            :element="element"
          /> -->
          <FormatLabel
            :element="element"
            :variant="variants.slice(-1)[0]"
            class="mb-3"
          />
        </template>
        <template v-else-if="variants.length > 1">
          <div class="btn-group-toggle btn-ver-toggle" data-toggle="buttons">
            <VariantMultiple
              v-for="variant in variants"
              :element="element"
              :variant="variant"
              :key="variant.id"
              :showInfo="true"
              @select-variant="onSelectVariant"
              :class="{ active: currentSku === variant.id }"
            />
          </div>
        </template>
        <div class="d-flex mb-3">
          <!-- DOWNLOAD BUTTON START -->
          <ButtonLadda
            class="btn flex-grow-1"
            :isLoading="isCtaButtonLoading"
            :class="isSubscriber ? 'btn-info' : 'btn-primary'"
            :icon="['fas', isSubscriber ? 'me-lightning' : 'me-download']"
            @button-click="onClickCta()"
          >
            {{ ctaLabel }}
          </ButtonLadda>
          <!-- DOWNLOAD BUTTON END -->
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

      <FeaturedIcons
        :element="element"
      />

      <IncludedFiles
        :element="element"
      />

    </div>

    <RelatedElements v-if="hasRelatedElements"
      :element="element"
      :relatedElements="relatedElements"
    />

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  isElementVariantDownloadableBySubscription,
  downloadElement,
} from '@/services/download.service.js';

import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

// import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'cta-section',
  components: {
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),

    // VariantSingle: () => import('@/views/product/element/cta/VariantSingle.vue'),
    VariantMultiple: () => import('@/views/product/element/cta/VariantMultiple.vue'),

    FormatLabel: () => import('@/views/checkout/FormatLabel.vue'),

    FeaturedIcons: () => import('@/views/product/element/FeaturedIcons.vue'),
    IncludedFiles: () => import('@/views/product/sections/IncludedFiles.vue'),
    RelatedElements: () => import('@/views/product/sections/RelatedElements.vue'),
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
    selectedSku: {
      type: String,
      required: false,
    },
    relatedElements: {
      type: Array,
      required: false,
    },
    useCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isCtaButtonLoading: false,
    };
  },
  created() {
    // if (this.selectedSku) {
    //   this.currentSelectedSku = this.selectedSku;
    // }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      currentSku: state => state.product.current.sku,
      memberSubscriptions: state => state.user.member.subscriptions,
    }),
    ...mapGetters({
      currentVariant: 'product/currentVariant',
    }),
    selectedVariant() {
      return this.currentVariant;
    },
    mediaType() {
      return _.get(this.element, 'mediaType');
    },
    isFree() {
      return !!_.get(this.selectedVariant, 'free');
    },
    isSubscriber() {
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    isDownloadable() {
      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    downloadMethod() {
      switch (true) {
        case this.isFree:
          return 'free';
        case this.isSubscriber:
          return 'subscription';
        case this.isDownloadable:
          return 'redownload';
        default:
          return false;
      }
    },
    isDownloadableDirectly() {
      // if (this.mediaType === 'gif') {
      //   return false;
      // }
      if (this.isFree) {
        return false;
      }
      if (this.isSubscriber) {
        return true;
      }
      return this.currentVariant && !!this.currentVariant.downloadable;
    },
    ctaLabel() {
      if (this.isFree || this.isDownloadableDirectly) {
        return this.$t('cta.download');
      }

      if (this.useCart && this.currentVariant && this.mediaType !== 'gif') {
        return this.$t('cta.add_to_cart');
      }

      return this.$t('cta.select');
    },
    hasRelatedElements() {
      return this.relatedElements && this.relatedElements.length > 0;
    },
    // isSingleVariant() {
    //   return isProductType('video_template', this.mediaType)
    //   || isProductType('audio', this.mediaType)
    //   || isProductType('lottie', this.mediaType);
    // },
    isMultipleVariantElement() {
      return isProductType('image', this.mediaType)
        || isProductType('video', this.mediaType)
        || isProductType('3d_model', this.mediaType);
    },
    variants() {
      const variants = _.get(this.element, 'variants', []);

      const masterVariant = variants.find(x => x.master === true);

      if (this.element.mediaType === 'gif') {
        if (!masterVariant) {
          return [];
        }

        // if (masterVariant.free === true) {
        // create image and gif selection
        const videoImageVariant = { ...masterVariant };
        videoImageVariant.id = `${masterVariant.id}-vimage`;

        const gifVariant = { ...masterVariant };
        gifVariant.id = `${masterVariant.id}-gif`;
        gifVariant.mediaType = 'gif';
        gifVariant.format = 'gif';
        gifVariant.width = 640;
        gifVariant.height = 360;

        return [
          videoImageVariant,
          gifVariant,
        ];
        // }
      }

      // check if element is single or multi variant
      if (this.isMultipleVariantElement) {
        return variants;
      }

      // default to return only master for safety
      return [masterVariant];
    },
  },
  mounted() {
    // $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    // handle show purchase / subscription / free download / etc
    onSelectVariant(sku) {
      console.log('selected variant2', sku, this.currentSku);
      if (sku !== this.currentSku) {
        this.$store.dispatch('product/setProductSku', sku);
        this.$router.replace({ query: { ...this.$route.query, sku: sku } });
      }
    },
    onClickCta() {
      if (!this.isLoggedIn && this.mediaType !== 'gif') {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      // let sku;

      // let sku = this.currentSku;
      const sku = this.currentVariant ? this.currentVariant.id : null;

      // if (!sku) {
      //   if (this.variants.length === 1) {
      //     const singleVariant = this.variants.slice(-1)[0];
      //     if (singleVariant) {
      //       sku = singleVariant.id;
      //       this.onSelectVariant(sku);
      //     }
      //   }
      // }

      if (this.isDownloadableDirectly && this.element.mediaType !== 'gif') {
        // direct download
        this.isCtaButtonLoading = true;

        downloadElement({
          method: this.downloadMethod,
          sku: sku,
        }).then((response) => {
          if ([200, 201].includes(response.status)) {
            // download file
            this.lastDownloadedSku = sku;
            if (this.element) {
              this.element.downloadable = true;
              const downloadFileUrl = _.get(response, 'data.data.download.file.url');
              if (downloadFileUrl) {
                window.location.href = downloadFileUrl;
              }
            }
          }
        }).catch((error) => {
          console.log('downloadERRROR', error);
          if (_.get(error, 'response.status') === 429) {
            console.log('429', error.response.status);
          }
        }).finally(() => {
          this.isCtaButtonLoading = false;
        });
      } else {
        this.$emit('select-download', sku);
      }
    },
    addFavorites() {
      this.$bus.$emit('product-favorited', this.element, 'default');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
