<template>
  <div class="row">
    <a
      v-for="(url, index) in getAvgThumbnails(element.thumbnails.jpgs)"
      :key="`still-${index}`"
      class="col-4 mb-3"
      @click="onClick(url.url)"
    >
      <img
        class="img-fluid rounded"
        v-lazy="url.url"
        :alt="`${element.name} - ${index + 1}`"
      />
    </a>

  </div>
</template>

<script>
export default {
  name: 'stills-section',
  data() {
    return {
      previewUrl: '',
    };
  },
  props: {
    element: Object,
  },
  methods: {
    getAvgThumbnails(jpgs) {
      if (jpgs.length > 18) {
        const jpgArr = [];
        const avg = jpgs.length / 9;
        for (let i = 0; i < avg.toFixed(0); i += 1) {
          jpgArr.push(jpgs[(avg * i).toFixed(0)]);
        }
        return jpgArr.slice(0, 9);
      }
      return jpgs.slice(0, 9);
    },
    onClick(url) {
      this.previewUrl = '';
      // https://d31l02nbp0owar.cloudfront.net/m/t/10321/10311848/f-118941-0154.jpg?v=1552546767 needs to become
      // https://d25thuhsbcr6yb.cloudfront.net/m/s/10321/10311848/f-118941-0154.jpg?v=1552546767
      // url = url.replace('/m/t/', '/m/s/');
      const showUrl = url.split('/m/t/');
      this.previewUrl = `https://d25thuhsbcr6yb.cloudfront.net/m/s/${showUrl[1]}`;

      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/product/modals/HighResStillPreview.vue'),
        }),
        props: {
          element: this.element,
          highResStillUrl: this.previewUrl,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
