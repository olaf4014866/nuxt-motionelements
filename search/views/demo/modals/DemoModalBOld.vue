<template>
  <Modal id="signup3-modal"
         size="lg"
         align="center"
         headerClass="pb-0"
         @init="onInit"
  >
    <template v-slot:header>
      33333
    </template>

    <div>
      SOME MODAL CONTENT
    </div>

  </Modal>
</template>

<script>
// import Modal from '@/components/ui/BaseModal.vue';
// import modalMixin from '@/components/mixins/modal.mixin';

export default {
  name: 'signup3-modal',
  // mixins: [modalMixin],
  props: {
  },
  components: {
    // Modal,
    Modal: () => import('@/components/ui/BaseModal.vue'),
  },
  computed: {
  },
  data() {
    return {
      // isShowLogin: false,
    };
  },
  mounted() {
    // bind a event let other component call
    // this.$root.$on('showLoginModal', () => {
    //   this.isShowLogin = true;
    // });
    // this.showLoginModal();
  },
  methods: {
    onInit() {
      this.$emit('init');
    },
    // getLocation() {
    //   return window.location.href;
    // },
    // showLoginModal() {
    //   console.log('sHOOOOOW');
    //   this.isShowLogin = true;
    //   $('#modal-login').modal('show');
    // },
  },
};
</script>
