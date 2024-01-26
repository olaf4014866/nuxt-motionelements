<template>
  <!-- SUB-MEDIA TYPE + RESULTS COUNT TABS -->
  <ul id="search-media-type-tabs" class="nav nav-tabs border-0">
    <li v-if="showAllTab"
      @click.prevent="changeSubMediaType(mainMediaTypeCode)"
      class="nav-item"
    >
      <a
        @click.prevent=""
        :class="{ active : (currentMediaTypeCode === mainMediaTypeCode)}"
        class="nav-link"
        href="#"
      >
        {{ $t('search.Tab_All') }}
        <!--<small class="d-none d-md-inline">({{ filterFacetCount(mediaType.count) }})</small>-->
      </a>
    </li>
    <li
      v-for="(mediaType) in subMediaTypes" :key="mediaType.id"
      @click.prevent="changeSubMediaType(mediaType.id)"
      class="nav-item"
    >
      <a
        @click.prevent=""
        :class="{ active : (currentMediaTypeCode === mediaType.id.replace('-', '_'))}"
        class="nav-link"
        href="#"
      >{{ $term('mediaType', mediaType.id.replace('-', '_')).short().text() }}
        <!--<small class="d-none d-md-inline">({{ filterFacetCount(mediaType.count) }})</small>-->
      </a>
    </li>
  </ul>
  <!-- SUB-MEDIA TYPE + RESULTS COUNT TABS -->
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'search-sub-media-type-tabs',
  components: {
  },
  data: function () {
    return {
    };
  },
  computed: {
    ...mapState({
      isMobile: state => state.site.isMobile,

      // currentMediaType: state => state.site.currentMediaType,
      // mediaTypeTabs: state => state.search.mediaTypeTabs,

      // by mark
      currentMediaTypeCode: state => state.search.mediaType,
      facets: state => state.search.facets,
    }),
    // ...mapGetters({
    // }),
    showAllTab() {
      const countSubMediaType = _.size(this.facets.mt);

      // only show 'all' tabs when not have submediatype or more then two
      return countSubMediaType === 0 || countSubMediaType >= 2;
    },
    mainMediaTypeCode() {
      const currentMediaTypeObj = this.$store.getters['site/currentMediaType'];

      return currentMediaTypeObj.mainMediaType.replace('-', '_');
    },
    subMediaTypes() {
      // generate sub media types
      // get sub media types
      const mediaTypeTabs = [];

      // add more tab if have other sub media
      const subMediaTypes = this.facets.mt;

      if (_.size(subMediaTypes)) {
        const supportedMediaTypes = this.$store.getters['site/mapMediaTypes'];

        subMediaTypes.forEach((v) => {
          const key = v.value;
          const info = _.find(supportedMediaTypes, { code: parseInt(key, 10) });
          if (info) {
            const subMediaTypeTab = {
              id: info.id,
              name: info.nameShort,
              count: subMediaTypes[key],
            };
            mediaTypeTabs.push(subMediaTypeTab);
          }
        });
        // });
        // Object.keys(subMediaTypes).map((key) => {
        //   const info = _.find(supportedMediaTypes, { code: parseInt(key, 10) });
        //   if (info) {
        //     const subMediaTypeTab = {
        //       id: info.id,
        //       name: info.nameShort,
        //       count: subMediaTypes[key],
        //     };
        //     mediaTypeTabs.push(subMediaTypeTab);
        //   }
        // });
      }

      return mediaTypeTabs;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    filterFacetCount(count) {
      if (count > 10000) {
        return '10000+';
      }

      if (count > 1000) {
        return '1000+';
      }

      return count;
    },
    changeSubMediaType(mediaType) {
      this.$emit('change', mediaType);
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
