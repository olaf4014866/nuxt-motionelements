<template>
  <ElementDropzone
    :list="folder"
    :value="folder.id"
    class="px-3 rounded w-100"
  >

    <div class="d-flex flex-nowrap align-items-top justify-content-between">
      <template v-if="isDefaultFolder">
        <div class="mr-1">
          <font-awesome-icon :icon="['far','me-files']" fixed-width class="mr-1"
                             :class="{ 'text-muted': folder.id !== currentFolderId }"
          ></font-awesome-icon>
        </div>
        <div class="flex-grow-1">{{ $t('favorites.uncategorized') }} ({{ itemCount }})</div>
      </template>
      <template v-else>
        <div class="mr-1">
          <font-awesome-icon :icon="['fas','folder']" fixed-width class="mr-1"
                             :class="{ 'text-muted': folder.id !== currentFolderId }"
          />
        </div>
        <div class="flex-grow-1">{{ folderName }} ({{ itemCount }})</div>

        <div
          @click.stop.prevent="showFolderSetting(folder)"
          class="btn btn-white-secondary btn-sm btn-edit-folder d-none d-lg-block"
        >
          <font-awesome-icon :icon="['fas','pencil']" fixed-width></font-awesome-icon>
        </div>

      </template>

    </div>
  </ElementDropzone>

</template>


<script>
import { mapGetters } from 'vuex';
import ElementDropzone from '@/views/library/sections/ElementDropzone.vue';

export default {
  name: 'favorites-sidebar-folder',
  components: {
    ElementDropzone,
  },
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
    }),
    isDefaultFolder() {
      return this.folder.id === 'default';
    },
    folderName() {
      return _.get(this.folder, 'name', '');
    },
    itemCount() {
      return _.get(this.folder, 'items.totalCount', 0);
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showFolderSetting(folderInfo) {
      console.log('showFolderSetting', folderInfo);

      this.$store.dispatch('library/setEditingFolderInfo', folderInfo);

      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderEdit.vue'),
        }),
        props: {
          // id: 'modal-a',
        },
      });

      // $('#favgrp-settings').modal('show');
    },
  },
};
</script>
