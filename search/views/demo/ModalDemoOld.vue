<template>
  <div>
    <section>
      <div class="container py-5">
        <button @click="onClick1" class="btn btn-primary">
          Show Modal 1</button>

        <button @click="onClick2" class="btn btn-primary">
          Show Modal 2</button>
      </div>
    </section>
  </div>
</template>


<script>
// import ModalContent from '@/views/demo/ModalContent.vue';
// import LoaderSpin from 'frontend-modules/shared/modules/common/LoaderSpin.vue';
// https://medium.com/js-dojo/vue-js-manage-your-modal-window-s-effortlessly-using-eventbus-518977195eed
// https://vueschool.io/articles/vuejs-tutorials/async-vuejs-components/

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
  },
  methods: {
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

      const ModalContent = () => ({
        component: import('@/views/demo/modals/DemoModalA.vue'),
        // loading: LoaderSpin,
      });

      // Insert the Book module here
      this.$store.dispatch('modal/show', {
        component: ModalContent,
        title: 'asasasasa',
        props: { text: 'foooooo' },
      });

      console.log('showModal');
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

      const ModalContent = () => ({
        component: import('@/views/demo/modals/DemoModalB.vue'),
        // loading: LoaderSpin,
      });

      // Insert the Book module here
      this.$store.dispatch('modal/show', {
        component: ModalContent,
        title: 'asasasasa',
        props: { text: 'foooooo' },
      });

      console.log('showModal');
    },
  },
};
</script>
