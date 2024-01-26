<template>
  <div
    class="modal fade"
    tabindex="-1" role="dialog" aria-labelledby="gifCreator" aria-hidden="true"
  >
  <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create Your Gif</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div
          class="mb-3 mx-auto rounded overflow-hidden"
          :style="`width:${settings.width}px;height:${settings.height}px`"
        >
          <img
            src="@/assets-mockup/img/placeholder-640x360-light.jpg"
            class="img-fluid"
            />
        </div>
        <form class="mx-auto">
          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              In/Out
            </label>
            <div class="col-lg-10 d-flex flex-column align-items-stretch">
              <div>
                <vue-slider
                  :enable-cross="false"
                  :min-range="3"
                  v-model="settings.markers"></vue-slider>
              </div>
              <div class="d-flex justify-content-between align-items-center small mt-1">
                <span>Start Time: <span class="font-weight-bold">{{ markIn }}s</span></span>
                <span>End Time: <span class="font-weight-bold">{{ markOut }}s</span></span>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              Size
            </label>
            <div class="col-lg-10">
              <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

                <label
                  v-for="size in Object.keys(formats)"
                  :key="`size-${size}`"
                  class="btn btn-simple-secondary"
                  :class="settings.width === formats[size].width ? 'active' : ''"
                  @click="setDimensions(size)"
                >
                  <input
                    type="radio" name="resolution"
                    :value="`${formats[size].width}x${formats[size].height}`"
                    :checked="settings.width === formats[size].width ? 'checked' : ''">
                  <p class="mb-0">
                    <span class="d-inline d-md-none">
                      {{ formats[size].acronym }}
                    </span>
                    <span class="d-none d-md-inline">
                      {{ formats[size].label }} <span class="text-muted">{{ formats[size].width }} x {{ formats[size].height }} px</span>
                    </span>
                  </p>
                </label>

              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              Speed
            </label>
            <div class="col-lg-10">
              <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

                <label
                  v-for="speed in speeds"
                  :key="`speed-${speed.label}`"
                  class="btn btn-simple-secondary"
                  :class="settings.speed === speed.value ? 'active' : ''"
                  @click="setSettings('speed',speed.value)"
                >
                  <input type="radio" name="speed" :value="speed.value" autocomplete="off" :checked="settings.speed === speed.value ? 'checked' : ''"> {{speed.label}}
                </label>

              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              Loop
            </label>
            <div class="col-lg-10">
              <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

                <label
                  v-for="loop in loops"
                  :key="`loop-${loop.value}`"
                  class="btn btn-simple-secondary"
                  :class="settings.loop === loop.value ? 'active' : ''"
                  @click="setSettings('loop',loop.value)"
                >
                  <input type="radio" name="loop" :value="loop.value" :checked="settings.loop === loop.value ? 'checked' : ''"> {{ loop.label }}
                </label>

              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              Quality
            </label>
            <div class="col-lg-10">
              <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

                <label
                  v-for="quality in qualities"
                  :key="`quality-${quality.value}`"
                  class="btn btn-simple-secondary"
                  :class="quality.value === settings.quality ? 'active' : ''"
                  @click="setSettings('quality',quality.value)"
                >
                  <input type="radio" name="quality" value="quality.value" :checked="quality.value === settings.quality ? 'checked' : ''"> {{ quality.label }}
                </label>

              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-lg-2 col-form-label col-form-label-sm">
              Background
            </label>
            <div class="col-lg-10">
              <div class="btn-group btn-group-sm d-flex btn-group-toggle" data-toggle="buttons">

                <label
                  v-for="transparent in transparents"
                  :key="`transparent-${transparent.value}`"
                  class="btn btn-simple-secondary"
                  :class="transparent.value === settings.transparent ? 'active' : ''"
                  @click="setSettings('transparent',transparent.value)"
                >
                  <input type="radio" name="transparent" :value="transparent.value" :checked="transparent.value === settings.transparent ? 'checked' : ''"> {{ transparent.label }}
                </label>

              </div>
            </div>
          </div>

        </form>
      </div>
      <div class="modal-footer d-flex flex-column flex-lg-row justify-content-between align-items-stretch align-items-lg-center">
        <div>
          <p class="mb-lg-0 small">
            GIF credit:
            <a
              :href="element.artist.url"
            >
              {{ element.artist.username }} / MotionElements
            </a>
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-simple-secondary mr-2" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary">
            <font-awesome-icon
              :icon="['fas','me-images']"
            ></font-awesome-icon>
            Create Your GIF
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component';

export default {
  name: 'modal-gif-creator',
  props: {
    element: Object,
  },
  data() {
    return {
      settings: {
        loop: '',
        quality: 2,
        speed: '',
        width: 256,
        height: 144,
        markers: [0, 3],
        transparent: '',
      },
      formats: {
        small: {
          label: 'Small',
          acronym: 'S',
          width: 256,
          height: 144,
        },
        medium: {
          label: 'Medium',
          acronym: 'M',
          width: 480,
          height: 270,
        },
        large: {
          label: 'Large',
          acronym: 'L',
          width: 640,
          height: 360,
        },
      },
      speeds: [
        {
          value: '',
          label: 'Normal',
        },
        {
          value: '2',
          label: '2x',
        },
        {
          value: '4',
          label: '4x',
        },
      ],
      loops: [
        {
          value: 'none',
          label: 'No Loop',
          icon: 'long-arrow-right',
          hasPreview: true,
        },
        {
          value: '',
          label: 'Normal',
          icon: 'repeat',
          hasPreview: true,
        },
        {
          value: 'reverse',
          label: 'Reverse',
          icon: 'rotate-left',
          hasPreview: false,
        },
        {
          value: 'pingpong',
          label: 'Ping Pong',
          icon: 'exchange',
          hasPreview: false,
        },
      ],
      qualities: [
        {
          value: '',
          label: 'Compressed',
        },
        {
          value: 2,
          label: 'High Quality',
        },
        {
          value: 1,
          label: 'Maximum Quality',
        },
      ],
      transparents: [
        {
          value: '',
          label: 'Opaque',
        },
        {
          value: 1,
          label: 'Transparent',
        },
      ],
    };
  },
  computed: {
    maxDuration() {
      let elementDuration = 3;

      // TODO: check if duration in element exists
      if (this.element.duration) {
        elementDuration = Math.min(elementDuration, this.element.duration);
      }

      return elementDuration;
    },
    markIn: {
      get: function () {
        return this.settings.markers[0];
      },
      set: function (newValue) {
        this.settings.markers[0] = newValue;
      },
    },
    markOut: {
      get: function () {
        return this.settings.markers[1];
      },
      set: function (newValue) {
        this.settings.markers[1] = newValue;
      },
    },
  },
  components: {
    VueSlider,
  },
  methods: {
    setKebabCase(text) {
      return _.kebabCase(text);
    },
    setDimensions(size) {
      this.settings.width = this.formats[size].width;
      this.settings.height = this.formats[size].height;
    },
    setSettings(key, value) {
      this.settings[key] = value;
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.btn-group-toggle {
  .btn {
    &:hover {
      color: $primary;
    }
    &.active {
      color: $dark;
    }
  }
}

// vue-slider-component styles
/* Set variables for component */
$themeColor: #eb5424;
// $disabledOpacity: 0.5;

$bgColor: $light;
$railBorderRadius: $spacer;

// $dotShadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
// $dotShadowFocus: 0px 0px 1px 2px rgba($themeColor, 0.36);
$dotBgColor: $white;
$dotBgColorDisable: $light;
// $dotBorderRadius: 50%;

$tooltipBgColor: $light;
$tooltipColor: $dark;
$tooltipBorderRadius: map-get($spacers,1);
$tooltipPadding: .125rem map-get($spacers,1);
$tooltipMinWidth: map-get($spacers,4);
$tooltipArrow: map-get($spacers,2);
$tooltipFontSize: .75rem;

// $stepBorderRadius: 50%;
// $stepBgColor: rgba(0, 0, 0, 0.16);

$labelFontSize: .75rem;

/* import theme style */
@import '~vue-slider-component/lib/theme/default.scss';

//
// DARK MODE
//

.ui-dark {
  $bgColor: $black;
  $dotBgColor: map-get(map-get($theme-colors-variants,"dark"),"1");
  $dotBgColorDisable: $black;

  $tooltipBgColor: $black;
  $tooltipColor: $light;
  /* import theme style */
  @import '~vue-slider-component/lib/theme/default.scss';
}
</style>
