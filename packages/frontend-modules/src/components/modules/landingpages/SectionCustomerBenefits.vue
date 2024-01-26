<template>
  <section>
    <div class="container py-6">
      <SectionHeader class="mb-5 cjk-word-break" :icon="['far','thumbs-up']">
        <template v-slot:title>
          <span v-html="$t('channel.customer_benefits')"></span>
        </template>
      </SectionHeader>
      <div class="row">

        <!-- <IconWithTextVertical class="col col-6 col-lg-3 mb-3" icon="fal fa-3x text-gradient-primary mel icon-unlimited">
          <template v-slot:header>
            <h3 class="h6 font-weight-bold">{{ $t('channel.buy_once') }}</h3>
          </template>
          <template v-slot:description>
            <p>{{ $t('channel.use_with_no_limit') }}</p>
          </template>
        </IconWithTextVertical> -->

        <IconWithTextVertical class="col col-6 col-lg-4 mb-3" :icon="['fal','me-youtube']" iconClass="text-gradient-primary">
          <template v-slot:header>
            <h3 class="h6 font-weight-bold">{{ $t('channel.customer_safe_for_commercial_use_heading') }}</h3>
          </template>
          <template v-slot:description>
            <p>{{ $t('channel.customer_safe_for_commercial_use_text') }}</p>
            <p><a :href="$site('https://help.motionelements.com/hc/articles/206279362').url()" class="btn btn-sm btn-simple-primary">{{ $t('cta.learn_more') }}</a></p>
          </template>
        </IconWithTextVertical>

        <IconWithTextVertical class="col col-6 col-lg-4 mb-3" :icon="['fal','wallet']" iconClass="text-gradient-primary">
          <template v-slot:header>
            <h3 class="h6 font-weight-bold">{{ $t('channel.customer_payment_methods_heading') }}</h3>
          </template>
          <template v-slot:description>
            <p>{{ $t('channel.customer_payment_methods_text') }}</p>
            <p>
              <font-awesome-icon :icon="['fab','cc-visa']" size="2x" title="Visa" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-mastercard']" size="2x" title="Mastercard" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-amex']" size="2x" title="American Express" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-discover']" size="2x" title="Discover" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-jcb']" size="2x" title="JCB" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-paypal']" size="2x" title="Paypal" class="mr-1 text-muted"></font-awesome-icon>
              <font-awesome-icon :icon="['fab','cc-stripe']" size="2x" title="Stripe" class="mr-1 text-muted"></font-awesome-icon>
            </p>
          </template>
        </IconWithTextVertical>

        <IconWithTextVertical class="col col-6 col-lg-4 mb-3" :icon="['fal','file-invoice']" iconClass="text-gradient-primary">
          <template v-slot:header>
            <h3 class="h6 font-weight-bold">{{ $t('channel.customer_official_receipt_heading') }}</h3>
          </template>
          <template v-slot:description>
            <p> {{ $t('channel.customer_official_receipt_text') }}</p>
          </template>
        </IconWithTextVertical>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/modules/landingpages/SectionHeader.vue';
import IconWithTextVertical from '@/components/modules/landingpages/IconWithTextVertical.vue';

export default {
  name: 'SectionCustomerBenefits',
  components: {
    SectionHeader,
    IconWithTextVertical,
  },
};
</script>
