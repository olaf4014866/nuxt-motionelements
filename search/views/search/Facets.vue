<template>
  <div id="search-filter-bar"
    :class="{ active: isMobileFacetsActive }" class="col col-facets">

    <!-- for mobile -->
    <div class="row sticky-top d-block d-lg-none">
      <div class="col py-3 bg-light">
        <button @click="disableMobileFacets" type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h5 class="filter-title my-0">{{ $t('search.filter') }}</h5>
      </div>
    </div>

    <!-- cancel all filter -->
    <div
      v-if="hasFilters"
      class="d-block d-lg-none py-3"
    >
        <a
          @click="cancelAllFilter"
          class="btn btn-block btn-light"
        >
          <font-awesome-icon
            :icon="['fal','times']"
            fixed-width
          />
          {{ $t('search.clear_all_filters') }}
        </a>
    </div>
    <!-- cancel all filter -->

    <!-- for mobile -->
    <div class="list-facets py-4">

      <!-- subscription -->
      <div class="list-facet-item mb-5">
        <div class="facet-item-header">
          <h6 class="mb-1">
            <font-awesome-icon
              :icon="['fal','me-lightning']"
              fixed-width
            />
            {{ $t('search.subscription_elements') }}
          </h6>
        </div>
        <div class="facet-item-body">

          <div class="custom-control custom-checkbox text-secondary small">
            <input
              :checked="isSubscriptionChecked"
              @click="filterSubscription($event)"
              type="checkbox"
              class="custom-control-input"
              id="facet-subscription"
            >
            <label class="custom-control-label" for="facet-subscription">
              {{ $t('search.subscription_elements') }}
              <span
                :title="$t('search.subscription_elements_tooltip')"
                data-toggle="tooltip"
                data-placement="right"
                class="d-inline-block"
              >
                <a
                  :href="$link('/subscribe').url()"
                  class="text-info"
                  rel="help"
                >
                  <font-awesome-icon :icon="['fal','info-circle']"/>
                </a>
              </span>
            </label>
          </div>
        </div>
      </div>
      <!-- subscription -->

      <!-- easy to use -->
      <div
        v-if="_.size(easeOfUseFacetFields) > 0"
        class="list-facet-item mb-5"
      >
        <div class="facet-item-header">
          <h6 class="mb-1">
            <font-awesome-icon
              :icon="['fal','me-easy']"
              fixed-width
            />
            {{ $t('search.ease_of_use') }}
          </h6>
        </div>
        <div class="facet-item-body">

          <div
            v-for="(field, fieldKey) in easeOfUseFacetFields"
            :key="fieldKey"
            class="custom-control custom-checkbox text-secondary small"
          >
            <input
              :name="fieldKey"
              :checked="!!_.get(filters, fieldKey)"
              :value="_.get(filters, fieldKey)"
              @click="onClickFilter"
              :id="'facet-' + fieldKey" type="checkbox" class="custom-control-input"
            >
            <label class="custom-control-label" :for="'facet-' + fieldKey">
              {{ field.label }}

              <span v-if="_.get(field.tooltip, 'title')"
                :title="field.tooltip.title"
                data-toggle="tooltip"
                data-placement="right"
                class="d-inline-block"
              >
                <a v-if="_.get(field.tooltip, 'url')"
                   :href="field.tooltip.url"
                   class="text-info"
                   rel="help"
                >
                  <font-awesome-icon :icon="['fal','info-circle']"/>
                </a>
                <font-awesome-icon v-else
                                   :icon="['fal','info-circle']"/>
              </span>

            </label>
          </div>

        </div>
      </div>

      <div
        v-for="(field, fieldKey) in facetFields"
        :key="fieldKey"
        class="list-facet-item mb-5"
      >
        <div class="facet-item-header">
          <h6 class="mb-1" data-toggle="collapse"
              :href="'#facet-' + fieldKey"
          >
            <font-awesome-icon
              :icon="field.icon"
              fixed-width
            />
            {{ field.label }}
            <font-awesome-icon
              :icon="['fal', 'angle-down']"
              :class="_.get(filters, fieldKey) ? 'fa-flip-vertical' : ''"
              class="float-right"
            />
          </h6>
        </div>
        <div class="facet-item-body">
          <!-- color -->
          <div v-if="fieldKey === 'color'"
               class="collapse facet-color"
               :class="_.get(filters, fieldKey) ? 'in show' : ''"
               id="facet-color">
            <ColorPicker
              id="search-color-facet"
              :value="_.get(filters, 'color', '#ffffff')"
              :palette="colorPalette"
              @input="onChangeColor"
            />
            <!--            <input id="search-color-facet" class="color-facet form-control" name="color" type="text" value="">-->
          </div>
          <!-- others -->
          <div v-else
               :id="'facet-' + fieldKey"
               class="collapse text-secondary"
               :class="_.get(filters, fieldKey) ? 'in show' : ''"
           >
            <div
              v-for="(info) in _.get(facets, fieldKey, {})" :key="info.value"
              class="custom-control custom-checkbox small"
            >
              <input
                :name="fieldKey"
                :checked="info.value === _.get(filters, fieldKey)"
                :id="'facet-' + fieldKey + info.value"
                :value="info.value"
                @click="onClickFilter"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label"
                :for="'facet-' + fieldKey + info.value"
              >
                {{ renderFilterValue(fieldKey, info, currentMediaType) }}
                <!--({{ info.count }})-->
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- software source -->
      <!--
      <div v-if="!isProduction && currentMediaType === '3d_model'"
        class="list-facet-item mb-5"
      >
        <div class="facet-item-header">
          <h6 id="filterSourceTitleBar" class="mb-1" data-toggle="collapse" href="#facet-source">
            <font-awesome-icon
              :icon="['fal','desktop']"
              fixed-width
            />
            Software Source
            <font-awesome-icon :icon="['fal','angle-down']" class="float-right"></font-awesome-icon>
          </h6>
        </div>
        <div class="facet-item-body">
          <div class="collapse" id="facet-source">
            <div class="text-secondary">


              <div class="custom-control custom-checkbox small">
                <input id="facet-sources-blender" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-sources-blender">
                  Blender
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-sources-c4d" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-sources-c4d">
                  Cinema 4D
                </label>
              </div>

            </div>
          </div>
        </div>
      </div>
      -->
      <!-- software source -->

      <!--
      <div v-if="!isProduction && currentMediaType === '3d_model'"
        class="list-facet-item mb-5"
      >
        <div class="facet-item-header">
          <h6 id="filterPolygonTitleBar" class="mb-1" data-toggle="collapse" href="#facet-polygon">
            <font-awesome-icon
              :icon="['fal','me-polygon']"
              fixed-width
            ></font-awesome-icon>
            Poly Count
            <font-awesome-icon :icon="['fal','angle-down']" class="float-right"></font-awesome-icon>
          </h6>
        </div>
        <div class="facet-item-body">
          <div class="collapse" id="facet-polygon">
            <div class="text-secondary">

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-5k" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-5k">
                  Up to 5k
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-10k" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-10k">
                  5k to 10k
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-50k" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-50k">
                  10k to 50k
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-100k" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-100k">
                  50k to 100k
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-250k" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-250k">
                  100k to 250k
                </label>
              </div>

              <div class="custom-control custom-checkbox small">
                <input id="facet-polygon-250k+" type="checkbox" class="custom-control-input">
                <label class="custom-control-label" for="facet-polygon-250k+">
                  250k+
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      -->
      <!-- polygon count -->


      <!-- color -->
      <!--
      <div
        :class="{ 'd-none' : hideColorBlock }"
        class="list-facet-item mb-5"
      >
        <div class="facet-item-header">
          <h6 id="filterColorTitleBar" class="mb-1" data-toggle="collapse" href="#facet-color">
            <font-awesome-icon
              :icon="['fal','tint']"
              fixed-width
            />
            {{ $t("search.color") }}
            <font-awesome-icon :icon="['fal','angle-down']" class="float-right"/>
          </h6>
        </div>
        <div class="facet-item-body">
          <div class="collapse" id="facet-color">
            <input id="search-color-facet" class="color-facet form-control" name="color" type="text" value="">
          </div>
        </div>
      </div>
      -->
      <!-- color -->


    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { Compact as ColorPicker } from 'vue-color';

import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';

import filterMixin from '@/views/search/filter.mixin.js';
import { clearFilters } from '@/services/search.service.js';

export default {
  name: 'search-facet',
  mixins: [filterMixin],
  components: {
    ColorPicker,
  },
  data: function () {
    return {
      // color picker palette
      // colorPalette: ['#000000', '#666666', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff'],
      colorPalette: ['#000000', '#666666', '#ffffff', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff'],
    };
  },
  computed: {
    ...mapState({

      isMobileFacetsActive: state => state.site.isMobileFacetsActive,
      isUploading: state => state.member.upload.status,
      uploadProgress: state => state.member.upload.progress,

      hasFilterBar: state => state.search.hasFilterBar,

      filters: state => state.search.filter,
      facets: state => state.search.facets,

      currentMediaType: state => state.search.mediaType,
    }),
    ...mapGetters({
      userCurrency: 'user/currencyCode',
    }),
    hasFilters() {
      return _.size(this.filters) > 0;
    },
    isProduction: function () {
      return process.env.VUE_APP_ENV === 'production';
    },
    isSubscriptionChecked: function () {
      return _.get(this.filters, 'subscription', '').toString() === '1';
    },
    easeOfUseFacetFields: function () {
      const mediaType = this.currentMediaType;
      // generate facet lists by mediaType

      let fields;

      switch (true) {
        case isProductType('video', mediaType):
          fields = [
            'alpha', 'loop', 'textspace',
          ];
          break;
        case isProductType('video_template', mediaType):
          fields = [
            'tutorial',
          ];

          if (isProductType('ae', mediaType)) {
            fields.push('noPlugin');
          } else if (isProductType('fcp', mediaType)) {
            fields.push('editable');
          }
          break;
        case isProductType('music', mediaType):
          fields = [
            'noYoutubeContentId', 'loop',
          ];
          break;
        case isProductType('image', mediaType):
          fields = [
            'alpha', 'textspace',
          ];
          break;
        case isProductType('3d_model', mediaType):
          fields = [
            // 'animated', 'rigged',
          ];
          break;
        default:
          fields = [
          ];
      }

      // when add filter name at this list will show i tooltips icon
      // const showHintList = [
      //   'noYoutubeContentId',
      // ];

      const data = {};
      fields.forEach((field) => {
        // let hintText = null;
        // const showHint = showHintList.indexOf(field) >= 0 ? true : false;
        // if (showHint) {
        //   hintText = this.$t(`search.${field}_hint`);
        // }

        const schema = _.get(this.filtersSchema, field);
        data[field] = {
          label: schema.label,
          type: _.get(schema, 'type', 'string'),
          tooltip: _.get(schema, 'tooltip', null),
          // showHint: showHint,
          // hintText: hintText,
        };
      });

      // check if fields have facet counts
      return data;
    },
    facetFields: function () {
      const mediaType = this.currentMediaType;
      // generate facet lists by mediaType

      let fields = [];

      switch (true) {
        case isProductType('video', mediaType):
          fields = [
            'orientation', 'resolution',
            'type', 'category', 'style',
            'color',
            'durationRange', 'priceRange',
            'framing', 'license',
          ];
          break;
        case isProductType('music', mediaType):
          fields = [
            'genre', 'mood', 'instrument', 'category',
            'durationRange', 'priceRange', 'bpmRange',
            'license',
          ];
          break;
        case isProductType('video_template', mediaType):
          fields = [
            'softwareVersion',
            'orientation', 'resolution',
          ];

          if (isProductType('ae', mediaType)) {
            fields.push('plugin');
          } else if (isProductType('resolve', mediaType)) {
            fields.push('fps');
          }

          fields = [
            ...fields,
            'category', 'style',
            'color',
            'durationRange', 'priceRange',
          ];
          break;
        case isProductType('image', mediaType):
          fields = [
            'orientation', 'size',
            'category',
            'color',
            'framing', 'license', 'priceRange',
          ];
          break;
        case isProductType('sfx', mediaType):
          fields = [
            'category',
            'durationRange',
          ];
          break;
        case isProductType('3d', mediaType):
          fields = [
            'category', 'format',
            'polygon',
          ];
          break;
        case isProductType('lottie', mediaType):
          fields = [
            'category', 'priceRange',
          ];
          break;
        default:
          fields = [
            'category',
          ];
      }

      const data = {};

      fields.forEach((field) => {
        // filter no facet counts
        if (this.hasFacet(field) || field === 'color') {
          const schema = _.get(this.filtersSchema, field);
          data[field] = {
            label: schema.label,
            type: _.get(schema, 'type', 'string'),
            icon: _.get(schema, 'icon', ['', '']),
          };
        }
      });

      return data;
    },


    hidePluginCheckbox() {
      const currentMediaType = this.$store.getters['site/currentMediaType'].id;

      let hide = true;
      const enableMediaType = [
        'pr-template',
      ];

      if (enableMediaType.indexOf(currentMediaType) >= 0) {
        hide = false;
      }

      return hide;
    },

  },
  created() {},
  mounted() {
    // event for filter collapse effect
    // $('[data-toggle="collapse"]').on('click', function () {
    $(document).on('click', '.list-facet-item [data-toggle="collapse"]', function () {
      const $target = $($(this).attr('href'));
      const $sibling = $(this)
        .siblings('.collapse')
        .not($target);
      const $arrow = $($(this).find('.fa-angle-down'));
      $sibling.toggleClass('show');
      $arrow.toggleClass('fa-flip-vertical');
    });

    // set bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    onClickFacetHeader(e) {
      console.log('clickFacetHeader', e.target);
    },
    getFilterValue(field) {
      const value = _.get(this.filters, field);
      return value === '0' ? '' : value;
    },
    getFacetData(field) {
      return _.get(this.facets, field, {});
    },
    hasFacet(field) {
      return _.size(this.getFacetData(field)) > 0;
    },
    cancelAllFilter() {
      clearFilters();
    },

    disableMobileFacets() {
      this.$store.dispatch('site/disableMobileFacets');
    },

    filterSubscription(e) {
      const filter = this.$store.getters['search/allSearchFilter'];
      const status = e.target.checked ? 1 : 0;

      sessionStorage.setItem('ME_subscriptionFilter', JSON.stringify(status));

      filter.subscription = status;
      this.$store.dispatch('search/setFilter', filter);

      // const filterBar = this.$store.getters['search/allSearchFilterBar'];
      // filterBar.subscription.status = !!status;
      // this.$store.dispatch('search/setFilterBar', filterBar);

      console.log('subscription', status);

      this.updateRoute('subscription', status);
    },

    updateRoute(filterKey, value) {
      return this.pushFilterToRoute(filterKey, value);

      /*
      // keep all query
      const query = { ...this.$route.query };

      // set to page 1
      delete query.page;

      // const query = {
      //   ...this.$route.query,
      //   page: 1,
      // };

      query[filterKey] = value;

      this.$router.push({
        query: query,
      });
      */
    },


    onClickFilter(e) {
      const filterKey = e.target.name;

      let value;

      if (e.target.type === 'checkbox') {
        if (e.target.checked) {
          value = e.target.value || 1;
        } else {
          value = '';
        }
      } else {
        value = e.target.value;
      }

      console.log('facet: onClickFilter', value, e.target.value, e.target);

      const filter = this.$store.getters['search/allSearchFilter'];
      filter[filterKey] = value;
      this.$store.dispatch('search/setFilter', filter);

      // const filterBar = this.$store.getters['search/allSearchFilterBar'];
      // filterBar[filterKey].status = !!value;
      // this.$store.dispatch('search/setFilterBar', filterBar);

      this.updateRoute(filterKey, value);
    },

    onChangeColor(color) {
      // console.log('COLOR', color);

      const filterKey = 'color';

      const value = color.hex;

      const filter = this.$store.getters['search/allSearchFilter'];
      filter[filterKey] = value;
      this.$store.dispatch('search/setFilter', filter);

      // const filterBar = this.$store.getters['search/allSearchFilterBar'];
      // filterBar[filterKey].status = !!value;
      // this.$store.dispatch('search/setFilterBar', filterBar);

      this.updateRoute(filterKey, value);
    },

    /*
    filterColor(e, tinycolor) {
      console.log('filterColor change - ', e, tinycolor);

      let state = '';
      let value = '';

      const filter = this.$store.getters['search/allSearchFilter'];
      const currentColor = filter.color;
      const isCancelFilter = (currentColor === 0) ? true : false;
      if (isCancelFilter) {
        state = false;
        value = '';

        const filter = this.$store.getters['search/allSearchFilter'];
        filter.color = value;
        filter.page = 1;
        this.$store.dispatch('search/setFilter', filter);

        const filterBar = this.$store.getters['search/allSearchFilterBar'];
        filterBar.color.status = state;
        filterBar.color.value = value;
        this.$store.dispatch('search/setFilterBar', filterBar);

        $('#search-color-facet').spectrum('set', '');
        $('#filterColorTitleBar').click();

        this.updateRoute('color', value);

        // this.$root.$emit('doSearch', filter);
      }

      if (_.size(tinycolor) > 0) {
        const newColor = tinycolor.toHexString();

        // console.log('currentColor - ', currentColor);
        // console.log('newColor - ', newColor);

        const hasColor = _.size(tinycolor) > 0;
        const hasChange = currentColor !== newColor;
        const hasChangeColor = (hasColor && hasChange && !isCancelFilter);

        if (hasChangeColor) {
          state = true;
          value = newColor;

          const filter = this.$store.getters['search/allSearchFilter'];
          filter.color = value;
          filter.page = 1;
          this.$store.dispatch('search/setFilter', filter);

          const filterBar = this.$store.getters['search/allSearchFilterBar'];
          filterBar.color.status = state;
          filterBar.color.value = value;
          this.$store.dispatch('search/setFilterBar', filterBar);

          this.updateRoute('color', value);
        }
      }
    },

     */

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$facet-max-width: 250px;

.col-facets {
  @media (min-width: 992px) {
    max-width: $facet-max-width;
  }
  @media (max-width: 991.98px) {
    position: fixed;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    z-index: 1080;
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.active {
      transform: translateY(0);
    }
  }
}

// import styles for vue-color
.facet-color::v-deep {
  @import "@motionelements/assets/src/scss/vue-color/style.scss";
}

// COLORS
.col-facets {
  @media (max-width: 991.98px) {
    background: $white;

    .ui-dark & {
      background: $black;
    }
  }
}

// vue-color
.vc-compact {
  width: 100%;
  border-radius: 0;
  box-shadow: none;
  background-color: inherit;
}
</style>
