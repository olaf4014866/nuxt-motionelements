<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="svg-gradient-fill">
    <defs>
      <linearGradient :id="`linear-${color}`" gradientTransform="rotate(45)">
        <stop class="linear-stop1" offset="0%"></stop>
        <stop class="linear-stop2" offset="100%"></stop>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'svg-gradient-fill',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-gradient-fill {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
}

@each $gradient, $colors in $theme-color-gradients {
  #linear-#{$gradient} {
    .linear-stop1 {
      stop-color: nth($colors,1);
    }
    .linear-stop2 {
      stop-color: nth($colors,2);
    }
  }
}
</style>
