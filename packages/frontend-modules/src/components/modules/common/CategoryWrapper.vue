<template>
  <div class="d-flex flex-row justify-content-center flex-wrap">
    <CategoryButton
      v-for="category in data"
      :key="`category-${category.id}`"
      :category="category"
      :categoriesEN="categoriesEN"
    ></CategoryButton>
  </div>
</template>

<script>
import terms from '@/terms/index.js';

export default {
  name: 'CategoryWrapper',
  props: {
    mediatype: String,
  },
  components: {
    CategoryButton: () => import('@/components/modules/common/CategoryButton.vue'),
  },
  data() {
    return {
      data: [],
      categoriesEN: [],
    };
  },
  mounted() {
    const lang = this.$i18n.locale;

    const categoriesAE = [
      {
        id: '199',
        icon: 'slideshow',
        name: this.$t('channel_ae.category_slideshow'),
        url: '?cat=199',
      },
      {
        id: '204',
        icon: 'text',
        name: this.$t('channel_ae.category_text'),
        url: '?cat=204',
      },
      {
        id: '15',
        icon: 'broadcast',
        name: this.$t('channel_ae.category_broadcast'),
        url: '?cat=15',
      },
      {
        id: '192',
        icon: 'logo',
        name: this.$t('channel_ae.category_logo'),
        url: '?cat=192',
      },
      {
        id: '388',
        icon: 'transition',
        name: this.$t('channel_ae.category_transition'),
        url: '?cat=388',
      },
      {
        id: '5',
        icon: 'design-elements',
        name: this.$t('channel_ae.category_design_element'),
        url: '?cat=5',
      },
      {
        id: '215',
        icon: 'wedding',
        name: this.$t('channel_ae.category_wedding'),
        url: '?cat=215',
      },
      {
        id: '399',
        icon: 'vertical',
        name: this.$t('channel_ae.category_vertical'),
        url: '?cat=399',
      },
    ];
    const categoriesVideo = [
      {
        id: '30',
        name: this.$t('channel_video.category_corporate_video'),
        icon: 'corporate',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=30`,
      },
      {
        id: '49,40,20,329',
        name: this.$t('channel_video.category_events'),
        icon: 'event',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=49`,
      },
      {
        id: '64',
        name: this.$t('channel_video.category_green_screen_alpha'),
        icon: 'green-screen',
        url: `${this.$siteUrl(this.mediatype).search().url()}?type=64`,
      },
      {
        id: 'animation',
        name: this.$t('channel_video.category_video_backgrounds'),
        icon: 'background',
        url: `${this.$siteUrl(this.mediatype).search().url()}?type=38`,
      },
      {
        id: '37,88,62,46',
        name: this.$t('channel_video.category_b_roll'),
        icon: 'b-roll',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=37,88,62,46`,
      },
      {
        id: '34',
        name: this.$t('channel_video.category_nature'),
        icon: 'nature',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=34`,
      },
      {
        id: '35',
        name: this.$t('channel_video.category_people'),
        icon: 'people',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=35`,
      },
      {
        id: 'aerial, vr, slow motion, vertical',
        name: this.$t('channel_video.category_trending'),
        icon: 'trending',
        url: `${this.$siteUrl(this.mediatype).search().url()}&s=aerial,%20vr,%20slow%20motion,%20vertical`,

      },
    ];
    const categoriesAnimation = [
      {
        id: '176',
        name: 'VJ Loops',
        icon: 'vj-loop',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=176`,
      },
      {
        id: '328',
        name: 'VFX ・ Particles',
        icon: 'vfx',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=328`,
      },
      {
        id: '0',
        name: 'Infographics',
        icon: 'infographics-chart',
        url: `${this.$siteUrl(this.mediatype).search().url()}?s=infographics`,
      },
      {
        id: '30',
        name: this.$t('channel_video.category_corporate_video'),
        icon: 'corporate',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=30`,
      },
      {
        id: '49,40,20,329',
        name: this.$t('channel_video.category_events'),
        icon: 'event',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=49`,
      },
      {
        id: '64',
        name: this.$t('channel_video.category_green_screen_alpha'),
        icon: 'green-screen',
        url: `${this.$siteUrl(this.mediatype).search().url()}?type=64`,
      },
      {
        id: 'animation',
        name: this.$t('channel_video.category_video_backgrounds'),
        icon: 'background',
        url: `${this.$siteUrl(this.mediatype).search().url()}?type=38`,
      },
      {
        id: '37,88,62,46',
        name: this.$t('channel_video.category_b_roll'),
        icon: 'b-roll',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=37,88,62,46`,
      },
      {
        id: '34',
        name: this.$t('channel_video.category_nature'),
        icon: 'nature',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=34`,
      },
      {
        id: '35',
        name: this.$t('channel_video.category_people'),
        icon: 'people',
        url: `${this.$siteUrl(this.mediatype).search().url()}?cat=35`,
      },
      {
        id: 'aerial, vr, slow motion, vertical',
        name: this.$t('channel_video.category_trending'),
        icon: 'trending',
        url: `${this.$siteUrl(this.mediatype).search().url()}&s=aerial,%20vr,%20slow%20motion,%20vertical`,

      },
    ];

    switch (this.mediatype) {
      case 'pr':
        this.data = terms.pr[lang].categories;
        this.categoriesEN = Object.freeze(terms.icon.categories);
        // this.categoriesEN = Object.freeze(terms.pr.en.categories);
        break;
      case 'motion':
        this.data = terms.motion[lang].categories;
        this.categoriesEN = Object.freeze(terms.icon.categories);
        // this.categoriesEN = Object.freeze(terms.motion.en.categories);
        break;
      case 'video':
      // case 'animation':
        // this.data = terms.video[lang].categories;
        this.data = categoriesVideo;
        this.categoriesEN = categoriesVideo;
        // this.categoriesEN = Object.freeze(terms.video.en.categories);
        break;
        // this.data = terms.video[lang].categories;
        // this.data = categoriesAnimation;
        // this.categoriesEN = categoriesAnimation;
        // break;
      case 'animation':
        this.data = categoriesAnimation;
        this.categoriesEN = categoriesAnimation;
        break;
      case 'ae':
        this.data = categoriesAE;
        this.categoriesEN = categoriesAE;
        break;
      default:
        // console.log('default: ', this.mediatype);
        this.data = this.categoriesVideo;
        this.categoriesEN = this.categoriesVideo;
        break;
    }
  },
};
</script>
