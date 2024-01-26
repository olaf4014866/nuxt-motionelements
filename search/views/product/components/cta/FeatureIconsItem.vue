<template>
  <div
    class="d-flex flex-row align-items-center mb-2"
  >
    <p class="mb-0 small">
      <slot name="icon">
        <font-awesome-icon
          size="2x"
          class="mr-2"
          fixed-width
          :icon="['far','exclamation-triangle']"
        ></font-awesome-icon>
      </slot>
    </p>
    <p class="mb-0 small">
      <slot name="label">
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'feature-icons-item',
};
</script>

<style lang="scss" scoped>

</style>
