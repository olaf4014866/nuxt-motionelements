<template>
  <div>
    <div class="card-header">
      Use your discount
    </div>
    <div class="card-body">
      <DiscountCoupon
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            11% off 1120 Credits
          </p>
          <a
            href="#"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> Use
          </a>
        </div>
      </DiscountCoupon>

      <DiscountCoupon
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            9% off 550 Credits
          </p>
          <a
            href="#"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> Use
          </a>
        </div>
      </DiscountCoupon>

      <DiscountCoupon
        class="mb-3"
      >
        <div class="d-flex justify-content-between align-items-center">
          <p class="small mb-0">
            6% off 320 Credits
          </p>
          <a
            href="#"
            class="btn btn-sm btn-light"
          >
            <font-awesome-icon
              :icon="['fas','ticket-alt']"
              :transform="{ rotate: 135 }"
              fixed-width
              class="mr-1"
            ></font-awesome-icon> Use
          </a>
        </div>
      </DiscountCoupon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'purchase-credits-coupon',
  components: {
    DiscountCoupon: () => import('@/components/modules/common/DiscountCoupon.vue'),
  },
};
</script>

<style lang="scss" scoped>

</style>
