<template>
  <div
    v-show="totalPage > 1"
    class="btn-toolbar btn-toolbar-pagination justify-content-between justify-content-sm-center"
    role="toolbar"
  >

    <!-- Prev Page Button -->
    <button
      @click="goPrevPage()"
      :disabled="currentPage < 2"
      type="button"
      class="btn btn-light mr-2"
    ><font-awesome-icon :icon="['fas','chevron-left']"></font-awesome-icon> {{ $t('pagination.previous') }}
    </button>
    <!-- Prev Page Button -->


    <div class="btn-group d-none d-sm-flex" role="group">

      <!-- First Page Button -->
      <button
        @click="goPage(1)"
        v-show="currentPage >= 2"
        type="button"
        class="btn btn-link"
      >1
      </button>
      <!-- First Page Button -->

      <!-- Have more Page -->
      <button
        v-show="currentPage >= 5 && (currentPage-10 != 2) "
        type="button"
        class="btn btn-link disabled"
      >...
      </button>
      <!-- Have more Page -->

      <!-- Prev 10 Page Button -->
      <button
        @click="goPage(currentPage-10)"
        v-show="(currentPage-10) >= 2 && currentPage >= (currentPage-10)"
        type="button"
        class="btn btn-link"
      >{{currentPage-10}}
      </button>
      <!-- Prev 10 Page Button -->

      <!-- Prev 2 Page Button -->
      <button
        @click="goPage(currentPage-2)"
        v-show="(currentPage-2) >= 2  && currentPage >= (currentPage-2)"
        type="button" class="btn btn-link"
      >{{currentPage-2}}
      </button>
      <!-- Prev 2 Page Button -->

      <!-- Prev Page Button -->
      <button
        @click="goPage(currentPage-1)"
        v-show="(currentPage-1) >= 2  && currentPage >= (currentPage-1)"
        type="button"
        class="btn btn-link"
      >{{currentPage-1}}
      </button>
      <!-- Prev Page Button -->
    </div>


    <!-- current page button -->
    <button
      href="#"
      type="button"
      class="btn btn-simple-dark btn-current disabled"
    >{{currentPage}} <span class="d-inline d-sm-none">/ {{totalPage}}</span>
    </button>
    <!-- current page button -->


    <div class="btn-group mr-2 d-none d-sm-flex" role="group">
      <!-- Next Page Button -->
      <button
        v-show="currentPage+1 < totalPage"
        @click="goPage(currentPage+1)"
        type="button"
        class="btn btn-link"
      >{{currentPage+1}}
      </button>
      <!-- Next Page Button -->

      <!-- Next 2 Page Button -->
      <button
        v-show="currentPage+2 < totalPage"
        @click="goPage(currentPage+2)"
        type="button"
        class="btn btn-link"
      >{{currentPage+2}}
      </button>
      <!-- Next 2 Page Button -->

      <!-- Next 10 Page Button -->
      <button
        v-show="currentPage+10 < totalPage"
        @click="goPage(currentPage+10)"
        type="button"
        class="btn btn-link"
      >{{currentPage+10}}
      </button>
      <!-- Next 10 Page Button -->

      <!-- Have more Page -->
      <button
        v-show="currentPage+3 < totalPage || (currentPage+10 == totalPage-1)"
        type="button"
        class="btn btn-link disabled"
      >...
      </button>
      <!-- Have more Page -->

      <!-- Next 10 Page Button -->
      <button
        v-show="currentPage < totalPage"
        @click="goPage(totalPage)"
        type="button"
        class="btn btn-link"
      >{{totalPage}}
      </button>
      <!-- Next 10 Page Button -->
    </div>


    <!-- Next Page Button -->
    <button
      :disabled="currentPage >= totalPage"
      @click="goNextPage()"
      type="button"
      class="btn btn-light mr-2"
    >{{ $t('pagination.next') }} <font-awesome-icon :icon="['fas','chevron-right']"></font-awesome-icon>
    </button>
    <!-- Next Page Button -->

  </div>
</template>

<script>

export default {
  name: 'component-pagination',
  components: {},
  data() {
    return {
    };
  },
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    itemPerPage: {
      type: Number,
      default: 10,
    },
  },
  computed: {

  },
  created() {},
  mounted() {},
  methods: {
    goPage(targetPage) {
      console.log('goPage', targetPage);

      const lang = this.$route.params.lang || 'en';

      this.$router.push({
        path: `/${lang}/history/list`,
        query: {
          page: targetPage,
        },
      });
    },
    goNextPage() {
      let currentPage = parseInt(this.$route.query.page, 10) || 1;
      console.log('goNextPage', currentPage);

      if (currentPage < this.totalPage) {
        currentPage += 1;

        const lang = this.$route.params.lang || 'en';
        this.$router.push({
          path: `/${lang}/history/list`,
          query: {
            page: currentPage,
          },
        });
      }
    },
    goPrevPage() {
      let currentPage = parseInt(this.$route.query.page, 10) || 1;
      console.log('goNextPage', currentPage);

      if (currentPage > 1) {
        currentPage -= 1;

        const lang = this.$route.params.lang || 'en';
        this.$router.push({
          path: `/${lang}/history/list`,
          query: {
            page: currentPage,
          },
        });
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
