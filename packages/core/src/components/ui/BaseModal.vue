<template>
  <div class="modal fade aaaa" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" v-bind:class="modalDialogClass" role="document">
      <div class="modal-content">
        <div class="modal-header" v-bind:class="headerClass">
          <slot name="header">
            <h5 class="modal-title">
              <slot name="title"></slot>
            </h5>
          </slot>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="!!$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-modal',
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
    // emit hide, hidden events
    console.log('hidesetup', `#${this.id}`);
    $(`#${this.id}`).on('hide.bs.modal', () => {
      this.$emit('hide');
      console.log('hide');
    }).on('hidden.bs.modal', () => {
      this.$emit('hidden');
      console.log('hidden');
    });
  },
};
</script>
