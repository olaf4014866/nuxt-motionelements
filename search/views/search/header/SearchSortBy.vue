<template>

  <span>

    <label
      class="mr-2 mb-0 lg:small d-none d-md-inline-block"
      for="inline-sort-by"
    >
      <span
        :title="$t('search.not_support_when_search_by_color_or_similar')"
        data-toggle="tooltip"
        data-placement="left"
        class="d-inline-block"
      >
          <a
            v-show="!isSortEnabled"
            href="#" class="text-info"
          >
          <font-awesome-icon :icon="['fas','info-circle']"/>
        </a>
      </span>
      {{ $t('search.sort_by') }}
    </label>
    <div
      class="form-inline d-none d-md-inline-block mr-3"
    >
      <SelectSortBy
        id="inline-sort-by"
        class="lg:custom-select-sm"
      />
    </div>

  </span>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'search-content',
  components: {
    SelectSortBy: () => import('@/views/search/header/SearchSortBySelect.vue'),
  },
  data: function () {
    return {
    };
  },
  mounted() {
    // init bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
  },
  computed: {
    ...mapState({
      filters: state => state.search.filter,
    }),
    // ...mapGetters({
    //   // sort: 'search/sort',
    // }),
    isSortEnabled() {
      return !(_.get(this.filters, 'similar') || _.get(this.filters, 'color'));
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
