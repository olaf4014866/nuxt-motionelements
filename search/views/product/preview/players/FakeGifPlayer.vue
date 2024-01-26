<template>
  <!-- <div
    ref="videoPlayer"
    id="player"
    class="fp-slim is-splash flowplayer"
    data-share="false"
    :style="posterImg"
  ></div> -->
  <div
    class="gif-creator-preview embed-responsive embed-responsive-16by9"
    style="background-size:contain"
    :style="posterImg"
    @click="showGifCreatorModal"
  >
    <i class="fas me-bmt icon-play fa-2x text-white no-invert"></i>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: 'video-player',
  props: {
    element: Object,
    settings: {
      type: Object,
      default: null,
    },
    settingsPlayer: null,
  },
  computed: {
    posterImg() {
      if (this.element.previews.jpg) {
        return `background-image:url(${this.element.previews.jpg.url})`;
      }
      return '';
    },
    loop() {
      if (this.settings && this.settings.loop === 'none') {
        return false;
      }
      return true;
    },
    speed() {
      if (this.settings && this.settings.speed) {
        return this.settings.speed;
      }
      return 1;
    },
    cuepoints() {
      if (this.settings && this.settings.markers) {
        return this.settings.markers;
      }
      return [];
    },
    settingsFilter() {
      return {
        loop: this.loop,
        autoplay: true, // default value true
        speed: this.speed,
        cuepoints: this.cuepoints,
      };
    },
  },
  watch: {
    // 'settings.loop': function () {
    //   console.log('[PlayerVideo] settings loop update');
    //   // this.unloadVideoPlayer();
    //   // this.initVideoPlayer();
    //   this.$videoPlayerSettings.shutdown();
    //   this.initVideoPlayerSettings();
    // },
    'settings.speed': function () {
      console.log('[PlayerVideo] settings speed update');
      // this.unloadVideoPlayer();
      this.changeVideoPlayerSpeed();
      // this.initVideoPlayer();
    },
    'settings.markers': function () {
      console.log('settings markers update');
      // this.$videoPlayer.setCuePoints(...this.settings.markers);
      // this.shutdownVideoPlayer();
      this.shutdownVideoPlayerSettings();
      this.initVideoPlayerSettings();
    },
    // 'settings.autoplay': function () {
    //   console.log('settings autoplay update');
    //   this.unloadVideoPlayer();
    //   this.$videoPlayer.autoplay(true);
    //   this.initVideoPlayer();
    // },
  },
  mounted() {
    // split normal video player and need change settings, ex: gif-creator
    if (this.settings) {
      this.initVideoPlayerSettings();
    } else {
      this.initVideoPlayer();
    }
  },
  beforeDestroy() {
    if (this.settings) {
      this.shutdownVideoPlayerSettings();
    } else {
      this.unloadVideoPlayer();
    }
  },
  methods: {
    unloadVideoPlayer() {
      this.$videoPlayer.unload();
    },
    shutdownVideoPlayer() {
      this.$videoPlayer.shutdown();
    },
    shutdownVideoPlayerSettings() {
      this.$videoPlayerSettings.shutdown();
    },
    initVideoPlayer() {
      // init video player
      this.$videoPlayer.init(this.$refs.videoPlayer, this.element);
    },
    initVideoPlayerSettings: debounce(function () {
      // console.log('[PlayerVideo] init player settings: ', this.settingsFilter);
      if (this.settings) {
        this.$videoPlayerSettings.updateSettings(this.settingsFilter);
      }
      // init video player
      this.$videoPlayerSettings.init(this.$refs.videoPlayer, this.element);
      // this.changeVideoPlayerSpeed();
      // console.log('videoplayer settings: ', this.$videoPlayer);
      // console.log('videoplayer settings: ', this.settings);
    }, 0),
    changeVideoPlayerSpeed() {
      // console.log('[PlayerVideo] change video player speed');
      if (this.settings && this.settings.speed) {
        // console.log('[PlayerVideo] change video player speed: ', this.settings.speed);
        this.$videoPlayerSettings.speed(this.settings.speed);
      } else {
        // console.log('[PlayerVideo] change video player speed: 1');
        this.$videoPlayerSettings.speed(1);
      }
    },
    // changeVideoPlayerLoop() {
    //   console.log('[PlayerVideo] change video player loop: ', this.loop);
    //   this.$videoPlayer.loop(this.loop);
    //   // if (this.settings.loop === 'none') {
    //   // } else {
    //   //   this.$videoPlayer.loop(true);
    //   // }
    // },
    showGifCreatorModal() {
      const Modal = () => ({
        component: import('@/views/product/modals/GifCreator.vue'),
      });

      this.$store.dispatch('modal/show', {
        component: Modal,
        props: {
          element: this.element,
          // sku: this.currentSku,
          // useCart: this.useCart,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  text-shadow: $text-shadow-1;
  transition: text-shadow .2s ease-in-out, transform .2s ease-in-out;
}

.gif-creator-preview {
  cursor: pointer;

  &:hover {
    .icon-play {
      transform: scale(1.1) translate(-45%,-45%);
      text-shadow: $text-shadow-3;
    }
  }
}
</style>
