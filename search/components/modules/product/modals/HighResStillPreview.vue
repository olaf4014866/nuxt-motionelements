<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{element.name}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img
            :src="this.highResStillUrl"
            class="d-block img-fluid mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-high-res-still-preview',
  props: {
    element: Object,
    highResStillUrl: String,
  },
};
</script>

<style lang="scss" scoped>

</style>
