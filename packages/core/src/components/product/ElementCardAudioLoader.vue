<template>
  <div class="card card-audio card-loader border-0 d-flex mb-3">
    <div class="bg-white d-flex align-items-center justify-content-center">
      <i class="fas fa-2x me-bmt icon-music icon-bg-shine"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-audio {
  &.card-loader {
    > div {
      // Add border-radius and shadow
      @include border-radius;
      transition: box-shadow 0.2s ease-in-out;
      @include box-shadow($box-shadow-sm);

      // Set loader height
      @media (min-width:1200px) {
        height: 5.5rem;
      }
      @media (max-width:1199.9999px) {
        height: 4.0625rem;
      }
    }
  }
}

//
// COLORS
//

// SHIMMER ANIMATION

@keyframes placeholderShimmer {
  0%        { background-position: 100% center; }
  75%, 100% { background-position: 0% center; }
}

$shine-color:                         $light;
$shine-secondary-color:               $gray-200;

$shine-color-dark:                    $dark;
$shine-secondary-color-dark:          $gray-800;

$shine-bg:                            linear-gradient(135deg, $shine-color 30%, $shine-secondary-color 50%, $shine-color 70%);
$shine-bg-dark:                       linear-gradient(135deg, $shine-color-dark 30%, $shine-secondary-color-dark 50%, $shine-color-dark 70%);

$shine-bg-size:                       400% 100%;
$shine-bg-repeat:                     no-repeat;
$shine-bg-position:                   100% center;
$shine-position:                      relative;

.icon-bg-shine {
  animation-duration:                 2s;
  animation-fill-mode:                forwards;
  animation-iteration-count:          infinite;
  animation-name:                     placeholderShimmer;
  animation-timing-function:          linear;

  background:                         $shine-color;
  background:                         $shine-bg;
  background-size:                    $shine-bg-size;
  background-repeat:                  $shine-bg-repeat;
  background-position:                $shine-bg-position;
  position:                           $shine-position;

  color:                              $shine-color;
  background-clip:                    text !important;
  -webkit-background-clip:            text !important;
  -webkit-text-fill-color:            transparent !important;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  .ui-dark & {
    background:                       $shine-color-dark;
    background:                       $shine-bg-dark;
    background-size:                  $shine-bg-size;
    background-repeat:                $shine-bg-repeat;
    background-position:              $shine-bg-position;

    color:                            $shine-color-dark;
  }
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /* IE10+ CSS styles go here */
  .icon-bg-shine {
    background: transparent;
    color: $shine-color;

    .ui-dark & {
      color: $shine-color-dark;
    }
  }
}

</style>
