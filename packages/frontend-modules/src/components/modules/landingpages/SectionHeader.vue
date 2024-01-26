<template>
  <div class="section-header">
    <div v-if="icon" class="section-header-icon mb-2">
      <font-awesome-icon :icon="icon" :class="iconClass" fixed-width size="lg"></font-awesome-icon>
    </div>
    <h2
      class="h3 section-header-heading text-center"
      :class="( $slots.description || $slots.button ) ? 'mb-0' : ''"
    >
      <slot name="title">
        よくある質問
      </slot>
    </h2>
    <div v-if="$slots.description" class="text-center">
      <slot name="description">
      </slot>
    </div>
    <div v-if="$slots.button" class="text-center">
      <slot name="button">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: Array,
    iconClass: {
      type: String,
      default: 'text-muted',
    },
  },
};
</script>

<style lang="scss" scoped>
.section-header-heading {
  font-size: $h5-font-size;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1rem;

  [lang="ja"] &, [lang="ko"] &, [lang="zh-hant"] & {
    letter-spacing: .2rem;
  }
}

.section-header-icon {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;

  i, svg {
    line-height: 1.5rem;
  }

  &:before, &:after {
    content: '';
    margin: 0 $spacer 0 0;
    flex: 1 0 $spacer;
  }

  &:after {
    margin: 0 0 0 $spacer;
  }
}

// COLORS

.section-header-icon {
  &:before, &:after {
    border-top: $hr-border-width solid $hr-border-color;

    .ui-dark & {
      border-color: $hr-border-color-dark;
    }
  }
}

</style>
