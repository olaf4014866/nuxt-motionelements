<template>
  <p>
    {{ credits }}
    <font-awesome-icon
      :icon="['fal','me-credits-circle']"
      title="credits"
    />
    <span class="text-secondary"> {{ $t('product.credits') }}</span>
  </p>
</template>

<script>
export default {
  name: 'price-label',
  props: {
    credits: Number,
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
  line-height: 1.5;

  small {
    font-weight: 300;
  }
}
</style>
