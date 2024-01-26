<template>
  <Modal
    size="xl"
  >
  <template v-slot:title>
      {{element.name}}
    </template>
    <div>
      <img
        :src="this.highResStillUrl"
        class="d-block img-fluid mx-auto"
      />
    </div>
  </Modal>
</template>

<script>

export default {
  name: 'product-still-preview-modal',
  props: {
    element: Object,
    highResStillUrl: String,
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

<style lang="scss" scoped>

</style>
