<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('product_page.fcpx_editable_title') }}
    </template>
    <div>
      <div class="row mb-3 align-items-center">
        <div class="col text-left text-sm-center">
          <font-awesome-icon
            :icon="['fas','me-fcp-edit']"
            size="3x"
            class="text-info"
          ></font-awesome-icon>
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <h4 class="h5">{{ $t('product_page.fcpx_editable_heading') }}</h4>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <div class="list-group mb-3">

            <div
              class="list-group-item"
              v-for="(count, placeholderType) in placeholders"
              :key="`placeholder-${placeholderType}`"
            >
              <span v-if="placeholderType === 'video'">
                {{ $t('product_page.{type}_placeholders', {type: $t('product.video') }) }}: {{ count }}
              </span>
              <span v-else-if="placeholderType === 'logo'">
                {{ $t('product_page.{type}_placeholders', {type: $t('product.logo') }) }}: {{ count }}
              </span>
              <span v-else-if="placeholderType === 'text'">
                {{ $t('product_page.{type}_placeholders', {type: $t('product.text') }) }}: {{ count }}
              </span>
            </div>
          </div>

          <ul class="small border py-3 pr-3 rounded mb-0">
            <li>
              <a :href="softwareUrl" target="_blank" rel="nofollow">
                {{ $t('product_page.what_is_{software}', {software: $t('term.final_cut_pro_x')}) }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'product-editable-in-fcp-modal',
  props: {
    element: Object,
  },
  data() {
    return {
    };
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  computed: {
    ...mapGetters({
      userLanguage: 'user/languageCode',
    }),
    softwareUrl() {
      // return affiliate url
      const affiliateID = '1000lMLq';

      const languageDir = this.toAppleLocale(this.userLanguage);

      // if (strpos($urlParts['path'], '/app/motion') !== false)
      // {
      //   return 'https://geo.itunes.apple.com' . '/' . $languageDir . '/app/motion/id434290957?mt=12&app=apps&at=' . $affiliateID;
      // }
      // elseif (strpos($urlParts['path'], '/app/final-cut-pro') !== false)
      // {
      return `https://geo.itunes.apple.com/${languageDir}/app/final-cut-pro/id424389933?mt=12&app=apps&at=${affiliateID}`;
      // }
    },
    placeholders() {
      // remove empty
      return _.pickBy(_.get(this.element, 'mediaTypeDetails.placeholders', {}));
    },
  },
  methods: {
    toAppleLocale(languageCode) {
      // remove empty
      switch (languageCode) {
        case 'ja':
          return 'jp';

        case 'zh-hant':
          return 'tw';

        case 'ko':
          return 'kr';

        case 'de':
        case 'th':
          return languageCode;

        default:
          return 'us';
      }
    },
  },
};
</script>
