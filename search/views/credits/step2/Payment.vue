<template>
  <div>
    <OrderSummary
      v-if="order"
      :order="order"
      :showCoupon="showCoupon"
    />
    <PaymentMethods
      :primaryPaymentMethodCodes="primaryPaymentMethods"
      :secondaryPaymentMethodCodes="secondaryPaymentMethods"
      :order="order"
      @select-payment-method="onSelectPaymentMethod"
    />
    <Modal id="modal-pre-checkout-form" size="lg">
      <template v-slot:title>
        {{ $t('payment.billing_info' )}}
      </template>
      <PreCheckoutForm
        :paymentMethod="selectedPaymentMethod"
        @submit="onSubmitPreCheckoutForm"
      />
    </Modal>

  </div>
</template>

<script>
// handles payment here
import { mapState, mapGetters } from 'vuex';

import Modal from '@/components/ui/BaseModal.vue';

import OrderSummary from '@/views/credits/OrderSummary.vue';
import PaymentMethods from '@/views/credits/step2/PaymentMethods.vue';

import {
  checkoutCredits, createCreditsCheckoutSession, redirectToStripeCheckout,
  createCreditsPaymentIntent,
  // createCreditsOrder,
} from '@/services/order.service.js';

import validateAccountMixin from '@motionelements/core/src/components/mixins/validate-account.mixin.js';

export default {
  // name: 'credits',
  mixins: [validateAccountMixin],
  props: {
    selectedCreditPack: {
      type: Object,
    },
    order: {
      type: Object,
      required: true,
    },
  },
  components: {
    OrderSummary,
    PreCheckoutForm: () => import('@/components/modules/payment/forms/PreCheckoutForm.vue'),
    PaymentMethods,
    Modal,
  },
  data() {
    return {
      selectedPaymentMethod: null,
      billingData: null,
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      paymentStatus: '',
      returnUrl: null,
      intendedUrl: null,
    };
  },
  created() {
    if (this.$route.query.intended_url) {
      // this.returnUrl = this.$route.query.return_url;
      this.intendedUrl = this.$route.query.intended_url;
    }
    console.log('GOT RETURN', this.intendedUrl);
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      // userCurrency: state => state.user.currency.toUpperCase(),
      // userLanguage: state => state.user.language,
    }),
    ...mapGetters({
      userLanguage: 'user/getLanguageCode',
      userCurrency: 'user/getCurrencyCode',
    }),
    primaryPaymentMethods() {
      // get valid payment methods based on country, currency
      switch (this.userCurrency) {
        case 'JPY':
          return ['credit_card', 'paypal', 'bank_transfer'];
        case 'KRW':
          return ['credit_card', 'paypal'];
        case 'TWD':
          return ['credit_card', 'paypal'];
        case 'INR':
          // paypal does not support INR
          return ['credit_card'];
        default:
          return ['credit_card', 'paypal'];
      }
    },
    secondaryPaymentMethods() {
      switch (this.userCurrency) {
        case 'JPY':
          return ['konbini'];
        case 'KRW':
        case 'TWD':
          return ['bank_transfer'];
        default:
          return [];
      }
    },
    hasPreCheckoutForm() {
      switch (this.selectedPaymentMethod) {
        case 'konbini':
        case 'bank_transfer':
          return true;
        default:
          return ['TWD'].includes(this.userCurrency);
      }
    },
    productSkus() {
      const skus = [];

      if (!_.has(this.order, 'lines') || !_.isArray(this.order.lines)) {
        return [];
      }
      this.order.lines.forEach((lineItem) => {
        skus.push(lineItem.product.sku);
      });
      // const creditPack = this.selectedCreditPack;
      console.log('skus', skus);
      return skus;
    },
    showCoupon() {
      return _.get(this.selectedCreditPack, 'type') === 'custom';
    },
  },
  methods: {
    // checkout here
    onSubmitPreCheckoutForm(formData) {
      console.log(JSON.stringify(formData));
      // save data
      // now checkout
      $('#modal-pre-checkout-form').modal('hide');
      this.billingData = formData;
      // if (savePreCheckoutData(this.selectedPaymentMethod, formData)) {
      this.checkout();
    },
    onSelectPaymentMethod(paymentMethod) {
      console.log(`checkout: ${paymentMethod}`);

      if (!this.validateAccount()) {
        return;
      }
      // if (!this.isMember) {
      //   this.$store.dispatch('modal/showSignUp');
      //   return;
      // }

      // get all values, POST to server
      // check for redirection
      switch (paymentMethod) {
        case 'paypal':
        case 'bank_transfer':
        case 'konbini':
        case 'credit_card':
          this.selectedPaymentMethod = paymentMethod;
          console.log('handleCheckout()');
          console.log(`method: ${this.selectedPaymentMethod}`);
          // use order service to submit
          if (this.hasPreCheckoutForm) {
            // show modal
            $('#modal-pre-checkout-form').modal('show');
            break;
          } else {
            this.checkout();
          }
          break;

        default:
          console.log('not selected');
          // this.selectedPaymentMethod = paymentMethod;
          // run stripe checkout.js inside StripeCheckoutButton.vue
          break;
      }
    },
    checkout() {
      console.log('checkoutCredits');

      // switch (this.selectedPaymentMethod) {
      switch (true) {
        case this.selectedPaymentMethod === 'credit_card' && ['ko', 'zh-hant'].includes(this.userLanguage): // pending stripe checkout support for ko

          this.$store.dispatch('blocker/show', {
            message: this.$i18n.t('payment.processing'),
          });

          // createCreditsOrder('stripe', {
          createCreditsPaymentIntent({
            products: this.productSkus,
            billing: this.billingData,
          })
            .then((response) => {
              try {
                const data = response.data.data;
                const order = data.order;
                // console.log('router.push', {
                //   // paymentIntentClientSecret: response.data.data.clientSecret,
                //   order: order,
                //   cancelUrl: this.$store.state.route.fullPath,
                //   successUrl: this.returnUrl ? this.$link(this.returnUrl).param('order', order.id).url() : this.$link('/payment/success').param('inv', order.id).url(),
                // });

                const cancelUrl = this.$store.state.route.fullPath;
                const successUrl = this.intendedUrl ? this.$link(this.intendedUrl).param('order', order.id).url() : this.$link('/payment/success').param('inv', order.id).url();

                /*
                const Modal = () => ({
                  component: import('@/views/payment/modals/CheckoutCreditCard.vue'),
                });
                this.$store.dispatch('payment/hideBlocker');
                this.$store.dispatch('modal/show', {
                  component: Modal,
                  props: {
                    order: order,
                    cancelUrl: cancelUrl,
                    successUrl: successUrl,
                  },
                });
                */
                this.$router.push({
                  // path: this.$link('/payment/credit-card')
                  //   // .param('order', order.id)
                  //   // .param('cancel_url', cancelUrl)
                  //   // .param('success_url', successUrl)
                  //   .fullPath(),
                  // query: {
                  //   'order': order.id,
                  //   'cancel_url': cancelUrl,
                  //   'success_url': successUrl,
                  // },
                  name: 'payment-credit-card',
                  query: {
                    order: order.id,
                    cancelUrl: cancelUrl,
                    successUrl: successUrl,
                  },
                  params: {
                    // paymentIntentClientSecret: data.clientSecret,
                    lang: this.userLanguage,
                    // order: order,
                    // cancelUrl: cancelUrl,
                    // successUrl: successUrl,
                  },
                });
              } catch (e) {
                console.error(e);
                // this.paymentStatus = 'ERROR';
                this.$emit('error', e);
                this.$store.dispatch('blocker/hide');
              } finally {
                this.$emit('loading', false);
              }
            }).catch((e) => {
              console.error('payment error', e);
              this.$store.dispatch('blocker/hide');
            });
          break;

        case this.selectedPaymentMethod === 'credit_card':
          // this.paymentStatus = 'REDIRECTING TO STRIPE.';
          this.$store.dispatch('blocker/show', {
            message: this.$i18n.t('payment.redirecting_to_secure_payment_gateway'),
          });

          this.$emit('redirecting', 'stripe');
          createCreditsCheckoutSession('stripe', {
            products: this.productSkus,
            billing: this.billingData,
            intendedUrl: this.intendedUrl,
          })
            .then((response) => {
              const data = response.data.data;
              try {
                redirectToStripeCheckout(this.publishableKey, {
                  sessionId: data.id,
                });
              } catch (e) {
                console.error(e);
                this.$emit('error', e);
                this.$store.dispatch('blocker/hide');
              } finally {
                this.$emit('loading', false);
              }
            }).catch((e) => {
              console.error('Stripe payment error', e);
              this.$store.dispatch('blocker/hide');
            });
          break;

        default:

          try {
            this.$store.dispatch('blocker/show', {
              message: this.$i18n.t('payment.processing'),
            });

            checkoutCredits(this.selectedPaymentMethod, {
              products: this.productSkus,
              billing: this.billingData,
            }).then((response) => {
              const data = response.data.data;

              this.$store.dispatch('blocker/show', {
                message: this.$i18n.t('payment.redirecting_to_{name}', { name: 'PayPal' }),
              });

              if (_.has(data, 'redirect.url')) {
                this.$emit('redirecting', 'paypal');
                // console.log(`redirect called: ${data.redirect.url}`);
                window.location.href = data.redirect.url;
              } else {
                this.$store.dispatch('blocker/hide');

                if (_.get(data, 'status') === 'authorized') {
                  this.$emit('payment-authorized', {
                    paymentMethod: this.selectedPaymentMethod,
                    order: data,
                  });
                }
              }
            }).catch((e) => {
              console.error('paymentError', e);
              this.$store.dispatch('blocker/hide');
            });
          } catch (e) {
            console.error(e);
            this.$store.dispatch('blocker/hide');
          }
      }
      // }
    },
  },
};
</script>
