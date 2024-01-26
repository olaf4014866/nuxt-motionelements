<template>
  <div
    class="filedrop-help-wrapper position-absolute w-100 h-100 py-6 px-0 px-lg-5"
    :class="isMobile ? 'd-none' : 'd-block'"
  >
    <div class="filedrop-help-border w-100 h-100"></div>
    <div class="filedrop-help-text position-absolute d-flex justify-content-center align-items-center">
      <p class="mb-0">
        <span class="badge badge-pill badge-light">
          <font-awesome-icon :icon="['fas','me-search-ai']" fixed-width class="text-gray mr-1"></font-awesome-icon> {{ isAudio ? $t('search.audio_search') : $t('search.visual_search') }}
        </span>
        <span class="badge badge-pill badge-light">{{ $t('cta.click_to_learn_more') }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FileDropHelp',
  computed: {
    ...mapState({
      currentMediaType: state => state.site.currentMediaType,
      isMobile: state => state.site.isMobile,
    }),
    isAudio() {
      return this.$store.getters['site/currentMediaType'].isAudio ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.filedrop-help-wrapper {
  .filedrop-help-border {
    border: 4px dashed $dark;
    border-radius: $spacer/2;
  }
  .filedrop-help-text {
    bottom: 0;
    left: 0;
    right: 0;
    height: 3rem;

    .badge-pill {
      border-radius: 0;
      padding: $badge-padding-y $badge-padding-x;

      &:not(:last-child) {
        margin-right: 2px;
      }

      &:first-child {
        border-top-left-radius: $badge-pill-border-radius;
        border-bottom-left-radius: $badge-pill-border-radius;
        padding-left: $badge-pill-padding-x;
      }
      &:last-child {
        border-top-right-radius: $badge-pill-border-radius;
        border-bottom-right-radius: $badge-pill-border-radius;
        padding-right: $badge-pill-padding-x;
      }
    }
  }
}

.filedrop-help-border {


  .component-dark & {
    border-color: $light;
  }
}
</style>
