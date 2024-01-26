<template>
  <div>
    <template v-if="memberCredits > 0">
      <p class="h5 mb-0">
        {{ credits }}
        <font-awesome-icon
          :icon="['fal','me-credits-circle']"
          title="credits"
        />
        <span class="text-secondary"> {{ $t('product.credits') }}</span>
      </p>
      <small>
        <small>{{ price.getSymbol() }}</small>
        {{ price.toFormat('0,0') }}
      </small>
    </template>
    <template v-else>
      <p class="h5 mb-0">
        <small>{{ price.getSymbol() }}</small>
        {{ price.toFormat('0,0') }}
      </p>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Money from '@motionelements/money';

export default {
  name: 'version-single',
  components: {
    // PriceLabel: () => import('@/views/product/components/cta/PriceLabel.vue'),
  },
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      memberCredits: state => state.user.member.credits,
    }),
    credits() {
      return this.collection.credits;
    },
    isShowFormat() {
      return false;
    },
    isFree() {
      return false;
    },
    isDownloadable() {
      return !!_.get(this.collection, 'downloadable');
    },
    isAvailable() {
      return true;
    },
    price() {
      return Money({ amount: this.collection.price, currency: this.collection.currency });
    },
  },
};
</script>
