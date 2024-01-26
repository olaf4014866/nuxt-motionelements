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
      {{ $t('product.try_with_recommended_music') }}
    </button>
    <div ref="recList" class="collapse">
      <div class="p-3 bg-white rounded-bottom music-recommend-list">
        <MusicRecommendItem>
          <template slot="title">
            {{ $t('product.default_track') }}
          </template>
          <template slot="buttons">
            {{ $t('product.not_included') }}
          </template>
        </MusicRecommendItem>

        <MusicRecommendItem
          v-for="element in elements"
          :key="`music-recommended-${element.id}`"
          :element="element"
        ></MusicRecommendItem>
      </div>
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
