<template>
  <div class="pb-5">
    <div
      v-if="images"
      class="d-flex justify-content-center align-items-center position-relative preview-wrapper">

      <!-- <div class="preview-wrapper-control">
        <button
          @click="handleButton(-1)"
          type="button"
          class="btn btn-light mr-2"
        >
          <font-awesome-icon :icon="['fas','chevron-left']"/>
        </button>
        <button
          @click="handleButton(1)"
          type="button"
          class="btn btn-light mr-2"
        >
          <font-awesome-icon :icon="['fas','chevron-right']"/>
        </button>
      </div> -->

      <div class="preview-wrapper-images rounded overflow-hidden"
        ref="previewImagesContainer"
        draggable="false"
        @mouseup="handleMouseUp"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
      >
      <!-- @keydown="handleKeydown" -->
        <!-- <VueProductSpinner
          v-if="element"
          :images="imgs"
          :slider="slider"
          :infinite="infinite"
          :mouseWheel="mouseWheel"
          :animation="animation"
          sliderClass="product-slider"
        /> -->

        <!-- render all image let browser handle image sequence loading -->
        <div v-for="(img, i) in images" :key="i + 1">
          <img :src="img" :data-key="i" v-show="false"/>
        </div>
        <!-- use vue serve image address again, browser load image cache -->
        <img class="product-slider-image img-fluid" :src="images[spinner.current]" unselectable draggable="false"/>
        <!-- show input range can help mobile dragging -->
        <input v-if="slider" class="product-slider-control custom-range" type="range" min="1" :max="images.length - 1" v-model.number="spinner.current" >
        <!-- <span>{{ spinner.current }}</span> -->
      </div>
    </div>

  </div>
</template>

<script>
// ref source: https://micheleriva.github.io/vue-product-spinner/
// import VueProductSpinner from 'vue-product-spinner';
import debounce from 'lodash/debounce';

export default {
  name: 'large-preview-3d',
  components: {
    // VueProductSpinner,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
    // element: Object,
    slider: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    mouseWheel: {
      type: Boolean,
      default: true,
    },
    // animation: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  computed: {
    // imgs() {
    //   return this.element.previews.turntable;
    // },
    // imageUrls() {
    //   return this.element.previews.turntable.map(v => v.url);
    // },
  },
  data() {
    return {
      count: 1,
      // imagesPreloaded: false,
      speed: 3,
      speedController: 0,
      spinner: {
        current: 0,
        size: 0,
        // currentPath: null,
      },
      mouse: {
        isMoving: false,
        isDragging: false,
      },
      touch: {
        isMoving: false,
        initialX: 0,
        isDragging: false,
      },
      // animationRequestID: 0,
      lastPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('mouseup', this.handleMouseDragging);
    window.addEventListener('touchend', this.handleTouchDragging);
    // if (this.mouseWheel) {
    //   this.$refs.previewImagesContainer.addEventListener('wheel', this.handleWheel, false);
    // }
    // set image array length to spinner size
    this.spinner.size = this.images.length - 1;
  },
  beforeDestroy() {
    // if (this.mouseWheel) {
    //   this.$refs.previewImagesContainer.removeEventListener('wheel', this.handleWheel);
    // }
    window.removeEventListener('mouseup', this.handleMouseDragging);
    window.removeEventListener('touchend', this.handleTouchDragging);
  },
  methods: {
    // handleKeydown(event) {
    //   if (event.keyCode === 39) {
    //     event.preventDefault();
    //     this.handleMovement(this.lastPosition + 1);
    //   }
    //   if (event.keyCode === 37) {
    //     event.preventDefault();
    //     this.handleMovement(this.lastPosition - 1);
    //   }
    // },
    handleButton(number) {
      this.handleMovement(this.lastPosition + number);
    },
    // handleWheel(event) {
    //   if (this.mouseWheel) {
    //     event.preventDefault();
    //     this.handleMovement(event.deltaY);
    //   }
    // },
    handleMouseDown: debounce(function () {
      // if (this.animation) {
      //   // this.stopAnimation();
      // }
      this.mouse.isDragging = true;
      this.mouse.isMoving = true;
    }, 100),
    handleMouseUp() {
      this.mouse.isMoving = false;
    },
    handleMouseMove(event) {
      // console.log(event.pageX);
      if (this.mouse.isMoving && this.mouse.isDragging) {
        this.handleMovement(event.pageX);
      }
    },
    // handleMouseMove: debounce(function (event) {
    //   // console.log(event.pageX);
    //   if (this.mouse.isMoving && this.mouse.isDragging) {
    //     this.handleMovement(event.pageX);
    //   }
    // }, 0),
    handleMouseDragging() {
      this.mouse.isDragging = false;
    },
    handleTouchDragging() {
      this.touch.isDragging = false;
    },
    handleTouchStart(event) {
      event.preventDefault();
      // if (this.animation) {
      //   // this.stopAnimation();
      // }
      this.touch.isMoving = true;
      this.touch.isDragging = true;
      this.touch.initialX = event.touches[0].pageX;
    },
    handleTouchEnd() {
      this.touch.isMoving = false;
    },
    handleTouchMove(event) {
      if (this.touch.isDragging) {
        const delta = -(this.touch.initialX - event.touches[0].pageX);
        this.handleMovement(delta);
      }
    },
    handleMovement(delta) {
      this.speedController += 1;
      if (this.speedController < this.speed) {
        return;
      }
      if (this.speedController > this.speed) {
        this.speedController = 0;
      }
      if (delta > this.lastPosition) {
        if (this.spinner.current >= 0 && this.spinner.current < this.spinner.size) {
          // this.count += 1;
          this.spinner.current += 1;
          // this.spinner.currentPath = this.images[this.spinner.current - 1];
        } else if (this.infinite) {
          // this.count = 1;
          this.spinner.current = 1;
          // this.spinner.currentPath = this.images[this.spinner.current - 1];
        }
      } else if (delta < this.lastPosition) {
        if (this.spinner.current >= 0 && this.spinner.current - 1 > 0) {
          // this.count -= 1;
          this.spinner.current -= 1;
          // this.spinner.currentPath = this.images[this.spinner.current - 1];
        } else if (this.infinite) {
          // this.count = this.imgs.length - 1;
          // this.spinner.current = this.imgs.length - 1;
          this.spinner.current = this.spinner.size;
          // this.spinner.currentPath = this.images[this.spinner.current - 1];
        }
      }
      this.lastPosition = delta;
    },
  },
};
</script>

<style lang="scss" scoped>
  .preview-wrapper {
    width: 100%;
    // @include media-breakpoint-up(xxl) {
    //   width: 60rem;
    // }
    // @include media-breakpoint-between(lg,xl) {
    //   width: 45rem;
    // }
  }

  // .product-slider {
  //   width: 100%;
  //   height: 50vh;
  //   min-height: 540px;
  // }

  .product-slider-control {
    width: 100%;
  }

  // .product-slider-image {
  //   width: 100%;
  // }
</style>
