<template>
  <div class="d-flex justify-content-center align-items-center position-relative" id="tutorial">
    <div
      ref="tutorialPlayer"
      class="fp-slim is-splash"
      :style="posterImg"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'tutorial-player',
  props: {
    element: Object,
    url: String,
  },
  data() {
    return {
      player: {},
    };
  },
  computed: {
    posterImg() {
      if (this.element.previews.jpg) {
        return `background-image:url(${this.element.previews.jpg.url})`;
      }
      return '';
    },
  },
  mounted() {
    // eslint-disable-next-line
    // this.$tutorialPlayer.init(this.$refs.tutorialPlayer, this.url);
    this.player = flowplayer(this.$refs.tutorialPlayer, {
      splash: false,
      loop: true,
      autoplay: false,
      muted: true,
      share: false,
      key: process.env.VUE_APP_FLOWPLAYER_KEY,
      clip: {
        sources: [
          {
            type: 'video/mp4',
            src: this.url,
          },
          {
            type: 'video/webm',
            src: this.url.replace('.mp4', '.webm'),
          },
        ],
      },
    });

    // this.player.load();

    // this.player.on('play', () => {
    //   console.log('play');
    //   this.player.pause();
    // });
    this.player.on('playing', () => {
      console.log('playing');
      this.player.pause();
      this.player.stop();
    });
    this.player.on('paused', () => {
      console.log('pause');
    });
    this.player.on('stop', () => {
      console.log('stop');
    });
  },
};
</script>
