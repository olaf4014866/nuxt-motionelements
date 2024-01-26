<template>
  <router-link
    class="btn-mt bg-light flex-grow-1 py-2 px-2 px-md-3 rounded shadow-sm d-flex flex-column justify-content-center align-items-center"
    :to="link"
    @mouseover.native="heroMtHover"
    @mouseleave.native="heroMtOut"
  >
    <i
      :class="`me-bmt icon-${iconName}`"
      class="fas fa-fw fa-mt text-gradient-primary mb-1"></i>
    <div class="flex-grow-1 text-center text-mt">
      <span class="cjk-word-break">
        <slot>After Effects <wbr>テンプレート</slot>
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'hero-home-button',
  props: {
    iconName: String,
    link: String,
    title: String,
    lead: String,
  },
  computed: {
    textOnHover: function () {
      return {
        title: this.title,
        lead: this.lead,
      };
    },
  },
  methods: {
    heroMtHover() {
      this.$parent.$emit('update-hero-title', this.textOnHover);
    },
    heroMtOut() {
      this.$parent.$emit('restore-hero-title');
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-mt {
  line-height: 1.5;

  flex-basis: 0;
  transition: background-color 0.2s ease;
  margin-bottom: map-get($spacers,3);

  @include media-breakpoint-up(md) {
    min-height: 4rem;

    &:not(:first-child) {
      margin-left: map-get($spacers,2);
    }
    &:not(:last-child) {
      margin-right: map-get($spacers,2);
    }
  }

  @include media-breakpoint-down(sm) {
    &:not(:first-child) {
      margin-left: map-get($spacers,1);
    }
    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }
  }

  &:hover {
    box-shadow: $box-shadow !important;
  }
}
.fa-mt {
  line-height: 2.5rem;
  font-size: 2rem;

  @include media-breakpoint-down(sm) {
    line-height: 2rem;
    font-size: 1.5rem;
  }
}

.text-mt {
  width: 100%; // IE 11 patch
  @include media-breakpoint-down(sm) {
    font-size: $font-size-sm;
  }
}

// COLORS
.btn-mt {
  &:hover {
    background: map-get(map-get($theme-colors-variants,"light"),"1") !important;

    .ui-dark & {
      background: map-get(map-get($theme-colors-variants,"dark"),"-1") !important;
    }
  }
}
</style>
