<template>
  <div
    class="d-flex flex-column music-recommend-wrapper w-100"
  >
    <button
      type="button"
      class="btn btn-light btn-sm btn-toggle-recommend"
      @click="toggleList()"
    >
      <font-awesome-icon
        :icon="['fal','music']"
        size="lg"
        fixed-width
        class="mr-2"
      ></font-awesome-icon>
      Try with Recommended Music
    </button>
    <div ref="recList" class="collapse">
      <div class="p-3 bg-white rounded-bottom music-recommend-list">
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
      const recList = this.$refs.recList;
      this.isActive = !this.isActive;

      if (this.isActive) {
        $(recList).collapse('show');
      } else {
        $(recList).collapse('hide');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
