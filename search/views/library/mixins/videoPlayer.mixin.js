import { mapState } from 'vuex';

// https://vuejs.org/v2/style-guide/#Private-property-names-essential
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
    }),
  },
  mounted() {
    this.$root.$on('doVideoPlayerStop', () => {
      console.log('emit : doVideoPlayerStop');
      this.doVideoPlayerStop();
    });

    let currentPlayingElementId = null;
    // me-modules product wrapper will trigger event when first play
    this.$root.$on('videoPlayerStart', (element) => {
      console.log('emit : videoPlayerStart', element);
      if (currentPlayingElementId !== element.id) {
        currentPlayingElementId = element.id;
        this.$teleport.event('product_previewed', element);
      }
    });
  },
  methods: {
    // av player, migrate to mixin
    doVideoPlayerStop() {
      $('.flowplayer').each(function () {
        // console.log(this);
        const id = $(this).attr('id');
        const player = flowplayer(`#${id}`);
        player.pause();
      });
    },
  },
  watch: {
  },
};
