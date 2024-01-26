<template>
  <div class="bg-light lt">
    <transition name="fade" mode="out-in" :duration="200">
      <template
        v-for="(highlight, index) in highlights"
      >
        <div
          v-if="index == activeNumber"
          :key="`highlight-${highlight.id}`"
          class="position-relative rounded overflow-hidden"
          @mouseover="stopRotation"
          @mouseout="startRotation"
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
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'home-highlights-carousel-ie-fallback',
  components: {
    HomeHighlightsCarouselItem: () => import('@/views/demo/flickity-alternatives/HomeHighlightsCarouselItem.vue'),
  },
  data() {
    return {
      activeNumber: 0,
      timer: null,
    };
  },
  props: {
    highlights: Array,
  },
  mounted() {
    this.startRotation();
  },
  methods: {
    startRotation() {
      this.timer = setInterval(() => {
        this.next();
      }, 5000);
    },
    stopRotation() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    next() {
      if (this.activeNumber >= this.highlights.length - 1) {
        this.activeNumber = 0;
      } else {
        this.activeNumber += 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
