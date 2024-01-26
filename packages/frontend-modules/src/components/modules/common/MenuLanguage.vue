<template>
  <select
    @change="changeLanguage($event)"
    :class="{ 'custom-select-sm' : isFooter }"
    class="custom-select language-select"
    name="language"
    id="language"
  >
    <option
      v-for="(language, key) in supportedLanguages"
      :selected="key == currentLanguage"
      :key="key"
      :value="key"
    >{{ language }}</option>
  </select>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'main-menu-language',
  props: {
    menu: {},
  },
  computed: {
    ...mapState({
      currentLanguage: state => state.site.currentLanguage,
      supportedLanguages: state => state.site.supportedLanguages,
      isLogin: state => state.member.isLogin,
    }),
    isFooter() {
      return this.menu === 'footer' ? true : false;
    },
  },
  methods: {
    changeLanguage(event) {
      const lang = event.target.value;
      // this.$store.dispatch('site/setCurrentLanguage', lang);
      this.$cookies.set('ME_lang', lang, { domain: '.motionelements.com', secure: true });
      // this.$cookies.set('ME_lang', lang, { domain: '.motionelements.com' });

      const html = document.documentElement;
      html.setAttribute('lang', lang);

      let path = this.$route.path.replace(this.$i18n.locale, lang);

      if (!this.$route.path.length) {
        return;
      }

      let isSearch = this.$route.path.match('search') ? true : false;
      let isApp = this.$route.path.match(/favorites|history/) ? true : false;
      let isArtist = this.$route.path.match('artist') ? true : false;
      let isPage = false;

      if (process.env.VUE_APP_PROJECT_NAME === 'frontend-page') {
        isPage = true;
        isArtist = false;
        isSearch = false;
        isApp = false;
      }

      if(!isSearch && !isApp && !isArtist) {
        console.log('is frontend-page site');

        if (this.$i18n.locale === 'en') {
          path = `${lang}${this.$route.path}`;
          if (this.$route.name.match('home')) {
            path = `/${lang}`;
          }
        }
        if (lang === 'en') {
          path = path.replace('/en', '');
        }
      }

      console.log('changeLanguage : ', path);

      if (this.isLogin) {
        const formData = new FormData();
        formData.append('language', lang);

        this.$store.dispatch('member/doChangeMemberSetting', formData)
          .then((response) => {
            console.log('update member lang', response.data);
            return response;
          })
          .then(() => {
            this.$store.dispatch('member/getMember').then((result) => {
              this.$root.$emit('updateGoogleTagManager', result.data.data);
            });
            window.location.pathname = path;
          });
        return;
      }
      window.location.pathname = path;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
