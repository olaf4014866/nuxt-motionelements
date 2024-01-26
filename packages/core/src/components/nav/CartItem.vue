<template>
  <a class="dropdown-item"
      :href="$link('/checkout').url()"
  >
    <!-- Link to element product page? -->
    <div class="row">
      <div class="col-6">
        <img class="img-fluid"
             v-if="_.has(product, 'thumbnails.jpg.url')"
             :src="product.thumbnails.jpg.url">
      </div>
      <div class="col-6 text-truncate pl-0">
        <span>
          {{ price.toFormat('$0,0') }}
        </span>
      </div>
    </div>
  </a>
</template>


<script>
// import { mapState, mapGetters } from 'vuex';
import Money from '@motionelements/money';

export default {
  name: 'the-navbar-cart-item',
  components: {
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      // return false;
      return Money({ amount: this.product.price, currency: this.product.currency });
    },
  },
};
</script>
