<template>
  <div class="modal fade" id="favgrp-create" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('favorites.folder_create_heading') }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label for="name" class="optional">{{ $t('favorites.folder_name') }}</label>
            <input
              :placeholder="$t('favorites.folder_create_input_placeholder')"
              :value="inputFolderName"
              @input="inputFolderName = $event.target.value"
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

        </div>
        <div class="modal-footer">
          <button
            @click="createFavoritesFolder()"
            type="button"
            class="btn btn-secondary"
          >{{ $t('cta.create') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'favorites-modal-create-folder',
  data() {
    return {
      inputFolderName: '',
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
      const info = {
        name: this.inputFolderName,
      };

      $('#favgrp-create').modal('hide');
      this.$refs.inputCreateFolderName.value = null;

      console.log('emitCreateFavoritesFolder', info);
      this.$root.$emit('doCreateFavoritesFolder', info);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
