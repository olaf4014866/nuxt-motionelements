<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header">
              Header here
            </slot>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div
            class="row align-items-center"
            :class="this.$slots.content ? 'mb-3' : ''"
          >
            <div class="col text-left text-sm-center">
              <slot name="icon">
                <font-awesome-icon
                  :icon="['fas','info-circle']"
                  size="3x"
                  class="text-info"
                ></font-awesome-icon>
              </slot>
            </div>
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <h4 class="h5">
                <slot name="title">
                  Title here
                </slot>
              </h4>
            </div>
          </div>

          <div
            v-if="this.$slots.content"
            class="row justify-content-end">
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <slot name="content">
              </slot>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-generic',
};
</script>

<style lang="scss" scoped>

</style>
