<template>
  <div>
<!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
<!--  <Modal id="root-modal" :isOpen="!!component" :title="title" @hide="onHide">-->
<!--    AAAA-->
    <component id="root-modal"
      :is="component"
      v-bind="props"
      @hide="onHide"
      @ready=onReady
    />
<!--  </Modal>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';

// https://medium.com/js-dojo/vue-js-manage-your-modal-window-s-effortlessly-using-eventbus-518977195eed

export default {
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
  },
  // components: { Modal },
  watch: {
    showModal(value) {
      if (value) {
        $('#root-modal').modal('show');
        this.isShow = true;
      } else if (this.isShow) {
        $('#root-modal').modal('hide');
        this.isShow = false;
      }
    },
  },
};
</script>
