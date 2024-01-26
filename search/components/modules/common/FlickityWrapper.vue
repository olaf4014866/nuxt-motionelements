<template>
  <flickity ref="flickity" :options="normalizedOptions" :class="padding == true ? 'has-padding px-5 px-md-6' : ''">
    <slot>
      <div class="carousel-cell">
        <img src="@/assets-mockup/img/placeholder-640x360-light.jpg" alt="Image Placeholder">
      </div>
      <div class="carousel-cell">
        <img src="@/assets-mockup/img/placeholder-640x360-light.jpg" alt="Image Placeholder">
      </div>
      <div class="carousel-cell">
        <img src="@/assets-mockup/img/placeholder-640x360-light.jpg" alt="Image Placeholder">
      </div>
    </slot>
  </flickity>
</template>

<script>
import debounce from 'lodash/debounce';
import Flickity from 'vue-flickity';
import 'flickity-imagesloaded';
import 'flickity-fade';

export default {
  name: 'flickity-wrapper',
  components: {
    Flickity,
  },
  props: {
    padding: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: [Boolean, String],
      default: 'auto',
    },
    flickityOptions: {
      type: Object,
      default: () => ({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      }),
    },
  },
  data() {
    return {
      isFlickity: true,
    };
  },
  computed: {
    normalizedOptions() {
      return Object.assign({
        cellAlign: 'left',
        contain: true,
        pageDots: false,
        imagesLoaded: true,
        // eslint-disable-next-line
        arrowShape: 'M66.4493852,99.0033482 L68.0142787,97.4252232 C69.0513443,96.3792411 69.0513443,94.6832589 68.0142787,93.6370536 L24.7494344,50 L68.0142787,6.36294643 C69.0513443,5.31696429 69.0513443,3.62098214 68.0142787,2.57477679 L66.4493852,0.996651786 C65.4123197,-0.0493303571 63.7307951,-0.0493303571 62.6937295,0.996651786 L15.9857213,48.1060268 C14.9486557,49.1520089 14.9486557,50.8479911 15.9857213,51.8941964 L62.6937295,99.0035714 C63.7307951,100.049554 65.4123197,100.049554 66.4493852,99.0033482 Z',
      }, this.flickityOptions);
    },
    prevNextButtons() {
      return this.$el.getElementsByClassName('flickity-prev-next-button');
    },
    carouselCellsWidth() {
      var cells = this.$el.getElementsByClassName('carousel-cell');
      var totalWidth = 0;
      for (var i = 0; i < cells.length; i += 1) {
        totalWidth += cells[i].offsetWidth;
      }
      return totalWidth;
    },
    carouselViewportWidth() {
      return this.$el.offsetWidth;
    },
  },
  methods: {
    hidePrevNextButtons() {
      for (var i = 0; i < this.prevNextButtons.length; i += 1) {
        this.prevNextButtons[i].classList.add('d-none');
      }
    },
    showPrevNextButtons() {
      for (var i = 0; i < this.prevNextButtons.length; i += 1) {
        this.prevNextButtons[i].classList.remove('d-none');
      }
    },
    rerender: debounce(function () {
      this.$refs.flickity.rerender();
    }, 1000),
    checkCarouselWidth() {
      if (!this.showArrows) {
        if (this.carouselCellsWidth <= this.$el.offsetWidth || this.showArrows === false) {
          this.hidePrevNextButtons();
          // console.log(`Viewport: ${this.carouselViewportWidth} | Cells: ${this.carouselCellsWidth}`);
          // console.log('hiding prevNext buttons');
        } else {
          this.showPrevNextButtons();
        }
      }
      this.rerender();
    },
  },
  mounted() {
    this.checkCarouselWidth();
    window.addEventListener('resize', this.checkCarouselWidth);
  },
  updated() {
    this.rerender();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkCarouselWidth);
  },
};
</script>

<style lang="scss">
.flickity-button {
  background: transparent;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  opacity: 0;

  .flickity-enabled.is-draggable:hover & {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  @include media-breakpoint-down(lg) {
    opacity: 1;
  }

  &:disabled {
    opacity: 0;

    .flickity-enabled.is-draggable:hover & {
      opacity: 0;
      &:hover {
        opacity: 0;
      }
    }
  }
}
.flickity-prev-next-button {
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
}

// COLORS
.flickity-button-icon {
  fill: $link-color;

  .ui-dark & {
    fill: $link-color-dark;
  }
}

.flickity-enabled:hover {
  &:not(.has-padding) {
    .flickity-button {
      background: rgba($overlay-color,.75);

      .ui-dark & {
        background: rgba($overlay-color-dark,.75);
      }
    }
  }

  &.has-padding {
    .flickity-button {
      .ui-dark &, & {
        background: $transparent;
      }
    }
  }
}
</style>
