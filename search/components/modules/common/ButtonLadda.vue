<template>
  <button class="btn" type="button" @click="emitEvent" :disabled="isLoading" :title="title">
    <font-awesome-icon v-if="!isLoading && showIcon" :icon="icon" fixed-width></font-awesome-icon>
    <font-awesome-icon v-if="isLoading" :icon="['fas','circle-notch']" fixed-width spin class="text-white"></font-awesome-icon>
    <slot></slot>
  </button>
</template>

<script>
import throttle from 'lodash/throttle';

export default {
  name: 'button-ladda',
  props: {
    title: {
      type: String,
    },
    icon: {
      type: Array,
      default() {
        return ['fas', 'me-search'];
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    emitEvent: throttle(function () {
      this.$emit('button-click');
    }, 1000, { 'leading': true }),
  },
};
</script>
