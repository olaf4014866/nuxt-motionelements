<template>
  <div>
    <div class="container d-flex flex-column justify-content-center align-items-center py-3">
      <div class="row flex-column flex-lg-row align-items-stretch position-relative mb-5 align-self-stretch">
        <div class="col-12 col-lg-6 d-flex flex-column justify-content-between">
          <div>
            <a class="checkout-header"
              @mouseover="backHover = true"
              @mouseleave="backHover = false"
               :href="cancelUrl"
            >
              <div class="d-flex align-items-center">
                <font-awesome-icon
                  :icon="['far','arrow-left']"
                  class="mr-2 checkout-back-icon"
                  fixed-width
                />
                <div class="d-flex">
                  <img
                    alt="MotionElements Pte Ltd icon"
                    class="header-icon"
                    src="https://static.moele.me/img/logo/MotionElements-logomark-square-256x256.png"
                  />
                  <div class="font-weight-normal">
                    <transition name="fade" mode="out-in">
                      <span v-if="backHover" key="textBack">
                        {{ $t('cta.back') }}</span>
                      <span v-if="!backHover" key="textCompany">MotionElements Pte Ltd</span>
                    </transition>
                  </div>
                </div>
              </div>
            </a>

            <div v-if="order"
              class="mt-4 price-amt mb-5 mb-md-6">
              <p v-for="line in order.lines" :key="line.sku" class="mb-0">
                {{ line.description }}
              </p>
              <p v-if="totalAmount"
                 class="h2 font-weight-bold">
                <Price
                  :money="totalAmount"
                />
              </p>
              <p v-if="vatRate && isVatInclusive" class="small">
                {{ vatLabel }} {{ vatRate }}%
                ({{ $t('payment.inclusive') }})
              </p>

              <div v-if="isSubscription">
                <div class="badge badge-gray">
                  {{ $t('subscription_plan.auto_renew') }}
                </div>
              </div>

            </div>
            <div v-else>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-6">


          <!--
          <div class="form-group">
            <div class="rounded border border-light px-3 py-2 bg-light lt d-flex">
              <span class="text-black mr-2">
                Email
              </span>
              <span class="text-truncate">
                verylongemailaddressforsomeweirdreason@verylongemailaddressforsomeweirdreason.com
              </span>
            </div>
          </div>
          -->
          <div class="form-group">

            <template v-if="userCurrency === 'TWD' && _.get(order, 'billingDetails.taxId.value')">

              <label>
                統一發票開立資訊
              </label>

              <div v-if="_.get(order, 'billingDetails.name')">
                <label>
                  {{ $t('member.name') }}:
                </label>
                <strong>
                  {{ order.billingDetails.name }}
                </strong>
              </div>

              <div v-if="_.get(order, 'billingDetails.organizationName')">
                <label>
                  {{ $t('member.company') }}:
                </label>
                <strong>
                  {{ order.billingDetails.organizationName }}
                </strong>
              </div>

              <div v-if="_.get(order, 'billingDetails.taxId.value')">
                <label>
                  {{ taxIdLabel }}:
                </label>
                <strong>
                  {{ order.billingDetails.taxId.value }}
                </strong>
              </div>

              <hr>
            </template>

            <label>
              {{ $t('payment.card_info')}}
            </label>
            <div ref="card" class="form-control no-invert mb-1 stripe-card">
              <!-- A Stripe Element will be inserted here. -->
            </div>
            <div id="card-errors" role="alert"></div>
  <!--          <card class="form-control mb-1 stripe-card d-flex flex-column justify-content-center align-items-center"-->
  <!--                ref='carda'-->
  <!--                :class='{ complete }'-->
  <!--                :stripe='stripeKey'-->
  <!--                :options='stripeOptions'-->
  <!--                @change='complete = $event.complete'-->
  <!--          />-->
          </div>
          <div class="form-group">
            <label>
              {{ $t('payment.name_on_card')}}
            </label>
            <InputText
              v-model="form.name"
              :v="$v.form.name"
              autocomplete="ccname"
              autocorrect="off"
              class="no-invert"
            />
            <!--
            <input
              class="form-control"
              autocomplete="ccname"
              autocorrect="off"
              id="billingName"
              name="billingName"
              type="text"
            >
            -->
          </div>
          <!--
          <div class="form-group">
            <label>Country or region</label>
            <SelectCountry
              class="custom-select"
              id="billingCountry"
              name="billingCountry"
              autocomplete="billing country"
            />
          </div>
          -->

          <button v-if="totalAmount"
            class="btn btn-primary shadow btn-block mt-5"
            :disabled='!complete'
            @click='pay'
          >
            {{ ctaLabel }}
          </button>
        </div>
        <div class="checkout-footer small mt-6">
          <a
            href="https://stripe.com/"
            target="_blank"
            class="footer-poweredby pr-3 text-muted d-inline font-weight-normal">
            <i18n path="term.powered_by_{name}" tag="span">
              <template v-slot:name>
                <font-awesome-icon :icon="['fab','stripe']" size="2x" style="margin-bottom:-5.5px"/>
              </template>
            </i18n>
          </a>
          <!--
          <a href="https://stripe.com/checkout/terms"
            class="text-muted font-weight-normal mx-3">
            Terms
          </a>
          <a href="https://stripe.com/privacy"
            class="text-muted font-weight-normal mx-3">
            Privacy
          </a>
          -->
        </div>
      </div>
    </div>
<!--    <Blocker v-if="showBlocker">-->
<!--      <template v-slot:message>-->
<!--        <p>{{ blockerMessage }}</p>-->
<!--      </template>-->
<!--    </Blocker>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// @deprecated
// https://github.com/fromAtoB/vue-stripe-elements
// import {
// // Card,
// // CardNumber, CardExpiry, CardCvc,
// // confirmPaymentIntent,
// // confirmCardPayment,
// // createPaymentMethod,
// // handleCardAction,
// // createToken,
// } from 'vue-stripe-elements-plus';

import { required } from 'vuelidate/lib/validators';
import Price from '@/components/ui/BasePrice.vue';
import Money from '@motionelements/money';

import {
  checkoutOrderWithStripePaymentMethod,
  getOrder,
  trackOrder,
  // completeOrder,
} from '@/services/order.service.js';

import notificationService from '@motionelements/core/src/services/notification.service.js';
// import { getJobStatus } from '@motionelements/core/src/services/job.service.js';

// https://www.digitalocean.com/community/tutorials/vuejs-stripe-elements-vue-integration
// https://medium.com/javascript-in-plain-english/integrating-with-stripe-client-basics-c9f188329143
// const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
// const elements = stripe.elements();
// let card;


export default {
  name: 'checkout-credit-card',
  components: {
    // SelectCountry: () => import('@/components/ui/form/select/SelectCountry.vue'),
    InputText: () => import('@/components/ui/form/BaseInputText.vue'),
    // Card,
    // CardNumber,
    // CardExpiry,
    // CardCvc,
    Price,
    // Blocker: () => import('@motionelements/core/src/components/ui/Blocker.vue'),
  },
  data() {
    return {
      stripeKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        // locale: 'auto',
        hidePostalCode: true,
      },
      // https://stripe.com/docs/js/elements_object/create_element?type=card
      stripeCardOptions: {
        hidePostalCode: true,
        style: {
          base: {
            fontFamily: 'Nunito, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          },
        },
      },
      complete: false,
      // complete: true,
      paymentIntentClientSecret: null,
      setupIntentClientSecret: null,
      order: null,
      backHover: false,
      cancelUrl: this.$route.params.cancelUrl || this.$link('/subscribe').url(),
      successUrl: this.$route.params.successUrl,
      form: {
        name: null,
      },
      pollOrderIntervalId: null,
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  created() {
    console.log('$route', this.$route);

    // this.successUrl = this.$route.params.successUrl;
    this.successUrl = this.$route.query.successUrl;
    this.cancelUrl = this.$route.query.cancelUrl;
    // this.order = this.$route.params.order;

    getOrder(this.$route.query.order).then((response) => {
      this.order = response.data.data;
      // const data = response.data.data;
      // if (data.status === 'completed') {
      //   this.onPaymentSucceeded();
      //   return true;
      // }
      // this.pollOrderCompleted();
      if (!this.cancelUrl) {
        switch (_.get(this.order, 'type')) {
          case 'subscription':
            this.cancelUrl = this.$link('/subscribe').url();
            break;
          case 'credits':
          default:
            this.cancelUrl = this.$link('/credits').url();
            break;
        }
      }

      if (this.order.status === 'completed') {
        window.location.href = this.cancelUrl;
      }
    }).catch((error) => {
      console.error(error);
      window.location.href = this.cancelUrl;
    });

    // if (!this.cancelUrl) {
    //   switch (_.get(this.order, 'type')) {
    //     case 'subscription':
    //       this.cancelUrl = this.$link('/subscribe').url();
    //       break;
    //     case 'credits':
    //     default:
    //       this.cancelUrl = this.$link('/credits').url();
    //       break;
    //   }
    // }

    // if (!this.order) {
    //   console.log('order', this.order);
    //   // return to cancel url?
    //   // window.location.href = this.cancelUrl;
    // }

    // this.order = this.$route.query.order;
    // this.paymentIntentClientSecret = this.$route.params.paymentIntentClientSecret;

    // createStripeSetupIntent().then((response) => {
    //   console.log(response);
    //   this.setupIntentClientSecret = response.data.data.clientSecret;
    // });
  },
  // beforeMount () {
  //   this._element = create(this.type, this.stripe, this.options)
  //   this._element.on('blur', event => this.$emit('blur'))
  //   this._element.on('focus', event => this.$emit('focus'))
  //   this._element.on('change', event => this.$emit('change', event))
  // },
  mounted() {
    const stripeLocale = this.toStripeLocale(this.$i18n.locale);

    var self = this;
    // eslint-disable-next-line
    self.stripe = Stripe(self.stripeKey, {
      locale: stripeLocale,
    });
    self.card = self.stripe.elements({
      locale: stripeLocale,
    }).create('card', this.stripeCardOptions);
    // self.card.on('blur', event => this.$emit('blur'));
    // self.card.on('focus', event => this.$emit('focus'));
    // self.card.on('change', event => this.$emit('change', event));
    self.card.on('change', (event) => { this.complete = event.complete; });
    self.card.mount(self.$refs.card);

    // card = elements.create('card');
    // card.mount(this.$refs.card);
    this.$store.dispatch('blocker/hide');

    // this.pollOrderCompleted();
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      member: state => state.user.member,
      userCurrency: state => state.user.currencyCode,
      // userLanguage: state => state.user.language,
      email: state => state.user.member.email,
      // showBlocker: state => state.payment.blocker.show,
      // blockerMessage: state => state.payment.blocker.message,
    }),
    ...mapGetters({
      userLanguage: 'user/getLanguageCode',
      // userCurrency: 'user/getCurrencyCode',
    }),
    isLoaded() {
      return this.order !== null;
    },
    totalAmount() {
      if (!_.has(this.order, 'grossTotal')) return null;
      return Money({ amount: this.order.grossTotal.amount, currency: this.order.grossTotal.currency });
    },
    taxIdLabel() {
      switch (this.order.vat.currency) {
        case 'SGD':
          return 'UEN';
        case 'TWD':
          return '統一編號';
        default:
          return 'VAT';
      }
    },
    vatLabel() {
      switch (this.order.vat.currency) {
        case 'SGD':
          return 'GST';
        case 'TWD':
          return '營業稅';
        default:
          return 'VAT';
      }
    },
    vatAmount() {
      if (!_.has(this.order, 'vat.amount')) return null;
      return Money({ amount: this.order.vat.amount, currency: this.order.vat.currency });
    },
    vatRate() {
      return _.get(this.order, 'vat.rate');
    },
    isVatInclusive() {
      return _.get(this.order, 'vat.inclusive');
    },
    isSubscription() {
      return _.get(this.order, 'type') === 'subscription';
    },
    ctaLabel() {
      if (this.isSubscription) {
        return this.$i18n.t('cta.submit');
      }

      return this.$i18n.t('cta.pay_{amount}', { amount: this.totalAmount.toFormat('$0,0') });
    },
  },
  methods: {
    toStripeLocale(languageCode) {
      switch (languageCode) {
        case 'de':
        case 'ja':
        case 'fr':
        case 'hu':
        case 'it':
        case 'ru':
        case 'tr':
          return languageCode;
        case 'es':
          return 'es-419';
        case 'pt':
          return 'pt-BR';
        case 'zh-hant':
          return 'zh-TW';
        default:
          return 'auto';
      }
    },
    onChange(event) {
      console.log('change', event);
    },
    stripePaymentMethodHandler(result) {
      // postAction
      console.log('stripePaymentMethodHandler', result);

      // redirect back to successUrl
      if (result.error) {
        this.handleStripeError(result);
      } else {
        console.log('paymentMethod', result.paymentMethod);
        // Otherwise send paymentMethod.id to your server (see Step 4)
        checkoutOrderWithStripePaymentMethod({
          paymentMethodId: result.paymentMethod.id,
          orderId: this.order.id,
        }).then((response) => {
          // Handle server response (see Step 4)
          // result.json().then(function(json) {
          this.handleServerResponse(response.data.data);
          // })
        }).catch((e) => {
          console.error('Stripe payment error', e);
          this.$store.dispatch('blocker/hide');
        });
      }
    },
    pay() {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      // handle post
      const billingDetails = {
        name: this.form.name,
        email: this.email,
      };

      this.$store.dispatch('blocker/show', {
        message: this.$i18n.t('payment.processing_payment'),
      });

      try {
        // console.log('confirmCardPayment');
        // console.log(this.$refs.carda, this.$refs.carda.$refs.element);
        console.log(this.card);
        /*
        // eslint-disable-next-line
        this.stripe.confirmCardPayment(this.paymentIntentClientSecret, {
          payment_method: {
            card: this.card,
            billing_details: billingDetails,
          },
        }).then((result) => {
          console.log('confirmed', result);
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            this.$store.dispatch('payment/hideBlocker');
          } else if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            // use webhook to process payment
            // make a call to process payment / track
            completeOrder(this.order.id, {
              paymentIntentId: result.paymentIntent.id,
            });

            console.log(pollOrderCompleted(this.order.id));

            // window.location.href = this.successUrl;
            // this.$store.dispatch('payment/hideBlocker');
          }
        }).catch((e) => {
          console.error('payment error', e);
          this.$store.dispatch('payment/hideBlocker');
        });
        return;
        */

        // https://stripe.com/docs/payments/accept-a-payment-synchronously
        // confirmPaymentIntent(this.paymentIntentClientSecret, {
        // eslint-disable-next-line no-unreachable
        this.stripe.createPaymentMethod({
          type: 'card',
          card: this.card,
          billing_details: billingDetails,
        }).then(this.stripePaymentMethodHandler)
          .catch((e) => {
            console.error('payment error', e);
            this.$store.dispatch('blocker/hide');
          });
      } catch (e) {
        console.error(e);
        this.$store.dispatch('blocker/hide');
      }
      // createToken().then(data => console.log(data.token));
    },
    /*
    pollOrderCompleted() {
      const interval = 3000;
      // const poll = () => setInterval(async () => {
      //   await getOrder(this.order.id);
      //   // observableData.data = { ...(await callback()) };
      // }, interval);
      //
      // const timerID = poll();

      // const intervalId = setTimeout(async () => {
      //   const order = await getOrder(this.order.id);
      //   console.log('poll', order);
      // }, interval);

      this.pollOrderIntervalId = setInterval(async () => {
        const response = await getOrder(this.order.id);
        console.log('poll', response);
        const order = response.data.data;
        if (order.status === 'completed') {
          clearInterval(this.pollOrderIntervalId);
          console.log('got completed order', order);
          this.onPaymentSucceeded();
        }
      }, interval);

      console.log('intervalId', this.pollOrderIntervalId);
    },
     */
    pollOrderCompleted() {
      // return this.$store.dispatch('artistElementEdit/getJobStatus', jobId)
      getOrder(this.order.id, {
        'fields[order]': 'status,last_payment_error',
      }).then((response) => {
        const order = response.data.data;

        switch (order.status) {
          case 'completed':
            this.onPaymentSucceeded();
            return true;

          case 'failed':
            this.onPaymentFailed(order);
            return true;

          default:
            this.pollOrderCompleted();
        }
      });
    },
    handleServerResponse(data) {
      console.log('handleServerResponse', data);
      try {
        switch (data.status) {
          case 'requires_action':

            if (this.isSubscription) {
              console.log('REQUUUIRED ACTION2', data);
              this.stripe.confirmCardPayment(
                data.clientSecret,
              ).then((result) => {
                console.log('PAIIIDD', result);
                // check for oder
                this.pollOrderCompleted();
                // trackEvent
              }).catch((e) => {
                console.error('Stripe payment error', e);
                this.$store.dispatch('blocker/hide');
              });
            } else {
              // handle 3D secure
              this.stripe.handleCardAction(
                data.clientSecret,
              ).then(this.handleStripeJsResult)
                .catch((e) => {
                  console.error('Stripe payment error', e);
                  this.$store.dispatch('blocker/hide');
                });
            }
            break;

          case 'succeeded':
            if (this.isSubscription) {
              this.pollOrderCompleted();
            } else {
              this.onPaymentSucceeded();
            }
            return;

          default:
            this.$store.dispatch('blocker/hide');
        }
      } catch (e) {
        console.error(e);
        this.$store.dispatch('blocker/hide');
      }
    },
    handleStripeJsResult(result) {
      console.log('handleStripeJsResult', result);
      // checkout again
      // if (_.has(result, 'error')) {
      if (result.error) {
        this.handleStripeError(result);
      } else {
        checkoutOrderWithStripePaymentMethod({
          paymentIntentId: result.paymentIntent.id,
          orderId: this.order.id,
        }).then((response) => {
          // Handle server response (see Step 4)
          // result.json().then(function(json) {
          this.handleServerResponse(response.data.data);
          // })
        }).catch((e) => {
          console.error('Stripe payment error', e);
          this.$store.dispatch('blocker/hide');
        });
      }
    },
    handleStripeError(result) {
      this.$store.dispatch('blocker/hide');
      console.log('handleStripeJsResult() error', result.error.code, result.error.message);
      // show in notification
      notificationService.alert({
        level: 'danger',
        title: this.$i18n.t('error.failed'),
        detail: result.error.message,
      });
    },
    onPaymentSucceeded() {
      console.log('SUCCEEEDDDD!!!!!');
      console.log('success', this.successUrl, this.order.id);
      // redirect
      // send ga tracking
      // subscription
      if (this.isSubscription) {
        trackOrder(this.order.id).then(() => {
          console.log('tracked complete');
        }).finally(() => {
          window.location.href = this.successUrl;
        });
      } else {
        window.location.href = this.successUrl;
      }
    },
    onPaymentFailed(order) {
      this.$store.dispatch('blocker/hide');
      notificationService.alert({
        level: 'danger',
        title: _.get(order, 'lastPaymentError.message') || this.$i18n.t('error.failed'),
      });
      // console.log('SUCCEEEDDDD!!!!!');
      // console.log('success', this.successUrl, this.order.id);
      // redirect
      // send ga tracking
      // subscription
      // if (this.isSubscription) {
      //   trackOrder(this.order.id).then(() => {
      //     console.log('tracked complete');
      //   }).finally(() => {
      //     window.location.href = this.successUrl;
      //   });
      // } else {
      //   window.location.href = this.successUrl;
      // }
    },
  },
  beforeDestroy() {
    clearInterval(this.pollOrderIntervalId);
  },
};
</script>

<style lang="scss" scoped>
$back-transition-dur: .3s;
$icon-spacer: 1.75rem;

.container {
  @include media-breakpoint-up(lg) {
    width: 57.5rem;
  }
}
.header-icon {
  height: 2rem;
  width: 2rem;
  margin-right: .5rem;
  border-radius: 100%;
}

.checkout-footer, .price-amt {
  text-align: center;
}

@include media-breakpoint-up(lg) {
  .container {
    min-height: 100vh;
  }

  .price-amt, .checkout-footer {
    text-align: left;
  }

  .price-amt {
    margin-left: $icon-spacer;
  }

  .checkout-footer {
    position: absolute;
    bottom:0;
    left: #{$icon-spacer + $spacer};
  }
}

@include media-breakpoint-down(md) {
  .container {
    max-width: 24rem;
    position: relative;

    >.row {
      width: calc(100% + 2rem);
    }
  }
}

.checkout-header {
  .checkout-back-icon {
    color: $text-muted;
    transition: color $back-transition-dur ease;
  }

  &:hover {
    .checkout-back-icon {
      color: $body-color;
    }
  }
}

.btn-primary {
  &:disabled, &.disabled {
    cursor: no-drop;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity #{$back-transition-dur / 2} ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.stripe-card {
  &::v-deep {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div {
      &.StripeElement, &.__PrivateStripeElement {
        width: 100%;
      }
    }
  }
}

.no-invert {
  &.form-control, &::v-deep > .form-control {
    color: $body-color;
    background-color: $input-bg;
    border-color: $input-border-color;
  }
}
</style>
