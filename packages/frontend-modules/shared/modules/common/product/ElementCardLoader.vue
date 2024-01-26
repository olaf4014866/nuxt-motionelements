<template>
  <div
    :class="currentMediaType ? `card-${currentMediaType}` : ''"
    class="card-wrapper card-16-9 d-inline-block mb-3"
  >
    <div class="card card-element border-0 bg-white rounded overflow-hidden">
      <div class="card-img-top">
        <div class="card-img-wrapper">
          <i
            :class="`me-bmt ${iconClass}`"
            class="fas fa-3x icon-bg-shine"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'search-element-card-loader',
  props: {},
  computed: {
    ...mapState({
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    iconClass () {
      return this.mediaTypeIcon ? this.mediaTypeIcon : 'icon-motionelements';
    },
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
$video-card-max-height-xxl:        9rem;
$template-card-max-height-xxl:     12rem;

$div-metadata-height:     0.875rem;
$div-title-height:        2rem;
$card-body-bottom-margin: $div-title-height;

// ASSIGN BREAKPOINTS BASED ON THE MAX WIDTH OF THUMBNAIL GENERATED
$video-card-breakpoints: (
  1: 0,
  2: 288px,
  3: 576px,
  4: 1098px,
  5: 1386px
);

$template-card-breakpoints: (
  1: 0,
  2: 400px,
  3: 800px,
  4: 1434px,
  5: 1727px
);

.card-wrapper {
  // ALIGN ALL THUMBNAILS VERTICALLY TO THE TOP
  vertical-align: top;

  // SETTING WIDTH

  // MOBILE
  @media (max-width: map-get($video-card-breakpoints,2) - 0.0001px) {
    width: 100%;
  }

  // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
  @media (min-width: map-get($video-card-breakpoints,2)) {
    margin-right: $spacer;
  }

  // DESKTOP
  @media (min-width: map-get($video-card-breakpoints,2)) and (max-width: map-get($video-card-breakpoints,3) - 0.0001px) {
    width: calc(50% - 1rem);
  }
  @media (min-width: map-get($video-card-breakpoints,3)) and (max-width: map-get($video-card-breakpoints,4) - 0.0001px) {
    width: calc(33.3333% - 1rem);
  }
  @media (min-width: map-get($video-card-breakpoints,4)) and (max-width: map-get($video-card-breakpoints,5) - 0.0001px) {
    width: calc(25% - 1rem);
  }

  // FIXED HEIGHT ON LARGE SCREENS
  @media (min-width: map-get($video-card-breakpoints,5)) {
    min-width: $video-card-max-height-xxl;

    &.card-16-9 {
      width: $video-card-max-height-xxl * 16 / 9;
    }

    &.card-9-16,
    &.card-1-1 {
      width: $video-card-max-height-xxl;
    }
  }

  &.card-ae, &.card-ae-template, &.card-ae-preset,
  &.card-pr, &.card-pr-template, &.card-pr-preset, &.card-mg-template,
  &.card-motion-template {
    // MOBILE
    @media (max-width: map-get($template-card-breakpoints,2) - 0.0001px) {
      width: 100%;
    }

    // ADD MARGIN RIGHT SPACER FOR 400px ONWARDS
    @media (min-width: map-get($template-card-breakpoints,2)) {
      margin-right: $spacer;
    }

    // DESKTOP
    @media (min-width: map-get($template-card-breakpoints,2)) and (max-width: map-get($template-card-breakpoints,3) - 0.0001px) {
      width: calc(50% - 1rem);
    }
    @media (min-width: map-get($template-card-breakpoints,3)) and (max-width: map-get($template-card-breakpoints,4) - 0.0001px) {
      width: calc(33.3333% - 1rem);
    }
    @media (min-width: map-get($template-card-breakpoints,4)) and (max-width: map-get($template-card-breakpoints,5) - 0.0001px) {
      width: calc(25% - 1rem);
    }

    // FIXED HEIGHT ON LARGE SCREENS
    @media (min-width: map-get($template-card-breakpoints,5)) {
      min-width: $template-card-max-height-xxl;

      &.card-16-9 {
        width: $template-card-max-height-xxl * 16 / 9;
      }

      &.card-9-16,
      &.card-1-1 {
        width: $template-card-max-height-xxl;
      }
    }
  }
}

// ADD VERTICAL PADDING TO .card-img-wrapper
.card-16-9 {
  .card-img-wrapper {
    padding-bottom: 56.25%;
  }
}

.card-img-wrapper {
  position:relative;
}

// SHADOWS
.card-element {
  transition: box-shadow 0.05s ease-in-out;
  @include box-shadow($box-shadow-sm);
}

// BOTTOM MARGIN
.card-wrapper {
  @media (min-width: map-get($video-card-breakpoints,2)) and (max-width: map-get($grid-breakpoints,'lg') - 0.05px) {
    padding-bottom: $card-body-bottom-margin * 2;
  }

  &.card-ae, &.card-ae-template, &.card-ae-preset,
  &.card-pr, &.card-pr-template, &.card-pr-preset, &.card-mg-template,
  &.card-motion-template {
    @media (min-width: map-get($template-card-breakpoints,2)) and (max-width: map-get($grid-breakpoints,'lg') - 0.05px) {
      padding-bottom: $card-body-bottom-margin * 2;
    }
  }
  @media (min-width: map-get($grid-breakpoints,'lg')) {
    padding-bottom: $card-body-bottom-margin;
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
