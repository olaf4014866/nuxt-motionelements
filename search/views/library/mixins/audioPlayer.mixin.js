import { mapState } from 'vuex';

// https://vuejs.org/v2/style-guide/#Private-property-names-essential
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
  },
  mounted() {
    // audio init, to migrate to mixin
    this.$root.$on('doAudioPlayerStop', () => {
      console.log('emit : doAudioPlayerStop');
      this.doAudioPlayerStop();
    });

    this.$root.$on('clickAudioPlayButton', (element) => {
      this.clickAudioPlayButton(element);
    });

    this.$root.$on('doAudioPlayerSetPosition', (event) => {
      this.doAudioPlayerSetPosition(event);
    });

    this.$audioPlayer.init();

    // me-modules product wrapper will trigger event when first play
    let currentPlayingElementId = null;
    this.$root.$on('audioPlayerStart', (element) => {
      console.log('emit : audioPlayerStart', element);
      if (currentPlayingElementId !== element.id) {
        currentPlayingElementId = element.id;
        this.$teleport.event('product_previewed', element);
      }
    });
  },
  methods: {
    // av player, migrate to mixin
    clickAudioPlayButton(element) {
      console.log('clickAudioPlayButton', element);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('clickAudioPlayButton', playStatus);

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
      this.$audioPlayer.stopAll();

      const audioUrl = element.previews.mp3.url;

      let player = this.$audioPlayer.player.getSoundById('soundManagerPlayer');
      if (player === undefined) {
        player = this.$audioPlayer.player.createSound({
          id: 'soundManagerPlayer',
          url: audioUrl,
          whileplaying: () => {
            // console.log('audioPlayer whileplaying');

            const timeElapsed = Math.round(player.position);
            const timeTotal = player.duration;
            const timeEstimated = player.estimatedDuration;

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

      player.play({
        url: audioUrl,
      });

      this.$store.dispatch('audioPlayer/setInitStatus', true);
      this.$store.dispatch('audioPlayer/setPlayStatus', 'playing');
      this.$store.dispatch('audioPlayer/setElementInfo', element);
    },
    doAudioPlayerSetPosition(info) {
      console.log('doAudioPlayerSetPosition', info);

      const playStatus = this.$store.getters['audioPlayer/playStatus'];
      console.log('doAudioPlayerSetPosition : play status - ', playStatus);

      if (playStatus === '') {
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
        const position = Math.round(clickPositionX * duration / waveformWidth);
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
  watch: {
  },
};
