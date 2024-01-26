<template>
  <div
    @mouseenter="doInitVideoPlayer(element)"
    class="card-wrapper card-16-9 d-inline-block mb-3"
    :class="`card-${currentMediaType} card-${pageType}`"
  >
    <div class="card card-element border-0 bg-white rounded overflow-hidden">
      <div class="card-img-top">
        <div class="card-img-wrapper">
          <img
            :src="element.thumbnails.jpg.url"
            :alt="element.name"
            onerror="this.onerror=null;this.src='https://static.motionelements.com/img/me-thumb-placeholder.180718.png';"
          >

          <div
            v-if="hasVideo"
            :id="'player-'+element.id"
            :style="'background-image:url('+element.thumbnails.jpg.url+')'"
            class="fp-full no-volume fp-me fp-me-thumb is-splash"
          ></div>
        </div>
      </div>

      <div
        class="card-body"
        :class="hasMetadata ? 'p-2' : ' p-0'"
      >
        <div
          v-if="hasMetadata"
          class="div-metadata d-flex small"
        >
          <div class="list-inline mb-0 small text-truncate text-nowrap">

            <div
              v-if="element.subscription"
              class="list-inline-item">
              <span
                class="badge badge-pill badge-info"
                @mouseover="hoverSubscription()"
                @mouseout="hoverSubscription(element)"
              >
                <i class="fas fa-fw me-bmt icon-lightning"></i>
              </span>
            </div>

            <div
              v-if="element.new"
              class="list-inline-item">
              <span class="badge badge-pill badge-success">{{ $t('product.new') }}</span>
            </div>

            <div class="list-inline-item">
              <span>{{ categoryName }}</span>
            </div>

            <div class="list-inline-item">
              <span
                v-show="element.price"
                class="text-muted"
              >
                {{ currencySymbol }} {{ element.price }}
              </span>
              <span
                v-show="element.free === true"
                class="text-muted"
              >
                {{ $t('product.free') }}
              </span>
            </div>

          </div>
        </div>
        <div
          :class="!hasMetadata ? 'px-2 py-1' : ''"
          class="div-title small"
        >
          <div class="d-block d-lg-flex align-items-center justify-content-between w-100">
            <a
              :href="element.html.url"
              :title="element.name"
              class="element-title-link text-truncate pr-2 flex-fill font-weight-bold"
            >
              {{ this.title }}
            </a>
            <div class="div-actionables text-nowrap small">

              <span
                data-toggle="tooltip"
                data-placement="top"
                :title="$t('product.favorite')"
              >
              <a
                @click.prevent="addFavorites(element)"
                :class="{ active : (element.favorited || this.clickFavorite) }"
                @mouseover="hoverFavorites()"
                @mouseout="hoverFavorites(element)"
                href="#"
                data-toggle="tooltip"
                class="d-inline-block btn-actionables btn-bounce-icon px-0 px-lg-2"
              >
                <i
                  :class="(element.favorited || this.clickFavorite) ? 'fas me-bmt icon-heart-solid text-primary' : 'far me-bmt icon-heart-regular text-secondary'"
                  class="fa-lg fa-fw"></i><span class="actionables-label"> {{ $t('product.favorite') }}</span>
              </a>
              </span>

              <a
                v-if="element.similarity"
                @click.prevent="filterSimilar(element)"
                @mouseover="hoverSimilar()"
                @mouseout="hoverSimilar(element)"
                href="#"
                class="d-inline-block btn-actionables text-secondary px-0 px-lg-2 track-similar"
              >
                <i class="far fa-lg fa-fw me-bmt icon-search-ai-regular"></i><span class="actionables-label"> {{ $t('product.similar') }}</span>
              </a>

              <a
                @mouseover="hoverView()"
                @mouseout="hoverView(element)"
                :href="element.html.url"
                class="btn btn-sm btn-actionables btn-secondary ml-2 border-0"
              >
                <span class="actionables-label">{{ $t('product.view') }} </span><i class="fas fa-lg me-bmt icon-chevron-right"></i>
              </a>
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
  name: 'landing-element-card',
  props: {
    element: Object,
    pageType: String,
  },
  data: function () {
    return {
      title: this.element.name,
      clickFavorite: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassSecond,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    hasMetadata() {
      return this.element.subscription || this.element.new || this.element.price || this.categoryName || this.element.free;
    },
    elementMediaType() {
      if (this.element.media_type) {
        return this.element.media_type;
      }
      return this.currentMediaType;
    },
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.element.currency;
      const currencyInfo = mapCurrencies[(currentCurrency).toLowerCase()];
      if (currencyInfo) {
        return currencyInfo.symbol;
      }
      return 'US$';
    },
    categoryName() {
      let name = '';
      if (_.size(this.element.categories)) {
        name = this.element.categories[0].name;
      }
      return name;
    },
    hasVideo() {
      return !(this.currentMediaType === 'image' || this.currentMediaType === '3d-model');
    },

  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  created: function () {
  },
  methods: {
    isImageMediaType() {
      const currentMediaType = this.$store.getters['site/currentMediaType'];

      let status = false;
      const imageMediaType = [
        'image',
        'photo',
        'vector',
        'gif',
        '3d',
        '3d-model',
      ];

      if (imageMediaType.indexOf(currentMediaType.id) >= 0) {
        status = true;
      }

      return status;
    },
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      let status = false;
      if (currentWindowWidth < 1200) {
        status = true;
      }

      return status;
    },
    doInitVideoPlayer(element) {
      // no need init video when is image
      if (this.isImageMediaType()) {
        return;
      }

      const container = document.getElementById(`player-${element.id}`);
      const $card = $(this.$el);

      if (this.isMobileLayout()) {
        $card.addClass('is-playing');
      }

      let videoUrl = this.element.previews.mp4.url;
      let webmUrl = this.element.previews.webm.url;

      if (_.has(this.element, 'thumbnails.mp4.url')) {
        videoUrl = this.element.thumbnails.mp4.url;
      }

      if (_.has(this.element, 'thumbnails.webm.url')) {
        webmUrl = this.element.thumbnails.webm.url;
      }

      // const currentMediaType = this.$store.getters['site/currentMediaType'];
      // const enablePreviewLite = [
      //   'ae',
      //   'ae-template',
      //   'ae-preset',

      //   'pr',
      //   'pr-template',
      //   'pr-preset',
      //   'mg-template',

      //   'motion-template',
      // ];

      // if (enablePreviewLite.indexOf(currentMediaType.id) >= 0) {
      //   videoUrl = `${this.element.previews.mp4.url.replace(/.mp4/i, '-s.mp4')}`;
      //   webmUrl = `${this.element.previews.webm.url.replace(/.webm/i, '-s.webm')}`;
      // }

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
        })
        .on('unload', () => {
          $card.removeClass('is-playing');
        });
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

      const currentMediaType = this.$store.getters['site/currentMediaType'];
      const currentLanguage = this.$store.getters['site/currentLanguage'];

      var info = {
        mediaType: currentMediaType.api,
        id: element.id,
        language: currentLanguage,
      };

      this.$store.dispatch('search/getElementInfo', info)
        .then((result) => {
          console.log('filterSimilar', result);

          if (_.size(result.name)) {
            const productName = _.truncate(result.name, {
              'length': 16,
            });
            filterBar.similar.productName = productName;
          }

          if (_.size(result.previews.jpg)) {
            const elementImageUrl = result.previews.jpg.url;
            filterBar.similar.imageUrl = decodeURIComponent(elementImageUrl);
          }
        });

      this.$store.dispatch('search/setFilter', filter);

      this.$root.$emit('doSearch', filter);
    },
    filterCategories() {
      // console.log(element);
      // this.$root.$emit('filterCategories', element);
    },
    hoverSubscription(element) {
      const isMouseEnter = (element) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.available_for_subscription');
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
  },
};
</script>

<style lang="scss" scoped>
$video-card-max-height-xxl:        9rem;
$template-card-max-height-xxl:     12rem;

$div-metadata-height:     0.875rem;
$div-title-height:        2rem;
$card-body-bottom-margin: $div-title-height;
$card-body-bottom-margin-sm: $div-title-height + .5rem;

// ASSIGN BREAKPOINTS BASED ON THE MAX WIDTH OF THUMBNAIL GENERATED
// breakpoint calculations at: https://docs.google.com/spreadsheets/d/1e0WYH-3Kz6gHL30QzWC-CiVr8SQVqLqu_NLSNJxNhOo/edit?usp=sharing
$video-card-breakpoints: (
  1: 0,
  2: 288px,
  3: 576px,
  4: 848px,
  5: 1135px
);

$template-card-breakpoints: (
  1: 0,
  2: 400px,
  3: 800px,
  4: 1184px,
  5: 1476px
);

.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

  // SETTING WIDTH

  // MOBILE
  @media (max-width: map-get($video-card-breakpoints,2) - 0.0001px) {
    width: 100%;
  }

  // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
  @media (min-width: map-get($video-card-breakpoints,2)) {
    margin-right: $spacer;
  }

  // DESKTOP
  @media (min-width: map-get($video-card-breakpoints,2)) and (max-width: map-get($video-card-breakpoints,3) - 0.0001px) {
    width: calc(50% - 1rem);
  }
  @media (min-width: map-get($video-card-breakpoints,3)) and (max-width: map-get($video-card-breakpoints,4) - 0.0001px) {
    width: calc(33.3333% - 1rem);
  }
  @media (min-width: map-get($video-card-breakpoints,4)) and (max-width: map-get($video-card-breakpoints,5) - 0.0001px) {
    width: calc(25% - 1rem);
  }

  // FIXED HEIGHT ON LARGE SCREENS
  @media (min-width: map-get($video-card-breakpoints,5)) {
    min-width: $video-card-max-height-xxl;

    &.card-16-9 {
      width: $video-card-max-height-xxl * 16 / 9;
    }

    &.card-9-16,
    &.card-1-1 {
      width: $video-card-max-height-xxl;
    }
  }

  &.card-ae, &.card-ae-template, &.card-ae-preset,
  &.card-pr, &.card-pr-template, &.card-pr-preset, &.card-mg-template,
  &.card-motion-template {
    // MOBILE
    @media (max-width: map-get($template-card-breakpoints,2) - 0.0001px) {
      width: 100%;
    }

    // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
    @media (min-width: map-get($template-card-breakpoints,2)) {
      margin-right: $spacer;
    }

    // DESKTOP
    @media (min-width: map-get($template-card-breakpoints,2)) and (max-width: map-get($template-card-breakpoints,3) - 0.0001px) {
      width: calc(50% - 1rem);
    }
    @media (min-width: map-get($template-card-breakpoints,3)) and (max-width: map-get($template-card-breakpoints,4) - 0.0001px) {
      width: calc(33.3333% - 1rem);
    }
    @media (min-width: map-get($template-card-breakpoints,4)) and (max-width: map-get($template-card-breakpoints,5) - 0.0001px) {
      width: calc(25% - 1rem);
    }

    // FIXED HEIGHT ON LARGE SCREENS
    @media (min-width: map-get($template-card-breakpoints,5)) {
      min-width: $template-card-max-height-xxl;

      &.card-16-9 {
        width: $template-card-max-height-xxl * 16 / 9;
      }

      &.card-9-16,
      &.card-1-1 {
        width: $template-card-max-height-xxl;
      }
    }
  }
}

// ADD VERTICAL PADDING TO .card-img-wrapper
.card-16-9 {
  .card-img-wrapper {
    padding-bottom: 56.25%;
  }
}

.card-9-16,
.card-1-1 {
  .card-img-wrapper {
    padding-bottom: 100%;
  }
}

.card-img-wrapper {
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

// SHADOWS
.card-element {
  transition: box-shadow 0.1s cubic-bezier(0.165, 0.840, 0.440, 1.000);
  @include box-shadow($box-shadow-sm);

  .card-wrapper:hover & {
    @include box-shadow($box-shadow);
  }
}

// CHANGE INLINE LIST SPACING
.list-inline {
  .list-inline-item {
    margin-right: 0.25rem;
  }
}

// CHANGE CATEGORY LINK FONT WEIGHT
.list-link-category {
  font-weight: normal;
}

// LINE HEIGHT OF TEXT DIVS
.div-metadata {
  line-height: $div-metadata-height;
}
.div-title {
  line-height: $div-title-height;
}

// BOTTOM PADDING & HIDE TITLE UNTIL HOVER OR PLAYING FOR .card-ae, .card-video, .card-pr, .card-motion-template
.card-wrapper:not(.card-favorites) {
  // @media (min-width: map-get($video-card-breakpoints,2)) and (max-width: map-get($grid-breakpoints,'lg') - 0.05px) {
  //   padding-bottom: $card-body-bottom-margin * 2 + .5rem;
  // }

  // &.card-ae, &.card-ae-template, &.card-ae-preset,
  // &.card-pr, &.card-pr-template, &.card-pr-preset, &.card-mg-template,
  // &.card-motion-template {
  //   @media (max-width: map-get($template-card-breakpoints,2) - 0.05px) {
  //     padding-bottom: 0;

  //     &.has-played {
  //       padding-bottom: 0;
  //       .div-title {
  //         display: flex;
  //       }
  //     }
  //   }
  //   @media (min-width: map-get($template-card-breakpoints,2)) and (max-width: map-get($grid-breakpoints,'lg') - 0.05px) {
  //     padding-bottom: $card-body-bottom-margin * 2 + .5rem;
  //   }
  // }
  @media (min-width: map-get($grid-breakpoints,'lg')) {
    padding-bottom: $card-body-bottom-margin;
  }

  @media (min-width: map-get($grid-breakpoints,'lg')) {
    .div-title {
      display: none;
    }

    &:hover {
      padding-bottom: 0;
      .div-title {
        display: flex;
      }
    }
  }

  &.is-playing {
    padding-bottom: 0;
    .div-title {
      display: flex;
    }
  }
}

// SHOW TITLE ON MOBILE FOR
// .card-3d-model, .card-image
.card-3d-model, .card-image {
  @include media-breakpoint-down(lg) {
    padding-bottom: 0;

    .div-title {
      display: flex;
    }
  }
}

// ACTIONABLES
.btn-actionables {
  cursor: pointer;
}

// ACTIONABLES ON MOBILE
@include media-breakpoint-down(md) {
  .div-title {
    flex-direction: column;
    margin-top: .5rem;
  }
  .element-title-link {
    max-width: 100%;
    line-height: 1.5rem;
  }
  .div-actionables {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .btn-actionables {
      line-height: 1.875rem;
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

// POSITIONING OF FLOWPLAYER THUMBNAIL
.fp-me-thumb {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

// BOUNCE HEART ICON
@keyframes bounceScale {
  0% {
    transform: scale(0);
  }
}

// HIDE LABELS FOR ACTIONABLES FOR NON-TEMPLATE THUMBNAILS ON MOBILE
.actionables-label {
  display: none;

  @media (max-width: map-get($video-card-breakpoints,2) - 0.05px) {
    display: inline;
  }

  .card-ae &, .card-ae-template &, .card-ae-preset &,
  .card-pr &, .card-pr-template &, .card-pr-preset &, .card-mg-template &,
  .card-motion-template & {
    @media (max-width: map-get($template-card-breakpoints,2) - 0.05px) {
      display: inline;
    }
  }
}
// @include media-breakpoint-between(sm,lg) {
//   .card-wrapper {
//     &:not(.card-ae), &:not(.card-ae-template), &:not(.card-ae-preset),
//     &:not(.card-pr), &:not(.card-pr-template), &:not(.card-pr-preset), &:not(.card-mg-template),
//     &:not(.card-motion-template) {
//     // &:not(.card-ae), &:not(.card-pr), &:not(.card-motion-template) {
//       .actionables-label {
//         display:none !important;
//       }
//     }
//   }
// }

// ADD BOUNCE STYLE TO ACTIVE FAV BTN
.btn-bounce-icon {
  &.active {
    i {
      animation: bounceScale 0.3s cubic-bezier(0.17, 0.89, 0.32, 1.49);
      color: $primary;

      &.fal {
        font-family: "Font Awesome 5 Pro";
        font-weight: 900;
      }
      &.mel {
        font-family: "me-solid";
      }
    }
  }
}

// .card-header {
//   cursor: move;
// }

</style>
