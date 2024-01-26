<template>
  <span>
    <template v-if="isDefaultFolder">
       <font-awesome-icon :icon="['far','me-files']" fixed-width class="mr-1 text-muted"/>
      {{ folderName }}
      <small class="text-muted">({{ itemCount }})</small>
    </template>
    <template v-else>
      <font-awesome-icon :icon="['fas','folder']" fixed-width class="mr-1 text-muted"/>
      {{ folderName }}
      <small class="text-muted">({{ itemCount }})</small>
    </template>
  </span>
</template>

<script>
export default {
  name: 'label-folder-label',
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isDefaultFolder() {
      return this.folder.id === 'default';
    },
    folderName() {
      return this.isDefaultFolder ? this.$i18n.t('favorites.uncategorized')
        : _.get(this.folder, 'name', '');
    },
    itemCount() {
      return _.get(this.folder, 'items.totalCount', 0);
    },
  },
};
</script>
