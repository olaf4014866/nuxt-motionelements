<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="i18n-dropdown"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fas fa-fw fa-lg me-bmt icon-globe-asia"></i>
      {{supportedLanguages[currentLanguage]}}
    </a>
    <ul class="dropdown-menu dropdown-menu-right" id="i18n-list">
      <a
        v-for="(language, key) in supportedLanguages"
        :key="key"
        :value="key"
        @click="onChangeLanguage(key)"
        class="dropdown-item i18n"
        :data-language="key"
        rel="nofollow"
      >{{ language }}</a>
    </ul>
  </li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'main-menu-language-dropdown',
  props: {
  },
  computed: {
    ...mapState({
      currentLanguage: state => state.user.language,
      supportedLanguages: state => state.site.supportedLanguages,
    }),
  },
  methods: {
    onChangeLanguage(languageCode) {
      // toggle history to update path
      this.$store.dispatch('user/changeLanguage', languageCode);
      /*
      const validLanguageCodes = Object.keys(this.supportedLanguages);

      // remove language from path
      let path = this.$route.path.replace(new RegExp(`^/(${validLanguageCodes.join('|')})/`), '/');

      if (languageCode !== 'en') {
        path = `/${languageCode}${path}`;
      }

      window.location.pathname = path;
      // this.$router.replace({ path: path });
       */
    },
  },
};
</script>
