<template>
  <div id="page-meta-schema"></div>
</template>
<script>
export default {
  name: 'page-meta-schema',
  props: {
    mediatype: String,
  },
  metaInfo() {
    return {
      // titleTemplate: '%s | MotionElements',
      title: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).title,
      meta: [
        { name: 'description', content: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).description },
        { name: 'twitter:title', content: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).title },
        { name: 'twitter:description', content: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).description },
        { name: 'twitter:url', content: this.$schema.getCanonicalUrl(this.$route.name, this.$i18n.locale) },
        { name: 'og:title', content: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).title },
        { name: 'og:lang', content: this.$schema.getOgLang() },
        { name: 'og:url', content: this.$schema.getCanonicalUrl(this.$route.name, this.$i18n.locale) },
        { name: 'og:description', content: this.$schema.getPageByLang(this.$route.name, this.$i18n.locale).description },
        { name: 'robots', content: process.env.VUE_APP_NOINDEX === 'true' ? 'noindex, nofollow' : 'index, follow' },
      ],
      link: this.$route.name.match('home') ? this.getPageLangLink() : this.$schema.getHrefLang(this.$route.name, this.$i18n.locale),
      script: this.$route.name.match('home') ? [this.$schema.company] : [this.getBreadcrumbJsonLd(this.$route.path, this.mediatype), this.$schema.getPageSearchSchema(this.$route.name, this.$i18n.locale)],
    };
  },
  methods: {
    getPageLangLink() {
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
      ];
    },
    getBreadcrumbJsonLd() {
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
                  'name': this.getPageName(),
                },
            },
          ],
        },
      };
    },
    getPageName() {
      if (this.mediatype.match('free')) {
        return this.$term('mediaType', this.mediatype).text();
      }
      return this.$t(`header.${this.mediatype.replace('_template', '')}`);
    },
  },
};
</script>
