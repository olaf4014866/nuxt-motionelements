<template>
  <div>

      <a
        :href="category.url"
        class="d-block text-center"
      >
        <img :src="category.image.url" :alt="category.title" class="img-fluid rounded">
      </a>

      <div
        :class="category.items ? 'border-bottom': ''"
        class="py-2 px-3 category-name">
        <a :href="category.url"><h6 class="mb-0">{{ category.title }}</h6></a>
      </div>

      <div v-if="category.items" class="accordion" :id="`category-${_.camelCase(category.title)}`">

        <div v-for="subcategory in category.items" :key="subcategory.index" class="card border-0 small">
          <div
            class="subcategory-name card-header bg-transparent border-bottom m-0 d-flex justify-content-between align-items-center"
            :id="`category-${_.camelCase(category.title)}-${_.camelCase(subcategory.title)}`">
            <a
              :href="subcategory.url"
              class="flex-grow-1"
            >
              {{ subcategory.title }}
            </a>
            <button
              v-if="subcategory.items"
              class="btn btn-simple-secondary btn-sm"
              type="button"
              data-toggle="collapse"
              :data-target="`#${_.camelCase(category.title)}-${_.camelCase(subcategory.title)}-subcategories`"
              aria-expanded="true"
              :aria-controls="`#${_.camelCase(category.title)}-${_.camelCase(subcategory.title)}-subcategories`"
            >
              <font-awesome-icon :icon="['fas','caret-down']" fixed-width></font-awesome-icon>
            </button>
          </div>

          <div
            v-if="subcategory.items"
            :id="`${_.camelCase(category.title)}-${_.camelCase(subcategory.title)}-subcategories`"
            class="collapse"
            :data-parent="`#category-${_.camelCase(category.title)}`">
            <div class="card-body p-0">
              <ul class="list-group list-group-flush border-bottom">
                <li v-for="subsubcategory in subcategory.items" :key="subsubcategory.index" class="list-group-item">
                  <font-awesome-icon :icon="['fas','chevron-right']" fixed-width class="text-muted mr-1"></font-awesome-icon>
                  <a :href="subsubcategory.url">{{ subsubcategory.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SectionCategoryTable',
  props: {
    category: Object,
  },
};
</script>

<style lang="scss" scoped>
.category-name {
  h6 {
    line-height: 2.5rem;
  }

  &.border-bottom {
    padding-bottom: 0.4735rem;
  }
}
.subcategory-name {
  line-height: 2rem;
  padding-bottom: 0.4375rem;
}
</style>
