<template>
  <footer id="footer" role="contentinfo" itemscope itemtype="http://schema.org/WPFooter">
    <div class="container py-5">

      <div class="row mb-3">

        <div class="col-12 col-md-3 col-lg-4 mb-3">
          <div class="row">
            <div class="col-12 col-lg-9 col-xl-8">

              <!-- menu for language -->
              <div class="form-group">
                <MenuLanguage
                  menu="footer"
                  class="bg-black border-gray text-white"
                ></MenuLanguage>
              </div>
              <!-- menu for language -->

              <!-- menu for currency -->
              <div class="form-group">
                <MenuCurrency
                  class="bg-black border-gray text-white"
                ></MenuCurrency>
              </div>
              <!-- menu for currency -->

              <p class="h4">
                <font-awesome-icon :icon="['fab','cc-visa']" title="Visa" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-mastercard']" title="Mastercard" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-amex']" title="American Express" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-discover']" title="Discover" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-jcb']" title="JCB" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-paypal']" title="Paypal" class="fab-payment"></font-awesome-icon>
                <font-awesome-icon :icon="['fab','cc-stripe']" title="Stripe" class="fab-payment"></font-awesome-icon>
              </p>

            </div>
          </div>
        </div>

        <div class="col">
          <div class="row">
            <div class="col-6 col-md-4">
              <h3 class="h6 list-title">{{ $t('footer.discover') }}</h3>
              <ul class="list-unstyled">
                <li>
                  <a
                    :href="$siteUrl('/legal/license').www().url()"
                    rel="license"
                    v-html="$t('footer.eula')"
                  ></a> <!-- Originally labelled 'Royalty-Free End User License Agreement' -->
                </li>
                <li>
                  <a
                    :href="$siteUrl('/begin').www().url()"
                  >{{ $t('header.user_guide') }}
                  </a>
                </li>
                <li>
                  <a
                    :href="$siteUrl('/pricing').www().url()"
                  >{{ $t('header.pricing') }}
                  </a>
                </li>
                <li v-show="this.$i18n.locale === 'ja'">
                  <a
                    :href="$site('https://go.motionelements.com').url()"
                  >{{ $t('footer.events') }}
                  </a>
                </li>
                <li>
                  <a
                    :href="$site('https://tuts.motionelements.com').url()"
                  >{{ $t('footer.tutorials') }}</a>
                </li>
                <li>
                  <a
                    :href="$siteUrl('/covid19').url()"
                  >
                    {{ $t('footer.covid_19_resources') }}
                    <span
                      class="badge badge-pill badge-success"
                    >{{ $t('footer.new') }}</span>
                  </a>
                </li>
              </ul>
              <h3 class="h6 list-title">{{ $t('footer.free') }}</h3>
              <ul class="list-unstyled">
                <li>
                  <a
                    :href="$siteUrl('/free/stock-footage').www().url()"
                  >{{ $t('footer.free_downloads') }}</a>
                </li>
                <li>
                  <a
                    :href="$siteUrl('/banner').www().url()"
                    v-html="$t('footer.banner_generator')"
                  ></a>
                </li>
                <li>
                  <a
                    :href="$siteUrl('/video-converter').www().url()"
                  >{{ $t('footer.video_converter') }}</a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-md-8">
              <div class="row">
                <div class="col-12 col-md-6">
                  <h3
                    class="h6 list-title">{{ $t('footer.contribute_earn') }}</h3>
                  <ul class="list-unstyled">
                    <li>
                      <a v-if="this.isArtist"
                        :href="$site('https://artists.zendesk.com/hc/').url()"
                        v-html="$t('footer.artist_faqs')"
                      ></a>
                      <a v-else
                        :href="$site('https://artists.zendesk.com/hc/').url()"
                        v-html="$t('footer.artist_signup_headline')"
                      ></a>
                    </li>
                    <li v-show="!this.isArtist">
                      <a
                        :href="$siteUrl('/artists').www().url()"
                        v-html="$t('footer.artist_signup')"
                      ></a>
                    </li>
                    <li>
                      <a
                        :href="$siteUrl('/referral').www().url()"
                        :title="$t('footer.affiliate_program')"
                        v-html="`${ $t('footer.affiliate_program') } <span class='badge badge-pill badge-warning'>30%</span>`"
                      >
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-12 col-md-6">
                  <h3 class="h6 list-title">MotionElements<sup>®</sup></h3>
                  <ul class="list-unstyled">
                    <li>
                      <a
                        :href="$siteUrl('/about').www().url()"
                      >{{ $t('footer.about') }}</a>
                    </li>
                    <li>
                      <a
                        :href="$site('https://www.motionelements.com/blog').url()"
                      >{{ $t('footer.blog') }}</a>
                    </li>
                    <li>
                      <a
                        :href="$siteUrl('/careers').www().url()"
                        :title="$t('footer.careers')"
                      >
                        {{ $t('footer.careers') }}
                        <span
                          class="badge badge-pill badge-success"
                        >{{ $t('footer.careers_hiring') }}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        :href="$siteUrl('/partners').www().url()"
                      >{{ $t('footer.partners') }} ・ {{ $t('footer.api') }}</a>
                    </li>
                    <li>
                      <a
                        :href="$site('https://help.motionelements.com/hc').url()"
                      >{{ $t('footer.help_center') }}</a>
                    </li>
                  </ul>
                  <p>
                    <a
                      class="btn btn-dark btn-sm mr-1"
                      href="https://www.facebook.com/motionelements"
                    >
                      <font-awesome-icon :icon="['fab','facebook-f']" fixed-width size="lg" title="Facebook"></font-awesome-icon>
                    </a>
                    <a
                      class="btn btn-dark btn-sm mr-1"
                      href="https://www.youtube.com/channel/UCoM7M80fQE6XoVFo4NaiaGg"
                    >
                      <font-awesome-icon :icon="['fab','youtube']" fixed-width size="lg" title="YouTube"></font-awesome-icon>
                    </a>
                    <a
                      class="btn btn-dark btn-sm"
                      href="https://twitter.com/motionelements"
                    >
                      <font-awesome-icon :icon="['fab','twitter']" fixed-width size="lg" title="Twitter"></font-awesome-icon>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row py-3 border-top border-dark copyright-info">
        <div class="col">
          <p class="text-muted small mb-0">
            © MotionElements<sup data-v-7ee355ab="">®</sup> Pte Ltd.
            {{$t('footer.trademark_legal_notice')}}
          </p>
          <ul class="list-inline small">
            <!-- TODO: to add when available
            <li class="list-inline-item">
              <a href="#">{{$t('footer.site_map')}}</a>
            </li>
            -->
            <li class="list-inline-item">
              <a
                :href="$siteUrl('/legal/privacy').www().url()"
              >{{$t('footer.privacy_policy')}}</a> <!-- ORIGINALLY LABELLED: Privacy Policy -->
            </li>
            <li class="list-inline-item">
              <a
                :href="$siteUrl('/legal/terms').www().url()"
              >{{$t('footer.terms_of_use')}}</a> <!-- ORIGINALLY LABELLED: Terms of Use -->
            </li>
            <li class="list-inline-item">
              <a
                :href="$siteUrl('/legal/copyright').www().url()"
              >{{$t('footer.copyright_policy_dmca')}}</a> <!-- ORIGINALLY LABELLED: Copyright Policy / DMCA -->
            </li>
            <li v-if="currentLanguage == 'ja'" class="list-inline-item">
              <a
                :href="$siteUrl('/legal/ecommerce').www().url()"
              >特定商取引法に基づく表示</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
import MenuLanguage from './modules/common/MenuLanguage.vue';
import MenuCurrency from './modules/common/MenuCurrency.vue';

export default {
  name: 'main-footer',
  components: {
    MenuLanguage,
    MenuCurrency,
  },
  computed: {
    ...mapState({
      isLogin: state => state.member.isLogin,
      isArtist: state => state.member.isArtist,
      currentLanguage: state => state.site.currentLanguage,
    }),
  },
};
</script>

<style lang="scss" scoped>
.list-title, .copyright-info {
  @media (max-width: 350px) {
    font-size: $font-size-sm;
  }
}

.list-unstyled {
  font-size: $font-size-sm;
  line-height: $font-size-sm * 1.5;

  li {
    margin-bottom: $font-size-sm * 0.5;
  }

  @media (max-width: 350px) {
    font-size: $font-size-base * .6;
    line-height: $font-size-sm * 1.5;
  }
}

.fab-payment {
  margin-right: 2px;
}

.list-inline.small {
  .list-inline-item {
    margin-right: 1rem;
  }
}

//
// COLORS
//

footer {
  background-color: $black;
  color: $body-color-dark;

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    color: $headings-color-dark;
  }

  a {
    color: $light;

    @include hover {
      color: $gray-300;
      text-decoration: $link-hover-decoration;
    }
  }
}

.ui-dark {
  .border-top.border-dark {
    border-color: $dark !important;
  }
}
</style>
