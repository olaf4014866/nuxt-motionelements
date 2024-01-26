<template>
  <div>
    <div v-if="!isIE" class="swiper">
      <swiper ref="highlightsSwiper"
        :options="swiperOptions"
        @ready="handleSwiperComponentReady"
        class="rounded"
      >
        <swiper-slide
          v-for="highlight in highlights"
          :key="`highlight-${highlight.id}`"
        >
          <HomeHighlightsCarouselItem
            :bgImg="highlight.image.url"
            :linkUrl="highlight.html.url"
            :title="highlight.heading"
            :lazyLoad="true"
          >
            <template v-slot:title>{{ highlight.heading }}</template>
            <template v-slot:description>{{ highlight.subheading }}</template>
          </HomeHighlightsCarouselItem>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div
          class="swiper-button-prev swiper-button swiper-button-dark"
          @click="slidePrev"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button swiper-button-dark"
          @click="slideNext"
          slot="button-next"
        ></div>
      </swiper>
    </div>

    <div v-else>
      <HomeHighlightsCarouselFallback
        :highlights="highlights"
      />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

export default {
  name: 'home-highlights-carousel',
  components: {
    Swiper,
    SwiperSlide,

    HomeHighlightsCarouselFallback: () => import('@/views/demo/flickity-alternatives/HomeHighlightsCarouselFallback.vue'),
    HomeHighlightsCarouselItem: () => import('@/views/demo/flickity-alternatives/HomeHighlightsCarouselItem.vue'),
  },
  directives: {
    swiper: directive,
  },
  props: {
    highlights: Array,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 5000,
        },
      },
      swiper: {},
    };
  },
  computed: {
    isIE() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper);
  },
  methods: {
    slideNext() {
      this.swiper.slideNext();
    },
    slidePrev() {
      this.swiper.slidePrev();
    },
    handleSwiperComponentReady() {
      console.log('SwiperComponentReady!');
      this.swiper = this.$refs.highlightsSwiper.$swiper;
    },
  },
};
</script>

<style lang="scss" scoped>
$button-bg: rgba($overlay-color,.75);
$button-bg-dark: rgba($overlay-color-dark,.75);

.swiper-button {
  background: transparent;
  padding: 1rem;
  width: 3rem;
  height: 50%;
  top: 50%;
  transform: translateY(-50%);

  transition: background-color 0.2s ease;
}

.swiper {
  &:hover {
    .swiper-button {
      background: $button-bg;

      .ui-dark & {
        background: $button-bg-dark;
      }
    }
  }
}

.swiper-button-prev {
  left: 0;
  border-top-right-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
}

.swiper-button-next {
  right: 0;
  border-top-left-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
}
</style>
