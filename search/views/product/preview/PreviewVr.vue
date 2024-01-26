<template>
  <div class="container-fluid pb-5">
    <div class="d-flex justify-content-center align-items-center position-relative">

      <div class="preview-wrapper-vr rounded overflow-hidden">
        <template v-if="isVideoVr">
          <video id="panorama-video" class="video-js vjs-default-skin vjs-big-play-centered"
                 controls preload="none" style="width:100%;height:100%;"
                 :poster="element.previews.jpg.url" crossorigin="anonymous">
            <source :src="element.previews.webm.url" type="video/webm"/>
            <source :src="element.previews.mp4.url" type="video/mp4"/>
            <p class="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to
              a web browser that <a href="http://videojs.com/html5-，video-support/"
                                    target="_blank">supports HTML5 video</a>
            </p>
          </video>
        </template>

        <template v-else-if="isPhotoVr">
          <div id="panorama-photo"></div>
        </template>

      </div>
    </div>

  </div>
</template>

<script>
import videojs from 'video.js';
// eslint-disable-next-line no-unused-vars
import pannellum from 'pannellum';
import '@/helpers/videojs-pannellum-plugin.js';

export default {
  name: 'large-preview-vr',
  components: {
  },
  props: {
    element: Object,
  },
  mounted() {
    if (this.isVideoVr && !this.isIE) {
      videojs('panorama-video', {
        plugins: {
          pannellum: {
            autoLoad: true,
            type: 'equirectangular',
          },
        },
      });
    } else if (this.isVideoVr && this.isIE) {
      videojs('panorama-video');
    } else if (this.isPhotoVr) {
      // console.log('is photo vr', pannellum);
      // console.log('is photo vr', window.pannellum);
      window.pannellum.viewer('panorama-photo', {
        autoLoad: true,
        type: 'equirectangular',
        panorama: this.element.previews.jpg.url,
      });
    }
  },
  computed: {
    isIE() {
      var ua = navigator.userAgent;
      // MSIE used to detect old browsers and Trident used to newer ones
      return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
    },
    isVideoVr() {
      return this.element.mediaType.replace('-', '_') === 'video_vr';
    },
    isPhotoVr() {
      return this.element.mediaType.replace('-', '_') === 'photo_vr';
    },
  },
};
</script>

<style>
  @import 'https://static.motionelements.com/js/videojs/7.6.6/video-js.min.css';
  @import 'https://static.motionelements.com/js/pannellum/2.5.4/pannellum.css';
</style>
<style lang="scss" scoped>
  .preview-wrapper {
    width: 100%;
    @include media-breakpoint-up(xxl) {
      width: 60rem;
    }
    @include media-breakpoint-between(lg,xl) {
      width: 45rem;
    }
  }

  .preview-wrapper-vr {
    width: 100%;
    height: 50vh;
    min-height: 540px;
  }
</style>
