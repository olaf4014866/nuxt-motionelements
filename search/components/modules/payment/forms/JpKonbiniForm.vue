<template>

  <form @submit.prevent="onSubmit" novalidate>

    <div class="form-group">
      <label>コンビニエンスストア</label>

      <BaseSelect
        v-model="form.paymentVenue"
        :v="$v.form.paymentVenue"
      >
        <template v-slot:options>
          <optgroup>
            <option disabled value="">選択</option>
            <option value="daily_yamazaki">デイリーヤマザキ</option>
            <option value="family_mart">ファミリーマート</option>
            <option value="lawson">ローソン</option>
            <option value="ministop">ミニストップ</option>
            <option value="seicomart">セイコーマート</option>
            <option value="seven_eleven">セブンイレブン</option>
          </optgroup>
        </template>
      </BaseSelect>
    </div>

    <div class="form-group">
      <label class="required">電話</label>
      <InputPhone
        v-model="form.phone"
        :v="$v.form.phone"
        mask="0##########"
      />
    </div>

    <p class="text-right">
      <button type="submit" class="btn btn-primary">
        {{ $t('cta.next') }}
        <font-awesome-icon
          :icon="['fas','chevron-right']"
          fixed-width
          class="ml-1"
        />
      </button>
    </p>

  </form>
</template>


<script>

import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'jp-konbini-form',
  // el: '#demo',
  components: {
    InputPhone: () => import('@motionelements/core/src/components/ui/form/BaseInputPhone.vue'),
    BaseSelect: () => import('@motionelements/core/src/components/ui/form/BaseSelect.vue'),
  },
  data() {
    return {
      form: {
        paymentVenue: '',
        phone: '',
      },
    };
  },
  validations: {
    form: {
      paymentVenue: {
        required,
      },
      phone: {
        minLength: minLength(10),
      },
    },
  },
  mounted: function () {
  },
  methods: {
    onSubmit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) return;

      if (!this.$v.form.$invalid) {
        // shallow clone
        const formData = { ...this.form };
        this.$emit('submit', formData);
      }
    },
  },
};
</script>
