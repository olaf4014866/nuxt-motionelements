<template>
  <div>

    <!--    <PurchaseModal-->
    <!--      :collection="collection"-->
    <!--    />-->

    <ShareModal
      :product="product"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'collection-modals',
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
  components: {
    // PurchaseModal: () => import('@/views/product/modals/PurchaseCollection.vue'),
    ShareModal: () => import('@/views/product/modals/Share.vue'),
  },
  data() {
    return {
      sameArtist: [],
      isShow: 'similar',
      isFree: false,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      member: state => state.member,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
      selectedProductSku: state => state.product.sku,
    }),
    product() {
      return this.collection;
    },
  },
  mounted() {
  },
  methods: {
    redirectToCreditsPage() {
      // redirect to credit page
      // const redirectUrl = new URL(this.$siteUrl(`credits?credits=${this.topUpCredits}&return=${window.location.href}`).url());
      // // const redirectUrl = new URL(`${process.env.VUE_APP_SITE_URL}/credits?credits=${this.topUpCredits}&return=${window.location.href}`);
      // console.info(`you have no credits, please buy credits before buy elements:${redirectUrl.toString()}`);
      // window.location.href = redirectUrl.toString();
      console.info('you have no credits, please buy credits before buy elements');

      // const params = new URLSearchParams();
      //
      // // params.set('credits', this.topUpCredits);
      // params.set('credits', 20);
      // params.set('return', window.location.href);

      this.$router.push({
        path: '/credits',
        // params: params,
        query: {
          credits: 20,
          return: window.location.href,
        },
      });
    },
    onInsufficientCredits(data) {
      console.log('onInsufficientCredits', data);
      console.log('show credits purchase');
      this.redirectToCreditsPage();
    },
    sameCategoryLink(element) {
      const catId = [];
      element.categories.forEach((e) => {
        catId.push(e.id);
      });
      if (catId.length) {
        return this.$siteUrl(`/${this.currentMediaType.replace('_', '-')}?sort=match&page=1&cat=${catId.join(',')}`).search().url();
      }
    },
    sameModel(element) {
      return this.$siteUrl(`/${this.currentMediaType.replace('_', '-')}?sort=match&page=1&similar=${element.id}`).search().url();
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-keywords {
    &:not(:last-child) {
      margin-right: map-get($spacers, 1)
    }
  }

  .pre-formatted {
    white-space: pre-wrap;
  }

  // SIZING RECOMMENDED ELEMENTS

  .card-element-recommended {
    width: 100%;

    @include media-breakpoint-between(sm,lg) {
      width: calc(50% - #{$spacer}) !important;
    }

    @include media-breakpoint-up(xl) {
      width: calc(33% - #{$spacer}) !important;
    }
  }
</style>
