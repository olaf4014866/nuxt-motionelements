<template>
  <header role="banner" itemscope itemtype="http://www.schema.org/WPHeader">
    <nav class="navbar navbar-expand-lg navbar-dark navbar-masthead py-0">
      <a
        :href="$link('/').url()"
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
        <font-awesome-icon :icon="['fas','user']"/>
      </button>

      <div class="collapse navbar-collapse" id="user-nav">
        <ul class="navbar-nav ml-auto">

          <!-- IF LOGGED IN -->
          <!-- <li class="nav-item dropdown"> -->
          <li v-cloak v-if="isMember" class="nav-item dropdown">
            <a
              href="#"
              class="nav-link nav-user dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
            >
              <div
                :style="[ avatarUrl ? { 'background-image': 'url(' + avatarUrl + ')' } : {} ]"
                class="nav-img-wrapper d-inline-block align-middle rounded-circle mr-2 nav-avatar"
              ></div>
              {{ displayName }}
            </a>
            <div class="dropdown-menu">
              <a
                :href="$link('/account').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','me-user-buyer']" fixed-width/>
                {{ $t('header.account') }}
              </a>
              <a
                :href="$link('/download').url()"
                class="dropdown-item"
              >
                <i class="fas fa-fw me-bmt icon-download"></i>
                {{ $t('header.downloads') }}
              </a>
              <a
                :href="$link('/account/purchase-history').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['far','file-invoice']" fixed-width/>
                {{ $t('header.purchases') }}
              </a>
              <a
                :href="$link('/account/credits').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','me-credits-circle']" fixed-width/>
                {{ $t('header.credits') }}
              </a>
              <a
                :href="$link('/account/subscription').url()"
                class="dropdown-item"
              >
                <i class="fas fa-fw me-bmt icon-lightning"></i>
                {{ $t('header.subscription') }}
              </a>
              <a
                :href="$link('/history/list').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fal','history']" fixed-width/>
                {{ $t('header.history') }}
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$link('/affiliate/report').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','dollar-sign']" fixed-width/>
                {{ $t('header.affiliate_report') }}
              </a>
              <div class="dropdown-divider"></div>

              <NavTheme class="dropdown-item"/>

              <div class="dropdown-divider"></div>

              <div class="dropdown-item">
                <a
                  :href="feedbackFormUrl"
                  class="btn btn-sm btn-block btn-light" target="_blank" rel="nofollow">
                  <font-awesome-icon :icon="['fas','comment-check']" fixed-width/>
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
                :href="$link('/account/logout').url()"
                class="dropdown-item">
                <font-awesome-icon :icon="['fas','sign-out-alt']" fixed-width></font-awesome-icon>
                {{ $t('header.logout') }}
              </a>
            </div>
          </li>
          <li v-if="isReseller" class="nav-item">
            <a
              :href="$link('/reseller').url()"
              class="nav-link"
              >{{ $t('header.reseller') }}</a>
          </li>
          <!-- ORG MENU SETTING -->
          <li v-cloak v-if="isOrganization && ['admin', 'manager'].includes(getOrganizationRole)" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
            >{{ organizationInfo.name }}</a>
            <div class="dropdown-menu">
              <a
                :href="$link('/corporate/user/list').url()"
                class="dropdown-item"
              >{{ $t('header.users') }}</a>
              <a
                :href="$link('/corporate/transaction/list').url()"
                class="dropdown-item"
              >{{ $t('header.transaction_history') }}</a>
            </div>
          </li>
          <!-- ORG MENU NOT ADMIN -->
          <li v-cloak v-else-if="isMember && isOrganization" class="nav-link">
            <span>{{ organizationInfo.name }}</span>
          </li>
          <!-- ORG MENU SETTING -->
          <li v-cloak v-if="isArtist" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
            >{{ $t('header.artist') }}</a>
            <div class="dropdown-menu">
              <a
                :href="$link('/artist').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','tachometer-alt']" fixed-width/>
                {{ $t('header.artist_dashboard') }}
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$link('/artist/upload').url()"
                class="dropdown-item"
              >{{ $t('header.artist_upload') }}</a>
              <a
                class="dropdown-item"
                :href="$link('/artist/elements').url()"
              >{{ $t('header.artist_element_manage') }}</a>
              <a
                :href="$link('/artist/collections').url()"
                class="dropdown-item"
              >{{ $t('header.artist_collection_manage') }}</a>
<!--              <a-->
<!--                :href="$link('/artist/category/manage').url()"-->
<!--                class="dropdown-item"-->
<!--              >{{ $t('header.artist_category_manage') }}</a>-->
              <a
                :href="$link('/artist/releases').url()"
                class="dropdown-item"
              >{{ $t('header.artist_release_list') }}</a>
              <a
                :href="$link('/artist/metadata/import').url()"
                class="dropdown-item"
              >{{ $t('header.artist_metadata_import') }}</a>
              <a
                :href="$link('/artist/template').url()"
                class="dropdown-item"
              >{{ $t('header.artist_template') }}</a>
              <a
                :href="$link('/artist/promo/list').url()"
                class="dropdown-item"
              >{{ $t('header.artist_promo_list') }}</a>
              <a
                :href="$link('/artist/sales').url()"
                class="dropdown-item"
              >
                <font-awesome-icon :icon="['fas','yen-sign']" fixed-width/>&nbsp;
                <span>{{ $t('header.artist_sales') }}</span>
              </a>
              <div class="dropdown-divider"></div>
              <a
                :href="$link('https://artists.zendesk.com/hc/').url()"
                class="dropdown-item"
                target="_blank"
              >
                <font-awesome-icon :icon="['fas','question-circle']" fixed-width/>
                {{ $t('header.artist_support')}}
              </a>
            </div>
          </li>

          <li v-cloak class="nav-item">
            <a
              :href="$link('/pricing').url()"
              class="nav-link"
            >{{ $t('header.pricing') }}</a>
          </li>
          <!-- IF LOGGED IN -->

          <!-- <li v-cloak v-if="!isMember" class="nav-item">
            <a
              :href="$siteUrl('/pricing').www().url()"
              class="nav-link"
            >{{ $t('header.pricing') }}</a>
          </li> -->
          <!-- IF NOT LOGGED IN -->
          <li v-cloak v-if="!isMember" class="nav-item">
            <a
              :href="$link('/begin').url()"
              class="nav-link"
            >{{ $t('header.user_guide') }}</a>
          </li>
          <li v-cloak v-if="!isMember" class="nav-item">
            <a
              :href="$link('/artists').url()"
              class="nav-link"
            >{{ $t('header.artist_signup') }}</a>
          </li>
          <li v-cloak v-if="!isMember" class="nav-item form-inline px-1">
            <div class="btn-group" role="group">
              <a
                :href="$link(`/signup`).url()"
                class="btn btn-sm btn-dark mr-1"
              >{{ $t('header.signup') }}</a>
              <a
                :href="$link('/account/login').url()"
                class="btn btn-sm btn-dark"
              >{{ $t('header.login') }}</a>
            </div>
          </li>
          <!-- IF NOT LOGGED IN -->

          <!-- SHOW FOR BOTH -->
          <MenuLanguageDropdown />
          <!-- SHOW FOR BOTH -->

        </ul>
      </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-dark navbar-top py-0" v-show="isShowMediaBar">
      <div class="form-inline d-block d-lg-none">
        <div class="btn-group">
          <button
            class="btn btn-sm btn-link text-muted"
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="isMobileNavToggle = !isMobileNavToggle"
          >
            <font-awesome-icon :icon="['fas','bars']" class="mx-1"/>
          </button>
          <a
            :href="$link('/video').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-video mx-1"></i>
          </a>
          <a
            :href="$link('/music').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-music mx-1"></i>
          </a>
          <a
            :href="$link('/after-effects-templates').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-after-effects mx-1"></i>
          </a>
          <a
            :href="$link('/premiere-pro-templates').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-premiere-pro mx-1"></i>
          </a>
          <a
            :href="$link('/apple-motion-templates').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-apple-motion mx-1"></i>
          </a>

          <template v-if="isAdmin === true">
          <a
            :href="$link('/davinci-resolve-templates').url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-davinci-resolve mx-1"></i>
          </a>
          </template>

        </div>
      </div>
      <a
        :href="$link('/checkout').url()"
        class="btn btn-sm text-white no-invert px-3 d-block d-lg-none"
      >
        <i class="fas me-bmt icon-shopping-cart"></i>
      </a>
      <transition name="mobile-navi-fade">
        <div id="navbar-mt" class="collapse navbar-collapse show" v-show="isMobileNavToggle">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/video').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-video"></i>
                {{ $t('header.video') }}
              </a>
            </li>
            <!--
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/animation').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-animation"></i>
                {{ $t('header.animation') }}
              </a>
            </li>
            -->
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/music').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-music"></i>
                {{ $t('header.music') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/after-effects-templates').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-after-effects-square"
                ></i>
                {{ $t('header.ae') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/premiere-pro-templates').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-premiere-pro"
                ></i>
                {{ $t('header.pr') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/apple-motion-templates').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-apple-motion"
                ></i>
                {{ $t('header.motion') }}
              </a>
            </li>
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                      :href="$link('/davinci-resolve-templates').url()"
                      class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-davinci-resolve"></i>
                {{ $t('header.resolve') }}
              </a>
            </li>
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$link('/stock-image').url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-image"></i>
                {{ $t('header.image') }}
              </a>
            </li>
            <li class="nav-item dropdown" id="navbar-more">
              <div class="nav-link dropdown-toggle dropdown-toggle-hover no-caret" aria-haspopup="true">
                <font-awesome-icon :icon="['fas','chevron-circle-down']" fixed-width size="lg" class="d-inline-block d-lg-none d-xl-inline-block"/>
                {{ $t('header.more') }} <span v-if="prerender">...</span>
                <div class="dropdown-menu" @click="isMobileNavToggle = false">
                  <!--
                  <a
                    :href="$link('/davinci-resolve-templates').url()"
                    class="dropdown-item"
                  >
                    <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-davinci-resolve"
                    />
                    {{ $t('header.davinci_resolve') }}
                  </a>
                  -->
                  <a
                    :href="$link('/sound-effects').url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-sfx d-inline-block d-lg-none d-xl-inline-block"
                    />
                    {{ $t('header.sfx') }}
                  </a>
                  <a
                    :href="$link('/3d').url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-3d-model d-inline-block d-lg-none d-xl-inline-block"
                    ></i>
                    {{ $t('header.3d') }}
                  </a>
                  <a
                    :href="$link('/lottie').url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-lottie d-inline-block d-lg-none d-xl-inline-block"
                    ></i>
                    {{ $t('header.lottie') }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a
                :href="$link('/favorites').url()"
                @click.prevent="onClickFavorites"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg me-bmt icon-heart-solid"></i>
                {{ $t('header.favorites') }}
                <span
                  v-show="favoritesDefaultCount"
                  class="badge badge-primary"
                >{{favoritesDefaultCount}}</span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                :href="$link('/checkout').url()"
                class="nav-link dropdown-toggle dropdown-toggle-hover no-caret"
              >
                <i class="fas fa-fw fa-lg me-bmt icon-shopping-cart"></i>
                {{ $t('header.cart') }}
                <span
                  v-show="cartItemsCount"
                  class="badge badge-primary"
                >
                  {{cartItemsCount}}
                </span>

                <div v-show="cartItemsCount" class="dropdown-menu dropdown-menu-right py-3">
                  <CartItem
                    v-for="product in cartItems"
                    :key="product.sku"
                    :product="product"
                    class="dropdown-item"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </transition>
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
import { mapState, mapGetters } from 'vuex';

import MenuLanguageDropdown from './modules/common/MenuLanguageDropdown.vue';
import CartItem from './nav/CartItem.vue';
import NavTheme from './modules/common/NavTheme.vue';

export default {
  name: 'the-nav-bar',
  components: {
    MenuLanguageDropdown,
    NavTheme,
    CartItem,
    // ModalInbox: () => import('@/components/modules/common/modals/Inbox.vue'),
  },
  computed: {
    ...mapState({
      // isMember: state => state.user.isMember,
      member: state => state.user.member,
      user: state => state.user,
      isArtist: state => state.user.isArtist,
      isReseller: state => state.user.isReseller,
      isAdmin: state => state.user.isAdmin,
      isOrganization: state => state.user.isOrganization,
      isMobile: state => state.site.isMobile,
      supportedLanguages: state => state.site.supportedLanguages,
    }),
    // favoritesDefaultCount() {
    //   return this.$store.getters['site/favoritesCountDefault'];
    // },
    ...mapGetters({
      isMember: 'user/isMember',
      avatarUrl: 'user/getAvatarUrl',
      displayName: 'user/getDisplayName',
      favoritesDefaultCount: 'site/favoritesCountDefault',
      currentLanguage: 'user/getLanguageCode',
      cartItemsCount: 'cart/getCount',
      cartItems: 'cart/getItems',
    }),
    prerender() {
      return true;
      // return process.env.VUE_APP_PRERENDER === 'true' || (navigator.userAgent || '').indexOf('HeadlessChrome') !== -1;
    },
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
    userEmail() {
      return this.user.member.email;
    },
    // currentLanguage() {
    //   return this.user.language;
    // },
    // avatarUrl() {
    //   return this.$store.getters['user/getAvatarUrl'];
    // },
    // displayName() {
    //   return this.$store.getters['user/getDisplayName'];
    // },
    organizationInfo() {
      return this.isMember ? this.member.organization : '';
    },
    getOrganizationRole() {
      return this.isMember ? this.member.organizationRole : '';
    },
    // favoritesDefaultCount() {
    //   return this.$store.getters['site/favoritesCountDefault'];
    // },
    // cartItemsCount() {
    //   return this.$store.getters['site/cartItemsCount'];
    // },
    // cartItemsInfo() {
    //   return this.$store.getters['site/cartItemsInfo'];
    // },
    // cartItemsCount() {
    //   return this.$store.getters['cart/getCount'];
    // },
    // cartItems() {
    //   return this.$store.getters['cart/getItems'];
    // },
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

    // // bind a event let other component call
    // this.$root.$on('showLoginModal', () => {
    //   this.isShowLogin = true;
    // });
  },
  methods: {
    // getLocation() {
    //   return window.location.href;
    // },
    // showLoginModal() {
    //   $('#modal-login').modal('show');
    // },
    onClickFavorites(event) {
      // console.log(event.target.pathname);
      // console.log(this.$router.resolve({ path: event.target.pathname }));
      const isSearchRepo = process.env.VUE_APP_PROJECT_NAME && process.env.VUE_APP_PROJECT_NAME === 'frontend-search';

      // if (process.env.VUE_APP_ENV !== 'production' && isSearchRepo) {
      if (isSearchRepo) {
        this.$router.push({
          path: event.target.pathname,
        });
        return false;
      }

      window.location.href = event.target.href;
    },
    enableMobileAccountSidebar() {
      this.$store.dispatch('site/enableMobileAccountSidebar');
    },
    // showModal(modalName) {
    //   const $target = $(this.$refs[modalName].$el);
    //   $target.modal('show');
    // },
    textCrop(string, length) {
      string = string.trim();

      if (string.length > length) {
        const delimiter = '&mldr;';

        length -= 1; // delimiter length

        const cropped = string.substring(0, (`${string} `).lastIndexOf(' ', length));

        if (cropped.length) return cropped + delimiter;

        // just cut and return
        return string.slice(0, length) + delimiter;
      }

      return string;
    },
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
