<template>
  <div>
    <KrBankTransferForm
      v-if="paymentMethod === 'bank_transfer' && userCurrency === 'KRW'"
      @submit="onSubmit"
    />
    <JpBankTransferForm
      v-else-if="paymentMethod === 'bank_transfer' && userCurrency === 'JPY'"
      @submit="onSubmit"
    />
    <JpKonbiniForm
      v-else-if="paymentMethod === 'konbini' && userCurrency === 'JPY'"
      @submit="onSubmit"
    />
    <TwUniformInvoiceForm
      v-else-if="userCurrency === 'TWD'"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  props: {
    paymentMethod: String,
    paymentGateway: String,
  },
  components: {
    // use dynamic loading, not all forms are needed
    TwUniformInvoiceForm: () => import('@/components/modules/payment/forms/TwUniformInvoiceForm.vue'),
    KrBankTransferForm: () => import('@/components/modules/payment/forms/KrBankTransferForm.vue'),
    JpBankTransferForm: () => import('@/components/modules/payment/forms/JpBankTransferForm.vue'),
    JpKonbiniForm: () => import('@/components/modules/payment/forms/JpKonbiniForm.vue'),
  },
  computed: {
    ...mapState({
      // userCurrency: state => state.user.currency.toUpperCase(),
    }),
    ...mapGetters({
      // currentLanguageCode: 'user/getLanguageCode',
      userCurrency: 'user/currencyCode',
    }),
  },
  methods: {
    // METHODS FOR CREDIT PACKAGE ITEM
    onSubmit(formData) {
      console.log('emit onSubmit()');
      // emit the data
      // this.$emit('form-submit', formData);
      this.$emit('submit', formData);
    },
  },
};
</script>
