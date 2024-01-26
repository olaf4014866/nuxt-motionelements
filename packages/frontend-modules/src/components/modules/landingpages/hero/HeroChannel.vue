<template>
  <div>
    <div class="input-group mb-1 flex-nowrap">
      <!-- KEYWORDS INPUT BAR WITH TYPEAHEAD -->
      <VueBootstrapTypeahead
        ref="searchBar"
        v-model="inputKeyword"
        :placeholder="$t('channel.search_input_placeholder')"
        :data="typeaheadKeywords"
        :inputClass="'border-right-0 px-2 px-sm-3'"
        :maxMatches="4"
        :minMatchingChars="1"
        class="input-group-typeahead flex-fill"
      >
        <template slot="suggestion" slot-scope="{ data, htmlText }">
          <div class="d-flex align-items-center">
            <font-awesome-icon :icon="['far','search']" class="text-muted"></font-awesome-icon>
            <span class="mx-3" v-html="htmlText"></span>
            <a
              @click.stop.prevent="appendSearchKeyword(data)"
              class="typeahead-tapahead ml-auto btn btn-sm btn-outline-light"
            >
              <!-- when clicked, should update the input text with this suggestion value -->
              <!-- hidden using .d-none for now -->
              <font-awesome-icon :icon="['far','arrow-left']" :transform="{ rotate: 45 }"></font-awesome-icon>
            </a>
          </div>
        </template>
      </VueBootstrapTypeahead>
      <!-- KEYWORDS INPUT BAR WITH TYPEAHEAD -->

      <!-- A.I. SEARCH AND SEARCH BUTTONS -->
      <div class="input-group-append">

        <template v-if="hasAiSearch">
          <input @change="inputUploadFiles($event)" id="fileUpload" ref="fileUpload" type="file" hidden>
          <button
            class="btn btn-simple-dark border-left-0 border-right-0 rounded-0 track-similar"
            type="button"
            @click="uploadTrigger"
            @mouseenter="$root.$emit('toggle-search-hint', {type: 'help', value: true})"
            @mouseleave="$root.$emit('toggle-search-hint', {type: 'help', value: false})">
            <font-awesome-icon v-if="!isAudio" :icon="['fas','camera']"></font-awesome-icon>
            <font-awesome-icon v-if="isAudio" :icon="['fas','file-audio']"></font-awesome-icon>
          </button>
        </template>

        <ButtonLadda
          class="btn-simple-dark rounded-right"
          :icon="['fas','me-search']"
          @button-click="doSearchKeyword()"
        ></ButtonLadda>
      </div>
      <!-- A.I. SEARCH AND SEARCH BUTTONS -->
      <PageSchema :mediatype="mediatype" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';
import VueBootstrapTypeahead from '@/components/modules/common/VueBootstrapTypeahead.vue';

export default {
  name: 'HeroChannel',
  props: {
    mediatype: String,
  },
  components: {
    VueBootstrapTypeahead,
    ButtonLadda: () => import('@/components/modules/common/ButtonLadda.vue'),
    PageSchema: () => import('@/components/modules/common/PageSchema.vue'),
  },
  created: function () {
    const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];
    const info = _.find(mapSupportedMediaTypes, { id: this.mediatype });
    this.$store.dispatch('site/setCurrentMediaType', info);
  },
  data() {
    return {
      inputKeyword: '',
      searchTag: '',
      searchVersion: '',
    };
  },
  watch: {
    inputKeyword(keyword) {
      console.log('watch inputKeyword - ', keyword);
      if (_.size(keyword)) {
        // type keyword, get suggestion
        this.updateTypeaheads(keyword);
      }
    },
  },
  computed: {
    ...mapState({
      currentMediaType: state => state.site.currentMediaType,
      typeaheadKeywords: state => state.search.typeahead.keywords,
      ccVersions: state => state.site.ccVersions,
    }),
    isAudio() {
      let status = false;
      if (this.currentMediaType.isAudio) {
        status = true;
      }

      return status;
    },
    hasAiSearch() {
      return this.currentMediaType.hasAiSearch;
    },
  },
  mounted() {
    this.$root.$on('doSearchKeyword', (keyword) => {
      this.doSearchKeyword(keyword);
    });
  },
  methods: {
    uploadTrigger() {
      const isMobile = this.$store.getters['site/isMobile'];
      // console.log('upload trigger: ', isMobile);
      if (isMobile) {
        this.chooseUploadFiles();
      } else {
        this.$root.$emit('toggle-search-hint', { type: 'upload', value: true });
        this.$root.$emit('toggle-search-hint', { type: 'help', value: false });
      }
    },
    appendSearchKeyword(keyword) {
      console.log('appendSearchKeyword', keyword);

      // const searchBar = this.$store.getters['search/searchBar'];
      // searchBar.inputKeyword = keyword;
      // this.$store.dispatch('search/setSearchBar', searchBar);

      this.inputKeyword = keyword;
      this.$refs.searchBar.$refs.input.focus();
    },
    chooseUploadFiles() {
      this.$refs.fileUpload.click();
    },
    inputUploadFiles(event) {
      // triger drag & drop file upload function
      this.$root.$emit('onDrop', event);
      // this.onDrop(event);
    },
    updateTypeaheads: _.debounce(function (typeahead) {
      console.log('updateTypeaheads - ', typeahead);

      this.$store.dispatch('search/getTypeaheadResult', typeahead)
        .then((result) => {
          // console.log(result);
          this.$store.dispatch('search/setTypeaheads', result.data);
        });
    }, 500),
    doSearchKeyword(keyword) {
      // reset search value to default
      console.log('doSearchKeyword', keyword);

      if (keyword) {
        const filter = this.$store.getters['search/allSearchFilter'];
        const searchBar = this.$store.getters['search/searchBar'];

        filter.page = 1;
        filter.searchKeyword = keyword;
        searchBar.inputKeyword = keyword;

        this.$store.dispatch('search/setFilter', filter);
        this.$store.dispatch('search/setSearchBar', searchBar);
      }
      this.doSearch();
    },
    doSearch: throttle(function () {
      this.$scrollToTop();
      let searchUrl = this.$siteUrl(`/${this.mediatype}?s=${encodeURI(this.inputKeyword)}&sort=match&page=1`).search().url();
      if (this.searchVersion) {
        searchUrl = `${searchUrl}&software_version=${this.searchVersion}`;
      }
      window.location.href = searchUrl;
    }, 800, { 'leading': true }),
  },
};
</script>

<style lang="scss" scoped>
// set cursor of button tapahead
.typeahead-tapahead {
  cursor: nw-resize;
}
</style>
