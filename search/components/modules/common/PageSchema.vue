<template>
  <div id="page-meta-schema"></div>
</template>
<script>
import { convertMediatypeShortToCode } from '@/tools/index.js';

export default {
  name: 'page-meta-schema',
  props: {
    mediatype: String,
    mediaTypeGroup: String,
    title: String,
    meta: {
      type: Array,
      default: () => [],
    },
    description: String,
  },
  metaInfo() {
    const scopeMeta = [
      { vmid: 'description', name: 'description', content: this.getPageMeta('description') },
      { vmid: 'twitter:title', name: 'twitter:title', content: this.getPageMeta('title') },
      { vmid: 'twitter:description', name: 'twitter:description', content: this.getPageMeta('description') },
      { vmid: 'twitter:url', name: 'twitter:url', content: this.getCanonicalUrl() },
      { vmid: 'og:title', property: 'og:title', content: this.getPageMeta('title') },
      { vmid: 'og:lang', property: 'og:lang', content: this.$schema.getOgLang() },
      { vmid: 'og:url', property: 'og:url', content: this.getCanonicalUrl() },
      { vmid: 'og:image', property: 'og:image', content: this.$route.name.match('free') ? `https://static.moele.me/img/free/free-elements-og-${this.getOgImageLang()}.191014.jpg` : 'https://static.moele.me/img/MotionElements-logo-og-white.190911.jpg' },
      { vmid: 'og:description', property: 'og:description', content: this.getPageMeta('description') },
      // { vmid: 'robots', name: 'robots', content: process.env.VUE_APP_NOINDEX === 'true' ? 'noindex, nofollow' : 'index, follow' },
    ];
    if (this.meta.length) {
      scopeMeta.concat(this.meta);
    }
    return {
      // titleTemplate: '%s | MotionElements',
      title: this.getPageMeta('title'),
      link: this.getPageLangLink(),
      meta: scopeMeta,
      script: this.getPageSchema(),
    };
  },
  methods: {
    getPageSchema() {
      // if (this.$route.name.match('home')) {
      if (['home', 'other'].indexOf(this.mediatype) > -1) {
        return [this.$schema.company];
      }
      // this.$route.name.match('dlp') || this.$route.name.match('category') || this.$route.name.match('product')
      if (['dlp', 'category', 'products'].indexOf(this.mediatype) > -1) {
        return [this.getDlpBreadcrumbJsonLd()];
      }
      if (this.$route.name.match('artists')) {
        return [this.getArtistBreadcrumbJsonLd()];
      }
      return [this.getBreadcrumbJsonLd(this.$route.path, this.mediatype), this.$schema.getPageSearchSchema(this.$route.name, this.$i18n.locale)];
    },
    getPageMeta(type) {
      if (this.mediatype && this.mediatype.match('free')) {
        if (type.match('title')) {
          return this.$t(`${this.mediatype}.page_title`);
        }
        if (type.match('description')) {
          return this.$t(`${this.mediatype}.meta_description`);
        }
      } else if (this.mediatype && ['dlp', 'product', 'artist', 'other'].indexOf(this.mediatype) > -1) {
        if (type.match('title')) {
          return this.title;
        }
        if (type.match('description')) {
          return this.description;
        }
      // } else if (this.mediatype && this.mediatype.match('dlp')) {
      //   if (type.match('title')) {
      //     return this.title;
      //   }
      //   if (type.match('description')) {
      //     return this.description;
      //   }
      // } else if (this.mediatype && this.mediatype.match('product')) {
      //   if (type.match('title')) {
      //     return this.title;
      //   }
      //   if (type.match('description')) {
      //     return this.description;
      //   }
      } else {
        if (type.match('title')) {
          return this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).title;
        }
        if (type.match('description')) {
          return this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).description;
        }
      }
    },
    getOgImageLang() {
      switch (this.$i18n.locale) {
        case 'ja':
          return 'ja';
        case 'ko':
          return 'ko';
        case 'zh-hant':
          return 'zh-hant';
        default:
          return 'en';
      }
    },
    getCanonicalUrl() {
      // if (this.$route.name.match('dlp') || this.$route.name.match('category') || this.$route.name.match('artists')) {
      if (['dlp', 'category', 'artists', 'other'].indexOf(this.mediatype) > -1) {
        const path = this.$i18n.locale !== 'en' ? this.$route.path.replace(`/${this.$i18n.locale}`, '') : this.$route.path;
        return this.$schema.getCanonicalUrl(path, this.$i18n.locale);
      }
      return this.$schema.getCanonicalUrl(this.$route.name, this.$i18n.locale);
    },
    getPageLangLink() {
      if (this.$route.name.match('home')) {
        return [
          { rel: 'canonical', href: `https://www.motionelements.com/${this.$i18n.locale === 'en' ? '' : `${this.$i18n.locale}/`}` },
          { rel: 'alternate', hreflang: 'x-default', href: 'https://www.motionelements.com/' },
          { rel: 'alternate', hreflang: 'en', href: 'https://www.motionelements.com/' },
          { rel: 'alternate', hreflang: 'ja', href: 'https://www.motionelements.com/ja/' },
          { rel: 'alternate', hreflang: 'ko', href: 'https://www.motionelements.com/ko/' },
          { rel: 'alternate', hreflang: 'zh-hant', href: 'https://www.motionelements.com/zh-hant/' },
          { rel: 'alternate', hreflang: 'th', href: 'https://www.motionelements.com/th/' },
          { rel: 'alternate', hreflang: 'de', href: 'https://www.motionelements.com/de/' },
          { rel: 'alternate', hreflang: 'es', href: 'https://www.motionelements.com/es/' },
          { rel: 'alternate', hreflang: 'fr', href: 'https://www.motionelements.com/fr/' },
          { rel: 'alternate', hreflang: 'pt', href: 'https://www.motionelements.com/pt/' },
        ];
      }
      // if (this.$route.name.match('dlp') || this.$route.name.match('category') || this.$route.name.match('artists')) {
      if (['dlp', 'category', 'artists', 'other'].indexOf(this.mediatype) > -1) {
        const path = this.$i18n.locale !== 'en' ? this.$route.path.replace(`/${this.$i18n.locale}`, '') : this.$route.path;
        return this.$schema.getHrefLang(path, this.$i18n.locale);
      }
      return this.$schema.getHrefLang(this.$route.name, this.$i18n.locale);
    },
    getBreadcrumbJsonLd() {
      if (this.mediatype.match('free')) {
        return this.getFreeBreadcrumbJsonLd();
      }
      return {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement':
          [
            {
              '@type': 'ListItem',
              'position': 1,
              'item':
                {
                  '@id': `${process.env.VUE_APP_SITE_URL}${this.$route.path}`,
                  'name': ['dlp', 'other'].indexOf(this.mediatype) > -1 ? this.title : this.getPageName(),
                },
            },
          ],
        },
      };
    },
    getFreeBreadcrumbJsonLd() {
      return {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement':
          [
            {
              '@type': 'ListItem',
              'position': 1,
              'item':
                {
                  '@id': this.$siteUrl(`/${this.getFreePageUpper(this.mediatype)}`).www().url(),
                  'name': this.$t(`header.${this.getFreePageUpper(this.mediatype)}`),
                },
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item':
                {
                  '@id': `${process.env.VUE_APP_SITE_URL}${this.$route.path}`,
                  'name': this.getPageName(),
                },
            },
          ],
        },
      };
    },
    getDlpBreadcrumbJsonLd() {
      const path = this.$i18n.locale !== 'en' ? this.$route.path.replace(`/${this.$i18n.locale}`, '') : this.$route.path;
      return {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement':
          [
            {
              '@type': 'ListItem',
              'position': 1,
              'item':
                {
                  '@id': this.$siteUrl(this.mediaTypeGroup).www().url(),
                  'name': this.$term('mediaType', convertMediatypeShortToCode(this.mediaTypeGroup.replace('-', '_'))).seo().html(),
                },
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item':
                {
                  '@id': this.$siteUrl(`${path}`).www().url(),
                  'name': this.title,
                },
            },
          ],
        },
      };
    },
    getArtistBreadcrumbJsonLd() {
      return {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement':
          [
            {
              '@type': 'ListItem',
              'position': 1,
              'item':
                {
                  '@id': this.$siteUrl('/artists').www().url(),
                  'name': 'Artists',
                },
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item':
                {
                  '@id': this.$siteUrl(`/artists/${this.title}`).www().url(),
                  'name': this.title,
                },
            },
          ],
        },
      };
    },
    getPageName() {
      if (this.mediatype && this.mediatype.match('free')) {
        return this.$t(`${this.mediatype}.page_title`);
        // return this.$term('mediaType', this.mediatype).text();
      }
      return this.$t(`header.${this.mediatype.replace('_template', '')}`);
    },
    getFreePageUpper(mt) {
      switch (mt) {
        case 'free_pr':
          return 'pr';
        case 'free_ae':
          return 'ae';
        case 'free_fcp':
          return 'motion';
        case 'free_video':
          return 'video';
        case 'free_gif':
          return 'image';
        case 'free_music':
          return 'music';
        case 'free_sfx':
          return 'sfx';
        default:
          return 'video';
      }
    },
  },
};
</script>
