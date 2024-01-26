<template>
  <form @submit.prevent="onSubmit" novalidate>

    <h3>統一發票開立資訊</h3>

    <div class="form-group row">
      <label class="required col-sm-3 col-md-2 col-form-label">
        名稱
      </label>
      <div class="col-sm-9 col-md-10">
        <InputText
          v-model="form.name"
          :v="$v.form.name"
        />
      </div>
    </div>

    <div class="form-group row">
      <label class="optional col-sm-3 col-md-2 col-form-label">
        公司名稱
      </label>
      <div class="col-sm-9 col-md-10">
        <InputText
          v-model="form.organizationName"
          :v="$v.form.organizationName"
        />
      </div>
    </div>

    <div class="form-group row">
      <label class="required col-sm-3 col-md-2 col-form-label">
        電話
      </label>
      <div class="col-sm-9 col-md-10">
        <InputPhone
          v-model="form.phone"
          :v="$v.form.phone"
          mask="0##########"
        />
      </div>
    </div>

    <!--
    <div v-if="false" class="form-group row">
      <label for="BillingBusinessRegistrationRef" class="optional col-sm-3 col-md-2 col-form-label pt-0">
        發票
      </label>
      <div class="col-sm-9 col-md-10">
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" v-model="formData.uniformInvoiceType" id="customRadioInline1" name="customRadioInline1" class="custom-control-input">
          <label class="custom-control-label" for="customRadioInline1">二聯式電子發票</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" v-model="formData.uniformInvoiceType" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
          <label class="custom-control-label" for="customRadioInline2">二聯式捐贈發票</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" v-model="formData.uniformInvoiceType" id="customRadioInline2" name="customRadioInline1" class="custom-control-input">
          <label class="custom-control-label" for="customRadioInline2">三聯式電子發票（公司行號報帳使用）</label>
        </div>
        <p class="text-muted mb-0">
          依統一發票使用辦法規定：個人戶（二聯式）發票一經開立，不得任意更改為公司戶（三聯式）發票。
        </p>
      </div>
    </div>
    -->

    <div class="form-group row">
      <label class="optional col-sm-3 col-md-2 col-form-label">
        統一編號
      </label>
      <div class="col-sm-9 col-md-10">
        <input type="text"
              :disabled="isUniformInvoiceIdNotRequired"
               :class="{
              'is-invalid': !isUniformInvoiceIdNotRequired && _.get($v.form, 'uniformInvoiceId.$error'),
              'is-valid': !isUniformInvoiceIdNotRequired && !_.get($v.form, 'uniformInvoiceId.$invalid'),
              }"
               v-mask="'########'"
               v-model="form.uniformInvoiceId"
               class="form-control mb-2">
        <template v-if="!isUniformInvoiceIdNotRequired">
          <div class="invalid-feedback" v-if="!_.get($v.form, 'uniformInvoiceId.isValidTwGovernmentUniformInvoiceId')">
            錯誤的統一編號
          </div>
        </template>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" v-model="isUniformInvoiceIdNotRequired" class="custom-control-input" :id="`isUniformInvoiceIdNotRequired_${this._uid}`">
          <label class="custom-control-label" :for="`isUniformInvoiceIdNotRequired_${this._uid}`">
            發票不需統一編號
          </label>
        </div>
      </div>
    </div>

    <!--
    <div class="form-group row">
      <label class="optional col-sm-3 col-md-2 col-form-label">
        地址
      </label>
      <div class="col-sm-9 col-md-10">
          <textarea v-model.trim.lazy="form.address"
            rows="4" placeholder="郵寄地址" class="form-control mb-2" cols="80" spellcheck="false"
          ></textarea>
        <input type="text" v-model.trim.lazy="form.city" placeholder="城市" class="form-control mb-2">
        <input type="text" v-model.trim.lazy="form.region" placeholder="州/省/區" class="form-control mb-2">
        <SelectCountry
          v-model="form.countryCode"
        />
        <input type="text" v-model.trim.lazy="form.postalCode" placeholder="郵遞區號" class="form-control">
      </div>
    </div>
    -->

    <!--    <div class="form-group row">-->
    <!--      <label class="optional col-sm-3 col-md-2 col-form-label">-->
    <!--        希望開立品名-->
    <!--      </label>-->
    <!--      <div class="col-sm-9 col-md-10">-->
    <!--        <InputText-->
    <!--          v-model="form.description"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

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

import {
  required, minLength,
} from 'vuelidate/lib/validators';

import { isValidTwGovernmentUniformInvoiceId } from '@/services/order.service.js';

export default {
  name: 'tw-uniform-invoice-form',
  // el: '#demo',
  components: {
    // SelectCountry: () => import('@/components/ui/form/select/SelectCountryZhHant.vue'),
    InputText: () => import('@motionelements/core/src/components/ui/form/BaseInputText.vue'),
    InputPhone: () => import('@motionelements/core/src/components/ui/form/BaseInputPhone.vue'),
  },
  data() {
    return {
      // https://tools.ietf.org/id/draft-stepanek-jscontact-00.html
      // keep it flat for easy control
      // Government Uniform Invoice (GUI)
      isUniformInvoiceIdNotRequired: false,
      form: {
        name: '',
        organizationName: '',
        uniformInvoiceId: '',
        // company address if billed under company
        // address: '',
        // city: '',
        // region: '',
        // countryCode: 'TW',
        // postalCode: '',
        phone: '',
        // invoice description
        // description: '',
      },
    };
  },
  // dynamic validations
  validations() {
    const validations = {
      form: {
        name: {
          required,
          minLength: minLength(2),
        },
        organizationName: {
          required,
          minLength: minLength(2),
        },
        phone: {
          minLength: minLength(7),
        },
        uniformInvoiceId: {
          isValidTwGovernmentUniformInvoiceId,
        },
      },
    };

    // no need to check for id if not required (B2C)
    if (this.isUniformInvoiceIdNotRequired) {
      delete validations.form.uniformInvoiceId;
      delete validations.form.organizationName;
    }

    return validations;
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
    this.form.name = `${this.lastName} ${this.firstName}`;
    this.form.organizationName = this.organizationLegalName || this.organizationName;
  },
  methods: {
    onSubmit() {
      console.log('onSubmit()');
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        // shallow clone
        const formData = { ...this.form };
        if (this.isUniformInvoiceIdNotRequired === true) {
          formData.uniformInvoiceId = -1;
        }

        console.log('emit.submit', formData);

        this.$emit('submit', formData);
      } else {
        console.log('invalid', this.$v.form);
      }
    },
  },
  watch: {
    isUniformInvoiceIdNotRequired: function (value) {
      if (value) {
        // clear the input
        this.form.uniformInvoiceId = '';
      }
    },
  },
};
</script>
