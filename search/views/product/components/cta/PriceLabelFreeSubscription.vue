<template>
  <div class="price-label price-label-free">
    <font-awesome-icon
      :icon="['fal','me-lightning']"
      title="subscription"
    />
    <p class="text-dark">
    </p>
    <p class="text-secondary small">
    </p>
  </div>
</template>

<script>
export default {
  name: 'price-label-free-with-subscription',
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
  line-height: 1.5;

  &.text-secondary {
    font-weight: 300;
  }

  .h4 & {
    font-size: $h4-font-size;

    &.small {
      font-size: #{$h4-font-size * 0.8};
    }
  }
  .h5 & {
    font-size: $h5-font-size;

    &.small {
      font-size: #{$h5-font-size * 0.8};
    }
  }
}
</style>
