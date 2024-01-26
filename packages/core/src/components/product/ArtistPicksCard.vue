<template>
  <ProductWrapper
      :value="product.id"
      :element="product"
      :options="{
        cardType: 'list',
        expand: true,
        favorites: false,
        checkbox: false,
        tagsInput: false,
        // new options
        enablePlayer: false,
        hoverEvent: true,
        showFavoritesIcon: false,
        showSimilarIcon: false,
        showMediaTypeBadge: false,
        layoutDetailExpand: false,
        layoutCheckbox: false,
        layoutTagsInput: false,

        // added for artistPicks
        showBadges: false,
        showPrice: false,
        linkUrl: pick.html.url,
      }"
  />
</template>

<script>
export default {
  name: 'product-wrapper-container',
  components: {
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapperContainer.vue'),
  },
  props: {
    pick: {
      type: Object,
      required: true,
    },
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
      return true;
    },
    product() {
      // console.log('pick', this.pick);
      // hack product array for artist pick
      const product = this.pick.items[0];

      product.categories = [];
      product.name = this.pick.heading;

      // @todo need lightbox view before can show artist picks
      return product;
    },
  },
};
</script>
