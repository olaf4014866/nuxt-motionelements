<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header">
              {{ $t('cta.share') }}
            </slot>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center justify-content-center">
            <div>
              <button
                class="btn btn-simple-secondary py-0 mr-1"
                data-toggle="collapse" data-target="#embed-code-div"
              >
                <font-awesome-icon
                  :icon="['far','code']"
                  class="mr-1"
                ></font-awesome-icon>
                {{ $t('cta.embed') }}
              </button>
            </div>
            <AddToAny class="" />
          </div>
          <div class="collapse" id="embed-code-div">
            <hr />
            <div class="form-group">
              <label for="embed-code">{{ $t('cta.copy_html') }}</label>
              <textarea id="embed-code" class="form-control" rows="6"
                spellcheck="false" disabled="disabled" @click="$event.target.select()" :value="getShareUrl"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">{{ $t('cta.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-share-sheet',
  props: {
    element: Object,
  },
  components: {
    AddToAny: () => import('@/components/modules/common/AddToAny.vue'),
  },
  computed: {
    getShareUrl() {
      return `<iframe width='490' height='390' src='https://www.motionelements.com/embed/c/${this.element.id}'
      frameborder='0'></iframe></iframe><div><a href='${this.element.url}' title='${this.element.name}</a></div>`;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  line-height: 2rem;
}
textarea {
  font-family: $font-family-monospace;
  font-size: $font-size-sm;
  resize: none;
}
</style>
