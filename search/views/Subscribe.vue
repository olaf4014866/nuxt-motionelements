<template>
  <div>
    <SvgGradientFill :color="'primary'" />
    <SvgGradientFill :color="'subscription'" />
    <div class="container-fluid bg-gradient-subscription shadow-lg px-0">
      <HeroWrapper
        class="hero-subscribe"
        :isColumn="false"
        :showOverlay="false"
        :textStyles="{
          invertColor: false,
          lockColor: true,
        }"
      >
        <template v-slot:title>
          <span class="badge badge-pill badge-info shadow">
            <i class="fas me-bmt icon-lightning"></i>
          </span><br />
          {{ $t('subscribe.page_heading') }}
        </template>
        <template v-slot:lead>
          <p>
            {{ $t('subscribe.page_subheading') }}
          </p>
          <p>
            {{ $t('subscribe.new_elements_added_everyday') }}
          </p>
          <p>
            {{ $t('subscribe.get_inspired_by_latest_trending_styles') }}
          </p>
          <ProductIcon
            v-for="(mediaType) in mediaTypes"
            :key="mediaType"
            :productType="mediaType"
            :fixedWidth="true"
            size="lg"
            class="mr-1"
          />
        </template>
        <template v-slot:content>
          <SubscriptionPlan
            id="subscription-plan"
            v-if="subscriptionPlan"
            :plan="subscriptionPlan"
          />
          <!--        :featuredText="$t('subscription_plan.header_early_bird_special')"-->
        </template>

      </HeroWrapper>
    </div>

    <section>
      <SubscriptionUsp/>
    </section>

    <section>
      <SubscriptionBrowse/>
    </section>

    <section>
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['far','seedling']">
          <template v-slot:title>
            {{ $t('subscribe.curations_heading') }}
          </template>
          <template v-slot:description>
            {{ $t('subscribe.curations_subheading') }}
          </template>
        </SectionHeader>

        <div v-if="exclusiveElements"
          class="row mb-3">
          <div class="col-12 mb-3">
            <h5 class="mb-0">
              <font-awesome-icon
                :icon="['fas','gem']"
                class="mr-1 text-gradient-primary"
              />
              {{ $t('subscribe.curations_exclusive_heading') }}
            </h5>
            <p class="mb-0">
              {{ $t('subscribe.curations_exclusive_subheading') }}
            </p>
          </div>
          <div class="col-12 mb-3">
            <ElementsCarousel
              :elements="exclusiveElements"
            />
          </div>
        </div>

        <div v-if="recommendedElements"
             class="row mb-3">
          <div class="col-12 mb-3">
            <h5 class="mb-0">
              <font-awesome-icon
                :icon="['far','thumbs-up']"
                class="mr-1 text-gradient-subscription"
              />
              {{ $t('subscribe.curations_recommended_heading') }}
            </h5>
            <p class="mb-0">
              {{ $t('subscribe.curations_recommended_subheading') }}
            </p>
          </div>
          <div class="col-12 mb-3">
            <ElementsCarousel
              :elements="recommendedElements"
            />
          </div>
        </div>

        <div v-if="curations"
             class="row mb-3">
          <div class="col-12 mb-3">
            <h5 class="mb-0">
              <font-awesome-icon
                :icon="['far','trophy']"
                class="mr-1 text-gradient-subscription"
              />
              {{ $t('subscribe.curations_popular_heading') }}
            </h5>
            <p class="mb-0">
              {{ $t('subscribe.curations_popular_subheading') }}
            </p>
          </div>
          <div class="col-12 mb-3">
            <div class="row">

              <div
                v-for="(dlp, index) in curations"
                class="col-12 col-sm-6 col-lg-3"
                :key="`dlp-${index}`"
              >
                <a
                  :href="dlp.html.url"
                  class="card card-curation mb-3"
                >
                  <div
                    class="curation-thumb"
                    :style="`background-image: url('${randomThumbnail(dlp.items.data)}')`"
                  >
                  </div>
                  <div class="card-body py-2">
                    <h6
                      :href="dlp.html.url"
                      class="card-title mb-0"
                    >
                      {{ dlp.heading }}
                    </h6>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['far','cash-register']">
          <template v-slot:title>
            {{ $t('subscribe.safe_and_secure_payment') }}
          </template>
        </SectionHeader>

        <div class="card-deck">
          <div class="card">
            <div class="card-body">
              <p class="card-text text-muted mb-0">
                <font-awesome-icon
                  :icon="['fab','cc-visa']"
                  size="2x"
                  class="mr-1"
                />
                <font-awesome-icon
                  :icon="['fab','cc-mastercard']"
                  size="2x"
                  class="mr-1"
                />
                <font-awesome-icon
                  :icon="['fab','cc-amex']"
                  size="2x"
                />
              </p>
              <h6 class="card-title">
                {{ $t('subscribe.payment_trusted_payment_methods_heading') }}
              </h6>
              <p class="card-text small">
                {{ $t('subscribe.payment_trusted_payment_methods_text') }}
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <p class="card-text text-muted mb-0">
                <font-awesome-icon
                  :icon="['fal','shield-check']"
                  size="2x"
                />
              </p>
              <h6 class="card-title">
                {{ $t('subscribe.payment_secure_payments_heading') }}
              </h6>
              <p class="card-text small">
                {{ $t('subscribe.payment_secure_payments_text') }}
              </p>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <p class="card-text text-muted mb-0">
                <font-awesome-icon
                  :icon="['fal','unlock-alt']"
                  size="2x"
                />
              </p>
              <h6 class="card-title">
                {{ $t('subscribe.payment_cancel_anytime_heading') }}
              </h6>
              <p class="card-text small">
                {{ $t('subscribe.payment_cancel_anytime_text') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container py-6">
        <PromotionCardRow
          class="bg-gradient-subscription"
        >
          <template v-slot:header>
            <h3 class="h4 mb-0 cjk-word-break text-center text-sm-left text-dark no-invert">
              {{ $t('subscribe.ready_to_subscribe') }}
            </h3>
          </template>
          <template v-slot:footer>
            <a href="#subscription-plan" @click.prevent="$scrollTo('#subscription-plan')" class="btn btn-white-secondary d-block">
              {{ $t('cta.subscribe_now') }}
<!--              Go Back to Top &amp; Subscribe-->
            </a>
          </template>
        </PromotionCardRow>
      </div>
    </section>

    <section class="bg-light lt">
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['fas','question']">
          <template v-slot:title>
            {{ $t('faqs.heading') }}
          </template>
        </SectionHeader>

        <FaqSection
          :faqs="this.faqs"
          class="card-columns-faq"
        />

      </div>
    </section>
    <PageMeta
      :title="$t('subscribe.page_heading')"
      :description="$t('subscribe.page_description')"
      :robots="'index follow'"
      :image="pageImageUrl"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import HeroWrapper from '@/components/ui/page/TheHeroWrapper.vue';
import SectionHeader from '@/components/ui/page/SectionHeader.vue';
import SvgGradientFill from '@/components/modules/common/SvgGradientFill.vue';
import ProductIcon from '@motionelements/core/src/components/product/ProductIcon.vue';
import SubscriptionPlan from '@/views/subscribe/section/SubscriptionPlan.vue';


// import FaqSection from '@/components/modules/faq/FaqSection.vue';
// import * as searchApi from '@/api/search.js';
import { getDynamicPage } from '@/api/dlp.js';
import { listChannelCurations } from '@/api/channels.js';

export default {
  name: 'subscribe',
  components: {
    HeroWrapper,
    SectionHeader,
    SubscriptionUsp: () => import('@/views/subscribe/SubscriptionUsp.vue'),
    SubscriptionBrowse: () => import('@/views/subscribe/SubscriptionBrowse.vue'),
    // SubscriptionPlan: () => import('@/views/subscribe/section/SubscriptionPlan.vue'),
    SubscriptionPlan,
    FaqSection: () => import(/* webpackChunkName: "faqs" */ '@/components/modules/faq/FaqSection.vue'),
    // ElementCard,
    // ButtonGroupToggleCustom,
    PromotionCardRow: () => import('@/components/modules/common/PromotionCard.Row.vue'),
    SvgGradientFill,
    // SvgGradientFill: () => import('@/components/modules/common/SvgGradientFill.vue'),
    ProductIcon,
    // ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
    PageMeta: () => import('@motionelements/core/src/components/ThePageMeta.vue'),

    ElementsCarousel: () => import('@motionelements/core/src/components/modules/landingpages/LandingPageElementsCarousel.vue'),
  },
  data() {
    return {
      exclusiveElements: null,
      recommendedElements: null,
      curations: null,
      // isCurationFeatureEnabled: process.env.VUE_APP_ENV !== 'production',
      exclusiveDlpId: 344, // MotionElements Exclusives: Subscription https://www.motionelements.com/after-effects/me-exclusives-d344
      // subscriptionCatalogIds: [
      //   341, // Subscription: Video/Animation https://www.motionelements.com/video/subscription-video-animation-d341
      //   342, // Subscription: After Effects https://www.motionelements.com/after-effects/subscription-ae-d342
      //   349, // Subscription: Premiere Pro https://www.motionelements.com/premiere-pro/subscription-premierepro-d349
      //   346, // Subscription: FCPX Motion https://www.motionelements.com/apple-motion/subscription-fcpx-motion-d346
      //   345, // Subscription: Resolve https://www.motionelements.com/davinci-resolve/subscription-resolve-d345
      //   343, // Subscription: Image https://www.motionelements.com/image/subscription-image-d343
      //   347, // Subscription: Lottie https://www.motionelements.com/lottie/subscription-lottie-d347
      //   348, // Subscription: GIF https://www.motionelements.com/image/subscription-gif-d348
      // ],
    };
  },
  created() {
    this.$store.dispatch('subscription/getFaqs');

    // if (this.isCurationFeatureEnabled) {
    //   // this.dlps = curationsTop;
    //
    //   // this.getDlpsData();
    //
    //   searchApi.searchElements('video', {
    //     subscription: 1,
    //     exclusive: 1,
    //     perPage: 5,
    //     sort: 'popular',
    //   }).then((response) => {
    //     this.exclusiveElementsList.push(response.data.data);
    //   });
    //
    //   searchApi.searchElements('ae', {
    //     subscription: 1,
    //     exclusive: 1,
    //     perPage: 5,
    //     sort: 'popular',
    //   }).then((response) => {
    //     this.exclusiveElementsList.push(response.data.data);
    //   });
    //
    //   searchApi.searchElements('pr', {
    //     subscription: 1,
    //     exclusive: 1,
    //     perPage: 5,
    //     sort: 'popular',
    //   }).then((response) => {
    //     this.exclusiveElementsList.push(response.data.data);
    //   });
    // }
  },
  mounted() {
    // use observer?
    listChannelCurations('subscribe', {
      perPage: 3,
    }).then((response) => {
      const data = response.data.data;
      this.curations = data;
    });

    this.listExclusiveCuration();
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      plans: state => state.subscription.plans,
      faqs: state => state.subscription.faqs,
      userCurrency: state => state.user.currencyCode,
    }),
    ...mapGetters({
      isResellerCustomer: 'user/isResellerCustomer',
    }),
    // exclusiveElements() {
    //   return _.flatten(this.exclusiveElementsList);
    // },
    mediaTypes() {
      return [
        'video', 'ae', 'pr', 'fcp', 'resolve', 'music', 'sfx', 'image', '3d', 'lottie',
      ];
    },
    isPlansLoaded() {
      return Array.isArray(this.plans);
    },
    isFaqsLoaded() {
      return Array.isArray(this.faqs);
    },
    subscriptionPlan() {
      console.log('ppppl', this.plans);
      if (this.isPlansLoaded) {
        console.log('ppppl', this.plans[0]);
        return this.plans[0];
      }
      return null;
    },
    pageImageUrl() {
      const languageCode = ['en', 'ja', 'ko', 'zh-hant'].includes(this.$i18n.locale) ? this.$i18n.locale : 'en';
      return `https://static.moele.me/img/subscribe/unlimited-subscription-og-${languageCode}.190916.jpg`;
    },
  },
  methods: {
    listExclusiveCuration() {
      getDynamicPage(this.exclusiveDlpId, {
        perPage: 12,
        // perPage: 12,
        // page: 1,
      }).then((response) => {
        this.exclusiveElements = _.get(response.data.data, 'lightboxes[0].items.data');
        // console.log(lightboxes);
        // // elements.push(lightboxes);
        // if (lightboxes) {
        //   this.dlps.push(lightboxes);
        // }
      });
    },
    /*
    getDlpsData() {
      this.subscriptionCatalogIds.forEach((id) => {
        getDynamicPage(id, {
          perPage: 1,
          // perPage: 12,
          // page: 1,
        }).then((response) => {
          const data = response.data.data;
          const lightboxes = _.get(data, 'data.lightboxes[0].items.data[0]');
          console.log(lightboxes);
          // elements.push(lightboxes);
          if (lightboxes) {
            this.dlps.push(lightboxes);
          }
        });
      });
      // this.dlpElements = elements;
    },

     */
    randomThumbnail(elements) {
      const arrayLen = elements.length;
      const randomIndex = Math.floor(Math.random() * Math.floor(arrayLen));

      console.log('randomIndex', randomIndex);

      return elements[randomIndex].thumbnails.jpg.url;
    },
  },
  watch: {
    userCurrency: {
      handler(toCurrencyCode) {
        console.log('changed currency to:', toCurrencyCode);
        if (toCurrencyCode) {
          this.$store.dispatch('subscription/getPlans');
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  // .nav-pills for mediatypes
  .nav-mediatypes {
    .nav-link {
      &:not(.active) {
        background: $transparent;
      }
    }
  }

  .card-curation {
    transition: box-shadow 0.15s cubic-bezier(0.165, 0.84, 0.44, 1);
    @include box-shadow($box-shadow-sm);

    &:hover {
      @include box-shadow($box-shadow);
    }

    & > .curation-thumb {
      width: 100%;
      padding-bottom: 56.25%;

      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      border-radius: $border-radius $border-radius 0 0;
    }
  }

  // custom max-height
  // .hero-subscribe::v-deep {
  //   &.section-hero {
  //     @include media-breakpoint-up(md) {
  //       max-height: none;
  //     }
  //   }
  // }

  .card-columns {
    @include media-breakpoint-up(md) {
      column-count: 2;
    }
    @include media-breakpoint-down(sm) {
      column-count: 1;
    }
  }
</style>
