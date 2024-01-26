<template>
  <div>

    <hr v-if="element.exclusive === true || element.subscription === true" />

    <div>
      <!-- ME Exclusive -->
      <FeatureIconsItem
        v-if="element.exclusive === true"
      >
        <template slot="icon">
          <SvgGradientFill :color="'primary'" />
          <font-awesome-icon
            size="2x"
            class="mr-2 text-gradient-primary"
            fixed-width
            :icon="['fas','me-diamond']"
          ></font-awesome-icon>
        </template>
        <template slot="label">
          {{ $t('product_page.text_exclusive') }}
        </template>
      </FeatureIconsItem>

      <!-- Is available for subscription download -->
      <FeatureIconsItem
        v-if="element.subscription"
      >
        <template slot="icon">
          <SvgGradientFill :color="'subscription'" />
          <font-awesome-icon
            size="2x"
            class="mr-2 text-gradient-subscription"
            fixed-width
            :icon="['fas','me-lightning']"
          />
        </template>
        <template slot="label">
          <span
            :class="{ 'text-info font-weight-bold' : !isSubscription }"
          >
            {{ $t('product_page.text_available_via_subscription') }}
          </span>
        </template>
      </FeatureIconsItem>
    </div>

    <FeatureIcons
      :element="element"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'featured-icons',
  components: {
    SvgGradientFill: () => import('@/components/modules/common/SvgGradientFill.vue'),
    FeatureIcons: () => import('@/views/product/element/cta/FeatureIcons.vue'),
    FeatureIconsItem: () => import('@/views/product/element/cta/FeatureIconsItem.vue'),
  },
  props: {
    element: {
      type: Object,
      required: true,
    },
    relationships: Object,
  },
  data() {
    return {
      sku: false,
      selectedSku: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      isAdmin: state => state.member.isAdmin,
      isSubscription: state => state.member.isSubscription,
      memberCredits: state => state.member.credits,
    }),
    versionsArray() {
      if (this.element.variants) {
        return Object.keys(this.element.variants);
      }
      return [];
    },
    // by marksun
    // simplify main parameters and change in api
    hasArchiveEntries() {
      return !!_.get(this.element, 'mediaTypeDetails.archiveEntries');
    },
    hasReadme() {
      if (_.has(this.element, 'tutorials')) {
        return this.element.tutorials.find(x => x.format === 'readme');
      }
      return false;
    },
    hasRelatedElements() {
      return _.has(this, 'relationships.relatedElements.data');
    },
    // end by marksun
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
      if (this.element.variants) {
        return Object.keys(this.element.variants);
      }
      return [];
    },
    currencySymbol() {
      const mapCurrencies = this.$store.getters['site/mapCurrencies'];
      const currentCurrency = this.$store.getters['site/currentCurrency'];
      const currencyInfo = mapCurrencies[currentCurrency];
      if (currencyInfo) {
        return currencyInfo.symbol;
      }
      return 'US$';
    },
    selectedProduct() {
      if (!this.selectedSku) {
        return {};
      }
      return this.element.variants.find(variant => variant.id === this.selectedSku);
    },
    creditsShortfall() {
      if (_.has(this.selectedProduct, 'credits')) {
        return this.selectedProduct.credits - this.memberCredits;
      }
      return 0;
    },
    isFree() {
      if (this.element.variants.length === 1 && this.element.free) {
        return true;
      }
      const selectedVariant = this.element.variants.find(variant => variant.id === this.sku);
      if (selectedVariant.price === '0') {
        return true;
      }
      return false;
    },
  },
  methods: {
    onInsufficientCredits() {
      console.log('insufficient');
    },
    onSelectVariant(id) {
      this.sku = id;
      this.selectedSku = id;
    },
    ctaClick() {
      if (this.element.mediaType === 'gif') {
        // for GIF, open Gif Creator Modal
        this.$root.$emit('show-modal', 'gif-creator');
      } else {
        // normal purchase flow
        this.$emit('select-download', this.selectedSku);
        // this.$root.$emit('show-modal', 'modal-confirm-purchase', this.sku);
      }
    },
    download() {
      if (!this.sku) {
        this.sku = this.element.id;
        // console.error('select sku!');
        // return;
        if (this.element.variants) {
          this.sku = this.element.variants[this.versions[0]].id;
        }
      }

      if (!this.isMember) {
        this.$store.dispatch('modal/showSignUp');
        return;
      }
      // console.log(this.getSubscriptions);
      // const param = new FormData();
      // param.append('sku', this.sku);

      // if (this.isFree) {
      //   this.$root.$emit('show-modal', 'free-download', this.sku);
      // } else {
      // this.$root.$emit('show-modal', 'confirm-purchase-modal', this.sku);
      this.$emit('select-download', this.selectedSku);
      // }
    },
    addFavorites() {
      this.$bus.$emit('product-favorited', this.element);
    },
    includedFilesClick() {
      this.$root.$emit('show-modal', 'included-files');
    },
    downloadReadme() {
      const readme = this.element.tutorials.find(x => x.format === 'readme');
      window.open(readme.url);
    },
    openTutorial() {
      const video = this.element.tutorials.find(x => x.format === 'video');
      window.open(video.url);
    },
    adminClick(modalId) {
      // TODO: do a double check if member is Admin
      this.$root.$emit('show-modal', modalId);
    },
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
</style>
