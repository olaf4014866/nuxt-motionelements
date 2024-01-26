<template>
  <div class="w-100">
    <div class="overflow-hidden preview-wrapper mx-auto">
      <div
        ref="videoPlayer"
        class="fp-slim is-splash"
        :style="posterImg"
      >
        <div class="fp-playlist">
          <a v-for="(item, index) in playlist" :key="item.id" :href="item.src" :data-title="item.title" @click="number = index"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generatePlaylist } from '@/helpers/player.js';

export default {
  name: 'player-video-carousel',
  props: {
    playlist: Array,
  },
  data() {
    return {
      number: 0,
      player: null,
    };
  },
  computed: {
    posterImg() {
      if (this.playlist[this.number].previews.jpg) {
        return `background-image:url(${this.playlist[this.number].previews.jpg.url})`;
      }
      return '';
    },
  },
  mounted() {
    this.launchPlayer();
  },
  methods: {
    launchPlayer(num = 0) {
      // console.log('launchaplyer ', num);
      // console.log('launchaplyer ', this.playlist[num].previews.webm.url);

      this.player = flowplayer(this.$refs.videoPlayer, {
        splash: true,
        loop: true,
        key: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? process.env.VUE_APP_FLOWPLAYER_KEY : '',
        debug: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? false : true,
        clip: {
          sources: [
            {
              type: 'video/webm',
              src: this.playlist[num].previews.webm.url,
            }, {
              type: 'video/mp4',
              src: this.playlist[num].previews.mp4.url,
            },
          ],
        },
        playlist: generatePlaylist(this.playlist),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-wrapper {
  width: 100%;
  @include media-breakpoint-up(lg) {
    width: 40rem;
  }

  &::v-deep .fp-playlist {
    & > a {
      margin-left: map-get($spacers,1);
      margin-right: map-get($spacers,1);
    }
  }
}
</style>
