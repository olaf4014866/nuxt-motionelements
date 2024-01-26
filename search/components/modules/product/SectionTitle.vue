<template>
  <div class="d-flex flex-nowrap flex-column flex-lg-row justify-content-between align-items-center align-items-lg-start mb-3">
    <div class="d-flex flex-column align-items-center align-items-lg-start mb-3 mb-lg-0">
      <p class="text-muted small mb-0">
        <!-- { <i :class="`fas fa-lg mr-1 me-bmt ${mediaTypeIcon}`"></i>
        {{ this.$term('mediaType', currentMediaType ).seo().text() }} } -->
      </p>
      <h2 class="h4 mb-0 element-title">
        {{ element.name }}
      </h2>
      <div class="btn-categories">

        <a
          v-for="category in displayCategories"
          :key="`category-${category.id}`"
          class="btn btn-sm btn-simple-secondary cjk-word-break"
          :href="$siteUrl(`/${currentMediaType}?cat=${category.id}`).search().url()"
        >
          {{ category.name }}
        </a>

      </div>
    </div>
    <!-- <div class="btn-secondary-actions mb-3 d-flex flex-nowrap">
      <a
        class="btn btn-simple-secondary"
        :href="$siteUrl(`/${currentMediaType}?similar=${element.id}&page=1`).search().url()"
      >
        <font-awesome-icon
          :icon="['far','me-search-ai']"
          class="mr-1"
        ></font-awesome-icon>
        {{ $t('cta.search_similar') }}
      </a>

      <a
        class="btn btn-simple-secondary"
        :href="$siteUrl(`/download/sample/${element.id}`).www().url()"
      >
        <font-awesome-icon
          :icon="['far','me-download']"
          class="mr-1"
        ></font-awesome-icon>
        {{ $t('cta.download_demo') }}
      </a>

      <button
        type="button"
        class="btn btn-simple-secondary"
        @click.prevent="shareClick()"
      >
        <font-awesome-icon
          :icon="['far','share']"
          class="mr-1"
        ></font-awesome-icon>
        {{ $t('cta.share') }}
      </button>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'title-section',
  props: {
    element: Object,
  },
  computed: {
    ...mapState({
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    displayCategories() {
      if (this.element.genres) {
        return this.element.genres;
      }
      return this.element.categories;
    },
  },
  methods: {
    shareClick() {
      this.$root.$emit('show-modal', 'share-sheet');
    },
  },
};
</script>

<style lang="scss" scoped>
.element-title {
  @include media-breakpoint-down(md) {
    text-align: center;
    font-size: $font-size-lg;
  }
}
.btn-categories {
  .btn {
    &:not(:last-child) {
      margin-right: map-get($spacers,1);
    }
  }
}

.btn-secondary-actions {
  .btn {
    white-space: nowrap;

    &:not(:last-child) {
      margin-right: map-get($spacers,2);
    }

    @include media-breakpoint-down(sm) {
      @include button-size(
        $btn-padding-y-sm,
        $btn-padding-x-sm,
        $btn-font-size-sm,
        $btn-line-height-sm,
        $btn-border-radius-sm)
    }
  }
}
</style>
