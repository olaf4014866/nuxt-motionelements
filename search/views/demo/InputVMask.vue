<template>
  <div>
    <section>
      <div class="container py-5">
        <h1>Components Test</h1>

        <h2>v-mask</h2>
        <p>https://www.npmjs.com/package/v-mask</p>

        <form @submit.prevent="onSubmit" novalidate>
          <div class="row">
            <div class="col-12 col-sm-6">
              <div class="form-group">
                <label class="required">Name (no numbers, min length: 3)</label>
                <InputText
                  v-model="form.name"
                  :v="$v.form.name"
                  :mask="nameMask"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="required">Phone (optional)</label>
            <InputPhone
              v-model="form.phone"
              :v="$v.form.phone"
              mask="0##########"
            />
          </div>

          <div class="form-group">
            <label class="required">Text (optional)</label>
            <InputText
              v-model="form.text"
            />
          </div>

          <button
            class="btn btn-primary"
            @click="onSubmit"
          >
            Submit
          </button>
        </form>

        <div v-if="_.size(submittedData)">
          <div>Submitted</div>
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
    // InputText: () => import('@/components/ui/form/BaseInputText.vue'),
    InputText: () => import('@motionelements/core/src/components/ui/form/BaseInputText.vue'),
    // InputPhone: () => import('@/components/ui/form/BaseInputPhone.vue'),
    InputPhone: () => import('@motionelements/core/src/components/ui/form/BaseInputPhone.vue'),
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        text: '',
      },
      nameMask: [
        /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/,
        /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/,
        /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/,
        /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/, /[^0-9]/,
      ],
      submittedData: {},
    };
  },
  computed: {
  },
  validations: {
    form: {
      name: {
        required,
        alpha,
        minLength: minLength(3),
      },
      phone: {
        // required,
        minLength: minLength(10),
      },
    },
  },
  methods: {
    onSubmit() {
      this.submittedData = {};
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) return;

      if (!this.$v.form.$invalid) {
        // shallow clone
        const formData = { ...this.form };
        this.$emit('submit', formData);
        this.submitForm(formData);
      }
    },
    submitForm(formData) {
      console.log('form submit');
      // this.submitButton.isLoading = true;
      this.submittedData = formData;
      setTimeout(this.onComplete, 2000);
    },
  },
};
</script>
