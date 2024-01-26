
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      currentSound: state => state.audioPlayer.currentSound,
      windowWidth: state => state.site.window.width,
    }),
    currentSoundId() {
      return this.currentSound ? this.currentSound.id : null;
    },
    isMobileLayout() {
      return this.windowWidth < 1200;
    },
  },
  mounted() {
    if (process.env.VUE_APP_PRERENDER !== 'true') {
      console.log('SOUND', 'init');
      this.$audioPlayer.init();
    }

    this.$root.$on('clickAudioPlayButton', this.onClickPlayAudio);

    // this.$root.$on('clickAudioPlayButton', (element) => {
    //   console.log('SOUND', 'click play 1');
    //   this.clickAudioPlayButton(element);
    // });

    // this.$root.$on('doAudioPlayerSetPosition', (event) => {
    //   console.log('SOUND', 'set position 1');
    //   this.doAudioPlayerSetPosition(event);
    // });

    this.$root.$on('doAudioPlayerSetPosition', this.onSetAudioPosition);
  },

  methods: {
    onClickPlayAudio(element) {
      console.log('SOUND', 'click play 1');
      this.clickAudioPlayButton(element);
    },
    onSetAudioPosition(event) {
      console.log('SOUND', 'set position 1');
      this.doAudioPlayerSetPosition(event);
    },
    doVideoPlayerStop() {
      $('.flowplayer').each(function () {
        // console.log(this);
        const id = $(this).attr('id');
        const player = flowplayer(`#${id}`);
        player.pause();
      });
    },

    clickAudioPlayButton(element) {
      console.log('clickAudioPlayButton element : ', element);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('clickAudioPlayButton play status : ', playStatus);

      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      if (isCurrentElement) {
        switch (playStatus) {
          case 'playing':
            this.doAudioPlayerPause();
            break;
          case 'paused':
            this.doAudioPlayerResume();
            break;
          default:
            this.doAudioPlayerSetup(element);
            break;
        }
      } else {
        // reset progress bar
        const progress = {
          timeElapsed: 0,
          timeTotal: 0,
        };
        this.$store.dispatch('audioPlayer/setPlayProgress', progress);

        this.doAudioPlayerSetup(element);
      }
    },
    doAudioPlayerStop() {
      this.$audioPlayer.stopAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', '');
    },
    doAudioPlayerPause() {
      this.$audioPlayer.pauseAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', 'paused');
    },
    doAudioPlayerResume() {
      this.$audioPlayer.resumeAll();
      this.$store.dispatch('audioPlayer/setPlayStatus', 'playing');
    },
    doAudioPlayerSetup(element) {
      console.log('doAudioPlayerSetup : ', element);

      this.$audioPlayer.stopAll();

      const audioUrl = _.get(element, 'previews.mp3.url');

      let sound = this.$audioPlayer.player.getSoundById('soundManagerPlayer');
      if (sound === undefined) {
        console.log('doAudioPlayerSetup player undefined', element);

        sound = this.$audioPlayer.player.createSound({
          id: 'soundManagerPlayer',
          url: audioUrl,
          whileplaying: () => {
            console.log('doAudioPlayerSetup player whileplaying', sound.position, sound.duration, sound.estimatedDuration);

            // get waveformWidth when at mobile mode

            // let waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
            // console.log('waveformWidth', waveformWidth);
            // if (this.isMobileLayout && !waveformWidth) {
            //   const $waveformTotalMobile = $('#waveformTotalMobile');
            //   waveformWidth = $waveformTotalMobile.width();
            //   console.log('waveformWidth222', waveformWidth);
            //   this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
            // }

            const timeElapsed = Math.round(sound.position);
            const timeTotal = sound.duration;
            const timeEstimated = sound.estimatedDuration;

            const progress = {
              timeElapsed: timeElapsed,
              timeTotal: timeTotal,
              timeEstimated: timeEstimated,
            };

            this.$store.dispatch('audioPlayer/setPlayProgress', progress);
          },
          onfinish: () => {
            // console.log('audioPlayer onfinish');
            const progress = {
              timeElapsed: 0,
              timeTotal: 0,
              timeEstimated: 0,
            };
            this.$store.dispatch('audioPlayer/setPlayProgress', progress);
            this.$store.dispatch('audioPlayer/setPlayStatus', '');
            this.$store.dispatch('audioPlayer/setElementInfo', { id: false });
          },
        });
      }

      if (sound) {
        this.$store.dispatch('audioPlayer/setCurrentSound', sound);

        sound.play({
          url: audioUrl,
        });

        this.updateWaveformWidth();
        // @moved to here, set waveformWidht?
        // let waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
        // if (this.isMobileLayout && !waveformWidth) {
        //   const $waveformTotalMobile = $('#waveformTotalMobile');
        //   waveformWidth = $waveformTotalMobile.width();
        //
        //   this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
        // }

        this.$store.dispatch('audioPlayer/setInitStatus', true);
        this.$store.dispatch('audioPlayer/setPlayStatus', 'playing');
        this.$store.dispatch('audioPlayer/setElementInfo', element);
      }
    },
    doAudioPlayerSetPosition(info) {
      console.log('doAudioPlayerSetPosition', info);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('doAudioPlayerSetPosition : play status - ', playStatus);
      if (playStatus === '') {
        return;
      }

      const sound = this.$audioPlayer.player.getSoundById('soundManagerPlayer');

      const event = info.event;
      const element = info.element;
      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      // when click playing audio's waveform
      if (playStatus && isCurrentElement) {
        sound.stop();

        const progress = this.$store.getters['audioPlayer/playProgress'];
        const duration = progress.timeTotal || progress.timeEstimated;
        const waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
        const clickPositionX = event.offsetX;
        const position = Math.round(clickPositionX * duration / waveformWidth);
        sound.setPosition(position);

        sound.play();
      }

      // when click other audio's waveform
      if (!isCurrentElement) {
        const progress = {
          timeElapsed: 0,
          timeTotal: 0,
          timeEstimated: 0,
        };
        this.$store.dispatch('audioPlayer/setPlayProgress', progress);

        this.doAudioPlayerSetup(element);
      }
    },

    updateWaveformWidth() {
      // const sound = this.currentSound;

      // is playing
      // if (sound && sound.duration && !sound.paused) {
      // let waveformWidth;// = this.$store.getters['audioPlayer/waveformWidth'];
      // console.log('waveformWidth', waveformWidth);
      // if (this.isMobileLayout) {
      const $waveformTotalMobile = $('#waveformTotalMobile');

      if ($waveformTotalMobile) {
        const waveformWidth = $waveformTotalMobile.width();
        // console.log('waveformWidth222', waveformWidth);
        this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
      }
      // } else {
      //   console.log('not playing');
      // }
    },
  },

  beforeDestroy() {
    console.log('player: beforeDestroy');

    this.$root.$off('clickAudioPlayButton', this.onClickPlayAudio);
    this.$root.$off('doAudioPlayerSetPosition', this.onSetAudioPosition);

    this.doAudioPlayerStop();
    this.doVideoPlayerStop();

    if (this.currentSoundId) {
      console.log('player unload sound', this.currentSoundId);
      this.$audioPlayer.player.destroySound(this.currentSoundId);
    }

    this.$store.dispatch('audioPlayer/reset');
    // unload audio player / video player from memory?
  },

  watch: {
    windowWidth() {
      console.log('WATCH windowWidth changed', this.playStatus);
      this.updateWaveformWidth();
    },
  },
};
