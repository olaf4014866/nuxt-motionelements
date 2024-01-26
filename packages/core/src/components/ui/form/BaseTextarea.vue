<template>
  <div>
    <textarea
      v-model.trim="model"
      :id="id"
      :name="this.name"
      :placeholder="placeholder"
      :required="isRequired"
      :rows="rows"
      :class="{
        'is-invalid': v && v.$error,
        'is-valid': v && !v.$invalid && model.length,
      }"
      @change="$emit('change', $event)"
      class="form-control"
    >
    </textarea>
    <div class="invalid-feedback" v-if="v && v.$error">
      {{ getValidationMessage(v) }}
    </div>
    <slot name=custom-message></slot>
  </div>
</template>

<script>
import { validationMessage } from 'vuelidate-messages';

const formMessages = {
  required: function () {
    return this.$i18n.t('error.required');
  },
  minLength: function ({ $params }) {
    return this.$i18n.t('error.must_be_at_lease_{count}_characters', { count: $params.minLength.min });
  },
  maxLength: function ({ $params }) {
    return this.$i18n.t('error.must_be_less_than_{count}_characters', { count: $params.maxLength.max });
  },
};

export default {
  name: 'base-input-text',
  props: {
    id: String,
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
    },
    name: {
      type: String,
      default: null,
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
    rows: {
      type: [String, Number],
      default: 5,
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
