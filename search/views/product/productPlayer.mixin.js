
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      currentSound: state => state.audioPlayer.currentSound,
    }),
    currentSoundId() {
      return this.currentSound ? this.currentSound.id : null;
    },
  },
  mounted() {
    if (process.env.VUE_APP_PRERENDER !== 'true') {
      this.$audioPlayer.init();
    }

    // audio event
    this.$root.$on('clickAudioPlayButton', (element) => {
      this.clickAudioPlayButton(element);
    });

    this.$root.$on('doAudioPlayerSetPosition', (event) => {
      this.doAudioPlayerSetPosition(event);
    });

    // if (['stage', 'develop'].indexOf(process.env.VUE_APP_ME_ENV) > -1) {
    //   this.$el.addEventListener('click', this.hijackclick);
    // }
  },

  methods: {

    clickAudioPlayButton(element) {
      console.log('clickAudioPlayButton', element);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];

      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      console.log('clickAudioPlayButton', playStatus, isCurrentElement, clickElementId, playingElementId);

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

      const audioUrl = element.previews.mp3.url;

      let sound = this.$audioPlayer.player.getSoundById('soundManagerPlayer');
      if (sound === undefined) {
        sound = this.$audioPlayer.player.createSound({
          id: 'soundManagerPlayer',
          url: audioUrl,
          whileplaying: () => {
            console.log('doAudioPlayerSetup player whileplaying', sound.position, sound.duration, sound.estimatedDuration);

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
        // console.log('none play status')
        // this.doAudioPlayerSetup(info.element);
        return;
      }

      const player = this.$audioPlayer.player.getSoundById('soundManagerPlayer');

      const event = info.event;
      const element = info.element;
      const playingElementId = this.playElementId;
      const clickElementId = element.id;
      const isCurrentElement = (clickElementId === playingElementId) ? true : false;

      // when click playing audio's waveform
      if (playStatus && isCurrentElement) {
        player.stop();

        const progress = this.$store.getters['audioPlayer/playProgress'];
        const duration = progress.timeTotal || progress.timeEstimated;
        const waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
        const clickPositionX = event.offsetX;
        const position = Math.round((clickPositionX * duration) / waveformWidth);
        player.setPosition(position);

        player.play();
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

  },

  beforeDestroy() {
    console.log('player: beforeDestroy');
    this.doAudioPlayerStop();

    if (this.currentSoundId) {
      console.log('player unload sound', this.currentSoundId);
      this.$audioPlayer.player.unload(this.currentSoundId);
    }

    this.$store.dispatch('audioPlayer/reset');
    // unload audio player / video player from memory?
  },

};
