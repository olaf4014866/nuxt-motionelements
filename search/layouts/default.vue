<template>
  <div>
    <AccountSidebar/>
    <NavBar/>
    <div>
      <Notification/>
      <BaseNotifications />
      <transition name="fade">
        <Nuxt keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
      </transition>
    </div>
    <ModalWrapper/>
    <Blocker v-if="showBlocker">
      <template v-slot:message>
        <p>{{ blockerMessage }}</p>
      </template>
    </Blocker>
    <Footer />
  </div>
</template>

<script>
/* import AccountSidebar from '@motionelements/core/src/components/TheAccountSidebar.vue';
import NavBar from '@motionelements/core/src/components/TheNavBar.vue';
import Footer from '@motionelements/core/src/components/TheFooter.vue';
// import ModalWrapper from '@motionelements/core/src/components/TheModalWrapper.vue';
import ModalWrapper from '@motionelements/core/src/components/TheRootModal.vue';

// import NavBar from 'frontend-modules/shared/NavBar.vue';
// import Footer from 'frontend-modules/shared/Footer.vue';
// import AccountSidebar from 'frontend-modules/shared/AccountSidebar.vue';

// import NavBar from '@/components/NavBar.vue';
// import Footer from '@/components/Footer.vue';
// import AccountSidebar from '@/components/AccountSidebar.vue';
import Notification from '@/components/modules/common/Notification.vue';
import Blocker from '@motionelements/core/src/components/ui/Blocker.vue'; */
// import { detectBrowser } from '@/services/app.service';
import { mapState } from 'vuex';

export default {
  name: 'root-page',
  components: {
    Footer:() => import('@motionelements/core/src/components/TheFooter.vue'),
    AccountSidebar:() => import('@motionelements/core/src/components/TheAccountSidebar.vue'),
    NavBar:() => import('@motionelements/core/src/components/TheNavBar.vue'),
    Notification:() => import('@/components/modules/common/Notification.vue'),
    ModalWrapper:() => import('@motionelements/core/src/components/TheRootModal.vue'),
    BaseNotifications: () => import('@motionelements/core/src/components/ui/BaseNotifications.vue'),
    // Blocker,
    Blocker: () => import('@motionelements/core/src/components/ui/Blocker.vue'),
  },
  computed: {
    ...mapState({
      showBlocker: state => state.blocker.show,
      blockerMessage: state => state.blocker.message,
    }),
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
  metaInfo() {
    // const scopeMeta = [
    //   { name: 'description', content: this.getPageMeta('description') },
    //   { name: 'twitter:title', content: this.getPageMeta('title') },
    //   { name: 'twitter:description', content: this.getPageMeta('description') },
    //   { name: 'twitter:url', content: this.getCanonicalUrl() },
    //   { property: 'og:title', content: this.getPageMeta('title') },
    //   { property: 'og:lang', content: this.$schema.getOgLang() },
    //   { property: 'og:url', content: this.getCanonicalUrl() },
    //   { property: 'og:image', content: this.$route.name.match('free') ? `https://static.moele.me/img/free/free-elements-og-${this.getOgImageLang()}.191014.jpg` : 'https://static.moele.me/img/MotionElements-logo-og-white.190911.jpg' },
    //   { property: 'og:description', content: this.getPageMeta('description') },
    //   { name: 'robots', content: process.env.VUE_APP_NOINDEX === 'true' ? 'noindex, nofollow' : 'index, follow' },
    // ];
    // if (this.meta.length) {
    //   scopeMeta.concat(this.meta);
    // }
    return {
      // titleTemplate: '%s | MotionElements',
      // title: this.getPageMeta('title'),
      // link: this.getPageLangLink(),
      meta: [
        { vmid: 'robots', name: 'robots', content: 'noindex, nofollow' },
      ],
      // script: this.getPageSchema(),
    };
  },
};
</script>

<style lang="scss">
@import "@motionelements/assets/src/scss/font-load/style-en";
@import "@motionelements/assets/src/scss/font-load/style-ja";
@import "@motionelements/assets/src/scss/font-load/style-ko";
@import "@motionelements/assets/src/scss/font-load/style-zh-hant";
@import "@motionelements/assets/src/scss/style-search.scss";

// @import "@/assets/scss/font-load/style-en";
// @import "@/assets/scss/font-load/style-ja";
// @import "@/assets/scss/font-load/style-ko";
// @import "@/assets/scss/font-load/style-zh-hant";
// @import "@/assets/scss/style-search.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.grecaptcha-badge { visibility: hidden; }
</style>
