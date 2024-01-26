<template>
  <div
    ref="videoPlayer"
    class="fp-slim is-splash"
    :style="posterImg"
  ></div>
</template>

<script>
export default {
  name: 'video-player',
  props: {
    previews: Object,
  },
  data() {
    return {
      player: {},
    };
  },
  computed: {
    videoSources() {
      const sources = [];

      if (this.previews.webm) {
        sources.push({
          type: 'video/webm',
          src: this.previews.webm.url,
        });
      }
      if (this.previews.mp4) {
        sources.push({
          type: 'video/mp4',
          src: this.previews.mp4.url,
        });
      }
      return sources;
    },
    posterImg() {
      if (this.previews.jpg) {
        return `background-image:url(${this.previews.jpg.url})`;
      }
      return '';
    },
  },
  mounted() {
    // eslint-disable-next-line
    this.player = flowplayer(this.$refs.videoPlayer, {
      splash: true,
      loop: true,
      key: '$997983260150586',
      clip: {
        sources: this.videoSources,
      },
    });
  },
  updated() {
    this.player.unload();
    this.player = flowplayer(this.$refs.videoPlayer, {
      splash: true,
      loop: true,
      key: '$997983260150586',
      clip: {
        sources: this.videoSources,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
// .fp-outlined:v-deep {
//   .fp-icon {
//     font-family:
//   }
// }
</style>
