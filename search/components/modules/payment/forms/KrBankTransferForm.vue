<template>
  <form @submit.prevent="onSubmit" novalidate>

    <div class="form-group row">
      <label class="required col-sm-3 col-md-2 col-form-label">
        이름
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
        회사 이름
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
        전화
      </label>
      <div class="col-sm-9 col-md-10">
        <InputPhone
          v-model="form.phone"
          :v="$v.form.phone"
          mask="0##########"
        />
      </div>
    </div>

    <div class="form-group row">
      <label class="optional col-sm-3 col-md-2 col-form-label">
      </label>
      <div class="col-sm-9 col-md-10">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" v-model="isTaxInvoiceRequired" class="custom-control-input" :id="`isTaxInvoiceRequired_${this._uid}`">
          <label class="custom-control-label" :for="`isTaxInvoiceRequired_${this._uid}`">
            세금계산서 필요
          </label>
        </div>
      </div>
    </div>

    <template v-if="isTaxInvoiceRequired">
      <hr>

      <dl class="dl-horizontal dl-horizontal-lg">
        <!-- Business Registration -->
        <dt>사업자등록증</dt>
        <dd>
          <FormFileDropUpload
            @upload-done='onUploadDone' />
          <!-- <div id="business-registration-certificate-upload" class="dropfile">
            Drop file here.
          </div>
          <button type="submit" class="btn btn-primary">
            Upload
          </button> -->
        </dd>
      </dl>

      <!-- Tax Invoice Manager-->
      <h4>세금계산서 담당자</h4>
      <div class="form-group row">
        <label class="required col-sm-3 col-md-2 col-form-label">
          이름
        </label>
        <div class="col-sm-9 col-md-10">
          <InputText
            v-model="form.taxManagerName"
            :v="$v.form.taxManagerName"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="required col-sm-3 col-md-2 col-form-label">
          전화
        </label>
        <div class="col-sm-9 col-md-10">
          <InputPhone
            v-model="form.taxManagerPhone"
            :v="$v.form.taxManagerPhone"
            mask="0##########"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="required col-sm-3 col-md-2 col-form-label">
          이메일
        </label>
        <div class="col-sm-9 col-md-10">
          <InputText
            type="email"
            v-model="form.taxManagerEmail"
            :v="$v.form.taxManagerEmail"
          />
        </div>
      </div>

      <hr>

      <div class="form-group row">
        <label class="optional col-sm-3 col-md-2 col-form-label">
          {{ $t('payment.address') }}
        </label>
        <div class="col-sm-9 col-md-10">
          <textarea v-model.trim.lazy="form.address"
                    rows="4" :placeholder="$t('payment.company_address')" class="form-control mb-2" cols="80" spellcheck="false"
          />
          <!--        <input type="text" v-model.trim.lazy="form.city" placeholder="도시" class="form-control mb-2">-->
          <input type="text" v-model.trim.lazy="form.region" placeholder="지역/시" class="form-control mb-2">
          <!--        <SelectCountry :model="form.countryCode"/>-->
          <input type="text" v-model.trim.lazy="form.postalCode" placeholder="우편번호" class="form-control">
        </div>
      </div>
    </template>


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
  minLength, required, numeric, email,
} from 'vuelidate/lib/validators';

export default {
  name: 'kr-billing-form',
  // el: '#demo',
  components: {
    FormFileDropUpload: () => import('@/components/modules/payment/FormFileDropUpload.vue'),
    // SelectCountry: () => import('@/components/ui/form/select/SelectCountry.vue'),
    InputText: () => import('@motionelements/core/src/components/ui/form/BaseInputText.vue'),
    InputPhone: () => import('@motionelements/core/src/components/ui/form/BaseInputPhone.vue'),
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        organizationName: '',
        organizationRegistrationId: '',
        // company address if billed under company
        address: '',
        // city: '',
        region: '',
        countryCode: 'KR',
        postalCode: '',
        // special for korea
        taxManagerName: '',
        taxManagerPhone: '',
        taxManagerEmail: '',
        businessRegistrationCertificate: {
          url: null,
          filename: null,
        },
      },
      isTaxInvoiceRequired: false,
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
        phone: {
          required,
          numeric,
          minLength: minLength(9),
        },
        organizationName: {
          required,
        },
        taxManagerName: {
          required,
          minLength: minLength(2),
        },
        taxManagerPhone: {
          required,
          numeric,
          minLength: minLength(9),
        },
        taxManagerEmail: {
          required,
          email,
        },
        // businessRegistrationCertificate: {
        //   required,
        // },
      },
    };

    // no need to check for id if not required (B2C)
    if (!this.isTaxInvoiceRequired) {
      delete validations.form.taxManagerName;
      delete validations.form.taxManagerPhone;
      delete validations.form.taxManagerEmail;
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
    onUploadDone(file) {
      if (file) {
        this.form.businessRegistrationCertificate = {
          url: file.url,
          filename: file.filename,
        };
      }
    },
    onSubmit() {
      this.$v.form.$touch();

      if (!this.$v.form.$invalid) {
        // shallow clone
        const formData = { ...this.form };
        formData.taxInvoice = !!this.isTaxInvoiceRequired;
        console.log('emit', formData);
        this.$emit('submit', formData);
      }
    },
  },
};
</script>
