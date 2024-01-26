<template>
  <div class="card-columns">
    <div v-for="faqsection in faqs" :key="faqsection.index" class="card">
      <div class="card-body">
        <h5>{{ faqsection.heading }}</h5>
        <FaqItem v-for="question in faqsection.questions" :key="`faq-${question.id}`" :id="`faq-${question.id}`">
          <template v-slot:question>
            {{ question.question }}
          </template>
          <template v-slot:answer>
            <div v-html="question.answer"></div>
          </template>
        </FaqItem>
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from '@/components/modules/common/FaqItem.vue';

export default {
  name: 'faq-section',
  components: {
    FaqItem,
  },
  props: {
    faqs: Array,
  },
  mounted() {
    console.log(this.faqs);
  },
};
</script>

<style lang="scss" scoped>

</style>
