<template>
  <div
    class="section-hero d-flex align-items-center justify-content-between py-5 py-md-7 position-relative"
    :class="getBackgroundClass"
    :style="getBackgroundStyles"
  >
    <div v-if="$slots.heroBg" class="bg-div">
      <slot name="heroBg"></slot>
    </div>
    <div v-if="showOverlay" class="bg-overlay"></div>

    <div v-if="bgImage && bgImage.artist" :class="getTextClasses" class="byline">
      <a
        :href="bgImage.url"
        :title="bgImage.name">{{ bgImage.name.length > 20 ? truncateString(bgImage.name, 20, '...')
        : bgImage.name}}</a> ・
      <a :href="$link(`/artists/${(bgImage.artist.username).toLowerCase()}`).url()">
        {{ bgImage.artist.username }}</a>
    </div>

    <div class="hero-content container">
      <div
        :class="!isColumn ? 'flex-lg-row align-items-lg-center' : ''"
        class="d-flex flex-column">

        <HeroTitle
          :class="`${!isColumn ? 'mr-lg-3 mb-lg-0' : ''}`"
          class="col-title mb-3"
          :textStyles="textStyles">
          <template slot="title"><slot name="title"></slot></template>
          <template slot="lead"><slot name="lead"></slot></template>
        </HeroTitle>

        <slot name="content"></slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HeroWrapper',
  components: {
    HeroTitle: () => import('@/components/ui/page/TheHeroTitle.vue'),
  },
  props: {
    isFileDrop: {
      type: Boolean,
      default: true,
    },
    isColumn: {
      type: Boolean,
      default: false,
    },
    bgImage: Object,
    showOverlay: {
      type: Boolean,
      default: true,
    },
    textStyles: {
      type: Object,
      default: function () {
        return {
          invertColor: {
            type: Boolean,
            default: false,
          },
          lockColor: {
            type: Boolean,
            default: false,
          },
        };
      },
    },
  },
  data() {
    return {
    };
  },
  computed: {
    getTextClasses() {
      if (this.textStyles.lockColor === true && this.textStyles.invertColor === false) {
        return 'text-dark no-invert';
      }
      if (this.textStyles.lockColor === true && this.textStyles.invertColor === true) {
        return 'text-light no-invert';
      }
      if (this.textStyles.invertColor === true) {
        return 'text-light';
      }
      return '';
    },
    getBackgroundClass() {
      let classNames = '';

      if (this.textStyles.invertColor === true) {
        classNames = 'bg-dark';
      }

      if (this.textStyles.lockColor === true) {
        classNames = `${classNames} no-invert`;
      }

      return classNames;
    },
    getBackgroundStyles() {
      if (this.bgImage && this.bgImage.previews.jpg.url) {
        return `background-image: url('${this.getBgImgUrl(this.bgImage.previews.jpg.url)}');background-size:cover;background-position:center`;
      }
      return '';
    },
  },
  mounted() {
  },
  methods: {
    getBgImgUrl(url) {
      if (url.includes('.imgix.') || url.includes('static.moele.me')) {
        if (this.bgImage.filters) {
          var imgixOptions = [];

          if (this.bgImage.filters.duotone) {
            imgixOptions.push(`duotone=${this.bgImage.filters.duotone[0]}%2C${this.bgImage.filters.duotone[1]}`);
          }
          if (this.bgImage.filters.con) {
            imgixOptions.push(`con=${this.bgImage.filters.con}`);
          }

          if (imgixOptions) {
            var imageUrl = `${url}?${imgixOptions.join('&')}&duotone-alpha=100`;
            return imageUrl;
          }

          return url;
        }
      }
      return url;
    },
    truncateString(str, len, append) {
      var newLength;
      append = append || ''; // Optional: append a string to str after truncating. Defaults to an empty string if no value is given

      if (append.length > 0) {
        append = ` ${append}`; // Add a space to the beginning of the appended text
      }
      if (str.indexOf(' ') + append.length > len) {
        return str; // if the first word + the appended text is too long, the function returns the original String
      }

      if (str.length + append.length > len) {
        newLength = len - append.length;
      } else {
        newLength = str.length;
      } // if the length of original string and the appended string is greater than the max length, we need to truncate, otherwise, use the original string

      var tempString = str.substring(0, newLength); // cut the string at the new length
      tempString = tempString.replace(/\s+\S*$/, ''); // find the last space that appears before the substringed text

      if (append.length > 0) {
        tempString += append;
      }
      return tempString;
    },
  },
};
</script>

<style lang="scss" scoped>
  .section-hero {
    @include media-breakpoint-up(md) {
      // min-height: 40vh;
      min-height: 370px;
      // max-height: 100vh;
    }
  }
  .flex-md-row {
    .col-title {
      @include media-breakpoint-up(md) {
        max-width: 66.66%;
      }
    }
  }

  .bg-overlay, .bg-div {
    position:absolute;
    width:100%;
    height:100%;
    z-index:0;
  }
  .bg-div {
    top:0;
    left:0;
  }

  .bg-overlay {
    z-index:1;
  }
  .hero-content {
    z-index: 2;
  }

  .byline {
    position:absolute;
    bottom: map-get($spacers,2);
    right: $spacer;
    z-index: 2;

    font-size: $font-size-sm;
    text-align: right;
  }

  // COLOURS

  .text-light {
    a {
      color: $white;

      &:hover, &:active, &:focus {
        color: $primary;
      }
    }
  }

  .bg-overlay {
    background: $overlay-color;

    .ui-dark & {
      background: $overlay-color-dark;
    }
  }

  .bg-dark {
    &.no-invert, .ui-dark &.no-invert {
      background-color: $dark !important;
    }
  }

</style>
