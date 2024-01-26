<template>
  <div class="mb-3">
    <div class="border border-light rounded p-3 mb-3">

      <!-- Pricing, Versions, CTA -->
      <div>

        <!-- If there is only 1 version -->
        <div
          v-if="versions.length && versions.length < 2"
          class="d-flex align-items-end justify-content-between flex-nowrap mb-2"
        >
          <p v-if="isShowFormat" class="ver-label text-muted mb-0">
            {{ element.versions[versions[0]].format ? _.toUpper(element.versions[versions[0]].format) : 'Custom' }}
          </p>
          <div class="ver-price">
            <template v-if="element.price">
              <p class="h4 mb-0">{{ currencySymbol }} {{ element.price }}</p>
            </template>
            <template v-if="!element.price">
              <p class="mb-0">
                <span class="text-dark lead">{{ $t('product.free') }}</span><br />
                <small>{{ $t('product.with_subscription') }}</small>
              </p>
            </template>
          </div>
        </div>

        <!-- If there are multiple versions -->
        <div v-if="versions.length > 1">
          <div class="btn-group-toggle btn-ver-toggle" data-toggle="buttons">

            <label
              v-for="version in versions"
              :key="element.versions[version].id"
              class="btn btn-ver btn-block btn-simple-secondary mb-2"
            >
              <!-- TODO: Need to add default .active to .btn-ver
                - check if any is subscription-free, add to first subscription item
                - if no subscription-free, add to first .btn-ver
              -->
              <input type="radio" autocomplete="off">
              <div class="d-flex justify-content-between align-items-center">
                <p class="ver-label text-dark">
                  {{ element.versions[version].format ? _.toUpper(element.versions[version].format) : 'Custom' }}
                </p>
                <div class="ver-price text-right">
                  <template v-if="element.versions[version].price">
                    <p>{{  _.toUpper(element.versions[version].currency) }} {{ element.versions[version].price }}</p>
                  </template>
                  <template v-if="!element.versions[version].price">
                    <p class="mb-0">
                      <span class="text-dark">{{ $t('product.free') }}</span><br />
                      <small>{{ $t('product.with_subscription') }}</small>
                    </p>
                  </template>
                </div>
              </div>
            </label>

          </div>
        </div>
        <div class="d-flex flex-column mb-3">
          <button
            class="btn btn-primary mb-3"
            @click="ctaClick(element.url)"
          >
            <!-- <font-awesome-icon
              :icon="['fas','me-download']"
              class="mr-2"
            ></font-awesome-icon>-->
            {{ $t('cta.details_and_download') }}
            <font-awesome-icon
              :icon="['fas','chevron-right']"
              class="mr-2"
            ></font-awesome-icon>
          </button>
          <div class="d-flex div-actionable-btns">
            <button
              class="btn btn-actionable btn-block btn-simple-primary cjk-word-break"
              @click="addFavorites()"
            >
              <font-awesome-icon
                :icon="['far','heart']"
                fixed-width
                class="mr-1"
              ></font-awesome-icon> {{ $t('product.favorite') }}
            </button>
            <button
              class="btn btn-actionable btn-block btn-simple-primary cjk-word-break"
              @click="filterSimilar(element)"
            >
              <font-awesome-icon
                :icon="['far','me-search-ai']"
                fixed-width
                class="mr-1"
              ></font-awesome-icon> {{ $t('product.similar') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Feature Icons -->
      <div>

        <hr
          v-if="element.exclusive === true || element.subscription === true"
        />

        <div>
          <!-- ME Exclusive -->
          <FeatureIconsItem
            v-if="element.exclusive === true"
          >
            <template slot="icon">
              <SvgGradientFill :color="'primary'" />
              <font-awesome-icon
                size="lg"
                class="mr-2 text-gradient-primary"
                fixed-width
                :icon="['fas','me-diamond']"
              ></font-awesome-icon>
            </template>
            <template slot="label">
              {{ $t('product.only_on_me') }}
            </template>
          </FeatureIconsItem>

          <!-- Is available for subscription download -->
          <FeatureIconsItem
            v-if="element.subscription"
          >
            <template slot="icon">
              <SvgGradientFill :color="'subscription'" />
              <font-awesome-icon
                size="lg"
                class="mr-2 text-gradient-subscription"
                fixed-width
                :icon="['fas','me-lightning']"
              ></font-awesome-icon>
            </template>
            <template slot="label">
              {{ $t('product.available_for_subscription') }}
            </template>
          </FeatureIconsItem>
        </div>
      </div>

      <div v-if="true"> <!-- SHOULD SHOW IF THERE ARE SAMPLES TO BE DOWNLOADED -->
        <hr />
        <a
          class="btn btn-sm btn-block btn-simple-secondary"
          :href="$siteUrl(`/download/sample/${element.id}`).www().url()"
        >
          <font-awesome-icon
            :icon="['far','me-download']"
            fixed-width
          ></font-awesome-icon>
          {{ $t('product.download_sample') }}
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'cta-section',
  components: {
    SvgGradientFill: () => import('@/components/modules/common/SvgGradientFill.vue'),
    FeatureIconsItem: () => import('@/components/modules/product/cta/FeatureIconsItem.vue'),
  },
  props: {
    // isAdmin: Boolean,
    element: Object,
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.$store.getters['site/currentCurrency'];
      const currencyInfo = (mapCurrencies[currentCurrency]) || mapCurrencies.USD;
      return currencyInfo.symbol;
    },
    isShowFormat() {
      switch (this.element.mediaType) {
        case 'video-live':
        case 'animation':
          return true;
        default:
          return false;
      }
    },
    versions() {
      if (this.element.versions) {
        return Object.keys(this.element.versions);
      }
      return [];
    },
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    addFavorites() {
      if (!this.isMember) {
        this.$parent.$emit('close-product-modal');
        this.$root.$emit('showLoginModal');
        return;
      }
      this.$bus.$emit('product-favorited', this.element);
    },
    filterSimilar(element) {
      this.$parent.$emit('close-product-modal');
      this.$root.$emit('filterSimilar', element);
      // window.location.href = this.$siteUrl(`/${this.currentMediaType}?sort=match&page=1&similar=${element.id}`).search().url();
    },
    ctaClick(url) {
      window.location.href = url;
    },
    includedFilesClick() {
      this.$root.$emit('show-modal', 'included-files');
    },
    // adminClick(modalId) {
    //   // TODO: do a double check if member is Admin
    //   this.$root.$emit('show-modal', modalId);
    // },
  },
};
</script>

<style lang="scss" scoped>
.btn-ver {
  .ver-label, .ver-price, .ver-price p {
    margin-bottom: 0;
  }

  .ver-label {
    font-weight: bold;
  }

  &.active {
    padding: 0.125rem 0.875rem;
    border-width: .125rem;
    border-color: $primary !important;
  }
}

.ver-price {
  line-height: 1.5;
}

.btn-actionable {
  margin-top: 0;
  &:not(:last-child) {
    margin-right: $spacer;
  }
}
</style>
