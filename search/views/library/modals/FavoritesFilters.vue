<template>
  <Modal
  >
    <template v-slot:title>
      {{ $t('favorites.filter_by') }}
    </template>

    <div class="row">

      <!-- mediatype block -->
      <div class="col-12 col-sm-6 mb-3">

        <div class="custom-control custom-checkbox mb-3">
          <input
            @click="selectAllElementTypes"
            :checked="inputIsSelectedAll === true"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-all"
          >
          <label class="custom-control-label" for="filter-mt-all">
            {{ $t('favorites.all_media_types') }}
          </label>
        </div>

        <div
          v-for="productType in allProductTypes"
          :key="productType"
          class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, productType)"
            :checked="(inputElementTypes.includes(productType))"
            :value="productType"
            type="checkbox"
            class="custom-control-input"
            :id="`filter-mt-${productType}`"
          >
          <label class="custom-control-label"
                 :for="`filter-mt-${productType}`">
            <ProductIcon
              class="text-muted"
              fixedWidth
              :productType="productType"
            />
            {{ productType === 'collection' ? $t('term.collection') : $term('mediaType', productType).text() }}
          </label>
        </div>

        <!--
        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'pr')"
            :checked="(inputElementTypes.indexOf('pr') >= 0)"
            value="pr"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-pr"
          >
          <label class="custom-control-label" for="filter-mt-pr">
            <i class="fas fa-fw text-muted me-bmt icon-premiere-pro"></i>
            {{ $term('mediaType', 'pr').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'resolve')"
            :checked="(inputElementTypes.indexOf('resolve') >= 0)"
            value="resolve"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-resolve"
          >
          <label class="custom-control-label" for="filter-mt-resolve">
            <i class="fas fa-fw text-muted me-bmt icon-davinci-resolve"></i>
            {{ $term('mediaType', 'resolve').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'motion')"
            :checked="(inputElementTypes.indexOf('motion') >= 0)"
            value="motion"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-motion"
          >
          <label class="custom-control-label" for="filter-mt-motion">
            <i class="fas fa-fw text-muted me-bmt icon-apple-motion"></i>
            {{ $term('mediaType', 'fcp').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'video')"
            :checked="(inputElementTypes.indexOf('video') >= 0)"
            value="video"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-video"
          >
          <label class="custom-control-label" for="filter-mt-video">
            <i class="fas fa-fw text-muted me-bmt icon-video"></i>
            {{ $term('mediaType', 'video').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'image')"
            :checked="(inputElementTypes.indexOf('image') >= 0)"
            value="image"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-image"
          >
          <label class="custom-control-label" for="filter-mt-image">
            <i class="fas fa-fw text-muted me-bmt icon-image"></i>
            {{ $term('mediaType', 'image').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'music')"
            :checked="(inputElementTypes.indexOf('music') >= 0)"
            value="music"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-music"
          >
          <label class="custom-control-label" for="filter-mt-music">
            <i class="fas fa-fw text-muted me-bmt icon-music"></i>
            {{ $term('mediaType', 'music').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'sfx')"
            :checked="(inputElementTypes.indexOf('sfx') >= 0)"
            value="sfx"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-sfx"
          >
          <label class="custom-control-label" for="filter-mt-sfx">
            <i class="fas fa-fw text-muted me-bmt icon-sfx"></i>
            {{ $term('mediaType', 'sfx').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, '3d')"
            :checked="(inputElementTypes.indexOf('3d') >= 0)"
            value="3d"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-3d"
          >
          <label class="custom-control-label" for="filter-mt-3d">
            <i class="fas fa-fw text-muted me-bmt icon-3d-model"></i>
            {{ $term('mediaType', '3d').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'lottie')"
            :checked="(inputElementTypes.indexOf('lottie') >= 0)"
            value="lottie"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-lottie"
          >
          <label class="custom-control-label" for="filter-mt-lottie">
            <i class="fas fa-fw text-muted me-bmt icon-lottie"></i>
            {{ $term('mediaType', 'lottie').text() }}
          </label>
        </div>

        <div class="custom-control custom-checkbox">
          <input
            @click="selectOneElementType($event, 'collection')"
            :checked="(inputElementTypes.indexOf('collection') >= 0)"
            value="collection"
            type="checkbox"
            class="custom-control-input"
            id="filter-mt-collection"
          >
          <label class="custom-control-label" for="filter-mt-collection">
            <i class="fas fa-fw text-muted me-bmt icon-collection"></i>
            {{ $t('term.collection') }}
          </label>
        </div>
        -->

      </div>
      <!-- mediatype block -->

      <!-- purchase block -->
      <!--
      <div class="col-12 col-sm-4 mb-3">
        <div class="custom-control custom-radio mb-3">
          <input type="radio" name="filter-paid" class="custom-control-input" id="filter-paid-all" checked>
          <label class="custom-control-label" for="filter-paid-all">Purchased &amp; Unpurchased</label>
        </div>

        <div class="custom-control custom-radio">
          <input type="radio" name="filter-paid" class="custom-control-input" id="filter-paid-1">
          <label class="custom-control-label" for="filter-paid-1">
            <font-awesome-icon :icon="['fas', 'dollar-sign']" class="text-muted" fixed-width />
            Purchased
          </label>
        </div>
        <div class="custom-control custom-radio">
          <input type="radio" name="filter-paid" class="custom-control-input" id="filter-paid-0">
          <label class="custom-control-label" for="filter-paid-0">
            <font-awesome-layers fixed-width>
              <font-awesome-icon :icon="['fas', 'dollar-sign']" class="text-muted" />
              <font-awesome-icon :icon="['fas', 'ban']" class="text-body" transform="shrink-3" />
            </font-awesome-layers>
            Unpurchased
          </label>
        </div>
      </div>
      -->
      <!-- purchase block -->


      <!-- download block -->
      <!--
      <div class="col-12 col-sm-6 mb-3">
        <div class="custom-control custom-radio mb-3">
          <input
            @click="changeDownloadStatus"
            :checked="selectedDownloadStatus === 'all'"
            value="all"
            type="radio"
            name="filter-dl"
            class="custom-control-input"
            id="filter-dl-all"
          >
          <label class="custom-control-label" for="filter-dl-all">
            {{ $t('favorites.all_download_status') }}
          </label>
        </div>

        <div class="custom-control custom-radio">
          <input
            @click="changeDownloadStatus"
            :checked="selectedDownloadStatus === '1'"
            value="1"
            type="radio"
            name="filter-dl"
            class="custom-control-input"
            id="filter-dl-1"
          >
          <label class="custom-control-label" for="filter-dl-1">
            <font-awesome-icon :icon="['fas', 'me-download']" class="text-muted" fixed-width />
            {{ $t('favorites.downloadable') }}
          </label>
        </div>

        <div class="custom-control custom-radio">
          <input
            @click="changeDownloadStatus"
            :checked="selectedDownloadStatus === '-1'"
            value="-1"
            type="radio"
            name="filter-dl"
            class="custom-control-input"
            id="filter-dl-0"
          >
          <label class="custom-control-label" for="filter-dl-0">
            <font-awesome-layers fixed-width>
              <font-awesome-icon :icon="['fas', 'me-download']" class="text-muted" />
              <font-awesome-icon :icon="['fas', 'ban']" class="text-body" transform="shrink-3" />
            </font-awesome-layers>
            {{ $t('favorites.not_downloadable') }}
          </label>
        </div>
      </div>
      -->
      <!-- download block -->

    </div>

    <template v-slot:footer>
      <button type="button" class="btn btn-simple-secondary" data-dismiss="modal">
        {{ $t('cta.cancel') }}
      </button>
      <button
        @click="filterElementTypes"
        type="button"
        class="btn btn-primary"
      >
        {{ $t('cta.apply') }}
      </button>
    </template>

  </Modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'favorites-filters',
  components: {
    Modal: () => import('@motionelements/core/src/components/ui/BaseModalVuex.vue'),
    ProductIcon: () => import('@motionelements/core/src/components/product/ProductIcon.vue'),
  },
  data() {
    return {
      inputIsSelectedAll: false,
      inputElementTypes: [],
      inputDownloadStatus: 'all',
      allProductTypes: ['video', 'music', 'ae', 'pr', 'fcp', 'resolve', 'image', 'sfx', '3d', 'lottie', 'collection'],
    };
  },
  computed: {
    ...mapState({
      isSelectedAllElementTypes: state => state.library.isSelectedAllElementTypes,
      selectedElementTypes: state => state.library.selectedElementTypes,
      selectedDownloadStatus: state => state.library.selectedDownloadStatus,
    }),
  },
  created() {
  },
  mounted() {
    this.$root.$on('syncModalInput', () => {
      console.log('emit : syncModalInput');
      this.syncModalInput();
    });

    const isSelectedAllElementTypes = this.$store.getters['library/isSelectedAllElementTypes'];
    const selectedElementTypes = this.$store.getters['library/selectedElementTypes'];
    const selectedDownloadStatus = this.$store.getters['library/selectedDownloadStatus'];

    this.inputIsSelectedAll = isSelectedAllElementTypes;
    this.inputElementTypes = selectedElementTypes;
    this.inputDownloadStatus = selectedDownloadStatus;
  },
  methods: {
    selectAllElementTypes(e) {
      console.log('selectAllelementTypes', e.target.checked);

      this.inputElementTypes = [];

      const isChecked = e.target.checked;
      if (isChecked) {
        this.inputElementTypes = ['ae', 'pr', 'motion', 'video', 'image', 'music', 'sfx', '3d', 'lottie', 'collection'];
      }
    },
    selectOneElementType(e, elementType) {
      console.log('selectOneElementType', e.target, elementType);

      const isChecked = (e.target.checked) ? true : false;

      if (isChecked) {
        this.inputElementTypes.push(elementType);
      }

      if (!isChecked) {
        this.inputElementTypes = _.without(this.inputElementTypes, elementType);
      }

      // console.log(this.inputElementTypes);
    },
    changeDownloadStatus(e) {
      console.log('changeDownloadStatus', e.target.value);

      const selectedDownloadStatus = e.target.value;
      // this.$store.dispatch('favorites/setSelectedDownloadStatus', selectedDownloadStatus);
      this.inputDownloadStatus = selectedDownloadStatus;
    },
    filterElementTypes() {
      console.log('filterElementTypes');

      const queryString = {};
      // queryString.downloadable = this.inputDownloadStatus;

      const selectCount = _.size(this.inputElementTypes);
      if (!this.inputIsSelectedAll && selectCount < 10) {
        queryString['mt[]'] = this.inputElementTypes;
      }

      // const lang = this.$route.params.lang;
      // const folderId = this.$route.params.folderId;
      this.$router.push({
        // path: this.$link(`/favorites/edit/${folderId}`).url(),
        query: queryString,
      });

      this.$store.dispatch('modal/hide');
      // $('#favgrp-filters').modal('hide');
    },
    syncModalInput() {
      const filterDownloadable = this.$route.query.downloadable || [];
      const filterElementTypes = this.$route.query['mt[]'] || [];

      console.log('syncModalInput', filterDownloadable);
      console.log('syncModalInput', filterElementTypes);

      if (!_.size(filterDownloadable)) {
        this.inputIsSelectedAll = false;
      }

      if (!_.size(filterElementTypes)) {
        this.inputElementTypes = [];
      }

      let checkedElements = [];

      // when only one filter selected will return string
      const onlyOneMediaType = typeof (filterElementTypes) === 'string' ? true : false;

      if (onlyOneMediaType) {
        checkedElements.push(filterElementTypes);
      }

      if (!onlyOneMediaType) {
        checkedElements = filterElementTypes;
      }

      this.inputElementTypes = checkedElements;

      const isCheckedAll = _.size(checkedElements) === 10 ? true : false;

      this.inputIsSelectedAll = isCheckedAll ? true : false;

      // this.inputDownloadStatus = selectedDownloadStatus;
    },

  },
};
</script>

<style lang="scss" scoped>
.custom-control-label {
  &:before, &:after {
    top: 1.5px;
  }
}
</style>
