<template>
  <div
    :class="`${textPosition == 'top' || textPosition == 'bottom' ? 'flex-column' : 'flex-row'}`"
    class="row align-items-center">
    <div
      :class="`${textAlignClasses} ${textPosition == 'top' ? 'mb-5' : ''}`"
      class="col col-text">
      <slot name="text">
        <h4>Section Heading</h4>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>
        <p>Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.</p>
      </slot>
    </div>
    <div
      :class="`col-lg-${mediaColWidth} ${mediaMargin} ${mediaOrder}`"
      class="col col-media col-12">
      <slot name="media">
        <img src="@/assets/img-mockup/placeholder-640x360-light.jpg" class="d-block img-fluid mx-auto">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'section-text-image',
  props: {
    textPosition: {
      type: String,
      default: 'left',
    },
    textSize: {
      type: Number,
      default: 4,
    },
    textAlign: {
      type: [String, Array],
      default: 'left',
    },
    textWidth: {
      type: Number,
      default: 8,
    },
  },
  computed: {
    textAlignClasses: function () {
      if (typeof (this.textAlign) === 'object') {
        var classList = '';
        for (let i = 0; i < this.textAlign.length; i += 1) {
          classList += this.textAlign[i].viewport !== 'xs' ? `text-${this.textAlign[i].viewport}-${this.textAlign[i].size} ` : `text-${this.textAlign[i].size} `;
        }
        return _.trim(classList);
      }
      return `text-${this.textAlign}`;
    },
    mediaColWidth: function () {
      if (this.textPosition === 'top' || this.textPosition === 'bottom') {
        return 12;
      }
      return 12 - this.textWidth;
    },
    mediaMargin: function () {
      switch (this.textPosition) {
        case 'bottom':
          return 'mb-5';
        case 'left':
        case 'right':
          return 'mb-5 mb-lg-0';
        default:
          return '';
      }
    },
    mediaOrder: function () {
      switch (this.textPosition) {
        case 'left':
          return 'order-first order-lg-last';
        case 'top':
          return '';
        default:
          return 'order-first';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.col-text {
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
