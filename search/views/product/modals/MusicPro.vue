<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ isPro ? $t('product.pro') : $t('product.non_pro') }}
    </template>

    <div>
      <div
        class="row align-items-center mb-3"
      >
        <div class="col text-left text-sm-center">
          <font-awesome-icon
            :icon="['far',`me-${element.usageRights.pro ? 'pro' : 'non-pro'}-rectangle`]"
            size="3x"
            class="text-info"
          ></font-awesome-icon>
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <h4 class="h5">
            {{ isPro ? $t('product_page.pro_heading') : $t('product_page.non_pro_heading') }}
          </h4>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <p>
            <template v-if="element.usageRights.pro">
              {{ $t('product_page.pro_text') }}
            </template>
            <template v-if="!element.usageRights.pro">
              {{ $t('product_page.non_pro_text') }}
            </template>
          </p>

          <ul v-if="this.element.usageRights.pro" class="small border py-3 pr-3 rounded mb-0">
            <i18n path="cta.what_is_{url}" tag="li">
              <template v-slot:url>
                <a :href="$site('https://help.motionelements.com/hc/articles/206375041').url()">{{ $t('product.pro') }}</a>
              </template>
            </i18n>
          </ul>
        </div>
      </div>
    </div>

  </Modal>
</template>

<script>

export default {
  name: 'product-music-pro-modal',
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
    isPro() {
      // important info, use _.get
      // don't display if null or undefined
      const v = _.get(this.element, 'usageRights.pro');
      return v === true || v === false ? v : null;
    },
  },
  methods: {
  },
};
</script>
