<template>
  <!-- FAVORITE GROUP TITLE & ACTIONS -->
  <div class="d-flex flex-column flex-sm-row align-items-sm-start justify-content-between">
    <div class="project-info mb-3 text-center text-sm-left">
      <h4 class="mb-0">

        <template v-if="isDefaultFolder">
          {{ $t('favorites.uncategorized') }}
        </template>
        <template v-else>
          <a
            @click="onClickEditFolder(folder)"
            class="folder-name"
          >
            {{ title }}
            <font-awesome-icon
              fixed-width
              :icon="['far', 'pencil']"
              size="xs"
              class="ml-1 folder-name-icon-edit"
            ></font-awesome-icon>
          </a>
        </template>
      </h4>

      <TimeSince
        v-if="showTitle"
        :lang="currentLanguage"
        :date="createdAt"
        class="small text-muted mb-0"
      />

    </div>
    <div class="project-actionables d-flex flex-column flex-xxl-row align-items-center align-items-sm-end align-items-xxl-center mb-3">

      <ul class="list-inline mb-2 mb-xxl-0 text-center text-sm-right">
        <!-- TOGGLE TO SEE LIST OF GROUPS ON MOBILE -->
        <!--
        <li class="list-inline-item d-inline-block d-lg-none">
          <a
            @click="enableMobileSidebar()"
            class="btn btn-white-secondary btn-responsive-sm"
          >
            <font-awesome-icon :icon="['fas','folders']" fixed-width></font-awesome-icon>
            {{ $t('favorites.see_all_folders') }}
          </a>
        </li>
        -->

        <!-- edit favorites group setting -->

        <!-- <li
          v-if="currentFolderId !== 'default'"
          @click="showFolderSetting(currentFolderInfo)"
          class="list-inline-item"
        >
          <a class="btn btn-white-secondary btn-responsive-sm" data-toggle="modal" data-target="#favgrp-settings">
            <font-awesome-icon fixed-width :icon="['fas', 'pencil']"></font-awesome-icon> {{ $t('cta.edit') }}
          </a>
        </li> -->

        <!-- edit favorites group setting -->

        <!-- share favorites group -->
        <li
          v-show="!(['all', 'default'].includes(folderId))"
          class="list-inline-item"
        >
          <a
            class="btn btn-simple-secondary btn-responsive-sm"
            @click="onClickShare"
          >
            <font-awesome-icon :icon="['fas','share']" fixed-width/>
            {{ $t('favorites.share') }}
          </a>
        </li>
        <!-- share favorites group -->

      </ul>

      <!-- search input bar -->
      <!--
      <div class="ml-xxl-3">
        <div class="form-sm-inline">

          <div class="input-group input-group-responsive-sm d-flex d-sm-inline-flex">
            <input type="text" class="form-control" placeholder="Search this group">
            <div class="input-group-append">
              <span class="input-group-text">
                <font-awesome-icon :icon="['far','me-search']" fixed-width></font-awesome-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
      -->

    </div>
  </div>
  <!-- FAVORITE GROUP TITLE & ACTIONS -->

</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'library-favorites-title',
  components: {
    TimeSince: () => import('@motionelements/core/src/components/ui/BaseTimeSince.vue'),
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
      folderId: 'library/currentFolderId',
      folder: 'library/getCurrentFolder',
    }),
    createdAt() {
      // const currentFolderInfo = this.currentFolder; // this.$store.getters['library/currentFolderInfo'];

      // let createTime = new Date('1970-01-01T00:00:00Z');

      if (_.get(this.folder, 'createdAt') > 0) {
        return new Date(this.folder.createdAt * 1000);
      }

      return null;
    },
    title() {
      return _.get(this.folder, 'name');
    },
    isDefaultFolder() {
      return _.get(this.folder, 'id') === 'default';
    },
    itemCount() {
      return _.get(this.folder, 'items.totalCount', 0);
    },
    showTitle() {
      return !this.isDefaultFolder && this.itemCount > 0;
    },
  },
  created() {
  },
  methods: {
    onClickEditFolder(folder) {
      console.log('showFolderSetting', folder);

      this.$store.dispatch('library/setEditingFolderInfo', folder);

      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderEdit.vue'),
        }),
        props: {
          // id: 'modal-a',
        },
      });
    },
    onClickShare() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/library/modals/FolderShare.vue'),
        }),
        props: {
        },
      });
    },
  },
};
</script>
