<template>
  <div class="card-body p-5">
    <p class="lead text-black mb-0">
      {{ $t('download.credit_artist_heading') }}
    </p>
    <div>
      {{ $t('download.credit_artist_subheading') }}
      <a href="https://help.motionelements.com/hc/en-us/articles/206279202-Do-I-need-to-credit-the-Artist-or-MotionElements-in-my-works-">
        <font-awesome-icon
          :icon="['fas','question-circle']"
          class="text-info"
        />
      </a>
    </div>
    <p>
      {{ $t('download.credit_artist_step_1') }}:
    </p>
    <Byline
      v-if="element"
      :product="element"
    />
  </div>
</template>

<script>
import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'credit-artist',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    Byline: () => import('@/views/product/sections/Byline.vue'),
  },
  computed: {
    username() {
      return _.get(this.element, 'artist.username', null);
    },
    mediaTypeTerm() {
      switch (true) {
        case isProductType('video', this.element.mediaType):
          return 'Stock video';
        case this.element.mediaType === 'music':
          return 'Stock music';
        case this.element.mediaType === 'sfx':
          return 'Sound effects';
        case isProductType('video_template', this.element.mediaType):
          return 'Template';
        default:
          return 'Stock media';
      }
    },
    artistUrl() {
      return _.get(this.element, 'artist.url') || this.$link(`https://www.motionelements.com/artists/${this.username.toLowerCase()}`).url();
    },
    productUrl() {
      return _.get(this.element, 'html.url') || this.$link('https://www.motionelements.com').url();
    },
  },
};
</script>
