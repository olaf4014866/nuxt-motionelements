<template>
  <div>

    <hr v-if="showExclusive || showSubscription || showVariantsFormats" />

    <div>
      <!-- Formats -->
      <template v-if="showVariantsFormats">
        <!-- 3D Formats -->
        <FeatureIconsItem>
          <template slot="icon">
            <font-awesome-icon
              :icon="['far', 'me-format']"
              fixed-width
              size="2x"
              class="mr-2"
              title="Formats"
            />
          </template>
          <template slot="label">
            {{ $t('product_page.included') }}
            <span
              v-for="variant in element.variants"
              :key="`format-${variant.format}`"
              class="badge badge-light mr-1"
            >
              {{ variant.format }}
            </span>
          </template>
        </FeatureIconsItem>
      </template>

      <!-- ME Exclusive -->
      <FeatureIconsItem
        v-if="showExclusive"
      >
        <template slot="icon">
          <SvgGradientFill :color="'primary'" />
          <font-awesome-icon
            size="2x"
            class="mr-2 text-gradient-primary"
            fixed-width
            :icon="['fas','me-diamond']"
          />
        </template>
        <template slot="label">
          {{ $t('product_page.text_exclusive') }}
        </template>
      </FeatureIconsItem>

      <!-- Is available for subscription download -->
      <FeatureIconsItem
        v-if="showSubscription"
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
            :class="{ 'text-info font-weight-bold' : !hasUnlimitedSubscription }"
          >
            <nuxt-link
              class="text-info"
              :to="`$link('/subscribe').param('intended_url', this.$store.getters['route/fullPath']).url()`"
            >
              {{ $t('product_page.text_available_via_subscription') }}
            </nuxt-link>
          </span>
        </template>
      </FeatureIconsItem>
    </div>

    <FeatureIcons
      v-if="element"
      :element="element"
    />

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { isElementVariantDownloadableBySubscription } from '@/services/download.service.js';
import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

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
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      memberSubscriptions: state => state.user.member.subscriptions,
    }),
    ...mapGetters({
      hasUnlimitedSubscription: 'user/hasUnlimitedSubscription',
    }),
    selectedVariant() {
      if (!this.currentSku) {
        return null;
      }
      return this.element.variants.find(variant => variant.id === this.currentSku);
    },
    isSubscriber() {
      return isElementVariantDownloadableBySubscription(this.element, this.selectedVariant, this.memberSubscriptions);
    },
    showSubscription() {
      return this.element.subscription && !this.hasUnlimitedSubscription;
    },
    showExclusive() {
      return this.element.exclusive === true;
    },
    showVariantsFormats() {
      return false;
    },
  },
  methods: {
    isProductType(mediaType) {
      return isProductType(mediaType, this.element.mediaType);
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
