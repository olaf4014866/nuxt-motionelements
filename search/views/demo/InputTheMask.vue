<template>
  <div>
    <section>
      <div class="container py-5">
        <h1>Components Test</h1>

        <h2>vue-inputmask test</h2>

        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label class="required">Name (no numbers)</label>
                <the-mask
                  type="text"
                  class="form-control form-control-lg"
                  :class="{
                    'is-invalid': $v.form.name.$error,
                    'is-valid': !$v.form.name.$invalid,
                  }"
                  @input="onInputName"
                  v-model.trim="form.name"
                  :mask="['SSSSSSSSSSSSSS']"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="required">Phone</label>
            <the-mask type="tel" v-model="form.phone"
                   :class="{
                'is-invalid': $v.form.phone.$error,
                'is-valid': !$v.form.phone.$invalid,
              }"
                   :mask="['0#-####-####', '0##-###-####', '0###-##-####']"
                      @input="onInputPhone"
                   class="form-control" required
            />
          </div>

          <button
            class="btn btn-primary"
            @click="onSubmit"
          >
            Submit
          </button>
        </form>

        <div v-if="submittedData">
          Submitted<br>
          {{ submittedData }}
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import {
  required, minLength, alpha,
} from 'vuelidate/lib/validators';

export default {
  name: 'test',
  components: {
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
      },
      submittedData: '',
    };
  },
  computed: {
  },
  validations: {
    form: {
      name: {
        required,
        alpha,
        minLength: minLength(4),
      },
      phone: {
        required,
      },
    },
  },
  methods: {
    onInputName(value) {
      console.log('name', value);
    },
    onInputPhone(value) {
      console.log('phone', value);
    },
    onSubmit() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        this.submitForm();
      }
    },
    submitForm() {
      console.log('form submit');
      this.submittedData = this.form;
      // this.submitButton.isLoading = true;
      // setTimeout(this.onComplete, 2000);
    },
  },
};
</script>
