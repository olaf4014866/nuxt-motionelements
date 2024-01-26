<template>
  <div>
    <section>
      <div class="container py-5">
        <button @click="onClick1" class="btn btn-primary">
          Show Modal 1
        </button>

        <button @click="onClick2" class="btn btn-primary">
          Show Modal 2
        </button>

        <div>
          isShow: {{ isShow }}<br>
          isMounted: {{ isMounted }}<br>
          {{ component }}
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'test',
  components: {
    // ModalContent: () => import('@/views/demo/ModalContent.vue'),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      // isShow: state => state.modal.show,
      // modalId: state => state.modal.id,
      // isReady: state => state.modal.isReady,
      component: state => state.modal.component,
      props: state => state.modal.props,
      // events: state => state.modal.events,
    }),
    ...mapGetters({
      isShow: 'modal/isShow',
      isMounted: 'modal/isMounted',
    }),
  },
  methods: {
    dispatchShowModal(modalComponent) {
      this.$store.dispatch('modal/show', {
        component: modalComponent,
        props: {
          // id: 'modal-a',
        },
      });
    },
    showCompatibleSoftwareModal() {
      const modal = () => ({
        component: import('@/views/product/modals/CompatibleSoftware.vue'),
      });
      this.dispatchShowModal(modal);
    },
    onClick1() {
      // $('#aaa-modal').modal('show', {
      //   component: ModalContent,
      //   props: { text: 'foooooo' },
      // });
      // dynamically load content on click

      // const ModalContent = () => ({
      //   component: import('@/views/demo/ModalContent.vue'),
      //   // loading: LoaderSpin,
      // });

      // const ModalContent = () => ({
      //   component: import('@/views/demo/modals/DemoModalA.vue'),
      //   // loading: LoaderSpin,
      // });
      //
      // // Insert the Book module here
      // this.$store.dispatch('modal/show', {
      //   component: ModalContent,
      //   title: 'asasasasa',
      //   props: { text: 'foooooo' },
      // });
      //
      // console.log('showModal');

      const modal = () => ({
        component: import('@/views/demo/modals/DemoModalA.vue'),
        // component: import('@/views/product/modals/CompatibleSoftware.vue'),
      });
      this.$store.dispatch('modal/show', {
        component: modal,
        props: {
        },
      });


      // this.dispatchShowModal(modal);
    },
    onClick2() {
      // $('#aaa-modal').modal('show', {
      //   component: ModalContent,
      //   props: { text: 'foooooo' },
      // });
      // dynamically load content on click

      // const ModalContent = () => ({
      //   component: import('@/views/demo/ModalContent.vue'),
      //   // loading: LoaderSpin,
      // });

      // const ModalContent = () => ({
      //   component: import('@/views/demo/modals/DemoModalB.vue'),
      //   // loading: LoaderSpin,
      // });
      //
      // // Insert the Book module here
      // this.$store.dispatch('modal/show', {
      //   component: ModalContent,
      //   title: 'asasasasa',
      //   props: { text: 'foooooo' },
      // });
      //
      // console.log('showModal');
      const modal = () => ({
        component: import('@/views/demo/modals/DemoModalB.vue'),
        // component: import('@/views/product/modals/CompatibleSoftware.vue'),
      });
      this.$store.dispatch('modal/show', {
        component: modal,
        props: {
        },
      });
      // this.dispatchShowModal(modal);

      // $('#root-modal').modal('show');
    },
  },
};
</script>
