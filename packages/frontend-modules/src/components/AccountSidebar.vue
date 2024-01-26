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
              <img v-if="userAvatar" class="img-avatar rounded-circle" :src="userAvatar" />
              <img v-else class="img-avatar rounded-circle" src="https://static.moele.me/img/member/member-01.190903.jpg" />
            </p>
            <p class="mb-0">{{userName}}</p>
          </div>
        </div>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="$siteUrl('/favorites').www().url()"
            class="nav-link"
          >
            <i class="far fa-fw me-bmt icon-heart-regular"></i>
            {{ $t('header.favorites') }}
          </a>
          <a
            :href="$siteUrl('/checkout').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['far','shopping-cart']" fixed-width></font-awesome-icon>
            {{ $t('header.cart') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="$siteUrl('/account').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-buyer']" fixed-width></font-awesome-icon>
            {{ $t('header.account') }}
          </a>
          <a
            :href="$siteUrl('/download').www().url()"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-download"></i>
            {{ $t('header.downloads') }}
          </a>
          <a
            :href="$siteUrl('/account/purchase-history').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-invoice']" fixed-width></font-awesome-icon>
            {{ $t('header.purchases') }}
          </a>
          <a
            :href="$siteUrl('/account/credits').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width></font-awesome-icon>
            {{ $t('header.credits') }}
          </a>
          <a
            :href="$siteUrl('/account/subscription').www().url()"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-lightning"></i>
            {{ $t('header.subscription') }}
          </a>
          <a
            :href="$siteUrl('/history/list').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fal','history']" fixed-width></font-awesome-icon>
            {{ $t('header.history') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav v-cloak v-if="isArtist" class="nav flex-column">
          <a
            :href="$siteUrl('/artist').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-artist']" fixed-width></font-awesome-icon>
            {{ $t('header.artist') }}
          </a>

          <hr class="my-2">
        </nav>

        <nav v-if="isReseller" class="nav flex-column">
          <a
            :href="$siteUrl('/reseller').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','dollar-sign']" fixed-width></font-awesome-icon>
            {{ $t('header.reseller') }}</a>
        </nav>

        <nav class="nav flex-column">
          <NavTheme class="nav-link"/>
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="$siteUrl('/account/logout').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','sign-out-alt']" fixed-width></font-awesome-icon>
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
            <div class="btn-group" role="group" aria-label="Basic example">
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
            :href="$siteUrl('/favorites').www().url()"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-heart-solid"></i> {{ $t('header.favorites') }}
          </a>
          <a
            :href="$siteUrl('/checkout').www().url()"
            class="nav-link"
          >
            <i class="fas fa-fw me-bmt icon-shopping-cart"></i> {{ $t('header.cart') }}
          </a>
        </nav>

        <hr class="my-2">

        <nav class="nav flex-column">
          <a
            :href="$siteUrl('/pricing').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-alt']" fixed-width></font-awesome-icon> {{ $t('header.pricing') }}
          </a>

          <a
            :href="$siteUrl('/begin').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','file-alt']" fixed-width></font-awesome-icon> {{ $t('header.user_guide') }}
          </a>
          <a
            :href="$siteUrl('/artists').www().url()"
            class="nav-link"
          >
            <font-awesome-icon :icon="['fas','me-user-artist']" fixed-width></font-awesome-icon> {{ $t('header.artist_signup') }}
          </a>
        </nav>

        <hr class="my-2">
      </div>

      <!-- SHOW FOR BOTH -->
      <div class="form-group my-4">
        <MenuLanguage
          menu="accountSideBar"
        ></MenuLanguage>
      </div>
      <!-- SHOW FOR BOTH -->
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

import MenuLanguage from './modules/common/MenuLanguage.vue';
import NavTheme from './modules/common/NavTheme.vue';

export default {
  name: 'main-account-sidebar',
  components: {
    NavTheme,
    MenuLanguage,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      isArtist: state => state.member.isArtist,
      isReseller: state => state.member.isReseller,
      isOrganization: state => state.member.isOrganization,
      isMobileAccountSidebarActive: state => state.site.isMobileAccountSidebarActive,
      userAvatar: state => state.member.info.avatar,
      supportedLanguages: state => state.site.supportedLanguages,
    }),
    userName() {
      const memberInfo = this.$store.getters['member/getMemberInfo'];
      return (memberInfo.userName) ? memberInfo.userName : memberInfo.firstName;
    },
  },
  methods: {
    disableMobileAccountSidebar() {
      this.$store.dispatch('site/disableMobileAccountSidebar');
    },
    goSignup() {
      window.location.href = this.$siteUrl('/signup').www().url();
    },
    goLogin() {
      window.location.href = this.$siteUrl(`/account/login?redirect=${window.location.href}`).www().url();
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
