<template>
  <div class="page-loader position-relative">
    <div class="icon-wrapper">

      <template v-if="isIE">
        <font-awesome-icon
          :icon="['fal','circle-notch']"
          spin
        ></font-awesome-icon>
      </template>

      <template v-else>
        <i
          :class="`me-bmt icon-motionelements`"
          class="fas icon-loader animation-shimmer"
        ></i>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  name: 'page-loader',
  components: {
  },
  computed: {
    isIE() {
      // var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return true;//ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
  },
};
</script>

<style lang="scss" scoped>
// layout
.page-loader {
  width: 100%;
  min-height: 60vh;
  @include media-breakpoint-only(sm) {
    min-height: 50vh;
  }
  @include media-breakpoint-up(md) {
    min-height: 75vh;
  }
}

.icon-wrapper {
  // positioning
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.icon-loader {
  // sizing
  font-size: 5rem;
  @include media-breakpoint-only(sm) {
    font-size: 3rem;
  }
  @include media-breakpoint-up(md) {
    font-size: 10rem;
  }
  @include media-breakpoint-up(xl) {
    font-size: 12rem;
  }
}

// shimmer animation

$shine-color:                         $light;
$shine-secondary-color:               $gray-150;

$shine-color-dark:                    $dark;
$shine-secondary-color-dark:          $black;

.animation-shimmer {
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;

  animation : shimmer 1.5s linear infinite;
  background-size: 500px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -250px 0;
  }
  100% {
    background-position: 250px 0;
  }
}

// COLORS

.animation-shimmer {
  background-image: linear-gradient(to right, $shine-color 0%, $shine-color 30%, $shine-secondary-color 50%, $shine-color 70%, $shine-color 100%);

  .ui-dark & {
    background-image: linear-gradient(to right, $shine-color-dark 30%, $shine-secondary-color-dark 50%, $shine-color-dark 70%);
  }
}

</style>
