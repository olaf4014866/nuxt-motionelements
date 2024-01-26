<template>
  <div class="mce-editor">
    <Editor
        :api-key="apiKey"
        :init="initConfig"
        v-model="model"
        @onChange="onChange"
    />
<!--    @onNodeChange="onInput"-->
  </div>
</template>

<script>
export default {
  name: 'TinyMceEditor',
  components: {
    Editor: () => import(/* webpackChunkName: "tinymce" */ '@tinymce/tinymce-vue'),
  },
  props: {
    init: {
      type: Object,
    },
    value: String,
  },
  data: () => ({
    apiKey: process.env.VUE_APP_TINYMCE_API_KEY,
  }),
  computed: {
    getDescription() {
      return this.get('description');
    },
    initConfig() {
      const config = this.init || {};

      let language = _.get(config, 'language') || 'en';

      delete config.language;

      switch (language) {
        case 'pt':
          language = 'pt_BR';
          break;

        case 'th':
          language = 'th_TH';
          break;

        case 'ko':
          language = 'ko_KR';
          break;

        case 'fr':
          language = 'fr_FR';
          break;

        case 'hu':
          language = 'hu_HU';
          break;

        case 'it':
          language = 'it_IT';
          break;

        case 'zh-hant':
          language = 'zh_TW';
          break;

        default:
          break;
      }

      return {
        menubar: false,
        statusbar: false,
        language: language,
        // toolbar_items_size: 'small',
        ...config,
      };
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    onChange(event, editor) {
      // console.log('TinyMCE onChange', event, editor);
      this.$emit('change', editor.getContent());
      // this.$emit('change', event);
    },
    onInput(event, editor) {
      // console.log('TinyMCE onInput', event, editor);
      this.$emit('input', editor.getContent());
      // this.$emit('input', window.tinymce.activeEditor.getContent());
    },
  },
};
</script>

<style scoped lang="scss">
.mce-editor {
  &::v-deep .tox {
    border: 1px solid $gray-100;
    border-radius: 5px;
    .tox-toolbar__primary {
      background: none;
      border-bottom: 1px solid $gray-100;
    }
    .tox-statusbar {
      &__branding {
        display: none;
      }
    }
    .tox-tbtn {
      height: 18px;
      width: 18px;
      svg {
        transform: scale(.6);
      }
    }
  }
}
</style>
