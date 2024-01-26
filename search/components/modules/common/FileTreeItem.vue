<template>
  <li>
    <div
      :class="{'font-weight-bold': isFolder}"
      @click="toggle"
    >
      <font-awesome-icon
        :icon="folderToggleIcon"
        fixed-width
        class="mr-2"
        :class="isFolder ? 'text-primary' : 'invisible'"
      ></font-awesome-icon>
      <font-awesome-icon
        :icon="fileIconClass"
        fixed-width
        class="mr-2"
      ></font-awesome-icon>{{ item.title }}
    </div>
    <ul
      v-show="isOpen"
      v-if="isFolder"
      class="list-unstyled"
    >
      <file-tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></file-tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'file-tree-item',
  props: {
    item: Object,
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isFolder() {
      return this.item.folder;
    },
    folderToggleIcon() {
      return this.isOpen ? ['fas', 'minus-circle'] : ['fas', 'plus-circle'];
    },
    fileIconClass() {
      if (this.isFolder) {
        return this.isOpen ? ['fas', 'folder-open'] : ['fas', 'folder'];
      }
      if (this.item.title.indexOf('.jpg') !== -1 || this.item.title.indexOf('.png') !== -1) {
        return ['far', 'file-image'];
      }
      if (this.item.title.indexOf('.mp4') !== -1 || this.item.title.indexOf('.wmv') !== -1 || this.item.title.indexOf('.mov') !== -1) {
        return ['far', 'file-video'];
      }
      if (this.item.title.indexOf('.mp3') !== -1 || this.item.title.indexOf('.wav') !== -1) {
        return ['far', 'file-audio'];
      }
      if (this.item.title.indexOf('.txt') !== -1 || this.item.title.indexOf('.pdf') !== -1) {
        return ['far', 'file-alt'];
      }
      if (this.item.title.indexOf('.aep') !== -1 || this.item.title.indexOf('.ffx') !== -1) {
        return ['fas', 'me-after-effects-square'];
      }
      if (this.item.title.indexOf('.motn') !== -1) {
        return ['fas', 'me-apple-motion'];
      }
      if (this.item.title.indexOf('.prproj') !== -1 || this.item.title.indexOf('.prfpset') !== -1 || this.item.title.indexOf('.mogrt') !== -1) {
        return ['fas', 'me-apple-motion'];
      }
      return ['far', 'file'];
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-unstyled {
  padding-left: 1.75rem;
}
</style>
