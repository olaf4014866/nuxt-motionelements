import { mapState } from 'vuex';
import notificationService from '@motionelements/core/src/services/notification.service.js';
// https://vuejs.org/v2/style-guide/#Private-property-names-essential

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      $_isLoggedIn: state => state.user.isLoggedIn,
      $_isEmailVerified: state => state.user.member.emailVerified,
      $_memberEmail: state => state.user.member.email,
    }),
  },
  methods: {
    validateAccount() {
      if (!this.$_isLoggedIn) {
        this.$store.dispatch('modal/showSignUp');
        return false;
      }

      if (!this.$_isEmailVerified) {
        notificationService.flash({
          level: 'info',
          title: this.$i18n.t('account.activate_your_account_heading'),
          detail: `${this.$i18n.t('account.activate_your_account_hint')} ${this.$_memberEmail}`,
          button: {
            label: this.$i18n.t('cta.resend_email'),
            url: this.$link('/signup/send-verification').url(),
          },
        });
        return false;
      }

      return true;
    },
  },
};
