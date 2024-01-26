<template>
  <i18n path="download.{product}_by_{name}">
    <template v-slot:product>
      {{ mediaTypeTerm }}
    </template>
    <template v-slot:name>
      <template v-if="username">
        <a :href="artistUrl">{{ username }}</a> / <a :href="productUrl">MotionElements.com</a>
      </template>
      <template v-else>
        <a :href="productUrl">MotionElements.com</a>
      </template>
    </template>
  </i18n>
</template>

<script>
import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'credit-artist',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // isElement() {
    //   return this.product.object === 'element';
    // },
    // isCollection() {
    //   return this.product.object === 'collection';
    // },
    username() {
      return _.get(this.product, 'artist.username', null);
    },
    mediaTypeTerm() {
      const mediaType = _.get(this.product, 'mediaType');

      switch (true) {
        case isProductType('video', mediaType):
          return 'Stock video';
        case mediaType === 'music':
          return 'Stock music';
        case mediaType === 'sfx':
          return 'Sound effects';
        case mediaType === 'gif':
          return 'GIF';
        case isProductType('video_template', mediaType):
          return 'Template';
        default:
          return 'Stock media';
      }
    },
    artistUrl() {
      return _.get(this.product, 'artist.url') || this.$link(`https://www.motionelements.com/artists/${this.username.toLowerCase()}`).url();
    },
    productUrl() {
      return _.get(this.product, 'html.url') || this.$link('https://www.motionelements.com').url();
    },
  },
};
</script>
