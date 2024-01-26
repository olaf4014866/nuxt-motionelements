<template>
  <div class="card flex-grow-1 rounded overflow-hidden">
    <div class="card-body p-5 position-relative d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-center">
      <template v-if="paymentStatus === 'completed'">
        <div class="mr-lg-5">
          <font-awesome-icon
            :icon="['fal','check-circle']"
            size="10x"
            class="text-success"
          />
        </div>
        <div>
          <h2>Payment Successful</h2>
          <p class="lead text-success font-weight-bold">
            {{ credits }} <font-awesome-icon :icon="['far','me-credits-circle']"></font-awesome-icon> credits have been added to your account.
          </p>
          <p>
            Your invoice can be found under Invoice/Receipt on your Account Dashboard.
          </p>
        </div>
      </template>
      <template v-else-if="paymentStatus === 'failed'">
        <div>
          <h2>Payment Failed</h2>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
// import { mapState } from 'vuex';

export default {
  name: 'payment-status',
  props: {
    order: {
      type: Object,
      required: false,
    },
  },
  computed: {
    credits() {
      return _.get(this.order, 'lines[0].product.credits', null);
    },
    paymentStatus() {
      return _.get(this.order, 'status');
    },
  },
};
</script>
