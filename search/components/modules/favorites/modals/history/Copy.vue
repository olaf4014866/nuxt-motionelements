<template>
  <div class="modal fade" id="favgrp-copy" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> {{ $t('favorites.add_to_favorites') }} </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group sticky-top">
            <input
              v-model="searchKeyword"
              class="form-control form-control-sm"
              type="search"
              :placeholder="$t('favorites.search_for_folder')"
            >
          </div>

          <ul class="list-group list-group-flush" id="favListItems">
            <div class="list-group-item bg-light lt py-2 py-sm-0 py-md-2">
              <div class="collapse multi-collapse show" ref="newFolderButton">
                <a
                  class="d-block w-100 btn-add-folder"
                  @click="showCreateFolderForm(true)"
                >
                  <font-awesome-icon :icon="['far','plus']" fixed-width></font-awesome-icon>
                  {{ $t('favorites.new_folder') }}
                </a>
              </div>
              <div class="collapse multi-collapse" ref="newFolderForm">
                <div class="form-group">
                  <label class="col-form-label col-form-label-sm" for="newProjectName">
                    {{ $t('favorites.name')}}
                  </label>
                  <input
                    v-model="inputFolderName"
                    type="text"
                    class="form-control form-control-sm"
                    ref="inputFolderName"
                    :placeholder="$t('favorites.folder_create_input_placeholder')"
                  >
                </div>
                <div class="d-flex justify-content-end pb-3">
                  <button
                    class="btn btn-sm btn-simple-secondary"
                    @click="showCreateFolderForm(false)"
                  >
                    {{ $t('cta.cancel')}}
                  </button>&nbsp;
                  <button
                    class="btn btn-sm btn-primary"
                    @click="createFavoritesFolder()"
                  >
                    {{ $t('cta.create')}}
                  </button>
                </div>
              </div>
            </div>
            <li
              v-for="(folder, index) in folderList" :key="index"
              class="list-group-item list-group-item-action py-0"
            >
              <div class="custom-control custom-radio py-2" >
                <input
                  @click="selectedFolderId = folder.id"
                  :id="`copyCheckbox-${index}`"
                  type="radio"
                  name="copy-radio"
                  class="custom-control-input"
                >
                <label class="custom-control-label w-100" :for="`copyCheckbox-${index}`">
                  <FolderLabel
                    :folder="folder"
                  />
                </label>
              </div>
            </li>
          </ul>

        </div>
        <div class="modal-footer d-flex flex-column flex-sm-row justify-content-between align-items-stretch align-items-sm-center">
          <div class="custom-control custom-checkbox mb-2 mb-sm-0">
          </div>
          <div class="text-right">
            <button type="button" class="btn btn-simple-secondary mr-2" data-dismiss="modal"> {{ $t('cta.cancel') }} </button>
            <button
              @click="doCopyFavorites()"
              type="button"
              class="btn btn-primary"
              :disabled="formShowing"
            > {{ $t('cta.add_to_favorites') }} </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'history-modal-copy',
  components: {
    FolderLabel: () => import('@/views/library/sections/FolderLabel.vue'),
  },
  data() {
    return {
      inputFolderName: '',
      searchKeyword: '',
      selectedFolderId: '',
      isCopyMode: false,
      formShowing: false,
    };
  },
  computed: {
    ...mapState({
      sidebarList: state => state.library.sidebarList,
    }),
    ...mapGetters({
      // isMember: 'user/isMember',
      // currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      // currentFolder: 'library/getCurrentFolder',
    }),
    folderList() {
      const list = this.sidebarList.filter(list => list.name.toLowerCase().includes(this.searchKeyword.toLowerCase()));

      let customList = JSON.parse(JSON.stringify(list));

      // hide all
      let key = 0;
      key = _.findKey(customList, { id: 'all' });
      delete customList[key];

      const currentFolderId = this.currentFolderId;
      // hide default when current in default folder
      if (currentFolderId === 'default') {
        key = _.findKey(customList, { id: 'default' });
        delete customList[key];
      }

      customList = _.compact(customList);
      // console.log(customList);

      return customList;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showCreateFolderForm(bool) {
      const $btn = $(this.$refs.newFolderButton);
      const $form = $(this.$refs.newFolderForm);

      if (bool) {
        $btn.collapse('hide');
        $form.collapse('show');
        this.formShowing = true;
      } else {
        $btn.collapse('show');
        $form.collapse('hide');
        this.formShowing = false;
      }
    },
    doCopyFavorites() {
      const selectedElementsId = this.$store.getters['product/selectedElementsId'];

      const params = {
        folderId: this.selectedFolderId,
        skus: selectedElementsId,
      };

      console.log('DO COPY FAVORITES', params);

      this.$store.dispatch('library/doCopyFavorites', params).then((response) => {
        console.log('doCopyFavorites done : ', response);

        this.$root.$emit('getSidebarList');

        // this.$root.$emit('getFavoriteContent');
        // this.$root.$emit('getHistoryContent');

        $('#favgrp-copy').modal('hide');

        const notify = this.$store.getters['site/notifyMessages'];
        notify.status = true;
        notify.contents.push({
          name: 'notifyMessages',
          type: 'success',
          title: this.$i18n.t('favorites.element_copied'),
          autohide: true,
          delay: 3000,
        });
        this.$store.dispatch('site/setNotifyMessages', notify);
      });
    },
    createFavoritesFolder() {
      const info = {
        name: this.inputFolderName,
      };
      console.log('emitCreateFavoritesFolder', info);

      this.$root.$emit('doCreateFavoritesFolder', info);
      this.showCreateFolderForm(false);

      // clear input value
      this.inputFolderName = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  overflow-y: auto;
  max-height: calc(100vh - 18rem);

  @include media-breakpoint-only(xs) {
    max-height: calc(100vh - 22rem);
  }
  @include media-breakpoint-only(sm) {
    max-height: calc(100vh - 18rem);
  }
}

.btn-add-folder {
  padding-left: 28px;
}
</style>
