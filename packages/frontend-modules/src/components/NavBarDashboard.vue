<template>
  <header role="banner" itemscope itemtype="http://www.schema.org/WPHeader">
    <nav class="navbar navbar-expand-lg navbar-dark navbar-masthead py-0">
      <a
        :href="$siteUrl('home').www().url()"
        class="navbar-brand"
      >
        <img src="https://static.moele.me/img/logo/MotionElements-logo-masthead-222x48-inverse.png?w=222" alt="MotionElements" class="m-n3" />
      </a>

      <button
        @click="enableMobileAccountSidebar"
        id="btn-account"
        class="navbar-toggler btn btn-outline-secondary px-3"
        type="button"
      >
        <font-awesome-icon :icon="['fas','user']"></font-awesome-icon>
      </button>

      <div class="collapse navbar-collapse" id="user-nav">
        <ul class="navbar-nav ml-auto">

          <!-- <li class="nav-item dropdown"> -->
          <li v-cloak v-if="isMember" class="nav-item dropdown">
            <a
              href="#"
              class="nav-link nav-user dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              <div
                :style="[ userAvatar ? { 'background-image': 'url(' + userAvatar + ')' } : {} ]"
                class="nav-img-wrapper d-inline-block align-middle rounded-circle mr-2 nav-avatar"
              ></div>
              {{userName}}
            </a>
            <div class="dropdown-menu">
              <a
                :href="$siteUrl('/account').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','me-user-buyer']" fixed-width></font-awesome-icon>
                {{ $t('header.account') }}
              </a>
              <a
                :href="$siteUrl('/download').www().url()"
                class="dropdown-item"
              >
                <i class="fas fa-fw me-bmt icon-download"></i>
                {{ $t('header.downloads') }}
              </a>
              <a
                :href="$siteUrl('/account/purchase-history').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['far','file-invoice']" fixed-width></font-awesome-icon>
                {{ $t('header.purchases') }}
              </a>
              <a
                :href="$siteUrl('/account/credits').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','me-credits-circle']" fixed-width></font-awesome-icon>
                {{ $t('header.credits') }}
              </a>
              <a
                :href="$siteUrl('/account/subscription').www().url()"
                class="dropdown-item"
              >
                <i class="fas fa-fw me-bmt icon-lightning"></i>
                {{ $t('header.subscription') }}
              </a>
              <a
                :href="$siteUrl('/history/list').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fal','history']" fixed-width></font-awesome-icon>
                {{ $t('header.history') }}
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$siteUrl('/affiliate/report').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','dollar-sign']" fixed-width></font-awesome-icon>
                {{ $t('header.affiliate_report') }}
              </a>
              <div class="dropdown-divider"></div>

              <NavTheme class="dropdown-item"/>

              <div class="dropdown-divider"></div>

              <div class="dropdown-item">
                <a
                  :href="feedbackFormUrl"
                  class="btn btn-sm btn-block btn-light" target="_blank" rel="nofollow">
                  <font-awesome-icon :icon="['fas','comment-check']" fixed-width></font-awesome-icon>
                  {{ $t('header.ui_feedback_form') }}
                </a>
              </div>

              <!--
              <div class="dropdown-divider"></div>

              <a
                href="#"
                class="dropdown-item"
                @click="showModal('modalInbox')"
              >
                <font-awesome-layers class="fa-fw">
                  <font-awesome-icon
                    :icon="['fas','inbox']" />
                  <font-awesome-icon
                    v-if="true"
                    :icon="['fas','circle']" transform="shrink-6 right-6 up-6" class="text-primary" />
                </font-awesome-layers>
                What's New?
              </a> -->

              <div class="dropdown-divider"></div>

              <a
                :href="$siteUrl('/account/logout').www().url()"
                class="dropdown-item">
                <font-awesome-icon :icon="['fas','sign-out-alt']" fixed-width></font-awesome-icon>
                {{ $t('header.logout') }}
              </a>
            </div>
          </li>
          <li v-if="isMember && isReseller" class="nav-item">
            <a
              :href="$siteUrl('/reseller').www().url()"
              class="nav-link"
              >{{ $t('header.reseller') }}</a>
          </li>
          <!-- ORG MENU SETTING -->
          <li v-cloak v-if="isMember && isOrganization && ['admin', 'manager'].indexOf(getOrganizationRole) > -1" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
            >{{ organizationInfo.name }}</a>
            <div class="dropdown-menu">
              <a
                :href="$siteUrl('/corporate/user/list').www().url()"
                class="dropdown-item"
              >{{ $t('header.users') }}</a>
              <a
                :href="$siteUrl('/corporate/transaction/list').www().url()"
                class="dropdown-item"
              >{{ $t('header.transaction_history') }}</a>
            </div>
          </li>
          <!-- ORG MENU NOT ADMIN -->
          <li v-cloak v-else-if="isMember && isOrganization" class="nav-link">
            <span>{{ organizationInfo.name }}</span>
          </li>
          <!-- ORG MENU SETTING -->
          <li v-cloak v-if="isMember && isArtist" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
            >{{ $t('header.artist') }}</a>
            <div class="dropdown-menu">
              <a
                :href="$siteUrl('/artist').www().url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','tachometer-alt']" fixed-width></font-awesome-icon>
                {{ $t('header.artist_dashboard') }}
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$siteUrl('/artist/upload').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_upload') }}</a>
              <a
                class="dropdown-item"
                :href="$siteUrl('/artist/elements').www().url()"
              >{{ $t('header.artist_element_manage') }}</a>
              <a
                :href="$siteUrl('/artist/collections').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_collection_manage') }}</a>
<!--              <a-->
<!--                :href="$siteUrl('/artist/category/manage').www().url()"-->
<!--                class="dropdown-item"-->
<!--              >{{ $t('header.artist_category_manage') }}</a>-->
              <a
                :href="$siteUrl('/artist/releases').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_release_list') }}</a>
              <a
                :href="$siteUrl('/artist/metadata/import').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_metadata_import') }}</a>
              <a
                :href="$siteUrl('/artist/template').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_template') }}</a>
              <a
                :href="$siteUrl('/artist/promo/list').www().url()"
                class="dropdown-item"
              >{{ $t('header.artist_promo_list') }}</a>
              <a
                :href="$siteUrl('/artist/sales').www().shortEngLang(false).url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','yen-sign']" fixed-width></font-awesome-icon>&nbsp;
                <span>{{ $t('header.artist_sales') }}</span>
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$site('https://artists.zendesk.com/').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','question-circle']" fixed-width></font-awesome-icon>
                {{ $t('header.artist_support')}}
              </a>
            </div>
          </li>

          <MenuLanguageDropdown />

        </ul>
      </div>
    </nav>

    <!-- INBOX MODAL -->
    <!--
    <ModalInbox
      ref="modalInbox"
      :logs="[
        {
          date: '3 weeks ago',
          title: 'Early bird purchase of Unlimited Subscription Plan is now available',
          content: '&lt;p&gt;&lt;strong&gt;Enjoy our Early Bird pricing of US$16.50/mth (billed annually) when you subscribe now.&lt;/strong&gt; &rarr; &lt;a href=&quot;https://www.motionelements.com/subscribe&quot;&gt;https://www.motionelements.com/subscribe&lt;/a&gt;&lt;/p&gt;&lt;h5&gt;&lt;strong&gt;One Plan offering 3 Key Benefits&lt;/strong&gt;&lt;/h5&gt;&lt;p&gt;1) Unlimited downloads for all your project needs&lt;br&gt;2) All-Media-Types-in-One Subscription for easy cross media type use&lt;br&gt;3) Hassle-free annual payment - pay only once for 12 months of use!&lt;/p&gt;&lt;p&gt;&lt;a href=&quot;https://www.motionelements.com/subscribe&quot;&gt;&lt;img src=&quot;https://blog-motionelements.imgix.net/uploads/2019/10/sub%20en2.34ef09ea1c47f19ac523902f4a9e2181.png&quot;alt=&quot;UnlimitedSubscription&quot;&gt;&lt;/a&gt;&lt;/p&gt;',
        },
      ]"
    >
    -->
    <!-- INBOX MODAL -->

  </header>
</template>

<script>
import { mapState } from 'vuex';
import MenuLanguageDropdown from './modules/common/MenuLanguageDropdown.vue';
import NavTheme from './modules/common/NavTheme.vue';

export default {
  name: 'main-navbar-dashboard',
  components: {
    MenuLanguageDropdown,
    NavTheme,
    // ModalInbox: () => import('@/components/modules/common/modals/Inbox.vue'),
  },
  computed: {
    ...mapState({
      isMobile: state => state.site.isMobile,
      isMember: state => state.member.isMember,
      isLogin: state => state.member.isLogin,
      isArtist: state => state.member.isArtist,
      isReseller: state => state.member.isReseller,
      isOrganization: state => state.member.isOrganization,
      userAvatar: state => state.member.info.avatar,
      userEmail: state => state.member.info.email,
      currentLanguage: state => state.site.currentLanguage,
      supportedLanguages: state => state.site.supportedLanguages,
    }),
    feedbackFormUrl() {
      let url = this.$i18n.locale === 'ja' ? 'https://airtable.com/shr03yuytXp66zgjB' : 'https://airtable.com/shrwG9spdLuaahm47';
      url += `?prefill_Email=${encodeURIComponent(this.userEmail)}`;
      return url;
    },
    isShowMediaBar() {
      if (this.$route.name) {
        if (!this.$route.name.match('home') || this.isMember) {
          return true;
        }
      }
      return false;
    },
    displayName() {
      const memberInfo = this.$store.getters['member/getMemberInfo'];
      if (memberInfo.userName) {
        return memberInfo.userName;
      }
      else if (memberInfo.firstName) {
        return memberInfo.firstName;
      }
      else if (memberInfo.lastName) {
        return memberInfo.lastName;
      }
      return memberInfo.email.split('@')[0];
    },
    userName() {
      const memberInfo = this.$store.getters['member/getMemberInfo'];
      return (memberInfo.userName) ? memberInfo.userName : memberInfo.firstName;
    },
    memberInfo() {
      return this.$store.getters['member/getMemberInfo'];
    },
    organizationInfo() {
      return this.$store.getters['member/getOrganizationInfo'];
    },
    getOrganizationRole() {
      return this.$store.getters['member/getOrganizationRole'];
    },
    favoritesDefaultCount() {
      return this.$store.getters['site/favoritesCountDefault'];
    },
    cartItemsCount() {
      return this.$store.getters['site/cartItemsCount'];
    },
    cartItemsInfo() {
      return this.$store.getters['site/cartItemsInfo'];
    },
  },
  data() {
    return {
      isShowLogin: false,
      isMobileNavToggle: false,
    };
  },
  mounted() {
    // eslint-disable-next-line
    $('.dropdown-toggle-hover').on('mouseover mouseout', function () {
      $(this)
        .children('.dropdown-menu')
        .toggleClass('show');
    });

    // bind a event let other component call
    this.$root.$on('showLoginModal', () => {
      this.isShowLogin = true;
    });
  },
  methods: {
    // getLocation() {
    //   return window.location.href;
    // },
    showLoginModal() {
      $('#modal-login').modal('show');
    },
    enableMobileAccountSidebar() {
      this.$store.dispatch('site/enableMobileAccountSidebar');
    },
    showModal(modalName) {
      const $target = $(this.$refs[modalName].$el);
      $target.modal('show');
    },
    // by marksun
    textCrop(string, length) {

      string = string.trim();

      if (string.length > length)
      {
        const delimiter = '&mldr;';

        length = length - 1;  // delimiter length

        let cropped = string.substring(0, (string + ' ').lastIndexOf(' ', length));

        if (cropped.length)
          return cropped + delimiter;

        // just cut and return
        return string.slice(0, length) + delimiter;
      }

      return string;
    }
    // end by marksun
  },
};
</script>

<style lang="scss" scoped>

// for normal transition
.mobile-navi-fade-enter-active, .mobile-navi-fade-leave-active {
  transition: all .2s;
  max-height: 512px;
  overflow: hidden;
}
.mobile-navi-fade-enter, .mobile-navi-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  max-height: 0;
}

.navbar.navbar-dark {
  background-color: $black;
}
.navbar-top {
  .dropdown-menu {
    margin-top: 0;
  }
}
.navbar::v-deep {
  .dropdown-menu {
    z-index: 10000;
  }
}
.dropdown-menu-lg {
  width: 30rem;
}
.nav-avatar {
  background-image: url('https://static.moele.me/img/member/member-01.190903.jpg');
  background-size: cover;
}

.custom-control-label-theme {
  &.active {
    &:before {
      color: $black;
      background-color: $custom-control-indicator-checked-bg;
      border-color: $custom-control-indicator-checked-border-color;

      .ui-dark & {
        color: $black;
        background-color: $custom-control-indicator-checked-bg-dark;
        border-color: $custom-control-indicator-checked-border-color-dark;
      }
    }

    &:after {
      transform: translateX(0.9375rem);
      background-color: $white;

      .ui-dark & {
        background-color: $black;
      }
    }
  }
}

</style>
