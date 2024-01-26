<template>
  <div class="card">

    <a v-if="!isHighlight" :href="article.link">
      <img
        v-if="article.image.url"
        :data-src="article.image.url"
        :alt="article.title"
        class="card-img-top lazyload"
      >
    </a>

    <div
      :class="`${isHighlight ? 'd-flex flex-column align-items-center justify-content-center text-center' : ''} bg-${article.background}`"
      class="card-body"
    >
      <font-awesome-icon
        v-if="article.icon && isHighlight"
        :icon="article.icon"
        fixed-width size="3x"
        class="mb-3"></font-awesome-icon>
      <p v-if="article.category"><span class="badge badge-primary">{{ article.category }}</span></p>
      <a :href="article.url"><h5 class="card-title" v-html="article.title"></h5></a>
      <p class="card-text small">{{ article.description.substring(0, 100) }}...</p>
      <a v-if="isHighlight" :href="article.url" class="btn btn-white-secondary">{{ $t('cta.learn_more') }}</a>
    </div>

    <!-- <div v-if="!isHighlight" class="card-footer bg-transparent border-top-0">
      <small class="text-muted">{{ formatDate(article.published_at) }}</small>
    </div> -->
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'community-card',
  props: {
    article: Object,
  },
  computed: {
    isHighlight: function () {
      return this.article.type === 'highlight';
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'YYYY-MM-DD');
    },
  },
};
</script>
