<template>
  <svg
    class="spinner"
    :class="spinnerClass"
    :width="`${spinnerSize}px`"
    :height="`${spinnerSize}px`"
    :viewBox="`0 0 ${spinnerSize} ${spinnerSize}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      fill="none"
      :stroke-width="spinnerStroke"
      stroke-linecap="round"
      :cx="spinnerCenter"
      :cy="spinnerCenter"
      :r="spinnerRadius"
    ></circle>
  </svg>
</template>

<script>
export default {
  name: 'loader-spin',
  props: {
    size: {
      type: String,
      default: '', // accepts '' & 'sm'
    },
    grayscale: {
      type: Boolean,
      default: false,
    },
    grayscaleInvert: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    spinnerClass() {
      return {
        'spinner-sm': this.size === 'sm',
        'spinner-gs': this.grayscale === true,
        'spinner-gs-invert': this.grayscaleInvert === true,
      };
    },
    spinnerSize() {
      return this.size === 'sm' ? 16 : 160;
    },
    spinnerStroke() {
      return this.size === 'sm' ? 1.5 : 4;
    },
    spinnerCenter() {
      return this.spinnerSize / 2;
    },
    spinnerRadius() {
      return this.spinnerSize / (2 * Math.sqrt(2));
    },
  },
};
</script>

<style lang="scss" scoped>
$duration: 2s;

// set base-size
$size-sm: 16;

// calculate large-size
$size: $size-sm * 10;

// calculate offset for each size
$offset: $size * 9 / 4;
$offset-sm: $size-sm * 9 / 4;

.spinner {
  animation: rotator $duration linear infinite;
  .path {
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation:
      dash $duration ease-in-out infinite,
      colors ($duration*2) ease-in-out infinite;
  }

  &.spinner-sm {
    .path {
      stroke-dasharray: $offset-sm;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation:
        dash-sm $duration ease-in-out infinite,
        colors ($duration*2) ease-in-out infinite;
    }
  }

  // * Gray Spinner

  &.spinner-gs {
    .path {
      animation:
        dash $duration ease-in-out infinite,
        colors-gs ($duration*2) ease-in-out infinite;
    }

    &.spinner-sm {
      .path {
        animation:
          dash-sm $duration ease-in-out infinite,
          colors-gs ($duration*2) ease-in-out infinite;
      }
    }

    &.spinner-gs-invert {
      .path {
        animation:
          dash $duration ease-in-out infinite,
          colors-gs-invert ($duration*2) ease-in-out infinite;
      }

      &.spinner-sm {
        .path {
          animation:
            dash-sm $duration ease-in-out infinite,
            colors-gs-invert ($duration*2) ease-in-out infinite;
        }
      }
    }
  }
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

@keyframes colors {
  0% { stroke: $primary; }
  50% { stroke: $warning; }
  100% { stroke: $primary; }
}

@keyframes colors-gs {
  0% { stroke: $gray-100; }
  50% { stroke: $gray-300; }
  100% { stroke: $gray-100; }
}

@keyframes colors-gs-invert {
  0% { stroke: $gray-800; }
  50% { stroke: $gray-700; }
  100% { stroke: $gray-800; }
}

@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: $offset/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}

@keyframes dash-sm {
 0% { stroke-dashoffset: $offset-sm; }
 50% {
   stroke-dashoffset: $offset-sm/4;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: $offset-sm;
   transform:rotate(450deg);
 }
}


</style>
