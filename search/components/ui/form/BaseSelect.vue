<template>
  <div>
    <select
      v-model="model"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid,
        }"
      :required="isRequired"
      class="custom-select mb-2">
      <slot name="options"></slot>
    </select>
    <div class="invalid-feedback" v-if="v && !v.required">
      This is required.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    isRequired() {
      return _.has(this.v, '$params.required');
    },
  },
};
</script>
