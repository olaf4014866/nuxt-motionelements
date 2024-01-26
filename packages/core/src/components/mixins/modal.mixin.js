import { mapState } from 'vuex';

// https://vuejs.org/v2/style-guide/#Private-property-names-essential
export default {
  data() {
    return {
      isShow: false,
      isReady: false,
    };
  },
  computed: {
    ...mapState({
      $_showModal: state => state.modal.show,
      $_currentModalId: state => state.modal.id,
    }),
    modalId() {
      return this.$options.name;
    },
  },
  mounted() {
    // if (this.$_showModal) {
    //   console.log('mounted, SHOW', `#${this.modalId}`);
    //   $(`#${this.modalId}`).modal('show');
    //   this.isShow = true;
    // }
  },
  methods: {
    onInit: function () {
      // if (this.$_showModal && this.$_currentModalId === this.modalId) {
      //   $(`#${this.modalId}`).modal('show');
      //   this.isShow = true;
      // }
    },
    onHide() {
      this.$emit('hide');
    },
    onChildMounted() {
      this.isReady = true;
      this.$emit('ready');
    },
  },
  watch: {
    /*
    $_showModal(value) {
      if (this.$_currentModalId === this.modalId && value) {
        $(`#${this.modalId}`).modal('show');
        this.isShow = true;
      } else if (this.isShow) {
        $(`#${this.modalId}`).modal('hide');
        this.isShow = false;
      }
    },
     */
  },
};
