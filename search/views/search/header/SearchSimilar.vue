<template>

  <div class="card shadow-sm bg-light lt border-0 p-3">
    <div
      :class="{ 'media-vs' : !isAudioLayout }"
      class="media"
    >
      <!-- visual searching image -->
      <div v-if="!isAudioLayout" class="media-wrapper mr-3">

        <a v-if="similarImageUrl">
          <img :src="similarImageUrl">
        </a>
        <a v-else>
          <font-awesome-icon :icon="['fas','file-image']" fixed-width size="3x" class="text-muted"/>
        </a>
      </div>

      <!-- audio searching image -->
      <div v-else-if="isAudioLayout && !similarImageUrl" class="media-wrapper mr-3">
        <a>
          <font-awesome-icon :icon="['fas','file-audio']" fixed-width size="3x" class="text-muted"/>
        </a>
      </div>

      <div class="media-body">
        <button
          @click="cancelSimilarImageFilter()"
          class="close"
          type="button"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <font-awesome-icon :icon="['fas','times']" fixed-width/>
          </span>
        </button>
        <h6>
          <!-- <span class="badge badge-light"> -->
          <font-awesome-icon :icon="['fas','me-search-ai']" fixed-width></font-awesome-icon>
          {{ $t('search.similar_mediatype_result', {'0': $term('mediaType', currentMediaTypeCode).short().text() }) }}
        </h6>
        <p class="mb-0 small text-muted">
          <a :href="similarElementUrl">{{ name }}</a>
        </p>
        <!--
        <p class="mb-0 small text-muted">
          [{{ $t('search.File_Name_or_Element_Name') }}]
        </p>
        -->

        <a v-if="isAudioLayout && similarImageUrl">
          <img class="img-waveform" :src="similarImageUrl">
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';
import { getElement } from '@/api/elements.js';

export default {
  name: 'search-content',
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

      matchBy: null, // file, element
      isAural: false,
      isVisual: false,

      matchByElement: null,
      acceptedImageExtensions: [
        'jpg', 'jpeg', 'png', 'gif',
      ],
    };
  },
  computed: {
    ...mapState({

      isLoadingSearch: state => state.site.loadingSearch.status,

      // appliedSimilar: state => state.search.filterBar.similar.status,
      // appliedSimilarImage: state => state.search.filterBar.similar.imageUrl,
      // appliedSimilarProductName: state => state.search.filterBar.similar.productName,
      // appliedSimilarProductUrl: state => state.search.filterBar.similar.productUrl,

      currentMediaTypeCode: state => state.search.mediaType,
      filters: state => state.search.filter,

    }),
    ...mapGetters({
      // by marksun
      // pagination
      currentPage: 'search/currentPage',
      perPage: 'search/perPage',
      totalCount: 'search/totalCount',

      asideElements: 'search/allSearchAsideElements',
      hasAsideElements: 'search/hasAsideElements',
      hasCrossSellElements: 'search/hasCrossSellElements',

      searchKeyword: 'search/keyword',
    }),
    similarValue() {
      return _.get(this.filters, 'similar');
    },
    isAppliedSimilar() {
      return !!_.get(this.filters, 'similar');
    },
    name() {
      let value = '';
      switch (this.matchBy) {
        case 'file':
          if (this.isAural) {
            // similar=et-788b14bfacb47a388955e10703afa90b%3A2048417-{originalFilename}
            // get last part
            value = this.similarValue.split('-').pop();
          } else {
            // similar=fullUrl
            value = this.similarValue.substring(this.similarValue.lastIndexOf('/') + 1);
          }
          break;

        case 'element':
          value = _.get(this.matchByElement, 'name') || '';
          break;

        default:
          return '';
      }

      return _.truncate(value, { 'length': 48 });
    },
    similarElementUrl() {
      switch (this.matchBy) {
        case 'element':
          return _.get(this.matchByElement, 'html.url', null);

        default:
          return null;
      }
    },
    similarImageUrl() {
      switch (this.matchBy) {
        case 'file': {
          const url = this.similarValue; // _.get(this.filters, 'similar');

          console.log('url1111', this.similarValue);
          if (url) {
            const extension = url.split('.').pop();

            if (['jpg', 'jpeg', 'gif', 'png'].includes(extension)) {
              return url;
            }
          }
          return null;
        }
        case 'element':
          if (_.get(this.matchByElement, 'mediaType') === 'music') {
            return _.get(this.matchByElement, 'previews.png.url');
          }

          return _.get(this.matchByElement, 'thumbnails.jpg.url');

        default:
          return null;
      }
    },

    isNormalLayout() {
      return !this.isAudioLayout;
    },
    isAudioLayout() {
      return isProductType('audio', this.currentMediaTypeCode);
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    init() {
      const value = this.similarValue;

      // similar = decodeURIComponent(value);
      // filter.similar = decodeURIComponent(value);

      // search similar element
      var elementPattern = new RegExp('^[0-9]{5,10}$');
      var isElement = elementPattern.test(value);
      if (isElement) {
        this.matchBy = 'element';
        // filterBar.similar.status = true;
        // filterBar.similar.mode = 'element';
        // filterBar.similar.id = decodeURIComponent(value);
        // filterBar.similar.id = value;
        // filterBar.similar.imageFilename = '';
        // filterBar.similar.imageUrl = decodeURIComponent(value);

        const sku = value;

        // if have jpg preview apply to filter bar
        // this.$store.dispatch('search/getElementInfo', info)
        getElement(sku, {
          'fields[element]': 'name,mediaType,previews,thumbnails,url',
        })
          .then((response) => {
            const element = response.data.data;
            this.matchByElement = element;
          });
      }
      console.log('updateFilterFromRouter - isElement : ', isElement);

      // search similar image
      const imagePattern = new RegExp(`^(http|https)(.*)(${this.acceptedImageExtensions.join('|')})$`, 'i');

      const audioExternalTrackPattern = new RegExp('^et-(.*)', 'i');

      if (imagePattern.test(value)) {
        this.isVisual = true;
        this.isAural = false;
        this.matchBy = 'file';
        // filterBar.similar.status = true;
        // filterBar.similar.mode = 'visual';
        // filterBar.similar.imageFilename = '';
        // filterBar.similar.imageUrl = decodeURIComponent(value);
      } else if (audioExternalTrackPattern.test(value)) {
        this.isVisual = false;
        this.isAural = true;
        this.matchBy = 'file';
      }

      // search similar audio
      // var audioPattern = new RegExp('^et-(.*)', 'i');
      // var isAural = audioPattern.test(similar);
      // const isAural = mediaType === 'music';
      // if (isAural) {
      //   filterBar.similar.status = true;
      //   filterBar.similar.mode = 'aural';
      //   filterBar.similar.imageFilename = '';
      //   filterBar.similar.imageUrl = '';
      // }
    },
    cancelSimilarImageFilter() {
      const filters = { ...this.filters };
      delete filters.similar;
      this.$store.dispatch('search/setFilter', filters);

      // const filterBar = this.$store.getters['search/allSearchFilterBar'];
      // filterBar.similar.status = false;
      // filterBar.similar.imageFilename = '';
      // filterBar.similar.imageUrl = '';
      // this.$store.dispatch('search/setFilterBar', filterBar);

      const query = {
        ...this.$route.query,
        page: 1,
      };

      // remove filer
      delete query.similar;

      this.$router.push({
        query: query,
      });
    },
  },
  watch: {
    similarValue: {
      handler() {
        this.init();
      },
      immediate: true,
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


// STYLE IMG OF AUDIOSEARCH WAVEFORM
.img-waveform {
  width: 100%;
  height: 3rem;
  filter: grayscale(100%);
  opacity: 1;
}


</style>
