<template>
  <div>
    <!-- AddToAny BEGIN -->
    <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
      <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
      <a class="a2a_button_facebook"></a>
      <a class="a2a_button_twitter"></a>
      <a class="a2a_button_pinterest"></a>
      <a class="a2a_button_whatsapp" v-show="isMobile"></a>
      <template v-if="$i18n.locale === 'ja'">
        <a class="a2a_button_hatena"></a>
        <a class="a2a_button_mixi"></a>
        <a class="a2a_button_line" v-show="isMobile"></a>
      </template>
      <template v-if="$i18n.locale === 'ko'">
        <a class="a2a_button_line" v-if="isMobile"></a>
        <a class="a2a_button_kakao" v-else></a>
      </template>
    </div>
    <!-- AddToAny END -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'addtoany-share',
  computed: {
    ...mapState({
      isMobile: state => state.site.isMobile,
    }),
  },
  mounted() {
    const addtoanyScript = document.createElement('script');
    addtoanyScript.setAttribute('src', 'https://static.addtoany.com/menu/page.js');
    addtoanyScript.setAttribute('async', true);
    document.head.appendChild(addtoanyScript);

    let lang = 'en-US';
    switch (this.$i18n.locale) {
      case 'ja':
        lang = 'ja-JP';
        break;
      case 'ko':
        lang = 'ko-KR';
        break;
      case 'zh-hant':
        lang = 'zh-TW';
        break;
      default:
        lang = this.$i18n.locale;
        break;
    }

    const addtoanyLang = document.createElement('script');
    addtoanyLang.type = 'text/javascript';
    addtoanyLang.text = `var a2a_config = a2a_config || {}; a2a_config.locale = '${lang}';`;
    document.head.appendChild(addtoanyLang);
  },
};
</script>
