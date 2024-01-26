<template>
  <aside
    :class="{ active: isMobileAccountSidebarActive }"
    id="account-sidebar"
    class="bg-white sidebar sidebar-right p-3"
    role="complementary"
    itemscope
    itemtype="http://schema.org/WPSidebar"
  >
    <!-- ADD SCRIPT: add '.active' when Navbar "#btn-account" is clicked on mobile -->
    <div class="sidebar-wrapper">
      <button
        @click="disableMobileAccountSidebar"
        type="button"
        title="close"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div v-cloak v-if="isMember">
      <!-- <div v-cloak v-if="!isMember"> -->
        <!-- IF LOGGED IN -->
        <div class="list-group list-group-flush">
          <div class="list-group-item border-0 text-center">
            <p>
              <img v-if="avatarUrl" class="img-avatar rounded-circle" :src="avatarUrl" />
              <img v-else class="img-avatar rounded-circle" src="https://static.moele.me/img/member/member-01.190903.jpg" />
            </p>
            <p class="mb-0">{{ displayName }}</p>
          </div>
        </div>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="`$link('/favorites').url()`"
            class="nav-link"
          >
            <i class="far fa-fw me-bmt icon-heart-regular"></i>
            {{ $t('header.favorites') }}
          </a>
          <a
            :href="`$link('/checkout').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['far','shopping-cart']" fixed-width></font-awesome-icon>
            {{ $t('header.cart') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="`$link('/account').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-buyer']" fixed-width></font-awesome-icon>
            {{ $t('header.account') }}
          </a>
          <a
            :href="`$link('/download').url()`"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-download"></i>
            {{ $t('header.downloads') }}
          </a>
          <a
            :href="`$link('/account/purchase-history').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-invoice']" fixed-width/>
            {{ $t('header.purchases') }}
          </a>
          <a
            :href="`$link('/account/credits').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width/>
            {{ $t('header.credits') }}
          </a>
          <a
            :href="`$link('/account/subscription').url()`"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-lightning"></i>
            {{ $t('header.subscription') }}
          </a>
          <a
            :href="`$link('/history/list').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fal','history']" fixed-width/>
            {{ $t('header.history') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav v-cloak v-if="isArtist" class="nav flex-column">
          <a
            :href="`$link('/artist').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-artist']" fixed-width/>
            {{ $t('header.artist') }}
          </a>

          <hr class="my-2">
        </nav>

        <nav v-if="isReseller" class="nav flex-column">
          <a
            :href="`$link('/reseller').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','dollar-sign']" fixed-width/>
            {{ $t('header.reseller') }}</a>
        </nav>

        <nav class="nav flex-column">
          <!-- <NavTheme class="nav-link"/> -->
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="`$link('/account/logout').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','sign-out-alt']" fixed-width/>
            {{ $t('header.logout') }}
          </a>
        </nav>

        <hr class="my-2">

      </div>

      <div v-cloak v-else>
        <!-- IF NOT LOGGED IN -->
        <div class="list-group list-group-flush">
          <div class="list-group-item border-0 text-center">
            <p>
              <font-awesome-layers class="fa-4x">
                <font-awesome-icon :icon="['fas', 'circle']" class="text-light" />
                <font-awesome-icon :icon="['fas', 'user']" class="text-dark" transform="shrink-8" />
              </font-awesome-layers>
            </p>
            <div class="btn-group" role="group">
              <button
                @click="goSignup()"
                type="button"
                class="btn btn-light text-primary mr-1"
              >{{ $t('header.signup') }}</button>
              <button
                @click="goLogin()"
                type="button"
                class="btn btn-light text-primary"
              >{{ $t('header.login') }}</button>
            </div>
          </div>
        </div>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="`$link('/favorites').url()`"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-heart-solid"></i> {{ $t('header.favorites') }}
          </a>
          <a
            :href="`$link('/checkout').url()`"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-shopping-cart"></i> {{ $t('header.cart') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="`$link('/pricing').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-alt']" fixed-width/> {{ $t('header.pricing') }}
          </a>

          <a
            :href="`$link('/begin').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-alt']" fixed-width/> {{ $t('header.user_guide') }}
          </a>
          <a
            :href="`$link('/artists').url()`"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-artist']" fixed-width/> {{ $t('header.artist_signup') }}
          </a>
        </nav>

        <hr class="my-2">
      </div>

      <!-- SHOW FOR BOTH -->
      <!-- <div class="form-group my-4">
        <MenuLanguage
          v-model="currentLanguageCode"
          @change="onChangeLanguage"
          :isFooter="true"
          class="bg-black border-gray text-white"
        />
      </div> -->
      <!-- SHOW FOR BOTH -->
    </div>
  </aside>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

// import MenuLanguage from './modules/common/MenuLanguage.vue';
// import NavTheme from './modules/common/NavTheme.vue';

export default {
  name: 'the-account-sidebar',
  components: {
    // NavTheme,
    // MenuLanguage,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      member: state => state.user.member,
      user: state => state.user,
      isArtist: state => state.user.isArtist,
      isReseller: state => state.user.isReseller,
      isAdmin: state => state.user.isAdmin,
      isOrganization: state => state.user.isOrganization,
      isMobile: state => state.site.isMobile,
      isMobileAccountSidebarActive: state => state.site.isMobileAccountSidebarActive,
      userAvatar: state => state.member.info.avatar,
      supportedLanguages: state => state.site.supportedLanguages,
    }),
    ...mapGetters({
      userLanguage: 'user/getLanguageCode',
      userCurrency: 'user/getCurrencyCode',
    }),
    isOrganizationMember() {
      return this.user.isMember && this.user.isOrganization;
    },
    avatarUrl() {
      return this.$store.getters['user/getAvatarUrl'];
    },
    displayName() {
      return this.$store.getters['user/getDisplayName'];
    },
    currentCurrencyCode: {
      get() {
        return this.userCurrency;
      },
    },
    currentLanguageCode: {
      get() {
        return this.userLanguage;
      },
    },
  },
  methods: {
    onChangeLanguage(languageCode) {
      console.log('onChangeLanguage', languageCode);
      this.$store.dispatch('user/changeLanguage', languageCode);
    },
    disableMobileAccountSidebar() {
      this.$store.dispatch('site/disableMobileAccountSidebar');
    },
    goSignup() {
      // window.location.href = this.$link('/signup').url();
    },
    goLogin() {
      // window.location.href = this.$link(`/account/login?redirect=${window.location.href}`).url();
    },
    emitChangeTheme() {
      this.$root.$emit('changeTheme');
    },
  },
};
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(lg) {
  .sidebar {
    display: none;
  }
}

@include media-breakpoint-down(lg) {
  .sidebar {
    width: 18rem;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1100;
    border-radius: 0;
    overflow-y: auto;
    transition: margin-left 0.3s ease, margin-top 0.3s ease;
    box-shadow: $shadow-0;

    &.sidebar-right {
      left: 100%;
      margin-left: 0;

      &.active {
        margin-left: -18rem;
        box-shadow: $shadow-3;
      }
    }

    .img-avatar {
      max-width: 4rem;
    }
  }
}
</style>
