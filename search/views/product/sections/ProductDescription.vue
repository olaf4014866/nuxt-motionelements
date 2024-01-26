<template>
  <SectionProductInfo
    class="section-product-info"
    v-if="true"
  >
    <!--zeus v-if="_.get(description, 'html')" -->
    <template #heading>
      {{ $t('product_page.description') }}
      <div
        class="mt-2 w-100"
      >
        <div
          v-if="showGoogleTranslate && description.language !== userLanguage"
          class="goog-trans-control clearfix">
          <a
            class="btn btn-sm btn-simple-secondary"
          >
            {{ $t('cta.translate') }}
            <!--
            @todo add google translate code
            vueMeta setName('google-translate-customization', '3ca53602e803fb59-7ad6471a993570f6-g33265d8ced0dfd09-16');

            <script type="text/javascript">
              function googleSectionalElementInit() {
                new google.translate.SectionalElement({
                  sectionalNodeClassName: 'product-description',
                  controlNodeClassName: 'goog-trans-control',
                  background: '#ffffff'
                }, 'google_translate_element');

                $('.goog-te-gadget-link').addClass('btn btn-default btn-xs pull-right');
              }
            </script>

            <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl={{ userLanguage }}"></script>
            -->
          </a>
          <div class="goog-te-sectional-gadget-all-logo pull-right m-l-sm notranslate">
            Powered by <span style="white-space:nowrap"><img src="https://translate.googleapis.com/translate_static/img/mini_google.png" width="37px" height="13px" style="padding-right: 3px"></span>
          </div>
        </div>

      </div>
    </template>

    <div
      class="mb-3 small element-description product-description"
      v-html="renderNewLines(description.html)"
    >
    </div>

  </SectionProductInfo>

</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'product-info',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    SectionProductInfo: () => import('@/views/product/components/SectionProductInfo.vue'),
  },
  data() {
    return {
      showGoogleTranslate: false,
    };
  },
  created() {

  },
  mounted() {
    const script = document.createElement('script');
    script.setAttribute('src', `https://translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl=${this.toGoogleTranslateLocale(this.userLanguage)}`);
    document.head.appendChild(script);
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      userLanguage: 'user/languageCode',
    }),
    element() {
      return this.product;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    isElement() {
      return this.product.object === 'element';
    },
    isCollection() {
      return this.product.object === 'collection';
    },
    description() {
      let value;

      const descriptions = _.get(this.element, 'descriptions');

      if (Array.isArray(descriptions) && descriptions.length) {
        value = descriptions.find(v => v.language === this.userLanguage);

        if (value && value.html.length) {
          return value;
        }

        // fallback to en
        value = descriptions.find(v => v.language === 'en');

        if (value && value.html.length) {
          return value;
        }

        // fallback to any other language
        value = descriptions.find(v => v.html.length);

        if (value) {
          return value;
        }
      }

      return {
        language: null,
        html: _.get(this.element, 'description', ''),
      };
    },
  },
  methods: {
    toGoogleTranslateLocale(languageCode) {
      return languageCode;
    },
    renderNewLines(text) {
      const lines = text.split('\n');

      let html = '';

      // return lines;
      lines.forEach((line) => {
        line = line.trim();
        // if no tags inside line, add p
        // allow for common tags within p
        // if (strlen(strip_tags($line, '<b><i><strong><em><a><img>')) == $length)
        //   $out .= '<p>' . trim($line) . '</p>';
        // else
        //   $out .= $line;
        //   if (line.length === line)

        if (/<(basefont|hr|input|source|frame|param|area|meta|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(line)) {
          html += line;
        } else {
          html += `<p>${line}</p>`;
        }
      });

      return html;
      // explode by \n
      // $arr=explode("\n",$str);
      // text = text.replace(/\n{2}/g, '&nbsp;</p><p>');
      // text = text.replace(/\n/g, '&nbsp;<br />');
      // return text;
    },
    handleNewLine(str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    },
  },
};
</script>

<style lang="scss" scoped>
.product-description::v-deep {
  .img-responsive {
    max-width: 100%;
    height: auto;
  }
}
</style>
