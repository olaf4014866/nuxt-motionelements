<template>
  <div class="d-flex justify-content-center align-items-center">
    <template v-if="hasVideo">

      <PreviewSmallVideo
        :element="element"
      />
      <!-- <div class="rounded overflow-hidden preview-wrapper">
        <img class="img-fluid" src="@/assets-mockup/img/placeholder-640x360-light.jpg" />
      </div> -->
    </template>

    <template v-if="!hasVideo">
      <PreviewSmallCarousel
        v-if="isGif || is3dModel"
        :element="element"
      />
      <template
        v-else-if="element.previews"
      >
        <div class="rounded overflow-hidden preview-wrapper">
          <img
            class="img-fluid"
            :src="element.previews.jpg.url"
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
    PreviewSmallCarousel: () => import('@/views/product/preview/PreviewSmallCarousel.vue'),
    PreviewSmallVideo: () => import('@/views/product/preview/PreviewSmallVideo.vue'),
  },
  props: {
    element: Object,
  },
  computed: {
    isGif() {
      return this.element && this.element.mediaType === 'gif';
    },
    is3dModel() {
      return this.element && this.element.mediaType === '3d_model';
    },
    hasVideo() {
      if (this.isGif || this.is3dModel) {
        return false;
      }

      return this.element && !!_.get(this.element, 'previews.mp4.url');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
