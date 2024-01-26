<template>
  <div class="d-flex flex-column">
    <div
      v-for="item in creditPacks"
      class="div-credit-package border rounded px-3 py-2 w-100 mb-3"
      :class="selectedCreditPackId === item.id ? 'bg-light' : ''"
      :key="`credit-package-${item.id}`"
    >
      <div>
        <div
          class="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center"
        >
          <div class="flex-grow-1 row mr-0 align-items-center mb-3 mb-sm-0">
            <div class="col row">
              <div class="col-12 col-lg-6">
                <i18n path="credits.{amount}_credits" tag="p" class="lead">
                  <template v-slot:amount>
                    {{ item.credits }}
                    <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width/>
                  </template>
                </i18n>
              </div>
              <div class="col-12 col-lg-6 text-lg-right">
                <p class="h3">
                  <Price v-bind:money="getMoney(item.price)"
                  />
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <template v-if="calculateDiscount(item.usualPrice.amount, item.price.amount) !== 0">

                <p class="small text-primary">
                  {{ $t('credits.usual_price_short') }} <s>{{ getMoney(item.usualPrice).toFormat('$0,0') }}</s>
                  &#8901;
                  <i18n path="credits.save_{amount}" tag="span" class="text-uppercase">
                    <template v-slot:amount>
                      <strong>
                        {{ calculateDiscount(item.usualPrice.amount, item.price.amount) }}%
                      </strong>
                    </template>
                  </i18n>
                </p>

              </template>
            </div>
          </div>
          <div class="text-right">
            <a
              href="#"
              class="btn btn-primary"
              @click.prevent="selectPack(item.sku)"
            >
              {{ $t('cta.select') }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <CreditPacksListCustom
      :showCustomCreditsInput="showCustomCreditsInput"
      @select-custom-credits="selectCustomCredits"
    />

  </div>
</template>


<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';
import Price from '@/components/ui/BasePrice.vue';
import CreditPacksListCustom from '@/views/credits/step1/CreditPacksListCustom.vue';
// import Money from '@/helpers/money.js';
// import { getOrderPreview } from '@/services/order.service';

export default {
  name: 'credit-packs',
  props: {
    selectedCreditPackId: String,
  },
  components: {
    Price,
    CreditPacksListCustom,
  },
  data() {
    return {
      // FOR CUSTOM CREDITS
      showCustomCreditsInput: false,
    };
  },
  created() {
    if (this.$route.query.credits) {
      this.showCustomCreditsInput = true;
    }
    // this.refreshCreditPacks();
  },
  computed: {
    ...mapState({
      userCurrency: state => state.user.currencyCode,
      // userCurrency: state => state.user.currency.toUpperCase(),
      creditPacks: state => state.credits.creditPacks,
    }),
    // ...mapGetters({
    //   userCurrency: 'user/getCurrencyCode',
    // }),
    isCreditPacksLoaded() {
      return Array.isArray(this.creditPacks) && this.creditPacks.length;
    },
  },
  methods: {
    refreshCreditPacks() {
      this.$store.dispatch('credits/getCreditPacks');
    },
    getMoney(price) {
      return Money({ amount: price.amount, currency: price.currency });
    },
    calculateDiscount(usualPrice, actualPrice) {
      return Math.round(((parseFloat(usualPrice) - parseFloat(actualPrice)) / parseFloat(usualPrice)) * 100);
    },
    // EVENTS
    selectPack(sku) {
      this.$emit('select-credit-pack', sku);
    },
    selectCustomCredits(obj) {
      this.$emit('select-custom-credits', obj);
    },
  },
  watch: {
    userCurrency: {
      handler(toCurrencyCode) {
        console.log('changed currency to:', toCurrencyCode);
        if (toCurrencyCode) {
          this.refreshCreditPacks();
        }
      },
      immediate: true,
    },
  },
};
</script>
