<template>
  <section>
    <div class="container py-5">
      <h1>Test Font load</h1>
      <h1>あいうえお順</h1>
    </div>
  </section>
</template>


<script>
// https://github.com/typekit/webfontloader
// import WebFontLoader from 'webfontloader';

export default {
  created() {
    // const languageCode = 'ja';
    // const languageCode = 'en';
    /* eslint-disable */
    if (false) {
      (function (d) {
        var config = {
          kitId: 'kcr4dls',
          scriptTimeout: 3000,
          async: true,
        };
        var h = d.documentElement;
        var t = setTimeout(() => {
          h.className = `${h.className.replace(/\bwf-loading\b/g, '')} wf-inactive`;
        }, config.scriptTimeout);
        var tk = d.createElement('script');
        var f = false;
        var s = d.getElementsByTagName('script')[0];
        var a;
        h.className += ' wf-loading';
        tk.src = `https://use.typekit.net/${config.kitId}.js`;
        tk.async = true;
        tk.onload = tk.onreadystatechange = function () {
          a = this.readyState;
          if (f || (a && a != 'complete' && a != 'loaded')) return;
          f = true;
          clearTimeout(t);
          try {
            Typekit.load(config);
          } catch (e) {
          }
        };
        s.parentNode.insertBefore(tk, s);
      }(document));
    }
    /* eslint-enable */
  },
  methods: {
    setFontLoaded() {
      this.$emit('font-loaded');
    },
  },
};
</script>
