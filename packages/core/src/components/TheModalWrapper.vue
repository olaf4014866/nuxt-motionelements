<template>
    <div>
        <!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
        <!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
        <component id="root-modal"
                   :is="component"
                   v-bind="props"
                   @hide="onHide"
                   @ready="onReady"
                   @submit="onSubmit"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';

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
  computed: {
    ...mapState({
      isShow: state => state.modal.show,
      component: state => state.modal.component,
      props: state => state.modal.props,
      events: state => state.modal.events,
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
      console.log('dispatch modal/hide');
      this.$store.dispatch('modal/hide');
    },
    onReady: function () {
      //   console.log('childMountedShow', this.isShow);
      if (this.isShow) {
        // console.log('shooow3');
        $('#root-modal').modal('show');
      }
    },
    onSubmit: function (params) {
      console.log('caught wrapper onSubmit222', params, this.events);
      if (_.has(this.events, 'onSubmit')) {
        console.log('caught wrapper onSubmit333', params);
        return this.events.onSubmit(params);
      }
    },
  },
  // components: { Modal },
  watch: {
    isShow(value) {
      console.log('showModal2', value);
      if (value) {
        $('#root-modal').modal('show');
        // this.isShow = true;
      } else {
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
