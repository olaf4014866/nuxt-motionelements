<template>
  <Modal
    size="lg"
  >
    <template v-slot:title>
      {{ $t('product_page.included_files_title') }}
    </template>
    <div v-if="isLoaded">
      <FileTree
        :fileTreeData="tidiedData"
      />
    </div>
    <div v-else
         class="text-center">
      <LoaderSpin></LoaderSpin>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex';
import FileTree from '@/components/modules/common/FileTree.vue';

export default {
  name: 'product-included-files-modal',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    FileTree,
    LoaderSpin: () => import('@motionelements/core/src/components/ui/LoaderSpin.vue'),
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  created() {
  },
  data() {
    return {
      treeData: [], // fileTreeExample is the example data returned from existing site
    };
  },
  computed: {
    ...mapState({
      archiveEntries: state => state.product.current.archiveEntries,
    }),
    isLoaded() {
      return this.archiveEntries !== null;
    },
    tidiedData() {
      if (this.isLoaded) {
        // wrap the data in one single directory labelled by element name
        return {
          'title': this.element.name,
          'folder': true,
          'children': this.archiveEntries,
        };
      }
      return {};
    },
  },
  mounted() {
    if (!this.isLoaded) {
      this.$store.dispatch('product/getElementArchiveEntries', {
        id: this.element.id,
      });
    }
  },
  // watch: {
  //   isReady(value) {
  //     if (value && !this.isLoaded) {
  //       this.$store.dispatch('product/getElementArchiveEntries', {
  //         id: this.element.id,
  //       });
  //     }
  //   },
  // },
};
</script>
