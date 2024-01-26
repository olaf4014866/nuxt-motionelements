<template>
  <div class="d-flex justify-content-center">
    <div class="gif-preview-container position-relative">
      <img
        class="img-fluid"
        :src="gifPreviewBg"
      />
      <div class="gif-preview-video">
        <FakeGifVideo
          :element="element"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import PlayerVideo from '@/components/modules/product/preview/players/PlayerVideo.vue';
// import PlayerVideo from '@/views/product/preview/players/PlayerVideo.vue';
import FakeGifVideo from '@/views/product/preview/players/FakeGifPlayer.vue';

export default {
  name: 'gif-creator-preview-small',
  components: {
    FakeGifVideo,
  },
  props: {
    element: Object,
  },
  computed: {
    isDarkMode() {
      // TODO: need to detect if user's Dark Mode is on
      return false;
    },
    isIE() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
    gifPreviewBg() {
      const path = 'https://static.moele.me/img/gif/gif-creator-preview';
      const mode = this.isDarkMode ? 'dark' : 'light';
      const ver = '191003';
      const format = this.isIE ? 'png' : 'svg';

      return `${path}-${mode}-${ver}.${format}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.gif-preview-video {
  position: absolute;
  top: 5%;
  left: 25%;
  width: 50%;
  height: 45%;
}
</style>
