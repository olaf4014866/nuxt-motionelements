<template>
  <div class="d-flex flex-column flex-lg-row align-items-md-stretch mx-n3">
    <div class="col mb-3 mb-lg-0">
      <div class="rounded overflow-hidden position-relative">
        <FlickityWrapper :flickityOptions="{wrapAround:true,autoPlay:5000}" v-if="isShow">
          <FlickityHighlight v-for="highlight in highlights" :key="highlight.id" :bgImg="highlight.image.url" :linkUrl="highlight.url" :title="highlight.heading">
            <template v-slot:title>{{ highlight.heading }}</template>
            <template v-slot:description>{{ highlight.subheading }}</template>
          </FlickityHighlight>
        </FlickityWrapper>
      </div>
    </div>
    <div class="col-12 col-lg-4 d-flex flex-row flex-lg-column align-items-stretch justify-content-between">
      <a
        v-for="featuredItem in featured"
        :key="featuredItem.id"
        :href="featuredItem.linkUrl"
        class="btn-featured-banner d-block flex-grow-1 bg-light rounded overflow-hidden d-flex align-items-center justify-content-center position-relative"
        :style="featuredItem.bgImg ? `background-image: url('${featuredItem.bgImg}');background-size:cover;background-position:center`: ''"
      >
        <img :src="`${featuredItem.imgPrefix}-${imgLang}${featuredItem.imgVer ? `-${featuredItem.imgVer}` : ''}.${ isIE ? 'png' : 'svg'}`" class="img-fluid w-100">
      </a>
      <!-- <a href="#" class="rounded overflow-hidden d-block">
        <img
          src="https://static.motionelements.com/img/banners/featured/banner-1348-subscription-ja-5c79186f30c85-360x120.png"
          alt="Subscription-ja"
          class="img-fluid">
      </a>
      <a href="#" class="rounded overflow-hidden d-block">
        <img
          src="https://static.motionelements.com/img/banner/free/latest-free-1903-ja-576.png"
          alt="無料動画素材"
          class="img-fluid">
      </a> -->
    </div>
  </div>
</template>

<script>

import FlickityWrapper from '@/components/modules/common/FlickityWrapper.vue';
import FlickityHighlight from '@/components/modules/common/flickity/FlickityHighlight.vue';

export default {
  name: 'section-highlights',
  props: {
    // highlights: Array,
    featured: Array,
  },

  components: {
    // Flickity,
    FlickityWrapper,
    FlickityHighlight,
  },
  computed: {
    imgLang() {
      const lang = this.$store.getters['site/currentLanguage'];
      if (lang === 'ja' || lang === 'ko' || lang === 'zh-hant') {
        return lang;
      }
      return 'en';
    },
    isIE() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
  },
  created: function () {
    const lang = this.$store.getters['site/currentLanguage'];
    this.$api.getChannelBanners(lang).then((data) => {
      this.highlights = data;
      this.isShow = true;
    });
  },
  data() {
    return {
      isShow: false,
      highlights: [],
    };
  },
  methods: {
    getBgImgUrl(url) {
      // eslint-disable-next-line
      return url ? require(`@/assets/img/banners/${url}`) : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-cell {
  .carousel-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    padding-left: 4rem;
    padding-right: 4rem;

    @include media-breakpoint-down(sm) {
      padding-left: 3rem;
      padding-right: 3rem;
    }

    h3 {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      text-align: center;

      @include media-breakpoint-down(sm) {
        font-size: 1rem;
        line-height: 1.25;
      }

      &:before, &:after {
        content: '';
        border-top: $hr-border-width solid $primary;
        margin: 0 $spacer 0 0;
        flex: 1 0 $spacer;
      }

      &:after {
        margin: 0 0 0 $spacer;
      }
    }

    p {
      @include media-breakpoint-down(sm) {
        font-size: .75rem;
        line-height: 1.5;
      }
    }
  }
}

.btn-featured-banner {
  &:not(:last-child) {
    @include media-breakpoint-up(lg) {
      margin-bottom: $spacer;
    }
    @include media-breakpoint-down(md) {
      margin-right: $spacer;
    }
  }
}

// COLOURS
.bg-overlay {
  background: $overlay-color;

  .ui-dark & {
    background: $overlay-color-dark;
  }
}
</style>
