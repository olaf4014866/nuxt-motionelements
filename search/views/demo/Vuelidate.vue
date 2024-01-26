<template>
  <section>
    <div class="container py-5">
      <h2>Vuelidate test</h2>

      <form :class="{
              'was-validated': !$v.$invalid,
            }"
            @submit.prevent="onSubmit" novalidate>
            <div class="form-group">
              <label class="required">Name (min length 3)</label>
              <input
                type="text"
                class="form-control form-control-lg"
                :class="{
              'is-invalid': $v.formData.name.$error,
              'is-valid': !$v.formData.name.$invalid,
            }"
                @input="$v.formData.name.$touch()"
                v-model="formData.name"
                required
              />
              <!--            v-mask="{regex: '[^0-9]+', placeholder: '', autoUnmask: true}"-->
              <div class="invalid-feedback" v-if="!$v.formData.name.required">This is required.</div>
              <div class="invalid-feedback" v-else-if="!$v.formData.name.minLength">
                Name must have at least {{$v.formData.name.$params.minLength.min}} letters.
              </div>
              <VuelidateStates v-if="showStates" :object="$v.formData.name" />
            </div>

            <div class="form-group">
              <label class="required">Phone</label>
              <input type="tel" v-model="formData.phone"
                     :class="{
                'is-invalid': $v.formData.phone.$error,
                'is-valid': !$v.formData.phone.$invalid,
                }"
                     @input="$v.formData.phone.$touch()"
                     v-mask="{mask: '(099)-9999-9999', placeholder: '_', autoUnmask: true}"
                     class="form-control form-control-lg" required>
              <div class="invalid-feedback" v-if="!$v.formData.phone.required">This is required.</div>
              <VuelidateStates v-if="showStates" :object="$v.formData.phone" />
            </div>

        <hr>
        <Button
          class="btn btn-default"
          :class="{
            'btn-primary': !$v.$invalid,
          }"
          type="submit"
          :disabled="$v.$invalid"
        >
          Submit
        </Button>

        <div>
          <VuelidateStates v-if="showStates" :object="$v" />
        </div>

      </form>

    </div>
  </section>
</template>

<script>
import {
  required, minLength, numeric,
} from 'vuelidate/lib/validators';

export default {
  name: 'test',
  components: {
    VuelidateStates: () => import('@/views/demo/VuelidateStates.vue'),
  },
  data() {
    return {
      showStates: false,
      formData: {
        name: '',
        phone: '',
      },
    };
  },
  computed: {
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(3),
      },
      phone: {
        required,
        numeric,
        minLength: minLength(8),
      },
    },
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      // check nested data
      // make sure to touch data
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.error(`submitted: ${JSON.stringify(this.formData)}`);
        // this.submitForm();
      } else {
        console.error('Invalid data. Fail to submit.');
      }
      // console.error('submit');
      // this.submitForm();
    },
  },
};
</script>
