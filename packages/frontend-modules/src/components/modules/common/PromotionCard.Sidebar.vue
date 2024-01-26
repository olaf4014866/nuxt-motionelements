<template>
  <div class="card bg-light border-0 mb-3">
    <div class="card-header py-2 text-center">
      <slot name="header">
      </slot>
    </div>
    <div class="card-body d-flex justify-content-center pb-0">
      <slot name="content">
      </slot>
    </div>
    <div class="card-footer border-0 bg-transparent pt-0 pb-3">
      <slot name="footer">
        <a href="#" class="btn btn-block btn-white-primary">
          {{ $t('cta.view_all') }} <font-awesome-icon :icon="['far','chevron-right']"></font-awesome-icon>
        </a>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'promotion-card-sidebar',
};
</script>

<style lang="scss" scoped>
.card-header {
  border: 0;

  h1, h2, h3, h4, h5, h6, p {
    margin-bottom: 0;
  }
}
</style>
