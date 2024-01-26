<template>
  <TablePricingPlan
    :plan="plan"
    :featuredText="featuredText"
    :collapse="collapse"
    color="info"
    :showCta="showCta"
    :planItems="{
                items: lineItems,
              }"
  >
    <!--            <template slot="add-info">-->
    <!--              <p class="lead"><span class="badge badge-outline badge-info">US$<strong>198</strong> billed annually</span></p>-->
    <!--            </template>-->
  </TablePricingPlan>
</template>


<script>
import { mapState } from 'vuex';

import TablePricingPlan from '@/views/subscribe/TablePricingPlan.vue';


export default {
  name: 'subscribe',
  props: {
    plan: {
      type: Object,
      required: true,
    },
    featuredText: {
      type: String,
      required: false,
    },
    showCta: {
      type: Boolean,
      default: true,
    },
    showHelpLinks: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TablePricingPlan,
  },
  data() {
    return {
      // subscriptionPlan: null,
    };
  },
  created() {
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
    }),
    lineItems() {
      return [
        {
          text: this.$i18n.t('subscription_plan.unlimited_downloads_from_our_subscription_catalog'), // 'Unlimited downloads of subscription library',
          link: this.showHelpLinks ? '#faq-808' : '',
        },
        {
          text: this.$i18n.t('subscription_plan.{count}_elements_for_video_editors', { count: '3,000,000+' }), // '2,000,000+ essential stock elements for video editors & designers',
        },
        {
          text: this.$i18n.t('subscription_plan.royalty_free_license'), // 'Royalty-Free License',
          link: this.showHelpLinks ? '#faq-797' : '',
        },
        {
          text: `<i class="fas fa-fw me-bmt icon-video"></i> ${this.$i18n.t('subscription_plan.hd_video')}`, // HD Footage & Animations',
        },
        {
          text: `<i class="fas fa-fw me-bmt icon-after-effects-square"></i> ${this.$term('mediaType', 'ae').text()}, <i class="fas fa-fw me-bmt icon-premiere-pro"></i> ${this.$term('mediaType', 'pr').text()},<br> <i class="fas fa-fw me-bmt icon-davinci-resolve"></i> ${this.$term('mediaType', 'resolve').text()}, <i class="fas fa-fw me-bmt icon-apple-motion"></i> ${this.$term('mediaType', 'motion_template').plural().text()}`,
        },
        {
          text: `<i class="fas fa-fw me-bmt icon-music"></i> ${this.$term('mediaType', 'music').short().text()}, <i class="fas fa-fw me-bmt icon-sfx"></i> ${this.$term('mediaType', 'sfx').short().text()}`,
        },
        {
          text: `<i class="fas fa-fw me-bmt icon-image"></i> ${this.$i18n.t('subscription_plan.photos')}, <i class="fas fa-fw me-bmt icon-vector"></i> ${this.$i18n.t('subscription_plan.vectors')}, <i class="fas fa-fw me-bmt icon-images"></i> ${this.$i18n.t('subscription_plan.gifs')}, <i class="fas fa-fw me-bmt icon-lottie"></i> ${this.$term('mediaType', 'lottie').text()}`,
        },
        // {
        //   text: this.$i18n.t('subscription_plan.new_elements_everyday'), // 'New Elements everyday',
        // },
        {
          text: `${this.$i18n.t('subscription_plan.annual_billing')} (${this.$i18n.t('subscription_plan.auto_renew')})`, // Annual Billing (Auto-renew)',
          link: this.showHelpLinks ? '#faq-801' : '',
        },
      ];
    },
  },
};
</script>
