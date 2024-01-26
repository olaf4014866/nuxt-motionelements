<template>
<div class="input-group mb-1">

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
        <i
          :class="mediaTypeIcon"
          :title="mediaTypeNameShort"
          class="fas fa-fw mr-1 me-bmt"
        ></i>
        <span class="d-none d-sm-inline">{{ mediaTypeNameShort }}</span>
      </span>
    </button>
    <!-- icon -->

    <!-- menu -->
    <div class="dropdown-menu">

      <a
        v-show="currentMediaType !== 'ae'"
        @click.prevent="changeMediaType('ae')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.ae_seo')"
          class="fas fa-fw me-bmt icon-after-effects-square mr-1"
        ></i>
        {{ $t('search.ae_short') }}
      </a>
      <a
        v-show="currentMediaType !== 'video'"
        @click.prevent="changeMediaType('video')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.video_seo')"
          class="fas fa-fw me-bmt icon-video mr-1"
        ></i>
        {{ $t('search.video_short') }}
      </a>
      <a
        v-show="currentMediaType !== 'music'"
        @click.prevent="changeMediaType('music')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.music_seo')"
          class="fas fa-fw me-bmt icon-music mr-1"
        ></i>
        {{ $t('search.music_short') }}
      </a>
      <a
        v-show="currentMediaType !== 'pr'"
        @click.prevent="changeMediaType('pr')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.pr_seo')"
          class="fas fa-fw me-bmt icon-premiere-pro mr-1"
        ></i>
        {{ $t('search.pr_short') }}
      </a>
      <a
        v-show="currentMediaType !== 'motion-template'"
        @click.prevent="changeMediaType('motion-template')"
        href="#"
        class="dropdown-item"
      >
        <i
          class="fas fa-fw me-bmt icon-apple-motion mr-1"
          :title="$t('search.motion_seo')"
        ></i>
        {{ $t('search.motion_short') }}
      </a>

      <a
        v-show="currentMediaType !== 'resolve'"
        @click.prevent="changeMediaType('resolve')"
        href="#"
        class="dropdown-item"
      >
        <i
          class="fas fa-fw me-bmt icon-davinci-resolve mr-1"
          :title="$t('search.davinci_resolve_seo')"
        ></i>
        {{ $t('search.davinci_resolve_short') }}
      </a>

      <a
        v-show="currentMediaType !== 'image'"
        @click.prevent="changeMediaType('image')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.image_seo')"
          class="fas fa-fw me-bmt icon-image mr-1"
        ></i>
        {{ $t('search.image_short') }}
      </a>

      <a
        v-show="currentMediaType !== 'sfx'"
        @click.prevent="changeMediaType('sfx')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.sfx_seo')"
          class="fas fa-fw me-bmt icon-sfx mr-1"
        ></i>
        {{ $t('search.sfx_short') }}
      </a>

      <a
        v-show="currentMediaType !== '3d-model'"
        @click.prevent="changeMediaType('3d-model')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.3d_seo')"
          class="fas fa-fw me-bmt icon-3d-model mr-1"
        ></i>
        {{ $t('search.3d_short') }}
      </a>

      <a
        v-show="currentMediaType !== 'lottie'"
        @click.prevent="changeMediaType('lottie')"
        href="#"
        class="dropdown-item"
      >
        <i
          :title="$t('search.lottie_seo')"
          class="fas fa-fw me-bmt icon-lottie mr-1"
        ></i>
        {{ $t('search.lottie_short') }}
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
          <font-awesome-icon
            :icon="['far','arrow-left']"
            :transform="{ rotate: 45 }"
          ></font-awesome-icon>
        </a>
      </div>
    </template>

  </VueBootstrapTypeahead>
  <!-- KEYWORDS INPUT BAR WITH TYPEAHEAD -->

  <!-- A.I. SEARCH AND SEARCH BUTTONS -->
  <div class="input-group-append">

    <span
      :title="$t('search.select_files')"
      data-toggle="tooltip"
      data-placement="bottom"
      data-container="body"
    >
      <input @change="inputUploadFiles($event)" id="fileUpload" type="file" hidden>
      <button
        @click="chooseUploadFiles()"
        class="btn btn-simple-dark border-left-0 border-right-0 rounded-0 track-similar"
        type="button"
      >
        <font-awesome-icon
          v-if="!isAudio"
          :icon="['fas','camera']"
        ></font-awesome-icon>
        <font-awesome-icon
          v-if="isAudio"
          :icon="['fas','file-audio']"
        ></font-awesome-icon>
      </button>
    </span>

    <button @click="doSearchKeyword()" class="btn btn-simple-dark" type="button">
      <font-awesome-icon :icon="['fas','search']"></font-awesome-icon>
    </button>
  </div>
  <!-- A.I. SEARCH AND SEARCH BUTTONS -->

</div>
</template>

<script>
import { mapState } from 'vuex';
import VueBootstrapTypeahead from '@/components/modules/common/VueBootstrapTypeahead.vue';

export default {
  name: 'search-bar',
  components: {
    VueBootstrapTypeahead,
  },
  computed: {
    ...mapState({
      currentMediaType: state => state.site.currentMediaType.id,

      mediaTypeNameShort: state => state.site.currentMediaType.nameShort,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,

      typeaheadKeywords: state => state.search.typeahead.keywords,
    }),
    searchPlaceholder() {
      return this.$i18n.t('search.searchbar_hint');
    },
    inputKeyword: {
      get() {
        console.log('get inputKeyword');
        // const filter = this.$store.getters['search/allSearchFilter'];
        const searchBar = this.$store.getters['search/searchBar'];
        // console.log('get inputKeyword', searchBar);
        return searchBar.inputKeyword;
      },
      set(keyword) {
        console.log('set inputKeyword', keyword);

        // const filter = this.$store.getters['search/allSearchFilter'];
        // console.log(filter);

        const searchBar = this.$store.getters['search/searchBar'];
        searchBar.inputKeyword = keyword;

        console.log('searchBar', searchBar);
        this.$store.dispatch('search/setSearchBar', searchBar);
      },
    },
    isAudio() {
      const currentMediaType = this.$store.getters['site/currentMediaType'];

      let status = false;
      if (currentMediaType.isAudio) {
        status = true;
      }

      return status;
    },
  },
  created() {},
  mounted() {},
  methods: {
    appendSearchKeyword(keyword) {
      console.log('appendSearchKeyword', keyword);

      // const searchBar = this.$store.getters['search/searchBar'];
      // searchBar.inputKeyword = keyword;
      // this.$store.dispatch('search/setSearchBar', searchBar);

      this.inputKeyword = keyword;

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
      console.log('emit doSearchKeyword', this.inputKeyword);

      // const filter = this.$store.getters['search/allSearchFilter'];
      // const searchBar = this.$store.getters['search/searchBar'];

      // if (this.inputKeyword) {
      //   filter.page = 1;
      //   filter.searchKeyword = this.inputKeyword;
      //   searchBar.inputKeyword = this.inputKeyword;
      // }

      // this.$store.dispatch('search/setFilter', filter);
      // this.$store.dispatch('search/setSearchBar', searchBar);

      this.$root.$emit('doSearchKeyword', this.inputKeyword);
    },
    updateTypeaheads: _.debounce(function (typeahead) {
      console.log('updateTypeaheads - ', typeahead);

      this.$store.dispatch('search/getTypeaheadResult', typeahead)
        .then((result) => {
          // console.log(result)
          this.$store.dispatch('search/setTypeaheads', result.data);
        });
    }, 500),
    // onHit(keyword) {
    //   console.log('onHit', keyword);

    //   const filter = this.$store.state.search.filter;
    //   filter.searchKeyword = keyword;
    //   this.$store.dispatch('search/setFilter', filter);

    //   this.$root.$emit('doSearchKeyword');
    // },
    // onInput(keyword) {
    //   console.log('onInput', keyword);
    // },
    // onInputFocus(e) {
    //   console.log('onInputFocus', e);
    //   this.isFocus = true;
    // },
    // onInputBlur(e) {
    //   console.log('onInputBlur', e);
    //   this.isFocus = false;
    // },
    // onKeyUp(e) {
    //   console.log('onKeyUp', e);
    // },
    // onKeyDown(e) {
    //   console.log('onKeyDown', e);
    // },
    // onKeyEnter(e) {
    //   console.log('onKeyEnter', e);
    //   console.log(this.inputKeyword);

    //   const filter = this.$store.state.search.filter;
    //   filter.searchKeyword = this.inputKeyword;
    //   this.$store.dispatch('search/setFilter', filter);

    //   // this.$store.dispatch('search/setTypeaheads', []);
    //   this.$root.$emit('doSearchKeyword');
    // },
    // onKeyEsc(e) {
    //   console.log('onKeyEsc', e);
    //   this.isFocus = false;
    // },
    changeMediaType(mediaType) {
      this.$root.$emit('changeMediaType', mediaType);
    },

  },
  watch: {
    inputKeyword(keyword) {
      console.log('watch inputKeyword - ', keyword);

      if (_.size(keyword)) {
        // type keyword, get suggestion
        this.updateTypeaheads(keyword);
      }

      // console.log('inputKeyword', _.size(keyword));
      // console.log('inputKeyword', this.isFocus);

      // if (_.size(keyword) === 0 && !this.isFocus) {
      //   // clean keyword, reset filter
      //   const filter = this.$store.getters['search/allSearchFilter'];
      //   filter.searchKeyword = '';
      //   this.$root.$emit('doSearch', filter);
      // }
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
