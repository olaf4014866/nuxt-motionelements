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
            <a :href="linkUrl"
               @click.exact="viewProduct"
            >
              <span
                v-if="element.new"
                class="badge badge-pill badge-success small"
              >{{ $t('product.new') }}</span> {{ element.name }}
            </a>
          </p>
          <p class="mb-0 small">
            <a :href="$link(`/artists/${element.artist.username}`).url()">
              {{ element.artist.username }}
            </a>
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
      <div class="h-100 d-flex align-items-center">
        <div class="flex-fill h-100 d-flex align-items-center">
          <div class="col-5 col-xl-4 col-xxl-4 px-0 text-right small text-nowrap">

            <!-- IF NOT P.R.O., add class .invisible -->
            <span
              :class="{ 'invisible' : !isPro}"
              class="badge badge-pill badge-light"
            >{{ shortProLabel }}</span>

            <!-- IF NOT SUBSCRIPTION, add class .invisible -->
            <span
              :class="{ 'invisible' : !element.subscription}"
              class="badge badge-pill badge-info"
            ><i class="fas fa-fw me-bmt icon-lightning"></i></span>

          </div>
          <div class="col pr-0">

            <!-- CATEGORIES & GENRES -->
            <div class="list-inline mb-0 small">

              <a
                v-for="category in displayGenres" :key="category.id"
                :href="$link(searchBaseUrl).param('genre', category.id).url()"
                @click.exact="viewCategory($event)"
                class="list-inline-item small"
              >{{category.name}}</a>
              <!--              @click.prevent="filterGenres(element)"-->

              <a
                v-for="category in displayCategories" :key="category.id"
                :href="$link(searchBaseUrl).param('category', category.id).url()"
                @click.exact="viewCategory($event)"
                class="list-inline-item small"
              >{{category.name}}</a>

            </div>

            <ul class="list-inline mb-0 small text-muted">

              <!-- DURATION -->
              <li class="list-inline-item small">
                {{ this.durationToMinutes }}
              </li>
              <!-- DURATION -->

              <!-- PRICE -->
              <li v-if="isFree"
                   class="list-inline-item small"
              >
                {{ $t('product.free') }}
              </li>
              <li v-else-if="price"
                   class="list-inline-item small"
              >
                {{ price.getSymbol() + ' ' + price.toFormat('0,0')}}
              </li>
              <!-- PRICE -->

              <!-- TEMPO -->
              <li v-if="isMusic && bpm"
                  class="list-inline-item small">
                {{ bpm }} {{ $t('product.bpm') }}
              </li>
              <!-- TEMPO -->

              <!-- LOOP OR NO LOOP -->
              <li v-if="isMusic"
                  class="list-inline-item small">
                {{ details.loop ? $t('product.loop') : $t('product.no_loop') }}
              </li>
              <!-- LOOP OR NO LOOP -->

            </ul>

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
                class="fa-lg fa-fw"></i>
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
              ><i class="fal fa-lg fa-fw me-bmt icon-search-ai-light"></i></a>
            </span>

            <!-- DOWNLOAD PREVIEW SAMPLE -->
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.download_sample')"
            >
              <a
                :href="$link(`/download/sample/${element.id}`).url()"
                class="btn-actionable text-secondary px-2"
              ><i class="fal fa-lg fa-fw me-bmt icon-download"></i></a>
            </span>

            <!-- Product Page -->
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('product.view')"
            >
              <a
                :href="linkUrl"
                @click.exact="viewProduct"
                class="btn btn-actionables btn-secondary ml-2"
              ><i class="fas fa-lg me-bmt icon-chevron-right"></i></a>
            </span>

          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';

export default {
  name: 'element-card-audio-list',
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
      isLoggedIn: state => state.user.isLoggedIn,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,

      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    mediaType() {
      return _.get(this.element, 'mediaType', _.get(this.element, 'media_type'));
    },
    searchBaseUrl() {
      return `/search/${this.mediaType.replace('_', '-')}`;
    },
    isMusic() {
      return this.mediaType === 'music';
    },
    details() {
      return _.get(this.element, 'mediaTypeDetails', _.get(this.element, 'media_type_details'));
      // return this.element.mediaTypeDetails;
    },
    selectedElementsId: {
      get() {
        return this.$store.state.product.selectedElementsId;
      },
      set(elementsId) {
        console.log('selectedElementsId', elementsId);
        this.$store.dispatch('product/addSelectedElement', elementsId);
      },
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
      const duration = this.details.duration;

      return duration ? this.$tools.secondToMinutes(duration) : '';

      // const minutes = Math.floor(duration / 60);
      // const seconds = (`0${Math.floor(duration % 60)}`).slice(-2);
      //
      // const minText = this.$i18n.t('search.minutes');
      // const secText = this.$i18n.t('search.seconds');
      //
      // const durationText = `${minutes} ${minText} ${seconds}${secText}`;
      //
      // return durationText;
    },
    isPro() {
      return _.get(this.element, 'usageRights.pro') === true;
    },
    shortProLabel() {
      // use P.R.O. if translation is longer than 6 chars
      const label = this.$i18n.t('product.pro');
      return label.length > 6 ? 'P.R.O.' : label;
    },
    isFree() {
      return _.get(this.element, 'free') === true;
    },
    bpm() {
      return _.get(this.details, 'bpm', null);
    },
    price() {
      const price = _.get(this.element, 'price');

      if (price > 0) {
        return Money({ amount: price, currency: this.element.currency });
      }

      return null;
    },
    displayGenres() {
      let category;

      if (this.$route.query.genre) {
        category = this.element.categories.find(x => x.id === this.$route.query.genre);
        if (category) {
          return [category];
        }
      }

      category = this.element.categories.find(x => x.type === 'genre');

      return category ? [category] : [];
    },
    displayCategories() {
      let category;

      if (this.$route.query.category) {
        category = this.element.categories.find(x => x.id === this.$route.query.category);
        if (category) {
          return [category];
        }
      }

      category = this.element.categories.find(x => x.type === 'category');

      return category ? [category] : [];
    },
    iconStyle() {
      return {
        style: this.element.favorited || this.clickFavorite ? 'fas' : 'far',
        color: this.element.favorited || this.clickFavorite ? 'text-primary' : 'text-secondary',
      };
    },
    linkUrl() {
      return _.get(this.options, 'linkUrl') || this.element.html.url;
    },
  },
  mounted() {
    // set bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    viewProduct(event) {
      // check to show link or use vue-router
      if (_.get(this.options, 'linkUrl')) {
        // window.location.href = this.options.linkUrl;
        return;
      }

      const isSearchRepo = process.env.VUE_APP_PROJECT_NAME && process.env.VUE_APP_PROJECT_NAME === 'frontend-search';

      // if (process.env.VUE_APP_ENV !== 'production' && isSearchRepo) {
      if (isSearchRepo) {
        // open new window: windows use ctrl key, mac use command=meta key
        // change use preventDefault to provide open tab in background function
        // if (window.event.ctrlKey || window.event.metaKey) {
        //   console.log('control key event');
        //   // window.open(this.$link(this.element.html.url).url());
        //   return;
        // }
        event.preventDefault();
        this.$router.push({
          path: this.$link(this.element.html.url).fullPath(),
        });
        // return false;
      }

      // window.location.href = this.element.html.url;
    },
    viewCategory(event) {
      const isSearchRepo = process.env.VUE_APP_PROJECT_NAME && process.env.VUE_APP_PROJECT_NAME === 'frontend-search';

      // if (process.env.VUE_APP_ENV !== 'production' && isSearchRepo) {
      if (isSearchRepo) {
        // open new window: windows use ctrl key, mac use command=meta key
        // change use preventDefault to provide open tab in background function
        // if (window.event.ctrlKey || window.event.metaKey) {
        //   console.log('control key event');
        //   // window.open(this.$link(this.element.html.url).url());
        //   return;
        // }
        event.preventDefault();
        this.$router.push({
          path: this.$link(event.target.href).fullPath(),
        });
        // return false;
      }

      // window.location.href = this.element.html.url;
    },
    selectElement() {
      console.log('selectElement');
      this.$store.dispatch('product/setSelectAllElement', false);
    },
    addFavorites(element) {
      if (!this.isLoggedIn) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      this.clickFavorite = true;
      this.$bus.$emit('product-favorited', element);
    },
    deleteFavorites(element) {
      if (!this.isLoggedIn) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      this.clickFavorite = false;
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

// CUSTOMIZED BADGE PILLS

.badge-pill {
  padding: .25rem .375rem;
  font-size: .5rem;

  &:not(:last-child) {
    margin-right: 2px;
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
