<template>
  <select v-if="supportedCurrencies"
    v-cloak
    v-model="model"
    name="currency"
    id="currency"
    class="custom-select custom-select-sm currency-select"
  >
    <option v-for="(currency) in supportedCurrencies"
      :key="currency.code"
      :value="currency.code"
    >{{ currency.code.toUpperCase() }} - {{ currency.name }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'main-currency-menu',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      supportedCurrencies: state => state.site.supportedCurrencies,
    }),
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
  // methods: {
  //   changeCurrency(e) {
  //     this.$emit('chane', value);
  //     const currency = e.target.value.toUpperCase();
  //
  //     const formData = new FormData();
  //     formData.append('currency', currency);
  //
  //     this.$store.dispatch('member/doChangeMemberSetting', formData)
  //       .then((response) => {
  //         console.log('update member currency', response);
  //         this.$cookies.set('ME_currency', currency, { domain: '.motionelements.com', secure: true });
  //         this.$cookies.set('ME_currency', currency); // localhost fallback
  //         window.location.reload(true);
  //       });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
</style>
