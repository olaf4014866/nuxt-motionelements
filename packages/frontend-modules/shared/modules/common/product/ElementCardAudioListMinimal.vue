<template>
  <div class="card-content row p-3">
    <div class="col-6 pr-0">
      <div class="d-flex align-items-center">
        <div class="pr-3">
          <button
            @click="clickAudioPlayButton(element)"
            class="btn btn-play btn-simple-secondary btn-lg sm2-play">
            <i
              :class="classPlayStatus"
              class="fas fa-fw"
            ></i>
          </button>
        </div>
        <div class="col-5 px-0 small">
          <p class="mb-0 text-truncate">
            <a :href="element.html.url">
              <span
                v-if="element.new"
                class="badge badge-pill badge-success small"
              >{{ $t('product.new') }}</span> {{ element.name }}
            </a>
          </p>
          <p class="mb-0 small">
            <a :href="`${siteUrlwithLang}/artists/${element.artist.username}`">{{ element.artist.username }}</a>
          </p>
        </div>
        <div
          @mousedown="doProgressMouseDown($event, element)"
          @mouseup="doProgressMouseUp($event, element)"
          @mousemove="doProgressMouseMove($event, element)"
          class="flex-fill position-relative waveform-wrapper"
        >
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
    <div class="col-6 pl-0">
      <div class="h-100 d-flex align-items-center justify-content-between">
        <div class="small pl-3">
          <div class="list-inline mb-0 small text-muted text-truncated">
            <div v-if="this.showBadge" class="list-inline-item mr-1">

              <!-- IF NOT P.R.O., remove -->
              <span
                v-if="element.pro"
                class="badge badge-pill badge-light mr-1"
              >{{ $t('product.pro') }}</span>

              <!-- IF NOT SUBSCRIPTION, remove -->
              <span
                v-if="element.subscription"
                class="badge badge-pill badge-info mr-1"
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

        <transition>
          <div
            class="div-actionables pr-2 text-nowrap"
          >

            <!-- ADD FAVORITE -->

            <span
              v-if="options.favorites"
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.favorite')"
            >
            <a
              @click.prevent="addFavorites(element)"
              :class="{ active : (element.favorited || this.clickFavorite) }"
              href="#"
              class="btn-actionable btn-bounce-icon px-2"
            >
              <i
                :class="
                  (element.favorited || this.clickFavorite) ? 'fas me-bmt icon-heart-solid text-primary' : 'fal me-bmt icon-heart-light text-secondary'
                "
                class="fa-fw"></i>
            </a>
            </span>


            <!-- SEARCH SIMILAR -->
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.similar')"
              :class="{'invisible' : !element.similarity}"
            >
              <a
                @click="filterSimilar(element)"
                class="btn-actionable text-secondary px-2 track-similar"
              ><i class="fal fa-fw me-bmt icon-search-ai-light"></i></a>
            </span>

            <!-- DOWNLOAD PREVIEW SAMPLE -->
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.download_sample')"
            >
              <a
                :href="`${siteUrl}/download/sample/${element.id}`"
                class="btn-actionable text-secondary px-2"
              ><i class="fal fa-fw me-bmt icon-download"></i></a>
            </span>

            <!-- Product Page -->
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.view')"
            >
              <a
                :href="element.html.url"
                class="btn btn-actionables btn-secondary ml-2"
              ><i class="fas me-bmt icon-chevron-right"></i></a>
            </span>

          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'element-card-audio-list-minimal',
  components: {
  },
  props: {
    element: Object,
    pageType: String,
    cardHoverStatus: Boolean,
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
    siteUrlwithLang: function () {
      const domain = process.env.VUE_APP_SITE_URL;
      const lang = this.$store.getters['site/currentLanguage'];

      let url = `${domain}/${lang}`;
      if (lang === 'en') {
        url = `${domain}`;
      }

      return url;
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
    showBadge: function () {
      return (this.element.pro || this.element.subscription) ? true : false;
    },
  },
  mounted() {
    // set bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    selectElement() {
      console.log('selectElement');
      this.$store.dispatch('product/setSelectAllElement', false);
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
    filterGenres(element) {
      this.$root.$emit('filterGenres', element);
    },
    filterCategories(element) {
      this.$root.$emit('filterCategories', element);
    },
    filterSimilar(element) {
      console.log('filterSimilar', element);
      this.$root.$emit('filterSimilar', element);
    },
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
      if (!this.options.enablePlayer) {
        return;
      }
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

// sizing actionable buttons

.btn-actionable {
  i {
    @include media-breakpoint-up(xxl) {
      font-size: 1.33333em;
    }
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
