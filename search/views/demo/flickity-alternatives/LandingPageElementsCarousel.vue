<template>
  <div>
    <div
      v-if="!isIE"
      class="swiper"
      :class="{ 'swiper-lg': size === 'lg'}"
    >
      <swiper ref="elementSwiper"
        :options="swiperOptions"
        class="mx-6"
        @ready="handleSwiperComponentReady"
      >
        <swiper-slide
          v-for="element in elements"
          :key="`swiper-element-${element.id}`"
        >
          <ProductWrapper
            :value="element.id"
            :element="element"
            :options="{
              cardType: 'card',
              expand: true,
              checkbox: false,
              tagsInput: false,

              favorites: true,

              hoverEvent: true,
              enablePlayer: true,

              showMediaTypeBadge: true,
            }"
            class="w-100"
          />
        </swiper-slide>
      </swiper>
      <div
        class="swiper-button-prev swiper-button swiper-button-dark"
        :class="{ 'swiper-button-disabled': disablePrev }"
        :disabled="disablePrev"
        @click="slidePrev"
      ></div>
      <div
        class="swiper-button-next swiper-button swiper-button-dark"
        :class="{ 'swiper-button-disabled': disableNext }"
        :disabled="disableNext"
        @click="slideNext"
      ></div>
    </div>

    <template v-else>
      <LandingPageElementsCarouselFallback
        :elements="elements"
        :size="size"
      />
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

export default {
  name: 'landing-page-elements-carousel',
  components: {
    Swiper,
    SwiperSlide,

    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
    LandingPageElementsCarouselFallback: () => import('@/views/demo/flickity-alternatives/LandingPageElementsCarouselFallback.vue'),
  },
  directives: {
    swiper: directive,
  },
  props: {
    elements: Array,
    size: {
      type: String,
      default: 'sm',
    },
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 16,
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
    disablePrev() {
      return this.swiper.isBeginning;
    },
    disableNext() {
      return this.swiper.isEnd;
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
      this.swiper = this.$refs.elementSwiper.$swiper;
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: calc(75% - 1rem);

  @include media-breakpoint-only(sm) {
    width: calc(50% - 1rem);
  }
  @include media-breakpoint-only(md) {
    width: calc(33.33% - 1rem);
  }
  @include media-breakpoint-up(lg) {
    width: calc(25% - 1rem);
  }
}

.swiper-lg {
  .swiper-slide {
    width: 100%;

    @include media-breakpoint-up(sm) {
      width: calc(50% - 1rem);
    }
    @include media-breakpoint-up(lg) {
      width: calc(33.33% - 1rem);
    }
    // @include media-breakpoint-up(lg) {
    //   width: calc(25% - 1rem);
    // }
  }
}
</style>
