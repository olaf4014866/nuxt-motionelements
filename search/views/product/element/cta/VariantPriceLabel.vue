<template>
  <div>
    <template v-if="memberCredits > 0">
      <p class="price-credits mb-0">
        {{ credits }}
        <font-awesome-icon
          :icon="['fal','me-credits-circle']"
          title="credits"
        />
        <span class="text-secondary"> {{ $t('product.credits') }}</span>
      </p>
      <p class="price-dollars small mb-0 text-muted">
        <small>{{ price.getSymbol() }}</small>
        {{ price.toFormat('0,0') }}
      </p>
    </template>
    <template v-else>
      <small>{{ price.getSymbol() }}</small>
      {{ price.toFormat('0,0') }}
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';

export default {
  name: 'price-label',
  props: {
    variant: {
      type: Object,
      required: true,
    },
    // credits: Number,
  },
  components: {
    // ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  computed: {
    ...mapState({
      memberCredits: state => state.user.member.credits,
    }),
    credits() {
      return this.variant.credits;
    },
    price() {
      return Money({ amount: this.variant.price, currency: this.variant.currency });
    },
  },
};
</script>

<style lang="scss" scoped>
.price-credits, .price-dollars {
  margin-bottom: 0;
  line-height: 1.5;
}
.price-dollars {
  font-weight: 300;
}
</style>
