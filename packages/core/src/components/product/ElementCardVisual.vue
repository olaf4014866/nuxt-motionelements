<template>
  <div
    class="card-content"
    :class="`${cardType}`"
    @mouseenter="doInitVideoPlayer(element)"
  >
    <div
      class="card-img-top"
    >
      <img
        v-lazy="element.thumbnails.jpg.url"
        :alt="name"
        onerror="this.onerror=null;this.src='https://static.moele.me/img/me-thumb-placeholder.180718.png';"
      >

      <div
        v-if="videoUrl || showStaticPreview"
        :id="'player-'+element.id"
        :style="'background-image:url('+element.thumbnails.jpg.url+')'"
        class="fp-full no-volume fp-me fp-me-thumb is-splash"
      />
    </div>

    <div
      v-if="isCollection && !isAudio && thumbnails"
      class="card-img-row row m-0 position-relative overflow-hidden"
    >
      <div
        class="col-4 p-0"
        v-for="i in 3"
        :key="`collection-preview-${i}`"
      >
        <div class="card-img-wrapper">
          <img
            v-if="thumbnails[i]"
            class="card-img-sm"
            v-lazy="thumbnails[i].url"
            :alt="`${element.name} Collection - ${i}`"
            onerror="this.onerror=null;this.src='https://static.moele.me/img/me-thumb-placeholder.180718.png';"
          >

          <div v-if="i === 3 && collectionItemCount - 3 > 0"
            class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center text-white no-invert collection-more-count-label"
          >
            <span class="badge badge-light">
              {{ $t('term.{number}_more', { number: collectionItemCount - 3}) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="div-metadata d-flex small px-2">
      <div v-if="showBadges || showPrice"
           class="list-inline mb-0 small text-truncate text-nowrap">

        <!-- MEDIATYPE BADGE -->
        <div
          v-if="isElement && options.showMediaTypeBadge"
          class="list-inline-item"
        >
          <span
            @mouseenter="tooltipShow"
            :title="$term('mediaType', mediaType).text()"
            class="badge badge-pill badge-light"
          >
            <ProductIcon
              :productType="mediaType"
            />
<!--            <i-->
<!--              :class="elementTypeIcon"-->
<!--              class="fas me-bmt"-->
<!--            >-->
<!--            </i>-->
          </span>
        </div>
        <!-- MEDIATYPE BADGE -->

        <!-- MEDIATYPE BADGE FOR COLLECTION -->
        <div v-else-if="isCollection"
                class="list-inline-item"
        >
          <span class="badge badge-pill badge-light">
            <i class="fas fa-fw me-bmt icon-collection"></i>&nbsp;&nbsp;|&nbsp;&nbsp;
            {{ collectionItemCount }}&nbsp;

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
            />
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
          <span v-if="isFree"
              class="text-muted"
          >
            {{ $t('product.free') }}
          </span>
          <span
            v-else-if="price"
            class="text-muted"
          >
            {{ price.getSymbol() + ' ' + price.toFormat('0,0')}}
          </span>
        </div>
        <!-- PRICE -->

      </div>
    </div>

    <div v-if="isExpanded" class="div-title d-flex flex-column flex-sm-row small px-2 align-items-sm-center">
      <a
        :href="linkUrl"
        :title="name"
        @click.exact="viewProduct"
        class="element-title-link text-truncate mr-2 flex-fill font-weight-bold"
      >
        {{ titleTruncate }}
      </a>

      <div class="div-actionables text-nowrap small d-flex flex-row-reverse justify-content-between align-items-center mt-2 mt-sm-0">
        <!-- BUTTON VIEW ELEMENT -->
        <a
          @mouseover="hoverView()"
          @mouseout="hoverView(element)"
          :href="linkUrl"
          @click.exact="viewProduct"
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
import Money from '@motionelements/money';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'visual-element-card',
  props: {
    element: Object,
    pageType: String,
    cardPlayStatus: String,
    isExpanded: Boolean,
    options: Object,
  },
  components: {
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  data: function () {
    return {
      // title: this.element.name,
      hoverLabel: null,
      clickFavorite: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
    }),
    isElement() {
      return _.get(this.element, 'object') === 'element';
    },
    isCollection() {
      return _.get(this.element, 'object') === 'collection';
    },
    mediaType() {
      return _.get(this.element, 'mediaType', _.get(this.element, 'media_type'));
    },
    name() {
      return _.get(this.element, 'name') || '';
    },
    linkUrl() {
      return _.get(this.options, 'linkUrl') || this.element.html.url;
    },
    videoUrl() {
      if (this.isCollection) {
        return null;
      }

      const videoUrl = _.get(this.element, 'thumbnails.mp4.url') || _.get(this.element, 'previews.mp4.url');

      // just in case, check if is mp4
      if (!videoUrl || videoUrl.lastIndexOf('.mp4') === -1) {
        return null;
      }

      return videoUrl;
    },
    // elementTypeIcon() {
    //   const elementType = this.isCollection ? 'collection' : this.mediaType;
    //
    //   const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
    //
    //   const elementTypeDash = _.replace(elementType, '_', '-');
    //
    //   const info = _.find(mapSupportedMediaTypes, { id: elementTypeDash });
    //
    //   return info ? info.iconClassDefault : '';
    // },
    collectionItemCount() {
      if (!this.isCollection) {
        return null;
      }
      return _.get(this.element, 'items.totalCount', _.get(this.element, 'items.total_count'));
    },
    thumbnails() {
      return _.get(this.element, 'thumbnails.jpgs', []);
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
    cardType() {
      return this.isCollection ? 'card-collection' : 'card-element';
    },
    titleTruncate() {
      const title = this.hoverLabel || this.name;

      const dots = (title.length > 40) ? '...' : '';

      return title.substring(0, 40) + dots;
    },
    categoryName() {
      // console.log(this.element.categories);
      if (_.size(this.element.categories)) {
        let category;

        if (this.$route.query.category) {
          category = this.element.categories.find(x => x.id === this.$route.query.category);
          if (category) {
            return category.name;
          }
        }

        category = this.element.categories.find(x => x.type === 'category');

        if (category) {
          return category.name;
        }

        return this.element.categories[0].name;
      }
      return '';
    },
    iconStyle() {
      return {
        style: this.element.favorited || this.clickFavorite ? 'fas' : 'far',
        color: this.element.favorited || this.clickFavorite ? 'text-primary' : 'text-secondary',
      };
    },
    showStaticPreview() {
      if (this.isCollection) {
        return true;
      }

      return !(isProductType('image', this.mediaType) || isProductType('3d_model', this.mediaType));
    },
    isAudio() {
      if (this.isCollection) {
        return false;
      }

      return isProductType('audio', this.mediaType);
    },
    showBadges() {
      return _.get(this.options, 'showBadges') !== false;
    },
    showPrice() {
      return _.get(this.options, 'showPrice') !== false;
    },
  },
  mounted() {
  },
  created() {
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
        // https://vuejs.org/v2/guide/events.html
        // @click.exact: will only fire when no system modifiers are pressed
        // console.log('viewEvent', KeyboardEvent.key);
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
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      let status = false;
      if (currentWindowWidth < 1200) {
        status = true;
      }

      return status;
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
    filterSimilar(element) {
      console.log('filterSimilar', element);
      this.$root.$emit('filterSimilar', element);
    },
    // filterCategories() {
    //   // console.log(element);
    //   // this.$root.$emit('filterCategories', element);
    // },
    hoverSubscription(element) {
      const isMouseEnter = (!element);
      this.hoverLabel = isMouseEnter ? this.$i18n.t('product.available_for_subscription') : null;
      // if (isMouseEnter) {
      //   this.title = this.$i18n.t('product.available_for_subscription');
      // } else {
      //   this.title = this.element.name;
      // }
      // console.log('hoverSubscription - isEnter', isMouseEnter, element);
    },
    hoverExclusive(element) {
      const isMouseEnter = (!element);
      this.hoverLabel = isMouseEnter ? this.$i18n.t('product.exclusive') : null;
      // if (isMouseEnter) {
      //   this.title = this.$i18n.t('product.exclusive');
      // } else {
      //   this.title = this.element.name;
      // }
      // console.log('hoverSubscription - isEnter', isMouseEnter, element);
    },
    hoverFavorites(element) {
      const isMouseEnter = (!element);
      this.hoverLabel = isMouseEnter ? this.$i18n.t('product.favorite') : null;
      // if (isMouseEnter) {
      //   this.title = this.$i18n.t('product.favorite');
      // } else {
      //   this.title = this.element.name;
      // }
      // console.log('hoverFavorites - isEnter', isMouseEnter, element);
    },
    hoverSimilar(element) {
      const isMouseEnter = (!element);
      this.hoverLabel = isMouseEnter ? this.$i18n.t('product.similar') : null;
      // if (isMouseEnter) {
      //   this.hoverLabel = this.$i18n.t('product.similar');
      // } else {
      //   // this.title = this.element.name;
      //   this.hoverLabel = null;
      // }
      // console.log('hoverSimilar - isEnter', isMouseEnter, element);
    },
    hoverView(element) {
      const isMouseEnter = (!element);
      this.hoverLabel = isMouseEnter ? this.$i18n.t('product.view') : null;
      // if (isMouseEnter) {
      //   this.title = this.$i18n.t('product.view');
      // } else {
      //   this.title = this.element.name;
      // }
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
      if (this.isCollection) {
        return;
      }

      if (!_.get(this.options, 'enablePlayer')) {
        return;
      }

      const videoUrl = this.videoUrl;
      // const videoUrl = _.get(this.element, 'thumbnails.mp4.url') || _.get(this.element, 'previews.mp4.url');
      //
      // console.log(videoUrl.lastIndexOf('.mp4'));

      // just in case, check if is mp4
      if (!videoUrl) {
        return;
      }

      // don't init when is image
      // const imageList = [
      //   '3d_model',
      //   'image',
      //   'photo',
      //   'vector',
      //   'gif',
      // ];
      // const isImageMediaType = (imageList.indexOf(element.media_type) >= 0);
      // if (isImageMediaType) {
      //   return;
      // }
      //
      // const hasPreview = !!this.element.previews;
      // if (!hasPreview) {
      //   // console.log('doInitVideoPlayer : no preview ', element);
      //   return;
      // }
      //
      // const hasVideoFile = !!(_.size(this.element.previews.mp4));
      // const hasVideoURL = !!(this.element.previews.mp4.url);
      //
      // if (!hasVideoFile || !hasVideoURL) {
      //   // console.log('doInitVideoPlayer : no video ', element);
      //   return;
      // }

      const container = document.getElementById(`player-${element.id}`);
      const $card = $(this.$el);

      if (this.isMobileLayout()) {
        $card.addClass('is-playing');
        this.$emit('update:cardPlayStatus', 'playing');
      }

      // let videoUrl = this.element.previews.mp4.url;

      // if (_.has(this.element, 'thumbnails.mp4.url')) {
      //   videoUrl = this.element.thumbnails.mp4.url;
      // }

      // let webmUrl = this.element.previews.webm.url;

      // let webmUrl = _.get(this.element, 'previews.webm.url');
      //
      // if (_.has(this.element, 'thumbnails.webm.url')) {
      //   webmUrl = this.element.thumbnails.webm.url;
      // }

      const webmUrl = _.get(this.element, 'thumbnails.webm.url') || _.get(this.element, 'previews.webm.url');

      // const isProduction = process.env.VUE_APP_ENV === 'production';
      const api = flowplayer(container, {
        engine: 'html5',
        // key: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? process.env.VUE_APP_FLOWPLAYER_KEY : '',
        key: process.env.VUE_APP_FLOWPLAYER_KEY,
        // debug: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? false : true,
        // debug: !isProduction,
        debug: false,
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

// COLLECTION

.collection-more-count-label {
  background-color:rgba(0,0,0,.3333);
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

// * CARD BACKGROUND COLOR: collection vs element

// Element: white on light mode; black on dark mode
.card-element {
  .card-img-top {
    background-color: $white;

    .ui-dark & {
      background-color: $black;
    }
  }
}

// Collection: black always
.card-collection {
  .card-img-top, .card-img-row {
    background-color: $black;
  }
}

</style>
