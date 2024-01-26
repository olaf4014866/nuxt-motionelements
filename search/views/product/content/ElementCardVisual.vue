<template>
  <div class="card-content">
    <div
      class="card-img-top"
      :class="`${imageBackgroundColor}`"
    >
      <img
        v-lazy="element.thumbnails.jpg.url"
        :alt="element.name"
        @error="previewImgError"
      >

      <!-- <div
        v-if="hasVideo"
        :id="'player-'+element.id"
        :style="'background-image:url('+element.thumbnails.jpg.url+')'"
        class="fp-full no-volume fp-me fp-me-thumb is-splash"
      ></div> -->
    </div>

    <div v-if="element.thumbnails.jpgs" class="card-img-row row m-0 position-relative overflow-hidden">
      <div
        class="col-4 p-0"
        :class="`${imageBackgroundColor}`"
        v-for="i in 3"
        :key="`collection-preview-${i}`"
      >
        <div class="card-img-wrapper">
            <img
              v-if="element.thumbnails.jpgs[i].url"
              class="card-img-sm"
              v-lazy="element.thumbnails.jpgs[i].url"
              :alt="`${element.name} Bundle - ${i}`"
              onerror="this.onerror=null;this.src='https://static.motionelements.com/img/me-thumb-placeholder.180718.png';"
            >
        </div>
      </div>
    </div>

    <div class="div-metadata d-flex small px-2">
      <div class="list-inline mb-0 small text-truncate text-nowrap">

        <!-- MEDIATYPE BADGE -->
        <!--
        <div class="list-inline-item">
          <span class="badge badge-pill badge-light">
            <i
              class="fas mes"
              :class="mediaTypeIcon"
            >
            </i>
          </span>
        </div>
        -->

        <!-- SUBSCRIPTION BADGE -->
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

        <!-- NEW BADGE -->
        <div
          v-if="element.new"
          class="list-inline-item">
          <span class="badge badge-pill badge-success">{{ $t('product.new') }}</span>
        </div>

        <!-- CATEGORY -->
        <!-- Include only ONE category even if there are 3, should link to apply category filter or category page (if too difficult) -->
        <!--
        <a
          @click.prevent="filterCategories(element)"
          href="#"
          class="list-inline-item list-link-category"
        >{{ categoryName }}</a>
        -->
        <div class="list-inline-item">
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
    <div v-if="showTitle" class="div-title d-flex flex-column flex-sm-row small px-2">
      <a
        :href="element.html.url"
        :title="element.name"
        class="element-title-link text-truncate mr-2 flex-fill font-weight-bold"
      >
        {{ this.title }}
      </a>

      <div class="div-actionables text-nowrap small d-flex justify-content-between align-items-center mt-2 mt-sm-0">
        <!-- BUTTON FAVORITE -->
        <a
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
            class="fa-lg fa-fw"></i><span class="actionables-label"> {{ $t('product.favorite') }}</span>
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
        <!-- BUTTON VIEW ELEMENT -->
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
</template>

<script>
export default {
  name: 'element-card-visual',
  props: {
    element: Object,
    hideTitle: Boolean,
    isHover: Boolean,
  },
  data: function () {
    return {
      title: this.element.name,
      clickFavorite: false,
      whiteBg: [
        'music',
        'sfx',
      ],
    };
  },
  computed: {
    imageBackgroundColor() {
      return this.whiteBg.includes(this.currentMediaType) ? 'bg-white' : 'bg-black';
    },
    showTitle() {
      if (this.isHover || !this.hideTitle) {
        return true;
      }
      return false;
    },
  },
  methods: {
    previewImgError(event) {
      event.target.src = 'https://static.motionelements.com/img/me-thumb-placeholder.180718.png';
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

// METADATA

.div-metadata {
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

</style>
