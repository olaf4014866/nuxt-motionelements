<template>
  <transition name="fade">
    <div v-if="isActive" class="file-drop-wrapper">
      <div v-if="isLoadingLoop" class="overlay">
        <div class="overlay-content d-flex w-100 h-100">
          <div class="container text-center align-self-center">
            <p>{{loadingLoopMessage}}</p>
            <div class="d-inline-block ui-loading"></div>
          </div>
        </div>
      </div>

      <div v-if="isLoadingProgress" class="overlay">
        <div class="overlay-content d-flex w-100 h-100">
          <div class="container text-center align-self-center">
            <p>{{loadingProgressMessage}}</p>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{ width: loadingProgress+'%' }"
                :aria-valuenow="loadingProgress"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isFileDrop" class="file-drop">
        <slot>
          <div class="file-drop-content">
            <div v-if="isFileDropClick" class="btn-close-wrapper position-absolute">
              <button type="button" class="close" aria-label="Close" @click="$root.$emit('toggle-search-hint', {type: 'upload', value: false})">
                <span aria-hidden="true">&times; <span class="small font-weight-bold">{{ $t('search.close') }}</span></span>
              </button>
            </div>
            <div class="file-drop-content-container container">
              <div class="d-flex justify-content-center align-items-center">
                <div class="text-right">
                  <p class="mb-0">
                    <font-awesome-layers class="fa-6x fa-fw">
                      <font-awesome-icon :icon="['fas', 'cloud']" fixed-width class="text-muted" />
                      <font-awesome-icon :icon="['fas', 'file-upload']" fixed-width class="text-white" transform="shrink-8 down-1" />
                    </font-awesome-layers>
                  </p>
                </div>
                <div class="file-drop-content-text px-3">
                  <p>
                    <span class="font-weight-bold">{{ $t('search.drop_{file}_here_to_search', {file: isAudio ? $t('term.file') : $t('term.file')}) }}</span>
                    <span class="mx-3">{{ $t('term.or') }}</span>
                    <input type="file" ref="fileUpload" @change="onDrop" hidden />
                    <button
                      class="btn btn-sm btn-secondary"
                      @click="$root.$emit('toggle-search-hint', {type: 'upload', value: false}), onClickUpload()">
                      {{ $t('cta.choose_file') }}
                    </button>
                  </p>
                  <p
                    class="small">
                    {{ $t('search.accepts_{formats}', { formats: isAudio ? ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.3gp', '.wav', '.aif', '.mp3'].join(', ') : ['.jpg', '.png', '.bmp', '.gif', '.mp4', '.mov', '.wmv', '.mpg'].join(', ')}) }}<br />
                    {{ $t('search.files_securely_deleted') }}
                  </p>
                  <p v-if="isFileDropClick">
                    <a :href="$siteUrl('/audiosearch').search().url()">{{ $t('cta.learn_more') }} <font-awesome-icon :icon="['fas','question-circle']"></font-awesome-icon></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FileDropUpload',
  data() {
    return {
      pollInterval: null,
      isFileDropDrag: false,
      uploadLastTarget: null,
    };
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        fullscreen: {
          type: Boolean,
          default: true,
        },
      }),
    },
    isFileDropClick: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      isLoadingLoop: state => state.site.loadingLoop.status,
      loadingLoopMessage: state => state.site.loadingLoop.message,

      isLoadingProgress: state => state.site.loadingProgress.status,
      loadingProgressMessage: state => state.site.loadingProgress.message,
      loadingProgress: state => state.site.loadingProgress.progress,
    }),

    isAudio() {
      return this.$store.getters['site/currentMediaType'].isAudio ? true : false;
    },

    isFileDrop() {
      return this.isFileDropDrag || this.isFileDropClick;
    },
    isActive() {
      return this.isFileDrop || this.isLoadingLoop || this.isLoadingProgress;
    },
  },
  mounted() {
    this.$root.$on('onDrop', (event) => {
      this.onDrop(event);
    });

    window.addEventListener('dragenter', this.onDragEnter);
    window.addEventListener('dragleave', this.onDragLeave);
    window.addEventListener('dragover', this.onDragOver);
    window.addEventListener('drop', this.onDrop);
  },
  beforeDestroy() {
    window.removeEventListener('dragenter', this.onDragEnter);
    window.removeEventListener('dragleave', this.onDragLeave);
    window.removeEventListener('dragover', this.onDragOver);
    window.removeEventListener('drop', this.onDrop);
    clearInterval(this.pollInterval);
  },
  methods: {
    onClickUpload() {
      this.$refs.fileUpload.click();
    },
    onDragEnter(e) {
      this.uploadLastTarget = e.target;
      this.isFileDropDrag = true;
    },
    onDragLeave(e) {
      if (e.target === this.uploadLastTarget) {
        this.isFileDropDrag = false;
      }
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();
      this.isFileDropDrag = false;
      const files = e.target.files || e.dataTransfer.files;
      console.log('ondrop files ', files);
      if (!files.length) {
        return;
      }

      this.$scrollToTop();

      const formData = new FormData();
      const hasFile = _.isObject(files[0]);
      console.log(hasFile);
      if (hasFile) {
        const fileName = files[0].name;
        const fileExtensions = fileName.split('.').pop().toLowerCase();
        const randomName = this.uuid();
        const uploadFilename = `${randomName}.${fileExtensions}`;
        // console.log(fileExtensions);

        const currentMediaType = this.$store.getters['site/currentMediaType'];
        // console.log(currentMediaType);

        let isSupportFormat = false;
        let searchMode = '';

        const supportImageList = [
          'jpg', 'jpeg', 'png', 'gif', 'bmp',
        ];

        const supportAudioList = [
          'wav', 'mp3', 'aif', 'aiff', 'aifc', 'wma', 'oga', 'm4a', 'flac',
        ];

        const supportVideoList = [
          'mp4', 'mov', 'h264', 'wmv', '3gp', 'webm', 'ogv', 'ogg',
          'mpg', 'mpeg', 'mpe', 'avi', 'mkv', 'vob', 'm4v', 'mxf', 'm1v', 'm2v',
        ];

        const isSupportAudioFormat = _.indexOf(supportAudioList, fileExtensions) >= 0;
        const isSupportVideoFormat = _.indexOf(supportVideoList, fileExtensions) >= 0;
        const isSupportImageFormat = _.indexOf(supportImageList, fileExtensions) >= 0;

        console.log('isSupportAudioFormat', isSupportAudioFormat);
        console.log('isSupportVideoFormat', isSupportVideoFormat);
        console.log('isSupportImageFormat', isSupportImageFormat);

        if (currentMediaType.isAudio && (isSupportAudioFormat || isSupportVideoFormat)) {
          isSupportFormat = true;
          searchMode = 'aural';
        }

        if (!currentMediaType.isAudio && (isSupportImageFormat || isSupportVideoFormat)) {
          isSupportFormat = true;
          searchMode = 'visual';
        }

        // console.log(isSupportFormat)
        if (!isSupportFormat) {
          // show not support ui

          const notify = this.$store.getters['site/notifyMessages'];
          notify.status = true;
          notify.contents.push({
            name: 'notifyMessages',
            type: 'warning',
            title: this.$i18n.t('search.not_supported_media'),
            autohide: true,
            delay: 5000,
          });

          this.$store.dispatch('site/setNotifyMessages', notify);
          console.log('not support format');

          console.log('isSupportAudioFormat', isSupportAudioFormat);
          console.log('isSupportVideoFormat', isSupportVideoFormat);
          console.log('isSupportImageFormat', isSupportImageFormat);
        } else {
          this.$store.dispatch('site/getUploadSetting').then((result) => {
            formData.append('policy', result.policy);
            formData.append('signature', result.signature);
            formData.append('AWSAccessKeyId', result.access_key);
            formData.append('key', `search/test/${uploadFilename}`);
            formData.append('Content-Type', 'binary/octet-stream');
            formData.append('x-amz-storage-class', 'STANDARD');
            formData.append('acl', 'public-read');
            formData.append('file', files[0]);

            // set progress bar ON
            this.$store.dispatch('site/setLoadingProgress', {
              status: true,
              message: this.$i18n.t('search.progressing'),
              progress: 0,
            });

            this.$store
              .dispatch('site/doUploadMediaToS3', formData)
              .then(() => {
                // console.log(result)

                // set progress bar
                // this.$store.dispatch('site/setLoadingProgress', { status: false })

                // save reference to the interval
                const info = {
                  mediaType: searchMode,
                  filename: uploadFilename,
                };

                this.pollInterval = setInterval(() => {
                  this.pollUploadAnalyze(info);
                }, 2500);
                // set polling timeout
                // setTimeout(() => {
                //   console.log('clearInterval');
                //   clearInterval(this.pollInterval, (30 * 10000));
                // });
              });
          });
        }
      }
      this.$emit('drop', formData, files);
      // this.$root.$emit('drop', formData, files);
    },
    pollUploadAnalyze(params) {
      let pollingMessage = [
        this.$i18n.t('search.analyzing_visual_1'),
        this.$i18n.t('search.analyzing_visual_2'),
        this.$i18n.t('search.analyzing_visual_3'),
        this.$i18n.t('search.analyzing_visual_4'),
        this.$i18n.t('search.analyzing_visual_5'),
        this.$i18n.t('search.analyzing_visual_6'),
        this.$i18n.t('search.analyzing_visual_7'),
      ];

      const currentMediaType = this.$store.getters['site/currentMediaType'];
      if (currentMediaType.isAudio) {
        pollingMessage = [
          this.$i18n.t('search.analyzing_aural_1'),
          this.$i18n.t('search.analyzing_aural_2'),
          this.$i18n.t('search.analyzing_aural_3'),
          this.$i18n.t('search.analyzing_aural_4'),
          this.$i18n.t('search.analyzing_aural_5'),
          this.$i18n.t('search.analyzing_aural_6'),
        ];
      }

      this.$store.dispatch('site/setLoadingProgress', {
        status: true,
        message: _.sample(pollingMessage),
        progress: 0,
      });

      this.$store.dispatch('site/getUploadAnalyze', params).then((response) => {
        console.info('site/getUploadAnalyze', response.data.data.status);

        // check if status is completed, if it is stop polling
        if (response.data.data.status === 'succeeded') {
          clearInterval(this.pollInterval);
          console.info('site/getUploadAnalyze : succeeded clearInterval');

          // set progress bar OFF
          this.$store.dispatch('site/setLoadingProgress', {
            status: false,
            message: this.$i18n.t('search.analyze_done'),
            progress: 0,
          });

          const currentMediaType = this.$store.getters['site/currentMediaType'];

          if (currentMediaType.id === 'video') {
            window.location.href = `https://search.motionelements.com/${this.$i18n.locale}/search/${currentMediaType.id}?sort=match&page=1&similar=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Ftemp-motionelements%2F${encodeURI(response.data.data.file_path)}`;
          } else if (currentMediaType.id === 'music') {
            window.location.href = `https://search.motionelements.com/${this.$i18n.locale}/search/${currentMediaType.id}?similar=${encodeURI(response.data.data.externalTrackID)}-${params.filename}`;
          } else {
            window.location.href = `https://search.motionelements.com/${this.$i18n.locale}/search/${currentMediaType.id}?sort=match&page=1&similar=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Ftemp-motionelements%2F${encodeURI(response.data.data.file_path)}`;
          }
        }
      }).catch((error) => {
        console.info(error.response.data.errors[0].title);
        clearInterval(this.pollInterval);
        this.$store.dispatch('site/setLoadingProgress', {
          status: false,
          message: this.$i18n.t('search.analyze_done'),
          progress: 0,
        });
        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'danger',
          title: error.response.data.errors[0].title || this.$i18n.t('search.upload_fail_more_15s_second'),
          autohide: true,
          delay: 5000,
        });

        this.$store.dispatch('site/setNotifyMessages', notify);
        // console.log(error.message.danger);
      });
    },
    aiSearchChooseFile() {
      this.$parent.$emit('ai-search-choose-file');
    },
  },
};
</script>

<style lang="scss" scoped>
$file-drop-text-color: $text-muted;
$file-drop-text-color-dark: $text-muted-dark;
$file-drop-font-size: 4rem;

.file-drop-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;

  &.is-fullscreen {
    position: fixed;
  }
}

.file-drop, .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.file-drop {
  .file-drop-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .file-drop-content-container {
      z-index: 10;
    }

    &:before {
      border: 4px dashed;
      border-radius: $spacer/2;
      content: "";
      position: absolute;
      top: 3rem;
      right: 2rem;
      bottom: 3rem;
      left: 2rem;
      z-index:0;
    }
  }
}

.file-drop-content-text {
  > p {
    margin-bottom: map-get($spacers, 2);

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.btn-close-wrapper {
  top: 4rem;
  right: 3rem;
}

// COLORS

.file-drop, .overlay {
  background-color: $overlay-color;

  .ui-dark & {
    background-color: $overlay-color-dark;
  }
}

.file-drop {
  .file-drop-content {
    &:before {
      border-color: $file-drop-text-color;

      .ui-dark & {
        border-color: $file-drop-text-color-dark;
      }
    }
  }
}

</style>
