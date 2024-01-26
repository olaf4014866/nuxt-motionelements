<template>
  <!-- ADD SCRIPT: add class '.active' when toggled on mobile -->
  <div
    :class="{ active: isMobileSidebarActive }"
    class="col col-sidebar px-0 py-0 py-lg-4"
  >

    <!-- for mobile -->
    <div class="row sticky-top d-block d-lg-none mb-5">
      <div class="col px-5 py-3 bg-light">
        <button @click="disableMobileSidebar()" type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="filter-title my-0">
          {{ $t('favorites.folders') }}
        </h5>
      </div>
    </div>

    <!-- search folder input bar -->
    <div class="form-group px-3">
      <div class="input-group input-group-sm mb-3">
        <input
          v-model="searchKeyword"
          type="search"
          class="form-control"
          :placeholder="$t('favorites.search_for_folder')"
        >
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">
            <font-awesome-icon :icon="['fas','me-search']" fixed-width/>
          </span>
        </div>
      </div>
    </div>
    <!-- search folder input bar -->

    <!-- new folder buttion -->
    <div class="px-3">
      <a
        class="btn btn-light btn-block btn-sm btn-add-folder px-2 mb-3"
        @click="showCreateFolderModal"
      >
        <font-awesome-icon :icon="['far','plus']" fixed-width class="mr-1"/> {{ $t('favorites.new_folder') }}
      </a>
    </div>
    <!-- new folder buttion -->


    <!-- sidebar menu -->
    <ul class="list-group list-group-flush list-group-nav mb-5">

      <!-- favorites menu -->
      <button
        type="button"
        @click.prevent="changeListModeToFolder()"
        :class="{ active: currentListMode === 'folder' }"
        class="list-group-item list-group-item-action list-group-header"
      >
        <font-awesome-icon :icon="['fal','heart']" fixed-width></font-awesome-icon> {{ $t('favorites.favorites') }}
      </button>

      <!-- menu -->
      <div class="list-group-item small">


        <ul class="list-group list-group-projects list-group-flush mx-n3">
          <a
            v-for="(folder, key) in folderList"
            :key="`folder-${key}`"

            :class="{ active: folder.id === currentFolderId }"

            class="list-group-item list-group-item-action d-flex justify-content-between align-items-top"
            @click.prevent="changeFolderId(folder.id)"
          >
            <FavoritesFolder
              :folder="folder"
            />
          </a>
        </ul>


        <ul class="list-group list-group-projects list-group-flush mx-n3">

          <a
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-top py-2"
          >
            <div class="px-3 rounded w-100">

              <div
                v-if="showCollapseButton && showMoreFolder === false"
                @click.prevent="showMoreFolderList()"
                class="d-flex flex-nowrap align-items-top justify-content-between"
              >
                <div class="mr-1">
                  <font-awesome-icon :icon="['fas','chevron-down']" fixed-width class="mr-1"></font-awesome-icon>
                </div>
                <div class="flex-grow-1 font-weight-bold">{{ $t('favorites.show_more_folder') }}</div>
              </div>

              <div
                v-if="showCollapseButton && showMoreFolder === true"
                @click.prevent="showLessFolderList()"
                class="d-flex flex-nowrap align-items-top justify-content-between"
              >
                <div class="mr-1">
                  <font-awesome-icon :icon="['fas','chevron-up']" fixed-width class="mr-1"></font-awesome-icon>
                </div>
                <div class="flex-grow-1 font-weight-bold">{{ $t('favorites.show_less_folder') }}</div>
              </div>

            </div>
          </a>

        </ul>


      </div>
      <!-- menu -->

      <button
        type="button"
        @click.prevent="changeListModeToHistory()"
        :class="{ active: currentListMode === 'history' }"
        class="list-group-item list-group-item-action list-group-header"
      >
        <font-awesome-icon :icon="['fal','history']" fixed-width></font-awesome-icon> {{ $t('favorites.history') }}
      </button>

      <!-- <a class="list-group-item list-group-item-action"><font-awesome-icon :icon="['fal','history']" fixed-width></font-awesome-icon> History</a> -->
      <!-- <a class="list-group-item list-group-item-action"><font-awesome-icon :icon="['fal','archive']" fixed-width></font-awesome-icon> Archive</a> -->
      <!-- <a class="list-group-item list-group-item-action">Library</a> -->
    </ul>
    <!-- sidebar menu -->


    <!-- MODALS -->
<!--    <CreateModal/>-->
    <!-- MODALS -->

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import FavoritesFolder from '@/views/library/sidebar/FavoritesFolder.vue';
// import CreateModal from '@/components/modules/favorites/modals/folder/Create.vue';
// import CreateFolder from '@/views/library/modals/CreateFolder.vue';

export default {
  name: 'favorites-sidebar',
  components: {
    // CreateModal,
    FavoritesFolder,
  },
  data() {
    return {
      searchKeyword: '',
    };
  },
  computed: {
    ...mapState({
      isMobileSidebarActive: state => state.library.isMobileSidebarActive,
      currentListMode: state => state.library.currentListMode,
    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      sidebarList: 'library/getFavoritesFolders',
      showMoreFolder: 'library/showMoreFolder',
    }),
    showCollapseButton() {
      return _.size(this.sidebarList) > 6;
    },
    folderList() {
      const sidebarList = this.sidebarList;

      let folderList = [];

      Object.keys(sidebarList).map((key) => {
        // console.log(sidebarList[key]);

        const listId = sidebarList[key].id;
        if (['all'].indexOf(listId) >= 0) {
          return;
        }

        const listText = _.get(sidebarList[key], 'text', '');

        const haveKeyword = !!_.size(this.searchKeyword);
        const isKeywordMatch = listText.toLowerCase().includes(this.searchKeyword.toLowerCase());

        if ((haveKeyword && isKeywordMatch)) {
          folderList.push(sidebarList[key]);
        }

        if (!haveKeyword) {
          folderList.push(sidebarList[key]);
        }
      });
      folderList = _.compact(folderList);

      const showMoreFolder = this.showMoreFolder;
      if (!showMoreFolder && this.showCollapseButton) {
        folderList = folderList.slice(0, 5);
      }

      return folderList;
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getFavoriteContent() {
      console.log('getFavoriteContent sidebar');
    },
    disableMobileSidebar() {
      this.$store.dispatch('library/disableMobileSidebar');
    },

    showMoreFolderList() {
      this.$store.dispatch('library/setShowMoreFolder', true);
    },

    showLessFolderList() {
      this.$store.dispatch('library/setShowMoreFolder', false);
    },

    changeListModeToFolder() {
      this.changeFolderId('default');
    },

    changeListModeToHistory() {
      this.$router.push({
        path: this.$link('/history/list').fullPath(),
      });
    },

    changeFolderId(folderId) {
      console.log('changeFolderId', folderId);

      this.disableMobileSidebar();

      this.$store.dispatch('library/changeFolder', folderId);

      this.$router.push({
        path: this.$link(`/favorites/edit/${folderId}`).fullPath(),
      });

      /*
        const sidebarList = this.sidebarList;

        this.$store.dispatch('product/setSelectedElementsId', []);

        let mapKey = '';
        let currentFolderInfo = {};

        mapKey = _.findKey(sidebarList, { id: folderId });
        if (mapKey) {
          currentFolderInfo = sidebarList[mapKey];
        }

        this.$store.dispatch('library/setCurrentFolderInfo', currentFolderInfo);

        this.$router.push({
          path: this.$link(`/favorites/edit/${folderId}`).fullPath(),
        });

         */
    },
    showCreateFolderModal() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderCreate.vue'),
        }),
        props: {
          // id: 'modal-a',
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  $facet-max-width: 250px;

  .col-sidebar {
    @media (min-width: 992px) {
      max-width: $facet-max-width;
    }
    @media (max-width: 991.98px) {
      position: fixed;
      top: 0;
      height: 100%;
      overflow-y: scroll;
      z-index: 1080;
      transform: translateX(-100%);
      transition: transform 0.3s ease;

      &.active {
        transform: translateY(0);
      }
    }
  }

  // SPACING & BORDERS

  .list-group-item {
    &, &.active {
      border-width: 0; // REMOVE LIST-GROUP-ITEM BORDER
    }
  }

  .list-group-nav {
    > .list-group-item {
      padding-left: map-get($spacers,4);
      padding-right: map-get($spacers,4);
    }
  }

  .list-group-projects {
    > .list-group-item {
      padding: map-get($spacers, 1) 0;
      font-weight: normal;
    }
  }

  .btn-edit-folder {
    opacity: 0;

    .list-group-item-action:hover & {
      opacity: 1;
    }
  }

  //
  // COLORS
  //

  .col-sidebar {
    @media (max-width: 991.98px) {
      background: $white;

      .ui-dark & {
        background: $black;
      }
    }
  }

  .list-group-item {
    background-color: $transparent;
  }

  // root list-group headers

  .list-group-nav {
    .list-group-header {
      // border-left-color: $nav-tabs-border-color;
      // color: $nav-tabs-link-color;
      background: $transparent;
      font-weight: bold;

      &.active {
        padding-left: map-get($spacers,4) - map-get($spacers,1);
        border-left-width: map-get($spacers,1);
        border-left-style: solid;
        border-left-color: $nav-tabs-link-active-color;
        color: $nav-tabs-link-active-color;

        .ui-dark & {
          border-left-color: $nav-tabs-link-active-color-dark;
          color: $nav-tabs-link-active-color-dark;
        }
      }

      &:focus {
        outline-color: $transparent;
      }
    }

    button.list-group-header {
      &:not(.active) {
        &:hover {
          background: map-get(map-get($theme-colors-variants,"light"),"1");
          border-radius: 0 $border-radius $border-radius 0;
          padding-left: map-get($spacers,4) - map-get($spacers,1);
          border-left-width: map-get($spacers,1);
          border-left-style: solid;
          border-left-color: $nav-tabs-link-active-color;
          // color: $nav-tabs-link-active-color;

          .ui-dark & {
            background: map-get(map-get($theme-colors-variants,"black"),"0");
            border-left-color: $nav-tabs-link-active-color-dark;
            // color: $nav-tabs-link-active-color-dark;
          }
        }
      }
    }
  }

  // list of folders

  .list-group-projects {
    .list-group-item {
      // REMOVE BACKGROUND COLOR ON HOVER AND ACTIVE
      &:hover, &.active {
        background-color: $transparent;
      }

      // CHANGE HOVER TEXT COLOR
      &:hover {
        color: $nav-tabs-link-hover-color;

        .ui-dark & {
          color: $nav-tabs-link-hover-color-dark;
        }
      }

      // CHANGE ACTIVE TEXT COLOR
      &.active {
        color: $nav-tabs-link-active-color;
        font-weight: $font-weight-bold;

        .ui-dark & {
          color: $nav-tabs-link-active-color-dark;
        }
      }
    }
  }

  .btn-add-folder {
    &:hover {
      color: $black !important;

      .ui-dark & {
        color: $white !important;
      }
    }
  }

  .btn-edit-folder {
    &, .ui-dark & {
      background: $transparent;
      border-color: $transparent;
    }
  }
</style>
