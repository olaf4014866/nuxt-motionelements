<template>
  <div>
    <input v-if="mask.length"
      type="text"
      v-model.trim="model"
      :placeholder="placeholder"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid,
      }"
      :required="isRequired"
      v-mask="mask"
      class="form-control"
    >
    <input v-else
      type="text"
      v-model.trim="model"
      :placeholder="placeholder"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid,
      }"
      :required="isRequired"
      class="form-control"
    >
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
    mask: {
      type: [String, Array],
      required: false,
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
