<template>
  <div class="flex-grow-1">
    <h1
      :class="textClasses"
      class="cjk-word-break"
    >
      <slot name="title"></slot>
    </h1>
    <p
      v-show="hasLeadText"
      class="lead"
      :class="textClasses"
    >
      <slot name="lead"></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    textColor: String,
    textStyles: {
      type: Object,
      default: function () {
        return {
          invertColor: {
            type: Boolean,
            default: false,
          },
          lockColor: {
            type: Boolean,
            default: false,
          },
        };
      },
    },
  },
  computed: {
    hasLeadText() {
      return !!this.$slots.lead;
    },
    textClasses() {
      if (this.textStyles.lockColor === true && this.textStyles.invertColor === false) {
        return 'text-dark no-invert';
      }
      if (this.textStyles.lockColor === true && this.textStyles.invertColor === true) {
        return 'text-light no-invert';
      }
      if (this.textStyles.invertColor === true) {
        return 'text-light';
      }
      return '';
      // return {
      //   'no-invert': this.textStyles.lockColor,
      //   'text-light': this.textStyles.invertColor,
      //   'text-dark': this.textStyles.lockColor && !this.textStyles.invertColor,
      // };
    },
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    @include media-breakpoint-down(sm) {
      font-size: 1.75rem;
      line-height: 3rem;
    }
    @include media-breakpoint-between(md,lg) {
      font-size: 2rem;
      line-height: 3rem;
    }
  }
  .lead {
    @include media-breakpoint-down(sm) {
      font-size: 1rem;
    }
  }

  // COLORS

  .text-light::v-deep {
    a {
      color: $white;

      &:hover, &:active, &:focus {
        color: $link-hover-color-dark;
      }
    }
  }
</style>
