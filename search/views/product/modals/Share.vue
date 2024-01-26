<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      <slot name="header">
        {{ $t('cta.share') }}
      </slot>
    </template>

    <div>
      <div class="d-flex align-items-center justify-content-center">
        <div>
          <button
            class="btn btn-simple-secondary py-0 mr-1"
            data-toggle="collapse" data-target="#embed-code-div"
          >
            <font-awesome-icon
              :icon="['far','code']"
              class="mr-1"
            />
            {{ $t('cta.embed') }}
          </button>
        </div>
        <AddToAny class="" />
      </div>
      <div class="collapse" id="embed-code-div">
        <hr />
        <div class="form-group">
          <label for="embed-code">{{ $t('cta.copy_html') }}</label>
          <textarea v-if="isLoaded"
            id="embed-code" class="form-control" rows="6"
            spellcheck="false" disabled @click="$event.target.select()" :value="getShareUrl">
          </textarea>
          <div v-else class="text-center">
            <LoaderSpin></LoaderSpin>
          </div>
        </div>
      </div>
    </div>

  </Modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'product-share-modal',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    AddToAny: () => import('@/components/modules/common/AddToAny.vue'),
    LoaderSpin: () => import('@motionelements/core/src/components/ui/LoaderSpin.vue'),
  },
  computed: {
    ...mapState({
      embedCode: state => state.product.current.embedCode,
    }),
    isLoaded() {
      return this.embedCode !== null;
    },
    getShareUrl() {
      return this.embedCode;
      // const iframeUrl = `https://www.motionelements.com/embed/c/${this.element.id}`;
      // const link = this.element.html.url;
      // const title = this.element.name;
      //
      // return `<iframe width="490" height="390" src="${iframeUrl}" frameborder="0"></iframe></iframe><div><a href="${link}" title="${title}"></a></div>`;
    },
  },
  mounted() {
    this.$store.dispatch('product/getEmbedCode', {
      id: this.product.id,
    });
  },
  // watch: {
  //   isReady(value) {
  //     if (value) {
  //       this.$store.dispatch('product/getEmbedCode', {
  //         id: this.product.id,
  //       });
  //     }
  //   },
  // },
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
