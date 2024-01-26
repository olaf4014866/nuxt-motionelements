<template>
  <section
    class="bg-light lt py-3"
  >
    <div class="container d-flex justify-content-between align-items-center">
      <p class="mb-0">
        <template v-if="publishedAt">
          <!-- TODO fr JZ: Add Published Status -->
          <span class="badge badge-success mr-2">
            {{ $t('product.published') }}
          </span>
          <span class="text-muted small">
            <TimeSince
              :lang="userLanguage"
              :date="publishedAt"
            />
          </span>
        </template>
        <template v-else>
          <span class="badge badge-gray mr-2">
            {{ $t('product.draft') }}
          </span>
          <span class="text-muted small">
          </span>
        </template>

        <span v-if="isPreviewMode"
          class="badge badge-info badge-outline"
        >
          {{ $t('product_page.preview_mode') }}
        </span>

      </p>
      <p class="mb-0">
        <a
          v-if="editUrl"
          :href="editUrl"
          class="btn btn-primary"
        >
          <font-awesome-icon
            :icon="['far','pencil']"
          /> {{ $t('cta.edit') }}
        </a>
      </p>
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex';

export default {
  name: 'product-admin-bar',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    TimeSince: () => import('@motionelements/core/src/components/ui/BaseTimeSince.vue'),
  },
  computed: {
    ...mapState({
      userLanguage: state => state.user.language,
    }),
    publishedAt() {
      return _.get(this.product, 'publishedAt');
    },
    isPreviewMode() {
      return !!this.$route.query.preview;
    },
    editUrl() {
      switch (_.get(this.product, 'object')) {
        case 'collection':
          return this.$link(`/artist/collection/edit?sku=${this.product.id}`).url();
        case 'element':
          return this.$link(`/artist/element/editor/${this.product.id}`).url();
        default:
          return null;
      }
    },
  },
  methods: {
  },
};
</script>
