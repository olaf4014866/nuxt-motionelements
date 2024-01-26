<template>
  <div class="card-columns">
    <div v-for="section in faqs"
         :key="section.index"
         class="card">
      <div class="card-body">
        <h5>{{ section.heading }}</h5>
        <FaqItem v-for="faq in section.questions"
                 :key="`faq-${faq.id}`"
                 :id="`faq-${faq.id}`"
                 :expand="!!_.get(faq, 'expand')"
                 @click.native="$set(faq, 'expand', true)">
        >
          <template v-slot:question>
            {{ faq.question }}
          </template>
          <template v-slot:answer>
            <div v-html="faq.answer"></div>
          </template>
        </FaqItem>
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from '@/components/modules/faq/FaqItem.vue';

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
