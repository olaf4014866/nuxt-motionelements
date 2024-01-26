<template>
  <div id="page-meta-schema"></div>
</template>
<script>
import { stripHtml, truncateString } from '@motionelements/core/src/helpers/string.js';

import { fromUnixTime, formatISO } from 'date-fns';
// import { isProductType } from '@/services/catalog.service.js';

export default {
  name: 'base-page-meta-schema',
  props: {
    breadcrumbs: {
      type: Array,
      required: false,
    },
    product: {
      type: Object,
      required: true,
    },
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
      // { vmid: 'description', name: 'description', content: this.getPageMeta('description') },
      { vmid: 'twitter:title', name: 'twitter:title', content: this.getPageMeta('title') },
      { vmid: 'twitter:description', name: 'twitter:description', content: this.getPageMeta('description') },
      { vmid: 'twitter:url', name: 'twitter:url', content: this.canonicalUrl },
      { vmid: 'og:title', property: 'og:title', content: this.getPageMeta('title') },
      { vmid: 'og:lang', property: 'og:lang', content: this.$schema.getOgLang() },
      { vmid: 'og:url', property: 'og:url', content: this.canonicalUrl },
      { vmid: 'og:image', property: 'og:image', content: this.ogImage },
      { vmid: 'og:description', property: 'og:description', content: this.getPageMeta('description') },
      // { vmid: 'robots', name: 'robots', content: process.env.VUE_APP_NOINDEX === 'true' ? 'noindex, nofollow' : 'index, follow' },
    ];
    if (this.meta.length) {
      scopeMeta.concat(this.meta);
    }
    return {
      // titleTemplate: '%s | MotionElements',
      // title: this.getPageMeta('title'),
      link: this.getPageLangLink(),
      meta: scopeMeta,
      script: this.getPageSchema(),
    };
  },
  computed: {
    isElement() {
      return this.product.object === 'element';
    },
    isCollection() {
      return this.product.object === 'collection';
    },
    mediaType() {
      if (this.isCollection) {
        return null;
      }

      return _.get(this.product, 'mediaType');
    },
    ogImage() {
      return this.$route.name.match('free') ? `https://static.moele.me/img/free/free-elements-og-${this.getOgImageLang()}.191014.jpg` : 'https://static.moele.me/img/MotionElements-logo-og-white.190911.jpg';
    },
    normalizedPath() {
      return this.$link(this.$route.path, 'en').fullPath();
    },
    canonicalUrl() {
      // const path = this.normalizedPath;
      const path = this.$route.path;
      return `https://www.motionelements.com${path}`;
    },
    videoJsonLd() {
      try {
        const videoUrl = _.get(this.product, 'previews.mp4.url');
        const sku = this.product.id;
        const name = _.get(this.product, 'html.title') || this.product.name;
        const description = _.get(this.product, 'html.description') || _.get(this.product, 'description') || name;
        const duration = _.get(this.product, 'mediaTypeDetails.duration');
        const uploadDate = _.get(this.product, 'publishedAt');

        if (videoUrl && name) {
          const jsonLd = {
            '@context': 'http://schema.org',
            '@type': 'VideoObject',
            'name': truncateString(name, 80, ''), // $element->getSeoTitle(80, LANGUAGE_CODE),
            'description': stripHtml(description),
            'thumbnailUrl': _.get(this.product, 'thumbnails.jpg.url'), // $stillUrl,
            'publisher': {
              '@type': 'Organization',
              'name': 'MotionElements',
              'url': 'https://www.motionelements.com',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://static.moele.me/img/logo/MotionElements-logo-logomark-circle.png?fit=fill&fill=solid&w=600&h=60',
                // 'url': 'https://static.moele.me/img/me-logo-amp-600x60.png',
                'width': 600,
                'height': 60,
              },
            },
            'contentUrl': videoUrl,
            'embedUrl': `https://www.motionelements.com/embed/c/${sku}`,
            //  "interactionCount": "2347"
          };

          if (uploadDate) {
            // console.log('DATE', uploadDate, fromUnixTime(uploadDate));
            jsonLd.uploadDate = formatISO(fromUnixTime(uploadDate)); // $date->toISO8601String(),
          }

          if (duration) {
            jsonLd.duration = this.$tools.secondToIso8601Duration(duration);
          }

          return {
            type: 'application/ld+json',
            json: jsonLd,
          };
        }
      } catch (e) {
        console.error(e);
        // eat error
      }
      return null;
    },
    imageJsonLd() {
      // image not indexed yet
      return null;

      /*
      if (!isProductType('image', this.mediaType)) {
        return null;
      }

      try {
        const imageUrl = _.get(this.product, 'previews.jpg.url');
        const sku = this.product.id;
        const name = _.get(this.product, 'html.title') || this.product.name;
        const description = _.get(this.product, 'html.description') || _.get(this.product, 'description') || name;
        const uploadDate = _.get(this.product, 'publishedAt');
        const productUrl = _.get(this.product, 'html.url');

        if (imageUrl && name) {
          const jsonLd = {
            '@context': 'http://schema.org',
            '@type': 'ImageObject',
            'name': truncateString(name, 80, ''), // $element->getSeoTitle(80, LANGUAGE_CODE),
            'description': stripHtml(description),
            'thumbnailUrl': _.get(this.product, 'thumbnails.jpg.url'), // $stillUrl,
            'publisher': {
              '@type': 'Organization',
              'name': 'MotionElements',
              'url': 'https://www.motionelements.com',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://static.moele.me/img/logo/MotionElements-logo-logomark-circle.png?fit=fill&fill=solid&w=600&h=60',
                // 'url': 'https://static.moele.me/img/me-logo-amp-600x60.png',
                'width': 600,
                'height': 60,
              },
            },
            'contentUrl': productUrl,
            // https://developers.google.com/search/docs/data-types/image-license-metadata
            'license': 'https://www.motionelements.com/legal/license',
            'acquireLicensePage': productUrl,
            'embedUrl': `https://www.motionelements.com/embed/c/${sku}`,
            //  "interactionCount": "2347"
          };

          if (uploadDate) {
            // console.log('DATE', uploadDate, fromUnixTime(uploadDate));
            jsonLd.uploadDate = formatISO(fromUnixTime(uploadDate)); // $date->toISO8601String(),
          }

          return {
            type: 'application/ld+json',
            json: jsonLd,
          };
        }
      } catch (e) {
        console.error(e);
        // eat error
      }
      return null;
       */
    },
    breadcrumbJsonLd() {
      if (!_.size(this.breadcrumbs)) {
        return null;
      }

      const list = [];

      let position = 1;

      this.breadcrumbs.forEach((item) => {
        list.push({
          '@type': 'ListItem',
          'position': position,
          'item':
              {
                '@id': this.$link(item.link).url(),
                // use nameSeo if exists for SEO
                'name': _.get(item, 'nameSeo', item.name),
              },
        });

        position += 1;
      });

      return {
        type: 'application/ld+json',
        json: {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': list,
        },
      };
    },
  },
  methods: {
    getPageSchema() {
      const scripts = [];

      if (this.$route.name === 'home' && this.$schema.company) {
        scripts.push(this.$schema.company);
      }

      if (this.breadcrumbJsonLd) {
        scripts.push(this.breadcrumbJsonLd);
      }

      if (this.videoJsonLd) {
        scripts.push(this.videoJsonLd);
      }

      if (this.imageJsonLd) {
        scripts.push(this.imageJsonLd);
      }


      return scripts;
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
        case 'ko':
        case 'zh-hant':
          return this.$i18n.locale;
        default:
          return 'en';
      }
    },
    getPageLangLink() {
      // if (this.$route.name.match('home')) {
      //   return [
      //     { rel: 'canonical', href: `https://www.motionelements.com/${this.$i18n.locale === 'en' ? '' : `${this.$i18n.locale}/`}` },
      //     { rel: 'alternate', hreflang: 'x-default', href: 'https://www.motionelements.com/' },
      //     { rel: 'alternate', hreflang: 'en', href: 'https://www.motionelements.com/' },
      //     { rel: 'alternate', hreflang: 'ja', href: 'https://www.motionelements.com/ja/' },
      //     { rel: 'alternate', hreflang: 'ko', href: 'https://www.motionelements.com/ko/' },
      //     { rel: 'alternate', hreflang: 'zh-hant', href: 'https://www.motionelements.com/zh-hant/' },
      //     { rel: 'alternate', hreflang: 'th', href: 'https://www.motionelements.com/th/' },
      //     { rel: 'alternate', hreflang: 'de', href: 'https://www.motionelements.com/de/' },
      //     { rel: 'alternate', hreflang: 'es', href: 'https://www.motionelements.com/es/' },
      //     { rel: 'alternate', hreflang: 'fr', href: 'https://www.motionelements.com/fr/' },
      //     { rel: 'alternate', hreflang: 'pt', href: 'https://www.motionelements.com/pt/' },
      //   ];
      // }

      // languageCodes without en
      const languageCodes = [
        'ja', 'ko', 'zh-hant', 'th', 'de', 'es', 'fr', 'pt',
        'hu', 'it', 'ru', 'tr',
      ];

      const path = this.normalizedPath;

      const data = [
        { rel: 'canonical', href: this.canonicalUrl },
        { rel: 'alternate', hreflang: 'x-default', href: `https://www.motionelements.com${path}` },
        { rel: 'alternate', hreflang: 'en', href: `https://www.motionelements.com${path}` },
      ];

      languageCodes.forEach((languageCode) => {
        // convert to hrefLang code
        const hrefLanguageCode = languageCode === 'zh-hant' ? 'zh-Hant-TW' : languageCode;

        data.push({
          rel: 'alternate', hreflang: hrefLanguageCode, href: `https://www.motionelements.com/${languageCode}${path}`,
        });
      });
      return data;

      // // if (this.$route.name.match('dlp') || this.$route.name.match('category') || this.$route.name.match('artists')) {
      // if (['dlp', 'category', 'artists', 'other'].indexOf(this.mediatype) > -1) {
      //   const path = this.$i18n.locale !== 'en' ? this.$route.path.replace(`/${this.$i18n.locale}`, '') : this.$route.path;
      //   return this.$schema.getHrefLang(path, this.$i18n.locale);
      // }
      // return this.$schema.getHrefLang(this.$route.name, this.$i18n.locale);
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
