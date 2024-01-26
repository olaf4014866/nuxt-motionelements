<template>
    <div>
        <!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
        <!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
        <!--        <Modal id="root-modal"></Modal>-->
        <component id="root-modal"
                   :is="component"
                   v-bind="props"
                   @hide="onHide"
                   @submit="onSubmit"
        />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

// https://medium.com/js-dojo/vue-js-manage-your-modal-window-s-effortlessly-using-eventbus-518977195eed

export default {
  name: 'the-modal-wrapper',
  data() {
    return {
      // component: null,
      // title: '',
      // props: null,
    };
  },
  components: {
    // Modal: () => import('@/components/ui/BaseModal.vue'),
    // Modal: () => import('@/views/demo/modals/DemoModal2020A.vue'),
  },
  computed: {
    ...mapState({
      // isShow: state => state.modal.show,
      modalId: state => state.modal.id,
      // isReady: state => state.modal.isReady,
      component: state => state.modal.component,
      props: state => state.modal.props,
      events: state => state.modal.events,
    }),
    ...mapGetters({
      isShow: 'modal/isShow',
      // isReady: 'modal/isReady',
      isMounted: 'modal/isMounted',
    }),
  },
  created() {
    // ModalBus.$on('open', ({ component, title = '', props = null }) => {
    //   this.component = component;
    //   this.title = title;
    //   this.props = props;
    // });
    // document.addEventListener('keyup', this.handleKeyup);
  },
  beforeDestroy() {
    // document.removeEventListener('keyup', this.handleKeyup);
  },
  methods: {
    // onClose() {
    //   this.component = null;
    // },
    onHide: function () {
      // console.log('dispatch modal/hide');
      this.$store.dispatch('modal/hide');
    },
    /*
            onReady: function () {
              //   console.log('childMountedShow', this.isShow);
              if (this.isShow && this.isReady) {
                // console.log('shooow3');
                $('#root-modal').modal('show');
              }

              $('#root-modal').on('hidden.bs.modal', () => {
                // Destroy modal
                console.log('hidden modal');
                // $('#root-modal').modal('dispose');
              });
            },

               */
    onSubmit: function (params) {
      // console.log('caught wrapper onSubmit222', params, this.events);
      if (_.has(this.events, 'onSubmit')) {
        // console.log('caught wrapper onSubmit333', params);
        return this.events.onSubmit(params);
      }
    },
  },
  // components: { Modal },
  watch: {
    isMounted(value) {
      if (value) {
        // console.log('root modal: mounted', value);
        if (this.isShow) {
          // console.log('root modal: show', value);
          $('#root-modal').modal('show');
        }

        // $('#root-modal').on('hidden.bs.modal', () => {
        //   // Destroy modal
        //   console.log('hidden modal');
        //   // $('#root-modal').modal('dispose');
        // });
      }
    },
    isShow(value) {
      // console.log('root modal: isShow?', this.modalId, value);
      if (value) {
        if (this.isMounted) {
          $('#root-modal').modal('show');
        }
        // this.isShow = true;
      } else {
        // console.log('root modal: hide', value);
        // $('#root-modal').on('hidden.bs.modal', () => {
        //   // Destroy modal
        //   console.log('hidden modal');
        //   // $('#root-modal').modal('dispose');
        // });
        $('#root-modal').modal('hide');
        // this.isShow = false;
      }
    },
    // showModal(value) {
    //   console.log('showModal', value);
    //   if (value) {
    //     $('#root-modal').modal('show');
    //     this.isShow = true;
    //   // } else if (this.isShow) {
    //   } else {
    //     console.log('hide root');
    //     $('#root-modal').modal('hide');
    //     this.isShow = false;
    //   }
    // },
  },
};
</script>
