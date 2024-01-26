<template>
  <div class="d-flex flex-row">
    <div v-if="icon || this.$slots.icon" class="div-icon-text-icon mr-3">
      <slot name="icon">
        <i
          :class="`${icon}`">
        </i>
      </slot>
    </div>
    <div>
      <div class="div-icon-text-heading">
        <slot name="header">
        </slot>
      </div>
      <div class="div-icon-text-content small">
        <slot name="description">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iconColor: {
      type: String,
      default: 'gradient-primary',
    },
    iconName: String,
    icon: String,
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
