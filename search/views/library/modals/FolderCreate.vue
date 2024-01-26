<template>
  <Modal
    align="center"
  >
    <template v-slot:title>
      {{ $t('favorites.folder_create_heading') }}
    </template>

    <div class="form-group">
      <label for="name" class="optional">{{ $t('favorites.folder_name') }}</label>
      <input
        :placeholder="$t('favorites.folder_create_input_placeholder')"
        v-model="form.name"
        @keyup.enter="createFavoritesFolder()"
        type="text"
        ref="inputCreateFolderName"
        class="textInput form-control"
      >
    </div>

    <!--
    <div class="form-group">
      <label for="description" class="optional">{{ $t('favorites.description') }}</label>
      <textarea name="description" id="description" rows="4" class="form-control" cols="80"></textarea>
    </div>

    <div class="form-group">
      <label for="keywords" class="optional">{{ $t('favorites.keywords') }}</label>
      <textarea name="keywords" id="keywords" rows="4" class="form-control" cols="80"></textarea>
    </div>
    -->

    <template v-slot:footer>
      <button
        @click="createFavoritesFolder()"
        type="button"
        class="btn btn-secondary"
      >
        {{ $t('cta.create') }}
      </button>
    </template>

  </Modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'favorites-modal-create-folder',
  components: {
    Modal: () => import(
      /* webpackChunkName: "base-modal" */
      /* webpackPrefetch: true */
      '@motionelements/core/src/components/ui/BaseModalVuex.vue'),
  },
  data() {
    return {
      form: {
        name: '',
      },
      // inputFolderName: '',
    };
  },
  computed: {
    ...mapState({
    }),
  },
  created() {
  },
  mounted() {
  },
  methods: {
    createFavoritesFolder() {
      // const info = {
      //   name: this.form.name,
      // };

      const formData = { ...this.form };
      // $('#favgrp-create').modal('hide');
      // this.$refs.inputCreateFolderName.value = null;

      console.log('emitCreateFavoritesFolder', formData);
      // this.$root.$emit('doCreateFavoritesFolder', info);

      this.$store.dispatch('library/createFavoritesFolder', formData)
        .then((response) => {
          console.log('doCreateFavoritesFolder done : ', response);

          this.$root.$emit('getSidebarList');

          // const notify = this.$store.getters['site/notifyMessages'];
          // notify.status = true;
          // notify.contents.push({
          //   name: 'notifyMessages',
          //   type: 'success',
          //   title: this.$i18n.t('favorites.folder_created'),
          //   autohide: true,
          //   delay: 3000,
          // });
          this.$store.dispatch('modal/hide');
        });
      // .catch((error) => {
      //   // handle error
      //   console.log('library/doCreateFavoritesFolder error - ', error);
      //
      //   const notify = this.$store.getters['site/notifyMessages'];
      //   notify.status = true;
      //   notify.contents.push({
      //     name: 'notifyMessages',
      //     type: 'warning',
      //     title: this.$i18n.t('favorites.folder_limited_max'),
      //     autohide: true,
      //     delay: 3000,
      //   });
      //   this.$store.dispatch('site/setNotifyMessages', notify);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
