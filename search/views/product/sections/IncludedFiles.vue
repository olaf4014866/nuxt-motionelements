<template>
  <!-- View Included Files & Readme -->
  <div>
    <hr v-if="hasArchiveEntries || hasReadme" />
    <ButtonLadda
      v-if="hasArchiveEntries"
      type="button"
      :icon="['far','me-files']"
      class="btn btn-sm btn-block btn-light"
      @button-click="showIncludedFilesModal"
    >
      {{ $t('product_page.view_included_files') }}
    </ButtonLadda>
    <ButtonLadda
      v-if="hasReadme"
      type="button"
      :icon="['far','file']"
      class="btn btn-sm btn-block btn-light"
      @button-click="downloadReadme()"
    >
      {{ $t('product_page.readme_file') }}
    </ButtonLadda>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'included-files',
  components: {
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
  },
  props: {
    element: Object,
    relationships: Object,
  },
  data() {
    return {
      sku: false,
      selectedSku: false,
    };
  },
  computed: {
    ...mapState({
    }),
    hasArchiveEntries() {
      return !!_.get(this.element, 'mediaTypeDetails.archiveEntries');
    },
    readme() {
      if (_.has(this.element, 'tutorials')) {
        return this.element.tutorials.find(x => x.format === 'readme');
      }
      return false;
    },
    hasReadme() {
      // @temp hide readme
      return false;
      // return !!this.readme;
    },
  },
  methods: {
    downloadReadme() {
      const url = _.get(this.readme, 'url');

      if (url) {
        // const readme = this.element.tutorials.find(x => x.format === 'readme');
        window.open(url);
      }
    },
    // openTutorial() {
    //   const video = this.element.tutorials.find(x => x.format === 'video');
    //   window.open(video.url);
    // },
    showIncludedFilesModal() {
      const Modal = () => ({
        component: import('@/views/product/modals/IncludedFiles.vue'),
      });

      this.$store.dispatch('modal/show', {
        component: Modal,
        props: {
          element: this.element,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-ver {
    .ver-label, .ver-price, .ver-price p {
      margin-bottom: 0;
    }

    .ver-label {
      font-weight: bold;
    }

    &.active {
      padding: 0.125rem 0.875rem;
      border-width: .125rem;
      border-color: $primary !important;
    }
  }
</style>
