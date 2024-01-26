<template>
  <a
    :href="setUrl(category.url)"
    class="btn btn-category mx-2 mb-3 px-3 px-xl-4 py-2 rounded"
  >
    <i
      :class="`me-cat icon-cat-${getIconClass()}`"
      class="fal fa-3x text-gradient-primary"
      ></i>
    <p class="small">{{ category.name }}</p>
  </a>
</template>

<script>

export default {
  name: 'category-button',
  props: {
    category: Object,
    categoriesEN: Array,
  },
  methods: {
    setUrl(url) {
      const mt = this.$store.getters['site/currentMediaType'];
      if (url.startsWith('/')) {
        return this.$siteUrl(url).www().url();
      }
      if (url.startsWith('?')) {
        return this.$siteUrl(`/${mt.id}${url}`).search().url();
        // return `${this.$siteUrl(mt.id).search().url()}${url}`;
      }
      return url;
    },
    getIconClass() {
      if (this.category.icon) {
        return this.category.icon;
      }
      if (this.$i18n.locale === 'en') {
        const name = _.kebabCase(_.replace(this.category.name, '&', 'and'));
        return name
          .replace('logos', 'logo')
          .replace('transitions', 'transition')
          .replace('weddings', 'wedding');
      }
      return this.findEnName(this.category.id)
        .replace('logos', 'logo')
        .replace('transitions', 'transition')
        .replace('weddings', 'wedding');
    },
    findEnName(id) {
      const item = this.categoriesEN.filter(x => x.id === id);
      // console.log('find en name: ', id, item[0].name);
      return _.kebabCase(_.replace(item[0].name, '&', 'and'));
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-category {
  // // flex-grow: 1;
  // // flex-shrink: 1;
  // flex-basis: 0;
  // text-align: center;
  white-space: nowrap;

  @include box-shadow($box-shadow-sm);
  transition: box-shadow 0.2s cubic-bezier(0.165, 0.840, 0.440, 1.000);

  &:hover {
    @include box-shadow($box-shadow);
  }

  > i {
    line-height: 1.5;

    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
  }

  p {
    &:last-child {
      margin-bottom:0;
    }
  }
}
</style>
