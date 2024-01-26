<template>
  <div
    class="card-content"
    @mouseenter="doInitVideoPlayer(element)"
  >
    <div
      class="card-img-top"
      :class="`${imageBackgroundColor}`"
    >
      <img
        v-lazy="element.thumbnails.jpg.url"
        :alt="element.name"
        onerror="this.onerror=null;this.src='https://static.moele.me/img/me-thumb-placeholder.180718.png';"
      >

      <div
        v-if="showStaticPreview"
        :id="'player-'+element.id"
        :style="'background-image:url('+element.thumbnails.jpg.url+')'"
        class="fp-full no-volume fp-me fp-me-thumb is-splash"
      ></div>
    </div>

    <div
      v-if="isCollection && !isAudio && element.thumbnails.jpgs"
      class="card-img-row row m-0 position-relative overflow-hidden"
    >
      <div
        class="col-4 p-0"
        :class="`${imageBackgroundColor}`"
        v-for="i in 3"
        :key="`collection-preview-${i}`"
      >
        <div class="card-img-wrapper">
            <img
              v-if="element.thumbnails.jpgs[i]"
              class="card-img-sm"
              v-lazy="element.thumbnails.jpgs[i].url"
              :alt="`${element.name} Bundle - ${i}`"
              onerror="this.onerror=null;this.src='https://static.moele.me/img/me-thumb-placeholder.180718.png';"
            >
        </div>
      </div>
    </div>

    <div class="div-metadata d-flex small px-2">
      <div class="list-inline mb-0 small text-truncate text-nowrap">

        <!-- MEDIATYPE BADGE -->
        <div
          v-if="options.showMediaTypeBadge && element.object === 'element'"
          class="list-inline-item"
        >
          <span
            @mouseenter="tooltipShow"
            :title="$term('mediaType', element.media_type).text()"
            class="badge badge-pill badge-light"
          >
            <i
              :class="elementTypeIcon"
              class="fas me-bmt"
            >
            </i>
          </span>
        </div>
        <!-- MEDIATYPE BADGE -->

        <!-- MEDIATYPE BADGE FOR COLLECTION -->
        <div
          v-if="element.object === 'collection'"
          class="list-inline-item"
        >
          <span class="badge badge-pill badge-light">
            <i class="fas fa-fw me-bmt icon-collection"></i>&nbsp;&nbsp;|&nbsp;&nbsp;
            {{ element.items.total_count }}&nbsp;

            <!--
            <i
              :class="collectionIcon"
              class="fas me-bmt"
            ></i>
            -->
          </span>
        </div>
        <!-- MEDIATYPE BADGE FOR COLLECTION -->

        <!-- EXCLUSIVE BADGE -->
        <div
          v-if="element.exclusive"
          class="list-inline-item"
        >
          <span
            class="badge badge-pill badge-primary"
            @mouseover="hoverExclusive()"
            @mouseout="hoverExclusive(element)"
          >
            <font-awesome-icon
              :icon="['fas','gem']"
            ></font-awesome-icon>
          </span>
        </div>
        <!-- EXCLUSIVE BADGE -->

        <!-- SUBSCRIPTION BADGE -->
        <div
          v-if="element.subscription"
          class="list-inline-item"
        >
          <span
            class="badge badge-pill badge-info"
            @mouseover="hoverSubscription()"
            @mouseout="hoverSubscription(element)"
          >
            <i class="fas fa-fw me-bmt icon-lightning"></i>
          </span>
        </div>
        <!-- SUBSCRIPTION BADGE -->

        <!-- NEW BADGE -->
        <div
          v-if="element.new"
          class="list-inline-item">
          <span class="badge badge-pill badge-success">{{ $t('product.new') }}</span>
        </div>
        <!-- NEW BADGE -->

        <!-- CATEGORY -->
        <!-- Include only ONE category even if there are 3, should link to apply category filter or category page (if too difficult) -->
        <!--
        <a
          @click.prevent="filterCategories(element)"
          href="#"
          class="list-inline-item list-link-category"
        >{{ categoryName }}</a>
        -->
        <div v-if="categoryName" class="list-inline-item">
          <span>{{ categoryName }}</span>
        </div>

        <!-- PRICE -->
        <div class="list-inline-item">
          <span
            v-show="element.price !== false"
            class="text-muted"
          >
            {{ currencySymbol }} {{element.price}}
          </span>
          <span
            v-show="element.free === true"
            class="text-muted"
          >
            {{ $t('product.free') }}
          </span>
        </div>
        <!-- PRICE -->

      </div>
    </div>

    <div v-if="isExpanded" class="div-title d-flex flex-column flex-sm-row small px-2 align-items-sm-center">
      <a
        :href="element.html.url"
        :title="element.name"
        class="element-title-link text-truncate mr-2 flex-fill font-weight-bold"
      >
        <!-- {{ this.title }} -->
        {{ titleTruncate }}
      </a>

      <div class="div-actionables text-nowrap small d-flex flex-row-reverse justify-content-between align-items-center mt-2 mt-sm-0">
        <!-- BUTTON VIEW ELEMENT -->
        <a
          @mouseover="hoverView()"
          @mouseout="hoverView(element)"
          :href="element.html.url"
          class="btn btn-sm btn-actionables btn-secondary ml-2 border-0"
        >
          <span class="actionables-label">{{ $t('product.view') }} </span><i class="fas fa-lg me-bmt icon-chevron-right"></i>
        </a>

        <!-- BUTTON VISUALSEARCH -->
        <a
          v-if="element.similarity"
          @click.prevent="filterSimilar(element)"
          @mouseover="hoverSimilar()"
          @mouseout="hoverSimilar(element)"
          href="#"
          class="d-inline-block btn-actionables text-secondary px-0 px-sm-2 track-similar"
        >
          <i class="far fa-lg fa-fw me-bmt icon-search-ai-regular"></i><span class="actionables-label"> {{ $t('product.similar') }}</span>
        </a>
        <!-- BUTTON VISUALSEARCH -->

        <!-- BUTTON FAVORITE -->
        <a
          v-if="options.favorites"
          @click.prevent="addFavorites(element)"
          :class="{ active : (element.favorited || this.clickFavorite) }"
          @mouseover="hoverFavorites()"
          @mouseout="hoverFavorites(element)"
          href="#"
          class="d-inline-block btn-actionables btn-bounce-icon px-0 px-sm-2 track-favorites"
        >
          <!-- <i class="far fa-lg fa-fw mer icon-heart"></i> -->
          <i
            :class="(element.favorited || this.clickFavorite) ? 'fas me-bmt icon-heart-solid text-primary' : 'far me-bmt icon-heart-regular text-secondary'"
            class="fa-lg fa-fw"
          ></i><span class="actionables-label"> {{ $t('product.favorite') }}</span>
        </a>
        <!-- BUTTON FAVORITE -->

      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'visual-element-card',
  props: {
    element: Object,
    pageType: String,
    cardPlayStatus: String,
    isExpanded: Boolean,
    options: Object,
  },
  data: function () {
    return {
      title: this.element.name,
      clickFavorite: false,
      whiteBg: [
        'video',
        'video_live',
        'animation',
        'video_vr',
        '3d_model',
        'ae_template',
        'ae_preset',
        'motion_template',
        'pr_template',
        'pr_preset',
        'mg_template',
        'music',
        'sfx',
        'lottie',
        'gif',
        'photo',
        'vector',
      ],
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
    }),
    elementTypeIcon() {
      const elementType = (this.element.object === 'collection') ? this.element.object : this.element.media_type;
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];

      let elementTypeDash = _.replace(elementType, '_', '-');

      const info = _.find(mapSupportedMediaTypes, { id: elementTypeDash });

      return info.iconClassDefault;
    },
    collectionIcon() {
      const elementType = (this.element.object === 'collection') ? this.element.object : this.element.media_type;
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];

      let elementTypeDash = _.replace(elementType, '_', '-');

      const info = _.find(mapSupportedMediaTypes, { id: elementTypeDash });

      return info.iconClassDefault;
    },
    currentElementType() {
      const elementType = (this.element.object === 'collection') ? this.element.object : this.element.media_type;
      return elementType;
    },
    // selectedElementsId: {
    //   get() {
    //     return this.$store.state.product.selectedElementsId;
    //   },
    //   set(elementsId) {
    //     console.log('selectedElementsId', elementsId);
    //     this.$store.dispatch('product/addSelectedElement', elementsId);
    //   },
    // },
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.element.currency;
      const currencyInfo = mapCurrencies[currentCurrency];
      if (currencyInfo) {
        return currencyInfo.symbol;
      }
      return 'US$';
    },
    imageBackgroundColor() {
      return this.whiteBg.includes(this.currentElementType) ? 'bg-white' : 'bg-black';
    },
    titleTruncate() {
      const title = this.title;

      const dots = (title.length > 40) ? '...' : '';

      return title.substring(0, 40)+dots;
    },
    categoryName() {
      let name = '';
      // console.log(this.element.categories);
      if (_.size(this.element.categories)) {
        name = this.element.categories[0].name;
      }
      return name;
    },
    iconStyle() {
      return {
        style: this.element.favorited || this.clickFavorite ? 'fas' : 'far',
        color: this.element.favorited || this.clickFavorite ? 'text-primary' : 'text-secondary',
      };
    },
    showStaticPreview() {
      let status = true;

      const imageList = [
        '3d_model',
        'image',
        // 'photo',
        // 'vector',
        // 'gif',
        // 'collection',
      ];

      if (imageList.indexOf(this.currentElementType) >= 0) {
        status = false;
      }

      return status;
      // return !(this.currentElementType === 'image' || this.currentMediaType === '3d-model');
    },
    isCollection () {
      return (this.element.object === 'collection') ? true : false;
    },
    isAudio() {
      let status = false;
      const audioList = [
        'music',
        'sfx',
      ];

      if (audioList.indexOf(this.currentElementType) >= 0) {
        status = true;
      }

      return status;
    },
  },
  mounted() {
  },
  created() {
  },
  methods: {
    // isVideo() {
    //   const currentTab = this.$store.getters['product/currentTab'];
    //   // console.log('isVideo : ', currentTab);

    //   let status = true;
    //   const imageList = [
    //     '3d',
    //     'image',
    //     'collection',
    //   ];

    //   if (imageList.indexOf(currentTab) >= 0) {
    //     status = false;
    //   }

    //   return status;
    // },
    // selectElement() {
    //   console.log('selectElement');
    //   this.$store.dispatch('product/setSelectAllElement', false);
    // },
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      let status = false;
      if (currentWindowWidth < 1200) {
        status = true;
      }

      return status;
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

      this.clickFavorite = false;
      this.$root.$emit('doDeleteFavorites', element);
    },
    filterSimilar(element) {
      console.log('filterSimilar', element);
      this.$root.$emit('filterSimilar', element);
    },
    // filterCategories() {
    //   // console.log(element);
    //   // this.$root.$emit('filterCategories', element);
    // },
    hoverSubscription(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.available_for_subscription');
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSubscription - isEnter', isMouseEnter, element);
    },
    hoverExclusive(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.exclusive');
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSubscription - isEnter', isMouseEnter, element);
    },
    hoverFavorites(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.favorite');
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverFavorites - isEnter', isMouseEnter, element);
    },
    hoverSimilar(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.similar');
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    hoverView(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.view');
      } else {
        this.title = this.element.name;
      }
      // console.log('hoverView - isEnter', isMouseEnter, element);
    },
    tooltipShow(event) {
      const $target = $(event.target);
      const text = _.startCase(event.target.title);

      if (!text) {
        return;
      }

      $target
        .attr('data-original-title', text)
        .tooltip({
          container: 'body',
          placement: 'bottom',
        })
        .tooltip('show');
    },
    doInitVideoPlayer(element) {
      const isCollection = (element.object === 'collection') ? true : false;
      if (isCollection) {
        return;
      }

      // don't init when is image
      const imageList = [
        '3d_model',
        'image',
        'photo',
        'vector',
        'gif',
      ];
      const isImageMediaType = (imageList.indexOf(element.media_type) >= 0) ? true : false;
      if (isImageMediaType) {
        return;
      }

      const hasPreview = this.element.previews ? true : false;
      if (!hasPreview) {
        // console.log('doInitVideoPlayer : no preview ', element);
        return;
      }

      let hasVideoFile = (_.size(this.element.previews.mp4)) ? true : false;
      let hasVideoURL = (this.element.previews.mp4.url) ? true : false;

      if (!hasVideoFile || !hasVideoURL) {
        // console.log('doInitVideoPlayer : no video ', element);
        return;
      }

      if (!this.options.enablePlayer) {
        return;
      }

      const container = document.getElementById(`player-${element.id}`);
      const $card = $(this.$el);

      if (this.isMobileLayout()) {
        $card.addClass('is-playing');
        this.$emit('update:cardPlayStatus', 'playing');
      }

      let videoUrl = this.element.previews.mp4.url;
      let webmUrl = this.element.previews.webm.url;

      if (_.has(this.element, 'thumbnails.mp4.url')) {
        videoUrl = this.element.thumbnails.mp4.url;
      }

      if (_.has(this.element, 'thumbnails.webm.url')) {
        webmUrl = this.element.thumbnails.webm.url;
      }

      const api = flowplayer(container, {
        engine: 'html5',
        key: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? process.env.VUE_APP_FLOWPLAYER_KEY : '',
        debug: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? false : true,
        aspectRatio: '16:9',
        preload: 'auto',
        autoplay: true,
        splash: true,
        loop: true,
        clip: {
          sources: [
            {
              type: 'video/mp4',
              src: videoUrl,
            },
            {
              type: 'video/webm',
              src: webmUrl,
            },
          ],
        },
      });

      // Add class to adjust the badge-actionable area for Timeline clearance
      api
        .on('resume', () => {
          $card.addClass('is-playing has-played');
          this.$emit('update:cardPlayStatus', 'playing');

          this.$root.$emit('doAudioPlayerStop');
        })
        .on('unload', () => {
          $card.removeClass('is-playing');
          this.$emit('update:cardPlayStatus', 'paused');
        });
    },

  },
};
</script>

<style lang="scss" scoped>
// SIZING .card-img-top BASED ON ASPECT RATIO OF CARD (in ProductWrapper.vue)

.card-16-9 {
  .card-img-top, .card-img-wrapper {
    padding-bottom: 56.25%;
  }
}

.card-9-16,
.card-1-1 {
  .card-img-top, .card-img-wrapper {
    padding-bottom: 100%;
  }
}

// POSITIONING OF IMAGE IN .card-img-top

.card-img-top, .card-img-wrapper {
  position:relative;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    transform: translate(-50%,-50%);
  }
}

// POSITIONING OF FLOWPLAYER THUMBNAIL
.fp-me-thumb {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

// METADATA

.div-metadata {
  line-height: 1rem;
  padding-top: 6px;
  padding-bottom: 6px;
  .list-inline {
    .list-inline-item {
      margin-right: map-get($spacers,1);
    }
  }
}
.div-title {
  padding-bottom: 6px;
}

//
// ACTIONABLES
//

// HIDE LABELS FOR ACTIONABLES FOR NON-TEMPLATE THUMBNAILS ON MOBILE

.actionables-label {
  display: none;

  @media (max-width: map-get(map-get($card-breakpoints,"sm"),2) - 0.05px) {
    display: inline;
  }

  .card-wrapper-lg & {
    @media (max-width: map-get(map-get($card-breakpoints,"lg"),2) - 0.05px) {
      display: inline;
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

// BOUNCE HEART ICON
@keyframes bounceScale {
  0% {
    transform: scale(0);
  }
}


</style>
