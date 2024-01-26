<template>
  <dl class="small">
    <div
      v-if="versArray.length && this.element.versions[versArray[0]].required_version"
    >
      <dt class="text-muted">{{ $t('details.required_version') }}</dt>
      <dd>{{ this.element.versions[versArray[0]].required_version }}</dd>
    </div>

    <div
      v-if="versArray.length && this.element.versions[versArray[0]].required_plugins.length"
    >
      <dt class="text-muted">{{ $t('details.required_plugins') }}</dt>
      <dd>{{ this.element.versions[versArray[0]].required_plugins }}</dd>
    </div>

    <div
      v-if="this.element.duration"
    >
      <dt class="text-muted">{{ $t('search.duration') }}</dt>
      <dd>{{ this.element.duration }}s</dd>
    </div>

    <div
      v-if="this.element.aspect_ratio"
    >
      <dt class="text-muted">{{ $t('details.aspect') }}</dt>
      <dd>{{ this.element.aspect_ratio }}</dd>
    </div>

    <div
      v-if="versArray.length && this.element.versions[versArray[0]].width && this.element.versions[versArray[0]].height"
    >
      <dt class="text-muted">{{ $t('details.resolution_dementions') }}</dt>
      <dd>{{this.element.versions[versArray[0]].width}}x{{this.element.versions[versArray[0]].height}}</dd>
    </div>

    <div
      v-if="imageType"
    >
      <dt class="text-muted">{{ $t('details.image_type') }}</dt>
      <dd>{{ imageType }}</dd>
    </div>

    <div v-if="fileSizes.length">
      <dt class="text-muted">{{ $t('details.file_size') }}</dt>
      <dd>
        <template
          v-if="fileSizes.length === 1"
        >
          {{fileSizes[0].size}} MB
        </template>
        <template
          v-if="fileSizes.length > 1"
        >
          <template
            v-for="fileSize in fileSizes"
          >
            <span
              :key="fileSize.name"
              class="badge badge-light mr-1"
            >
              {{fileSize.name}}:
              {{fileSize.size}} MB
            </span>
          </template>
        </template>
      </dd>
    </div>

  </dl>
</template>

<script>

export default {
  name: 'product-template-details',
  props: {
    element: Object,
  },
  computed: {
    imageType() {
      switch (this.element.mediaType) {
        case 'photo':
          return 'Photo';
        case 'vector':
          return 'Vector';
        case 'gif':
          return 'Photo / GIF';
        case 'photo-vr':
          return 'VR Photo';
        default:
          return false;
      }
    },
    versArray() {
      return this.element.versions ? Object.keys(this.element.versions) : [];
    },
    fileSizes() {
      const filesArray = [];

      if (this.versArray) {
        this.versArray.forEach((ver) => {
          filesArray.push({
            name: ver ? ver : 'custom',
            size: Math.round(this.element.versions[ver].file_size / 1000000), // convert bytes to MB
          });
        });
        return filesArray;
      }
      return [];
    },
  },
  methods: {
    detailsColumnConverter(column) {
      switch (column) {
        case 'dimensions':
          return 'Resolution / Dimensions';
        case 'image_type':
          return 'Image Type';
        case 'has_alpha':
          return 'Alpha / Matte';
        case 'model_release':
          return 'Model Release';
        case 'property_release':
          return 'Property Release';
        case 'location':
          return 'Location';
        case 'source':
          return 'Source';
        case 'loop':
          return 'Loopable';
        case 'duration':
          return 'Duration';
        case 'aspect_ratio':
          return 'Aspect';
        case 'rendering':
          return 'Rendering';
        case 'geometry':
          return 'Geometry';
        case 'vertices':
          return 'Vertices';
        case 'polygons':
          return 'Polygons';
        case 'edit_type':
          return 'Edit Type';
        case 'bpm':
          return 'BPM';
        case 'tempo':
          return 'Tempo';
        case 'musical_key':
          return 'Musical Key';
        case 'composer':
          return 'Composer';
        case 'publisher':
          return 'Publisher';
        case 'musical_works':
          return 'Available for Musical Works';
        case 'format':
          return 'Format';
        case 'file_size':
          return 'File Size';
        case 'audio_codec':
          return 'Audio Codec';
        case 'audio_bit_depth':
          return 'Audio bit depth';
        case 'audio_sample_rate':
          return 'Audio Sample Rate';
        case 'audio_channels':
          return 'Audio Channels';
        case 'expression':
          return 'Expression';
        case 'composition':
          return 'Composition';
        case 'text_spots':
          return 'Text Placeholders';
        case 'video_spots':
          return 'Video Placeholders';
        case 'logo_spots':
          return 'Logo Placeholders';
        case 'has_music':
          return 'Included Music';
        case 'has_sfx':
          return 'Included Sound Effects';
        case 'has_footage':
          return 'Footage';
        case 'projection':
          return 'Projection';
        case 'viewing_field':
          return 'Viewing Field';
        case 'has_pre_render':
          return 'Prerender';
        case 'background':
          return 'Background';
        case 'animated':
          return 'Animated';
        default:
          return column;
      }
    },
    getProductDetailsByMediatype(mediatype) {
      switch (mediatype) {
        case 1:
        case 14:
          return {
            left: ['dimensions', 'image_type', 'has_alpha'],
            right: ['model_release', 'property_release', 'location', 'source'],
          };
        case 2:
          return {
            left: ['image_type'],
            right: ['source'],
          };
        case 3:
        case 4:
          return {
            left: ['loop', 'duration', 'aspect_ratio', 'has_alpha'],
            right: ['model_release', 'property_release', 'location', 'source', 'rendering'],
          };
        case 5:
          return {
            left: ['geometry', 'vertices', 'polygons'],
            right: ['source', 'rendering'],
          };
        case 6:
          return {
            left: ['edit_type', 'loop', 'duration', 'bpm', 'musical_key', 'composer', 'publisher'],
            right: ['musical_works', 'format', 'file_size', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels', 'source'],
          };
        case 7:
          return {
            left: ['duration', 'source'],
            right: ['format', 'file_size', 'audio_codec', 'audio_bit_depth', 'audio_sample_rate', 'audio_channels'],
          };
        case 8:
          return {
            left: ['has_pre_render', 'expression', 'composition', 'duration', 'resolution', 'file_size'],
            right: ['text_spots', 'video_spots', 'logo_spots', 'has_music', 'has_sfx', 'has_footage'],
          };
        case 9:
          return {
            left: ['has_pre_render', 'duration', 'resolution', 'file_size'],
            right: ['text_spots', 'video_spots', 'logo_spots', 'has_music', 'has_sfx', 'has_footage'],
          };
        case 15:
        case 16:
          return {
            left: ['duration', 'resolution', 'file_size'],
            right: ['text_spots', 'video_spots', 'logo_spots', 'has_music', 'has_sfx', 'has_footage'],
          };
        case 11:
          return {
            left: ['projection', 'viewing_field', 'resolution', 'file_size'],
            right: ['property_release', 'location', 'source', 'rendering'],
          };
        case 12:
          return {
            left: ['projection', 'viewing_field', 'duration', 'resolution', 'file_size'],
            right: ['property_release', 'location', 'source', 'rendering'],
          };
        case 21:
          return {
            left: ['dimensions', 'background'],
            right: ['bodymovin_version', 'format', 'file_size', 'source', 'rendering'],
          };
        default:
          return {
            left: [],
            right: [],
          };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
dl {
  column-count: 2;

  > div {
    -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
              page-break-inside: avoid; /* Firefox */
                   break-inside: avoid; /* IE 10+ */
  }
}

dt {
  font-weight: normal;
}
dd {
  break-before: avoid;
  font-weight: bold;
}
</style>
