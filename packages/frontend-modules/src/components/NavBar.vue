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

          <li v-cloak class="nav-item">
            <a
              :href="$siteUrl('/pricing').www().url()"
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
              :href="$siteUrl('/begin').www().url()"
              class="nav-link"
            >{{ $t('header.user_guide') }}</a>
          </li>
          <li v-cloak v-if="!isMember" class="nav-item">
            <a
              :href="$siteUrl('/artists').www().url()"
              class="nav-link"
            >{{ $t('header.artist_signup') }}</a>
          </li>
          <li v-cloak v-if="!isMember" class="nav-item form-inline px-1">
            <div class="btn-group" role="group">
              <a
                :href="$siteUrl(`/signup`).www().url()"
                class="btn btn-sm btn-dark mr-1"
              >{{ $t('header.signup') }}</a>
              <a
                :href="$siteUrl('/account/login').www().url()"
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
            <font-awesome-icon :icon="['fas','bars']" class="mx-1"></font-awesome-icon>
          </button>
          <a
            :href="$siteUrl('video').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-video mx-1"></i>
          </a>
          <a
            :href="$siteUrl('music').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-music mx-1"></i>
          </a>
          <a
            :href="$siteUrl('after-effects-templates').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-after-effects mx-1"></i>
          </a>
          <a
            :href="$siteUrl('premiere-pro-templates').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-premiere-pro mx-1"></i>
          </a>
          <a
            :href="$siteUrl('apple-motion-templates').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-apple-motion mx-1"></i>
          </a>

          <a
            :href="$siteUrl('davinci-resolve-templates').www().url()"
            class="btn btn-sm btn-link text-muted"
          >
            <i class="fas me-bmt icon-davinci-resolve mx-1"></i>
          </a>

        </div>
      </div>
      <a
        :href="$siteUrl('/checkout').www().url()"
        class="btn btn-sm text-white no-invert px-3 d-block d-lg-none"
      >
        <i class="fas me-bmt icon-shopping-cart"></i>
      </a>
      <transition name="mobile-navi-fade">
        <div id="navbar-mt" class="collapse navbar-collapse show" v-show="isMobileNavToggle">

          <!-- left icons -->
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('video').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-video"></i>
                {{ $t('header.video') }}
              </a>
            </li>
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('animation').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-animation"></i>
                {{ $t('header.animation') }}
              </a>
            </li>
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('music').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-music"></i>
                {{ $t('header.music') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('after-effects-templates').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-after-effects-square"
                ></i>
                {{ $t('header.ae') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('premiere-pro-templates').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-premiere-pro"
                ></i>
                {{ $t('header.pr') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('apple-motion-templates').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-apple-motion"
                ></i>
                {{ $t('header.motion') }}
              </a>
            </li>

            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('stock-image').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-image"></i>
                {{ $t('header.image') }}
              </a>
            </li>

            <!--
            <li class="nav-item" @click="isMobileNavToggle = false">
              <a
                :href="$siteUrl('davinci-resolve-templates').www().url()"
                class="nav-link"
              >
                <i class="fas fa-fw fa-lg d-inline-block d-lg-none d-xl-inline-block me-bmt icon-davinci-resolve"
                ></i>
                {{ $t('header.davinci_resolve') }}
              </a>
            </li>
            -->

            <!-- other media's dropdown menu -->
            <li class="nav-item dropdown" id="navbar-more">
              <div class="nav-link dropdown-toggle dropdown-toggle-hover no-caret" aria-haspopup="true">
                <font-awesome-icon :icon="['fas','chevron-circle-down']" fixed-width size="lg" class="d-inline-block d-lg-none d-xl-inline-block"></font-awesome-icon>
                {{ $t('header.more') }}
                <div class="dropdown-menu" @click="isMobileNavToggle = false">
                  <a
                    :href="$siteUrl('davinci-resolve-templates').www().url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-davinci-resolve d-inline-block d-lg-none d-xl-inline-block"
                    ></i>
                    {{ $t('header.davinci_resolve') }}
                  </a>
                  <a
                    :href="$siteUrl('sound-effects').www().url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-sfx d-inline-block d-lg-none d-xl-inline-block"
                    ></i>
                    {{ $t('header.sfx') }}
                  </a>
                  <a
                    :href="$siteUrl('3d-model').www().url()"
                    class="dropdown-item"
                  >
                    <i
                      class="fas fa-fw fa-lg me-bmt icon-3d-model d-inline-block d-lg-none d-xl-inline-block"
                    ></i>
                    {{ $t('header.3d') }}
                  </a>
                  <a
                    :href="$siteUrl('lottie').www().url()"
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
            <!-- other media's dropdown menu -->

          </ul>
          <!-- left icons -->

          <!-- right icons -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a
                :href="$siteUrl('/favorites').www().url()"
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
                :href="$siteUrl('/checkout').www().url()"
                class="nav-link dropdown-toggle dropdown-toggle-hover no-caret"
              >
                <i class="fas fa-fw fa-lg me-bmt icon-shopping-cart"></i>
                {{ $t('header.cart') }}
                <span
                  v-show="cartItemsCount"
                  class="badge badge-primary"
                >{{cartItemsCount}}</span>

                <div v-show="cartItemsCount" class="dropdown-menu dropdown-menu-right py-3">
                  <!-- For each item in cart -->
                  <a
                    v-for="element in cartItemsInfo"
                    :key="element.id"
                    :element="element"
                    class="dropdown-item"
                    :href="$siteUrl('/checkout').www().url()"
                  >
                    <!-- Link to element product page? -->
                    <div class="row">
                      <div class="col-6">
                        <img class="img-fluid" :src="element.thumbnails.jpg.url">
                      </div>
                      <div class="col-6 text-truncate pl-0">
                        <span>{{element.priceString}}</span>
                      </div>
                    </div>
                  </a>
                  <!-- For each item in cart -->
                </div>
              </a>
            </li>

          </ul>
          <!-- right icons -->


        </div>
      </transition>
    </nav>

    <!-- SIGN UP MODAL -->
    <transition-group name="fade">
      <div
        v-if="isShowLogin"
        class="modal show"
        id="modal-login"
        role="dialog"
        aria-labelledby="modalSignUpLogin"
        aria-modal="true"
        style="display: block; padding-right: 15px;"
        :key="'modal-login'"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header pb-0">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    :href="$siteUrl(`/signup`).www().url()"
                    class="nav-link active"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="signup"
                    aria-selected="true"
                  > {{ $t('header.signup') }} </a>
                </li>
                <li class="nav-item">
                  <a
                    :href="$siteUrl('/account/login').www().url()"
                    class="nav-link"
                    aria-controls="login"
                    aria-selected="false"
                  > {{ $t('header.already_a_member') }} </a>
                </li>
              </ul>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isShowLogin = false">
                <span aria-hidden="true">
                  <font-awesome-icon :icon="['fas','times']"></font-awesome-icon>
                </span>
              </button>
            </div>
            <div class="modal-body">
              <div class="tab-content" id="signup-modal-tab">
                <div
                  class="tab-pane fade show active"
                  id="signup-tab"
                  role="tabpanel"
                  aria-labelledby="signup-tab"
                >
                  <h4 class="text-center"> {{ $t('header.benefits_of_your_free_account') }} </h4>
                  <div class="border border-light rounded pt-3 px-3 mb-3 shadow-sm">
                    <div class="row">
                      <div class="col-12 col-md-4">
                        <div class="row">
                          <div class="col-3 col-md-12 text-center">
                            <font-awesome-icon :icon="['fal','download']" size="2x" class="text-primary"></font-awesome-icon>
                          </div>
                          <div class="col-9 col-md-12">
                            <p class="text-md-center"> {{ $t('header.download_free_elements') }} </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4">
                        <div class="row">
                          <div class="col-3 col-md-12 text-center">
                            <font-awesome-icon :icon="['fal','heart']" size="2x" class="text-primary"></font-awesome-icon>
                          </div>
                          <div class="col-9 col-md-12">
                            <p class="text-md-center"> {{ $t('header.view_favorites') }} </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 col-md-4">
                        <div class="row">
                          <div class="col-3 col-md-12 text-center">
                            <font-awesome-icon :icon="['fal','shopping-cart']" size="2x" class="text-primary"></font-awesome-icon>
                          </div>
                          <div class="col-9 col-md-12">
                            <p class="text-md-center"> {{ $t('header.purchase_elements') }} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p class="text-center">
                    <a
                      :href="$siteUrl(`/signup`).www().url()"
                      id="signup-submit-btn"
                      class="btn btn-primary"
                    >
                      {{ $t('header.signup') }}
                      <i class="fas me-bmt icon-chevron-right"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop" style="background-color: rgba(255, 255, 255, .7) " v-if="isShowLogin" :key="'modal-login-backdrop'"></div>
    </transition-group>
    <!-- SIGN UP MODAL -->

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
  name: 'main-navbar',
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
