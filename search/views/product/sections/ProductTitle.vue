<template>
  <div class="d-flex flex-nowrap flex-column flex-lg-row justify-content-between align-items-center align-items-lg-start mb-3">
    <div class="d-flex flex-column align-items-stretch align-items-lg-start mb-3 mb-lg-0 pr-lg-3 min-w-0 text-center">
      <p class="text-muted small mb-0" v-if="collection">
        <i class="fas fa-fw me-bmt icon-collection text-muted"></i>
        {{ $t('term.collection') }}
      </p>
      <p class="text-muted small mb-0" v-else-if="element">
        <ProductIcon
          :productType="element.mediaType"
          size="lg"
          class="mr-1"
        />
        {{ $term('mediaType', element.mediaType === 'gif' ? 'image' : element.mediaType ).seo().text() }}
      </p>
       <div class="position-relative">
        <h2 class="h4 mb-0 element-title text-lg-left">
          {{ title }}
        </h2>
      </div>
      <div class="btn-categories" v-if="element">
        <nuxt-link
          v-for="category in displayCategories"
          :key="`category-${category.id}`"
          class="btn btn-sm btn-simple-secondary"
          :to="$link(getCategoryHref(category.url, category.id)).fullPath()"
        >
          {{ category.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="btn-secondary-actions mb-3 d-flex flex-nowrap">
      <nuxt-link v-if="element"
        class="btn btn-simple-secondary"
        :to="`$link(searchSimilarUrl).fullPath()`"
      >
        <font-awesome-icon
          :icon="['far','me-search-ai']"
          class="mr-1"
        />
        {{ $t('cta.similar') }}
      </nuxt-link>

      <nuxt-link
        v-if="hasSample"
        class="btn btn-simple-secondary"
        :to="'$link(`/download/sample/${element.id}`).url()'"
      >
        <font-awesome-icon
          :icon="['far','me-download']"
          class="mr-1"
        />
        {{ $t('cta.sample') }}
      </nuxt-link>

      <button v-if="element"
        type="button"
        class="btn btn-simple-secondary"
        @click.prevent="showShareModal()"
      >
        <font-awesome-icon
          :icon="['far','share']"
          class="mr-1"
        />
        {{ $t('cta.share') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';
// import $term from '@motionelements/old-modules/src/helper/term.js'

export default {
  name: 'title-section',
  components: {
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      // currentMediaType: state => state.site.currentMediaType.id,
    }),
    element() {
      return this.product//this.product.object === 'element' ? this.product : false;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : false;
    },
    mediaType() {
      return this.element ? this.element.mediaType : null;
    },
    title() {
      return this.product.name;
    },
    genres() {
      if (this.element && this.mediaType === 'music') {
        return this.element.categories.filter(v => v.type === 'genre');
      }
      return [];
    },
    displayCategories() {
      const limit = 3;
      if (this.element) {
        if (this.genres.length) {
          return this.genres.slice(0, limit);
        }
        if (this.element.categories.length) {
          return this.element.categories.slice(0, limit);
        }
      }
      return [];
    },
    searchSimilarUrl() {
      if (this.mediaType) {
        return this.$siteUrl(`/${this.mediaType.replace('_', '-')}?similar=${this.element.id}&page=1`).search().url();
      }
      return null;
    },
    hasSample() {
      if (!this.element) {
        return false;
      }
      // if no preview
      if (!_.size(this.element.previews)) {
        return false;
      }

      return ['photo', 'photo_vr'].includes(this.mediaType)
      || isProductType('video', this.mediaType)
      || isProductType('audio', this.mediaType)
      || isProductType('video_template', this.mediaType);
    },
  },
  methods: {
    getCategoryHref(url, id) {
      if (this.mediaType) {
        console.log(this.mediaType.replace('_', '-'))
        return url ? url : this.$siteUrl(`/${this.mediaType.replace('_', '-')}?category=${id}`).search().url();
      }
      return null;
    },
    showShareModal() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/product/modals/Share.vue'),
        }),
        props: {
          product: this.product,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.min-w-0 {
  min-width: 0;
}

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
