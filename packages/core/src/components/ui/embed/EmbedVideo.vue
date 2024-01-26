<template>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      :src="embedUrl"
      class="embed-responsive-item"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'artist-video-embed',
  components: {
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    allowFullscreen: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    closedCaptionsLanguage: {
      type: String,
    },
  },
  // data() {
  // },
  computed: {
    embedUrl() {
      const url = this.url;

      if (!url) {
        return null;
      }

      try {
        const urlObj = new URL(url);

        let type;
        let videoId;

        switch (urlObj.hostname) {
          case 'www.youtube.com':
            if (urlObj.pathname === '/watch') {
              type = 'youtube';
              videoId = urlObj.searchParams.get('v');
            }
            break;

          case 'youtu.be':
            type = 'youtube';
            // remove starting '/'
            videoId = urlObj.pathname.slice(1);
            break;

          case 'vimeo.com':
            type = 'vimeo';
            videoId = parseInt(urlObj.pathname.slice(1), 10);
            if (videoId > 0) {
              videoId = videoId.toString();
            }
            break;

          default:
            return null;
        }

        if (!videoId) {
          return null;
        }

        if (type === 'youtube') {
          // https://developers.google.com/youtube/player_parameters

          const params = new URLSearchParams('controls=0&modestbranding=1&rel=0');

          params.set('autoplay', this.autoplay ? 1 : 0);

          if (this.$i18n.locale) {
            params.set('hl', this.toYouTubeLocale(this.$i18n.locale));
          }

          if (this.closedCaptionsLanguage) {
            params.set('cc_lang_pref', this.closedCaptionsLanguage);
            params.set('cc_load_policy', 1);
          }

          return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
        }
        if (type === 'vimeo') {
          // https://vimeo.zendesk.com/hc/en-us/articles/360001494447-Using-Player-Parameters

          const params = new URLSearchParams();

          params.set('autoplay', this.autoplay ? 1 : 0);

          return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
        }
      } catch (e) {
        console.error(e);
      }

      return null;
    },
  },
  methods: {
    toYouTubeLocale(locale) {
      switch (locale) {
        case 'zh-hant':
          return 'zh-Hant';
        case 'zh-hans':
          return 'zh-Hands';
        default:
          return locale;
      }
    },
  },
};
</script>
