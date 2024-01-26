<template>
  <div class="col pt-lg-4">


    <div class="py-4 d-lg-none">
      <!-- TOGGLE TO SEE LIST OF GROUPS ON MOBILE -->
      <button
        @click="enableMobileSidebar()"
        class="btn btn-sidebar-toggle btn-light pl-3 ml-n3"
      >
        <font-awesome-icon :icon="['fas','folders']" fixed-width class="mr-1"></font-awesome-icon>
        {{ $t('favorites.see_all_folders') }}
      </button>
    </div>

    <Title/>

    <Toolbar/>

    <Results
      :products="contentList"
    />


    <!-- MODALS -->
<!--    <FiltersModal />-->

<!--    <SettingsModal/>-->
    <!-- <SettingsAdvancedModal/> -->

    <ShareModal/>

<!--    <MoveModal/>-->

<!--    <DeleteElementWarning-->
<!--      id="deleteElementWarning"-->
<!--      type="danger"-->
<!--    >-->
<!--    </DeleteElementWarning>-->

<!--    <DeleteFolderWarning-->
<!--      id="deleteFolderWarning"-->
<!--      type="danger"-->
<!--    >-->
<!--    </DeleteFolderWarning>-->

    <!-- MODALS -->
    <!--
    <WarningModal
      id="deleteElements"
      :type="'danger'">
      <template v-slot:header>
        Are you sure?
      </template>
      <template v-slot:message>
        These Elements will be removed from this Folder permanently.
      </template>
      <template v-slot:btn-confirm>
        Yes
      </template>
      <template v-slot:btn-cancel>
        No
      </template>
    </WarningModal>
    -->

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import Title from '@/views/library/sections/Title.vue';
import Toolbar from '@/views/library/sections/Toolbar.vue';
import Results from '@/views/library/sections/Results.vue';

export default {
  name: 'favorites-content',
  components: {
    Title,
    Toolbar,
    Results,
    // Pagination: () => import('@/components/modules/favorites/content/Pagination.vue'),
    ShareModal: () => import(
      /* webpackPrefetch: true */
      '@/components/modules/favorites/modals/folder/Share.vue'),
    // SettingsModal: () => import('@/components/modules/favorites/modals/folder/Settings.vue'),
    // SettingsAdvancedModal: () => import('@/components/modules/favorites/modals/folder/SettingsAdvanced.vue'),

    // MoveModal: () => import('@/components/modules/favorites/modals/folder/Move.vue'),
    // FiltersModal: () => import('@/components/modules/favorites/modals/folder/Filters.vue'),

    // DeleteElementWarning: () => import('@/components/modules/favorites/modals/folder/DeleteElement.vue'),
    // DeleteFolderWarning: () => import('@/components/modules/favorites/modals/folder/DeleteFolder.vue'),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isSelectedAllElementTypes: state => state.favorites.isSelectedAllElementTypes,
      selectedElementTypes: state => state.favorites.selectedElementTypes,
      selectedDownloadStatus: state => state.favorites.selectedDownloadStatus,

      // currentFolderInfo: state => state.favorites.currentFolderInfo,
      // currentFolderId: state => state.favorites.currentFolderId,
      // currentFolderCreatedTime: state => state.favorites.currentFolderInfo.created_at,

      isLoading: state => state.library.loading.status,

      isSelectedElement: state => state.product.isSelectedElement,

      playElementId: state => state.audioPlayer.element.id,
      playStatus: state => state.audioPlayer.playStatus,
      timeElapsed: state => state.audioPlayer.playProgress.timeElapsed,
      timeTotal: state => state.audioPlayer.playProgress.timeTotal,
      waveformWidth: state => state.audioPlayer.waveformWidth,
    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      // library
      currentFolderId: 'library/currentFolderId',
      // currentFolder: 'library/getCurrentFolder',
      sidebarList: 'library/getFavoritesFolders',
      showMoreFolder: 'library/showMoreFolder',

      pageNow: 'library/pageNow',
      itemPerPage: 'library/itemPerPage',

    }),
    contentList() {
      // const list = this.$store.getters['favorites/contentList'];
      // console.log('contentList', list);
      return this.$store.getters['library/contentList'];
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {

    enableMobileSidebar() {
      this.$store.dispatch('library/enableMobileSidebar');
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-sidebar-toggle {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  // DISABLED BUTTONS
  .btn.disabled, .btn:disabled {
    cursor: not-allowed;
  }

  // EDIT BUTTON IN PROJECT NAME
  @include media-breakpoint-up(xl) {
    .folder-name {
      .folder-name-icon-edit {
        opacity: 0.25;
        transition: opacity .2s ease;
      }

      &:hover {
        .folder-name-icon-edit {
          opacity: 1;
        }
      }
    }
  }

  // DIVIDER IN TOOLBAR
  .vertical-divider {
    height: $line-height * $font-size-base;
    margin: 0 0.5rem;
    border-left: $hr-border-width solid $hr-border-color;
  }

  // RESPONSIVE SMALL BUTTON AND INPUTS ON SMALL SCREENS
  @include media-breakpoint-down(sm) {
    .btn-responsive-sm {
      @include button-size($btn-padding-y-sm,$btn-padding-x-sm,$btn-font-size-sm,$btn-line-height-sm,$btn-border-radius-sm);
    }

    .input-group-responsive-sm > .form-control:not(textarea),
    .input-group-responsive-sm > .custom-select {
      height: $input-height-sm;
    }

    .input-group-responsive-sm > .form-control,
    .input-group-responsive-sm > .custom-select,
    .input-group-responsive-sm > .input-group-prepend > .input-group-text,
    .input-group-responsive-sm > .input-group-append > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend > .btn,
    .input-group-responsive-sm > .input-group-append > .btn {
      padding: $input-padding-y-sm $input-padding-x-sm;
      @include font-size($input-font-size-sm);
      line-height: $input-line-height-sm;
      @include border-radius($input-border-radius-sm);
    }

    .input-group-responsive-sm > .input-group-prepend > .btn,
    .input-group-responsive-sm > .input-group-prepend > .input-group-text,
    .input-group-responsive-sm > .input-group-append:not(:last-child) > .btn,
    .input-group-responsive-sm > .input-group-append:not(:last-child) > .input-group-text,
    .input-group-responsive-sm > .input-group-append:last-child > .btn:not(:last-child):not(.dropdown-toggle),
    .input-group-responsive-sm > .input-group-append:last-child > .input-group-text:not(:last-child),
    .input-group-responsive-sm > .form-control:not(:last-child) {
      @include border-right-radius(0);
    }

    .input-group-responsive-sm > .input-group-append > .btn,
    .input-group-responsive-sm > .input-group-append > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend:not(:first-child) > .btn,
    .input-group-responsive-sm > .input-group-prepend:not(:first-child) > .input-group-text,
    .input-group-responsive-sm > .input-group-prepend:first-child > .btn:not(:first-child),
    .input-group-responsive-sm > .input-group-prepend:first-child > .input-group-text:not(:first-child),
    .input-group-responsive-sm > .form-control:not(:first-child)  {
      @include border-left-radius(0);
    }
  }

  // REMOVE CARET FROM DROPDOWN .no-caret
  .dropdown-toggle.no-caret{
    &:after{
      display:none;
    }
  }

  //
  // COLORS
  //

  .btn-checkbox {
    &, &.active, &:active, &:hover, &:focus {
      background: $transparent;
      border-color: $transparent;
      box-shadow: 0 0 0 $transparent !important;
    }
  }

  .btn-toolbar-btn {
    &.btn-white-secondary {
      background: $transparent;
      border-color: $transparent;
    }

    &:disabled, &.disabled, &[disabled] {
      opacity: .5;
      cursor: no-drop;
    }
  }
</style>
