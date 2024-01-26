<template>
  <!-- Looking for 4K / Video or GIF -->
  <!-- <template v-if="element.mediaType === 'video-live' || element.mediaType === 'animation' || element.mediaType === 'gif'"> -->
  <div>
    <div v-for="relatedElement in relatedElements" :key="relatedElement.id" class="border border-light rounded p-3 mb-3 d-flex">
      <ProductIcon
        :productType="element.mediaType === 'gif' ? 'video' : 'gif'"
        class="text-muted mr-3 mt-2"
        fixed-width
      />
      <div v-if="relatedElement.mediaType === element.mediaType">
        <p class="mb-0">
          {{ $t('product_page.looking_for_{product}', { product: relatedElement.format }) }}
        </p>
        <nuxt-link
          :to="`$link(relatedElement.html.url).fullPath()`"
          class="btn btn-sm btn-simple-secondary"
        >
          {{ $t('product_page.click_here_for_this_element_in_{format}', { format: relatedElement.format }) }}
        </nuxt-link>
      </div>
      <div v-else>
        <p class="mb-0">
          {{ $t('product_page.looking_for_{product}', { product: renderMediaTypeLabel(relatedElement.mediaType) }) }}
        </p>
        <nuxt-link
          :to="`$link(relatedElement.html.url).fullPath()`"
          class="btn btn-sm btn-simple-secondary"
        >
          {{ $t('product_page.click_here_for_{product}', { product: renderMediaTypeLabel(relatedElement.mediaType) }) }}
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script>
import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'product-related-elements',
  components: {
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
    relatedElements: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    renderMediaTypeLabel(mediaType) {
      switch (true) {
        case isProductType('gif', mediaType):
          return `${this.$i18n.t('product.image')} + GIF`;

        case isProductType('video', mediaType):
          return this.$i18n.t('product.video');

        default:
          return mediaType;
      }
    },
  },
};
</script>
