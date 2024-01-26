<template>

  <p class="d-none d-lg-block" :key="isMediaTypeTermsLoaded">

    <a
      v-cloak
      v-for="(filter, filterKey) in filters" :key="filterKey"
      @click="cancelFilter(filterKey)"
      class="btn btn-sm btn-success mr-2"
    >
      <font-awesome-icon
        v-if="filter.type === 'artist'"
        :icon="filter.icon" size="lg" title="Artist" class="mr-1"/>

      <font-awesome-icon
        v-if="filter.type === 'color'"
        :icon="['fas','square']"
        size="lg"
        class="filter-applied-color border border-gray rounded"
        :style="{ color: filter.value }"
        aria-hidden="true"
      />

      {{ filter.label }}
      <span v-if="['string', 'price', 'artist'].includes(filter.type)">
      : {{ renderFilterValue(filterKey, filter, currentMediaType) }}
      </span>
      <font-awesome-icon :icon="['fas','times']" fixed-width/>
    </a>

    <a
      v-cloak
      v-if="hasFilters"
      @click.prevent="cancelAllFilter()"
      href="#"
      class="small font-weight-bold ml-2">{{ $t('search.clear_all_filters') }}
    </a>
  </p>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { clearFilters } from '@/services/search.service.js';

import filterMixin from '@/views/search/filter.mixin.js';

export default {
  name: 'search-content',
  mixins: [filterMixin],
  components: {
  },
  data: function () {
    return {
      isSearching: false,
      isModal: false,
      elementId: '',
      elementData: {},
      isFirst: false,
      isLast: false,
    };
  },
  computed: {
    ...mapState({
      // isMobile: state => state.site.isMobile,

      isMediaTypeTermsLoaded: state => state.search.isMediaTypeTermsLoaded,

      appliedFilters: state => state.search.filter,
      currentMediaType: state => state.search.mediaType,

      facets: state => state.search.facets,
    }),
    ...mapGetters({
      userCurrency: 'user/currencyCode',
      searchKeyword: 'search/keyword',
    }),
    hasFilters() {
      return _.size(this.filters) > 0;
    },

    filters() {
      // get applied filters
      const filters = {};

      Object.entries(this.appliedFilters).forEach((entry) => {
        const field = entry[0];
        let value = entry[1];

        if (field === 'subscription' && value === -1) {
          return; // skip
        }

        const schema = _.get(this.filtersSchema, field);

        if (schema) {
          const type = _.get(schema, 'type', 'string');

          if (value || value === false) { // filter out empty but not 'false'
            if (type === 'boolean') {
              // convert 1 to true
              value = !!value;
            }


            filters[field] = {
              label: schema.label,
              value: value,
              // get name from facet
              name: this.getFacetValueName(field, value),
              type: type,
              icon: _.get(schema, 'icon', ['', '']),
            };
          }
        }
      });

      // remove color
      // delete filters.color;

      return filters;
    },
    // siteUrl: function () {
    //   return process.env.VUE_APP_SITE_URL;
    // },
    // isMobileLayout() {
    //   const currentWindowWidth = this.$store.getters['site/windowWidth'];
    //   // console.log(currentWindowWidth);
    //
    //   let status = false;
    //   if (currentWindowWidth < 1200) {
    //     status = true;
    //   }
    //
    //   return status;
    // },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getFacetValueName(field, value) {
      if (!field || !value) {
        return null;
      }

      const facet = _.get(this.facets, field, {});
      if (_.size(facet)) {
        const obj = facet.find(x => x.value === value);
        if (obj) {
          return _.get(obj, 'name');
        }
      }
      return null;
    },
    renderFilterName(filterKey) {
      return _.get(this.filterLabels, filterKey, filterKey);
    },
    cancelAllFilter() {
      clearFilters();
    },
    cancelFilter(filterName) {
      console.log('cancelFilter - ', filterName);

      const filters = { ...this.appliedFilters };
      delete filters[filterName];
      this.$store.dispatch('search/setFilter', filters);

      if (filterName === 'subscription') {
        sessionStorage.setItem('ME_subscriptionFilter', '0');
      }

      this.pushFilterToRoute(filterName, null);
      //
      // const query = {
      //   ...this.$route.query,
      //   page: 1,
      // };
      //
      // // remove filer
      // delete query[filterName];
      //
      // this.$router.push({
      //   query: query,
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
// sidebar toggle on mobile
.btn-sidebar-toggle {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

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
  @include media-breakpoint-down(sm) {
    &:after {
      position: absolute;
      content: '';
      width: $spacer * 2;
      height: 100%;
      top:0;
      right:$spacer;

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

.media {
  &.media-vs {
    .media-wrapper {
      border-radius: $border-radius;
      overflow: hidden;
      position: relative;
      max-width: 33.333%;

      img {
        max-width: 14rem;
        max-height: 4rem;
      }

      .media-play {
        &:after {
          font-family: "Font Awesome 5 Pro";
          font-weight: 900;
          content: "\f04b";

          color: white;
          font-size: 1.5rem;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: $text-shadow-3;

          opacity: 0;
          -webkit-transition: opacity 0.15s ease-in-out;
          -moz-transition: opacity 0.15s ease-in-out;
          -ms-transition: opacity 0.15s ease-in-out;
          -o-transition: opacity 0.15s ease-in-out;
          transition: opacity 0.15s ease-in-out;
        }
      }

      &:hover {
        .media-play:after {
          opacity: 1;
        }
      }
    }
  }
  .media-body {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
}

.col-elements {
  line-height: 1;
}

// STYLE IMG OF AUDIOSEARCH WAVEFORM
.img-waveform {
  width: 100%;
  height: 3rem;
  filter: grayscale(100%);
  opacity: 1;
}

// PRODUCT MODAL HEADER

.btn-categories {
  .btn {
    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }
  }
}

//
// COLORS
//

// COLOR FILTER APPLIED

.filter-applied-color {
  text-shadow: -1px -1px 0 $gray, 1px -1px 0 $gray, -1px 1px 0 $gray, 1px 1px 0 $gray;

  .ui-dark & {
    text-shadow: -1px -1px 0 $light, 1px -1px 0 $light, -1px 1px 0 $light, 1px 1px 0 $light;
  }
}
</style>
