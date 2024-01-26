<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex flex-column flex-lg-row justify-content-between" v-if="isLoaded">
        <div class="flex-grow-1 mb-3 mb-lg-0">
          <p v-if="orderId" class="lead mb-0">
            {{ $t('payment.order_number') }}:
            <strong class="text-dark">{{ orderId }}</strong>
          </p>
          <p v-else class="lead font-weight-bold mb-0">
            {{ $t('payment.summary') }}
          </p>
          <a v-if="receiptUrl"
             :href="receiptUrl"
             target="_blank"
             class="btn btn-light"
          >
            <font-awesome-icon
              :icon="['far','file-pdf']"
              fixed-width
              class="mr-1"
            />
            {{ $t('cta.download_{item}', {item: $t('payment.invoice')}) }}
          </a>

          <div class="row" v-if="!orderId && showCoupon">
            <div class="col-12 col-sm-6">
              <CouponCode
                class="small"
                :expand="false"
              />
            </div>
          </div>

        </div>
        <div class="">
          <div class="d-flex flex-column flex-sm-row justify-content-between">
            <p class="lead font-weight-bold mb-0 mr-sm-3">
              <template v-if="orderType === 'credits'">
                {{ credits }}
                <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width/>
                {{ $t('term.credits') }}
              </template>
              <template v-if="orderType === 'subscription'">
                {{ productName }}
              </template>
            </p>
            <p class="lead font-weight-bold mb-0">
              <Price v-if="netTotal" :money="netTotal"/>
            </p>
          </div>
          <hr/>
          <template v-if="hasDiscount">
            <div class="d-flex flex-column flex-sm-row justify-content-between">
              <p class="mb-0 mr-sm-3">
                {{ $t('payment.discount') }}
              </p>
              <p class="mb-0">
                <Price v-if="discount" :money="discount"/>
              </p>
            </div>
            <!--
            <div v-if="!isInclusiveVat" class="d-flex flex-row justify-content-between">
              <p class="mb-0">
                Subtotal 小計
              </p>
              <p class="mb-0">
                <Price v-if="netTotalAfterDiscount" :money="netTotalAfterDiscount"/>
              </p>
            </div>
            -->
          </template>
          <div v-if="vat" class="d-flex flex-column flex-sm-row justify-content-between">
            <p class="mb-0 mr-sm-3">
              {{ vatLabel }} {{ vatRate }}%
            </p>
            <p v-if="isInclusiveVat" class="mb-0">
              ({{ $t('payment.inclusive') }})
            </p>
            <p v-else class="mb-0">
              <Price :money="vat"/>
            </p>
          </div>
          <div class="d-flex flex-column flex-sm-row justify-content-between">
            <p class="lead font-weight-bold mb-0">
              {{ $t('payment.grand_total') }}
            </p>
            <p class="lead font-weight-bold mb-0">
              <Price v-if="grossTotal" :money="grossTotal"/>
            </p>
          </div>
          <div v-if="paymentMethodFee" class="d-flex flex-column flex-sm-row justify-content-between">
            <p class="mb-0">
              + 決済手数料 ({{ paymentMethodName }})
            </p>
            <p class="mb-0">
              <Price :money="paymentMethodFee"/>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Price from '@/components/ui/BasePrice.vue';
import Money from '@motionelements/money';

import CouponCode from '@/views/credits/CouponCode.vue';

export default {
  name: 'order-summary',
  props: {
    order: {
      type: Object,
      required: true,
    },
    showCoupon: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Price,
    CouponCode,
  },
  data() {
    return {
    };
  },
  // http://api-docs.reviso.com/#get-specific-order
  computed: {
    isLoaded() {
      return _.has(this.order, 'grossTotal.amount');
    },
    orderId() {
      return _.get(this.order, 'id');
    },
    orderType() {
      return _.get(this.order, 'type');
    },
    receiptUrl() {
      return _.get(this.order, 'receipt.url');
    },
    credits() {
      return _.get(this.order, 'lines[0].product.credits', 0);
    },
    productName() {
      return _.get(this.order, 'lines[0].product.name', '');
    },
    netTotal() {
      if (!_.has(this.order, 'netTotal')) {
        return null;
      }
      return Money({ amount: this.order.netTotal.amount, currency: this.order.netTotal.currency });
    },
    discount() {
      return parseFloat(_.get(this.order, 'discount.amount', 0)) > 0
        ? Money({ amount: this.order.discount.amount, currency: this.order.discount.currency })
        : false;
    },
    netTotalAfterDiscount() {
      // return this.netTotal;
      if (!_.has(this.order, 'netTotal') || !_.has(this.order, 'discount')) {
        return null;
      }
      return Money({ amount: this.order.netTotal.amount - this.order.discount.amount, currency: this.order.netTotal.currency });
    },
    vat() {
      return this.vatRate > 0
        ? Money({ amount: this.order.vat.amount, currency: this.order.vat.currency })
        : false;
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
    vatRate() {
      return _.get(this.order, 'vat.rate', 0);
    },
    isInclusiveVat() {
      return _.get(this.order, 'vat.inclusive', false);
    },
    grossTotal() {
      if (!_.has(this.order, 'grossTotal')) {
        return null;
      }
      return Money({ amount: this.order.grossTotal.amount, currency: this.order.grossTotal.currency });
    },

    hasDiscount() {
      return _.get(this.order, 'discount.amount', 0) > 0;
    },
    paymentMethodFee() {
      return parseFloat(_.get(this.order, 'paymentMethodFee.amount', 0)) > 0
        ? Money({
          amount: this.order.paymentMethodFee.amount,
          currency: this.order.paymentMethodFee.currency,
        })
        : false;
    },
    paymentMethodName() {
      const paymentMethod = _.get(this.order, 'paymentMethod');
      switch (paymentMethod) {
        case 'konbini':
          return 'コンビニ';
        default:
          return paymentMethod;
      }
    },
  },
};
</script>
