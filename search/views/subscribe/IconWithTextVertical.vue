<template>
  <div>
    <div v-if="icon || $slots.icon" class="div-icon-text-icon mb-2">
      <slot name="icon">
        <font-awesome-icon :icon="icon" :class="iconClass" :size="iconSize"></font-awesome-icon>
      </slot>
    </div>
    <div v-if="stepIndex" class="div-icon-text-steps py-2">
      <p class="text-uppercase text-muted h6 mb-1">Step {{ stepIndex }}</p>
    </div>
    <div class="div-icon-text-heading">
      <slot name="header">
        <h6>Heading</h6>
      </slot>
    </div>
    <div v-if="$slots.description" class="div-icon-text-content small">
      <slot name="description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Laudantium minus hic praesentium, saepe dignissimos deserunt voluptatum ullam facere repellendus,
          eaque debitis harum nesciunt ad, maxime necessitatibus illum exercitationem autem aliquam!</p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      default: function () {
        return ['fas', 'circle'];
      },
    },
    iconClass: String,
    iconSize: {
      type: String,
      default: '3x',
    },
    stepIndex: Number,
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
  .div-icon-text-icon {
    line-height: 1.5;

    > i {
      padding-top: 1px;
      padding-bottom: 1px;
    }
  }
  .div-icon-text-content {
    p, .lead {
      line-height: 1.5rem;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }
</style>
