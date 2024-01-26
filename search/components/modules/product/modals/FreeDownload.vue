<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Free Download
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
              <font-awesome-icon
                :icon="['far','info-circle']"
                size="3x"
                class="text-muted"
              ></font-awesome-icon>
            </div>
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <h4 class="h5">
                <slot name="title">
                  <!-- TODO fr JZ : Add actual remaining count here-->
                  <!-- TODO fr JZ : Add no more remaining message here-->
                  You have <span class="text-primary font-weight-bold">1000</span> remaining free downloads for the week.
                </slot>
              </h4>
            </div>
          </div>

          <div
            class="row justify-content-end">
            <div class="col-12 col-sm-8 col-md-9 col-xl-10">
              <!-- TODO fr JZ: add actual download link here -->
              <a
                href="#"
                class="btn btn-primary"
              >
                <font-awesome-icon
                  :icon="['fas','me-download']"
                  fixed-width
                ></font-awesome-icon> Download
              </a>
              <hr class="mt-5 mb-3" />

              <div>
                <!-- TODO fr JZ : add facebook embed code here -->
                <span class="small text-muted">Add Facebook Embed Code Here</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-free-download',
};
</script>

<style lang="scss" scoped>

</style>
