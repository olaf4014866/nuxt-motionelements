<template>
  <button type="button"
          :class="isCopied ? 'btn-success' : ''"
          v-clipboard:copy="copy"
          v-clipboard:success="onCopySuccess"
          v-clipboard:error="onCopyError">
    <font-awesome-icon
      :icon="['far','clipboard']"
      class="mr-1"
      :title="$t('cta.copy')"
    />
    <template v-if="label !== false">
      {{ isCopied ? $t('cta.copied') : $t('cta.copy') }}
    </template>
  </button>
</template>

<script>
export default {
  name: 'button-copy-clipboard',
  components: {
  },
  props: {
    // string to copy
    copy: {
      type: String,
      required: true,
    },
    label: {
      type: [String, Boolean],
    },
  },
  data() {
    return {
      isCopied: false,
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onCopySuccess() {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    },
    onCopyError() {
    },
  },
};
</script>
