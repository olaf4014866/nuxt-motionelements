<template>
  <div class="container pb-5">
    <div class="d-flex flex-sm-nowrap flex-column flex-sm-row align-items-center">
      <!-- ALBUM ARTWORK -->
      <div
        v-if="element.albumArt"
        class="mb-3 mb-sm-0 mr-sm-3">
        <img
          class="img-fluid img-album-artwork rounded shadow-sm"
          :src="element.thumbnails.jpg.url"
        />
      </div>

      <div class="w-100 flex-grow-1 d-flex flex-column-reverse flex-sm-row align-items-center align-items-sm-end">
        <div class="mr-sm-3">
          <button type="button" class="btn btn-lg btn-simple-secondary btn-play"
            @click="clickAudioPlayButton(element)">
            <font-awesome-icon
              :icon="classPlayStatus"
              fixed-width
            ></font-awesome-icon>
          </button>
        </div>
        <div class="flex-grow-1 w-100 d-flex flex-column">
          <div class="d-flex justify-content-between">
            <span class="time-label time-elapsed">0:00</span>
            <span class="time-label time-duration">{{ durationToMinutes }}</span>
          </div>
          <div>
            <div
              @mousedown="doProgressMouseDown($event, element)"
              @mouseup="doProgressMouseUp($event, element)"
              @mousemove="doProgressMouseMove($event, element)"
              class="position-relative waveform-wrapper">
              <img
                :src="element.previews.png.url"
                class="img-waveform"
              >
              <img
                :style="classProgressStatus"
                :src="element.previews.png.url"
                ref="waveformTotalDesktop"
                class="img-waveform elapsed"
              >
              <div
                class="waveform-control"
              ></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'template-audio',
  props: {
    element: Object,
  },
  computed: {
    ...mapState({
      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,

      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    getAlbumArt() {
      if (!this.element.albumArt) {
        return this.element.thumbnails.jpg.url;
      }
      return this.element.albumArt.jpg.url;
    },
    durationToMinutes() {
      const duration = this.element.mediaTypeDetails.duration;

      const minutes = Math.floor(duration / 60);
      const seconds = (`0${Math.floor(duration % 60)}`).slice(-2);

      const durationText = `${minutes}:${seconds}`;

      return durationText;
    },
    classProgressStatus: function () {
      let widthElapsed = 0;

      const thisElementId = this.element.id;
      const playingElementId = this.playElementId;
      const isCurrentElement = (thisElementId === playingElementId) ? true : false;
      if (isCurrentElement) {
        const timeElapsed = this.timeElapsed;
        const timeTotal = this.timeTotal;
        const widthTotal = this.waveformWidth;
        widthElapsed = timeElapsed * widthTotal / timeTotal;
      }

      const classObject = {
        opacity: 1,
        clip: `rect(0,${widthElapsed}px,6rem,0)`,
      };

      return classObject;
    },
    classPlayStatus: function () {
      const playStatus = this.playStatus;
      const thisElementId = this.element.id;
      const playingElementId = this.playElementId;

      let showPlay = true;
      let showPause = false;

      const isCurrentElement = (thisElementId === playingElementId) ? true : false;
      if (isCurrentElement && playingElementId) {
        showPlay = (playStatus === '' || playStatus === 'paused') ? true : false;
        showPause = (this.playStatus === 'playing') ? true : false;
      }

      // const classObject = {
      //   'fas play': showPlay,
      //   'fas pause': showPause,
      // };

      // return classObject;
      if (showPlay) { return ['fas', 'play']; }
      if (showPause) { return ['fas', 'pause']; }

      return 'play';
    },
  },
  methods: {
    doProgressMouseDown: function (event, element) {
      console.log('doProgressMouseDown');
      // console.log(event);
      // console.log(element);

      this.isMousedown = true;

      const info = {
        event: event,
        element: element,
      };

      this.$root.$emit('doAudioPlayerSetPosition', info);
    },
    doProgressMouseUp: function () {
      console.log('doProgressMouseUp');
      this.isMousedown = false;
    },
    doProgressMouseMove: function (event, element) {
      console.log('doProgressMouseMove');

      if (this.isMousedown) {
        const info = {
          event: event,
          element: element,
        };

        this.$root.$emit('doAudioPlayerSetPosition', info);
      }
    },
    clickAudioPlayButton(element) {
      this.$root.$emit('doVideoPlayerStop');

      this.$root.$emit('clickAudioPlayButton', element);

      let waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
      if (!waveformWidth) {
        waveformWidth = this.$refs.waveformTotalDesktop.offsetWidth;
        this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$btn-play-size: 3.5rem;
$waveform-height: 6rem;
$waveform-height-sm: 4.5rem;

// SET ALBUM ARTWORK SIZE
.img-album-artwork {
  max-width: 10rem;
}

// SET PLAY BUTTON SIZE
.btn-play {
  padding: 0;
  width: $btn-play-size;
  height: $btn-play-size;
  border-radius: $btn-play-size / 2;

  margin-bottom: #{($waveform-height - $btn-play-size)/2};
  @include media-breakpoint-down(sm) {
    margin-bottom: #{($waveform-height-sm - $btn-play-size)/2};
  }
}

// FIX WAVEFORM CONTAINER & WAVEFORM HEIGHT
.waveform-wrapper, .img-waveform{
  height: $waveform-height;
  @include media-breakpoint-down(sm) {
    height: $waveform-height-sm;
  }
}

// STYLE IMG OF WAVEFORM
.img-waveform {
  width: 100%;

  // positioning
  position: absolute;
  top: 0;
  left: 0;

  // appearance of waveform
  opacity: .3333;
  filter: grayscale(100%);

  &.elapsed {
    opacity: 1;
  }
}

// STYLING OF TIME LABELS
.time-label {
  font-size: $font-size-sm;
}

// .waveform-control EMPTY DIV SCRUBBER OVERLAY
.waveform-control {
  position:absolute;
  width:100%;
  height:100%;
}
</style>
