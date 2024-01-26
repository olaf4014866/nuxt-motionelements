<template>
  <section>
    <div class="container py-5">
      <div class="d-flex flex-column flex-lg-row align-items-lg-center">
        <div class="w-100 w-lg-66 mb-3 mb-lg-0">
          <h2 class="h3" v-html="$nl2p($t('channel_lottie.demo_heading'))">
          </h2>
          <p>
            {{ $t('channel_lottie.demo_subheading') }}
          </p>
          <form class="bg-light lt px-3 py-2 rounded shadow">
            <div class="form-group row">
              <v-style>
                .custom-range-hue::-moz-range-track {
                  background-image: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
                }
                .custom-range-hue::-ms-track {
                  background-image: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
                }
                .custom-range-hue::-webkit-slider-runnable-track {
                  background-image: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
                }
                .custom-range-sat::-moz-range-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},0%,50%) 0%, hsl({{ lottieBg.hue }},100%,50%) 100%);
                }
                .custom-range-sat::-ms-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},0%,50%) 0%, hsl({{ lottieBg.hue }},100%,50%) 100%);
                }
                .custom-range-sat::-webkit-slider-runnable-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},0%,50%) 0%, hsl({{ lottieBg.hue }},100%,50%) 100%);
                }
                .custom-range-lit::-moz-range-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,0%) 0%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,50%) 50%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,100%) 100%);
                }
                .custom-range-lit::-ms-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,0%) 0%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,50%) 50%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,100%) 100%);
                }
                .custom-range-lit::-webkit-slider-runnable-track {
                  background-image: linear-gradient(to right, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,0%) 0%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,50%) 50%, hsl({{ lottieBg.hue }},{{ lottieBg.saturation }}%,100%) 100%);
                }
              </v-style>
              <label class="col-12 col-sm-6 col-form-label col-form-label-sm font-weight-bold">{{ $t('channel_lottie.demo_select_bg_color') }}</label>
              <div class="col-12 col-sm-6">
                <input type="range" class="custom-range custom-range-hue" min="0" max="360" step="1" v-model="lottieBg.hue" id="lottie-bg-hue">
                <input type="range" class="custom-range custom-range-sat" min="0" max="100" step="1" v-model="lottieBg.saturation" id="lottie-bg-sat">
                <input type="range" class="custom-range custom-range-lit" min="0" max="100" step="1" v-model="lottieBg.lightness" id="lottie-bg-lit">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-6 col-form-label col-form-label-sm font-weight-bold">{{ $t('channel_lottie.demo_select_speed') }}</label>
              <div class="col-12 col-sm-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      @click="changeSpeed(-1)"
                      type="button"
                      class="btn btn-sm btn-light"
                    >
                      <font-awesome-icon :icon="['fas','minus']" fixed-width></font-awesome-icon>
                    </button>
                  </div>
                  <input
                    type="number" class="form-control form-control-sm" id="lottie-speed" value="1" min="-3" max="3"
                    v-on:change="onSpeedChange" v-model="animationSpeed"
                  >
                  <div class="input-group-append">
                    <button
                      @click="changeSpeed(1)"
                      type="button"
                      class="btn btn-sm btn-light"
                    >
                      <font-awesome-icon :icon="['fas','plus']" fixed-width></font-awesome-icon>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="w-100 w-lg-33 px-3">
          <div class="device-wrapper mx-auto">
            <div class="device" data-device="iPhoneX" :data-orientation="`${window.width < 992 ? 'landscape' : 'portrait'}`" data-color="black">
              <div class="screen" :style="`background:${lottieBgColor}`">
                <FlickityWrapper class="h-100" :flickityOptions="{wrapAround:true,autoPlay:4000}" :showArrows="false">
                  <!-- PUT CONTENTS HERE -->
                  <lottie class="lottie carousel-cell w-100 h-100" :options="defaultOptions1" v-on:animCreated="registerAnimation"/>
                  <lottie class="lottie carousel-cell w-100 h-100" :options="defaultOptions2" v-on:animCreated="registerAnimation"/>
                  <lottie class="lottie carousel-cell w-100 h-100" :options="defaultOptions3" v-on:animCreated="registerAnimation"/>
                </FlickityWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Lottie from 'vue-lottie';

import VStyle from '@/components/modules/common/VStyle.vue';
import FlickityWrapper from '@/components/modules/common/FlickityWrapper.vue';

import * as animationData1 from '@/assets/js/lottie/me-logomark-animation-2.json';
import * as animationData2 from '@/assets/js/lottie/mobile-animation-hearts.json';
import * as animationData3 from '@/assets/js/lottie/video-generate.json';

export default {
  name: 'section-lottie-demo',
  components: {
    FlickityWrapper,
    'v-style': VStyle,
    'lottie': Lottie,
    // 'color-picker': Photoshop,
  },
  computed: {
    lottieBgColor() {
      return `hsl(${this.lottieBg.hue},${this.lottieBg.saturation}%,${this.lottieBg.lightness}%)`;
    },
    colorPicker() {
      // hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      return `hsl: {h: ${this.lottieBg.hue}, s: ${this.lottieBg.saturation / 100},l: ${this.lottieBg.lightness / 100}, a: 1)`;
    },
  },
  data() {
    return {
      color: {
        h: 0,
        s: 0,
        l: 0,
      },
      lottieBg: {
        hue: 193,
        saturation: 75,
        lightness: 85,
      },
      defaultOptions1: {
        animationData: animationData1.default,
      },
      defaultOptions2: {
        animationData: animationData2.default,
      },
      defaultOptions3: {
        animationData: animationData3.default,
      },
      animationSpeed: 1,
      anim: [],
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  created: function () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    registerAnimation: function (anim) {
      this.anim.push(anim);
    },
    onSpeedChange: function () {
      for (var i = 0; i < this.anim.length; i += 1) {
        this.anim[i].setSpeed(this.animationSpeed);
      }
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    changeSpeed(val) {
      this.animationSpeed += val;
      this.onSpeedChange();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
