<template>

  <form @submit.prevent="onSubmit" novalidate>

    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label>姓</label>
          <InputText
            v-model="form.lastName"
            :v="$v.form.lastName"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label>名</label>
          <InputText
            v-model="form.firstName"
            :v="$v.form.firstName"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label>セイ</label>
          <InputText
            v-model="form.lastNameKana"
            :v="$v.form.lastNameKana"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group">
          <label>メイ</label>
          <InputText
            v-model="form.firstNameKana"
            :v="$v.form.firstNameKana"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="optional">会社名</label>
      <InputText
        v-model="form.organizationName"
      />
    </div>

    <div class="form-group">
      <label class="required">電話</label>
      <InputPhone
        v-model="form.phone"
        :v="$v.form.phone"
        mask="0##########"
      />
    </div>
    <!--    mask="9{2,3}-9{3,4}-9{3,4}"-->

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
import { mapState } from 'vuex';

import { required, numeric, minLength } from 'vuelidate/lib/validators';

function isKatakana(value) {
  const regex = /[\u30A0-\u30FF]|[\uFF00-\uFFEF]\s/g;
  return regex.test(value);
}

export default {
  name: 'jp-bank-transfer-form',
  // el: '#demo',
  components: {
    InputText: () => import('@motionelements/core/src/components/ui/form/BaseInputText.vue'),
    InputPhone: () => import('@motionelements/core/src/components/ui/form/BaseInputPhone.vue'),
  },
  data() {
    return {
      phone: {
        isValid: null,
      },
      form: {
        firstName: '',
        lastName: '',
        firstNameKana: '',
        lastNameKana: '',
        phone: '',
        organizationName: '',
      },
    };
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      firstNameKana: {
        required,
        isKatakana,
      },
      lastNameKana: {
        required,
        isKatakana,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
      },
    },
  },
  computed: {
    ...mapState({
      lastName: state => state.user.member.lastName,
      firstName: state => state.user.member.firstName,
      organizationLegalName: state => state.user.member.organization.legalName,
      organizationName: state => state.user.member.organization.name,
    }),
  },
  mounted: function () {
    // populate form
    this.form.lastName = this.lastName;
    this.form.firstName = this.firstName;
    this.form.organizationName = this.organizationLegalName || this.organizationName;
    // test data
    // this.formData.lastName = '山田';
    // this.formData.firstName = '太郎';
    // this.formData.lastNameKana = 'ヤマダ';
    // this.formData.firstNameKana = 'タロウ';
    // this.formData.phone = '080-1111-2222';
    // this.formData.organizationName = 'abc';
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
