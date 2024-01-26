<template>
  <div class="card-wrapper card-1-1 d-inline-block mb-3">
    <div
      :class="`card-${currentMediaType}`"
      class="card card-bundle border-0 rounded overflow-hidden">
      <div class="card-img-top position-relative">
        <i
          class="fas fa-3x icon-bg-shine"
          :class="`me-bmt ${mediaTypeIcon}`"
        ></i>
      </div>
      <div class="card-body p-2 bg-white d-flex flex-column justify-content-around">
        <div class="placeholder-block placeholder-block-title rounded"></div>
        <div class="placeholder-block placeholder-block-price rounded"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'element-card-bundle-artist-promotion-loader',
  props: {
    collection: Object,
  },
  computed: {
    ...mapState({
      mediaTypeIcon: state => state.site.currentMediaType.iconClassSecond,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
  },
  created: function () {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
$card-max-height-xxl:     10rem;

$card-breakpoints: (
  1: 0,
  2: 289px,
  3: 465px,
  4: 641px,
  5: 817px,
  6: 993px,
);

.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

  // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
  @media (min-width: map-get($card-breakpoints,2)) {
    margin-right: $spacer;
  }

  // SET WIDTH
  @media (max-width: map-get($card-breakpoints,2) - 0.0001px) {
    width: 100%;
  }
  @media (min-width: map-get($card-breakpoints,2)) {
    width: $card-max-height-xxl;
  }
}

// ADD VERTICAL PADDING TO .card-img-wrapper
.card-1-1 {
  .card-img-top {
    padding-bottom: 100%;
    background-position: center;
  }
}

// SHADOWS
.card-bundle {
  @include box-shadow($box-shadow-sm);
}

.card-body {
  height: 61px;
}
.placeholder-block {
  display: inline-block;
  height: 0.8rem;
  background: $light;

  &.placeholder-block-title {
    width: 75%;
  }
  &.placeholder-block-price {
    width: 50%;
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
