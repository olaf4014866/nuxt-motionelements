<template>
  <div class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content overflow-hidden">
        <!--
        <div class="modal-header">
          <h5 class="modal-title">Just to confirm</h5>
        </div>
        -->
        <div class="modal-body">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="clearfix pt-3 text-center">
            <p>
              <font-awesome-icon
                :icon="['fas', warningIcon]"
                :class="`text-${type}`"
                size="4x" fixed-width
              ></font-awesome-icon>
              <!--
              <i
                :class="`fa-${warningIcon} text-${type}`"
                class="fas fa-4x fa-fw"
              ></i>
              -->
            </p>
            <h4>
              {{ $t('favorites.confirm_remove_{count}_items_text', { count: folderElementsCount }) }}
            </h4>
            <p>
              {{ $t('favorites.you_cannot_undo_this_action') }}
            </p>
          </div>
        </div>
        <div class="modal-footer p-0 row no-gutter m-0">
          <button
            type="button"
            class="btn btn-light m-0 rounded-0 col-6"
            data-dismiss="modal"
          >
            {{ $t('cta.no') }}
          </button>
          <button
            @click="doDeleteFolder()"
            :class="`btn btn-${type} m-0 rounded-0 col-6`"
            type="button"
          >
            {{ $t('cta.yes') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'favorites-modal-delete-folder',
  props: {
    type: String,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
      // isMember: 'user/isMember',
      // currentLanguage: 'user/getLanguageCode',
      // library
      // currentFolderId: 'library/currentFolderId',
      currentFolder: 'library/getCurrentFolder',
    }),
    warningIcon() {
      switch (this.type) {
        case 'success':
          return 'thumbs-up';
        case 'warning':
          return 'exclamation-circle';
        case 'danger':
          return 'exclamation-triangle';
        default:
          return 'info';
      }
    },
    folderElementsCount() {
      const editingFolderInfo = this.currentFolder;
      const totalCount = _.get(editingFolderInfo, 'items.totalCount', 0);
      return totalCount > 0 ? totalCount : 0;
    },
    selectedElementsCount() {
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];
      return (_.size(selectedElementsId) > 0) ? _.size(selectedElementsId) : 0;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    doDeleteFolder() {
      $('#favgrp-settings').modal('hide');
      $('#deleteFolderWarning').modal('hide');

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
          this.$store.dispatch('library/setSelectedElementsId', []);

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
  },
};
</script>

<style lang="scss" scoped>
</style>
