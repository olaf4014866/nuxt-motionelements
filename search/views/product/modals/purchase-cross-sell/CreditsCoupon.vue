<template>
  <div>
    <div class="card-header">
      {{ $t('purchase.use_your_discount') }}
    </div>
    <div class="card-body">
      <DiscountCoupon
        class="mb-3"
        v-for="data in creditsPackList" :key="data.id"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            <!-- <span>{{ currencySymbol }} {{ data.price }}</span>
            <span>{{ data.credits }}</span> -->
            <!-- <span>U.P. <s>{{ currencySymbol }} {{ data.usual_price }}</s> save {{ 100 - ((data.price / data.usual_price) * 100).toFixed(0) }} % </span> -->
            <span style="font-size: 16px; font-weight: bold">
              {{ data.credits }} Credits
            </span>
            <span v-if="getDiscount(data.price, data.usual_price) > 0">
              <span>
                <s>{{ currencySymbol }} {{ data.price }}</s>
              </span>
              <b>
              {{ $t('purchase.{discount}_off_{price}_price', {discount: `${getDiscount(data.price, data.usual_price)}`, price: `${currencySymbol} ${data.price}`}) }}
              </b>
            </span>
            <span v-else>
              {{ currencySymbol }}{{ data.price }}
            </span>
          </p>
          <a
            href="https://www.motionelements.com/credits"
            target="_blank"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> {{ $t('cta.buy') }}
          </a>
        </div>
      </DiscountCoupon>
      <!--
      <DiscountCoupon
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            {{ $t('purchase.{discount}_off_{credit}_credits', {discount: 9, credit: 550}) }}
          </p>
          <a
            href="https://www.motionelements.com/credits"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> {{ $t('purchase.use') }}
          </a>
        </div>
      </DiscountCoupon>

      <DiscountCoupon
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            {{ $t('purchase.{discount}_off_{credit}_credits', {discount: 6, credit: 320}) }}
          </p>
          <a
            href="https://www.motionelements.com/credits"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> {{ $t('purchase.use') }}
          </a>
        </div>
      </DiscountCoupon> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'purchase-credits-coupon',
  components: {
    DiscountCoupon: () => import('@/components/modules/common/DiscountCoupon.vue'),
  },
  created: function () {
    this.$api.getCreditPacks().then((list) => {
      this.creditsPackList = list;
    });
  },
  data() {
    return {
      creditsPackList: [],
    };
  },
  computed: {
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.$store.getters['site/currentCurrency'];
      const currencyInfo = mapCurrencies[currentCurrency];
      return currencyInfo.symbol;
    },
  },
  methods: {
    getDiscount(price, usualPrice) {
      return 100 - ((price / usualPrice) * 100).toFixed(0);
    },
  },
};
</script>
