<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center align-items-center position-relative">
      <div v-if="!isVr" class="rounded overflow-hidden preview-wrapper">

        <PlayerVideo
          :previews="this.element.previews"
        ></PlayerVideo>

      </div>
      <div v-if="isVr" class="preview-wrapper-vr rounded overflow-hidden">

        <template v-if="isVr === 'video'">
          <Pano type="video" :source="element.previews.mp4.url"></Pano>
        </template>

        <template v-if="isVr === 'photo'">
          <Pano type="" :source="element.previews.jpg.url"></Pano>
        </template>

      </div>

      <!-- <v-show-on size=">=xl">
        <MusicRecommendDesktop
          v-if="showRecommendedMusic && hasMusicRecommendation"
        ></MusicRecommendDesktop>
      </v-show-on> -->
    </div>
    <!-- <template v-if="showRecommendedMusic && hasMusicRecommendation">
      <v-show-on size="<=lg">
        <div class="d-flex justify-content-center align-items-center mt-3">
          <MusicRecommendMobile
          ></MusicRecommendMobile>
        </div>
      </v-show-on>
    </template> -->
  </div>
</template>

<script>
import { Pano } from 'vuejs-vr';

export default {
  name: 'large-preview',
  components: {
    Pano,
    // 'v-show-on': () => import('@/components/modules/common/VShowOn.vue'),
    PlayerVideo: () => import('@/components/modules/product/preview/players/PlayerVideo.vue'),
    // MusicRecommendDesktop: () => import('@/components/modules/product/preview/MusicRecommend.Desktop.vue'),
    // MusicRecommendMobile: () => import('@/components/modules/product/preview/MusicRecommend.Mobile.vue'),
  },
  props: {
    element: Object,
    // showRecommendedMusic: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  computed: {
    isVr() {
      switch (this.element.mediaType) {
        case 'video-vr':
          return 'video';
        case 'photo-vr':
          return 'photo';
        default:
          return false;
      }
    },
    hasMusicRecommendation() {
      let mediatype = this.element.mediaType.replace('_', '-');
      if (mediatype.indexOf('_') < 0) {
        mediatype = _.kebabCase(mediatype);
      }
      switch (mediatype) {
        case 'ae-template':
        case 'ae-preset':
        case 'motion-template':
        case 'pr-template':
        case 'pr-preset':
        case 'mg-template':
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
  },
  mounted() {
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
