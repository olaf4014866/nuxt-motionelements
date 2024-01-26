<template>
  <div class="container-fluid pb-5">
    <div class="d-flex justify-content-center align-items-center position-relative">
      <div class="rounded overflow-hidden preview-wrapper">

        <PlayerVideo :element="element"></PlayerVideo>

      </div>

      <viewport-helper size=">=xl">
        <MusicRecommendDesktop
          v-if="hasRecommendedMusic"
          :elements="recommendedMusicElements"
        />
      </viewport-helper>
    </div>
    <template v-if="hasRecommendedMusic">
      <viewport-helper size="<=lg">
        <div class="d-flex justify-content-center align-items-center mt-3">
          <MusicRecommendMobile
            :elements="recommendedMusicElements"
          />
        </div>
      </viewport-helper>
    </template>

  </div>
</template>

<script>
export default {
  name: 'large-preview',
  components: {
    'viewport-helper': () => import('@/components/modules/common/ViewportHelper.vue'),
    PlayerVideo: () => import('@/views/product/preview/players/PlayerVideo.vue'),
    MusicRecommendDesktop: () => import('@/views/product/preview/recommend/MusicRecommend.Desktop.vue'),
    MusicRecommendMobile: () => import('@/views/product/preview/recommend/MusicRecommend.Mobile.vue'),
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
    recommendedMusicElements: {
      type: Array,
      required: false,
    },
  },
  mounted() {
  },
  computed: {
    hasRecommendedMusic() {
      return this.recommendedMusicElements && this.recommendedMusicElements.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-wrapper {
  width: 100%;
  @include media-breakpoint-up(xxl) {
    width: 60rem;
  }
  @include media-breakpoint-between(lg,xl) {
    width: 45rem;
  }
}

.preview-wrapper-vr {
  width: 100%;
  height: 50vh;
  min-height: 540px;
}
</style>
