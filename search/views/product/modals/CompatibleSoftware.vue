<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('product_page.compatible_software_title') }}
    </template>

    <div v-if="isLoaded">
      <div v-for="software in compatibleSoftwares"
           :key="software.id"
           class="mb-6">
        <div class="row align-items-center">
          <div class="col text-left text-sm-center">
            <ProductIcon
              :productType="software.id"
              size="3x"
              class="text-info"
            />
          </div>
          <div class="col-12 col-sm-8 col-md-9 col-xl-10">
            <h4 class="h5">
              {{ software.name }}
            </h4>
          </div>
        </div>

        <div class="row justify-content-end">
          <div class="col-12 col-sm-8 col-md-9 col-xl-10">
            <div>
              <p v-if="!!_.get(software, 'backwardCompatible')">
                {{ $t('product_page.compatible_with_{version}_and_above', {version: renderCompatibleVersions(software) }) }}
              </p>
              <p v-else>
                {{ $t('product_page.compatible_with_{software}', {software: renderCompatibleVersions(software) }) }}
              </p>
              <ul v-if="_.get(software, 'html.url')"
                  class="small border py-3 pr-3 rounded mb-0">
                <!--
                <i18n path="cta.what_is_{url}" tag="li">
                  <template v-slot:url>
                    <a :href="software.html.url">{{ software.name }}</a>
                  </template>
                </i18n>
                -->
                <li>
                  <i18n path="product_page.do_not_have_required_software_version_text_{software}">
                    <template v-slot:software>
                      <a :href="software.html.url" target="_blank" rel="nofollow">
                        {{ software.name }}
                      </a>
                    </template>
                  </i18n>
                  <br>
                  <small v-if="['ae', 'pr'].includes(software.id)"
                         class="text-muted"
                         v-html="$t('product_page.{software}_compatible_with_all_templates', {software: software.name})">
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <LoaderSpin></LoaderSpin>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'product-software-modal',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    LoaderSpin: () => import('frontend-modules/shared/modules/common/LoaderSpin.vue'),
  },
  // data() {
  //   return {
  //   };
  // },
  computed: {
    ...mapState({
      compatibleSoftwares: state => state.product.current.compatibleSoftwares,
    }),
    isLoaded() {
      return this.compatibleSoftwares !== null;
    },
  },
  created() {
    this.$store.dispatch('product/getCompatibleSoftwares', {
      id: this.element.id,
    });
  },
  mounted() {
  },
  methods: {
    renderCompatibleVersions(software) {
      const versions = _.get(software, 'compatibleVersions');
      return Array.isArray(versions) ? versions.join(', ') : '';
    },
  },
};
</script>
