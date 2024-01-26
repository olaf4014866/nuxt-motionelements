<template>
  <Modal
    align="center"
  >
    <template v-slot:title>
      {{ $t('search.settings') }}
    </template>
    <form>
      <div class="form-group row d-flex d-md-none">
        <label
          class="col-sm-6 col-form-label"
          for="sort-by"
        >{{ $t('search.sort_by') }}</label>
        <div class="col-sm-6">
          <SelectSortBy
            id="sort-by"
            @change="onChange"
          />
          <!--
          <select
            :disabled="!enableSort"
            v-model="inputSort"
            @change="onChangeSortBy"
            alt="searchSort"
            class="custom-select"
            id="sort-by"
          >
            <option value="popular">{{ $t('search.most_popular') }}</option>
            <option value="match">{{ $t('search.best_match') }}</option>
            <option value="latest">{{ $t('search.latest') }}</option>

            <option v-show="!isImage" value="price">{{ $t('search.price') }}: {{ $t('search.low_to_high') }}</option>
            <option v-show="!isImage" value="-price">{{ $t('search.price') }}: {{ $t('search.high_to_low') }}</option>
            <option v-show="!isImage" value="duration">{{ $t('search.duration') }}: {{ $t('search.short_to_long') }}</option>
            <option v-show="!isImage" value="-duration">{{ $t('search.duration') }}: {{ $t('search.long_to_short') }}</option>
          </select>
          -->
        </div>
      </div>
      <div class="form-group row">
        <label
          for="itemsPerPage"
          class="col-sm-6 col-form-label"
        >{{ $t('search.result') }}</label>
        <div class="col-sm-6">
          <select
            v-model="itemPerPage"
            class="custom-select"
            id="itemsPerPage"
            name="itemsPerPage"
            @change="onChange"
          >
            <option value="10">10</option>
            <option value="50" selected>50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
          </select>
        </div>
      </div>

    </form>

    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-secondary"
        data-dismiss="modal"
      >{{ $t('search.close') }}</button>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'search-settings-modal',
  props: {
    element: Object,
  },
  data() {
    return {
    };
  },
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    SelectSortBy: () => import('@/views/search/header/SearchSortBySelect.vue'),
  },
  computed: {
    itemPerPage: {
      get() {
        return this.$store.state.search.pagination.perPage;
      },
      set(value) {
        // const filter = this.$store.getters['search/allSearchFilter'];
        // filter.itemPerPage = value;
        // filter.page = 1;
        // this.$store.dispatch('search/setFilter', filter);

        this.$store.dispatch('search/setPagination', {
          page: 1,
          perPage: value,
        });
      },
    },
  },
  methods: {
    onChange() {
      this.$store.dispatch('modal/hide');
    },
  },
};
</script>
