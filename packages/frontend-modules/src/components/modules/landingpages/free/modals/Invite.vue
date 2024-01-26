<template>
  <div class="modal fade" id="free-invite" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h2>{{ $t('invite.heading') }}</h2>
          <p v-html="$nl2p($t('invite.subheading'))"></p>

          <div class="card-deck flex-column flex-md-row">
            <div class="card shadow mb-3 mb-md-0">
              <div class="card-body">
                <h3 class="h5 card-title">
                  {{ $t('invite.via_email') }}
                  <font-awesome-icon :icon="['fas','envelope-open']" class="text-muted float-right"></font-awesome-icon>
                </h3>
                <form method="post" role="form" class="form-vertical" onsubmit="return false">
                  <div class="form-group">
                    <input type="email" class="form-control" v-model.trim="emails" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Addresses">
                    <small v-show="message" class="form-text text-warning">{{ message }}</small>
                    <small class="form-text text-muted">{{ $t('invite.separate_by_comma') }}</small>
                  </div>
                  <p class="text-right mb-0">
                    <ButtonLadda
                      type="submit"
                      class="btn-secondary"
                      :icon="['far','paper-plane']"
                      @button-click="submitInviteFree"
                    >
                      {{ $t('cta.send_invites') }}
                    </ButtonLadda>
                  </p>
                </form>
              </div>
            </div>
            <div class="card shadow">
              <div class="card-body">
                <h3 class="h5 card-title">
                  {{ $t('invite.with_unique_link') }}
                  <font-awesome-icon :icon="['fas','link']" class="text-muted float-right"></font-awesome-icon>
                </h3>
                <div class="form-group mb-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="invite-url" :value="$siteUrl(`/free/stock-footage?invite=${getUniqueLink()}`).www().url()" readonly="">
                    <div class="input-group-append">
                      <button class="btn btn-secondary" type="button">{{ $t('cta.copy') }}</button>
                    </div>
                  </div>
                </div>
                <p class="small text-center mb-2">
                  {{ $t('term.or') }}
                </p>
                <p class="text-center mb-2">
                  <button class="btn btn-facebook" type="button">
                    <font-awesome-icon :icon="['fab','facebook-square']" class="mr-1"></font-awesome-icon>
                    {{ $t('cta.share_on_fb') }}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <p class="small mt-3">
            * {{ $t('invite.max_30_free_download') }} <a :href="$site('https://help.motionelements.com/hc/articles/115000177021').url()">{{ $t('cta.learn_more') }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as reCaptcha from '@/helpers/reCaptcha.js';

export default {
  name: 'modal-free-invite',
  components: {
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
  },
  created: function () {
    // // * NOT LOADING reCaptcha IN PRERENDER
    // if (process.env.VUE_APP_PRERENDER === 'false') {
    //   reCaptcha.load();
    // }
  },
  data() {
    return {
      emails: '',
      message: '',
    };
  },
  methods: {
    getUniqueLink() {
      return 'q3B1k';
    },
    async submitInviteFree() {
      await this.$api.postInviteFreeEdm({
        'emails[]': [this.emails],
        'g-recaptcha-response': await reCaptcha.getToken('invite_free'),
      }).then((res) => {
        this.isShowEmail = false;
        this.message = res.data.message;
      }).catch((error) => {
        // console.error(error);
        this.isShowEmail = false;
        this.message = error;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$facebook-blue: #3c5a99;

.btn-facebook {
  // Parameters
  // $background (required), $border (required), $hover-background, $hover-border

  @include button-variant($facebook-blue, $facebook-blue);
}
</style>
