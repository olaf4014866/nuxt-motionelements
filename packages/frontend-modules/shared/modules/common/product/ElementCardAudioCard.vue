<template>
  <div class="card-content py-2 px-2 bg-white rounded overflow-hidden">
    <div class="d-flex align-items-center mb-1">
      <div class="pr-2">
        <button
          @click="clickAudioPlayButton(element)"
          class="btn btn-play btn-simple-black sm2-play px-2"
        >
          <i
            :class="classPlayStatus"
            class="fas fa-fw"
          ></i>
        </button>
      </div>
      <div class="flex-fill small" style="min-width:0">
        <p class="mb-0 text-truncate">
          <a
            :href="element.html.url"
          >{{ element.name }}</a>
        </p>
        <div class="">
          <div class="list-inline mb-0 small text-muted text-truncated">
            <div v-if="this.showBadge" class="list-inline-item">

              <!-- IF NOT P.R.O., remove -->
              <span
                v-if="element.pro"
                class="badge badge-pill badge-light"
              >{{ $t('product.pro') }}</span>

              <!-- IF NOT SUBSCRIPTION, remove -->
              <span
                v-if="element.subscription"
                class="badge badge-pill badge-info"
              ><i class="fas fa-fw me-bmt icon-lightning"></i></span>

            </div>
            <!-- Categories -->
            <!--
            <a
              @click.prevent="filterCategories(element)"
              v-for="(category, key) in element.categories.slice(0,1)" :key="key"
              href="#"
              class="list-inline-item font-weight-normal"
            >{{category.name}}</a>
            -->

            <div class="list-inline-item">
              <span
                v-for="(category, key) in element.categories.slice(0,1)" :key="key"
              >{{ category.name }}</span>
            </div>


            <!-- DURATION -->
            <div class="list-inline-item"><i class="far me-bmt icon-clock"></i> {{ this.durationToMinutes }}</div>

            <!-- PRICE -->
            <div
              v-show="element.price !== false"
              class="list-inline-item"
            >
              {{ this.currencySymbol }} {{ element.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="collapse"
      :class="{show : isExpanded}"
    >
      <div class="py-2">
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
            ref="waveformTotalMobile"
            id="waveformTotalMobile"
            class="img-waveform elapsed"
          >
          <div
            class="waveform-control"
          ></div>
        </div>
      </div>
      <div class="d-flex div-actionables py-1 justify-content-between justify-content-lg-end align-items-center small">

        <a
          v-if="options.favorites"
          @click.prevent="addFavorites(element)"
          :class="{ active : (element.favorited || this.clickFavorite) }"
          class="d-block btn-actionable px-0 px-lg-2 btn-bounce-icon"
          href="#"
        >
          <i
            :class="(element.favorited || this.clickFavorite) ? 'fas me-bmt icon-heart-solid text-primary' : 'far me-bmt icon-heart-regular text-secondary'"
          ></i><span class="d-inline d-lg-none"> {{ $t('product.favorite')}}</span>
        </a>

        <a
          v-if="element.similarity"
          class="d-block btn-actionable px-0 px-lg-2 track-similar"
          @click="filterSimilar(element)"
          href="#"
        ><i class="far fa-fw me-bmt icon-search-ai-regular"></i>&nbsp;<span class="d-inline d-lg-none">{{ $t('product.similar')}}</span></a>

        <a
          :href="element.html.url"
          class="btn btn-sm btn-actionable btn-secondary"
        ><span class="d-inline d-lg-none">{{ $t('product.view')}} </span> <i class="fas fa-lg me-bmt icon-chevron-right"></i></a>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'element-card-audio-card',
  components: {
  },
  props: {
    element: Object,
    pageType: String,
    isExpanded: Boolean,
    options: Object,
  },
  data: function () {
    return {
      isMousedown: false,
      clickFavorite: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,

      // currentMediaType: state => state.site.currentMediaType.id,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,

      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    selectedElementsId: {
      get() {
        return this.$store.state.product.selectedElementsId;
      },
      set(elementsId) {
        console.log('selectedElementsId', elementsId);
        this.$store.dispatch('product/addSelectedElement', elementsId);
      },
    },
    siteUrl: function () {
      return process.env.VUE_APP_SITE_URL;
    },
    showBadge: function () {
      return (this.element.pro || this.element.subscription) ? true : false;
    },
    classProgressStatus: function () {
      let widthElapsed = 0;

      const thisElementId = this.element.id;
      const playingElementId = this.playElementId;
      const isCurrentElement = (thisElementId === playingElementId) ? true : false;

      // console.log(thisElementId);
      // console.log(playingElementId);
      // console.log(isCurrentElement);

      if (isCurrentElement) {
        const timeElapsed = this.timeElapsed;
        const timeTotal = this.timeTotal;
        const widthTotal = this.waveformWidth;

        // console.log(timeElapsed);
        // console.log(timeTotal);
        // console.log(widthTotal);

        widthElapsed = timeElapsed * widthTotal / timeTotal;
      }

      // console.log(widthElapsed);

      const classObject = {
        opacity: 1,
        clip: `rect(0,${widthElapsed}px,3rem,0)`,
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

      const classObject = {
        'me-bmt icon-play sm-play-icon': showPlay,
        'me-bmt icon-pause sm-pause-icon': showPause,
      };

      return classObject;

      // if (showPlay) { return 'play'; }
      // if (showPause) { return 'pause'; }

      // return 'play';
    },
    durationToMinutes() {
      const duration = this.element.media_type_details.duration;

      const minutes = Math.floor(duration / 60);
      const seconds = (`0${Math.floor(duration % 60)}`).slice(-2);

      const minText = this.$i18n.t('search.minutes');
      const secText = this.$i18n.t('search.seconds');

      const durationText = `${minutes} ${minText} ${seconds}${secText}`;

      return durationText;
    },
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.element.currency;
      const currencyInfo = mapCurrencies[currentCurrency];
      if (currencyInfo) {
        return currencyInfo.symbol;
      }
      return 'US$';
    },
    iconStyle() {
      return {
        style: this.element.favorited || this.clickFavorite ? 'fas' : 'far',
        color: this.element.favorited || this.clickFavorite ? 'text-primary' : 'text-secondary',
      };
    },
  },
  mounted() {
    // console.log(this.options);
  },
  methods: {
    selectElement() {
      console.log('selectElement');
      this.$store.dispatch('product/setSelectAllElement', false);
    },
    filterCategories(element) {
      this.$root.$emit('filterCategories', element);
    },
    filterSimilar(element) {
      console.log('filterSimilar', element);
      this.$root.$emit('filterSimilar', element);
    },
    doProgressMouseDown(event, element) {
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
    doProgressMouseUp() {
      console.log('doProgressMouseUp');
      this.isMousedown = false;
    },
    doProgressMouseMove(event, element) {
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
      if (!this.options.enablePlayer) {
        return;
      }
      this.$root.$emit('doVideoPlayerStop');

      this.$root.$emit('clickAudioPlayButton', element);

      // $(this.$el).find('.collapse').collapse('show');
      this.$emit('update:cardPlayStatus', 'playing');

      let waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];

      console.log(waveformWidth);

      if (!waveformWidth) {
        waveformWidth = this.$refs.waveformTotalMobile.offsetWidth;

        this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
      }
    },
    addFavorites(element) {
      // console.log('addFavorites', element);
      if (!this.isMember) {
        this.$root.$emit('showLoginModal');
        return;
      }

      this.clickFavorite = true;
      this.$root.$emit('doAddFavorites', element);
    },
    deleteFavorites(element) {
      // console.log('deleteFavorites', element);
      if (!this.isMember) {
        this.$root.$emit('showLoginModal');
        return;
      }

      this.clickFavorite = true;
      this.$root.$emit('doDeleteFavorites', element);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  line-height: 2;
}

// CIRCLE PLAY BUTTON
.btn-play {
  border-radius: 50%;

  .icon-play {
    margin-left: .075rem;
    margin-right: -.075rem;
  }
}

// FIX WAVEFORM CONTAINER HEIGHT
.waveform-wrapper {
  height: 3rem;
}

// STYLE IMG OF WAVEFORM
.img-waveform {

  // fixed sizing
  width: 100%;
  height: 3rem;

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

// .waveform-control EMPTY DIV SCRUBBER OVERLAY
.waveform-control {
  position:absolute;
  width:100%;
  height:100%;
}

// ADD MARGIN TO BADGES
.badge-pill{
  &:not(:first-child) {
    margin-left: .25rem;
  }
}

// FAVORITES BOUNCE ON CLICK

@keyframes bounceScale {
  0% {
    transform: scale(0);
  }
}

.btn-bounce-icon {
  &.active {
    i {
      animation: bounceScale 0.3s cubic-bezier(0.17, 0.89, 0.32, 1.49);

      &.far {
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
      }
      &.mer {
        font-family: "me-solid";
      }
    }
  }
}

</style>
