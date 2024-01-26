<template>
  <div>
    <input
        type="tel"
        v-model.trim="model"
        :placeholder="placeholder"
        :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid && model.length,
      }"
        v-mask="mask"
        :required="isRequired"
        class="form-control"
    >
    <div class="invalid-feedback" v-if="v && v.$error">
      {{ getValidationMessage(v) }}
    </div>
  </div>
</template>

<script>
// https://en.wikipedia.org/wiki/Telephone_numbering_plan#:~:text=as%20the%20NANP.-,E.,E.
// max length 15

import { validationMessage } from 'vuelidate-messages';

const formMessages = {
  // required: () => 'Required',
  required: function () {
    return this.$i18n.t('error.required');
  },
  // minLength: ({ $params }) => `Must be at least ${$params.minLength.min} characters.`,
  minLength: function ({ $params }) {
    return this.$i18n.t('error.must_be_at_lease_{count}_digits', { count: $params.minLength.min });
  },
};

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
      type: String,
      required: false,
      default: '###############',
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
  methods: {
    getValidationMessage: validationMessage(formMessages),
  },
};
</script>
