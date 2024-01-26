import { mapState, mapGetters } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

import notificationService from '@motionelements/core/src/services/notification.service.js';
import { getJobStatus } from '@motionelements/core/src/services/job.service.js';
import { uploadToS3Temp } from '@motionelements/core/src/services/upload.service.js';
import * as searchApi from '@/api/search.js';

export default {
  data() {
    return {
      pollInterval: null,
      uploadAreaVisible: false,
      uploadLastTarget: null,
    };
  },
  computed: {
    ...mapState({
      loadingLoopClass: state => state.site.loadingLoop.status,
      loadingLoopMessage: state => state.site.loadingLoop.message,

      loadingProgressClass: state => state.site.loadingProgress.status,
      loadingProgressMessage: state => state.site.loadingProgress.message,
      loadingProgress: state => state.site.loadingProgress.progress,

      // by marksun
      currentMediaType: state => state.search.mediaType,
      // searchKeyword: state => state.search.filter.searchKeyword,

      perPage: state => state.search.pagination.perPage,
      filters: state => state.search.filter,
    }),
    ...mapGetters({
      searchKeyword: 'search/keyword',
    }),
    uploadAreaVisibleClass() {
      return {
        active: this.uploadAreaVisible,
      };
    },
    isLoadingLoopClass() {
      return {
        active: this.loadingLoopClass,
      };
    },
    isLoadingProgressClass() {
      return {
        active: this.loadingProgressClass,
      };
    },
    isActiveClass() {
      return {
        active: this.uploadAreaVisible || this.loadingLoopClass || this.loadingProgressClass,
      };
    },
    isAudio() {
      return isProductType('audio', this.currentMediaType);
    },
    acceptedFileExtensions() {
      const imageExtensions = [
        'jpg', 'jpeg', 'png', 'gif', 'bmp',
      ];

      const audioExtensions = [
        'wav', 'mp3', 'aif', 'aiff', 'aifc', 'wma', 'oga', 'm4a', 'flac',
      ];

      const videoExtensions = [
        'mp4', 'mov', 'h264', 'wmv', '3gp', 'webm', 'ogv', 'ogg',
        'mpg', 'mpeg', 'mpe', 'avi', 'mkv', 'vob', 'm4v', 'mxf', 'm1v', 'm2v',
      ];

      return this.isAudio
        ? [...audioExtensions, ...videoExtensions]
        : [...imageExtensions, ...videoExtensions];
    },
    pollingMessages() {
      if (this.isAudio) {
        return [
          this.$i18n.t('search.analyzing_aural_1'),
          this.$i18n.t('search.analyzing_aural_2'),
          this.$i18n.t('search.analyzing_aural_3'),
          this.$i18n.t('search.analyzing_aural_4'),
          this.$i18n.t('search.analyzing_aural_5'),
          this.$i18n.t('search.analyzing_aural_6'),
        ];
      }

      return [
        this.$i18n.t('search.analyzing_visual_1'),
        this.$i18n.t('search.analyzing_visual_2'),
        this.$i18n.t('search.analyzing_visual_3'),
        this.$i18n.t('search.analyzing_visual_4'),
        this.$i18n.t('search.analyzing_visual_5'),
        this.$i18n.t('search.analyzing_visual_6'),
        this.$i18n.t('search.analyzing_visual_7'),
      ];
    },
  },
  created() {
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

    onDragEnter(e) {
      this.uploadLastTarget = e.target;
      this.uploadAreaVisible = true;
    },
    onDragLeave(e) {
      if (e.target === this.uploadLastTarget) {
        this.uploadAreaVisible = false;
      }
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();
      this.uploadAreaVisible = false;
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }

      this.$scrollToTop();

      // set filter bar default icon
      const filterBar = this.$store.getters['search/allSearchFilterBar'];
      filterBar.similar.imageUrl = '';
      this.$store.dispatch('search/setFilterBar', filterBar);

      // console.log(_.isObject(files[0]));

      const formData = new FormData();
      const hasFile = _.isObject(files[0]);
      if (hasFile) {
        const file = files[0];
        const fileName = files[0].name;
        const originalFilename = files[0].name;
        // const fileName = files[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        const randomName = this.uuid();
        const uploadFilename = `${randomName}.${fileExtension}`;
        // console.log(fileExtensions);

        // const currentMediaType = this.currentMediaType;
        // console.log(currentMediaType);

        const isSupportFormat = this.acceptedFileExtensions.includes(fileExtension);

        const searchMode = this.isAudio ? 'aural' : 'visual';

        // console.log(isSupportFormat)
        if (!isSupportFormat) {
          // show not support ui

          notificationService.alert({
            level: 'warning',
            title: this.$i18n.t('search.not_supported_media'),
          });

          console.log('not support format');
        } else {
          this.$store.dispatch('site/setLoadingProgress', {
            status: true,
            message: this.$t('search.progressing'),
            progress: 0,
          });

          uploadToS3Temp('search', file, uploadFilename, {
            onUploadProgress: (progressEvent) => {
              // trigger upload progress block when doing upload
              // console.log(info)
              this.$store.dispatch('site/setLoadingProgress', {
                status: true,
                progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
              });
              // this.uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            },
          }).then((response) => {
            // this.$store.dispatch('site/getUploadSetting').then((result) => {
            // getS3UploadSettings('search').then((response) => {
            // save reference to the interval
            console.log('response111', response);

            const fileUrl = response.url;

            this.analyzeFile({
              type: searchMode,
              url: fileUrl,
            }).then((response) => {
              const data = response.data.data;

              // check if status is completed, if it is stop polling
              if (data.status === 'succeeded') {
                // clearInterval(this.pollInterval);
                this.onAnalyzeSuccess(data, originalFilename);
                return;
              }

              const jobId = _.get(data, 'job.id');

              if (jobId) {
                return this.pollJobStatus(jobId, {
                  type: searchMode,
                  url: fileUrl,
                  originalFilename: originalFilename,
                });
              }

              throw new Error('failed to create job.');

              // if (data.job.id) {
              //   this.pollInterval = setInterval(() => {
              //     this.pollUploadAnalyze({
              //       type: searchMode,
              //       url: response.url,
              //     });
              //   }, 2500);
              // }
            }).catch((error) => {
              notificationService.alert({
                level: 'danger',
                title: _.get(error.response, 'data.errors[0].title') || this.$i18n.t('error.failed'),
              });
              this.onFail();
            });

            /*
          this.$store.dispatch('site/getUploadSetting').then((result) => {
            formData.append('policy', result.data.data.policy);
            formData.append('signature', result.data.data.signature);
            formData.append('AWSAccessKeyId', result.data.data.access_key);
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
              */
          });
        }
      }
      this.$emit('drop', formData, files);
      // this.$root.$emit('drop', formData, files);
    },
    onFail() {
      // clearInterval(this.pollInterval);
      this.$store.dispatch('site/setLoadingProgress', {
        status: false,
        message: this.$t('search.analyze_done'),
        progress: 0,
      });
    },
    onAnalyzeSuccess(data, originalFilename) {
      // check if status is completed, if it is stop polling
      // clearInterval(this.pollInterval);
      // console.info('site/getUploadAnalyze : succeeded clearInterval');

      // set progress bar OFF
      this.$store.dispatch('site/setLoadingProgress', {
        status: false,
        message: this.$t('search.analyze_done'),
        progress: 0,
      });

      // const currentMediaType = this.$store.getters['site/currentMediaType'];

      // if (currentMediaType.id === 'music') {
      //   window.location.href = this.$siteUrl(`${currentMediaType.id}?similar=${encodeURI(response.data.data.externalTrackID)}-${params.filename}`).search().url();
      // } else {
      //   window.location.href = this.$siteUrl(`${currentMediaType.id}?sort=match&page=1&similar=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Ftemp-motionelements%2F${encodeURI(response.data.data.file_path)}`).search().url();
      // }

      // const mediaType = this.currentMediaType;
      // const currentMediaType = this.mediatype;

      // convert s3 url

      // update route
      const query = {
        ...this.$route.query,
        // page: 1,
      };

      if (this.isAudio) {
        query.similar = `${data.externalTrackId}-${originalFilename}`;

        // window.location.href = this.$siteUrl(`${currentMediaType}?similar=${encodeURI(response.data.data.externalTrackID)}-${params.filename}`).search().url();
        // window.location.href = this.$link(`/search/${mediaType}`).param('similar', `${data.externalTrackId}-${originalFilename}`).url();
        // console.log('REDIRECT', this.$link(`/search/${currentMediaType}`).param('similar', `${response.data.data.externalTrackID}-${params.filename}`).url());
      } else {
        query.similar = data.url;
        // window.location.href = this.$link(`/search/${currentMediaType}`).param('sort', 'match').param('similar', `https://s3-us-west-2.amazonaws.com/temp-motionelements%2F${encodeURI(response.data.data.filePath)}`).url();
        // window.location.href = this.$link(`/search/${mediaType}`).param('sort', 'match').param('similar', data.url).url();
      }

      // set page 1
      delete query.page;

      // query.similar = filter.similar;

      this.$router.push({
        query: query,
      });
    },
    analyzeFile(params) {
      this.$store.dispatch('site/setLoadingProgress', {
        status: true,
        message: _.sample(this.pollingMessages),
        progress: 0,
      });

      // this.$store.dispatch('site/getUploadAnalyze', params).then((response) => {
      return searchApi[this.isAudio ? 'analyzeAuralFeature' : 'analyzeVisualFeature'](params);
    },
    pollJobStatus(jobId, params) {
      // return this.$store.dispatch('artistElementEdit/getJobStatus', jobId)
      getJobStatus(jobId).then((response) => {
        const data = response.data.data;
        /*
        this.status = data.status;
        this.jobProgress = data.progress.percent;
        if (data.progress.percent === 100) {
          // notificationService.alert({
          //   level: 'success',
          //   title: 'File uploaded',
          // });
          setTimeout(() => {
            this.jobProgress = 0;
          }, 500);
        }
         */
        return data.status;
      })
        .then((status) => {
          console.log('got status', status);
          // status: pending, running, done, failed
          this.$emit('status-update', status);

          switch (status) {
            case 'done':
              console.log('DONE', params);
              // get result
              searchApi[this.isAudio ? 'getAnalyzeAuralFeatureResult' : 'getAnalyzeVisualFeatureResult'](params).then((response) => {
                console.log('DONE response', response);
                const data = response.data.data;
                // check if status is completed, if it is stop polling
                if (data.status === 'succeeded') {
                  // clearInterval(this.pollInterval);
                  this.onAnalyzeSuccess(data, params.originalFilename);
                } else {
                  console.log('ERROR?');
                }
              });

              break;
            case 'failed':
              this.onFail();
              break;
            case 'pending':
            case 'running':
            default:
              this.pollJobStatus(jobId, params);
              break;
          }
        });
    },
    pollUploadAnalyze(params) {
      this.$store.dispatch('site/setLoadingProgress', {
        status: true,
        message: _.sample(this.pollingMessages),
        progress: 0,
      });

      this.$store.dispatch('site/getUploadAnalyze', params).then((response) => {
        console.info('site/getUploadAnalyze', response.data.data.status);
        // console.log(response)

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

          // console.log(params);

          // update to vuex
          const filter = this.filters;
          // filter.searchKeyword = '';
          // filter.page = 1;

          // const searchBar = this.$store.getters['search/searchBar'];
          // searchBar.inputKeyword = '';

          const filterBar = this.$store.getters['search/allSearchFilterBar'];
          filterBar.similar.status = true;
          filterBar.similar.imageFilename = '';

          if (this.isAudio) {
            const audioTrackID = response.data.data.externalTrackID;
            const uploadFileName = params.filename;
            const similarAudio = `${audioTrackID}-${uploadFileName}`;

            filter.similar = similarAudio;
            filterBar.similar.imageUrl = ''; // audio no image to show
          } else {
            const imageUrl = process.env.VUE_APP_AWS_S3_IMAGE_UPLOAD_URL;
            const imagePath = response.data.data.file_path;
            const similarImage = imageUrl + imagePath;

            filter.similar = similarImage;
            filterBar.similar.imageUrl = similarImage;
          }
          this.$store.dispatch('search/setKeyword', '');
          this.$store.dispatch('search/setFilter', filter);
          this.$store.dispatch('search/setFilterBar', filterBar);
          // this.$store.dispatch('search/setSearchBar', searchBar);

          // this.search();
          // this.$root.$emit('doSearch', filter);
          console.info('member/getUploadAnalyze : image url - ', filter.similar);
          console.info('member/getUploadAnalyze : filter - ', filter);

          // update route
          const query = {
            ...this.$route.query,
            // page: 1,
          };

          // set page 1
          delete query.page;

          query.similar = filter.similar;

          this.$router.push({
            query: query,
          });
        }
      });
    },
  },
};
