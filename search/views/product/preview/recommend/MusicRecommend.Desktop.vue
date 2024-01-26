<template>
  <div
    class="d-flex music-recommend-wrapper"
    :class="{ active: isActive }"
  >
    <button
      type="button"
      class="btn btn-light btn-toggle-recommend"
      @click="toggleList()"
    >
      <font-awesome-icon
        :icon="['fal','music']"
        size="lg"
        fixed-width
      />
    </button>
    <div class="p-3 bg-white rounded-bottom music-recommend-list">
      <p class="font-weight-bold small">{{ $t('product.try_with_recommended_music') }}</p>

      <MusicRecommendItem
        :isDefaultTrack="true"
      />
      <MusicRecommendItem
        v-for="element in elements"
        :key="`music-recommended-${element.id}`"
        :element="element"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-recommend',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    MusicRecommendItem: () => import('@/views/product/preview/recommend/MusicRecommendItem.vue'),
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleList() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
$list-width: 20rem;

.music-recommend-wrapper {
  @include media-breakpoint-up(xl) {
    position:absolute;
    top:50%;
    right:0;
    transform: translateX(#{$list-width + $spacer}) translateY(-50%);
    transition: transform .2s ease-in-out, box-shadow 0.2s ease-in-out;
    @include box-shadow($box-shadow-sm);

    &.active {
      transform: translateX(#{$spacer}) translateY(-50%);
    }

    &:hover {
      @include box-shadow($box-shadow);
    }
  }
}

.btn-toggle-recommend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-width: 0 !important;
}

.music-recommend-list {
  width: $list-width;
}
</style>
