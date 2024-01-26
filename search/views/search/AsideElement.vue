<template>
  <div>

    <div class="bg-gradient-free p-2">
      <h3 class="h6 mb-0 text-center">
        {{ $t('search.paid_elements_you_may_like') }}
      </h3>
    </div>

    <div class="position-relative px-0 px-md-3 py-3">

      <!-- IF IS PHONE, USE CAROUSEL -->
      <template v-if="isMobileLayout">
        <template v-if="!isLoadingSearch">

          <FlickityWrapper
            :padding="true"
            :flickityOptions="{
              contain: true,
              wrapAround: false,
              groupCells: true,
              cellAlign: 'center',
            }"
          >

            <ProductWrapper
              v-for="element in asideElements"
              :key="`item-${element.id}`"
              :value="element.id"
              :element="element"
              :options="{
                cardType: 'card',
                expand: true,
                favorites: true,
                enablePlayer: true,
                hoverEvent: true,
              }"
            />

            <!--
            <template v-if="isLoadingSearch">
              <ElementCardLoader v-for="n in 6" :key="`elements-paid-${n}`"></ElementCardLoader>
            </template>
            -->

          </FlickityWrapper>

        </template>

      </template>

      <!-- Desktop mode -->
      <template v-if="!isMobileLayout">
        <!-- IF NOT, DISPLAY NORMAL WITH .w-100 -->

        <template v-if="!isLoadingSearch">
          <ProductWrapper
            class="w-100"
            v-for="element in asideElements"
            :key="`item-${element.id}`"
            :value="element.id"
            :element="element"
            :options="{
              cardType: 'card',
              expand: false,
              favorites: true,
              enablePlayer: true,
              hoverEvent: true,
            }"
          />
        </template>

        <template v-if="isLoadingSearch">
          <ElementCardLoader v-for="n in 6" :key="`elements-paid-${n}`" class="w-100" />
        </template>

      </template>

    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'aside-element',
  components: {
    FlickityWrapper: () => import('@/components/modules/common/FlickityWrapper.vue'),
    ElementCardLoader: () => import('@/components/modules/common/ElementCardLoader.vue'),
    // ProductWrapper: () => import('frontend-modules/shared/modules/common/product/ProductWrapper.vue'),
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
  },
  computed: {
    ...mapState({
      isLoadingSearch: state => state.site.loadingSearch.status,
      filters: state => state.search.filter,
    }),
    ...mapGetters({
      elements: 'search/allSearchAsideElements',
    }),
    isMobileLayout() {
      const currentWindowWidth = this.$store.getters['site/windowWidth'];

      let status = false;
      if (currentWindowWidth < 768) {
        status = true;
      }

      return status;
    },
    isAudioLayout() {
      const currentMediaType = this.$store.getters['site/currentMediaType'];

      let status = false;
      if (currentMediaType.isAudio) {
        status = true;
      }

      return status;
    },
    asideElements() {
      return this.elements;
    },

  },
};
</script>

<style lang="scss" scoped>
</style>
