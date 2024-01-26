<template>
  <div
    :class="`card-${currentMediaType}`"
    class="card card-audio border-0 d-flex mb-3 flex-row"
  >

    <!-- DESKTOP LAYOUT -->
    <div class="p-3 bg-white rounded overflow-hidden flex-grow-1">
      <div class="row">
        <div class="col-6 pr-0">
          <div class="d-flex align-items-center">
            <div class="pr-3">
              <button
                @click="clickAudioPlayButton(element)"
                class="btn btn-simple-secondary btn-lg sm2-play">
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
                <a :href="$siteUrl(`/artists/${element.artist.username}`).www().url()">{{ element.artist.username }}</a>
              </p>
            </div>
            <div
              @mousedown="doProgressMouseDown($event, element)"
              @mouseup="doProgressMouseUp($event, element)"
              @mousemove="doProgressMouseMove($event, element)"
              class="flex-fill position-relative waveform-div"
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
          <div class="h-100 d-flex align-items-center">
            <div class="flex-fill h-100 d-flex align-items-center">
              <div class="col-5 col-xl-4 col-xxl-4 px-0 text-right small text-nowrap">

                <!-- IF NOT P.R.O., add class .invisible -->
                <span
                  :class="{ 'invisible' : !element.pro}"
                  class="badge badge-pill badge-light ml-1"
                >{{ $t('product.pro') }}</span>

                <!-- IF NOT SUBSCRIPTION, add class .invisible -->
                <span
                  :class="{ 'invisible' : !element.subscription}"
                  class="badge badge-pill badge-info ml-1"
                ><i class="fas fa-fw me-bmt icon-lightning"></i></span>

              </div>
              <div class="col pr-0">

                <!-- CATEGORIES & GENRES -->
                <div class="list-inline mb-0 small">

                  <a
                    @click.prevent="filterGenres(element)"
                    v-for="genre in element.genres" :key="genre.id"
                    href="#"
                    class="list-inline-item small"
                  >{{genre.name}}</a>

                  <a
                    @click.prevent="filterCategories(element)"
                    v-for="category in element.categories.slice(0,1)" :key="category.id"
                    href="#"
                    class="list-inline-item small"
                  >{{category.name}}</a>

                </div>

                <ul class="list-inline mb-0 small text-muted">

                  <!-- DURATION -->
                  <li class="list-inline-item small"><i class="far me-bmt icon-clock"></i> {{ this.durationToMinutes }}</li>
                  <!-- DURATION -->

                  <!-- PRICE -->
                  <li
                    v-show="element.price && element.price !== false"
                    class="list-inline-item small"
                  >
                    {{ this.currencySymbol }} {{ element.price }}
                  </li>
                  <li
                    v-show="element.free === true"
                    class="list-inline-item small"
                  >
                    {{ $t('product.free') }}
                  </li>
                  <!-- PRICE -->

                  <!-- TEMPO -->
                  <li class="list-inline-item small">{{ element.media_type_details.bpm }} {{ $t('product.bpm') }}</li>
                  <!-- TEMPO -->

                  <!-- LOOP OR NO LOOP -->
                  <li class="list-inline-item small">{{ element.media_type_details.loop ? $t('product.loop') : $t('product.no_loop') }}</li>
                  <!-- LOOP OR NO LOOP -->

                </ul>

              </div>
            </div>
            <div class="col-actionables pr-2 text-nowrap">

              <!-- ADD FAVORITE -->
              <span
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('product.favorite')"
              >
              <a
                @click.prevent="addFavorites(element)"
                :class="{ active : (element.favorited || this.clickFavorite) }"
                href="#"
                class="btn-actionables btn-bounce-icon px-2"
              >
                <!-- <i class="fal fa-lg fa-fw me-bmt icon-heart-light"></i> -->
                <i
                  :class="(element.favorited || this.clickFavorite) ? 'fas me-bmt icon-heart-solid text-primary' : 'fal me-bmt icon-heart-light text-secondary'"
                  class="fa-lg fa-fw"></i>
              </a>
              </span>

              <!-- SEARCH SIMILAR -->
              <span
                v-if="element.similarity"
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('product.similar')"
              >
                <a
                  @click="filterSimilar(element)"
                  class="btn-actionables text-secondary px-2 track-similar"
                ><i class="fal fa-lg fa-fw me-bmt icon-search-ai-light"></i></a>
              </span>

              <!-- DOWNLOAD PREVIEW SAMPLE -->
              <span
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('product.download_sample')"
              >
                <a
                  :href="$siteUrl(`/download/sample/${element.id}`).www().url()"
                  class="btn-actionables text-secondary px-2"
                ><i class="fal fa-lg fa-fw me-bmt icon-download"></i></a>
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
                ><i class="fas fa-lg me-bmt icon-chevron-right"></i></a>
              </span>

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
  name: 'favorites-element-card-audio-desktop',
  components: {
  },
  props: {
    element: Object,
  },
  data() {
    return {
      isMousedown: false,
      clickFavorite: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,

      currentMediaType: state => state.site.currentMediaType.id,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,

      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    classProgressStatus() {
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
    classPlayStatus() {
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
        'me-bmt icon-play': showPlay,
        'me-bmt icon-pause': showPause,
      };

      return classObject;
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
  },
  mounted() {
    // set bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    filterGenres(element) {
      this.$root.$emit('filterGenres', element);
    },
    filterCategories(element) {
      this.$root.$emit('filterCategories', element);
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
      this.$root.$emit('clickAudioPlayButton', element);

      let waveformWidth = this.$store.getters['audioPlayer/waveformWidth'];
      if (!waveformWidth) {
        waveformWidth = this.$refs.waveformTotalDesktop.offsetWidth;
        this.$store.dispatch('audioPlayer/setWaveformWidth', waveformWidth);
      }
    },
    addFavorites(element) {
      if (!this.isMember) {
        this.$root.$emit('showLoginModal');
        return;
      }

      this.clickFavorite = true;
      this.$root.$emit('doAddFavorites', element);
    },
    filterSimilar(element) {
      const filter = this.$store.getters['search/allSearchFilter'];
      filter.similar = element.id;
      filter.page = 1;
      filter.searchKeyword = '';

      const filterBar = this.$store.getters['search/allSearchFilterBar'];
      filterBar.similar.status = true;
      filterBar.similar.mode = 'element';
      filterBar.similar.id = decodeURIComponent(element.id);
      filterBar.similar.imageFilename = '';
      filterBar.similar.imageUrl = '';

      // const currentMediaType = this.$store.getters['site/currentMediaType'];
      // const params = {
      //   mediaType: currentMediaType,
      //   id: element.id,
      // };

      // this.$store.dispatch('search/getElementInfo', params)
      //   .then((result) => {
      //     const elementImageUrl = result.data.data.previews.jpg.url;
      //     filterBar.similar.imageUrl = decodeURIComponent(elementImageUrl);
      //   });

      this.$store.dispatch('search/setFilter', filter);

      this.$root.$emit('doSearch', filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-audio {
  // TEXT LINE HEIGHT
  line-height: 2;

  // SHADOWS
  @include border-radius;
  transition: box-shadow 0.2s ease-in-out;
  @include box-shadow($box-shadow-sm);

  &:hover {
    @include box-shadow($box-shadow);
  }

  // HIDE ACTIONABLES UNTIL HOVER
  .col-actionables {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    .col-actionables {
      opacity: 1;
    }
  }
}

// CIRCLE PLAY BUTTON
.ws-play, .sm2-play {
  border-radius: 50%;

  .fa-play, .me-bmt.icon-play {
    margin-left: .075rem;
    margin-right: -.075rem;
  }
}

// FIX WAVEFORM TO 3rem HEIGHT
.waveform-div {
  &, .img-waveform {
    height: 3rem;
  }
}

// STYLE IMG OF WAVEFORM
.img-waveform {
  width: 100%;
  height: 3rem;
  filter: grayscale(100%);
  position: absolute;
  top: 0;
  left: 0;
  opacity: .3333;

  &.elapsed {
    opacity: 1;
    // filter: grayscale(0%);
  }
}

// .waveform-control EMPTY DIV SCRUBBER OVERLAY
.waveform-control {
  position:absolute;
  width:100%;
  height:100%;
}

// ACTIONABLES
.btn-actionables {
  cursor: pointer;
}

// MAKE ACTIONABLE BUTTONS SMALLER ON MOBILE
.card-audio {
  .btn-actionables {
    @media (min-width: 0) and (max-width:1399.9999px) {
      font-size: .75em
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

// .card-header {
//   cursor: move;
// }

</style>
