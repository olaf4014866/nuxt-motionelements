<template>
  <div>
    <!-- Actionable Modals -->
    <!-- <div v-if="element && element.mediaType === 'gif'">
      <GifCreator
        id="gif-creator"
        ref="modalGifCreator"
        :element="element"
      ></GifCreator>
    </div> -->

<!--    <ShareModal-->
<!--      :product="product"-->
<!--    />-->

    <!--    <DownloadModal-->
    <!--      :sku="selectedVariantSku"-->
    <!--      :element="element"-->
    <!--    />-->


    <!-- Feature Icon and Warning Modals -->


    <HighResStillPreview
      modalId="still-preview"
      ref="modalStillPreview"
      v-if="element"
      :element="element"
      :highResStillUrl="modalParam"
    />

  </div>
</template>


<script>
import { mapState } from 'vuex';

import {
  isProductType,
  getMediaTypeGroup,
} from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'product-modals',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    HighResStillPreview: () => import('@/views/product/modals/HighResStillPreview.vue'),
  },
  data() {
    return {
      isRemoved: false,
      isNotFound: false,
      relationships: {},
      relateElement: {
        data: [],
      },
      page: 0,
      perPage: 0,
      modalParam: '',
      mediatype: '',
      similar: [],
      sameCategory: [],
      sameArtist: [],
      isShow: 'similar',
      isFree: false,
      includedFiles: [],
      expandMoods: false,
      expandCategories: false,
      expandKeywords: false,
      maxKeywords: 5,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      member: state => state.member,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
      selectedVariantSku: state => state.product.current.variantSku,
    }),
    product() {
      return this.element;
    },
    // by marksun
    isPro() {
      // important info, use _.get
      // don't display if null or undefined
      const v = _.get(this.element, 'usageRights.pro');
      return v === true || v === false ? v : null;
    },
    isUniversalized() {
      return this.mediaTypeGroup === 'ae' && _.get(this.element, 'mediaTypeDetails.universalized');
    },
    hasRequiredPlugins() {
      const v = _.get(this.element, 'mediaTypeDetails.pluginsRequired');
      if (v === false) {
        return false;
      }
      if (!_.isEmpty(v)) {
        return true;
      }
      return null;
    },
    mediaType() {
      return this.element.mediaType;
    },
    mediaTypeGroup() {
      return getMediaTypeGroup(this.element.mediaType);
    },
    isVideoTemplate() {
      return isProductType('video_template', this.element.mediaType);
    },
    isVr() {
      return isProductType('vr', this.element.mediaType);
    },
    // end by marksun
    isTutorial() {
      if (this.element.tutorials) {
        return this.element.tutorials.find(x => x.format === 'video');
      }
      return false;
    },
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
