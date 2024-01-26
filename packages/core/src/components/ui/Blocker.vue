<template>
  <div
    class="blocker active"
    :class="{
      'is-fullscreen' : fullscreen,
      'is-ie11' : isIE,
    }"
  >
    <div class="overlay active">
      <div class="overlay-content flex-column">
        <div class="container text-center">

          <template v-if="!isIE">
            <LoaderSpin
              :size="size"
              :grayscale="grayscale"
            >
            </LoaderSpin>
          </template>

          <template v-if="isIE">
            <font-awesome-icon
              :icon="['fal','circle-notch']"
              size="6x"
              spin
              class="text-primary mb-3"
            ></font-awesome-icon>
          </template>
          <slot name="message">
            <p></p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderSpin from '@motionelements/core/src/components/ui/LoaderSpin.vue';

export default {
  name: 'blocker',
  props: {
    size: {
      type: String,
      default: '',
    },
    grayscale: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    LoaderSpin,
    // LoaderSpin: () => import('./LoaderSpin.vue'),
  },
  computed: {
    isIE() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
  },
};
</script>

<style lang="scss">

.blocker {
  display: none;

  &.active {
    position: relative;
    display: block;

    &.is-fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 5;
    }

    &:not(.is-fullscreen) {
      min-height: 75vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      @include media-breakpoint-up(md) {
        justify-content: center;
      }

      &.is-ie11 {
        padding-top: map-get($map: $spacers, $key: 5);
        padding-bottom: map-get($map: $spacers, $key: 5);
      }
    }
  }
}

.overlay {
  visibility: hidden;
  opacity: 0;
  transition: visibility 200ms, opacity 200ms;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.is-fullscreen {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}


.overlay {
  .overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}

// COLORS

.overlay {
  background-color: rgba($body-bg, .9);

  .ui-dark & {
    background-color: rgba($body-bg-dark, .9);
  }
}
</style>
