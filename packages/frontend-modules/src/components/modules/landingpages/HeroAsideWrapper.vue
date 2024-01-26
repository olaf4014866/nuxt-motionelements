<template>
  <div class="row d-flex flex-column flex-lg-row">
    <div
      class="section-hero col-12 col-lg-4 col-xl-3 px-0"
      :style="getBackgroundStyles"
    >
      <div class="hero-content px-3">
        <div v-if="bgImage && bgImage.artist" class="hero-bg-gradient-overlay position-absolute w-100 h-100"></div>
        <div>
          <slot name="hero">
          </slot>
        </div>
        <div v-if="bgImage && bgImage.artist" class="byline mt-3">
          <a :href="bgImage.url" :title="bgImage.name">{{ bgImage.name.length > 20 ? truncateString(bgImage.name, 20, '...') : bgImage.name}}</a> ・ <a :href="$siteUrl(`/artists/${(bgImage.artist.username).toLowerCase()}`).www().url()">{{ bgImage.artist.username }}</a>
        </div>
      </div>
    </div>
    <div class="section-content col py-3">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dynamic-landing-page-wrapper',
  props: {
    bgImage: Object,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    getBackgroundStyles() {
      if (this.bgImage && this.bgImage.previews.jpg.url) {
        let url = this.bgImage.previews.jpg.url;

        if (url.includes('.imgix.') || url.includes('static.moele.me')) {
          url = `${url}?duotone=${this.imageDuotoneFilter[0]}%2C${this.imageDuotoneFilter[1]}&duotone-alpha=100`;
        }
        return `background-image: url('${url}');`;
      }
      return '';
    },
    imageDuotoneFilter() {
      return this.isDarkMode ? ['242729', '484e51'] : ['aeb4b7', 'fdfdfd'];
    },
  },
  methods: {
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
    toggleDarkMode(bool) {
      this.isDarkMode = bool;
    },
  },
  mounted() {
    const cookieSiteUI = this.$cookies.get('ME_SITE_UI_MODE');
    if (cookieSiteUI === 'dark') {
      this.toggleDarkMode(true);
    }

    // add Dark mode event detect
    this.$root.$on('darkMode', (bool) => {
      this.toggleDarkMode(bool);
    });
  },
};
</script>

<style lang="scss" scoped>
// SET HEIGHT
@include media-breakpoint-up(lg) {
  .section-content {
    height: auto;
    min-height: 100vh;
  }
  .section-hero {
    max-height: 100vh;
    overflow-y: auto;
  }
}

// SET .SECTION-HERO BACKGROUND STYLES

.section-hero {
  @include media-breakpoint-down(md) {
    background-size: cover;
    background-position:center;
  }
  @include media-breakpoint-up(lg) {
    background-size: auto 50%;
    background-position: top center;
    background-repeat: no-repeat;
  }
}

.hero-bg-gradient-overlay {
  top:0;
  left:0;
  z-index:-1;
}

// SET HERO TO STICKY TOP ON DESKTOP ONLY

.section-hero {
  z-index: $zindex-sticky;

  @include media-breakpoint-up(lg) {
    @supports (position: sticky) {
      position: sticky;
      top: 0;
    }
  }
}

// STYLE AND POSITION BACKGROUND IMAGE BYLINE

.byline {
  font-size: $font-size-sm;
  text-align: right;
  margin-bottom: $spacer;
}

// RESTYLE HERO SCROLLBAR
@include media-breakpoint-up(lg) {
  .section-hero {
    &::-webkit-scrollbar {
      background: $light;
      width: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      border: .25rem solid $transparent;
      background-clip: padding-box;
      border-radius: .5rem;
      background-color: map-get(map-get($theme-colors-variants,"light"),"-1");
      // box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    }
    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
}

// COLORS

.hero-bg-gradient-overlay {
  background: linear-gradient(
    180deg,
    rgba($body-bg,0) 0%,
    rgba($body-bg,0) 16.6667%,
    rgba($body-bg,1) 50%);

  .ui-dark & {
    background: linear-gradient(
      180deg,
      rgba($body-bg-dark,0) 0%,
      rgba($body-bg-dark,0) 16.6667%,
      rgba($body-bg-dark,1) 50%);
  }

  @include media-breakpoint-down(md) {
    background: linear-gradient(
      180deg,
      rgba($body-bg,0) 0%,
      rgba($body-bg,0) 33.3333%,
      rgba($body-bg,1) 100%);

    .ui-dark & {
      background: linear-gradient(
        180deg,
        rgba($body-bg-dark,0) 0%,
        rgba($body-bg-dark,0) 33.3333%,
        rgba($body-bg-dark,1) 100%);
    }
  }
}

</style>
