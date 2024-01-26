<template>

  <select
    :disabled="!isSortEnabled"
    v-model="inputSort"
    @change="$emit('change', $event.target.value)"
    class="custom-select"
  >
    <option value="popular">{{ $t('search.most_popular') }}</option>
    <option value="match">{{ $t('search.best_match') }}</option>
    <option value="latest">{{ $t('search.latest') }}</option>

    <option v-show="!isImage" value="price">{{ $t('search.price') }}: {{ $t('search.low_to_high') }}</option>
    <option v-show="!isImage" value="-price">{{ $t('search.price') }}: {{ $t('search.high_to_low') }}</option>
    <option v-show="!isImage" value="duration">{{ $t('search.duration') }}: {{ $t('search.short_to_long') }}</option>
    <option v-show="!isImage" value="-duration">{{ $t('search.duration') }}: {{ $t('search.long_to_short') }}</option>

  </select>

</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { isProductType } from '@motionelements/core/src/services/catalog.service.js';

export default {
  name: 'search-sort-by-select',
  components: {
  },
  data: function () {
    return {
    };
  },
  computed: {
    ...mapState({
      currentMediaTypeCode: state => state.search.mediaType,
      filters: state => state.search.filter,
    }),
    ...mapGetters({
      sort: 'search/sort',
    }),
    isImage() {
      return isProductType('image', this.currentMediaTypeCode);
    },
    isSortEnabled() {
      return !(_.get(this.filters, 'similar') || _.get(this.filters, 'color'));
    },
    inputSort: {
      get() {
        return this.sort;
      },
      set(value) {
        console.log('inputSort set:', value);

        if (typeof (Storage) !== 'undefined') {
          const preference = JSON.parse(sessionStorage.getItem('search:preferences'));
          // console.log('inputSort preference', preference);

          if (_.get(preference, 'sort') !== value) {
            // console.log('inputSort sessionStorage', preference);
            sessionStorage.setItem('search:preferences', JSON.stringify({ sort: value }));
          }
        }

        this.$store.dispatch('search/setSort', value);

        this.$router.push({
          query: {
            ...this.$route.query,
            sort: value,
            page: 1,
          },
        });
      },
    },
  },
  created() {
  },
  methods: {
  },
};
</script>
