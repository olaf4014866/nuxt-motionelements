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
            :href="linkUrl"
            @click.exact="viewProduct"
          >{{ element.name }}</a>
        </p>
        <div class="">
          <div class="list-inline mb-0 small text-muted text-truncated">
            <div v-if="this.showBadge" class="list-inline-item">

              <!-- IF NOT P.R.O., remove -->
              <span
                v-if="isPro"
                class="badge badge-pill badge-light"
              >{{ shortProLabel }}</span>

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
                v-for="(category, key) in displayCategories" :key="key"
              >{{ category.name }}</span>
            </div>


            <!-- DURATION -->
            <div class="list-inline-item">
              {{ this.durationToMinutes }}
            </div>

            <!-- PRICE -->
            <div v-if="isFree"
                 class="list-inline-item"
            >
              {{ $t('product.free') }}
            </div>
            <div v-else-if="price"
                 class="list-inline-item"
            >
              {{ price.getSymbol() + ' ' + price.toFormat('0,0')}}
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
          :href="linkUrl"
          @click.exact="viewProduct"
          class="btn btn-sm btn-actionable btn-secondary"
        ><span class="d-inline d-lg-none">{{ $t('product.view')}} </span> <i class="fas fa-lg me-bmt icon-chevron-right"></i></a>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';

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
      isLoggedIn: state => state.user.isLoggedIn,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,

      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    details() {
      return _.get(this.element, 'mediaTypeDetails', _.get(this.element, 'media_type_details'));
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
    siteUrl: function () {
      return process.env.VUE_APP_SITE_URL;
    },
    showBadge: function () {
      return this.isPro || this.element.subscription;
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
    price() {
      const price = _.get(this.element, 'price');

      if (price > 0) {
        return Money({ amount: price, currency: this.element.currency });
      }

      return null;
    },
    displayCategories() {
      let category;

      if (this.$route.query.genre) {
        category = this.element.categories.find(x => x.id === this.$route.query.genre);
        if (category) {
          return [category];
        }
      }

      if (this.$route.query.category) {
        category = this.element.categories.find(x => x.id === this.$route.query.category);
        if (category) {
          return [category];
        }
      }

      category = this.element.categories.find(x => x.type === 'genre');

      if (category) {
        return [category];
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
    // console.log(this.options);
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
    selectElement() {
      console.log('selectElement');
      this.$store.dispatch('product/setSelectAllElement', false);
    },
    // filterCategories(element) {
    //   this.$root.$emit('filterCategories', element);
    // },
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
