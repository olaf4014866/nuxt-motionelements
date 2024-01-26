<template>
  <Modal
    :size="showSidePanel ? 'xl' : ''"
  >
    <template v-slot:title>
      {{ product.name }}
    </template>

    <div
      class="d-flex flex-column flex-lg-row"
      :class="{ 'show-promo' : showSidePanel }"
    >
      <div
        class="card card-cta"
        :class="{ 'mb-3 mb-lg-0 mr-lg-3' : showSidePanel }"
      >
        <!--
        <div class="card-header">
        </div>
        -->
        <div v-if="element.mediaType === 'gif'"
             class="card-body d-flex flex-column justify-content-between">
          <VideoImages
            :element="element"
            @download="onClickDownload"
            @download-custom-file="onClickDownloadVideoImage"
          />
        </div>
        <div v-else
             class="card-body d-flex flex-column justify-content-between">
          <div>

            <!-- Element Thumbnail -->
            <p class="text-center" v-if="product.thumbnails">
              <img
                class="img-fluid rounded"
                :src="product.thumbnails.jpg.url"
              >
            </p>


            <template v-if="element && variants.length > 1">

              <VersionMultipleDropdown
                :product="element"
                :sku="currentSku"
                @select-variant="onSelectVariant"
              />

            </template>
            <template v-else-if="element">

              <FormatLabel
                :element="element"
              />

            </template>
          </div>
          <div>
            <hr />
            <div
              v-if="!useCart && !isDownloadable && !isSubscriber && !isSubscriptionOnly && memberCredits"
              class="d-flex justify-content-between align-items-center mb-2"
              :class="showSidePanel ? 'justify-content-between' : 'justify-content-center'"
            >
              <div class="small">
                <p class="mb-0">
                  {{ $t('credits.remaining_credits') }}
                </p>
              </div>
              <div>
                <p class="mb-0">
                  {{ memberCredits }}
                  <font-awesome-icon
                    :icon="['fal','me-credits-circle']"
                    title="credits"
                  />
                  <span class="text-secondary"> {{ $t('product.credits') }}</span>
                </p>
              </div>
            </div>
            <div class="text-center">
              <p v-if="['subscription'].includes(downloadMethod)"
                class="text-info small mb-0"
              >
                <font-awesome-icon
                  :icon="['fad','check-circle']"
                  fixed-width
                />
                {{ $t('product_page.subscription_valid_text') }}
              </p>
              <p v-else-if="!useCart && !isDownloadable && memberCredits && creditsShortfall > 0"
                class="text-warning small mb-0"
              >
                <font-awesome-icon
                  :icon="['fad','exclamation-circle']"
                  fixed-width
                />
                {{ $t('product_page.credits_insufficient_text') }}
              </p>

              <a
                v-if="isRedirectToDownloadBox"
                class="btn btn-block btn-success"
                :icon="['fas','me-download']"
                :href="$link('/download').url()"
              >
                {{ $t('cta.go_to_download_box') }}
              </a>
              <ButtonLadda
                v-else-if="product"
                class="btn btn-block"
                :class="isSubscriber ? 'btn-info' : 'btn-primary'"
                :icon="['fas', isSubscriber ? 'me-lightning' : 'me-download']"
                :disabled="isFree && freeDownloadsRemaining === 0"
                @button-click="onClickDownload()"
              >
                <template v-if="['free'].includes(downloadMethod)">
                  {{ $t('cta.download_free') }}
                </template>
                <template v-else-if="isDownloadable || ['subscription'].includes(downloadMethod)">
                  {{ $t('cta.download') }}
                </template>
                <template v-else-if="downloadMethod === 'credits'">
                  {{ $t('purchase.use_{credits}_credits', { credits: selectedProductCredits }) }}
                </template>
                <template v-else-if="isSubscriptionOnly">
                  {{ $t('cta.subscribe') }}
                </template>
                <template v-else-if="useCart">
                  {{ $t('cta.add_to_cart') }}
                </template>
                <template v-else-if="memberCredits > 0">
                  {{ $t('purchase.top_up_{credits}_credits_for_{amount}', {credits: creditsShortfall, amount: '$' + creditsShortfall }) }}
                </template>
                <template v-else>
                  {{ $t('purchase.buy_{credits}_credits_for_{amount}', {credits: selectedProductCredits, amount: '$' + selectedProductCredits }) }}
                </template>
              </ButtonLadda>
              <template v-if="['free'].includes(downloadMethod) && freeDownloadsRemaining !== null">
                <p v-if="freeDownloadsRemaining > 0">
                  {{ $t('download.you_have_{count}_free_downloads_left_this_week', {count: freeDownloadsRemaining}) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <template v-if="showDownloadStatus">
        <div class="d-flex flex-column align-items-stretch flex-grow-1 div-promo">
          <DownloadStatusCard
            :product="product"
          />
        </div>
      </template>
      <template v-else-if="showPaymentStatus">
        <div class="d-flex flex-column align-items-stretch flex-grow-1 div-promo">
          <PaymentStatusCard
            :order="order"
          />
        </div>
      </template>
      <template v-else-if="showFreeDownloadLimit">
        <div class="d-flex flex-column align-items-stretch flex-grow-1 div-promo">
          <FreeDownloadLimitCard/>
        </div>
      </template>
      <div v-else-if="showPromo" class="d-flex flex-column align-items-stretch flex-grow-1 div-promo">
        <div v-if="promoType === 'subscription'" class="card flex-grow-1 rounded overflow-hidden">
          <div class="card-body p-5 position-relative bg-gradient-subscription d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center">
            <div
              class="position-absolute"
            >
              <font-awesome-icon
                :icon="['fas','me-lightning']"
                size="10x"
                class="text-white no-invert"
              />
            </div>
            <PromoteSubscriptionCardBody/>
          </div>
        </div>
        <div v-else-if="promoType === 'credit_pack'" class="card flex-grow-1 rounded overflow-hidden">
          <div class="card-body p-5 position-relative bg-gradient-credits d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center">
            <div
              class="position-absolute"
            >
              <font-awesome-icon
                :icon="['fal','me-credits-circle']"
                size="10x"
                class="text-white no-invert"
              />
            </div>
            <PromoteCreditPackCardBody/>
          </div>
        </div>
        <template v-else-if="promoType === 'free'">
          <div class="card flex-grow-1 rounded overflow-hidden">
            <CreditArtistCard
              :element="element"
            />
          </div>
          <div v-if="false" class="card flex-grow-1 rounded overflow-hidden">
            <FacebookLikeCard/>
          </div>
        </template>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import {
  downloadElement,
  isElementVariantDownloadableBySubscription,
  // getFreeDownloadsRemaining,
} from '@/services/download.service.js';
import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';
import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'product-download-modal',
  props: {
    product: {
      type: Object,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
    useCart: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
    // Modal: () => import('@/components/ui/BaseModal.vue'),
    // VersionMultiple: () => import('@/views/product/components/cta/VersionMultiple.vue'),
    // VersionMultipleDropdownItem: () => import('@/views/product/modals/download/VersionMultipleDropdownItem.vue'),
    // PriceLabel: () => import('@/views/product/components/cta/PriceLabel.vue'),
    // VariantPriceLabel: () => import('@/views/product/element/cta/VariantPriceLabel.vue'),
    VersionMultipleDropdown: () => import('@/views/product/modals/download/VersionMultipleDropdown.vue'),
    VideoImages: () => import('@/views/product/modals/download/VideoImages.vue'),
    FormatLabel: () => import('@/views/checkout/FormatLabel.vue'),
    // PriceLabelFreeSubscription: () => import('@/views/product/components/cta/PriceLabelFreeSubscription.vue'),
    PaymentStatusCard: () => import('@/views/product/cards/PaymentStatus.vue'),
    DownloadStatusCard: () => import('@/views/product/cards/DownloadStatus.vue'),
    PromoteSubscriptionCardBody: () => import('@/views/product/cards/PromoteSubscription.vue'),
    PromoteCreditPackCardBody: () => import('@/views/product/cards/PromoteCreditPack.vue'),
    CreditArtistCard: () => import('@/views/product/cards/CreditArtist.vue'),
    FacebookLikeCard: () => import('@/views/product/cards/FacebookLike.vue'),
    FreeDownloadLimitCard: () => import('@/views/product/cards/FreeDownloadLimit.vue'),
  },
  data() {
    return {
      selectedId: '',
      versionObj: null,
      lastDownloadedSku: null,
      dropdownActive: false,
    };
  },
  created() {
    console.log('created component Download.vue');

    // if (_.has(this.$route.query, 'sku')) {
    //   this.$store.dispatch('product/setProductSku', this.$route.query.sku);
    //   this.newSelectedSku = this.$route.query.sku;
    // }
    if (_.has(this.$route.query, 'order')) {
      this.$store.dispatch('payment/getOrder', { id: this.$route.query.order });
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      memberCredits: state => state.user.member.credits,
      memberSubscriptions: state => state.user.member.subscriptions,
      order: state => state.payment.order,
      freeDownloadsRemaining: state => state.user.member.freeDownloads.remaining,
      currentSku: state => state.product.current.sku,
      currentCustomFileType: state => state.product.current.customFileType,
    }),
    ...mapGetters({
      currentVariant: 'product/currentVariant',
    //   recommendedMusicElements: 'product/getRecommendedMusicElements',
    }),
    mediaType() {
      return _.get(this.element, 'mediaType');
    },
    element() {
      return this.product.object === 'element' ? this.product : null;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    orderNumber() {
      return this.$route.query.order;
    },
    paymentStatus() {
      return this.$route.query.payment_status;
    },
    showPaymentStatus() {
      return !!this.paymentStatus;
    },
    showFreeDownloadLimit() {
      return this.isFree && this.freeDownloadsRemaining === 0;
    },
    isMultipleVariantElement() {
      return isProductType('image', this.mediaType)
        || isProductType('video', this.mediaType)
        || isProductType('3d_model', this.mediaType);
    },
    variants() {
      const variants = _.get(this.element, 'variants', []);

      // check if element is single or multi variant
      if (this.isMultipleVariantElement) {
        return variants;
      }

      return [variants.find(x => x.master === true)];
    },
    // selectedSku() {
    //   return this.currentSku;
    // },
    promoType() {
      // controls what promo to show
      switch (true) {
        case this.collection:
          return false;
        case this.isFree:
          return 'free';
        case this.isDownloadable: // purchased
          return false;
        case this.isVariantDownloadableBySubscription && !this.isSubscriber:
          return 'subscription';
        case this.isSubscriptionOnly:
          return false;
        case !this.useCart:
          return 'credit_pack';
        default:
          return false;
      }
    },
    gifVariant() {
      const variant = this.element.variants.find(x => x.format === 'vimage');
      if (variant) {
        // variant.format = 'gif';
        return { ...variant, ...{ format: 'gif' } };
        // return variant;
      }
      return false;
    },
    showSidePanel() {
      return this.showPromo || this.showPaymentStatus || this.showDownloadStatus || this.showFreeDownloadLimit;
    },
    showPromo() {
      return !!this.promoType;
    },
    showDownloadStatus() {
      return !this.isFree && this.lastDownloadedSku;
    },
    isFree() {
      if (this.collection) {
        return false;
      }
      return !!_.get(this.selectedVariant, 'free');
    },
    isSubscriptionOnly() {
      if (this.collection) {
        return false;
      }
      return !this.isFree && !this.selectedProductCredits && this.isVariantDownloadableBySubscription;
    },
    isVariantDownloadableBySubscription() {
      if (this.collection) {
        return false;
      }
      return _.get(this.selectedVariant, 'subscription');
    },
    isSubscriber() {
      if (this.collection) {
        return false;
      }
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    isCreditsEnough() {
      return this.creditsShortfall <= 0;
    },
    isDownloadable() {
      if (this.collection) {
        return _.get(this.collection, 'downloadable');
      }
      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    selectedProductCredits() {
      if (this.collection) {
        return _.get(this.collection, 'credits');
      }
      return _.get(this.selectedVariant, 'credits');
    },
    creditsShortfall() {
      const variantCredits = this.selectedProductCredits;

      if (variantCredits > 0) {
        return variantCredits - this.memberCredits;
      }

      return 0;
    },
    downloadMethod() {
      switch (true) {
        case this.isFree:
          return 'free';
        case this.isSubscriber:
          return 'subscription';
        case this.isDownloadable:
          return 'redownload';
        case !this.useCart && this.isCreditsEnough && !this.isSubscriptionOnly:
          return 'credits';
        default:
          return false; // not enough credits
      }
    },
    isRedirectToDownloadBox() {
      if (!this.isDownloadable) {
        return false;
      }

      switch (true) {
        case this.collection:
          return true;
        case this.element && ['gif'].includes(this.element.mediaType):
        case this.element && ['gif', 'vimage'].includes(this.selectedVariant.format): // @legacy
          return true;
        default:
          return false;
      }
    },
    selectedVariant() {
      if (this.collection) {
        return null;
      }

      if (this.currentVariant) {
        return this.currentVariant;
      }

      if (!_.size(this.variants)) {
        return null;
      }

      return this.variants.find(x => x.master === true) || this.variants.slice(-1)[0];
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
  },
  watch: {
    sku: function () {
      this.selectedId = this.sku;
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
    onSelectVariant(sku) {
      console.log('selected variant', sku);
      if (sku !== this.currentSku) {
        // this.$store.dispatch('product/setSelectedVariantSku', sku);
        this.$store.dispatch('product/setProductSku', sku);

        // this.$router.push({ query: { ...this.$route.query, sku: sku } });
      }
      this.dropdownActive = false;
    },
    redirectToCreditsPage() {
      // this.$store.dispatch('modal/hide', 'product-download-modal');
      // redirect to credit page
      // const redirectUrl = new URL(this.$siteUrl(`credits?credits=${this.topUpCredits}&return=${window.location.href}`).url());
      // // const redirectUrl = new URL(`${process.env.VUE_APP_SITE_URL}/credits?credits=${this.topUpCredits}&return=${window.location.href}`);
      // console.info(`you have no credits, please buy credits before buy elements:${redirectUrl.toString()}`);
      // window.location.href = redirectUrl.toString();
      console.info('you have no credits, please buy credits before buy elements');
      console.info('intended_url', this.$route.fullPath);

      this.$router.push({
        path: '/credits#credits-step-1',
        query: {
          credits: this.creditsShortfall,
          intended_url: this.$route.fullPath,
        },
      });

      this.$store.dispatch('modal/hide');
    },
    redirectToSubscriptionPage() {
      console.info('intended_url', this.$route.fullPath);

      window.location.href = this.$link('/subscribe').param('intended_url', this.$route.fullPath);

      // this.$store.dispatch('modal/hide');
    },
    doDownloadElement(params) {
      downloadElement(params).then((response) => {
        if ([200, 201].includes(response.status)) {
          // download file
          this.lastDownloadedSku = this.currentSku;

          if (this.element) {
            this.element.downloadable = true;
            const downloadFileUrl = _.get(response, 'data.data.download.file.url');
            if (downloadFileUrl) {
              window.location.href = downloadFileUrl;
            }
            if (this.downloadMethod === 'free' && _.has(response, 'data.data.freeDownloads.remaining')) {
              this.$store.dispatch('user/setFreeDownloadsRemaining', response.data.data.freeDownloads.remaining);
            }
          } else if (this.collection) {
            this.collection.downloadable = true;
          }
        } else {
          // this.$root.$emit('show-modal', 'confirm-purchase-modal', this.sku);
        }
      }).catch((error) => {
        console.log('downloadERRROR', error);
        if (error.response.status === 429) {
          console.log('429', error.response.status);
          if (this.downloadMethod === 'free') {
            this.$store.dispatch('user/setFreeDownloadsRemaining', 0);
          }
        }
      });
    },
    onClickDownloadVideoImage(fileKey) {
      console.log('downloadaaa:', fileKey);

      if (!this.isLoggedIn) {
        this.$store.dispatch('modal/hide');
        // this.$store.dispatch('modal/showSignUp');
        return;
      }

      if (this.useCart && !this.isDownloadable && !this.isFree && !this.isSubscriber) {
        // if (!_.get(this.masterVariant, 'free')
        //   && !this.isSubscriber(this.masterVariant)) {
        this.addElementToCart(this.currentSku);
        this.$store.dispatch('modal/hide');
        return;
        // }
      }

      if (this.downloadMethod) {
        this.doDownloadElement({
          method: this.downloadMethod,
          sku: this.currentSku,
          customFileType: 'video_image',
          customFile: fileKey,
        });
      }
    },
    onClickDownload() {
      if (!this.isLoggedIn) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      console.log('continue to purchase', this.selectedVariant);

      if (this.isRedirectToDownloadBox) {
        console.log('redirect to', this.$link('/download/box').url());

        // redirect to download box to download
        window.location.href = this.$link('/download/box').url();
        return;
      }

      if (this.downloadMethod) {
        this.doDownloadElement({
          method: this.downloadMethod,
          sku: this.currentSku,
        });
      } else if (this.isSubscriptionOnly) {
        this.redirectToSubscriptionPage();
      } else if (this.useCart) {
        this.addElementToCart(this.currentSku);
        this.$store.dispatch('modal/hide');
      } else {
        // this.$store.dispatch('modal/hide', 'product-download-modal');
        // this.$root.$emit('hide-modal', this.modalId);
        this.redirectToCreditsPage();
      }
    },
    async addElementToCart(sku) {
      const params = {
        skus: [sku],
      };

      console.log('addElementsToCart', params);

      return this.$store.dispatch('library/addElementsToCart', params).then((response) => {
        notificationService.alert({
          level: 'success',
          title: this.$i18n.t('favorites.element_added_to_your_cart'),
        });

        this.$store.dispatch('cart/setItems', response.data.data);
        return response;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-cta {
    width: 100%;
  }
  .show-promo {
    .card-cta {
      @include media-breakpoint-up(lg) {
        width: 40%;
        min-width: 40%;
      }
    }
  }

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

    &.active {
      padding: 0.125rem 0.875rem;
      border-width: .125rem;
      border-color: $primary !important;
    }
  }

  // COLORS

  // .nav-versions {
  //   .nav-link {
  //     &.active {
  //       background: $transparent;
  //       border-width: .25rem;
  //       padding: 0.25rem 0.75rem;
  //       border-style: solid;
  //       border-color: $primary;
  //     }
  //   }
  // }

  .nav-versions {
    .nav-link {
      &.active {
        background: map-get(map-get($theme-colors-variants, 'light'), '1');
      }
    }
  }

  .div-promo {
    .card {
      &:not(:last-child) {
        margin-bottom: $spacer;
      }

      .position-relative {
        div, a {
          &.position-absolute {
            left: 0;
            transform: translatex(-33.333%);
            opacity: 33.333%;
            z-index: 0;
          }
          &:not(.position-absolute) {
            z-index: 1;
          }

          &:last-child {
            @include media-breakpoint-up(lg) {
              margin-left: $spacer;
            }
          }
        }
      }
    }
  }
</style>
