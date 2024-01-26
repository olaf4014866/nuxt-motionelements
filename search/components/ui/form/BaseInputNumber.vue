<template>
  <div>
    <input type="number"
           :disabled="disabled"
           :class="{
                'is-invalid': validator.$error,
                'is-valid': !validator.$invalid,
                }"
           v-model="model"
           @input="validator.$touch()"
           class="form-control mb-2"
    >
    <div class="invalid-feedback" v-if="!validator.required">This is required.</div>
  </div>
</template>

<script>

export default {
  name: 'input',
  props: {
    model: {
      type: Object,
      required: true,
    },
    validator: {
      type: Object,
      required: true,
    },
    class: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
  },
};
</script>
