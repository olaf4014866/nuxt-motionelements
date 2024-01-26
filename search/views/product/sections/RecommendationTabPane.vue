<template>

  <div
    class="tab-pane show active"
    role="tabpanel"
  >
    <ProductWrapper
      :class="['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'card-element-recommended-music' : 'card-element-recommended'"
      v-for="element in elements"
      :key="element.id"
      :value="element.id"
      :element="element"
      :options="{
          cardType: ['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'list' : 'card',
          expand: true,
          favorites: false,
          checkbox: false,
          tagsInput: false,
          // new options
          enablePlayer: true,
          hoverEvent: true,
          showFavoritesIcon: false,
          showSimilarIcon: false,
          showMediaTypeBadge: false,
          layoutDetailExpand: false,
          layoutCheckbox: false,
          layoutTagsInput: false,
        }"
    />
  </div>

</template>


<script>
import { mapState } from 'vuex';

export default {
  name: 'product-recommendations',
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapperContainer.vue'),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      member: state => state.member,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
  },
  mounted() {
  },
  methods: {
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.btn-keywords {
  &:not(:last-child) {
    margin-right: map-get($spacers, 1)
  }
}

.pre-formatted {
  white-space: pre-wrap;
}

// // SIZING RECOMMENDED ELEMENTS

// .card-element-recommended {
//   width: 100%;

//   @include media-breakpoint-between(sm,lg) {
//     width: calc(50% - #{$spacer}) !important;
//   }

//   @include media-breakpoint-up(xl) {
//     width: calc(33% - #{$spacer}) !important;
//   }
// }
</style>
