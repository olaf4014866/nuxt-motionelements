<template>
  <div class="w-100 d-flex flex-column">
    <div
      class="flickity-preview"
      @mouseenter="pauseThumbCarousel"
      @mouseleave="unpauseThumbCarousel"
    >
      <flickity
        ref="flickityPreview"
        :options="flickityPreviewOptions"
      >
        <div
          v-for="(url, index) in element.thumbnails.jpgs.urls"
          :key="`preview-${index}`"
          class="carousel-cell col-12 p-0"
        >
          <img
            class="img-fluid rounded"
            :src="getLargePreview(url)"
          />
        </div>
      </flickity>
    </div>

    <div
      v-if="element.thumbnails.jpgs && element.thumbnails.jpgs.urls.length > 1"
      class="flickity-thumbs"
      @mouseleave="mouseleaveThumbs()"
    >

      <flickity
        ref="flickityThumbs"
        :options="flickityThumbOptions"
      >
        <a
          v-for="(url, index) in element.thumbnails.jpgs.urls"
          :key="`thumbnail-${index}`"
          class="carousel-cell col-4 col-md-4 col-xl-3 px-1 py-2"
          @click="selectIndex(index)"
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
import debounce from 'lodash/debounce';
import Flickity from 'vue-flickity';
import 'flickity-imagesloaded';
import 'flickity-fade';

export default {
  name: 'small-preview-carousel',
  props: {
    element: Object,
  },
  components: {
    Flickity,
  },
  data() {
    return {
      isMounted: false,
      selectedIndex: 0,
      flickityDefaultOptions: {
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
      flickityThumbOptions: {
        cellAlign: 'center',
        autoPlay: 5000,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
      flickityPreviewOptions: {
        cellAlign: 'center',
        prevNextButtons: false,
        draggable: false,
        fade: true,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
    };
  },
  computed: {
    flickityThumbCarousel() {
      if (!this.isMounted) {
        return;
      }
      return this.$refs.flickityThumbs;
    },
    flickityPreviewCarousel() {
      if (!this.isMounted) {
        return;
      }
      return this.$refs.flickityPreview;
    },
  },
  mounted() {
    this.isMounted = true;

    this.flickityThumbCarousel.on('change', () => {
      this.selectedIndex = this.flickityThumbCarousel.selectedIndex();
      this.flickityPreviewCarousel.select(this.selectedIndex);
    });
  },
  methods: {
    getLargePreview(thumbUrl) {
      // example thumbUrl:   https://d31l02nbp0owar.cloudfront.net/m/t/10/49860/a-0005.jpg
      // example previewUrl: https://d25thuhsbcr6yb.cloudfront.net/m/s/10/49860/a-0005.jpg
      const url = thumbUrl.split('/m/t/');
      return `https://d25thuhsbcr6yb.cloudfront.net/m/s/${url[1]}`;
    },
    rerender: debounce(function () {
      this.$refs.flickity.rerender();
    }, 1000),
    pauseThumbCarousel() {
      this.flickityThumbCarousel.pausePlayer();
    },
    unpauseThumbCarousel() {
      this.flickityThumbCarousel.unpausePlayer();
    },
    mouseleaveThumbs() {
      this.flickityThumbCarousel.playPlayer();
    },
    selectIndex(num) {
      this.selectedIndex = num;
      this.flickityThumbCarousel.select(this.selectedIndex);
      this.flickityPreviewCarousel.select(this.selectedIndex);
    },
  },
  watch: {
    element: () => {
      this.flickityThumbCarousel.rerender();
      this.flickityPreviewCarousel.rerender();
    },
  },
};
</script>

<style lang="scss" scoped>
.flickity-thumbs::v-deep {
  .carousel-cell {
    opacity: 0.75;
    transition: opacity 0.2s ease-in-out;

    img {
      @include box-shadow($box-shadow-sm);
      transition: box-shadow 0.2s ease-in-out;
    }

    &.is-selected {
      opacity: 1;

      img {
        @include box-shadow($box-shadow);
      }
    }
  }
}
</style>
