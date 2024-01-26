<template>
  <div class="position-relative">
    <FlickityWrapper :flickityOptions="{wrapAround:true,autoPlay:5000}" :padding="true">
      <div class="carousel-cell w-100">
        <div class="d-flex flex-column flex-md-row align-items-center">
          <div class="col-12 col-md-6">
            <a :href="$site('https://www.motionelements.com/blog/articles/gifs-in-facebook-promotions').url()">
              <div>
                <h2 class="h5">{{ $t('channel_image.learn_facebook_heading') }}</h2>
                <p class="small" v-html="$t('channel_image.learn_use_gifs_in_{media}', {'media': $t('channel_image.fb_promo_posts')})"></p>
              </div>
            </a>
          </div>
          <div class="col-12 col-md-6 device-container overflow-hidden position-relative">
            <div class="position-absolute w-100 h-100">
              <div class="device-wrapper w-50 position-absolute">
                <div class="device" data-device="iPhone5" data-orientation="portrait" data-color="black">
                  <div class="screen">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/fb-frame-carousel.gif">
                  </div>
                </div>
              </div>
              <div class="device-wrapper w-50 position-absolute position-right">
                <div class="device" data-device="iPhone5" data-orientation="portrait" data-color="white">
                  <div class="screen">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/fb-frame-post.gif">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-cell w-100">
        <div class="d-flex flex-column flex-md-row-reverse align-items-center">
          <div class="col-12 col-md-6">
            <a :href="$site('https://www.motionelements.com/blog/articles/gifs-digital-media').url()">
              <div>
                <h2 class="h5">{{ $t('channel_image.learn_digital_media_heading') }}</h2>
                <p class="small" v-html="$t('channel_image.learn_use_gifs_in_{media}', {'media': $t('channel_image.digital_media')})"></p>
              </div>
            </a>
          </div>
          <div class="col-12 col-md-6 device-container overflow-hidden position-relative">
            <div class="position-absolute w-100 h-100">
              <div class="device-wrapper imac position-absolute position-center">
                <div class="device" data-device="iMac" data-orientation="portrait" data-color="black">
                  <div class="screen overflow-hidden">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/blog-archive.gif">
                  </div>
                </div>
              </div>
              <div class="device-wrapper imac position-absolute position-bottom position-right w-50">
                <div class="device" data-device="iMac" data-orientation="portrait" data-color="black">
                  <div class="screen overflow-hidden">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/blog-archive.jpg">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-cell w-100">
        <div class="d-flex flex-column flex-md-row align-items-center">
          <div class="col-12 col-md-6">
            <a href="https://www.motionelements.com/blog/articles/gifs-in-social-media-blog-posts">
              <div>
                <h2 class="h5">{{ $t('channel_image.learn_sns_heading') }}</h2>
                <p class="small" v-html="$t('channel_image.learn_use_gifs_in_{media}', {'media': $t('channel_image.article_posts')})"></p>
              </div>
            </a>
          </div>
          <div class="col-12 col-md-6 device-container overflow-hidden position-relative">
            <div class="position-absolute w-100 h-100">
              <div class="device-wrapper macbook position-absolute position-center">
                <div class="device" data-device="MacbookPro" data-orientation="portrait" data-color="black">
                  <div class="screen overflow-hidden">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/blog-post.gif">
                  </div>
                </div>
              </div>
              <div class="device-wrapper macbook position-absolute position-bottom position-right w-50">
                <div class="device" data-device="MacbookPro" data-orientation="portrait" data-color="black">
                  <div class="screen overflow-hidden">
                    <img class="img-fluid" src="https://static.motionelements.com/img/gif/blog-post.jpg">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlickityWrapper>
  </div>
</template>

<script>
import FlickityWrapper from '@/components/modules/common/FlickityWrapper.vue';

export default {
  name: 'section-highlights-carousel',
  props: {
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
  components: {
    FlickityWrapper,
  },
  created: function () {
  },
  data() {
    return {
    };
  },
  methods: {
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

.device-container {
  padding-bottom: 56.25%;
}

.device-wrapper {
  &.position-right {
    right: $spacer
  }

  &.position-center {
    top: 50%;
    transform: translateY(-50%);
  }

  &.position-bottom {
    bottom: 0;
  }
}

.device-wrapper {
  &:first-child {
    z-index:0;
  }
  &:last-child {
    z-index:1;
  }
  &.imac {
    &:first-child {
      @include media-breakpoint-up(sm) {
        width: 90%;
      }
      @include media-breakpoint-up(xs) {
        width: 60%;
      }
    }

    &:last-child {
      @include media-breakpoint-up(md) {
        bottom: $spacer * 2;
      }
    }
  }
  &.macbook {
    &:first-child {
      @include media-breakpoint-up(sm) {
        width: 90%;
      }
      @include media-breakpoint-up(xs) {
        width: 60%;
      }
    }
    &:last-child {
      @include media-breakpoint-up(md) {
        bottom: $spacer * 4;
      }
    }
  }
}
</style>
