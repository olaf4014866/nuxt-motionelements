<template>
  <div v-if="isShow">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'viewport-helper',
  props: {
    size: String,
  },
  data() {
    return {
      viewportWidth: 0,
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1600,
      },
    };
  },
  computed: {
    isShow() {
      if (this.boolVal === true) {
        if (this.viewportWidth >= this.requiredWidth.minWidth && this.viewportWidth < this.requiredWidth.maxWidth) {
          return true;
        }
        return false;
      }
      if (this.viewportWidth < this.requiredWidth.minWidth || this.viewportWidth >= this.requiredWidth.maxWidth) {
        return true;
      }
      return false;
    },
    boolVal() {
      return !this.size.match('^!');
    },
    requiredWidth() {
      let str = this.size;
      let min = 0;
      let max = Infinity;

      if (str.match('^!')) {
        str = str.substring(1, str.length);
      }

      if (str.indexOf('>=') >= 0) {
        str = str.substring(2, str.length);
        min = this.breakpoints[str];
      } else if (str.indexOf('<=') >= 0) {
        str = str.substring(2, str.length);

        const nextBreakpoint = this.getNextBreakpoint(str);
        if (this.breakpoints[nextBreakpoint]) {
          max = this.breakpoints[nextBreakpoint];
        }
      } else {
        min = this.breakpoints[str];
        const nextBreakpoint = this.getNextBreakpoint(str);
        if (this.breakpoints[nextBreakpoint]) {
          max = this.breakpoints[nextBreakpoint];
        }
      }

      return {
        minWidth: min,
        maxWidth: max,
      };
    },
  },
  methods: {
    setViewportWidth() {
      // * Script adapted from https://github.com/tysonmatanich/viewportSize
      let viewport;
      const document = window.document;
      const documentElement = document.documentElement;

      if (window.innerWidth === undefined) {
        // IE6 & IE7 don't have window.innerWidth or innerHeight
        viewport = documentElement.clientWidth;
      } else if (window.innerWidth !== documentElement.clientWidth) {
        // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

        // Insert markup to test if a media query will match document.doumentElement["client" + Name]
        const bodyElement = document.createElement('body');
        bodyElement.id = 'vpw-test-b';
        bodyElement.style.cssText = 'overflow:scroll';
        const divElement = document.createElement('div');
        divElement.id = 'vpw-test-d';
        divElement.style.cssText = 'position:absolute;top:-1000px';

        // Getting specific on the CSS selector so it won't get overridden easily
        divElement.innerHtml = `<style>@media(width:${documentElement.clientWidth}px){body#vpw-test-b div#vpw-test-d{width:7px!important}}</style>`;
        bodyElement.appendChild(divElement);
        documentElement.insertBefore(bodyElement, document.head);

        if (divElement.offsetWidth === 7) {
          // Media query matches document.documentElement.clientWidth
          viewport = documentElement.clientWidth;
        } else {
          // Mediq query doesn't match, use window.innerWidth
          viewport = window.innerWidth;
        }
        // Cleanup
        documentElement.removeChild(bodyElement);
      } else {
        // Default to use window.innerWidth
        viewport = window.innerWidth;
      }

      this.viewportWidth = viewport;
    },
    getNextBreakpoint(str) {
      const breakpointArray = Object.keys(this.breakpoints);
      return breakpointArray[breakpointArray.indexOf(str) + 1];
    },
  },
  mounted() {
    this.setViewportWidth();
    window.addEventListener('resize', () => {
      this.setViewportWidth();
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
