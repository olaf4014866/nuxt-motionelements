<template>
  <div class="modal fade" id="favgrp-advanced" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ $t('favorites.advanced_folder_settings') }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label for="Name" class="optional">
              {{ $t('favorites.select_which_metadata_to_display') }}
            </label>
            <div class="row">
              <div v-for="metadataItem in metadata" :key="metadataItem.index" class="col-12 col-md-6 col-xl-4">
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" :id="'metadata-check-'+ _.kebabCase(metadataItem)">
                  <label class="custom-control-label" :for="'metadata-check-'+ _.kebabCase(metadataItem)">{{ metadataItem }}</label>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#favgrp-settings">
            {{ $t('cta.done') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'favorites-modal-setting-advanced',
  components: {
  },
  data() {
    return {
      metadata: [
        'Genre',
        'Mood',
        'Category',
        'Keywords',
        'Required Version',
        'Required Plugins',
        'Expression Script',
        'Edit Type',
        'Loopable',
        'Duration',
        'Tempo',
        'Musical Key',
        'Resolution / Dimensions',
        'Aspect',
        'Image Type',
        'Alpha / Matte / Background',
        'Model Release',
        'Property Release',
        'License',
        'Bodymovin',
        'Available for Musical Works',
        'Format',
        'File Size',
        'Codec',
        'Bit Depth',
        'Sample Rate',
        'Audio Channels',
        'Geometry',
        'Vertices',
        'Polygons',
        'Source',
        'Rendering',
        'Text Placeholders',
        'Video Placeholders',
        'Logo Placeholders',
        'Music',
        'Sound Effects',
      ],
    };
  },
  props: {
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
