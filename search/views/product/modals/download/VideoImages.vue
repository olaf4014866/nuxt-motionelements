<template>
  <div>
    <div class="row mx-n1">
      <div
        v-for="thumbnail in thumbnails"
        :key="thumbnail.url"
        class="mb-3 col-6 col-md-4 px-1 vimage-thumbnail"
      >
          <img :src="thumbnail.url"
            class="img-fluid rounded"
          />

          <button
            v-if="isDownloadable"
            @click="onClickDownload(thumbnail.url)"
            class="btn btn-sm btn-block btn-simple-secondary mt-1"
          >
            <font-awesome-icon
              :icon="['far','me-download']"
              class="mr-1"
            />
            {{ $t('cta.download') }}
          </button>
      </div>
      <div
        v-if="!isDownloadable"
        class="mb-3 col-6 col-md-4 px-1 vimage-thumbnail vimage-thumbnail-gif"
      >
        <div>
          <img :src="thumbnails[0].url"
            class="img-fluid rounded"
          />
          <div
            class="gif-text-overlay mx-1 p-2 rounded d-flex align-items-center justify-content-center font-weight-bold text-light no-invert"
          >
            <font-awesome-icon
              :icon="['fas','me-images']"
              fixed-width
              class="mr-1"
            />
            GIF
          </div>
        </div>
      </div>
    </div>

    <template v-if="!isDownloadable">
      <FormatLabel
        :element="element"
        :variant="selectedVariant"
        :showGifVariant="false"
      />
      <div v-if="false"
        class="p-2 small text-center rounded border border-light mt-3">
        Text copy letting user know that buying this element means getting all the images as well as the gif.
      </div>
      <hr />
      <div>
        <button
          @click="onClickCta"
          class="btn btn-block btn-primary mb-3"
        >
          {{ ctaLabel }}
        </button>
      </div>
    </template>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';
import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';
// import {
//   downloadElement,
//   isElementVariantDownloadableBySubscription,
//   // getFreeDownloadsRemaining,
// } from '@/services/download.service.js';
// import {
//   isProductType,
// } from '@motionelements/core/src/services/catalog.service.js';
// import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'product-download-modal',
  props: {
    element: {
      type: Object,
      required: true,
    },
    sku: {
      type: String,
      required: false,
    },
  },
  components: {
    FormatLabel: () => import('@/views/checkout/FormatLabel.vue'),
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


    // get video images to download
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      memberSubscriptions: state => state.user.member.subscriptions,
      freeDownloadsRemaining: state => state.user.member.freeDownloads.remaining,
      currentSku: state => state.product.current.sku,
      // customFileType: state => state.product.current.customFileType,
    }),
    ...mapGetters({
      currentVariant: 'product/currentVariant',
    }),
    selectedVariant() {
      return this.currentVariant;
    },
    thumbnails() {
      const limit = 5;
      let thumbnails = _.get(this.element, 'thumbnails.jpgs') || [];

      if (thumbnails.length > limit) {
        thumbnails = thumbnails.slice(0, limit);
      }
      return thumbnails;
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
      if (!this.isLoggedIn) {
        return false;
      }

      if (this.isFree || this.isSubscriber) {
        return true;
      }

      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    ctaLabel() {
      if (this.isDownloadable) {
        return this.$i18n.t('cta.download');
      }

      return this.$i18n.t('cta.add_to_cart');
    },
  },
  methods: {
    onClickCta() {
      this.$emit('download');
    },
    onClickDownload(thumbUrl) {
      console.log('download', thumbUrl);

      const url = new URL(thumbUrl);

      console.log('download', url.pathname);

      const fileKey = url.pathname.split('/').pop();

      console.log('download', fileKey);

      this.$emit('download-custom-file', fileKey);

      /*
      console.log('continue to purchase', this.selectedVariant);

      if (this.isRedirectToDownloadBox) {
        console.log('redirect to', this.$link('/download/box').url());

        // redirect to download box to download
        window.location.href = this.$link('/download/box').url();
      }

      if (this.downloadMethod) {
        // const formData = new FormData();
        // console.info(`subscribe download success! process to download item: ${name} version: ${this.selectedVariant.format}`);
        downloadElement({
          method: this.downloadMethod,
          sku: this.currentSku,
        }).then((response) => {
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

       */
    },
  },
};
</script>

<style lang="scss" scoped>
.vimage-thumbnail {

  .img-fluid {
    display: block;
    max-height: 5rem;
    margin: 0 auto;
  }
}
.gif-text-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  & > div {
    margin-bottom: 0;
    text-align: center;
  }
}

// * COLORS

.gif-text-overlay {
  background-color: rgba($body-bg-dark, .5);

  // .ui-dark & {
  //   background-color: rgba($body-bg, .75);
  // }
}
</style>
