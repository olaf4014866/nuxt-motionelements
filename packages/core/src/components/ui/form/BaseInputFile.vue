<template>
  <label :for="id"
         class="video-preview-input btn btn-light m-0">
    {{ label || 'Select File' }}
    <input @change="$emit('change', $event)"
           type="file"
           :accept="accept"
           :id="id" />
  </label>
</template>

<script>
export default {
  name: 'base-input-file',
  data() {
    return {
    };
  },
  props: {
    id: String,
    // fileType: String,
    label: {
      type: String,
      required: false,
    },
    accept: {
      type: String,
    },
    // mimeTypes: {
    //   type: Array,
    //   required: false,
    // },
  },
  computed: {
    // acceptedMimeTypes() {
    //   return '.zip';
    //   // return this.mimeTypes ? this.mimeTypes.join(',') : '';
    //   // map mimeType
    //   // return this.extensions.map(extension => `${this.fileType}/${extension}`).join(',');
    // },
  },
  mounted() {
  },
  beforeDestroy() {},
  // methods: {
  //   onChange(e) {
  //     // const files = e.target.files;
  //     this.$emit('change', e.target.files);
  //   },
  // },
};
</script>

<style lang="scss" scoped>

.video-preview-input {
  line-height: 1;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

input[type="file"] {
  width: 0;
  height: 0;
  opacity: 0;
}

</style>
