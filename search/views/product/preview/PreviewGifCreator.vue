<template>
  <div class="d-flex align-self-center">
    <PlayerVideo
      :element="element"
      :settings="settings"
    />
    <!-- <div class="gif-preview-container position-relative">
      <img
        class="img-fluid"
        :src="gifPreviewBg"
      />
      <div class="gif-preview-video">
        <PlayerVideo
          :element="element"
        />
      </div>
    </div> -->
  </div>
</template>

<script>
// import PlayerVideo from '@/components/modules/product/preview/players/PlayerVideo.vue';
import PlayerVideo from '@/views/product/preview/players/PlayerVideo.vue';

export default {
  name: 'gif-creator-preview',
  components: {
    PlayerVideo,
  },
  props: {
    element: Object,
    settings: Object,
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
  // watch: {
  //   settings: {
  //     deep: true,
  //     handler: _.debounce(function () {
  //       // cuepoints
  //       this.$videoPlayer.setCuePoints(...this.settings.markers);
  //       // this.$videoPlayer.seek();
  //       // loop
  //       this.$videoPlayer.loop(this.settings.loop);

  //       // if (this.settings.loop) {
  //       //   console.log(this.settings.loop);
  //       // }
  //       // if (this.settings.speed) {
  //       //   console.log(this.settings.speed);
  //       // }
  //       // speed
  //       if (this.settings.speed) {
  //         this.$videoPlayer.speed(this.settings.speed);
  //       } else {
  //         this.$videoPlayer.speed(1);
  //       }

  //       if (this.settings.markers) {
  //         console.log(this.settings.markers);
  //       }
  //     }, 500),
  //   },
  // },
  // mounted() {
  //   // this.$videoPlayer.play();
  // },
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
