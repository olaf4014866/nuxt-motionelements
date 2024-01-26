<template>
  <div class="d-flex flex-column flex-lg-row align-items-md-stretch mx-n3">
    <div class="col mb-3 mb-lg-0">
      <SectionHighlightsImageCarousel />
      <!-- <div class="position-relative">
        <FlickityWrapper :flickityOptions="{wrapAround:true,autoPlay:5000}" :padding="true">
          <div class="carousel-cell w-100">
            <div class="d-flex flex-column flex-md-row align-items-center">
              <div class="col-12 col-md-6">
                <a :href="$site('https://www.motionelements.com/blog/articles/gifs-in-facebook-promotions').url()">
                  <div>
                    <h2 class="h5">{{ $t('channel_image.grab_follower') }}</h2>
                    <p class="small" v-html="$t('channel_image.use_gifs')"></p>
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
                    <h2 class="h5">{{ $t('channel_image.content_shine') }}</h2>
                    <p class="small" v-html="$t('channel_image.use_in_digital')"></p>
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
                    <h2 class="h5">{{ $t('channel_image.get_message') }}</h2>
                    <p class="small" v-html="$t('channel_image.article_posts')"></p>
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
      </div> -->
    </div>
    <div class="col-12 col-lg-4 d-flex flex-row flex-lg-column align-items-stretch justify-content-between">
      <a
        v-for="featuredItem in featured"
        :key="featuredItem.id"
        :href="featuredItem.linkUrl"
        class="btn-featured-banner d-block flex-grow-1 bg-light rounded overflow-hidden d-flex align-items-center justify-content-center position-relative shadow-sm"
        :style="featuredItem.bgImg ? `background-image: url('${featuredItem.bgImg}');background-size:cover;background-position:center`: ''"
      >
        <img :src="`${featuredItem.imgPrefix}-${imgLang}${featuredItem.imgVer ? `-${featuredItem.imgVer}` : ''}.${ isIE ? 'png' : 'svg'}`" class="img-fluid w-100">
      </a>
      <!-- <a
        class="btn-featured-banner flex-grow-1 bg-gradient-subscription rounded position-relative p-3 d-flex align-items-center"
      >
        <div class="btn-featured-banner-content flex-grow-1">
          <h3 class="h5">{{ $t('channel_image.image_sub_plan') }} <i class="fas me-bmt icon-lightning"></i></h3>
          <p class="text-right"><a :href="$siteUrl('/subscribe?type=image').www().url()"><span class="btn btn-sm btn-white-primary">{{ $t('cta.learn_more') }}</span></a></p>
        </div>
      </a>
      <a
        class="btn-featured-banner flex-grow-1 bg-gradient-free rounded position-relative p-3 d-flex align-items-center"
      >
        <div class="btn-featured-banner-content flex-grow-1">
          <h3 class="h5">{{ $t('channel_image.free_gifs') }}</h3>
          <p class="text-right"><a :href="$siteUrl('/free/gifs').www().url()"><span class="btn btn-sm btn-white-secondary">{{ $t('cta.download_now') }}</span></a></p>
        </div>
      </a> -->
    </div>
  </div>
</template>

<script>
// import FlickityWrapper from '@/components/modules/common/FlickityWrapper.vue';
import SectionHighlightsImageCarousel from '@/components/modules/landingpages/SectionHighlightsImageCarousel.vue';

export default {
  name: 'section-highlights',
  props: {
    featured: Array,
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
    // FlickityWrapper,
    SectionHighlightsImageCarousel,
  },
  created: function () {
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
.btn-featured-banner {
  &:not(:last-child) {
    // margin-bottom: $spacer;
    @include media-breakpoint-up(lg) {
      margin-bottom: $spacer;
    }
    @include media-breakpoint-down(md) {
      margin-right: $spacer;
    }
  }

  .btn-featured-banner-content {
    p:last-child {
      margin-bottom: 0;
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
