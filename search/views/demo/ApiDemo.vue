<template>
  <div class="container">
    <h1>Test API 7</h1>
    {{ terms }}
    <div v-if="terms && _.has(terms, 'terms')">
      {{ terms.terms.s }}
    </div>
  </div>
</template>


<script>
import { listTerms } from '@/api/app.js';

export default {
  data() {
    return {
      terms: [],
    };
  },
  created() {
    try {
      listTerms().then((response) => {
        console.log('response', response);
        this.terms = ['loaded'];
      });
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    // setFontLoaded() {
    //   this.$emit('font-loaded');
    // },
  },
};
</script>
