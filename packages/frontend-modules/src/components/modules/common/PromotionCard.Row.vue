<template>
  <div class="d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center rounded shadow-sm">
    <div class="card-body">
      <slot name="header"></slot>
      <slot name="content"></slot>
    </div>
    <div class="card-footer border-0 bg-transparent pt-0 pb-3 pb-sm-0">
      <slot name="footer">
        <a href="#" class="btn btn-block btn-white-primary">
          {{ $t('cta.view_all') }}
          <font-awesome-icon :icon="['far','chevron-right']"></font-awesome-icon>
        </a>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'promotion-card-row',
};
</script>

<style lang="scss" scoped>
.card-body {
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
