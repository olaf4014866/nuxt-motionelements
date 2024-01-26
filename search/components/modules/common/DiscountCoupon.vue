<template>
  <div class="coupon-wrapper p-3 rounded">
    <div class="coupon-content p-3">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'discount-coupon',
};
</script>

<style lang="scss" scoped>
.coupon-wrapper {
  @include box-shadow($box-shadow-sm);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    @include box-shadow($box-shadow);
  }
}

.coupon-content {
  border-width: 2px;
  border-radius: $border-radius;
  border-style: dashed;
}

// COLORS
.coupon-wrapper {
  background: $white;

  .ui-dark & {
    background: map-get(map-get($theme-colors-variants,"dark"),"-1");
  }
}

.coupon-content {
  border-color: $light;

  .ui-dark & {
    border-color: $black;
  }
}
</style>
