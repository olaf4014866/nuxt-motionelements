<template>
  <div>
    <ul class="list-unstyled">
      <file-tree-item
        class="item"
        :item="fileTreeData"
        :isOpen="true"
      ></file-tree-item>
    </ul>
  </div>
</template>

<script>
// Original code adapted from https://vuejs.org/v2/examples/tree-view.html
import FileTreeItem from '@/components/modules/common/FileTreeItem.vue';

export default {
  name: 'file-tree',
  props: {
    fileTreeData: Object,
  },
  components: {
    FileTreeItem,
  },
};
</script>

<style lang="scss" scoped>

</style>
