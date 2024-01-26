<template>
  <div class="d-flex w-100 small align-items-center mb-1">
    <button
      class="btn btn-sm btn-link flex-grow-1 d-flex align-items-center"
      :title="element ? element.name : 'Original Audio Track'"
      @click="playTrack()"
    >
      <font-awesome-icon
        :icon="['fas','play']"
      ></font-awesome-icon>
      <div
        class="flex-grow-1 font-weight-bold ml-3 text-left"
      >
        <template v-if="element">
          {{ truncatedName }}
        </template>
        <template v-if="!element">
          Default Track
        </template>
      </div>
    </button>
    <div
      class="col-4 px-0 text-right"
    >
      <template v-if="element">
        <div class="btn-group btn-group-sm" role="group">
          <a
            href=""
            class="btn btn-outline-secondary"
          >
            <template v-if="element">
              {{ currencySymbol }}{{ element.price }}
            </template>
          </a>
          <button
            type="button"
            class="btn btn-secondary"
            @click="doAddElementsToCart()"
          >
            <font-awesome-icon
              :icon="['far','me-download']"
              size="lg"
            ></font-awesome-icon>
          </button>
        </div>
      </template>
      <template v-if="!element">
        Not included
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-recommend-item',
  props: {
    element: Object,
  },
  computed: {
    currencySymbol() {
      return 'US$';
    },
    truncatedName() {
      const limit = 12;
      if (this.element.name.length <= limit) {
        return this.element.name;
      }
      return `${this.element.name.slice(0, limit)}...`;
    },
  },
  methods: {
    doAddElementToCart() {
      console.log('Add to Cart');
    },
    playTrack() {
      console.log('Swap audio track of video with current track');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
