<template>
  <div class="input-group">
    <div v-if="$slots.prepend"
        class="input-group-prepend">
      <slot name="prepend">
      </slot>
    </div>
    <input type="number"
           :disabled="disabled"
           v-model="model"
           v-mask="mask"
           :min="min"
           :max="max"
           :class="{
              'is-invalid': v && v.$error,
              'is-valid': v && !v.$invalid && model.length,
            }"
           @change="onChange"
           class="form-control form-control-number-spinner"
    >
    <slot name="append"></slot>
    <div class="input-group-append">
      <div class="input-group-text d-flex flex-column align-items-center justify-content-center p-0">
        <button
            type="button"
            class="btn btn-light btn-number-spinner px-2 py-0 rounded-0 flex-grow-1 mx-0 border-bottom-0 border-right"
            style="line-height:1;"
            @click="increment()"
        >
          <font-awesome-icon
              :icon="['far','plus']"
              fixed-width
              size="xs"
          />
        </button>
        <button
            type="button"
            class="btn btn-light btn-number-spinner px-2 py-0 rounded-0 flex-grow-1 mx-0"
            style="line-height:1;"
            @click="decrement()"
        >
          <font-awesome-icon
              :icon="['far','minus']"
              fixed-width
              size="xs"
          />
        </button>
      </div>
    </div>
    <div class="invalid-feedback" v-if="v && v.$error">
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
  minValue: function ({ $params }) {
    return this.$i18n.t('error.must_be_at_least_{number}', { number: $params.minValue.min });
  },
  maxValue: function ({ $params }) {
    return this.$i18n.t('error.must_be_less_than_{number}', { number: $params.maxValue.max });
  },
};

export default {
  name: 'base-input-number-spinner',
  props: {
    id: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      default: 0,
    },
    v: {
      type: Object,
    },
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  components: {
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', parseInt(value, 10));
      },
    },
    isRequired() {
      return _.has(this.v, '$params.required');
    },
    mask() {
      return '#'.repeat(this.max.toString().length);
    },
  },
  methods: {
    increment() {
      // console.log('increment');
      this.model = Math.min(this.max, parseInt(this.value, 10) + this.step);
      // this.$emit('change', value);
    },
    decrement() {
      // console.log('decrement');
      this.model = Math.max(this.min, parseInt(this.value, 10) - this.step);
      // this.$emit('change', value);
    },
    onChange(event) {
      let value = event.target.value;

      if (value < this.min) {
        value = this.min;
        this.model = value;
        // this.$forceUpdate();
      }
      if (value > this.max) {
        value = this.max;
        this.model = value;
        // this.$forceUpdate();
      }
      this.$emit('change', parseInt(value, 10));
    },
    getValidationMessage: validationMessage(formMessages),
  },
};
</script>


<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input.form-control-number-spinner::-webkit-outer-spin-button,
input.form-control-number-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.form-control-number-spinner {
  /* Firefox */
  -moz-appearance: textfield;
}
</style>
