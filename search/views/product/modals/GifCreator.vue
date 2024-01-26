<template>
  <Modal
    size="lg" :scrollable="true"
  >
    <template v-slot:title>
      {{ $t('gif_creator.create_your_gif') }}
    </template>

    <div>
      <div v-if="!isDownloadable && false" class="mb-3 mt-n3">
        <div class="p-2 small text-center rounded border border-light mt-3">
          Text copy letting user know that buying this element means getting all the images as well as the gif.
        </div>
      </div>
      <div
        class="mb-3 mx-auto rounded overflow-hidden d-flex flex-column align-items-center"
      >
        <!-- <img
          src="@/assets-mockup/img/placeholder-640x360-light.jpg"
          class="img-fluid"
          /> -->
        <PreviewGifCreator
          :element="element"
          :settings="settings"
          class="mx-auto"
          :style="`width:${settings.width}px;height:${settings.height}px`"
         />
        <div v-if="noPreviewSetting" class="text-sm-center">
          {{ $t('gif_creator.no_preview_available')}}: {{ noPreviewSetting }}</div>
      </div>
      <form class="mx-auto">
        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.in_out')}}
          </label>
          <div class="col-lg-10 d-flex flex-column align-items-stretch">
            <div>
              <vue-slider
                :enable-cross="false"
                :min-range="1"
                :max="maxDuration"
                v-model="settings.markers"></vue-slider>
            </div>
            <div class="d-flex justify-content-between align-items-center small mt-1">
              <span>
                {{ $t('gif_creator.start_time') }}: <span class="font-weight-bold">{{ markIn }}s</span>
              </span>
              <span>
                {{ $t('gif_creator.end_time') }}: <span class="font-weight-bold">{{ markOut }}s</span>
              </span>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.size') }}
          </label>
          <div class="col-lg-10">
            <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

              <label
                v-for="size in Object.keys(formats)"
                :key="`size-${size}`"
                class="btn btn-simple-secondary"
                :class="settings.width === formats[size].width ? 'active' : ''"
                @click="setDimensions(size)"
              >
                <input
                  type="radio" name="resolution"
                  :value="`${formats[size].width}x${formats[size].height}`"
                  :checked="settings.width === formats[size].width ? 'checked' : ''">
                <p class="mb-0">
                  <span class="d-inline d-md-none">
                    {{ formats[size].acronym }}
                  </span>
                  <span class="d-none d-md-inline">
                    {{ formats[size].label }} <span class="text-muted">{{ formats[size].width }} x {{ formats[size].height }} px</span>
                  </span>
                </p>
              </label>

            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.speed') }}
          </label>
          <div class="col-lg-10">
            <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

              <label
                v-for="speed in speeds"
                :key="`speed-${speed.label}`"
                class="btn btn-simple-secondary"
                :class="settings.speed === speed.value ? 'active' : ''"
                @click="setSettings('speed',speed.value)"
              >
                <input type="radio" name="speed" :value="speed.value" autocomplete="off" :checked="settings.speed === speed.value ? 'checked' : ''"> {{speed.label}}
              </label>

            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.loop') }}
          </label>
          <div class="col-lg-10">
            <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

              <label
                v-for="loop in loops"
                :key="`loop-${loop.value}`"
                class="btn btn-simple-secondary"
                :class="settings.loop === loop.value ? 'active' : ''"
                @click="setSettings('loop',loop.value)"
              >
                <input type="radio" name="loop" :value="loop.value" :checked="settings.loop === loop.value ? 'checked' : ''"> {{ loop.label }}
              </label>

            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.quality') }}
          </label>
          <div class="col-lg-10">
            <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

              <label
                v-for="quality in qualities"
                :key="`quality-${quality.value}`"
                class="btn btn-simple-secondary"
                :class="quality.value === settings.quality ? 'active' : ''"
                @click="setSettings('quality', quality.value)"
              >
                <input type="radio" name="quality" value="quality.value" :checked="quality.value === settings.quality ? 'checked' : ''"> {{ quality.label }}
              </label>

            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-lg-2 col-form-label col-form-label-sm">
            {{ $t('gif_creator.background') }}
          </label>
          <div class="col-lg-10">
            <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

              <label
                v-for="transparent in transparents"
                :key="`transparent-${transparent.value}`"
                class="btn btn-simple-secondary"
                :class="transparent.value === settings.transparent ? 'active' : ''"
                @click="setSettings('transparent',transparent.value)"
              >
                <input type="radio" name="transparent" :value="transparent.value" :checked="transparent.value === settings.transparent ? 'checked' : ''"> {{ transparent.label }}
              </label>

            </div>
          </div>
        </div>

      </form>
    </div>

    <template v-slot:footer>
      <!--      <div class="modal-footer d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center">-->
      <div class="w-100 d-flex flex-column flex-sm-row flex-md-column flex-lg-row justify-content-between align-items-stretch align-items-sm-center align-items-md-stretch align-items-lg-center">
        <div>

          <p class="mb-3 mb-sm-0 mb-md-3 mb-lg-0 small">
            <Byline
              :product="element"
            />
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-simple-secondary mr-2" data-dismiss="modal">
            {{ $t('cta.cancel') }}
          </button>
          <ButtonLadda
            v-if="isDownloadFileReady"
            :click="downloadFile"
            :showIcon="true"
            :icon="['fas', 'me-download']"
            class="button btn-primary"
          >
            {{ $t('cta.download') }}
          </ButtonLadda>
          <ButtonLadda
            v-else
            :click="onSubmit"
            :class="isDownloadFileReady ? 'btn-simple-secondary' : 'btn-primary'"
            :showIcon="false"
            :buttonClass="'btn mr-2'"
            :buttonDisabled="!isSubmitButtonEnabled"
            :buttonLoading="!isSubmitButtonEnabled"
            @handle-click="handleResponse"
          >
            {{ ctaLabel }}
          </ButtonLadda>

          <!-- <button type="button" class="btn btn-primary">
            <font-awesome-icon
              :icon="['fas','me-images']"
            ></font-awesome-icon>
            Create Your GIF
          </button> -->
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import VueSlider from 'vue-slider-component';

import { downloadElement, isElementVariantDownloadableBySubscription } from '@/services/download.service.js';
import { getJobStatus } from '@motionelements/core/src/services/job.service.js';

import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'product-gif-creator-modal',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    PreviewGifCreator: () => import('@/views/product/preview/PreviewGifCreator.vue'),
    VueSlider,
    ButtonLadda: () => import('@motionelements/core/src/components/ui/BaseButtonLadda.vue'),
    Byline: () => import('@/views/product/sections/Byline.vue'),
  },
  data() {
    return {
      useCart: true,
      file: null,
      isDownloadFileReady: false,
      isDownload: false,
      isSubmitButtonEnabled: true,
      settings: {
        loop: '',
        quality: 2,
        speed: '1',
        width: 256,
        height: 144,
        markers: [0, 3],
        transparent: false,
      },
      formats: {
        small: {
          label: this.$i18n.t('gif_creator.small'),
          acronym: 'S',
          width: 256,
          height: 144,
        },
        medium: {
          label: this.$i18n.t('gif_creator.medium'),
          acronym: 'M',
          width: 480,
          height: 270,
        },
        large: {
          label: this.$i18n.t('gif_creator.large'),
          acronym: 'L',
          width: 640,
          height: 360,
        },
      },
      speeds: [
        {
          value: '1',
          label: this.$i18n.t('gif_creator.normal'),
        },
        {
          value: '2',
          label: '2x',
        },
        {
          value: '4',
          label: '4x',
        },
      ],
      loops: [
        {
          value: 'none',
          label: this.$i18n.t('gif_creator.no_loop'),
          icon: 'long-arrow-right',
          hasPreview: true,
        },
        {
          value: '',
          label: this.$i18n.t('gif_creator.normal'),
          icon: 'repeat',
          hasPreview: true,
        },
        {
          value: 'reverse',
          label: this.$i18n.t('gif_creator.reverse'),
          icon: 'rotate-left',
          hasPreview: false,
        },
        {
          value: 'pingpong',
          label: this.$i18n.t('gif_creator.ping_pong'),
          icon: 'exchange',
          hasPreview: false,
        },
      ],
      qualities: [
        {
          value: 3,
          label: this.$i18n.t('gif_creator.compressed'),
        },
        {
          value: '',
          label: this.$i18n.t('gif_creator.high_quality'),
        },
        {
          value: 1,
          label: this.$i18n.t('gif_creator.maximum_quality'),
        },
      ],
      transparents: [
        {
          value: false,
          label: this.$i18n.t('gif_creator.opaque'),
          hasPreview: true,
        },
        {
          value: true,
          label: this.$i18n.t('gif_creator.transparent'),
          hasPreview: false,
        },
      ],
    };
  },
  watch: {
    settings: {
      deep: true,
      handler() {
        this.isDownloadFileReady = false;
        // this.isDownload = false;
      },
    },
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
    isFree() {
      return !!_.get(this.selectedVariant, 'free');
    },
    isSubscriber() {
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    isDownloadable() {
      if (this.isFree || this.isSubscriber) {
        return true;
      }

      return this.selectedVariant && !!this.selectedVariant.downloadable;
    },
    ctaLabel() {
      if (this.isDownloadable) {
        return this.$i18n.t('gif_creator.create_your_gif');
      }

      return this.$i18n.t('cta.add_to_cart');
    },
    maxDuration() {
      return _.get(this.element, 'mediaTypeDetails.duration');
    },
    markIn: {
      get: function () {
        return this.settings.markers[0];
      },
      set: function (newValue) {
        this.settings.markers[0] = newValue;
      },
    },
    markOut: {
      get: function () {
        return this.settings.markers[1];
      },
      set: function (newValue) {
        this.settings.markers[1] = newValue;
      },
    },
    masterVariant() {
      for (let i = 0; i < this.element.variants.length; i += 1) {
        if (this.element.variants[i].master) {
          return this.element.variants[i];
        }
      }
      return this.element.variants[0];
    },
    noPreviewSetting() {
      let option;
      if (this.settings.transparent === true) {
        option = this.transparents.find(x => x.value === this.settings.transparent);
      } else if (['reverse', 'pingpong'].includes(this.settings.loop)) {
        option = this.loops.find(x => x.value === this.settings.loop);
      }
      return option ? option.label : false;
    },
  },
  methods: {
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
    setDimensions(size) {
      this.settings.width = this.formats[size].width;
      this.settings.height = this.formats[size].height;
    },
    setSettings(key, value) {
      this.settings[key] = value;
    },
    handleResponse(data) {
      const response = data.data.data;
      // console.log('handleResponse', response);
      if (_.get(response, 'download.status') === 'ready') {
        this.isSubmitButtonEnabled = true;
        this.isDownloadFileReady = true;
        this.file = _.get(response, 'download.file');
        // this.download(response.file);
      } else {
        // this.handleConverting(response);
        this.pollJob(_.get(response, 'job.id'));
      }
    },
    handleJobFailed() {
      this.isSubmitButtonEnabled = true;
      notificationService.alert({
        level: 'danger',
        title: this.$i18n.t('error.failed'), // 'Convert gif job fail, please try again.',
        detail: this.$i18n.t('error.please_try_again'), // 'Convert gif job fail, please try again.',
      });
    },
    pollJob(id) {
      this.isSubmitButtonEnabled = false;
      console.log('jobStatus', id);
      getJobStatus(id).then((res) => {
        // console.log(res);
        const data = res.data.data;
        // console.log(res.data.data);
        if (data.status === 'done') {
          this.onSubmit().then((res) => {
            this.handleResponse(res);
          });
        } else if (['pending', 'converting', 'running'].includes(data.status)) {
          setTimeout(() => {
            this.pollJob(id);
          }, 3000);
        } else {
          this.handleJobFailed();
        }
      }).catch((err) => {
        console.error(err);
        this.handleJobFailed();
      });
    },
    onSubmit() {
      if (!this.isLoggedIn) {
        // this.$store.dispatch('modal/hide');
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      let downloadMethod = null;

      if (this.isFree) {
        downloadMethod = 'free';
      } else if (this.isSubscriber) {
        downloadMethod = 'subscription';
      }

      if (this.useCart && !this.isDownloadable) {
        this.addElementToCart(this.masterVariant.id);
        this.$store.dispatch('modal/hide');
        return;
      }

      this.isDownloadFileReady = false;
      this.file = null;
      const payload = {
        sku: this.masterVariant.id,
        method: downloadMethod, // 'free', // credits/subscription/free, only use free
        convert: {
          codec: 'gif',
          duration: this.markOut - this.markIn,
          start: this.markIn,
          loop: this.settings.loop,
          resolution: `${this.settings.width}x${this.settings.height}`,
          speed: this.settings.speed,
          transparent: this.settings.transparent,
          quality: this.settings.quality,
        },
      };
      // console.log('onsubmit gifcreator: ', payload);
      return downloadElement(payload);
    },
    downloadFile() {
      const file = this.file;
      const a = document.createElement('a');
      a.href = file.url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.btn-group-toggle {
  .btn {
    &:hover {
      color: $primary;
    }
    &.active {
      color: $dark;
    }
  }
}

// vue-slider-component styles
/* Set variables for component */
$themeColor: #eb5424;
// $disabledOpacity: 0.5;

$bgColor: $light;
$railBorderRadius: $spacer;

// $dotShadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
// $dotShadowFocus: 0px 0px 1px 2px rgba($themeColor, 0.36);
$dotBgColor: $white;
$dotBgColorDisable: $light;
// $dotBorderRadius: 50%;

$tooltipBgColor: $light;
$tooltipColor: $dark;
$tooltipBorderRadius: map-get($spacers,1);
$tooltipPadding: .125rem map-get($spacers,1);
$tooltipMinWidth: map-get($spacers,4);
$tooltipArrow: map-get($spacers,2);
$tooltipFontSize: .75rem;

// $stepBorderRadius: 50%;
// $stepBgColor: rgba(0, 0, 0, 0.16);

$labelFontSize: .75rem;

/* import theme style */
@import '~vue-slider-component/lib/theme/default.scss';

//
// DARK MODE
//

.ui-dark {
  $bgColor: $black;
  $dotBgColor: map-get(map-get($theme-colors-variants,"dark"),"1");
  $dotBgColorDisable: $black;

  $tooltipBgColor: $black;
  $tooltipColor: $light;
  /* import theme style */
  @import '~vue-slider-component/lib/theme/default.scss';
}
</style>
