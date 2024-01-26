<template>
  <span
    v-if="$t(`channel_${currentMediaType}.page_subheading`) !== `channel_${currentMediaType}.page_subheading`"
    v-html="$t(`channel_${currentMediaType}.page_subheading`, {
    product: `<a href='${$siteUrl(`?mt=${currentMediaTypeCode}`).search().url()}'>${$term('mediaType', currentMediaType).seo().html()}</a>`,
    count: `<span class='text-gradient-primary font-weight-bold'>${$t(`total.${currentMediaType}`)}</span>`
  })">
  </span>
</template>

<script>
export default {
  name: 'subheading',
  computed: {
    currentMediaType() {
      const currentMediaType = this.$store.getters['site/currentMediaType'];
      return currentMediaType.id;
    },
    currentMediaTypeCode() {
      const currentMediaType = this.$store.getters['site/currentMediaType'];
      return currentMediaType.code;
    },
  },
};
</script>
