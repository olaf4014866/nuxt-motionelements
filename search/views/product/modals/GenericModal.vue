<template>
  <Modal :id="modalId" size="lg">
    <template v-slot:title>
      <slot name="header">
      </slot>
    </template>

    <div>
      <div
        class="row align-items-center"
        :class="this.$slots.content ? 'mb-3' : ''"
      >
        <div class="col text-left text-sm-center">
          <slot name="icon">
            <font-awesome-icon
              :icon="['fas','info-circle']"
              size="3x"
              class="text-info"
            ></font-awesome-icon>
          </slot>
        </div>
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <h4 class="h5">
            <slot name="title">
              Title here
            </slot>
          </h4>
        </div>
      </div>

      <div
        v-if="this.$slots.content"
        class="row justify-content-end">
        <div class="col-12 col-sm-8 col-md-9 col-xl-10">
          <slot name="content">
          </slot>
        </div>
      </div>
    </div>

  </Modal>
</template>

<script>
export default {
  name: 'modal-generic',
  props: {
    modalId: {
      type: String,
      required: true,
    },
  },
  components: {
    Modal: () => import('@/components/ui/BaseModal.vue'),
  },
};
</script>

<style lang="scss" scoped>

</style>
