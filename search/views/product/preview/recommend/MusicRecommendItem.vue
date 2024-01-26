<template>
  <div class="d-flex w-100 small align-items-center mb-1">
    <button
      class="btn btn-sm btn-link flex-grow-1 d-flex align-items-center"
      :title="element ? element.name : 'Original Audio Track'"
      @click="playTrack(element)"
    >
      <font-awesome-icon
        v-if="element"
        :icon="classPlayStatus"
      />
      <div
        class="flex-grow-1 font-weight-bold ml-3 text-left"
      >
        <template v-if="element">
          {{ truncatedName }}
        </template>
        <template v-else>
          {{ $t('product.default_track') }}
        </template>
      </div>
    </button>
    <div
      class="col-4 px-0 text-right"
    >
      <template v-if="element">
        <div class="btn-group btn-group-sm" role="group"
             @mouseover="isHovered=true"
             @mouseleave="isHovered=false"
        >
          <nuxt-link
            :to="$link(element.html.url).fullPath()"
            class="btn btn-outline-secondary"
          >
            <template v-if="showCredits">
              {{ credits }} <font-awesome-icon :icon="['fal','me-credits-circle']"/>
            </template>
            <template v-else>
              <small>{{ price.getSymbol() }}</small>
              {{ price.toFormat('0,0') }}
            </template>
          </nuxt-link>
          <a
            v-if="showDownloadSample"
            type="button"
            class="btn btn-secondary"
            :href="$link(`/download/sample/${element.id}`).url()"
          >
            <font-awesome-icon
              :icon="['far','me-download']"
              size="lg"
            />
          </a>
        </div>
      </template>
      <template v-else>
        {{ $t('product.not_included') }}
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';

export default {
  name: 'music-recommend-item',
  props: {
    element: {
      type: Object,
      required: false,
    },
    isDefaultTrack: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isHovered: false,
      // selectedSku: null,
    };
  },
  computed: {
    ...mapState({
      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      memberCredits: state => state.user.member.credits,
      // timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      // timeTotal: state => state.audioPlayer.playProgress.timeTotal,
    }),
    isFree() {
      return this.element && !!this.element.free;
    },
    credits() {
      return this.element && this.element.credits;
    },
    showCredits() {
      return this.memberCredits > 0;
    },
    showDownloadSample() {
      return false;
    },
    // variant() {
    //   return this.element.variants.slice(-1)[0];
    // },
    price() {
      return Money({ amount: this.element.price, currency: this.element.currency });
    },
    classPlayStatus() {
      const playStatus = this.playStatus;
      const thisElementId = this.element.id;
      const playingElementId = this.playElementId;

      let classObject = ['fas', 'pause'];

      let showPlay = true;
      let showPause = false;

      const isCurrentElement = (thisElementId === playingElementId);
      if (isCurrentElement && playingElementId) {
        showPlay = (playStatus === '' || playStatus === 'paused');
        showPause = (playStatus === 'playing');
      }

      if (showPlay) {
        classObject = ['fas', 'play'];
      }
      if (showPause) {
        classObject = ['fas', 'pause'];
      }
      return classObject;
    },
    truncatedName() {
      if (!this.element) {
        return '';
      }

      if (this.isHovered) {
        return this.$i18n.t('cta.view');
      }

      const limit = 12;
      if (this.element.name.length <= limit) {
        return this.element.name;
      }
      return `${this.element.name.slice(0, limit)}...`;
    },
  },
  methods: {
    // doAddElementsToCart() {
    //   console.log('Add to Cart');
    //   this.$api.addCart(this.element.id).then((res) => {
    //     console.log(res);
    //   });
    // },
    playTrack() {
      this.$audioPlayer.stopAll();
      this.$root.$emit('clickAudioPlayButton', this.element);
      if (this.playStatus === 'playing') {
        // window.flowplayer().play();
        this.$videoPlayer.play();
        this.$videoPlayer.volume(0);
        this.$videoPlayer.muted(true);
        this.$videoPlayer.seek(0);
      } else {
        this.$videoPlayer.pause();
        this.$videoPlayer.muted(false);
        this.$videoPlayer.volume(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
