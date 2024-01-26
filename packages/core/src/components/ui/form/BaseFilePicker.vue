<template>
  <div class="file-picker">
    <div @click="open"
         :class="getButtonClass"
         class="btn">
      {{ label || $t('cta.select_file') }}
    </div>
  </div>
</template>

<script>
import * as filestack from 'filestack-js';

export default {
  name: 'FilePicker',
  props: {
    buttonClass: String,
    label: {
      type: String,
      default: '',
    },
    pickerOptions: Object,
    error: Boolean,
    accept: Array, // https://filestack.github.io/filestack-js/interfaces/pickeroptions.html#accept
  },
  data() {
    return {
      pickerInstance: null,
      file: null,
      // https://filestack.github.io/filestack-js/interfaces/pickeroptions.html#imagemin
      defaultOptions: {
        // remove google image search
        // fromSources: ['local_file_system', 'url', 'facebook', 'instagram', 'googledrive', 'dropbox'],
        fromSources: ['local_file_system', 'facebook', 'instagram', 'googledrive', 'dropbox'],
        accept: this.accept,
        imageDim: [1920, 1080],
        imageMin: [100, 100],
        lang: ['ca', 'da', 'de', 'es', 'fr', 'he', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'sv', 'ru', 'vi', 'zh', 'tr'].includes(this.$i18n.locale) ? this.$i18n.locale : 'en',
        maxSize: 1024 * 1024 * 10, // 10mb
        transformations: {
          crop: true,
          circle: false,
          rotate: true,
          force: false,
        },
        storeTo: {
          location: 's3',
          path: '/artist/',
        },
        onFileSelected: (file) => {
          this.$emit('file-selected', file);
        },
        onFileUploadFinished: (file) => {
          this.$emit('file-uploaded', file);
        },
      },
    };
  },
  computed: {
    isIe() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
    getButtonClass() {
      return {
        'btn-danger': this.error,
        [this.buttonClass]: true,
      };
    },
  },
  created() {
    this.pickerInstance = filestack.init(process.env.VUE_APP_FILESTACK_API_KEY);
  },
  methods: {
    open() {
      const pickerOptions = _.merge(this.defaultOptions, this.pickerOptions || {});

      if (this.isIe) {
        delete pickerOptions.transformations;
        pickerOptions.disableTransformer = true;
      }

      this.pickerInstance.picker(pickerOptions).open();
    },
  },
};
</script>

<style lang="scss">
.fsp-loading--folder.center {
  z-index: 9999;
}
.fsp-notifications__container {
  position: fixed !important;
}
</style>

<style scoped lang="scss">
.form-group {
  &.error {
    .form-control {
      border-color: red;
    }
    .rounded-circle {
      box-shadow: 0 0 5px 1px red;
      opacity: .8;
    }
    img.img-fluid {
      box-shadow: 0 0 5px 1px red;
      opacity: .8;
    }
  }
}

.btn-danger {
  background: red;
  border-color: red;
  color: white;
}
</style>
