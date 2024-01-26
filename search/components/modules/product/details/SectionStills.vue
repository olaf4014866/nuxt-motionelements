<template>
  <div class="row">
    <a
      v-for="(url, index) in getAvgThumbnails(element.thumbnails.jpgs.urls)"
      :key="`still-${index}`"
      class="col-4 mb-3"
    >
      <!-- @click="stillClick(index)" -->
      <img
        class="img-fluid rounded"
        :src="url"
        :alt="`${element.name} - ${index + 1}`"
      />
    </a>

    <div class="modal fade" id="modal-still" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ element.name}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="this.previewUrl"
              class="d-block img-fluid mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
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
      if (jpgs.length > 9) {
        const jpgArr = [];
        const avg = jpgs.length / 9;
        for (let i = 0; i < avg.toFixed(0); i += 1) {
          jpgArr.push(jpgs[(avg * i).toFixed(0)]);
        }
        return jpgArr.slice(0, 9);
      }
      return jpgs.slice(0, 9);
    },
    stillClick(index) {
      let url = this.element.thumbnails.jpgs.urls[index];

      // https://d31l02nbp0owar.cloudfront.net/m/t/10321/10311848/f-118941-0154.jpg?v=1552546767 needs to become
      // https://d25thuhsbcr6yb.cloudfront.net/m/s/10321/10311848/f-118941-0154.jpg?v=1552546767
      // url = url.replace('/m/t/', '/m/s/');

      url = url.split('/m/t/');
      this.previewUrl = `https://d25thuhsbcr6yb.cloudfront.net/m/s/${url[1]}`;
      this.$root.$emit('show-modal', 'still-preview', this.previewUrl);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
