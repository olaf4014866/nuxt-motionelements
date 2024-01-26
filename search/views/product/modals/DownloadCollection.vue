<template>
  <Modal
    :size="showPromo ? 'xl' : ''"
  >
    <template v-slot:title>
      {{ name }}
    </template>
    <div
      class="d-flex flex-column flex-lg-row"
      :class="{ 'show-promo' : showPromo }"
    >
      <div
        class="card card-cta"
        :class="{ 'mb-3 mb-lg-0 mr-lg-3' : showPromo }"
      >
        <!--
        <div class="card-header">
        </div>
        -->
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <div class="mb-3">
            </div>

            <p class="text-truncate mb-0 text-dark">{{ name }}</p>
            <template v-if="isDownloadable">
            </template>
            <template v-else>
              {{ credits }} {{ $t('product.credits') }}
            </template>
          </div>
          <div>
            <hr />
            <div
              v-if="!isDownloadable && !isSubscriber"
              class="d-flex justify-content-between align-items-center mb-2"
              :class="showPromo ? 'justify-content-between' : 'justify-content-center'"
            >
              <div class="small">
                <p class="mb-0">
                  {{ $t('purchase.credit_balance') }}
                </p>
              </div>
              <div>
                <p class="mb-0">
                  {{ memberCredits }}
                  <font-awesome-icon
                    :icon="['fal','me-credits-circle']"
                    title="credits"
                  />
                </p>
              </div>
            </div>
            <div class="text-center">
              <ButtonLadda
                class="btn btn-block btn-primary"
                :icon="['fas','me-download']"
                @button-click="onClickDownload()"
              >
                <template v-if="downloadMethod === 'credits'">
                  {{ $t('purchase.use_{credits}_credits', { credits: credits }) }}
                </template>
                <template v-else-if="memberCredits > 0">
                  {{ $t('purchase.topup_{credits}_credits_for_{amount}', {credits: creditsShortfall, amount: '$' + creditsShortfall }) }}
                </template>
                <template v-else>
                  {{ $t('purchase.buy_{credits}_credits_for_{amount}', {credits: credits, amount: '$' + credits }) }}
                </template>
              </ButtonLadda>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showPromo" class="d-flex flex-column align-items-stretch flex-grow-1 div-promo">
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';
import { purchaseCollection } from '@/services/download.service';

export default {
  name: 'collection-purchase-modal',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
  },
  data() {
    return {
      selectedId: '',
      versionObj: null,
      newSelectedSku: '',
      freeDownloadsRemaining: 0,
    };
  },
  created() {
  },
  computed: {
    ...mapState({
      memberCredits: state => state.user.member.credits,
    }),
    collection() {
      return this.product;
    },
    selectedSku() {
      return this.collection.id;
    },
    name() {
      return this.collection.name;
    },
    credits() {
      return this.collection.credits;
    },
    promoType() {
      // controls what promo to show
      switch (true) {
        case this.isFree:
          return 'free';
        default:
          return false;
      }
    },
    showPromo() {
      return false;
    },
    isFree() {
      return false;
    },
    isSubscriber() {
      return false;
    },
    isCreditsEnough() {
      return this.creditsShortfall <= 0;
    },
    isDownloadable() {
      return !!_.get(this.collection, 'downloadable');
    },
    creditsShortfall() {
      if (this.credits > 0) {
        return this.credits - this.memberCredits;
      }
      return 0;
    },
    downloadMethod() {
      switch (true) {
        case this.isCreditsEnough:
          return 'credits';
        default:
          return false;
      }
    },
  },
  watch: {
    sku: function () {
      this.selectedId = this.sku;
    },
  },
  methods: {
    redirectToCreditsPage() {
      this.$store.dispatch('modal/hide', 'collection-purchase-modal');
      // redirect to credit page
      // const redirectUrl = new URL(this.$siteUrl(`credits?credits=${this.topUpCredits}&return=${window.location.href}`).url());
      // // const redirectUrl = new URL(`${process.env.VUE_APP_SITE_URL}/credits?credits=${this.topUpCredits}&return=${window.location.href}`);
      // console.info(`you have no credits, please buy credits before buy elements:${redirectUrl.toString()}`);
      // window.location.href = redirectUrl.toString();
      console.info('you have no credits, please buy credits before buy elements');

      this.$router.push({
        path: '/credits#credits-step-1',
        query: {
          credits: this.creditsShortfall,
          return_url: this.$route.fullPath,
        },
      });
    },
    onClickDownload() {
      if (this.downloadMethod) {
        purchaseCollection({
          method: this.downloadMethod,
          sku: this.selectedSku,
        }).then((response) => {
          if ([200, 201].includes(response.status)) {
            // download file
            // show download status and download box for collection
            this.lastDownloadedSku = this.selectedSku;
          } else {
            // this.$root.$emit('show-modal', 'confirm-purchase-modal', this.sku);
          }
        });
      } else {
        // this.$root.$emit('hide-modal', this.modalId);
        this.redirectToCreditsPage();
      }
      // purchase
      // if (this.downloadMethod) {
      // } else {
      // console.log(name);
      // this.$root.$emit('hide-modal', this.modalId);
      // this.redirectToCreditsPage();
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-cta {
    width: 100%;
  }
  .show-promo {
    .card-cta {
      @include media-breakpoint-up(lg) {
        width: 40%;
        min-width: 40%;
      }
    }
  }

  // COLORS

  // .nav-versions {
  //   .nav-link {
  //     &.active {
  //       background: $transparent;
  //       border-width: .25rem;
  //       padding: 0.25rem 0.75rem;
  //       border-style: solid;
  //       border-color: $primary;
  //     }
  //   }
  // }

  .nav-versions {
    .nav-link {
      &.active {
        background: map-get(map-get($theme-colors-variants, 'light'), '1');
      }
    }
  }

  .div-promo {
    .card {
      &:not(:last-child) {
        margin-bottom: $spacer;
      }

      .position-relative {
        div, a {
          &.position-absolute {
            left: 0;
            transform: translatex(-33.333%);
            opacity: 33.333%;
            z-index: 0;
          }
          &:not(.position-absolute) {
            z-index: 1;
          }

          &:last-child {
            @include media-breakpoint-up(lg) {
              margin-left: $spacer;
            }
          }
        }
      }
    }
  }
</style>
