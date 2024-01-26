<template>
  <ProductWrapper
    :element="element"
    :value="element.id"
    :options="normalizedOptions"
    :tags="tags"
    :class="isLargeCard ? 'product-wrapper-container-lg' : 'product-wrapper-container' "
  />
</template>

<script>
export default {
  name: 'product-wrapper-container',
  components: {
    ProductWrapper: () => import('./ProductWrapper.vue'),
  },
  props: {
    element: Object,
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    options: Object,
  },
  computed: {
    normalizedOptions() {
      return Object.assign({
        cardType: 'card',
        // cardType: 'list', // only accepts 'list' on audio mediatype

        expand: true,
        favorites: true,
        checkbox: false,

        tagsInput: false,
        fullWidth: false,
        customWidth: true,

        hoverEvent: true,
        enablePlayer: true,

        showMediaTypeBadge: false,
      }, this.options);
    },
    isElement() {
      return _.get(this.element, 'object') === 'element';
    },
    isCollection() {
      return _.get(this.element, 'object') === 'collection';
    },
    mediaType() {
      // @deprecated fallback to 'media_type'
      return _.get(this.element, 'mediaType', _.get(this.element, 'media_type'));
    },
    isLargeCard() {
      if (this.isCollection) {
        return true;
      }

      const largeCardType = [
        'ae_template',
        'ae_preset',
        'pr_template',
        'pr_preset',
        'mg_template',
        'resolve_template',
        'resolve_macro',
        'motion_template',
        'music',
        'sfx',
      ];

      return largeCardType.includes(this.mediaType);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-wrapper-container {
  @include product-wrapper-container;
}

.product-wrapper-container-lg {
  @include product-wrapper-container-lg;
}
</style>
