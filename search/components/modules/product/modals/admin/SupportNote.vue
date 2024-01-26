<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Support Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="tags">Tags</label>
              <input type="text" class="form-control" id="tags">
            </div>
            <div class="form-group">
              <label for="note">Notes</label>
              <textarea name="note" id="note" rows="4" class="form-control" cols="80" spellcheck="false"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-support-note',
};
</script>

<style lang="scss" scoped>

</style>
