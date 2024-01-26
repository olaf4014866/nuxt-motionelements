<template>
  <div>
    <a
      :href="link"
      class="btn-block btn-free bg-gradient-free px-3 py-1 rounded-lg d-flex flex-column flex-sm-row align-items-center">
      <div class="mr-2 py-1 py-sm-0 col-icon">
        <slot name="icon">
          <font-awesome-icon :icon="['fas','me-video']" fixed-width></font-awesome-icon>
        </slot>
      </div>
      <div class="flex-grow-1 btn-text text-center col-text">
          <strong class="lead font-weight-bold">
            <slot name="title">
              {{ $t('product.free') }}
            </slot>
          </strong><br />
          <p class="small cjk-word-break mb-0">
            <slot name="text">
              {{ $t('footer.free_stock_footage') }}
            </slot>
          </p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'free-button',
  props: {
    link: String,
  },
};
</script>

<style lang="scss" scoped>
.btn-free {
  min-height: 4.25rem;
  line-height: 1.5;
  transition: box-shadow 0.2s ease-in-out;
  @include box-shadow($box-shadow-sm);

  &:hover {
    @include box-shadow($box-shadow);
  }
}

// COLORS
.btn-free {
  color: $dark;

  &:hover {
    color: $black;
  }
}
</style>
