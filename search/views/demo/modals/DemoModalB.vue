<template>
  <Modal
    :id="$options.name"
    size="sm"
  >
    <template v-slot:title>
      {{ $options.name }}
    </template>

    <div>
      <p>This is modal content 222.</p>
      <button class="btn btn-primary" @click="onClose">Close</button>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';
// import modalMixin from '@motionelements/core/src/components/mixins/modal.mixin';

export default {
  name: 'demo-modal-2',
  // mixins: [modalMixin],
  props: {
  },
  components: {
    // Modal: () => import('@/components/ui/BaseModal.vue'),
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  // data() {
  //   return {
  //   };
  // },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    onHide() {
      console.log('HIDE');
    },
    onClose() {
      console.log('clicked close');
      this.$store.dispatch('modal/hide');
    },
  },
  watch: {
    isReady(value) {
      if (value) {
        console.log('is ready');
      }
    },
  },
};
</script>
