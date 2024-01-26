<template>
  <div>
    <video
      ref="videoJsPlayer"
      class="video-js vjs-big-play-centered"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-vr');

export default {
  name: 'video-js-player',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  computed: {
    isVr() {
      return this.options.projection ? true : false;
    },
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoJsPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this);
      },
    );

    if (this.isVr) {
      this.player.vr({
        projection: this.options.projection,
        debug: true,
        forceCardboard: false,
      });
      console.log(this.player);
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss">
@import '~video.js/dist/video-js.min.css';
</style>
