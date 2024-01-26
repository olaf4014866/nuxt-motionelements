<template>
  <div class="d-flex flex-column">
    <div v-for="(method) in primaryPaymentMethods" :key="`payment-method-${method.code}`"
    class="div-payment-method border rounded px-3 py-2 w-100 mb-3">
      <div class="row align-items-center">
        <div class="col">
          <p class="h4">
            <span>
              {{ method.label }}
            </span>
            <a
              v-if="_.has(method, 'helpArticle.url')"
              :href="_.get(method, 'helpArticle.url')"
              target="_blank"
              class="ml-2"
            >
              <font-awesome-icon
                :icon="['fas','question-circle']"
                size="xs"
                class="text-muted"
              />
            </a>
          </p>
        </div>
        <div class="col col-12 col-md-3 d-flex justify-content-start justify-content-md-center mb-2 mb-md-0">
          <template v-for="icon in method.icons">
            <template v-if="method.code == 'credit_card' || method.code == 'paypal' ">
              <div
                class="d-inline-block div-payment-icon"
                :key="`payment-icon-div-${icon[1]}`"
              >
                <object
                  class="svg-inline--fa icon-cc-colored mx-1"
                  :key="`payment-icon-${icon[1]}`"
                  :data="`https://static.moele.me/img/icon/payment/icon-${icon[1]}.svg`"
                  type="image/svg+xml"
                ></object>
              </div>
            </template>
            <template
              v-else
            >
              <font-awesome-icon
                :key="`payment-icon-${icon[1]}`"
                :icon="icon"
                size="2x"
                fixed-width
                class="text-muted"
              ></font-awesome-icon>
            </template>
          </template>
        </div>
        <div class="col col-12 col-md-5 col-lg-3">
          <button
            href="#"
            class="btn btn-primary btn-block"
            @click.prevent="selectPaymentMethod(method.code)"
            :disabled="isPaymentMethodDisabled(method)"
          >
            {{ ctaLabel(method) }}
          </button>
        </div>
      </div>
      <div class="row row-description mt-3">
        <div class="col small">
          <i18n path="payment.limited_to_purchases_of_{amount}_or_more"
            v-if="isBelowPaymentMethodMinAmount(method)"
            tag="p"
          >
            <template v-slot:amount>
              <strong>{{ method.minAmount }} {{ $t('term.credits') }} </strong>
            </template>
          </i18n>
          <p
            v-for="(description, index) in getPaymentMethodDescriptionLines(method.code)"
            :key="`description-line-${index}`"
            v-html="description"
          />
        </div>
      </div>
  </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'credits-payment-methods',
  components: {
    // StripeCheckoutButton,
  },
  props: {
    primaryPaymentMethodCodes: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    secondaryPaymentMethodCodes: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      paymentMethodSpecs: {
        credit_card: {
          code: 'credit_card',
          label: this.$i18n.t('payment.method_credit_card'),
          icons: [
            ['fab', 'cc-mastercard'],
            ['fab', 'cc-visa'],
            ['fab', 'cc-amex'],
          ],
          button: this.$i18n.t('payment.pay_with_{method}', { method: this.$i18n.t('payment.method_credit_card') }),
        },
        paypal: {
          code: 'paypal',
          label: this.$i18n.t('payment.method_paypal'),
          icons: [
            ['fab', 'cc-paypal'],
            ['fab', 'cc-discover'],
            ['fab', 'cc-jcb'],
          ],
          button: this.$i18n.t('payment.pay_with_{method}', { method: this.$i18n.t('payment.method_paypal') }),
        },
        bank_transfer: {
          code: 'bank_transfer',
          label: this.$i18n.t('payment.method_bank_transfer'),
          helpArticle: {
            url: this.$link('https://help.motionelements.com/hc/en-us/articles/206374661').url(),
          },
          icons: [
            ['fad', 'university'],
          ],
          button: this.$i18n.t('payment.method_bank_transfer'),
          minAmount: 50,
        },
        konbini: {
          code: 'konbini',
          label: 'コンビニ決済',
          icons: [
            ['fad', 'store'],
          ],
          button: 'コンビニ決済',
          minAmount: 50,
        },
      },
    };
  },
  created() {
  },
  computed: {
    ...mapGetters({
      // currentLanguageCode: 'user/getLanguageCode',
      userCurrency: 'user/currencyCode',
    }),
    credits() {
      return parseInt(_.get(this.order, 'lines[0].product.credits', 0), 10);
    },
    // grossTotal() {
    //   return Money({ amount: this.order.gross_total.amount, currency: this.order.gross_total.currency });
    // },
    primaryPaymentMethods() {
      const methods = [];
      this.primaryPaymentMethodCodes.forEach((value) => {
        // const method = this.paymentMethodSpecs[value];
        // method.isDisabled = false;
        // console.log('order', this.credits);
        // if (_.has(method, 'minAmount')
        //   && this.credits < method.minAmount) {
        //   method.isDisabled = true;
        //   console.log('disabled', method);
        // }
        methods.push(this.paymentMethodSpecs[value]);
      });
      this.secondaryPaymentMethodCodes.forEach((value) => {
        // const method = this.paymentMethodSpecs[value];
        // method.isDisabled = false;
        methods.push(this.paymentMethodSpecs[value]);
      });
      return methods;
    },
    secondaryPaymentMethods() {
      const methods = [];
      this.secondaryPaymentMethodCodes.forEach((value) => {
        methods.push(this.paymentMethodSpecs[value]);
      });
      return methods;
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
      console.log('selectedProducts2()');
      console.log(products);
      return products;
    },
  },
  methods: {
    ctaLabel(paymentMethod) {
      if (_.get(this.order, 'type') === 'subscription' && paymentMethod.code === 'credit_card') {
        return this.$i18n.t('payment.add_card');
      }
      return paymentMethod.button;
    },
    // checkout here
    selectPaymentMethod(paymentMethod) {
      console.log(paymentMethod);
      this.$emit('select-payment-method', paymentMethod);
    },
    isBelowPaymentMethodMinAmount(method) {
      if (_.has(method, 'minAmount')
        && this.credits < method.minAmount) {
        return true;
      }
      return false;
    },
    isPaymentMethodDisabled(method) {
      return this.isBelowPaymentMethodMinAmount(method);
    },
    getPaymentMethodDescriptionLines(paymentMethod) {
      let lines = [];
      switch (paymentMethod) {
        case 'credit_card':
          lines = [
            // '交易發生在新加坡。若需要台灣格式的<strong>統一發票</strong>，請用銀行轉帳付款。',
            this.$i18n.t('payment.method_only_accepts_{cards}', { cards: 'Visa, MasterCard, American Express' }),
          ];
          break;
        case 'bank_transfer':
          lines = [
            this.$i18n.t('payment.bank_transfer_is_processed_within_{days}_working_days', { days: '1-3' }),
            this.$i18n.t('payment.for_immediate_download_use_credit_card'),
          ];

          if (this.userCurrency === 'KRW') {
            // 10% VAT for bank transfer in KRW
            lines.unshift('은행 송금시 10% 부과세가 추가됩니다.');
          }

          // 'Limited to purchases of <strong>￥6,500</strong> or more.',
          // '* Bank transfer is processed within 1-3 working days. For immediate download of content please purchase using credit card.',

          break;
        default:
          lines = [];
      }

      return lines;
    },
  },
};
</script>

<style lang="scss" scoped>
// * Colored Payment Icons

.div-payment-icon {
  height: 2rem;

  .icon-cc-colored {
    font-size: 2rem;
  }
}

@include media-breakpoint-up(lg) {
  .div-payment-icon {
    height: 2.5rem;

    .icon-cc-colored {
      font-size: 2.5rem;
    }
  }
}
</style>
