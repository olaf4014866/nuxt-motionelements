<template>
  <div>

    <section
      ref="sectionPreview"
      class="w-100 overflow-hidden"
    >
      <template v-if="previewType == 'template'">
        <PreviewLarge
          v-if="element"
          :element="element"
          class="pb-3"
          :key="`preview-large-${element.id}`"
        ></PreviewLarge>
      </template>

      <template v-if="previewType == 'audio'">
        <PreviewAudio
          v-if="element"
          :apiData="apiData"
          :element="element"
          :layoutVertical="false"
          class="pb-3"
          :key="`preview-audio-${element.id}`"
        ></PreviewAudio>
      </template>

      <div v-if="previewType == 'video'" class="px-3 pb-3">
        <PreviewSmall
          v-if="element"
          :element="element"
          :apiData="apiData"
          :key="`preview-small-${element.id}`"
        ></PreviewSmall>
      </div>

    </section>

    <section ref="sectionContent">
      <div class="container">
        <div class="row flex-column-reverse">
          <div class="col-12">
            <SectionTitle :element="getElementData"></SectionTitle>

            <SectionCtaModal
              v-if="getApiData"
              :element="getElementData"
            ></SectionCtaModal>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row flex-column-reverse">
          <div class="col-12">
            <!-- Detail Specs Section -->
            <SectionProductInfo
              class="section-product-info"
            >
              <template #heading>
                {{ $t('product_details.details') }}
              </template>

              <SectionDetailsMobile
                v-if="getApiData"
                :element="getApiData"
              ></SectionDetailsMobile>

            </SectionProductInfo>
          </div>
        </div>
      </div>
    </section>


    <!-- All modals -->
    <div>

      <Purchase v-if="getElementData"
        id="confirm-purchase"
        :element="getElementData"
      ></Purchase>

      <ShareSheet
        id="share-sheet"
      ></ShareSheet>

      <GenericModal
        id="template-universalized"
      >
        <template slot="header">
          {{ $t('product_details.compitable_all_lang') }}
        </template>
        <template slot="icon">
          <font-awesome-icon
            :icon="['fal','language']"
            size="3x"
            class="text-info"
          ></font-awesome-icon>
        </template>
        <template slot="title">
          {{ $t('product_details.compitables_{product}') }}
        </template>
        <template slot="content">
          <p>{{ $t('product_details.compitables_{product}_convert') }}</p>
        </template>
      </GenericModal>

      <GenericModal
        id="vr-scopic"
      >
        <template slot="header">
          {{ $t('product_details.stereo_3d') }}
        </template>
        <template slot="icon">
          <font-awesome-icon
            :icon="['fal','me-vr-stereo']"
            size="3x"
            class="text-info"
          ></font-awesome-icon>
          <!-- stereo: 'me-vr-stereo' | mono: 'me-vr-mono' -->
        </template>
        <template slot="title">
          {{ $t('product_details.vr_stereo_3d') }}
        </template>
      </GenericModal>

      <GenericModal
        id="music-pro"
      >
        <template slot="header">
          {{ getElementData.isPro ? 'P.R.O. Registered' : 'Non-P.R.O. Registered' }}
        </template>
        <template slot="icon">
          <font-awesome-icon
            :icon="['far',`me-${getElementData.isPro ? 'pro' : 'non-pro'}-rectangle`]"
            size="3x"
            class="text-info"
          ></font-awesome-icon>
        </template>
        <template slot="title">
          {{ getElementData.isPro ? 'P.R.O. Registered' : 'Non-P.R.O. Registered' }}
        </template>
        <template slot="content">
          <p>
            <template v-if="getElementData.isPro">
              {{ $t('product_details.is_pro') }}
            </template>
            <template v-if="!getElementData.isPro">
              {{ $t('product_details.not_pro') }}
            </template>
          </p>

          <ul v-if="getElementData.isPro" class="small border py-3 pr-3 rounded mb-0">
            <li v-html="$t('product_details.what_is_pro_{url}', {url: $site('https://help.motionelements.com/hc/articles/206375041').url()})"></li>
          </ul>
        </template>
      </GenericModal>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'template-product-page',
  components: {
    PreviewLarge: () => import('@/components/modules/product/preview/PreviewLarge.vue'),
    PreviewSmall: () => import('@/components/modules/product/preview/PreviewSmall.vue'),
    PreviewAudio: () => import('@/components/modules/product/preview/PreviewAudio.vue'),

    SectionTitle: () => import('@/components/modules/product/SectionTitle.vue'),
    SectionCtaModal: () => import('@/components/modules/product/SectionCta.Modal.vue'),
    SectionProductInfo: () => import('@/components/modules/product/SectionProductInfo.vue'),
    SectionDetailsMobile: () => import('@/components/modules/product/details/SectionDetails.Mobile.vue'),

    Purchase: () => import('@/components/modules/product/modals/Purchase.vue'),

    GenericModal: () => import('@/components/modules/product/modals/GenericModal.vue'),
    ShareSheet: () => import('@/components/modules/product/modals/ShareSheet.vue'),
  },
  props: {
    element: Object,
  },
  data() {
    return {
      apiData: null,
      highResStillUrl: '',
    };
  },
  created() {
    this.apiData = this.element;
    this.getProductDetail();
  },
  watch: {
    element: {
      handler: function () {
        this.apiData = null;
        this.apiData = this.element;
        this.getProductDetail();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      // isAdmin: state => state.member.isAdmin,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    getApiData() {
      return this.apiData ? this.apiData : null;
    },
    getElementData() {
      return this.apiData ? this.apiData : this.element;
    },
    previewType() {
      let mediatype = this.getElementData.mediaType ? this.getElementData.mediaType.replace('_', '-') : this.element.mediaType.replace('_', '-');
      if (mediatype.indexOf('_') < 0) {
        mediatype = _.kebabCase(mediatype);
      }
      switch (mediatype) {
        case 'ae-template':
        case 'ae-preset':
        case 'ae-script':
        case 'motion-template':
        case 'pr-template':
        case 'pr-preset':
        case 'mg-template':
        case 'video-vr':
        case 'photo-vr':
          return 'template';
        case 'music':
        case 'sfx':
          return 'audio';
        default:
          return 'video';
      }
    },
    // displayCategories() {
    //   if (this.apiData.genres) {
    //     return this.apiData.genres;
    //   }
    //   return this.apiData.categories;
    // },
  },
  mounted() {
    this.$root.$on('show-modal', (modalId, stillUrl = '') => {
      this.highResStillUrl = stillUrl;
      $(`#${modalId}`).modal('show');
    });
  },
  beforeDestroy() {
    this.apiData = {};
  },
  methods: {
    // switchElement(index) {
    //   this.element = this.elements[index];
    // },
    getProductDetail() {
      this.$store.dispatch('site/getProductDetails', this.element.id).then((data) => {
        this.apiData = Object.freeze(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
