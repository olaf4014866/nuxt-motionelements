<template>
  <div class="div-credit-package border rounded px-3 py-2 w-100 mb-3"
  >
    <div
      class="mb-2 mb-sm-0"
    >
      <a href="#"
        @click.prevent="toggleCustomCreditsInput()"
      >
        {{ $t('credits.custom_credits_input_label') }}
        <font-awesome-icon
          :icon="['fas','caret-down']"
          fixed-width
        />
      </a>
    </div>
    <div
      ref="customCreditsInput"
      :class="customCreditsInputClass"
    >
      <div class="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center">
        <div class="flex-grow-1 row mr-0 align-items-center mb-3 mb-sm-0">
          <div class="col row">
            <div class="col-12 col-lg-6">
              <div class="input-group mb-2 mb-sm-0">
                <!-- <div class="input-group-prepend">
                  <button
                    class="btn btn-simple-secondary btn-increment border-right-0"
                    type="button"
                    @click="decrementCredits(1)"
                  >
                    <font-awesome-icon
                      :icon="['far','minus']"
                      size="sm"
                    />
                  </button>
                </div> -->
                <input
                  type="number" class="form-control form-control-custom-credits"
                  v-model="credits"
                  @change="onChange"
                  @keyup="debounceOnChange"
                >
                <div class="input-group-append">
                  <div class="input-group-text d-flex flex-column align-items-center justify-content-center p-0">
                    <button
                      type="button"
                      class="btn btn-light btn-number-spinner px-2 py-0 rounded-0 flex-grow-1 mx-0 border-bottom-0 border-right"
                      style="line-height:1;"
                      @click="incrementCredits(1)"
                    >
                      <font-awesome-icon
                        :icon="['far','plus']"
                        fixed-width
                        size="xs"
                      />
                    </button>
                    <button
                      type="button"
                      class="btn btn-light btn-number-spinner px-2 py-0 rounded-0 flex-grow-1 mx-0"
                      style="line-height:1;"
                      @click="decrementCredits(1)"
                    >
                      <font-awesome-icon
                        :icon="['far','minus']"
                        fixed-width
                        size="xs"
                      />
                    </button>
                  </div>
                  <!-- <button
                    class="btn btn-simple-secondary btn-increment border-left-0"
                    type="button"
                    @click="incrementCredits(1)"
                  >
                    <font-awesome-icon
                      :icon="['far','plus']"
                      size="sm"
                    />
                  </button> -->
                  <span class="input-group-text">
                    <font-awesome-icon
                      :icon="['far','me-credits-circle']"
                      fixed-width
                      class="mr-1"
                    /> {{ $t('term.credits') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 text-lg-right">
              <p class="h3">
                <Price v-if="isPriceReady" v-bind:money="getMoney(this.customCreditPack.price)"/>
                <span v-else-if="isLoading">
                </span>
              </p>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <template v-if="discountPercent > 0">
              <p class="small text-primary">
                {{ $t('credits.usual_price_short') }} <s>{{ getMoney(this.customCreditPack.usualPrice).toFormat('$0,0') }}</s>
                <i18n path="credits.save_{amount}" tag="span" class="text-uppercase">
                  <template v-slot:amount>
                    <strong>
                      {{ discountPercent }}%
                    </strong>
                  </template>
                </i18n>
              </p>
            </template>
          </div>
        </div>
        <div class="text-right">
          <a href="#"
            class="btn btn-primary"
            v-bind:class="{ disabled: !isPriceReady }"
            @click.prevent="selectCustomCredits()"
          >
            {{ $t('cta.select') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import Price from '@/components/ui/BasePrice.vue';
// import Spinner from '@motionelements/core/src/components/ui/LoaderSpin.vue';
import Money from '@motionelements/money';

import { getCustomCreditPack } from '@/services/order.service.js';

export default {
  name: 'credits-custom-credit-input',
  props: {
    showCustomCreditsInput: Boolean,
  },
  components: {
    Price,
    // Spinner,
  },
  data() {
    return {
      credits: 0,
      currency: null,
      customCreditPack: {
        price: {
          amount: 0,
          currency: 'USD',
        },
      },
      minCredits: 1,
      maxCredits: 5000,
      isLoading: false,
    };
  },
  created() {
    if (this.$route.query.credits) {
      // set selected custom credits
      this.setCredits(this.$route.query.credits);
    }
  },
  computed: {
    ...mapState({
      couponCode: state => state.payment.coupon.code,
    }),
    customCreditsInputClass() {
      return this.showCustomCreditsInput ? 'collapse show' : 'collapse';
    },
    isPriceReady() {
      return this.customCreditPack.price.amount > 0;
    },
    priceAmount() {
      return _.get(this.customCreditPack, 'price.amount', null);
    },
    usualPriceAmount() {
      return _.get(this.customCreditPack, 'usualPrice.amount', null);
    },
    discountPercent() {
      if (this.priceAmount && this.usualPriceAmount) {
        return Math.round(((this.usualPriceAmount - this.priceAmount) / this.usualPriceAmount) * 100);
      }
      return 0;
    },
  },
  methods: {
    debounceOnChange: _.debounce(function (event) {
      this.onChange(event);
    }, 500),
    onChange(event) {
      this.isLoading = true;
      console.log('change', event.target.value);
      this.setCredits(event.target.value);
    },
    setCredits(value) {
      // min of 1
      this.credits = Math.min(this.maxCredits, Math.max(this.minCredits, parseInt(value, 10)));
      this.updatePrice();
    },
    incrementCredits(value) {
      this.credits = Math.min(this.maxCredits, parseInt(this.credits, 10) + value);
      this.updatePrice();
    },
    decrementCredits(value) {
      this.credits = Math.max(this.minCredits, parseInt(this.credits, 10) - value);
      this.updatePrice();
    },
    getMoney(price) {
      return Money({ amount: price.amount, currency: price.currency });
    },
    toggleCustomCreditsInput() {
      // this.showCustomCreditsInput = !this.showCustomCreditsInput;
      $(this.$refs.customCreditsInput).collapse('show');
    },
    // call API: get custom credit pack
    // update price
    updatePrice() {
      console.log('updatePrice', this.credits);
      this.customCreditPack.price.amount = 0;
      getCustomCreditPack(this.credits).then((response) => {
        const data = response.data.data;
        console.log(data, this.credits, data.credits);
        // check for race conditions, show only if data is same credits as requested
        if (this.credits === data.credits) {
          this.customCreditPack = data;
          console.log('customCreditPack', data);
          this.currency = data.price.currency;
        } else {
          console.log('diff', this.credits, data.credits);
        }
      });
      return true;
    },
    // EVENTS
    selectCustomCredits() {
      this.$emit('select-custom-credits', this.customCreditPack);
    },
  },
  watch: {
    // coupon code does not affect credit packs
    couponCode(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      this.updatePrice();
    },
    // credits() {
    //   this.updatePrice();
    // },
  },
};
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input.form-control-custom-credits::-webkit-outer-spin-button,
input.form-control-custom-credits::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input.form-control-custom-credits {
  /* Firefox */
  -moz-appearance: textfield;
}
</style>
