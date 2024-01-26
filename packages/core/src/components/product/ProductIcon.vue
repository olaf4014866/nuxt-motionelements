<template>
    <font-awesome-icon
        :icon="['fas',`me-${icon}`]"
        :size="size"
        :fixed-width="fixedWidth"
        :rotation="rotation"
        :flip="flip"
        :spin="spin"
        :pulse="pulse"
        :border="border"
        :pull="pull"
        :inverse="inverse"
        :swap-opacity="swapOpacity"
        :transform="transform"
        :mask="mask"
        :symbol="symbol"
    />
</template>

<script>
export default {
  name: 'element-type-icon',
  props: {
    // mediaType, or 'collection
    productType: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: null,
      validator: value => ['lg', 'xs', 'sm', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].indexOf(value) > -1,
    },
    fixedWidth: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: value => [90, 180, 270].indexOf(parseInt(value, 10)) > -1,
    },
    flip: {
      type: String,
      default: null,
      validator: value => ['horizontal', 'vertical', 'both'].indexOf(value) > -1,
    },
    spin: {
      type: Boolean,
      default: false,
    },
    pulse: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    pull: {
      type: String,
      default: null,
      validator: value => ['right', 'left'].indexOf(value) > -1,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    swapOpacity: {
      type: Boolean,
      default: false,
    },
    transform: {
      type: [Object, String],
      default: '',
    },
    mask: {
      type: Array,
      default() {
        return [];
      },
    },
    symbol: {
      type: [Boolean, String],
      default: false,
    },
    // for mediaType icons, e.g. ae
    square: {
      type: Boolean,
      default: null,
    },
  },
  computed: {
    icon() {
      const type = this.productType.replace('-', '_');
      console.log("type", type)
      switch (type) {
        case 'video':
        case 'video_live':
        case 'animation':
        case 'video_vr':
          return 'video';
        case '3d':
        case '3d_model':
          return '3d-model';
        case 'ae':
        case 'ae_preset':
        case 'ae_template':
        case 'ae_plugin':
          return this.square === false ? 'after-effects' : 'after-effects-square';
        case 'motion_template':
        case 'motion':
        case 'fcp':
          return 'apple-motion';
        case 'fcpx':
          return 'fcp';
        case 'pr':
        case 'pr_template':
        case 'pr_preset':
          return 'premiere-pro';
        case 'mg_template':
          return 'mogrt';
        case 'resolve':
        case 'resolve_template':
        case 'resolve_macro':
          return 'davinci-resolve';
        case 'music':
          return 'music';
        case 'sfx':
          return 'sfx';
        case 'image':
        case 'photo':
        case 'vector':
        case 'photo_vr':
          return 'image';
        case 'gif':
          return 'images';
        case 'lottie':
          return 'lottie';
        case 'collection':
          return 'collection';
        default:
          return 'motionelements';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
