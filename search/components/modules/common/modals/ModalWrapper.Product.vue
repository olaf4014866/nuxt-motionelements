<template>
  <div class="modal show" style="display: block; background-color: rgba(255, 255, 255, .7); backdrop-filter: blur(2px);">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
      <div class="modal-content">
        <!-- MODAL HEADER -->
        <div class="modal-header">
          <div>
            <div class="btn-group" aria-label="Search Results Navigation">
              <button
                type="button"
                class="btn btn-simple-secondary btn-sm px-3"
                :disabled="isFirst"
                @click="$emit('button-prev')"
              >
                <font-awesome-icon
                  :icon="['fal','chevron-left']"
                  fixed-width
                  title="$t('pagination.previous')"
                ></font-awesome-icon>
              </button>
              <button
                type="button"
                class="btn btn-simple-secondary btn-sm px-3"
                :disabled="isLast"
                @click="$emit('button-next')"
              >
                <font-awesome-icon
                  :icon="['fal','chevron-right']"
                  fixed-width
                  title="$t('pagination.next')"
                ></font-awesome-icon>
              </button>
            </div>
          </div>
          <button type="button" class="close" @click="$emit('modal-close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- MODAL BODY -->
        <div class="modal-body px-0">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-wrapper-product',
  props: {
    isFirst: Boolean,
    isLast: Boolean,
  },
};
</script>
