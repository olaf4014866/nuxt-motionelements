<template>
  <div
    class="pricing-plan m-3 flex-grow-1 d-flex flex-column align-items-stretch">
    <div v-if="featuredText" class="plan-featured rounded-top bg-light lt mx-6 text-center">
      <span
        :class="`text-${color ? color : 'primary'}`"
        class="text-uppercase font-weight-bold small">{{ featuredText }}</span>
    </div>
    <div
      :class="`${!featuredText ? 'mt-0 mt-lg-5 shadow-sm' : 'shadow-lg'}`"
      class="plan-details bg-white flex-grow-1 d-flex flex-column rounded text-center p-3"
    >
      <div class="plan-header">
        <div class="plan-name h4 font-weight-bold mb-0">{{ plan.title }}</div>
        <ul v-if="planItems.icons" class="list-inline">
          <li
            v-for="icon in planItems.icons" :key="icon.index"
            class="list-inline-item text-muted">
            <i
              :class="`me-bmt icon-${icon}`"
              class="fa fa-fw"
            ></i>
          </li>
        </ul>
      </div>
      <template v-if="isResellerCustomer">
        <div class="plan-price py-2">
          <i18n path="subscribe.{product}_are_managed_by_{name}" tag="p">
            <template v-slot:product>
              {{ $t('term.subscriptions') }}
            </template>
            <template v-slot:name>
              <strong>
                {{ resellerName }}
              </strong>
            </template>
          </i18n>
          <button
            v-if="_.size(resellerDetails)"
            class="btn btn-primary btn-block"
            @click="onClickContactReseller"
          >
            {{ $t('cta.contact_{name}', { name: $t('member.reseller') }) }}
          </button>
        </div>
      </template>
      <template v-else>
        <div class="plan-price py-2">
          <p class="mb-0">
            <span class="plan-price-cost">
              <span class="plan-price-currency">{{ monthlyPrice.getSymbol() }}</span>
              <span
              :class="`text-gradient-${color ? color : 'primary'}`"
              class="plan-price-amount">{{ monthlyPrice.toFormat('0,0') }}</span></span>/
              {{ $t('subscription_plan.mth') }}
            <br />
          </p>
          <div>
            <p v-if="plan.annual" class="lead">
              <span class="badge badge-outline badge-info">
                {{ $t('subscription_plan.{amount}_billed_annually', { amount: totalPrice.toFormat('$0,0') }) }}
              </span>
            </p>
            <!--          <slot name="add-info">-->
            <!--          </slot>-->
          </div>
        </div>
        <div v-if="showCta"
          class="plan-cta mb-3">
          <button
            :class="ctaButtonClass"
            class="btn btn-block"
            @click="onClickCta()"
            :disabled="isCtaDisabled"
            >
            {{ ctaLabel }}
          </button>
        </div>
      </template>
      <a
        @click="expandItems"
        class="btn btn-simple-secondary mb-3 plan-items-toggle"
        :class="isCollapsed ? 'd-block' : 'd-block d-lg-none'"
      >
        {{ $t('cta.show_details') }}
        <font-awesome-icon
          :icon="['fas','caret-down']"
          class="fa-rotate-transition ml-1"
          :class="isExpanded ? 'fa-rotate-180' : ''"
        />
        <!-- <i
          :class="isExpanded ? 'fa-rotate-180' : ''"
          class="fas fa-caret-down fa-rotate-transition"></i> -->
      </a>
      <div
        :class="{
          'show': isExpanded,
          'items-collapse': isCollapsed,
        }"
        class="plan-items small mb-3 flex-grow-1">
        <ul class="list-group list-group-flush">
          <li v-for="item in planItems.items" :key="item.index" class="list-group-item">

            <button
              v-if="_.get(item, 'isButton') && item.link"
              :href="item.link"
              :class="`btn-simple-${plan.color ? plan.color : 'primary'}`"
              class="btn btn-sm font-weight-bold"
              v-html="item.text">
              <!-- {{ item.text }} -->
            </button>
            <!-- :href="item.link" -->
            <a v-else-if="item.link"
               @click.prevent="openFaq(item.link), $scrollTo(item.link)"
              class="font-weight-normal">
              <!-- <i
                v-if="item.icon"
                :class="`fas fa-fw me-bmt icon-${item.icon}`"></i> -->
              <span
                v-html="item.text"
              ></span>
              <!-- {{ item.text }} -->
              <font-awesome-icon
                v-if="item.link"
                :icon="['fas','info-circle']"
                class="ml-1"
              />
            </a>
            <span
              v-else
              v-html="item.text"
            ></span>
              <!-- <i
                v-if="item.icon"
                :class="`fas fa-fw me-bmt icon-${item.icon}`"></i>
              {{ item.text }} -->

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Money from '@motionelements/money';
import validateAccountMixin from '@motionelements/core/src/components/mixins/validate-account.mixin.js';

export default {
  // components: { ButtonLadda },
  mixins: [validateAccountMixin],
  props: {
    plan: {
      type: Object,
      required: true,
    },
    planItems: {
      type: Object,
      required: true,
    },
    featuredText: {
      type: String,
    },
    color: {
      type: String,
      default: 'info',
    },
    showCta: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      isExpanded: false,
    };
  },
  computed: {
    ...mapState({
      memberSubscriptions: state => state.user.member.subscriptions,
      resellerDetails: state => state.user.member.resellerDetails,
      // userCurrency: state => state.user.currencyCode,
    }),
    ...mapGetters({
      isResellerCustomer: 'user/isResellerCustomer',
    }),
    monthlyPrice() {
      return Money({ amount: this.plan.priceMonthly.amount, currency: this.plan.priceMonthly.currency });
    },
    totalPrice() {
      return Money({ amount: this.plan.price.amount, currency: this.plan.price.currency });
    },
    // isCtaDisabled() {
    //   return this.plan.unlimited && this.memberSubscriptions.includes('unlimited');
    // },
    hasSimilarSubscription() {
      // return false;
      return _.get(this.plan, 'unlimited')
        && this.memberSubscriptions && this.memberSubscriptions.includes('unlimited');
    },
    isCtaDisabled() {
      return this.hasSimilarSubscription;
    },
    ctaButtonClass() {
      let btnClass = '';
      if (this.plan.color) {
        btnClass = `btn-${this.plan.color}`;
      } else if (this.hasSimilarSubscription) {
        btnClass = 'btn-success';
      } else {
        btnClass = 'btn-primary';
      }

      // if (this.hasSimilarSubscription) {
      //   btnClass += ' disabled';
      // }

      return btnClass;
    },
    ctaLabel() {
      if (this.hasSimilarSubscription) {
        return this.$i18n.t('cta.subscribed');
      }
      return this.$i18n.t('cta.subscribe_now');
    },
    resellerName() {
      return _.get(this.resellerDetails, 'name') || this.$i18n.t('term.reseller');
    },
    showCollapse() {
      return false;
    },
    isCollapsed() {
      return this.collapse;
    },
  },
  methods: {
    onClickCta() {
      if (this.hasSimilarSubscription) {
        return false;
      }

      if (this.isResellerCustomer) {
        return false;
      }

      if (!this.validateAccount()) {
        return;
      }

      this.$router.push({
        path: this.$link(`/subscribe/payment?plan=${this.plan.sku}`).fullPath(),
      });
    },
    onClickContactReseller() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/payment/modals/ContactReseller.vue'),
        }),
      });
    },
    openFaq(id) {
      document.querySelector(id).click();
    },
    expandItems: function () {
      this.isExpanded = !this.isExpanded;
      // if (this.isExpanded) {
      //   this.isExpanded = false;
      // } else {
      //   this.isExpanded = true;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin collapse {
  max-height: 0;
  transition: max-height .3s ease-out;
  overflow: hidden;

  &.show {
    max-height: 40rem;
    transition: max-height .3s ease-in;
  }
}

.pricing-plan {
  .plan-price {

    .plan-price-cost {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.5;
    }
    .plan-price-currency {
      font-size: 1rem;
      font-weight: normal;
      color: $body-color !important;
      vertical-align: super;
      margin-right: map-get($spacers,1);
    }
  }

  .plan-featured {
    line-height: 1.875rem;
  }

  .plan-items {
    @include media-breakpoint-down(md) {
      @include collapse;
    }

    &.items-collapse {
      @include collapse;
    }
  }

  .fa-rotate-transition {
    transition: transform .3s ease-in-out;
  }
}
</style>
