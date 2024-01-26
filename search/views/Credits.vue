<template>
  <div>
    <SvgGradientFill :color="'primary'" />
    <div class="container-fluid bg-gradient-credits shadow-lg px-0">
      <HeroWrapper
        :isColumn="true"
        :showOverlay="false"
        :textStyles="{
          invertColor: false,
          lockColor: true,
        }"
        :size="'sm'"
      >
        <template v-slot:title>
          {{ $t('credits.page_h1') }}
          <font-awesome-icon
          :icon="['fal','me-credits-circle']"
        />
        </template>
        <template v-slot:content>
          <div class="d-flex flex-column flex-lg-row">
            <!--
            <IconWithTextHorizontal
              class="mb-3 mb-lg-0 col-12 col-lg-4 px-0"
            >
              <template slot="icon">
                <font-awesome-icon
                  :icon="['fas','check-circle']"
                  size="2x"
                  class="text-gradient-primary"
                ></font-awesome-icon>
              </template>
              <template slot="header">
                <h3 class="h6 text-dark mt-1 no-invert">Deposit credits at one go for all to use</h3>
              </template>
            </IconWithTextHorizontal>
            -->

            <IconWithTextHorizontal
              class="mb-3 mb-lg-0 col-12 col-lg-4 px-0"
            >
              <template slot="icon">
                <font-awesome-icon
                  :icon="['fas','check-circle']"
                  size="2x"
                  class="text-gradient-primary"
                ></font-awesome-icon>
              </template>
              <template slot="header">
                <h3 class="h6 text-dark mt-1 no-invert">
                  {{ $t('credits.usp_checkout_faster_heading') }}
                </h3>
              </template>
            </IconWithTextHorizontal>

            <IconWithTextHorizontal
              class="mb-3 mb-lg-0 col-12 col-lg-4 px-0"
            >
              <template slot="icon">
                <font-awesome-icon
                  :icon="['fas','check-circle']"
                  size="2x"
                  class="text-gradient-primary"
                />
              </template>
              <template slot="header">
                <h3 class="h6 text-dark mt-1 no-invert">
                  {{ $t('credits.usp_never_expire_heading') }}
                </h3>
              </template>
              <template slot="description">
                <p class="text-body no-invert mb-0">
                  {{ $t('credits.usp_never_expire_text') }}
                </p>
              </template>
            </IconWithTextHorizontal>
          </div>
        </template>
      </HeroWrapper>
    </div>

    <section v-if="isMember">
      <div class="container pt-5 pb-5">
        <div class="row">
          <div class="col">
            <CreditBalance />
          </div>
          <!-- <div class="col-12 col-md-4 mb-3">
            <CouponCode
              class="border px-3 py-3 rounded h-100"
            />
          </div> -->
        </div>
      </div>
    </section>
    <section v-else>
      <div class="container pt-5 pb-5">
        <div class="border px-3 px-md-5 py-3 rounded bg-light lt d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p class="mb-3 mb-md-0 h5">
            {{ $t('credits.create_account_heading') }}
          </p>
          <p class="mb-0">
            <a
              :href="$link(`/signup`).url()"
              class="btn btn-primary ml-3"
            >{{ $t('cta.sign_up') }}</a>
            <a
              :href="$link('/account/login').url()"
              class="btn btn-simple-primary ml-3"
            >{{ $t('cta.login') }}</a>
          </p>
        </div>
      </div>
    </section>

    <section v-if="isResellerCustomer">
      <div class="container mb-5">
        <div class="card border-0 shadow bg-light lt">
          <div class="card-body d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
            <div class="mb-3 mb-sm-0">
              <h6>
                <i18n path="subscribe.{product}_are_managed_by_{name}" tag="h5">
                  <template v-slot:product>
                    {{ $t('term.subscriptions') }}
                  </template>
                  <template v-slot:name>
                    <a
                      class="text-primary"
                      @click="onClickContactReseller"
                    >
                      {{ resellerName }}
                    </a>
                  </template>
                </i18n>
              </h6>
              <p class="mb-0">
                {{ $t('credits.for_more_credits_please_request_{reseller}_to_allocate', { reseller: resellerName }) }}
              </p>
            </div>
            <div>
              <button
                v-if="_.size(resellerDetails) || true"
                class="btn btn-primary btn-block text-nowrap"
                @click="onClickContactReseller"
              >
                {{ $t('cta.contact_{name}', { name: $t('member.reseller') }) }}
              </button>
            </div>
          </div>
        </div>

        <!-- <i18n path="subscribe.{product}_are_managed_by_{name}" tag="p">
          <template v-slot:product>
            {{ $t('term.subscriptions') }}
          </template>
          <template v-slot:name>
            <strong>
              {{ resellerName }}
            </strong>
          </template>
        </i18n>
        <p>
          {{ $t('credits.for_more_credits_please_request_{reseller}_to_allocate', { reseller: resellerName }) }}
        </p>
        <div class="row">
          <div class="col-sm-8 col-md-4">
            <button
              v-if="_.size(resellerDetails)"
              class="btn btn-primary btn-block"
              @click="onClickContactReseller"
            >
              {{ $t('cta.contact_{name}', { name: $t('member.reseller') }) }}
            </button>
          </div>
        </div> -->
      </div>
    </section>

    <section v-else>
      <div class="container py-5">
        <Stepper id="credits-step-1"
                 :step="1"
                 :activeStep="activeStep"
                 @switch-step="switchStep"
        >
          <template slot="label">
            <h3 class="h6">
              <template v-if="!isDirectCustomCreditsPurchase && !selectedCreditAmount">
                {{ $t('credits.step_1_select_amount_heading') }}
              </template>
              <template v-else>
                <i18n path="credits.step_1_{amount}_credits_selected_heading" tag="div">
                  <template v-slot:amount>
                    {{ selectedCreditAmount }}
                    <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width/>
                  </template>
                </i18n>
              </template>
            </h3>
          </template>

          <template slot="content">
            <CreditPacksList v-if="isCreditPacksLoaded || activeStep === 1"
              :selectedCreditPackId="selectedCreditPackId"
              @select-credit-pack="onSelectCreditPack"
              @select-custom-credits="onSelectCustomCredits"
            />
          </template>
        </Stepper>

        <Stepper id="credits-step-2"
          :step="2"
          :activeStep="activeStep"
          :scrollTo="false"
        >
          <template slot="label">
            <h3 class="h6">
              {{ $t('credits.step_1_select_payment_method_heading') }}
            </h3>
          </template>
          <template slot="content">
            <Payment v-if="isCreditPackSelected"
                     :selectedCreditPack="selectedCreditPack"
                     :order="order"
                     @payment-completed="paymentCompleted"
                     @payment-authorized="paymentAuthorized"
            />
          </template>
        </Stepper>

        <Stepper id="credits-step-3"
          :step="3"
          :activeStep="activeStep"
        >
          <template slot="label">
            <h3 class="h6">
              {{ step3.label }}
            </h3>
          </template>
          <template slot="content">
            <div v-if="paymentStatus === 'authorized'">
              <div v-if="selectedPaymentMethod === 'bank_transfer'">
                <BankTransferAuthorized :order="order" />
              </div>
              <div v-else-if="selectedPaymentMethod === 'konbini'">
                <KonbiniAuthorized :order="order" />
              </div>
            </div>
            <div v-else-if="selectedCreditPack" class="div-payment-successful rounded bg-light lt w-100 px-3 py-2 mb-3">
              <h3>
                Payment Successful</h3>
              <p class="lead">
                <strong class="text-dark">{{ selectedCreditPack.credits }}
                  <font-awesome-icon :icon="['far','me-credits-circle']" fixed-width /> credits
                </strong> have been added to your Credit Balance.
              </p>
            </div>
          </template>
        </Stepper>

      </div>
    </section>

    <section class="bg-light lt">
      <div class="container py-6">
        <SectionHeader class="mb-5" :icon="['fas','question']">
          <template v-slot:title>
            {{ $t('faqs.heading') }}
          </template>
        </SectionHeader>

        <FaqSection v-if="isFaqsLoaded"
          :faqs="this.faqs"
          class="card-columns-faq"
        />

      </div>
    </section>

    <!-- <div class="ui page dimmer show" data-text="message here">
      <div class="content">
        <div class="text-center">
          <p class="ui loader text">message here</p>
          <div class="d-inline-block ui-loading"></div>
        </div>
      </div>
    </div> -->
<!--    <Blocker v-if="showBlocker">-->
<!--      <template v-slot:message>-->
<!--        <p>{{ blockerMessage }}</p>-->
<!--      </template>-->
<!--    </Blocker>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import HeroWrapper from '@/components/ui/page/TheHeroWrapper.vue';
import SectionHeader from '@/components/ui/page/SectionHeader.vue';

import CreditBalance from '@/views/credits/CreditBalance.vue';

import CreditPacksList from '@/views/credits/step1/CreditPacksList.vue';
import Payment from '@/views/credits/step2/Payment.vue';
import SvgGradientFill from '@/components/modules/common/SvgGradientFill.vue';
import IconWithTextHorizontal from '@/components/modules/common/IconWithTextHorizontal.vue';
// import FaqSection from '@/components/modules/faq/FaqSection.vue';

import { getOrderPreview } from '@/services/order.service.js';

// http://localhost:8080/credits
export default {
  name: 'credits',
  components: {
    HeroWrapper,
    SectionHeader,
    SvgGradientFill,
    IconWithTextHorizontal,
    // IconWithTextHorizontal: () => import('@/components/modules/common/IconWithTextHorizontal.vue'),
    // Blocker: () => import('@motionelements/core/src/components/ui/Blocker.vue'),
    // Blocker: () => import('@/views/Blocker.vue'),

    CreditBalance,
    // CouponCode,
    CreditPacksList,
    Payment,
    FaqSection: () => import(/* webpackChunkName: "faqs" */ '@/components/modules/faq/FaqSection.vue'),
    // load dynamically
    BankTransferAuthorized: () => import('@/views/credits/step3/BankTransferAuthorized.vue'),
    KonbiniAuthorized: () => import('@/views/credits/step3/KonbiniAuthorized.vue'),

    Stepper: () => import('@/components/ui/BaseStepper.vue'),
  },
  data() {
    return {
      // creditPacks: [],
      activeStep: 1,
      isDirectCustomCreditsPurchase: false,
      selectedCreditPack: '',
      paymentStatus: null,
      selectedPaymentMethod: null,
      step3: {
        label: this.$i18n.t('credits.step_3_done_heading'), // 'Done',
      },
      order: {
        // net_price = price - discount - tax
        net_total: {
          amount: '0',
          currency: 'USD',
        },
        discount: {
          amount: '0',
          currency: 'USD',
        },
        // value-added tax (VAT)
        vat: {
          amount: '0',
          currency: 'USD',
          rate: 0,
        },
        // gross_price = price + discount + tax
        gross_total: {
          amount: '0',
          currency: 'USD',
        },
        lines: [],
      },
    };
  },
  created() {
    if (this.$route.query.credits) {
      this.isDirectCustomCreditsPurchase = true;
      this.onSelectCustomCredits({
        sku: `CREDIT-${this.$route.query.credits}`,
        // credits: this.$route.query.credits,
        // type: 'custom',
      });
    }
    this.$store.dispatch('credits/getFaqs');
  },
  mounted() {
  },
  computed: {
    ...mapState({
      isMember: state => state.user.isMember,
      supportedCurrencies: state => state.site.supportedCurrencies,
      couponCode: state => state.payment.coupon.code,
      creditPacks: state => state.credits.creditPacks,
      faqs: state => state.credits.faqs,
      userCurrency: state => state.user.currencyCode,
      resellerDetails: state => state.user.member.resellerDetails,
    }),
    ...mapGetters({
      isResellerCustomer: 'user/isResellerCustomer',
    }),
    selectedCreditAmount() {
      return _.get(this.order, 'lines[0].product.credits', 0);
    },
    isCreditPacksLoaded() {
      return Array.isArray(this.creditPacks) && this.creditPacks.length;
    },
    isFaqsLoaded() {
      return Array.isArray(this.faqs);
    },
    isCreditPackSelected() {
      if (this.selectedCreditPack) {
        return _.get(this.selectedCreditPack, 'sku');
      }
      return null;
    },
    selectedCreditPackId() {
      if (this.selectedCreditPack) {
        return _.get(this.selectedCreditPack, 'id');
      }
      return null;
    },
    selectedProducts() {
      const products = [];

      const creditPack = this.selectedCreditPack;

      if (creditPack) {
        // const credits = creditPack.credits;
        products.push(creditPack);
      } else {
        // if custom credit
        // sku: CREDIT
      }
      return products;
    },
    resellerName() {
      return _.get(this.resellerDetails, 'name') || this.$i18n.t('term.reseller');
    },
  },
  methods: {
    switchStep(num) {
      this.activeStep = num;
    },
    switchToPaymentStep() {
      getOrderPreview({
        order_type: 'credits',
        products: [this.selectedCreditPack.sku],
      }).then((response) => {
        this.order = response.data.data;
        console.log('previewOrder', response);
      });
      // switch to step first while waiting for promise
      this.switchStep(2);
      console.log('scrollTo STEP1');
      this.$scrollTo('#credits-step-1');
    },
    onSelectCreditPack(sku) {
      this.selectedCreditPack = this.creditPacks.find(obj => obj.sku === sku);
      this.switchToPaymentStep();
    },
    onSelectCustomCredits(customCreditPack) {
      this.selectedCreditPack = customCreditPack;
      this.switchToPaymentStep();
    },
    paymentCompleted(paymentMethod) {
      this.paymentStatus = 'completed';
      console.log(`clicked: ${paymentMethod}`);
      this.switchStep(3);
    },
    paymentAuthorized(data) {
      this.paymentStatus = 'authorized';
      this.updatePaymentMethod(data.paymentMethod);
      this.order = data.order;
      this.switchStep(3);
      console.log(data);
    },
    updatePaymentMethod(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
      switch (paymentMethod) {
        case 'bank_transfer':
        case 'konbini':
          this.step3.label = this.$i18n.t('credits.step_3_transfer_heading'); // 'Do transfer';
          break;
        default:
          this.step3.label = this.$i18n.t('credits.step_3_done_heading'); // 'Done';
      }
    },
    onClickContactReseller() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/payment/modals/ContactReseller.vue'),
        }),
      });
    },
    // onChangeCurrency() {
    //   updateAccount({
    //     currency: this.userCurrency === 'usd' ? 'JPY' : 'USD',
    //   }).then((data) => {
    //     console.log(data);
    //   });
    // },
  },
  watch: {
    // coupon code does not affect credit packs
    couponCode(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      getOrderPreview({
        order_type: 'credits',
        products: [this.selectedCreditPack.sku],
      }).then((response) => {
        this.order = response.data.data;
        console.log('previewOrder', response);
      });
    },
    watch: {
      // userCurrency(toCurrencyCode) {
      //   console.log('changed currency to:', toCurrencyCode);
      //   if (toCurrencyCode) {
      //     this.refreshCreditPacks();
      //   }
      // },
    },
  },
  metaInfo() {
    return {
      meta: [
        { vmid: 'robots', name: 'robots', content: 'index follow' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  // CREDIT PACKAGE ITEM

  .div-credit-package, .div-payment-method {
    @include box-shadow($box-shadow-sm);
    transition: box-shadow .2s ease, background-color .2s ease, border-color .2s ease;

    &:hover {
      @include box-shadow($box-shadow);
    }
  }

  .btn-increment {
    &:focus {
      box-shadow: none;
    }
  }

  .form-control-custom-credits {
    &:focus {
      border-left-color: $transparent;
      border-right-color: $transparent;
    }
  }

  .div-credit-package, .div-payment-method {
    p {
      margin-bottom: 0;
    }
  }

  // FAQ
  .card-columns-faq {
    column-count: 2;
  }

  // CUSTOM UI DIMMER

  .ui.dimmer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;

    display: none;

    &.show {
      display: block;
    }

    > .content {
      width: 100%;
      height: 100%;

      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
  }

  // COLORS
  .div-credit-package, .div-payment-method {
    &, &:hover {
      background: $white;

    }

    .ui-dark & {
      background: $body-bg-dark;

      &:hover {
        background: $dark;
      }
    }
  }

  .ui.dimmer {
    background-color: $overlay-color;

    .ui-dark & {
      background-color: $overlay-color-dark;
    }
  }

</style>
