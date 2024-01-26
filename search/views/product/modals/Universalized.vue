<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('product_page.universalized_title') }}
    </template>
    <div>
      <div
        class="row align-items-center mb-3"
      >
        <div class="col text-left text-sm-center">
          <font-awesome-icon
            :icon="['fal','language']"
            size="3x"
            class="text-info"
          />
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <h4 class="h5">
            {{ $t('product_page.universalized_heading') }}
          </h4>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          {{ $t('product_page.universalized_text') }}
        </div>
      </div>
    </div>

  </Modal>
</template>

<script>

export default {
  name: 'product-universalized-modal',
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
  },
  methods: {
  },
};
</script>
