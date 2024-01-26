<template>
  <Modal
    align="center"
    footerClass="d-flex justify-content-between"
  >
    <template v-slot:title>
      {{ $t('favorites.folder_settings') }}
    </template>

    <!--
          <input type="hidden" name="token" value="693b9c18058e47886e3b87b6cb1662cc" required="" id="token">
          <input type="hidden" name="LightboxID" value="9997608" id="LightboxID">
          -->

    <div class="form-group">
      <label for="Name" class="optional">
        {{ $t('favorites.name') }}
      </label>
      <input
        v-model="folderName"
        :placeholder="$t('favorites.settings_folder_name_placeholder')"
        type="text"
        ref="inputSettingsFolderName"
        class="textInput form-control"
      >
    </div>

    <!--
    <div class="form-group">
      <label for="Description" class="optional">Description</label>
      <textarea name="Description" id="Description" rows="4" class="form-control" cols="80"></textarea>
    </div>

    <div class="form-group">
      <label for="Keywords" class="optional">Tags</label>
      <textarea name="Keywords" id="Keywords" rows="4" class="form-control" cols="80"></textarea>
    </div>
    -->

    <template v-slot:footer>
      <a
        @click.prevent="deleteFolder()"
        class="btn btn-simple-secondary"
        href="#"
      >
        <font-awesome-icon :icon="['far','archive']" fixed-width></font-awesome-icon>
        {{ $t('favorites.settings_folder_delete')}}
      </a>

      <!-- <button
        type="button"
        class="btn btn-white-secondary"
        data-dismiss="modal"
        data-toggle="modal"
        data-target="#favgrp-advanced"
      >
        Advanced Settings
      </button> -->
      <button
        @click="doRenameFolder()"
        type="button"
        class="btn btn-secondary"
      > {{ $t('cta.update')}} </button>
    </template>

  </Modal>

</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'favorites-modal-setting',
  components: {
    Modal: () => import(
      /* webpackChunkName: "base-modal" */
      /* webpackPrefetch: true */
      '@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  data() {
    return {
      newFolderName: '',
    };
  },
  computed: {
    ...mapState({
    }),
    folderName: {
      get() {
        let name = '';
        const editingFolderInfo = this.$store.getters['library/editingFolderInfo'];

        const hasFolder = (_.size(editingFolderInfo.text)) ? true : false;
        const hasFolderTitle = (editingFolderInfo.name !== '') ? true : false;

        if (hasFolder && hasFolderTitle) {
          name = editingFolderInfo.text;
        }

        return name;
      },
      set(inputFolderName) {
        console.log('inputFolderName : ', inputFolderName);
        this.newFolderName = inputFolderName;
      },
    },
  },
  created() {
  },
  mounted() {
    this.$root.$on('doDeleteFolder', () => {
      console.log('emit : doDeleteFolder');
      this.doDeleteFolder();
    });
  },
  methods: {

    doDeleteFolder() {
      this.$refs.inputSettingsFolderName.value = null;

      let folderId = '';
      const editingFolderInfo = this.$store.getters['library/editingFolderInfo'];
      if (editingFolderInfo.id) {
        folderId = editingFolderInfo.id;
      }

      if (!_.size(folderId)) {
        console.log('doDeleteFolder no info');
        return;
      }

      console.log('doDeleteFolder', folderId);

      this.$store.dispatch('library/doDeleteFavoritesFolder', folderId).then((response) => {
        console.log('doDeleteFavoritesFolder done : ', response);

        this.$root.$emit('getSidebarList');
        $('#favgrp-settings').modal('hide');
        $('#deleteFolderWarning').modal('hide');

        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'success',
          title: this.$i18n.t('favorites.folder_deleted'),
          autohide: true,
          delay: 3000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);

        // if delect current folder redirect to default
        const currentFolderId = this.$store.getters['library/currentFolderId'];
        if (folderId === currentFolderId) {
          this.$store.dispatch('product/setSelectedElementsId', []);

          let mapKey = '';
          let currentFolderInfo = {};
          mapKey = _.findKey(this.sidebarList, { id: 'default' });
          if (mapKey) {
            currentFolderInfo = this.sidebarList[mapKey];
          }
          this.$store.dispatch('library/setCurrentFolderInfo', currentFolderInfo);

          const lang = this.$route.params.lang;
          this.$router.push({
            path: `/${lang}/favorites/edit/default`,
          });
        }
      });
    },
    deleteFolder() {
      this.$refs.inputSettingsFolderName.value = null;

      const editingFolderInfo = this.$store.getters['library/editingFolderInfo'];

      const hasContent = editingFolderInfo.item_count ? true : false;

      if (hasContent) {
        $('#deleteFolderWarning').modal('show');
      }

      if (!hasContent) {
        this.$store.dispatch('modal/show', {
          component: () => ({
            component: import('@/views/library/modals/FolderConfirmDelete.vue'),
          }),
          props: {
            // id: 'modal-a',
          },
        });
        // this.$root.$emit('doDeleteFolder');
      }
    },
    doRenameFolder() {
      const folderName = this.newFolderName;

      let folderId = '';
      const editingFolderInfo = this.$store.getters['library/editingFolderInfo'];
      if (editingFolderInfo.id) {
        folderId = editingFolderInfo.id;
      }

      if (!_.size(folderId) || !_.size(folderName)) {
        console.log('doRenameFolder no info');
        return;
      }

      const info = {
        folderId: folderId,
        folderName: folderName,
      };
      console.log('doRenameFolder', info);

      this.$store.dispatch('library/doRenameFavoritesFolder', info).then((response) => {
        console.log('doRenameFavoritesFolder done : ', response);

        this.$root.$emit('getSidebarList');

        this.$store.dispatch('modal/hide');
        // $('#favgrp-settings').modal('hide');

        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'success',
          title: this.$i18n.t('favorites.folder_renamed'),
          autohide: true,
          delay: 3000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);
      });
    },

  },
};
</script>

<style lang="scss" scoped>
</style>
