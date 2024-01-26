<template>
  <a
    :href="`https://www.motionelements.com/artist/element/edit?sku=${element.id}`"
    class="thumbnail-wrapper embed-responsive embed-responsive-16by9"
  >
    <img
      class="thumbnail-img img-fluid rounded"
      :src="element.thumbnails.jpg.url"
    />
  </a>
</template>

<script>
export default {
  name: 'element-thumbnail-mini',
  props: {
    element: Object,
  },
};
</script>

<style lang="scss" scoped>
.thumbnail-wrapper {
  width: 48px;

  .thumbnail-img {
    position:absolute;
    top:50%;
    left:50%;
    right:0;
    bottom:0;
    max-width: 100%;
    max-height:100%;
    margin: 0 auto;
    transform: translate(-50%,-50%);
  }
}
</style>
