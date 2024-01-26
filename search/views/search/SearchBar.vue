<template>
  <div id="search-bar" class="input-group mb-1">

    <!-- MEDIATYPE DROPDOWN BUTTON -->
    <div class="input-group-prepend">

      <!-- icon -->
      <button
        class="btn btn-simple-dark dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="dropdown-label">
          <ProductIcon
            class="fa-fw mr-1"
            :productType="currentMediaTypeCode"
            :square="true"
          />
          <span class="d-none d-sm-inline" v-if="currentMediaTypeCode === 'image'">
            {{ $t('search.image_short') }}
          </span>
          <span class="d-none d-sm-inline" v-else>
            {{ $term('mediaType', currentMediaTypeCode).short().text() }}
          </span>
        </span>
      </button>
      <!-- icon -->

      <!-- menu -->
      <div class="dropdown-menu">

        <a v-for="mediaType in allMediaTypes" :key="mediaType"
          v-show="currentMediaTypeCode !== mediaType"
          @click.prevent="changeMediaType(mediaType)"
          href="#"
          class="dropdown-item"
        >
          <ProductIcon
            class="fa-fw mr-1"
            :productType="mediaType"
          />
          <template v-if="mediaType === 'image'">
            {{ $t('search.image_short') }}
          </template>
          <template v-else>
            {{ $term('mediaType', mediaType).short().text() }}
          </template>
        </a>

      </div>
      <!-- menu -->

    </div>
    <!-- MEDIATYPE DROPDOWN BUTTON -->

    <!-- KEYWORDS INPUT BAR WITH TYPEAHEAD -->
    <VueBootstrapTypeahead

      ref="searchBar"

      v-model="inputKeyword"
      :placeholder="searchPlaceholder"

      :data="typeaheadKeywords"
      :inputClass="'border-right-0'"

      :maxMatches="5"
      :minMatchingChars="1"

      class="input-group-typeahead flex-fill"
    >
  <!--    @hit="onSelectTypeaheadKeyword"-->
  <!--    @keyup.enter="onEnter"-->

      <template slot="suggestion" slot-scope="{ data, htmlText }">
        <div class="d-flex align-items-center">
          <font-awesome-icon :icon="['far','search']" class="text-muted"/>
          <span class="mx-3" v-html="htmlText"></span>
          <a
            @click.stop.prevent="appendSearchKeyword(data)"
            class="typeahead-tapahead ml-auto btn btn-sm btn-outline-light"
          >
            <!-- when clicked, should update the input text with this suggestion value -->
            <!-- hidden using .d-none for now -->
            <font-awesome-icon
              :icon="['far','arrow-left']"
              :transform="{ rotate: 45 }"
            />
          </a>
        </div>
      </template>

    </VueBootstrapTypeahead>
    <!-- KEYWORDS INPUT BAR WITH TYPEAHEAD -->

    <!-- A.I. SEARCH AND SEARCH BUTTONS -->
    <div class="input-group-append">

      <span
        v-if="isFileSearchFeatureEnabled"
        :title="$t('search.select_files')"
        data-toggle="tooltip"
        data-placement="bottom"
        data-container="body"
      >
        <input type="file"
               :accept="acceptedFileExtensionsWithDot.join(',')"
               @change="inputUploadFiles($event)"
               id="fileUpload"
               hidden>
        <button
          @click="chooseUploadFiles()"
          class="btn btn-simple-dark border-left-0 border-right-0 rounded-0 track-similar"
          type="button"
        >
          <font-awesome-icon
           :icon="['fas', isAudio ? 'file-audio' : 'camera']"
          />
        </button>
      </span>

      <button @click="doSearchKeyword()" class="btn btn-simple-dark" type="button">
        <font-awesome-icon :icon="['fas','search']"/>
      </button>
    </div>
    <!-- A.I. SEARCH AND SEARCH BUTTONS -->

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import VueBootstrapTypeahead from '@/components/modules/common/VueBootstrapTypeahead.vue';
import VueBootstrapTypeahead from '@/views/search/search-bar/SearchInputTypeahead.vue';
import ProductIcon from '@motionelements/core/src/components/product/ProductIcon.vue';

import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

import {
  changeMediaType,
  changeKeyword,
} from '@/services/search.service.js';


export default {
  name: 'search-bar',
  components: {
    ProductIcon,
    // ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
    VueBootstrapTypeahead,
  },
  data() {
    return {
      form: {
        keyword: '',
      },
    };
  },
  computed: {
    ...mapState({
      // currentMediaType: state => state.site.currentMediaType.id,
      currentMediaTypeCode: state => state.search.mediaType,
      typeaheadKeywords: state => state.search.typeahead.keywords,
      searchKeyword: state => _.get(state.search, 'keyword', ''),
    }),
    ...mapGetters({
      allMediaTypes: 'site/mediaTypes',
    }),
    // currentMediaTypeCode() {
    //   return this.currentMediaType.replace('-', '_');
    // },
    searchPlaceholder() {
      return this.$i18n.t('search.searchbar_hint');
    },
    inputKeyword: {
      get() {
        return this.searchKeyword;
        // console.log('get inputKeyword');
        // // const filter = this.$store.getters['search/allSearchFilter'];
        // const searchBar = this.$store.getters['search/searchBar'];
        // // console.log('get inputKeyword', searchBar);
        // return searchBar.inputKeyword;
      },
      set(keyword) {
        console.log('set inputKeyword', keyword);

        this.form.keyword = keyword;
        // const filter = this.$store.getters['search/allSearchFilter'];
        // console.log(filter);

        // const searchBar = this.$store.getters['search/searchBar'];
        // searchBar.inputKeyword = keyword;

        // console.log('searchBar', searchBar);
        // this.$store.dispatch('search/setSearchBar', searchBar);
      },
    },
    acceptedFileExtensions() {
      const imageExtensions = [
        'jpg', 'jpeg', 'png', 'gif', 'bmp',
      ];

      const audioExtensions = [
        'wav', 'mp3', 'aif', 'aiff', 'aifc', 'wma', 'oga', 'm4a', 'flac',
      ];

      const videoExtensions = [
        'mp4', 'mov', 'h264', 'wmv', '3gp', 'webm', 'ogv', 'ogg',
        'mpg', 'mpeg', 'mpe', 'avi', 'mkv', 'vob', 'm4v', 'mxf', 'm1v', 'm2v',
      ];

      return this.isAudio
        ? [...audioExtensions, ...videoExtensions]
        : [...imageExtensions, ...videoExtensions];
    },
    acceptedFileExtensionsWithDot() {
      return this.isAudio
        ? ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.3gp', '.wav', '.aif', '.mp3']
        : ['.jpg', '.png', '.bmp', '.gif', '.mp4', '.mov', '.wmv', '.mpg'];
    },
    isAudio() {
      return isProductType('audio', this.currentMediaTypeCode);
    },
    isFileSearchFeatureEnabled() {
      return isProductType('video', this.currentMediaTypeCode)
      || isProductType('image', this.currentMediaTypeCode)
      || isProductType('music', this.currentMediaTypeCode)
      || isProductType('video_template', this.currentMediaTypeCode);
    },
  },
  created() {},
  mounted() {},
  methods: {
    onEnter() {
      console.log('TYPEAHEAD', 'onEnter');
    },
    onSelectTypeaheadKeyword() {
      console.log('TYPEAHEAD', 'onSelectKeyword');
      const keyword = this.inputKeyword;
      changeKeyword(keyword);
    },
    appendSearchKeyword(keyword) {
      console.log('append Keyword', keyword);

      // const searchBar = this.$store.getters['search/searchBar'];
      // searchBar.inputKeyword = keyword;
      // this.$store.dispatch('search/setSearchBar', searchBar);

      // this.inputKeyword = keyword;
      changeKeyword(keyword);

      this.$refs.searchBar.$refs.input.focus();
    },
    chooseUploadFiles() {
      document.getElementById('fileUpload').click();
    },

    inputUploadFiles(event) {
      // triger drag & drop file upload function
      this.$root.$emit('onDrop', event);
    },
    doSearchKeyword() {
      // trigger search page's function
      // console.log('FF emit doSearchKeyword', this.inputKeyword);
      // const filter = this.$store.getters['search/allSearchFilter'];
      // const searchBar = this.$store.getters['search/searchBar'];

      // if (this.inputKeyword) {
      //   filter.page = 1;
      //   filter.searchKeyword = this.inputKeyword;
      //   searchBar.inputKeyword = this.inputKeyword;
      // }

      // this.$store.dispatch('search/setFilter', filter);
      // this.$store.dispatch('search/setSearchBar', searchBar);

      changeKeyword(this.form.keyword);
    },
    updateTypeaheads: _.debounce(function (text) {
      console.log('SEARCH updateTypeaheads - ', text);

      this.$store.dispatch('search/listAutoCompleteKeywords', text);
      // .then((result) => {
      //   // console.log(result)
      //   this.$store.dispatch('search/setTypeaheads', result.data);
      // });
    }, 500),
    changeMediaType(mediaType) {
      changeMediaType(mediaType);
    },

  },
  watch: {
    'form.keyword'(keyword) {
      console.log('watch inputKeyword - ', keyword);

      if (keyword) {
        // type keyword, get suggestion
        this.updateTypeaheads(keyword);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$typeahead-offset: 163.66px; // sum of the widths of mediatype button + ai search button + search button

// set max width of input to avoid line-break on mobile
.input-group-typeahead {
  max-width:calc(100% - #{$typeahead-offset});
}

// set cursor of button tapahead
.typeahead-tapahead {
  cursor: nw-resize;
}

</style>
