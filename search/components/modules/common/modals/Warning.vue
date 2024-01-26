<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content overflow-hidden">
        <!-- <div class="modal-header">
          <h5 class="modal-title">Just to confirm</h5>
        </div> -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="clearfix pt-3 text-center">
            <p>
              <font-awesome-icon
                :icon="['fas',warningIcon]"
                :class="`text-${type}`"
                size="4x"
                fixed-width
              ></font-awesome-icon>
            </p>
            <h4>
              <slot name="header">Are you sure?</slot>
            </h4>
            <p>
              <slot name="message">This action cannot be reverted.</slot>
            </p>
          </div>
        </div>
        <div class="modal-footer p-0 row no-gutter m-0">
          <button type="button" :class="`btn btn-${type} m-0 rounded-0 col-6`">
            <slot name="btn-confirm">Yes</slot>
          </button>
          <button type="button" class="btn btn-light m-0 rounded-0 col-6" data-dismiss="modal">
            <slot name="btn-cancel">No</slot>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
  },
  computed: {
    warningIcon() {
      switch (this.type) {
        case 'success':
          return 'thumbs-up';
        case 'warning':
          return 'exclamation-circle';
        case 'danger':
          return 'exclamation-triangle';
        default:
          return 'info';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
