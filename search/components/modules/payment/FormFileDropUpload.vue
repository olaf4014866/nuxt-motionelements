<template>
  <div class="file-drop-wrapper">

    <div v-if="isLoadingLoop" class="overlay">
      <div class="overlay-content d-flex w-100 h-100">
        <div class="container text-center align-self-center">
          <p>{{ loadingLoopMessage }}</p>
          <div class="d-inline-block ui-loading"></div>
        </div>
      </div>
    </div>

    <!-- loading progress -->
    <div v-if="isLoadingProgress" class="overlay">
      <div class="overlay-content d-flex w-100 h-100">
        <div class="container text-center align-self-center">
          <p>{{ loadingProgressMessage }}</p>
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
    <!-- file drop zone -->
    <div class="file-drop-content">
      <div v-if="isFileDropDrag" class="file-drop-overlay overlay">
        {{ $t('upload.drop_file_here')}}
      </div>
      <div class="file-drop-content-container container">
        <div class="d-flex flex-column justify-content-center align-items-center py-4">
          <div>
            <p class="mb-0">
              <font-awesome-layers class="fa-6x fa-fw">
                <font-awesome-icon :icon="['fas', 'cloud']" fixed-width class="text-muted" />
                <font-awesome-icon :icon="['fas', 'file-upload']" fixed-width class="text-white" transform="shrink-8 down-1" />
              </font-awesome-layers>
            </p>
          </div>
          <p class="text-center mb-0" v-if="form.url">
            {{ $t('upload.drop_file_here')}}
          </p>
          <p class="text-center mb-0" v-else>
            {{ $t('upload.drop_file_here')}}
          </p>
          <label class="btn btn-sm btn-secondary" for="file">
            {{ $t('upload.choose_file')}}
          </label>
          <div class="file-drop-content-text px-3">
            <input type="file" id="file" name="file" ref="fileUpload" accept="image/*" @change="onDrop" hidden />
          </div>
          <p class="text-center mb-0" v-if="form.url">
          <!--            Your uploaded file link: <a :href="form.url" target="_blank">{{ form.filename }}</a>-->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  createS3PresignedUploadUrl,
  uploadMediaToS3,
} from '@/services/upload.service.js';

export default {
  name: 'payment-file-drop-upload',
  data() {
    return {
      isFileDropDrag: false,
      uploadLastTarget: null,
      form: {
        url: '',
        filename: '',
      },
      status: 0,
    };
  },
  props: {
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

    isFileDrop() {
      return this.isFileDropDrag || this.isFileDropClick;
    },
    isActive() {
      return this.isFileDrop || this.isLoadingLoop || this.isLoadingProgress;
    },
  },
  mounted() {
    // this.$root.$on('onDrop', (event) => {
    //   this.onDrop(event);
    // });
    this.$el.addEventListener('dragenter', this.onDragEnter);
    this.$el.addEventListener('dragleave', this.onDragLeave);
    this.$el.addEventListener('dragover', this.onDragOver);
    this.$el.addEventListener('drop', this.onDrop);
  },
  beforeDestroy() {
    this.$el.removeEventListener('dragenter', this.onDragEnter);
    this.$el.removeEventListener('dragleave', this.onDragLeave);
    this.$el.removeEventListener('dragover', this.onDragOver);
    this.$el.removeEventListener('drop', this.onDrop);
    // clearInterval(this.pollInterval);
  },
  methods: {
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
      const formData = new FormData();
      const hasFile = _.isObject(files[0]);
      console.log('hasfile', hasFile);
      const fileName = files[0].name;
      this.form.filename = fileName;
      const fileExtensions = fileName.split('.').pop().toLowerCase();
      const randomName = this.uuid();
      const uploadFilename = `${randomName}.${fileExtensions}`;
      const supportImageList = [
        'jpg', 'jpeg', 'png', 'gif', 'bmp',
      ];
      const isSupportImageFormat = _.indexOf(supportImageList, fileExtensions) >= 0;
      if (!isSupportImageFormat) {
        // show not support ui
        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'warning',
          title: this.$t('search.not_supported_media'),
          autohide: true,
          delay: 5000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);
        console.log('not support format');
        console.log('isSupportImageFormat', isSupportImageFormat);
      } else {
        createS3PresignedUploadUrl().then((result) => {
          formData.append('policy', result.policy);
          formData.append('signature', result.signature);
          formData.append('AWSAccessKeyId', result.accessKey);
          formData.append('key', `${result.path}/${uploadFilename}`);
          formData.append('Content-Type', 'binary/octet-stream');
          formData.append('x-amz-storage-class', 'STANDARD');
          formData.append('acl', 'public-read');
          formData.append('file', files[0]);

          console.log('uploading11', formData);

          // set progress bar ON
          this.$store.dispatch('site/setLoadingProgress', {
            status: true,
            message: this.$t('search.progressing'),
            progress: 0,
          });
          uploadMediaToS3(result.url, formData, this.onUploadProgress)
            .then(() => {
              this.offLoadingProgress();
              this.form.url = `${result.url}/${result.path}/${uploadFilename}`;
              const formData = { ...this.form };
              console.log('upload.emit', formData);
              this.$emit('upload-done', formData);
            }).catch((err) => {
              console.error('has error, stop upload and reset status', err);
              this.offLoadingProgress();
            });
        });
      }
    },
    offLoadingProgress() {
      this.$store.dispatch('site/setLoadingProgress', {
        status: false,
        message: '',
        progress: 0,
      });
    },
    onUploadProgress(progressEvent) {
      // trigger upload progress block when doing upload
      this.status = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      console.log(this.status);
      // store.dispatch('site/setLoadingProgress', info);
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
  position: relative;
  width: 100%;
  height: 100%;
  border: 4px dashed;
  border-radius: $border-radius;
}

.file-drop-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .file-drop-overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $overlay-color;
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

.file-drop-wrapper{
  border-color: $file-drop-text-color;

  .ui-dark & {
    border-color: $file-drop-text-color-dark;
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
