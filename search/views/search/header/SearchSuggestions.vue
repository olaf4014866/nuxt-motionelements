<template>

  <div id="search-suggestion-bar" class="d-flex mb-0 search-recommendations-wrapper">
    <div
      class="text-nowrap pr-3">
      {{ $t('search.suggestions') }}
    </div>
    <div class="search-recommendations">

      <template v-if="showFilterFreeSuggestion">
          <button
            class="btn btn-sm btn-simple-success mr-1 font-weight-bold"
            @click="onClickFilterFree()"
          >
            <font-awesome-icon
              :icon="['far','dollar-sign']"
              class="mr-1"
            />
            {{ $t('search.filter_by') }}: {{ $t('search.price_free') }}
          </button>
      </template>

      <a v-for="(username, key) in suggestionArtists" :key="`suggestion-artists-${key}`"
          @click.prevent="onClickArtist(username)"
          href="#"
          class="btn btn-sm btn-simple-secondary mr-1"
      >
        <font-awesome-icon :icon="['fas','me-user-artist']" size="lg" title="Artist" class="mr-1"/>
        {{ username }}
      </a>

      <!-- TODO: add suggestionFilters & suggestionSubcategories -->
      <!--
      <a v-for="(filter, key) in suggestionFilters" :key="`suggestion-filters-${key}`"
        @click.prevent="console.log('test')"
        href="#"
        class="btn btn-sm btn-simple-secondary mr-1"
      >
        <font-awesome-icon :icon="['fal','search']" size="lg" title="Filter" class="mr-1"></font-awesome-icon>
        {{ _.startCase(filter.type) }}: {{ _.startCase(filter.value) }}
      </a>

      <a v-for="(subcat, key) in suggestionSubcategories" :key="`suggestion-subcat-${key}`"
        @click.prevent="console.log('test')"
        href="#"
        class="btn btn-sm btn-simple-secondary mr-1"
      >
        <font-awesome-icon :icon="['fal','tag']" size="lg" title="Sub-category" class="mr-1"></font-awesome-icon> {{subcat}}
      </a>
      -->

      <a v-for="(keyword, key) in suggestionKeywords" :key="`suggestion-keywords-${key}`"
          @click.prevent="onClickKeyword(keyword)"
          class="btn btn-sm btn-simple-secondary mr-1"
      >
        {{keyword}}
      </a>

  </div>
</div>

</template>

<script>
import { mapState } from 'vuex';
import { changeKeyword } from '@/services/search.service.js';
import filterMixin from '@/views/search/filter.mixin.js';
// import { isProductType } from '@motionelements/core/src/services/catalog.service.js';


export default {
  name: 'search-suggestions',
  mixins: [filterMixin],
  components: {
  },
  data: function () {
    return {
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      isMobile: state => state.site.isMobile,
      suggestionKeywords: state => state.search.suggestion.keywords,
      suggestionArtists: state => state.search.suggestion.artists,
      suggestionFree: state => state.search.suggestion.free,
      mediaType: state => state.search.mediaType,
    }),
    isFreeFilterApplied() {
      return this.$route.query.price_range === '-1'
        || this.$route.query.priceRange === '-1';
    },
    showFilterFreeSuggestion() {
      return this.suggestionFree
        && !this.isFreeFilterApplied;
    },

    // suggestionFilters() {
    //   return [
    //     {
    //       type: 'price',
    //       value: 'free',
    //     },
    //   ];
    // },
    // suggestionSubcategories() {
    //   return ['Subcategory1', 'Subcategory2'];
    // },
  },
  methods: {
    onClickKeyword(keyword) {
      changeKeyword(keyword);
    },
    onClickArtist(username) {
      console.log('goArtistPage');
      if (username) {
        window.location.href = this.$link(`/artists/${username}`).url();
      }
    },
    onClickFilterFree() {
      // remove free text from string
      changeKeyword(this.suggestionFree);
      // push virtually as string
      this.pushFilterToRoute('priceRange', '-1');
    },
  },
};
</script>

<style lang="scss" scoped>

// responsive display settings

@include media-breakpoint-up(lg) {
  .lg\:btn-sm {
    @include button-size($btn-padding-y-sm, $btn-padding-x-sm, $font-size-sm, $line-height-sm, $border-radius);
  }
  .lg\:small {
    font-size: 80%;
    font-weight: 400;
  }

  .lg\:custom-select-sm {
    height: calc(2em + 0.125rem + 2px);
    padding-top: 0.0625rem;
    padding-bottom: 0.0625rem;
    padding-left: 0.4375rem;
    font-size: 0.75rem;
  }
}

// search recommendations

.search-recommendations {
  position: relative;
  @include media-breakpoint-down(sm) {
    display: block;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
}

.search-recommendations-wrapper {
  max-width: calc(100vw - 2rem);

  @include media-breakpoint-down(sm) {
    &:after {
      position: absolute;
      content: '';
      width: $spacer * 2;
      height: 100%;
      top:0;
      right:0;

      background: $transparent; /* Old browsers */
      background: -moz-linear-gradient(left, $transparent 0%, $body-bg 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(left, $transparent 0%,$body-bg 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to right, $transparent 0%,$body-bg 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='$transparent', endColorstr='$body-bg',GradientType=1 ); /* IE6-9 */
    }
    .search-recommendations {
      padding-right: $spacer;
    }
  }
}

</style>
