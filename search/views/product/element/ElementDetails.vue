<template>
  <dl class="element-details small">
    <div class="left">
      <div v-if="element.id">
        <dt class="text-muted">{{ $t('product.code') }}</dt>
        <dd>{{ element.id }}</dd>
        <dt class="text-muted">{{ $t('product.type') }}</dt>
        <dd>{{ $term('mediaType', mediaType).text() }}</dd>
      </div>

      <div class="details-all" v-for="(attributeSchema, attributeCode) in leftColumnAttributes"
           :key="attributeCode">
        <ElementAttribute
          :code="attributeCode"
          :schema="attributeSchema"
          :element="element"
          :masterVariant="masterVariant"
        />
      </div>
    </div>

    <div>
      <div class="details-right" v-for="(attributeSchema, attributeCode) in rightColumnAttributes"
           :key="attributeCode">
        <ElementAttribute
          :code="attributeCode"
          :schema="attributeSchema"
          :element="element"
          :masterVariant="masterVariant"
        />
      </div>
    </div>

  </dl>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'section-details',
  props: {
    element: {
      type: Object,
      required: true,
    },
  },
  components: {
    ElementAttribute: () => import('@/views/product/element/details/ElementAttribute.vue'),
  },
  computed: {
    ...mapState({
      schema: state => state.product.elementSchema,
    }),
    // by marksun
    masterVariant() {
      for (let i = 0; i < this.element.variants.length; i += 1) {
        if (this.element.variants[i].master) {
          return this.element.variants[i];
        }
      }
      return this.element.variants[0];
    },
    mediaType() {
      return this.element.mediaType;
    },
    leftColumnAttributes() {
      const schema = this.schema;
      const fields = {};
      _.intersection(_.keys(schema), this.columnAttributeMap.left).forEach((key) => {
        fields[key] = schema[key];
      });
      return fields;
    },
    rightColumnAttributes() {
      const schema = this.schema;
      const fields = {};
      _.intersection(_.keys(schema), this.columnAttributeMap.right).forEach((key) => {
        fields[key] = schema[key];
      });
      return fields;
    },
    columnAttributeMap() {
      switch (this.mediaType) {
        case 'photo':
        case 'gif':
          return {
            left: ['dimension', 'alpha'],
            right: ['license',
              'modelRelease', 'propertyRelease', 'location', 'source'],
          };
        case 'photo_vr':
          return {
            left: ['projection', 'viewingField', 'resolution', 'fileSize'],
            right: [
              'modelRelease', 'propertyRelease', 'location', 'source', 'rendering'],
          };
        case 'vector':
          return {
            left: [],
            right: ['license',
              'source'],
          };
        case 'video_live':
        case 'animation':
          return {
            left: ['loop', 'duration', 'aspectRatio', 'alpha'],
            right: ['license',
              'modelRelease', 'propertyRelease', 'location', 'source', 'rendering'],
          };
        case 'video_vr':
          return {
            left: ['duration', 'resolution', 'fileSize', 'projection', 'viewingField'],
            right: ['license',
              'modelRelease', 'propertyRelease', 'location', 'source', 'rendering'],
          };
        case '3d_model':
          return {
            left: ['geometry', 'vertices', 'polygons', 'rigged', 'animated'],
            right: ['license',
              'source', 'rendering'],
          };
        case 'music':
          return {
            left: ['editType', 'loop', 'duration', 'bpm', 'musicalKey', 'audioCodec', 'audioBitDepth', 'audioSampleRate', 'audioChannels', 'fileSize'],
            right: [
              'license', 'youtubeContentId',
              'musicalWorks', 'composers', 'publishers', 'source'],
          };
        case 'sfx':
          return {
            left: ['duration', 'audioCodec', 'audioBitDepth', 'audioSampleRate', 'audioChannels', 'fileSize'],
            right: ['license',
              'source'],
          };
        case 'ae_template':
          return {
            left: ['softwareRequired', 'pluginsRequired', 'durations', 'dimensions', 'fileSize',
              // specific to ae
              'universalized', 'expression', 'composition',
            ],
            right: ['license',
              'textPlaceholders', 'videoPlaceholders', 'logoPlaceholders',
              'hasMusic', 'hasSfx', 'hasVideo'],
          };
        case 'motion_template':
          return {
            left: ['softwareRequired', 'pluginsRequired', 'durations', 'dimensions', 'fileSize',
              // specific to motion
              'editableInFcp',
            ],
            right: ['license',
              'textPlaceholders', 'videoPlaceholders', 'logoPlaceholders',
              'hasMusic', 'hasSfx', 'hasVideo'],
          };
        case 'pr_template':
        case 'mg_template':
        case 'resolve_template':
          return {
            left: ['softwareRequired', 'pluginsRequired', 'durations', 'dimensions', 'fileSize'],
            right: ['license',
              'textPlaceholders', 'videoPlaceholders', 'logoPlaceholders',
              'hasMusic', 'hasSfx', 'hasVideo'],
          };
        case 'ae_preset':
        case 'pr_preset':
        case 'resolve_macro':
          return {
            left: ['softwareRequired', 'fileSize'],
            right: ['license',
            ],
          };
        case 'lottie':
          return {
            left: ['softwareRequired', 'dimensions', 'background'],
            right: ['license',
              'format', 'jsonFileSize', 'source', 'rendering'],
          };
        default:
          return {
            left: [],
            right: [],
          };
      }
    },
  },
  methods: {

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

.element-details::v-deep {
  dt {
    font-weight: normal;
  }

  dd {
    break-before: avoid;
    font-weight: bold;
  }
}
</style>
