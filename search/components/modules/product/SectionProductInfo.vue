<template>
  <div class="row row-product-info">
    <div
      class="col-12"
      :class="isColumn ? '' : 'col-lg-3'"
    >
      <h3 class="h6">
        <slot name="heading"></slot>
      </h3>
    </div>
    <div class="col">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-info-section',
  props: {
    isColumn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.row-product-info {
  &:not(:last-child) {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    margin-bottom: $spacer;
  }
}

//
// COLORS
//

.row-product-info {
  &:not(:last-child) {
    border-bottom-color: $hr-border-color;

    .ui-dark & {
      border-bottom-color: $hr-border-color-dark;
    }
  }
}

</style>
