<template>
  <div>
    <!-- AddToAny BEGIN -->
    <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
    <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
    <a class="a2a_button_facebook"></a>
    <a class="a2a_button_twitter"></a>
    <a class="a2a_button_pinterest"></a>
    <a class="a2a_button_hatena"></a>
    <a class="a2a_button_mixi"></a>
    </div>
    <!-- AddToAny END -->
  </div>
</template>

<script>
export default {
  name: 'addtoany-share',
  mounted() {
    // * NOT LOADING A2A IN PRERENDER
    if (process.env.VUE_APP_PRERENDER === 'false') {
      const addtoanyScript = document.createElement('script');
      addtoanyScript.setAttribute('src', 'https://static.addtoany.com/menu/page.js');
      addtoanyScript.setAttribute('async', true);
      document.head.appendChild(addtoanyScript);

      // eslint-disable-next-line no-use-before-define, camelcase
      var a2a_config = a2a_config || {};
      a2a_config.locale = 'ja';
    }
  },
};
</script>
