<template>

  <div
    v-show="pageTotal > 1"
    class="btn-toolbar btn-toolbar-pagination justify-content-between justify-content-sm-center"
    role="toolbar"
  >

    <button
      @click="goPrevPage"
      :disabled="pageNow < 2"
      type="button"
      class="btn btn-light mr-2"
    ><font-awesome-icon :icon="['fas','chevron-left']"></font-awesome-icon> {{ $t('pagination.previous') }}
    </button>

    <div class="btn-group d-none d-sm-flex" role="group">

      <button
        v-show="pageNow >= 2"
        @click="goPage(1)"
        type="button"
        class="btn btn-link"
      >1
      </button>

      <button
        v-show="pageNow >= 5 && (pageNow-10 != 2) "
        type="button"
        class="btn btn-link disabled"
      >...
      </button>

      <button
        v-show="(pageNow-10) >= 2 && pageNow >= (pageNow-10)"
        @click="goPage(pageNow-10)"
        type="button"
        class="btn btn-link"
      >{{pageNow-10}}
      </button>

      <button
        v-show="(pageNow-2) >= 2  && pageNow >= (pageNow-2)"
        @click="goPage(pageNow-2)"
        type="button" class="btn btn-link"
      >{{pageNow-2}}
      </button>

      <button
        v-show="(pageNow-1) >= 2  && pageNow >= (pageNow-1)"
        @click="goPage(pageNow-1)"
        type="button"
        class="btn btn-link"
      >{{pageNow-1}}</button>

    </div>

    <button
      href="#"
      type="button"
      class="btn btn-simple-dark btn-current disabled"
    >{{pageNow}} <span class="d-inline d-sm-none">/ {{pageTotal}}</span>
    </button>

    <div class="btn-group mr-2 d-none d-sm-flex" role="group">
      <button v-show="pageNow+1 < pageTotal" @click="goPage(pageNow+1)" type="button" class="btn btn-link">{{pageNow+1}}</button>
      <button v-show="pageNow+2 < pageTotal" @click="goPage(pageNow+2)" type="button" class="btn btn-link">{{pageNow+2}}</button>
      <button v-show="pageNow+10 < pageTotal" @click="goPage(pageNow+10)" type="button" class="btn btn-link">{{pageNow+10}}</button>

      <button v-show="pageNow+3 < pageTotal || (pageNow+10 == pageTotal-1)" type="button" class="btn btn-link disabled">...</button>
      <button v-show="pageNow < pageTotal" @click="goPage(pageTotal)" type="button" class="btn btn-link">{{pageTotal}}</button>
    </div>

    <button
      :disabled="pageNow >= pageTotal"
      @click="goNextPage"
      type="button"
      class="btn btn-light mr-2"
    >{{ $t('pagination.next') }} <font-awesome-icon :icon="['fas','chevron-right']"></font-awesome-icon></button>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'favorites-pagination',
  computed: {
    ...mapState({
      itemTotel: state => state.site.pagination.pageTotal,
      pageNow: state => state.site.pagination.pageNow,
      pageTotal: state => Math.ceil(state.site.pagination.pageTotal / state.site.pagination.itemPerPage, 10),
    }),
  },
  created() {},
  mounted() {},
  methods: {
    goPage(page) {
      console.log(page);
      const folderId = this.$route.params.folderId;
      const lang = this.$route.params.lang;
      const collection = this.$route.query.collection;

      let filter = [];
      if (_.isString(this.$route.query['mt[]'])) {
        filter.push(this.$route.query['mt[]']);
      }

      if (_.isArray(this.$route.query['mt[]'])) {
        filter = this.$route.query['mt[]'];
      }

      this.$router.push({
        path: `/${lang}/favorites/edit/${folderId}`,
        query: {
          page: page,
          collection: collection,
          'mt[]': filter,
        },
      });

      // this.$store.dispatch('site/setPageNow', page);
      // this.$root.$emit('getFavoriteContent');
    },
    goNextPage() {
      let pageNow = this.$store.getters['site/pageNow'];
      const pageTotal = this.$store.getters['site/pageTotal'];

      if (pageNow < pageTotal) {
        const folderId = this.$route.params.folderId;
        const lang = this.$route.params.lang;
        const collection = this.$route.query.collection;

        let filter = [];
        if (_.isString(this.$route.query['mt[]'])) {
          filter.push(this.$route.query['mt[]']);
        }

        if (_.isArray(this.$route.query['mt[]'])) {
          filter = this.$route.query['mt[]'];
        }

        this.$router.push({
          path: `/${lang}/favorites/edit/${folderId}`,
          query: {
            page: pageNow += 1,
            collection: collection,
            'mt[]': filter,
          },
        });

        // pageNow += 1;
        // this.$store.dispatch('site/setPageNow', pageNow);
        // this.$root.$emit('getFavoriteContent');
      }
    },
    goPrevPage() {
      let pageNow = this.$store.getters['site/pageNow'];
      // console.log(pageNow);

      if (pageNow > 1) {
        const folderId = this.$route.params.folderId;
        const lang = this.$route.params.lang;
        const collection = this.$route.query.collection;

        let filter = [];
        if (_.isString(this.$route.query['mt[]'])) {
          filter.push(this.$route.query['mt[]']);
        }

        if (_.isArray(this.$route.query['mt[]'])) {
          filter = this.$route.query['mt[]'];
        }

        this.$router.push({
          path: `/${lang}/favorites/edit/${folderId}`,
          query: {
            page: pageNow -= 1,
            collection: collection,
            'mt[]': filter,
          },
        });

        // pageNow -= 1;
        // this.$store.dispatch('site/setPageNow', pageNow);
        // this.$root.$emit('getFavoriteContent');
      }
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
