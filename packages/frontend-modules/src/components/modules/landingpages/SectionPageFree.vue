<template>
  <div class="section-page-free">
    <section>
      <div class="container my-6">
        <ContentBox class="text-center">
          <template slot="heading">
            <span v-html="$t('free.edm_subscribe_heading_{product}', { product: $term('mediaType', mediatype).seo().html() })"></span>
          </template>
          <template slot="content">
            <p>
              <!-- Subscribe to our Free Elements mailing list and receive notifications of our latest Free Elements weekly! -->
              {{ $t('free.edm_subscribe_text') }}
            </p>
            <!-- action="https:///www.motionelements.com/free/subscribe" enctype="application/x-www-form-urlencoded" method="post" role="form"  -->
            <form class="form-vertical" onsubmit="return false">
              <div class="form-group">
                <input type="email" v-if="isShowEmail" v-model.trim="email" autocomplete="email" class="form-control" :class="{'is-valid': isValid, 'is-invalid': isValid === false}" aria-describedby="emailHelp" placeholder="Email Address">
                <p v-else>{{ message }}</p>
              </div>
              <div class="form-group" v-if="isShowEmail" >
                <button type="submit" class="btn btn-primary" @click="testEmail()">{{ $t('cta.send_me') }}</button>
              </div>
            </form>
            <p class="small mb-0">
              {{ $t('free.100_percent_free') }}
              {{ $t('free.unsubscribe_anytime') }}
            </p>
          </template>
        </ContentBox>
      </div>
    </section>

    <section>
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['far','me-user-artist']">
          <template v-slot:title>
            <span v-html="$t('free.popular_{product}_artists', { product: $term('mediaType', mediatype).seo().html() })"></span>
            <!-- Popular Free {Final Cut Pro Templates} Contributors -->
          </template>
          <template v-slot:description>
            <!-- Also, make sure to browse through the other great works made by these amazing Artists. -->
            {{ $t('free.popular_artists_text') }}
          </template>
        </SectionHeader>

        <div class="row justify-content-center flex-wrap" v-if="artistFeatured">
          <div
            v-for="artist in artistFeatured"
            :key="artist.index"
            class="col-4 col-md-2 col-lg-1 mb-3 px-2">
            <ArtistAvatar :artist="artist"></ArtistAvatar>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-light lt">
      <div class="container py-6">
        <SectionHeader class="mb-5">
          <template v-slot:title>
            <span class="cjk-word-break" v-html="$t('free.other_free_downloads')"></span>
          </template>
        </SectionHeader>
        <ButtonsFreeProducts :mediatype="mediatype" />
      </div>
    </section>

    <section>
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['far','shoe-prints']">
          <template v-slot:title>
            <span class="cjk-word-break" v-html="$t('free.download_steps_heading')"></span>
          </template>
        </SectionHeader>

        <div class="row mb-5">

          <IconWithTextVertical
            class="col col-4 mb-3 text-center"
            :icon="['fal','me-user-buyer']"
            iconClass="text-gradient-primary"
            :stepIndex="1">
            <template v-slot:header>
              <h5 class="h6 cjk-word-break" v-html="$t('free.step_1_signup')"></h5>
            </template>
            <template v-slot:description v-if="!isMember">
              <p>
                <button @click="goSignup()" type="button" class="btn btn-sm btn-primary">
                  {{ $t('cta.sign_up_now') }}
                </button>
              </p>
            </template>
          </IconWithTextVertical>

          <IconWithTextVertical
            class="col col-4 mb-3 text-center"
            :icon="['fal','me-download']"
            iconClass="text-gradient-primary"
            :stepIndex="2">
            <template v-slot:header>
              <h5 class="h6 cjk-word-break" v-html="$t('free.step_2_download_{count}_every_week', {'count': 5})"></h5>
            </template>
          </IconWithTextVertical>

          <IconWithTextVertical
            class="col col-4 mb-3 text-center"
            :icon="['fal','paper-plane']"
            iconClass="text-gradient-primary"
            :stepIndex="3">
            <template v-slot:header>
              <h5 class="h6"><span v-html="$t('free.step_3_invite_friends')"></span> <a href="#" class="text-primary"><i class="fas fa-info-circle"></i></a></h5>
              <!-- <h5><a href="#" class="text-primary"><i class="fas fa-info-circle"></i><span class="h6 cjk-word-break" v-html="$t('free.step_3_invite_friends')"></span></a></h5> -->
            </template>
            <template v-slot:description v-if="isMember">
              <p>
                <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#free-invite">
                  {{ $t('cta.invite_now') }}
                </button>
              </p>
            </template>
          </IconWithTextVertical>

          <InviteModal></InviteModal>

        </div>

        <ContentBox class="text-center">
          <template slot="heading">
            <font-awesome-icon :icon="['fal','me-television']" class="text-gray"></font-awesome-icon>
            <span class="cjk-word-break" v-html="$t('term.royalty_free_license')"></span>
            ・
            <span class="cjk-word-break" v-html="$t('term.safe_for_commercial_use')"></span>
          </template>
          <template slot="content">
            <p class="cjk-word-break" v-html="$t('free.license_text')"></p>
            <p>
              <font-awesome-icon :icon="['far','check']" fixed-width></font-awesome-icon>
              <span class="cjk-word-break" v-html="$t('free.license_all_media_text')"></span>
            </p>
            <p>
              <a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" class="btn btn-simple-secondary">{{ $t('cta.learn_more') }}</a>
            </p>
          </template>
        </ContentBox>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { emailValidator } from '@/tools/index.js';

import * as reCaptcha from '@/helpers/reCaptcha.js';

export default {
  name: 'sention-page-free',
  props: {
    mediatype: {
      type: String,
      default: 'video_free',
    },
  },
  components: {
    SectionHeader: () => import('@/components/modules/landingpages/SectionHeader.vue'),
    ArtistAvatar: () => import('@/components/modules/common/user/ArtistAvatar.vue'),
    ButtonsFreeProducts: () => import('@/components/modules/landingpages/ButtonsFreeProducts.vue'),
    IconWithTextVertical: () => import('@/components/modules/landingpages/IconWithTextVertical.vue'),
    ContentBox: () => import('@/components/modules/common/ContentBox.vue'),

    InviteModal: () => import('@/components/modules/landingpages/free/modals/Invite.vue'),
  },
  created: function () {
    this.$api.getArtistList(this.mediatype.replace('_free', ''), {
      free: 1,
    }).then((data) => {
      this.artistFeatured = data;
    });
    // * NOT LOADING reCaptcha IN PRERENDER
    if (process.env.VUE_APP_PRERENDER === 'false') {
      reCaptcha.load();
    }
  },
  data() {
    return {
      artistFeatured: [],
      email: '',
      isValid: null,
      isShowEmail: true,
      message: '',
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
    }),
  },
  methods: {
    goSignup() {
      window.location.href = this.$siteUrl('/signup').www().url();
    },
    testEmail() {
      this.isValid = emailValidator(this.email);
      if (emailValidator(this.email)) {
        this.submitFreeSubscribe();
      }
    },
    async submitFreeSubscribe() {
      await this.$api.postSubscribeFreeEdm({
        email: this.email,
        'g-recaptcha-response': await reCaptcha.getToken('edm'),
      }).then((res) => {
        this.isShowEmail = false;
        this.message = res.data.message;
      }).catch((error) => {
        console.error(error);
        this.isShowEmail = false;
        this.message = error.message;
      });
    },
  },
};
</script>
