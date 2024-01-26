<template>
  <div class="card-wrapper card-1-1 d-inline-block mb-3">
    <div
      :class="`card-${currentMediaType}`"
      class="card card-bundle border-0 rounded overflow-hidden">
      <a
        :href="collection.url"
        :title="collection.title"
        class="card-img-top"
        :style="`background-image: url('${getImageUrl}');background-size:cover`"
      >
      </a>
      <div class="card-body p-2 bg-white">
        <div class="div-title small">
          <div class="d-flex align-items-center justify-content-between w-100">
            <a
              :href="collection.url"
              class="element-title-link text-truncate pr-2 flex-fill font-weight-bold"
            >
              {{ collection.title }}
            </a>
          </div>
        </div>
        <div class="div-metadata d-flex small">
          <div class="list-inline mb-0 small">
            <!-- MEDIATYPE BADGE -->
            <div class="list-inline-item">
              <span class="badge badge-pill badge-light">
                {{ collection.offer.items.total_count }}&nbsp;
                <i
                  class="fas me-bmt"
                  :class="mediaTypeIcon"
                ></i>
              </span>
            </div>

            <!-- NEW BADGE -->
            <!-- <div class="list-inline-item">
              <span class="badge badge-pill badge-success">NEW</span>
            </div> -->

            <!-- PRICE -->
            <div class="list-inline-item">
              <del
                v-show="collection.offer.price !== false && collection.offer.price_original !== 0"
                class="text-muted"
              >
                <span>{{currencySymbol}} </span>
                {{ collection.offer.price_original }}
              </del>&nbsp;
              <span
                v-show="collection.offer.price !== false"
                class="font-weight-bold"
              >
                <span>{{currencySymbol}} </span>
                {{ collection.offer.price }}
              </span>
              <span
                v-show="collection.free === true"
                class="font-weight-bold"
              >
                {{ $t('product.free') }}
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
  name: 'element-card-bundle-artist-promotion',
  props: {
    collection: Object,
  },
  data: function () {
    return {
      clickFavorite: false,
      title: this.collection.name,
      whiteBg: [
        'music',
        'sfx',
      ],
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassSecond,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    isMember() {
      return false;
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
    imageBackgroundColor() {
      return this.whiteBg.includes(this.currentMediaType) ? 'bg-white' : 'bg-black';
    },
    getImageUrl() {
      if (this.collection.bgImg) {
        return this.collection.bgImg;
      }
      return this.collection.image.url;
    },
  },
  created: function () {},
  mounted() {},
  methods: {
    addFavorites() {
      if (!this.isMember) {
        this.$root.$emit('showLoginModal');
        return;
      }

      this.clickFavorite = true;
      this.$root.$emit('doAddFavorites', this.collection);
    },
    hoverFavorites() {
      const isMouseEnter = (this.collection) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.favorite');
      } else {
        this.title = this.collection.name;
      }
    },
    hoverView() {
      const isMouseEnter = (this.collection) ? false : true;
      if (isMouseEnter) {
        this.title = this.$i18n.t('product.view');
      } else {
        this.title = this.collection.name;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$card-max-height-xxl:     10rem;

$card-breakpoints: (
  1: 0,
  2: 289px,
  3: 465px,
  4: 641px,
  5: 817px,
  6: 993px,
);

.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

  // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
  @media (min-width: map-get($card-breakpoints,2)) {
    margin-right: $spacer;
  }

  // SET WIDTH
  @media (max-width: map-get($card-breakpoints,2) - 0.0001px) {
    width: 100%;
  }
  @media (min-width: map-get($card-breakpoints,2)) {
    width: $card-max-height-xxl;
  }
}

// ADD VERTICAL PADDING TO .card-img-wrapper
.card-1-1 {
  .card-img-top {
    padding-bottom: 100%;
    background-position: center;
  }
}

// SHADOWS
.card-bundle {
  transition: box-shadow 0.05s ease-in-out;
  @include box-shadow($box-shadow-sm);

  .card-wrapper:hover & {
    @include box-shadow($box-shadow);
  }
}
</style>
