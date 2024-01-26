<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      :pk="publishableKey"
      :sessionId="sessionId"
      :successUrl="successUrl"
      :cancelUrl="cancelUrl"
    >
      <template slot="checkout-button">
        <button @click="onClickCheckout" class="btn btn-primary btn-block">{{ label }}</button>
      </template>
    </stripe-checkout>

    <Modal v-if="hasPreCheckoutForm" id="modal-pre-checkout-form-stripe" size="lg">
      <template v-slot:title>
        More info
      </template>
      <PreCheckoutForm
        @submit="onSubmitPreCheckoutForm"
      />
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { StripeCheckout } from 'vue-stripe-checkout';
import { createCreditsCheckoutSession } from '@/services/order.service.js';

import Modal from '@/components/ui/BaseModal.vue';
import PreCheckoutForm from '@/components/modules/payment/forms/PreCheckoutForm.vue';

export default {
  props: {
    label: String,
    products: Array,
  },
  components: {
    StripeCheckout,
    Modal,
    PreCheckoutForm,
  },
  data: () => ({
    loading: false,
    publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
    sessionId: null,
    successUrl: null,
    cancelUrl: null,
    billingData: null,
  }),
  computed: {
    ...mapState({
      userCurrency: state => state.user.currency.toUpperCase(),
    }),
    hasPreCheckoutForm() {
      // credit card payment only TWD need to fill in VAT
      return ['TWD'].includes(this.userCurrency);
    },
  },
  methods: {
    onSubmitPreCheckoutForm(formData) {
      $('#modal-pre-checkout-form-stripe').modal('hide');
      console.log('stripeSubmitPreCheckoutForm()');
      console.log(JSON.stringify(formData));
      // show form
      this.billingData = formData;
      this.checkout();
    },
    onClickCheckout() {
      if (this.hasPreCheckoutForm) {
        $('#modal-pre-checkout-form-stripe').modal('show');
      } else {
        this.checkout();
      }
    },
    checkout() {
      console.log('checkout stripe');
      console.log(this.products);
      createCreditsCheckoutSession('stripe', {
        products: this.products,
        billing: this.billingData,
      })
        .then((data) => {
          console.log(data);
          this.sessionId = data.id;
          this.successUrl = data.success_url;
          this.cancelUrl = data.cancel_url;
          this.$refs.checkoutRef.redirectToCheckout();
        });
    },
  },
  created() {
  },
};
</script>
