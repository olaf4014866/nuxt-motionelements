<template>
  <div id="page-meta-schema"></div>
</template>
<script>

export default {
  name: 'base-page-meta-schema',
  props: {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    robots: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    breadcrumbs: {
      type: Array,
      required: false,
    },
    meta: {
      type: Array,
      default: () => [],
    },
  },
  metaInfo() {
    const meta = [
      { vmid: 'robots', name: 'robots', content: this.robots || 'noindex, nofollow' },
      { vmid: 'twitter:url', name: 'twitter:url', content: this.canonicalUrl },
      { vmid: 'og:lang', property: 'og:lang', content: this.ogLang },
      { vmid: 'og:url', property: 'og:url', content: this.canonicalUrl },
      { vmid: 'og:image', property: 'og:image', content: this.ogImage },
    ];

    if (this.title) {
      meta.push(
        { vmid: 'twitter:title', name: 'twitter:title', content: this.title },
      );
      meta.push(
        { vmid: 'og:title', property: 'og:title', content: this.title },
      );
    }

    if (this.description) {
      meta.push(
        { vmid: 'twitter:description', name: 'twitter:description', content: this.description },
      );
      meta.push(
        { vmid: 'og:description', property: 'og:description', content: this.description },
      );
    }

    if (this.meta.length) {
      meta.concat(this.meta);
    }
    return {
      // set `undefined` to use parent title, https://vue-meta.nuxtjs.org/guide/special.html#use-child-property-conditionally
      title: this.title || undefined,
      // set `undefined` to use parent description
      description: this.description || undefined,
      // titleTemplate: '%s | MotionElements',
      link: this.getPageHrefLangLink(),
      meta: meta,
      script: this.getPageSchema(),
    };
  },
  computed: {
    ogImage() {
      return this.getImgixOgImageUrl(this.image || 'https://static.moele.me/img/MotionElements-logo-og-white.190911.jpg');
    },
    ogLang() {
      switch (this.$i18n.locale) {
        case 'zh-hant':
          return 'zh_TW';
        case 'ja':
          return 'ja_JP';
        case 'es':
          return 'es_ES';
        case 'th':
          return 'th_TH';
        case 'ko':
          return 'ko_KR';
        case 'de':
          return 'de_DE';
        case 'fr':
          return 'fr_FR';
        case 'pt':
          return 'pt_PT';
        case 'hu':
          return 'hu_HU';
        case 'it':
          return 'it_IT';
        case 'ru':
          return 'ru_RU';
        case 'tr':
          return 'tr_TR';
        default:
          return 'en_US';
      }
    },
    ogImageLang() {
      switch (this.$i18n.locale) {
        case 'ja':
        case 'ko':
        case 'zh-hant':
          return this.$i18n.locale;
        default:
          return 'en';
      }
    },
    normalizedPath() {
      return this.$link(this.$route.path, 'en').fullPath();
    },
    canonicalUrl() {
      // const path = this.normalizedPath;
      const path = this.$route.path;
      return `https://www.motionelements.com${path}`;
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
    getImgixOgImageUrl(imageUrl) {
      // ?auto=format&fit=crop&w=1200&h=630'
      const url = new URL(imageUrl);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('w', 1200);
      url.searchParams.set('h', 630);
      return (
        `https://${
          url.hostname
        }${url.pathname
        }${url.search
        }`
      );
    },
    getPageSchema() {
      const scripts = [];

      if (this.$route.name === 'home' && this.$schema.company) {
        scripts.push(this.$schema.company);
      }

      if (this.breadcrumbJsonLd) {
        scripts.push(this.breadcrumbJsonLd);
      }

      // if (this.videoJsonLd) {
      //   scripts.push(this.videoJsonLd);
      // }

      return scripts;
    },
    // getOgImageLang() {
    //   switch (this.$i18n.locale) {
    //     case 'ja':
    //     case 'ko':
    //     case 'zh-hant':
    //       return this.$i18n.locale;
    //     default:
    //       return 'en';
    //   }
    // },
    getPageHrefLangLink() {
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
    },
  },
};
</script>
