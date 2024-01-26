<template>
  <div class="row justify-content-center">
    <div class="col-11 col-sm-12 col-lg-10 py-5 bg-light lt rounded">
      <div>
        <h4 v-if="$slots.heading" class="mb-4">
          <slot name="heading">
          </slot>
        </h4>
        <div class="content">
          <slot name="content">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'generic-content-box',
};
</script>

<style lang="scss" scoped>
.content {
  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
