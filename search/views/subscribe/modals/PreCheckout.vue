<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('payment.billing_info' )}}
    </template>
    <PreCheckoutForm
      :paymentMethod="paymentMethod"
      @submit="onSubmit"
    />
  </Modal>
</template>

<script>

export default {
  name: 'subscription-pre-checkout-form-modal',
  props: {
    paymentMethod: String,
  },
  components: {
    PreCheckoutForm: () => import('@/components/modules/payment/forms/PreCheckoutForm.vue'),
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    // METHODS FOR CREDIT PACKAGE ITEM
    onSubmit(formData) {
      // console.log('caught emit onSubmit()1111111', formData);
      // emit the data
      this.$emit('submit', formData);
    },
  },
};
</script>
