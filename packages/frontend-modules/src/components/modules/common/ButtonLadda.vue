<template>
  <button class="btn" type="button" @click="emitEvent" :disabled="isLoading">
    <font-awesome-icon v-if="!isLoading" :icon="icon" fixed-width></font-awesome-icon>
    <font-awesome-icon v-if="isLoading" :icon="['fas','circle-notch']" fixed-width spin class="text-muted"></font-awesome-icon>
    <slot></slot>
  </button>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  name: 'button-ladda',
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    icon: {
      type: Array,
      default() {
        return ['fas', 'icon-search'];
      },
    },
  },
  computed: {
    iconClasses() {
      if (this.isLoading) {
        return 'fas fa-circle-notch fa-spin text-muted';
      }
      return this.icon;
    },
  },
  methods: {
    emitEvent: throttle(function () {
      this.$emit('button-click');
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }, 1000, { 'leading': true }),
  },
};
</script>

<style lang="scss" scoped>
button {
  &:disabled, &.disabled {
    opacity: 1;
  }
}
</style>
