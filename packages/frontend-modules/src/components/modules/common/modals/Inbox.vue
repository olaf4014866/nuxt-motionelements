<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">What's New</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div
            v-for="(log, index) in logs"
            :key="`log-${index}`"
            class="row mb-3"
          >
            <div class="col-12 col-lg-2">
              <p>
                <span class="small text-muted changelog-ago">
                  {{ log.date }}
                </span>
              </p>
            </div>
            <div class="col-12 col-lg-10">
              <h3 class="changelog-title h5">
                {{ log.title }}
              </h3>
              <div
                class="changelog-content small"
                v-html="log.content"
              >
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
  name: 'modal-changelog',
  props: {
    logs: Array,
  },
};
</script>

<style lang="scss" scoped>
.changelog-content::v-deep {
  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
