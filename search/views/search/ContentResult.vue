<template>
  <div
    :class="{'pr-sm-0' : !isAudioLayout}"
    class="col col-elements position-relative flex-grow-1"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'content-result',
  computed: {
    ...mapState({
      currentMediaType: state => state.search.mediaType,
    }),
    isAudioLayout() {
      return isProductType('audio', this.currentMediaType);
    },
  },
};
</script>
