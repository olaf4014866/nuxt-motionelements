<template>
  <div
    class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Included Files
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <FileTree
            :fileTreeData="tidiedData"
          ></FileTree>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fileTreeExample } from '@/mock/mockData.js';
import FileTree from '@/components/modules/common/FileTree.vue';

export default {
  name: 'modal-included-files',
  data() {
    return {
      treeData: fileTreeExample, // fileTreeExample is the example data returned from existing site
    };
  },
  props: {
    element: Object,
  },
  components: {
    FileTree,
  },
  computed: {
    tidiedData() {
      // wrap the data in one single directory labelled by element name
      return {
        'title': this.element.name,
        'folder': true,
        'children': this.treeData,
      };
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
