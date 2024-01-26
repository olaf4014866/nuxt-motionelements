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
      ></font-awesome-icon>
    </button>
    <div class="p-3 bg-white rounded-bottom music-recommend-list">
      <p class="font-weight-bold small">Try with Recommended Music</p>

      <MusicRecommendItem>
        <template slot="title">
          Default Track
        </template>
        <template slot="buttons">
          Not included
        </template>
      </MusicRecommendItem>

      <MusicRecommendItem
        v-for="element in recommendedElements"
        :key="`music-recommended-${element.id}`"
        :element="element"
      ></MusicRecommendItem>
    </div>
  </div>
</template>

<script>
import { elementsMusic } from '@/mock/mockData.js';

export default {
  name: 'music-recommend',
  components: {
    MusicRecommendItem: () => import('@/components/modules/product/preview/MusicRecommendItem.vue'),
  },
  data() {
    return {
      isActive: false,
      recommendedElements: elementsMusic.slice(0, 4),
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
