<template>
  <div class="category-music-wrapper">
    <div class="d-flex justify-content-center flex-column align-items-stretch flex-sm-row align-items-sm-center mb-3">
      <ButtonGroupToggleCustom
        :tabs="[
          {
            name: $t('category.mood'),
          },
          {
            name: $t('category.genre'),
          },
          {
            name: $t('category.category'),
          },
        ]"
        class="flex-column align-items-stretch text-center flex-sm-row align-items-center text-sm-left"
      ></ButtonGroupToggleCustom>
    </div>
    <div>
      <div class="tab-content">
        <div
          v-for="(cate, index) in data"
          :key="index"
          :class="index == 0 ? 'show active' : ''"
          class="tab-pane fade"
          :id="`tab-${_.camelCase(cate.name)}`"
          role="tabpanel"
          :aria-labelledby="`${_.camelCase(cate.name)}-tab`"
        >
          <div class="row">
            <div class="col col-12 col-lg-4 mb-3 cjk-word-break">
              <h3>{{ cate.name }}</h3>
              <span class="cjk-word-break" v-html="cate.description"></span>
            </div>
            <div class="col mb-3">
              <div class="text-center">
                <CategoryButton
                  v-for="category in cate.categories"
                  :key="category.index"
                  :category="category"
                  :categoriesEN="categoriesEN"
                ></CategoryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import terms from '@/terms/index.js';

export default {
  name: 'category-wrapper-music',
  components: {
    ButtonGroupToggleCustom: () => import('@/components/modules/common/ButtonGroupToggleCustom.vue'),
    CategoryButton: () => import('@/components/modules/common/CategoryButton.vue'),
  },
  data() {
    return {
      data: [],
      categoriesEN: [],
    };
  },
  mounted() {
    const lang = this.$i18n.locale;
    this.categoriesEN = Object.freeze(terms.music.en.moods.concat(terms.music.en.genres).concat(terms.music.en.categories));
    this.data = [
      {
        name: this.$t('category.mood'),
        description: this.$t('category.mood_text'),
        categories: terms.music[lang].moods,
      },
      {
        name: this.$t('category.genre'),
        description: this.$t('category.genre_text'),
        categories: terms.music[lang].genres,
      },
      {
        name: this.$t('category.category'),
        description: this.$t('category.category_text'),
        categories: terms.music[lang].categories,
      },
    ];
  },
};
</script>
