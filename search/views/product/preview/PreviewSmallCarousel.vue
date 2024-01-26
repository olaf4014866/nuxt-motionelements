<template>
  <div class="w-100 d-flex flex-column">

    <Preview3d v-if="showTurntable"
               :element="element"
               :images="turntableImageUrls"
               :slider="true"
    />
    <div class="w-100" v-else-if="showVideo">
      <div class="overflow-hidden preview-wrapper mx-auto">
        <PlayerVideo :element="element"></PlayerVideo>
      </div>
    </div>

<!--    :style="(showVideo || showTurntable) ? 'display:none' : ''"-->
    <div
      class="flickity-preview"
      @mouseenter="pauseThumbCarousel"
      @mouseleave="unpauseThumbCarousel"
    >
      <flickity
        ref="flickityPreview"
        :options="this.flickityPreviewOptions"
      >
        <!-- <div
          v-if="element.previews.jpg.url"
          class="carousel-cell col-12 p-0"
        >
          <img
            class="img-fluid rounded"
            :src="element.previews.jpg.url"
          />
        </div>
        -->
        <div
          v-for="(cell, index) in cells"
          :key="`preview-${index}`"
          class="carousel-cell col-12 p-0"
        >
          <img
            class="img-fluid rounded"
            :src="getLargePreview(cell.url)"
          />
        </div>
      </flickity>
    </div>

    <div
      v-if="cells.length > 1"
      class="flickity-thumbs"
      @mouseleave="mouseleaveThumbs()"
    >
      <flickity
        ref="flickityThumbs"
        :options="this.flickityThumbOptions"
      >
        <!-- <a
          v-if="element.previews.jpg.url"
          class="carousel-cell col-6 col-md-4 col-xl-3 px-2 py-3"
          @click="selectIndex(1)"
        >
        <img
          class="img-fluid rounded"
          :src="element.previews.jpg.url"
        />
        </a>
        <a
          v-for="(url, index) in element.thumbnails.jpgs.urls"
          :key="`thumbnail-${index}`"
          class="carousel-cell col-6 col-md-4 col-xl-3 px-2 py-3"
          @click="selectIndex(index+1)"
        >
          <img
            class="img-fluid rounded"
            :src="url"
          />
        </a> -->
<!--        <a-->
<!--          v-if="hasVideo"-->
<!--          :key="'thumbnail-video'"-->
<!--          class="carousel-cell col-6 col-md-4 col-xl-3 px-2 py-3"-->
<!--          @click="showVideo = true"-->
<!--        >-->
<!--          <img-->
<!--            class="img-fluid rounded"-->
<!--            :src="videoPosterThumbnailUrl"-->
<!--          />-->
<!--        </a>-->
<!--        <a-->
<!--          v-if="hasTurntable"-->
<!--          :key="'thumbnail-turntable'"-->
<!--          class="carousel-cell col-6 col-md-4 col-xl-3 px-2 py-3"-->
<!--          @click="showTurntable = true"-->
<!--        >-->
<!--          <img-->
<!--            class="img-fluid rounded"-->
<!--            :src="turntableImageUrls[0]"-->
<!--          />-->
<!--        </a>-->
        <a
          v-for="(cell, index) in cells"
          :key="`thumbnail-${index}`"
          class="carousel-cell col-6 col-md-4 col-xl-3 px-2 py-3"
          @click="selectIndex(index)"
        >
          <img
            class="img-fluid rounded"
            :src="cell.url"
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
  name: 'small-preview-gif',
  data() {
    return {
      showVideo: false,
      showTurntable: false,
      isMounted: false,
      selectedIndex: 0,
      flickityDefaultOptions: {
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
      flickityThumbOptions: {
        cellAlign: 'center',
        autoPlay: 5000,
        contain: true,
        pageDots: false,
        imagesLoaded: true,
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
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      },
    };
  },
  props: {
    element: Object,
  },
  components: {
    Flickity,
    // PreviewSmallVideo: () => import('@/views/product/preview/PreviewSmallVideo.vue'),
    PlayerVideo: () => import('@/views/product/preview/players/PlayerVideo.vue'),
    Preview3d: () => import('@/views/product/preview/Preview3d.vue'),
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
    cells() {
      return _.get(this.element, 'thumbnails.jpgs') || [];
      // const items = [];
      //
      // if (this.hasTurntable) {
      //   items.push({
      //     type: 'turntable',
      //     url: this.turntableImageUrls[0],
      //   });
      // }
      //
      // return [...items, ...this.thumbnailsUrl];
    },
    thumbnailsUrl() {
      const urlArray = this.element.thumbnails.jpgs;
      if (this.element.previews.jpg) {
        urlArray.unshift(this.element.previews.jpg);
      }
      return urlArray;
    },
    // previewTurntableUrls() {
    //   return _.get(this.element, 'previews.turntable');
    // },
    isGif() {
      return this.element && this.element.mediaType === 'gif';
    },
    hasVideo() {
      if (this.isGif) {
        return false;
      }

      return this.element && !!_.get(this.element, 'previews.mp4.url');
    },
    videoPosterThumbnailUrl() {
      return _.get(this.element, 'thumbnails.jpg.url');
    },
    hasTurntable() {
      return _.size(_.get(this.element, 'previews.turntable')) > 0;
    },
    turntableImageUrls() {
      return this.hasTurntable ? this.element.previews.turntable.map(v => v.url) : [];
    },
  },
  mounted() {
    this.isMounted = true;

    this.flickityThumbCarousel.on('change', () => {
      this.selectedIndex = this.flickityThumbCarousel.selectedIndex();
      this.flickityPreviewCarousel.select(this.selectedIndex);
    });

    if (this.hasTurntable) {
      this.showTurntable = true;
    } else if (this.hasVideo) {
      this.showVideo = true;
    }
  },
  methods: {
    getLargePreview(thumbUrl) {
      // example thumbUrl:   https://d31l02nbp0owar.cloudfront.net/m/t/10/49860/a-0005.jpg
      // example previewUrl: https://d25thuhsbcr6yb.cloudfront.net/m/s/10/49860/a-0005.jpg
      if (thumbUrl.indexOf('/m/t/') > 0) {
        const url = thumbUrl.split('/m/t/');
        return `https://d25thuhsbcr6yb.cloudfront.net/m/s/${url[1]}`;
      }
      return thumbUrl;
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
      // this.$refs.flickity.rerender();
      // this.$refs.flickity.reposition();
      // this.$refs.flickity.rerender();

      console.log('selectIndex', num);
      // this.showTurntable = false;
      this.showVideo = false;
      // num += 1;
      this.selectedIndex = num;
      this.flickityThumbCarousel.select(this.selectedIndex);
      this.flickityPreviewCarousel.select(this.selectedIndex);
      // this.$refs.flickity.reposition();
      // this.$refs.flickity.rerender();
      // this.$refs.flickity.reloadCells();
      // this.$nextTick(() => {
      //   this.$refs.flickity.reposition();
      //   this.$refs.flickity.rerender();
      //   this.$refs.flickity.reloadCells();
      // });
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

  .flickity-button {
    width: 3rem;
    height: 50%;

    @include media-breakpoint-down (sm) {
      width: 2rem;
    }

    &.previous {
      left: 0;
      border-radius: 0 $border-radius $border-radius 0;
    }
    &.next {
      right: 0;
      border-radius: $border-radius 0 0 $border-radius;
    }

    background: rgba($overlay-color,.75);
    .ui-dark & {
      background: rgba($overlay-color-dark,.75);
    }
  }

  @include media-breakpoint-up(xl) {
    .flickity-button {
      background: $transparent;
      transition: background-color 0.2s ease, opacity 0.2s ease;
      opacity: 0;
    }

    &:hover .flickity-button {
      opacity: 0.5;
      background: rgba($overlay-color,.75);

      .ui-dark & {
        background: rgba($overlay-color-dark,.75);
      }

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
