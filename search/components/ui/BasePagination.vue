<template>
  <div
    v-show="pageTotal > 1"
    class="btn-toolbar btn-toolbar-pagination justify-content-between justify-content-sm-center"
    role="toolbar"
  >
    <button @click="changePage(page - 1)" :disabled="page < 2" type="button" class="btn btn-light mr-2">
      <font-awesome-icon :icon="['fas','chevron-left']"></font-awesome-icon>
      {{ $t('pagination.previous') }}
    </button>

    <div class="btn-group d-none d-sm-flex" role="group">
      <button @click="changePage(1)" v-show="page >= 2" type="button" class="btn btn-link">1</button>

      <button
        v-show="page >= 5 && (page-10 != 2) "
        type="button"
        class="btn btn-link disabled"
      >...</button>

      <button
        v-show="(page-10) >= 2 && page >= (page-10)"
        @click="changePage(page-10)"
        type="button"
        class="btn btn-link"
      >{{page-10}}</button>

      <button
        v-show="(page-2) >= 2  && page >= (page-2)"
        @click="changePage(page-2)"
        type="button"
        class="btn btn-link"
      >{{page-2}}</button>

      <button
        v-show="(page-1) >= 2  && page >= (page-1)"
        @click="changePage(page-1)"
        type="button"
        class="btn btn-link"
      >{{page-1}}</button>
    </div>

    <button href="#" type="button" class="btn btn-simple-dark btn-current disabled">
      {{page}}
      <span class="d-inline d-sm-none">/ {{pageTotal}}</span>
    </button>

    <div class="btn-group mr-2 d-none d-sm-flex" role="group">
      <button
        v-show="page+1 < pageTotal"
        @click="changePage(page+1)"
        type="button"
        class="btn btn-link"
      >{{page+1}}</button>
      <button
        v-show="page + 2 < pageTotal"
        @click="changePage(page+2)"
        type="button"
        class="btn btn-link"
      >{{page + 2}}</button>
      <button
        v-show="page + 10 < pageTotal"
        @click="changePage(page + 10)"
        type="button"
        class="btn btn-link"
      >{{page + 10}}</button>

      <button
        v-show="page+3 < pageTotal || (page+10 == pageTotal-1)"
        type="button"
        class="btn btn-link disabled"
      >...</button>
      <button
        v-show="page < pageTotal"
        @click="changePage(pageTotal)"
        type="button"
        class="btn btn-link"
      >{{pageTotal}}</button>
    </div>

    <button
      :disabled="page >= pageTotal"
      @click="changePage(page + 1)"
      type="button"
      class="btn btn-light mr-2"
    >
      {{ $t('pagination.next') }}
      <font-awesome-icon :icon="['fas','chevron-right']"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
// reference: https://github.com/bootstrap-vue/bootstrap-vue/blob/dev/src/components/pagination/pagination.js
export default {
  name: 'base-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    totalRows: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  computed: {
    page() {
      return this.currentPage;
    },
    pageTotal() {
      return Math.ceil(this.totalRows / this.perPage, 10);
    },
  },
  methods: {
    changePage(page) {
      page = Math.min(this.pageTotal, Math.max(1, page));
      this.$emit('change', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-dark {
  .btn-light {
    background: $gray-950;
    border-color: $gray-950;

    @include hover {
      background-color: $black;
    }
  }
}
</style>
