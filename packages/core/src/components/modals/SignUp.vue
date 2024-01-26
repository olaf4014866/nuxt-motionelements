<template>
  <Modal
       size="lg"
       align="center"
       headerClass="pb-0"
       :key="'signup-modal'"
    >
      <template v-slot:header>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              :href="signupUrl"
              class="nav-link active"
              data-toggle="tab"
              role="tab"
              aria-controls="signup"
              aria-selected="true"
            > {{ $t('header.signup') }} </a>
          </li>
          <li class="nav-item">
            <a
              :href="loginUrl"
              class="nav-link"
              aria-controls="login"
              aria-selected="false"
            > {{ $t('header.already_a_member') }} </a>
          </li>
        </ul>
      </template>

      <div>
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
                      <font-awesome-icon :icon="['fal','shopping-cart']" size="2x" class="text-primary"/>
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
                :href="signupUrl"
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

    </Modal>
</template>

<script>
// import modalMixin from '@motionelements/core/src/components/mixins/modal.mixin';
import { mapState } from 'vuex';

export default {
  name: 'signup-modal',
  // mixins: [modalMixin],
  props: {
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    // Modal: () => import('@motionelements/core/src/components/ui/BaseModal.vue'),
  },
  computed: {
    ...mapState({
      currentFullPath: state => state.route.fullPath,
    }),
    loginUrl() {
      // build url with intended_url
      if (this.currentFullPath.indexOf('/account') !== 0) {
        return this.$link('/account/login').param('intended_url', this.currentFullPath).url();
      }
      return this.$link('/account/login').url();
    },
    signupUrl() {
      // build url with intended_url
      if (this.currentFullPath.indexOf('/signup') !== 0) {
        return this.$link('/signup').param('intended_url', this.currentFullPath).url();
      }
      return this.$link('/signup').url();
    },
  },
  data() {
    return {
      // isShowLogin: false,
    };
  },
  mounted() {
    // bind a event let other component call
    // this.$root.$on('showLoginModal', () => {
    //   this.isShowLogin = true;
    // });
    // this.showLoginModal();
  },
  methods: {
    // getLocation() {
    //   return window.location.href;
    // },
    // showLoginModal() {
    //   console.log('sHOOOOOW');
    //   this.isShowLogin = true;
    //   $('#modal-login').modal('show');
    // },
  },
};
</script>
