<template>
  <select
    v-cloak
    v-if="isLogin"
    @change="changeCurrency($event)"
    name="currency"
    id="currency"
    class="custom-select custom-select-sm currency-select"
  >
    <option
      v-for="(currency, key) in supportedCurrencies"
      :selected="key == currentCurrency.toUpperCase()"
      :key="key"
      :value="key"
    >{{ currency.code.toUpperCase() }} - {{ currency.name }}</option>
    <!--
    <option value="JPY" selected="selected">JPY - 日本円</option>
    <option value="USD">USD - 米ドル</option>
    -->
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'main-currency-menu',
  props: {
    menu: {},
  },
  computed: {
    ...mapState({
      isLogin: state => state.member.isLogin,
      currentCurrency: state => state.site.currentCurrency,
      supportedCurrencies: state => state.site.supportedCurrencies,
    }),
    isFooter() {
      return this.menu === 'footer' ? true : false;
    },
  },
  methods: {
    changeCurrency(e) {
      const currency = e.target.value.toUpperCase();

      const formData = new FormData();
      formData.append('currency', currency);

      this.$store.dispatch('member/doChangeMemberSetting', formData)
        .then((response) => {
          console.log('update member currency', response);
          this.$cookies.set('ME_currency', currency, { domain: '.motionelements.com', secure: true });
          this.$cookies.set('ME_currency', currency); // localhost fallback
          window.location.reload(true);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
