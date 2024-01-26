<template>
  <div>
    <p class="mb-0">
      <a
        href="#"
        class="text-muted"
        @click.prevent="formExpand = !formExpand"
      >{{ $t('payment.discount_code_input_label') }}

      </a>
    </p>
    <div
      class="collapse"
      ref="couponForm"
    >
      <form
        id="coupon-form"
        role="form"
        @submit.prevent="onSubmit"
        :class="{
          // 'was-validated': !$v.$invalid,
        }"
        novalidate
      >
        <div class="input-group input-group-sm">
          <input
            type="text"
            v-model.trim="formData.coupon"
            maxlength="20"
            required
            aria-describedby="apply-discount-btn"
            class="form-control form-control-lg"
            :class="{
                'is-invalid': $v.formData.coupon.$error,
                // 'is-valid': !$v.formData.coupon.$invalid,
                    }"
          />
          <div class="input-group-append">
            <button
              class="btn btn-simple-secondary"
              type="submit"
              :disabled="$v.$invalid"
            >
              {{ $t('cta.apply') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import {
  required, minLength,
} from 'vuelidate/lib/validators';

import { getCoupon } from '@/services/order.service.js';

export default {
  name: 'test',
  components: {
  },
  data() {
    return {
      formData: {
        coupon: '',
      },
      formExpand: this.expand,
    };
  },
  props: {
    expand: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState({
      currentCouponCode: state => state.checkout.coupon.code,
    }),
  },
  validations: {
    formData: {
      coupon: {
        required,
        minLength: minLength(3),
      },
    },
  },
  watch: {
    formExpand(newValue) {
      this.expandForm(newValue);
    },
  },
  mounted() {
    this.expandForm(this.expand);
  },
  methods: {
    // isValidCouponCode(couponCode) {
    //   if (couponCode.length < 3) {
    //     return false;
    //   }
    //   // use api to check
    //   return getCoupon(couponCode);
    // },
    // setCouponCode(couponCode) {
    //   this.$store.dispatch('checkout/setCouponCode', couponCode);
    // },
    expandForm(val) {
      const $target = $(this.$refs.couponForm);

      if (val) {
        $target.collapse('show');
      } else {
        $target.collapse('hide');
      }
    },
    onSubmit() {
      console.log('onSubmit()');
      // check nested data
      // make sure to touch data
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const couponCode = this.formData.coupon;
        getCoupon(couponCode).then((response) => {
          const data = response.data.data;
          console.log('redeemed', data);
          this.$store.dispatch('payment/setCoupon', data);
        });
        // shallow clone
        const formData = { ...this.formData };
        console.log('submit', formData);
        this.$emit('submit', formData);
      }
    },
  },
};
</script>
