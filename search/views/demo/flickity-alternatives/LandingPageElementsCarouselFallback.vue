<template>
  <div class="row" ref="rowElements">
    <div
      class="col"
      v-for="element in elements.slice(0,elementsPerRow)"
      :key="`carousel-element-${element.id}`"
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing-page-elements-carousel-ie-fallback',
  components: {
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
  },
  data() {
    return {
      containerWidth: 0,
    };
  },
  props: {
    elements: Array,
    size: {
      type: String,
      default: 'sm',
    },
  },
  computed: {
    maxElementWidth() {
      switch (this.size) {
        case 'lg':
          return 368;
        default:
          return 256;
      }
    },
    elementsPerRow() {
      if (this.containerWidth < 576) {
        return 2;
      }

      const spacer = 16;
      return Math.ceil(this.containerWidth / (this.maxElementWidth + spacer * 2));
    },
  },
  mounted() {
    this.updateContainerWidth();
    window.addEventListener('resize', this.updateContainerWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateContainerWidth);
  },
  methods: {
    updateContainerWidth() {
      console.log('test');
      if (this.$refs.rowElements) {
        this.containerWidth = this.$refs.rowElements.clientWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
