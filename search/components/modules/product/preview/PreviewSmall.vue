<template>
  <div class="d-flex justify-content-center align-items-center">
    <template v-if="hasVideo">
      <PreviewSmallVideo
        :element="element"
      ></PreviewSmallVideo>
      <!-- <div class="rounded overflow-hidden preview-wrapper">
        <img class="img-fluid" src="@/assets-mockup/img/placeholder-640x360-light.jpg" />
      </div> -->
    </template>

    <template v-if="!hasVideo">
      <!-- <PreviewSmallCarousel
        v-if="element.mediaType.match('3d')"
        :element="apiData"
      ></PreviewSmallCarousel> -->

      <!-- <template
        v-if="element.mediaType === 'gif'"
      >
        <div class="rounded overflow-hidden preview-wrapper">
          <img
            class="img-fluid"
            :src="this.element.previews.jpg.url"
          />
        </div>
      </template> -->

      <template>
        <div class="rounded overflow-hidden preview-wrapper">
          <img
            class="img-fluid"
            :src="this.element.previews.jpg.url"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'small-preview',
  components: {
    // PreviewSmallCarousel: () => import('@/components/modules/product/preview/PreviewSmallCarousel.vue'),
    PreviewSmallVideo: () => import('@/components/modules/product/preview/PreviewSmallVideo.vue'),
  },
  props: {
    element: Object,
    apiData: Object,
  },
  computed: {
    hasVideo() {
      switch (this.element.mediaType) {
        case 'animation':
        case 'lottie':
          return true;
        case 'video':
        case 'video-live':
        case 'gif':
        // case '3d_model':
          if (!this.element.previews.mp4.url) {
            return false;
          }
          return true;
        case '3d_model':
          // if (!this.element.thumbnails.jpgs.urls) {
          //   return false;
          // }
          return false;
        default:
          return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
