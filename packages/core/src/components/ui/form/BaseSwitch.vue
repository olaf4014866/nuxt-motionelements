<template>
  <div
      @click.prevent="onToggle"
      class="custom-control custom-switch">
    <label
        :class="value ? 'active' : ''"
        class="custom-control-label custom-control-label-theme"
    >
      {{ label }}
    </label>
<!--    <input-->
<!--       type="hidden"-->
<!--       :name="this.name"-->
<!--       v-model="model"-->
<!--       :class="{-->
<!--    'is-invalid': v && v.$error,-->
<!--    'is-valid': v && !v.$invalid && model.length,-->
<!--  }"-->
<!--       :required="isRequired"-->
<!--    />-->
  </div>
</template>

<script>

export default {
  name: 'base-input-switch',
  props: {
    id: String,
    value: {
      type: Boolean,
      default: false,
    },
    // v: {
    //   type: Object,
    // },
    // name: {
    //   type: String,
    //   default: null,
    // },
    label: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      // isOn: false,
    };
  },
  created() {
  },
  computed: {
    // model: {
    //   get() {
    //     return this.value;
    //   },
    //   set(value) {
    //     this.$emit('input', value);
    //   },
    // },
    // isRequired() {
    //   return _.has(this.v, '$params.required');
    // },
  },
  methods: {
    onToggle() {
      this.$emit('change', !this.value);
    },
    // getValidationMessage: validationMessage(formMessages),
  },
};
</script>


<style lang="scss" scoped>
.custom-control-label-theme {
  &:before, &:after {
    cursor: pointer;
  }

  &.active {
    &:before {
      color: $black;
      background-color: $custom-control-indicator-checked-bg;
      border-color: $custom-control-indicator-checked-border-color;

      .ui-dark & {
        color: $black;
        background-color: $custom-control-indicator-checked-bg-dark;
        border-color: $custom-control-indicator-checked-border-color-dark;
      }
    }

    &:after {
      transform: translateX(0.9375rem);
      background-color: $white;

      .ui-dark & {
        background-color: $black;
      }
    }
  }
}
</style>
