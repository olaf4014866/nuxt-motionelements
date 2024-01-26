<template>
  <div>
    <select
      :id="id"
      v-model="model"
      :class="{
        'is-invalid': isInvalid,
        'is-valid': isValid,
        }"
      :required="isRequired"
      class="custom-select mb-2">
      <slot name="options"></slot>
    </select>
    <div class="invalid-feedback" v-if="isError">
      {{ getValidationMessage(v) }}
    </div>
  </div>
</template>

<script>
import { validationMessage } from 'vuelidate-messages';

const formMessages = {
  required: function () {
    return this.$i18n.t('error.required');
  },
};

export default {
  name: 'base-select',
  props: {
    id: String,
    value: {
      type: [String, Boolean, Number],
      default: '',
    },
    v: {
      type: Object,
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
    isInvalid() {
      return this.v && this.v.$error;
    },
    isValid() {
      return this.v && !this.v.$invalid;
    },
    isError() {
      return this.v && this.v.$error;
    },
  },
  methods: {
    getValidationMessage: validationMessage(formMessages),
  },
};
</script>
