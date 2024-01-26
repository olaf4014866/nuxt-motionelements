<template>
  <div>
    <div>
      <div class="container">
        <div class="row flex-column-reverse flex-lg-row my-5">

          <div class="col-12 col-lg-4 mb-3">
            <div class="mx-n3 mt-n3">
              <SubscriptionPlan
                v-if="subscriptionPlan"
                :plan="subscriptionPlan"
                :showCta="false"
                :showHelpLinks="false"
                collapse
                :featuredText="$t('subscription_plan.header_selected')"
              />
            </div>

            <div class="card overflow-hidden mb-3">
              <div class="card-body bg-gradient-subscription">
                <div class="d-flex">
                  <div class="mr-3">
                    <font-awesome-layers class="fa-3x" fixed-width>
                      <font-awesome-icon :icon="['fad', 'credit-card']" class="text-white no-invert" />
                      <font-awesome-icon :icon="['far', 'clock']" class="text-info" transform="shrink-8 down-5 right-7" />
                    </font-awesome-layers>
                  </div>
                  <div class="flex-grow-1">
                    <h4 class="h5 card-title text-dark no-invert">
                      {{ $t('subscription_plan.annual_billing') }}<br>
                      ({{ $t('subscription_plan.auto_renew') }})
                    </h4>
                    <p class="small mb-0 text-dark no-invert">
                      {{ $t('payment.automatic_annual_renewal_text')}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-8">

            <h2 class="h4">
               {{ $t('subscribe.payment_heading') }}
            </h2>
            <p>
              {{ $t('subscribe.payment_subheading') }}
            </p>

            <OrderSummary
              v-if="order"
              :order="order"
            />

            <div>
              <!-- <h3 class="h5">
                {{ $t('payment.add_a_payment_method')}}
              </h3> -->
              <PaymentMethods
                :primaryPaymentMethodCodes="primaryPaymentMethods"
                :secondaryPaymentMethodCodes="secondaryPaymentMethods"
                :order="order"
                @select-payment-method="onSelectPaymentMethod"
              />
            </div>

          </div>


        </div>
      </div>
    </div>


    <!--    <Modal v-if="hasPreCheckoutForm" id="modal-pre-checkout-form" size="lg">-->
    <!--
    <Modal id="modal-pre-checkout-form" size="lg">
      <template v-slot:title>
        More info
      </template>
      <PreCheckoutForm
        :paymentMethod="selectedPaymentMethod"
        @submit="onSubmitPreCheckoutForm"
      />
    </Modal>
    -->
<!--    <Blocker v-if="showBlocker">-->
<!--      <template v-slot:message>-->
<!--        <p>{{ blockerMessage }}</p>-->
<!--      </template>-->
<!--    </Blocker>-->
  </div>
</template>

<script>
// handles payment here
import { mapState } from 'vuex';

// import Modal from '@/components/ui/BaseModal.vue';
import OrderSummary from '@/views/credits/OrderSummary.vue';
import PaymentMethods from '@/views/credits/step2/PaymentMethods.vue';

import {
  getOrderPreview,
  createSubscriptionCheckoutSession,
  // createSubscriptionPaymentIntent,
  redirectToStripeCheckout,
  createSubscriptionOrder,
  // getSubscriptionPlan,
} from '@/services/order.service.js';

// import notificationService from '@motionelements/core/src/services/notification.service.js';

export default {
  name: 'subscribe-payment',
  props: {
  },
  components: {
    OrderSummary,
    // PreCheckoutForm: () => import('@/components/modules/payment/forms/PreCheckoutForm.vue'),
    PaymentMethods,
    // Blocker: () => import('@motionelements/core/src/components/ui/Blocker.vue'),
    // Modal,
    // TablePricingPlan,
    SubscriptionPlan: () => import('@/views/subscribe/section/SubscriptionPlan.vue'),
  },
  data() {
    return {
      selectedPaymentMethod: 'credit_card',
      billingData: null,
      publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      paymentStatus: '',
      order: {},
      currentPlan: null,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      // isUserLoaded: state => state.user.isLoaded,
      // showBlocker: state => state.payment.blocker.show,
      // blockerMessage: state => state.payment.blocker.message,
      subscriptionPlans: state => state.subscription.plans,
      userLanguage: state => state.user.language,
      userCurrency: state => state.user.currencyCode,
    }),
    // ...mapGetters({
    //   // userLanguage: 'user/getLanguageCode',
    //   // userCurrency: 'user/getCurrencyCode',
    // }),
    subscriptionPlan() {
      // let id = this.$route.query.plan;
      //
      // if (!id || !this.subscriptionPlans) {
      //   return null;
      // }
      //
      // id = id.replace('-', '_').toLowerCase();
      //
      // return this.subscriptionPlans.find(plan => plan.id === id);

      return this.$store.getters['subscription/getPlanById'](this.$route.query.plan);
    },
    primaryPaymentMethods() {
      return ['credit_card'];
    },
    secondaryPaymentMethods() {
      return [];
    },
    hasPreCheckoutForm() {
      console.log('hasPreCheckoutForm()');
      console.log(`method: ${this.selectedPaymentMethod}`);
      switch (this.selectedPaymentMethod) {
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
    products() {
      const products = [];

      if (!_.has(this.order, 'lines') || !_.isArray(this.order.lines)) {
        return [];
      }
      this.order.lines.forEach((lineItem) => {
        products.push(lineItem.product);
      });
      // const creditPack = this.selectedCreditPack;
      console.log('products1()');
      console.log(products);
      return products;
    },
  },
  created() {
    // this.$store.dispatch('blocker/hide');
    // this.init();
  },
  mounted() {
    this.$store.dispatch('blocker/hide');
    console.log('planID', this.$route.query.plan);

    if (!this.$route.query.plan) {
      this.onPlanNotFound();
    }
  },
  methods: {
    onPlanNotFound() {
      this.$router.replace({
        path: this.$link('/subscribe').fullPath(),
      });
      // notificationService.flash({
      //   level: 'info',
      //   title: 'Subscription plan not found',
      // });
    },
    init() {
      this.$store.dispatch('subscription/getPlans').then((response) => {
        // return to main page if plan not found
        const plans = response.data.data;

        const planID = this.$route.query.plan.replace('-', '_').toLowerCase();

        const plan = plans.find(plan => plan.id === planID);

        if (!plan) {
          this.onPlanNotFound();
        }
      });

      if (this.$route.query.plan) {
        getOrderPreview({
          products: [
            this.$route.query.plan,
          ],
        }).then((response) => {
          this.order = response.data.data;
        });
      }
    },
    onSubmitPreCheckoutForm(formData) {
      console.log('onSubmitPreCheckoutForm222', formData);
      // save data
      // now checkout
      this.$store.dispatch('modal/hide');
      // $('#modal-pre-checkout-form').modal('hide');
      this.billingData = formData;
      this.checkout();
    },
    onSelectPaymentMethod(paymentMethod) {
      console.log(`checkout: ${paymentMethod}`);

      // get all values, POST to server
      // check for redirection
      switch (paymentMethod) {
        case 'credit_card':
          this.selectedPaymentMethod = paymentMethod;
          console.log('handleCheckout()');
          console.log(`method: ${this.selectedPaymentMethod}`);
          // use order service to submit
          if (this.hasPreCheckoutForm) {
            // show modal
            const Modal = () => ({
              component: import('@/views/subscribe/modals/PreCheckout.vue'),
            });

            this.$store.dispatch('modal/show', {
              component: Modal,
              props: {
                paymentMethod: this.selectedPaymentMethod,
              },
              events: {
                onSubmit: this.onSubmitPreCheckoutForm,
              },
            });

            // $('#modal-pre-checkout-form').modal('show');
            break;
          } else {
            this.checkout();
          }
          break;

        default:
          console.log('not selected');
          break;
      }
    },
    checkout() {
      console.log('checkoutSubscription');

      if (!this.isMember) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }

      // const stripeUnsupportedLanguages = ['ko', 'zh-hant'];
      // const stripeUnsupportedLanguages = ['ko'];

      switch (true) {
        // use custom for all
        case this.selectedPaymentMethod === 'credit_card'
          && true:
          // && stripeUnsupportedLanguages.includes(this.userLanguage): // pending stripe checkout support for ko

          this.$store.dispatch('blocker/show', {
            message: this.$i18n.t('payment.processing'),
          });

          createSubscriptionOrder('stripe', {
          // createSubscriptionPaymentIntent({
            products: this.productSkus,
            billing: this.billingData,
          })
            .then((response) => {
              try {
                const data = response.data.data;
                const order = data;
                // const order = data.order;
                const cancelUrl = this.$store.state.route.fullPath;
                const successUrl = this.returnUrl ? this.$link(this.returnUrl).param('order', order.id).url() : this.$link('/subscribe/success').param('inv', order.id).url();

                console.log('router.push', {
                  // paymentIntentClientSecret: response.data.data.clientSecret,
                  order: order,
                  cancelUrl: this.$store.state.route.fullPath,
                  successUrl: this.returnUrl ? this.$link(this.returnUrl).param('order', order.id).url() : this.$link('/subscribe/success').param('inv', order.id).url(),
                });

                // console.log('oooorder', order, this.$link('/payment/success').param('inv', order.id).url());
                this.$router.push({
                  // path: '/ko/checkout-credit-card',
                  // name: 'checkout-credit-card',
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
                    // cancelUrl: this.$store.state.route.fullPath,
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

          this.$store.dispatch('blocker/show', {
            message: this.$i18n.t('payment.processing'),
          });

          this.$emit('redirecting', 'stripe');
          createSubscriptionCheckoutSession('stripe', {
            products: this.productSkus,
            billing: this.billingData,
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
              console.error('payment error', e);
              this.$store.dispatch('blocker/hide');
            });
          break;

        default:
          return false;
      }
    },
  },
  watch: {
    userCurrency: {
      handler(toCurrencyCode) {
        console.log('changed currency to:', toCurrencyCode);
        if (toCurrencyCode) {
          this.init();
        }
      },
      immediate: true,
    },
  },
};
</script>
