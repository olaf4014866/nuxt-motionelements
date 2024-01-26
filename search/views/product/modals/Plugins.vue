<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('product_page.required_plugins_title') }}
    </template>
    <div>

      <div class="row mb-3 align-items-center">
        <div class="col text-left text-sm-center mb-3">
          <font-awesome-icon
            :icon="['fad','plug']"
            size="3x"
            class="text-primary"
          ></font-awesome-icon>
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <h4 class="h5">{{ $t('product_page.required_plugins_heading') }}</h4>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <div v-if="hasRequiredPlugins" class="list-group">
            <template v-for="plugin in element.mediaTypeDetails.pluginsRequired">

              <a v-if="plugin.url" :href="plugin.url" class="list-group-item list-group-item-action" :key="plugin.id">
                {{ plugin.name }}
                <font-awesome-icon
                  :icon="['far','external-link']"
                  fixed-width
                ></font-awesome-icon>
              </a>

              <span v-else class="list-group-item list-group-item-action" :key="plugin.id">
                {{ plugin.name }}
              </span>
            </template>
          </div>
          <!-- <span v-else-if="element.pluginsRequired.length === 0">{{ $t('product_page.text_no_plugins_required') }}</span> -->
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>

export default {
  name: 'product-plugins-modal',
  props: {
    element: Object,
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  data() {
    return {
    };
  },
  computed: {
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
  },
  methods: {
  },
};
</script>
