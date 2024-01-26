<template>
  <div class="w-100 d-flex flex-column align-items-stretch">
    <div class="w-100">
      <div class="overflow-hidden preview-wrapper mx-auto">
        <PlayerVideo
          :previews="this.element.previews"
        ></PlayerVideo>
      </div>
    </div>

    <div
      v-if="element.thumbnails.jpgs && element.thumbnails.jpgs.urls.length > 1"
      class="flickity-thumbs"
    >

      <flickity
        ref="flickityThumbs"
        :options="this.flickityThumbOptions"
      >
        <a
          v-for="(url, index) in element.thumbnails.jpgs.urls"
          :key="`thumbnail-${index}`"
          class="carousel-cell col-4 col-md-4 col-xl-3 px-1 py-2"
        >
          <img
            class="img-fluid rounded"
            :src="url"
          />
        </a>
      </flickity>

    </div>
  </div>
</template>

<script>
// import Flickity from 'vue-flickity';
// import 'flickity-imagesloaded';
// import 'flickity-fade';
import PlayerVideo from '@/components/modules/product/preview/players/PlayerVideo.vue';

export default {
  name: 'small-preview-gif',
  data() {
    return {
      isMounted: false,
      selectedIndex: 0,
      flickityThumbOptions: {
        cellAlign: 'center',
        groupCells: true,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
    };
  },
  props: {
    element: Object,
  },
  components: {
    PlayerVideo,
    // Flickity,
  },
  computed: {
    flickityThumbCarousel() {
      if (!this.isMounted) {
        return;
      }
      return this.$refs.flickityThumbs;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    getLargePreview(thumbUrl) {
      // example thumbUrl:   https://d31l02nbp0owar.cloudfront.net/m/t/10/49860/a-0005.jpg
      // example previewUrl: https://d25thuhsbcr6yb.cloudfront.net/m/s/10/49860/a-0005.jpg
      const url = thumbUrl.split('/m/t/');
      return `https://d25thuhsbcr6yb.cloudfront.net/m/s/${url[1]}`;
    },
    selectIndex(num) {
      this.selectedIndex = num;
      this.flickityThumbCarousel.select(this.selectedIndex);
      // this.flickityPreviewCarousel.select(this.selectedIndex);
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
  watch: {
    element: function () {
      this.$nextTick(() => {
        this.flickityThumbCarousel.rerender();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-wrapper {
  max-width: 40rem;
  max-height: 22.5rem;
}

.flickity-thumbs::v-deep {
  .carousel-cell {
    img {
      @include box-shadow($box-shadow-sm);
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        @include box-shadow($box-shadow);
      }
    }
  }
}
</style>
