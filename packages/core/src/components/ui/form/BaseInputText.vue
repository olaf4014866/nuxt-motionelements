<template>
  <div>
    <input v-if="mask.length"
      :id="id"
      :type="this.type"
      :name="this.name"
      v-model.trim="model"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid && model.length,
      }"
      :required="isRequired"
      v-mask="mask"
      @change="$emit('change', $event)"
      class="form-control"
    >
    <input v-else
      :id="id"
      :type="this.type"
      :name="this.name"
      v-model.trim="model"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid && model.length,
      }"
      :required="isRequired"
      @change="$emit('change', $event)"
      class="form-control"
    >
    <div class="invalid-feedback" v-if="v && v.$error && showErrorMsg">
      {{ getValidationMessage(v) }}
    </div>
    <slot name=custom-message></slot>
  </div>
</template>

<script>
import { validationMessage } from 'vuelidate-messages';

const formMessages = {
  // required: () => 'Required',
  required: function () {
    return this.$i18n.t('error.required');
  },
  // minLength: ({ $params }) => `Must be at least ${$params.minLength.min} characters.`,
  minLength: function ({ $params }) {
    return this.$i18n.t('error.must_be_at_lease_{count}_characters', { count: $params.minLength.min });
  },
  maxLength: function ({ $params }) {
    return this.$i18n.t('error.must_be_less_than_{count}_characters', { count: $params.maxLength.max });
  },
  email: function () {
    return this.$i18n.t('error.invalid_email_address');
  },
};

export default {
  name: 'base-input-text',
  props: {
    id: String,
    value: {
      type: [String, Number],
      default: '',
    },
    v: {
      type: Object,
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
    },
    mask: {
      type: [String, Array],
      required: false,
      default: '',
    },
    showErrorMsg: {
      type: Boolean,
      default: true,
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
