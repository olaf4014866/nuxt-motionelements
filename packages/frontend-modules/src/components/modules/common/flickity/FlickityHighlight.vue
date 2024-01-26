<template>
  <a :href="linkUrl" class="carousel-cell carousel-cell-16-9 d-block w-100">
    <img class="carousel-img img-fluid" :src="imgUrl" :alt="title">
    <div class="carousel-overlay d-flex align-items-end justify-content-center py-3">
      <div class="bg-overlay px-2 px-md-3 py-2 py-md-3 text-center rounded shadow-sm">
        <h3
          :class="this.$slots.description ? '' : 'mb-0'"
        >
          <!-- safari not support background-clip:text for some element -->
          <span class="text-gradient-primary">
            <slot name="title"></slot>
          </span>
        </h3>
        <p v-if="this.$slots.description">
          <slot name="description"></slot>
        </p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'flickity-highlight-cell',
  props: {
    bgImg: String,
    linkUrl: String,
    title: String,
  },
  computed: {
    imgUrl() {
      if (this.bgImg.includes('w=') || this.bgImg.includes('h=')) {
        /* eslint-disable-next-line */
        const regex = /w=\d+&h=\d+/gm;
        const subst = 'w=800&h=450';
        return this.bgImg.replace(regex, subst);
      }
      return this.bgImg;
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.carousel-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  padding-left: 4rem;
  padding-right: 4rem;

  @include media-breakpoint-down(sm) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  h3 {
    font-size: 1.25rem;
    line-height: 1em;
    width: 100%;
    text-align: center;

    @include media-breakpoint-down(sm) {
      font-size: 1rem;
    }

    // &:before, &:after {
    //   content: '';
    //   border-top: $hr-border-width solid $primary;
    //   margin: 0 $spacer 0 0;
    //   flex: 1 0 $spacer;
    // }

    // &:after {
    //   margin: 0 0 0 $spacer;
    // }
  }

  p {
    font-size: .75rem;
    line-height: 1rem;
    margin-bottom: 0;

    @include media-breakpoint-down(sm) {
      font-size: .6rem;
    }
  }
}

// COLOURS
.bg-overlay {
  background: $overlay-color;

  .ui-dark & {
    background: $overlay-color-dark;
  }
}
</style>
