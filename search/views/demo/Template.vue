<template>
  <div></div>
</template>

<script>
// import modalMixin from '@/components/mixins/modal.mixin';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'template',
  // mixins: [modalMixin],
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    // PreviewSmall: () => import('@/views/product/preview/PreviewSmall.vue'),
  },
  data() {
    return {
      foo: false,
    };
  },
  computed: {
    ...mapState({
      email: state => state.user.member.email,
    }),
    ...mapGetters({
      isMember: 'user/isMember',
      currentLanguage: 'user/getLanguageCode',
      currentCurrency: 'user/getCurrencyCode',
    }),
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showModal() {
      this.$store.dispatch('modal/show', {
        component: () => ({
          component: import('@/views/product/modals/Share.vue'),
        }),
        props: {},
      });
    },
  },
  watch: {
    foo(toValue, fromValue) {
      console.log('watch', toValue, fromValue);
    },
  },
};
</script>
