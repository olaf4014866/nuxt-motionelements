<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" :class="modalDialogClass" role="document">
            <div class="modal-content">
                <div class="modal-header" :class="headerClass">
                    <slot name="header">
                        <h5 class="modal-title">
                            <slot name="title"></slot>
                        </h5>
                    </slot>
                    <!--          <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
                    <button type="button" class="close" @click="onClose()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div v-if="!!$slots.footer" :class="footerClass" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import modalMixin from '@/views/demo/modals/modal-vuex.mixin';

export default {
  // mixins: [modalMixin],
  props: {
    id: {
      type: String,
      required: false,
    },
    size: {
      type: String,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    align: {
      type: String,
    },
    headerClass: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    modalDialogClass: function () {
      let dialogClass = '';

      if (['xl', 'lg', 'sm'].includes(this.size)) {
        dialogClass = `modal-${this.size}`;
      }

      if (this.scrollable) {
        dialogClass += ' modal-dialog-scrollable';
      }

      if (this.align === 'center') {
        dialogClass += ' modal-dialog-centered';
      }

      return dialogClass;
    },
  },
  mounted() {
    console.log('child mounted', this.id);
    // this.$store.dispatch('modal/ready', this.id);
    this.$store.dispatch('modal/mounted', this.id);
    // this.$emit('mounted');
  },
  methods: {
    onClose() {
      console.log('clicked close');
      this.$store.dispatch('modal/hide');
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-dialog-scrollable {
  .modal-header {
    z-index:10;
  }
  .modal-body {
    z-index:0;
  }
}
</style>
