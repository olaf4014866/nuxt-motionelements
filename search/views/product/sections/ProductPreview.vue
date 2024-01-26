<template>
  <section
    ref="sectionPreview"
    class="w-100 overflow-hidden"
  >
    <!-- Show back button if previous page is not referral -->
    <!-- <div
      v-if="true"
      class="container pt-3">
      <button
        type="button"
        class="btn btn-simple-secondary"
      >
        <font-awesome-icon
          :icon="['far','chevron-left']"
          class="mr-1"
        ></font-awesome-icon>
        Back to {previous page}
      </button>
    </div> -->

    <!--
    <div class="container pt-3">
      <SectionTitle
        v-if="element.mediaType"
        :element="element"
      ></SectionTitle>
    </div>
    -->
    <PreviewLarge v-if="element && previewType === 'template'"
      :element="element"
      :recommendedMusicElements="recommendedMusicElements"
    />
    <PreviewAudio v-else-if="element && previewType === 'audio'"
      :element="element"
    />
    <PreviewVr v-else-if="element && previewType === 'vr'"
      :element="element"
    />
    <Preview3d v-else-if="element && previewType === '3d'"
      :element="element"
      :images="imageUrls"
    />
    <PlayerVideoCarousel v-else-if="collection && collectionItems && collectionItems.length"
      :playlist="collectionItems"
    />

    <viewport-helper size="<=md">
      <div v-if="element && previewType === 'video'" class="px-3 pb-5">
        <PreviewSmall
          :element="element"
        ></PreviewSmall>
      </div>
    </viewport-helper>

  </section>
</template>


<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'product-preview',
  props: {
    product: {
      type: Object,
      required: true,
    },
    recommendedMusicElements: {
      type: Array,
      required: false,
    },
  },
  components: {
    'viewport-helper': () => import('@/components/modules/common/ViewportHelper.vue'),
    PreviewLarge: () => import('@/views/product/preview/PreviewLarge.vue'),
    PreviewSmall: () => import('@/views/product/preview/PreviewSmall.vue'),
    PreviewAudio: () => import('@/views/product/preview/PreviewAudio.vue'),
    PreviewVr: () => import('@/views/product/preview/PreviewVr.vue'),
    Preview3d: () => import('@/views/product/preview/Preview3d.vue'),
    PlayerVideoCarousel: () => import('@/views/product/preview/players/PlayerVideoCarousel.vue'),
  },
  computed: {
    ...mapState({
      collectionItems: state => state.product.collectionItems,
    }),
    element() {
      return this.product.object === 'element' ? this.product : false;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : false;
    },
    isAudio() {
      switch (this.mediaType) {
        case 'music':
        case 'sfx':
          return true;
        default:
          return false;
      }
    },
    mediaType() {
      return _.get(this.element, 'mediaType', null);
    },
    previewType() {
      switch (true) {
        case isProductType('video_template', this.mediaType):
          return 'template';
        case isProductType('vr', this.mediaType):
          return 'vr';
        // case isProductType('3d', this.mediaType):
        //   return '3d';
        case isProductType('audio', this.mediaType):
          return 'audio';
        default:
          return 'video';
      }
    },
    // previewTurntableUrls() {
    //   return _.get(this.element, 'previews.turntable');
    // },
    // hasPreviewTurntable() {
    //   return _.size(this.previewTurntableUrls) > 0;
    // },
    // imageUrls() {
    //   return this.hasPreviewTurntable ? this.element.previews.turntable.map(v => v.url) : [];
    // },
  },
};
</script>
