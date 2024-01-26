<template>
  <div>
    <SectionProductInfo
      v-if="hasRecommendations"
      class="section-product-info border-top border-light pt-3"
      :isColumn="true"
    >
      <template #heading>
        {{ $t('product_page.you_may_also_like') }}
      </template>

      <div class="mb-3">
        <ul class="nav nav-pills" id="myTab" role="tablist">
          <li class="nav-item" v-if="recommendations.similar.length">
            <a class="nav-link small"
               :class="{ active: activeTab === 'similar' }"
               @click="showTab = 'similar'"
               id="similar-tab" data-toggle="tab" role="tab" aria-controls="similar" aria-selected="true">
              {{ $t('product.similar') }}</a>
          </li>
          <!-- <li class="nav-item" v-if="sameCategory.length">
            <a class="nav-link small" @click="isShow = 'sameCat'" id="sameCat-tab" data-toggle="tab" role="tab" aria-controls="sameCat" aria-selected="false" >{{ $t('product.same_category') }}</a>
          </li> -->
          <li class="nav-item" v-if="recommendations.sameArtist.length">
            <a
              class="nav-link small"
              :class="{ active: activeTab === 'sameArtist' }"
              @click="showTab = 'sameArtist'"
              id="same-artist-tab" data-toggle="tab" role="tab">
              {{ $t('product_page.other_elements_by_{username}', { username: element.artist.username }) }}
            </a>
          </li>
          <li class="nav-item" v-if="recommendations.samePlugin.length">
            <a
              class="nav-link small"
              :class="{ active: activeTab === 'samePlugin' }"
              @click="showTab = 'samePlugin'"
              id="same-plugin-tab"
              data-toggle="tab" role="tab" aria-controls="sameArtist" aria-selected="true">
              {{ $t('product_page.other_{category}_elements', { category: recommendPlugin.name }) }}
            </a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">

          <transition name="fade" mode="out-in">
            <template v-for="(elements, recommendType) in recommendations">
              <RecommendationTabPane
                v-if="activeTab === recommendType"
                :id="recommendType"
                :key="recommendType"
                :elements="elements"
              />
            </template>
          </transition>
        </div>

      </div>

    </SectionProductInfo>

    <!-- Also in collection -->
    <!--
    <SectionProductInfo
      v-if="relateElement.data.length"
      class="section-product-info"
      :isColumn="true"
    >
      <template #heading>
        {{ $t('product_page.recommended') }}
      </template>

      <div class="mb-3" v-if="relateElement.data.length">
        <div>
          <span>{{ $t('search.results') }}</span>
          <select v-model="collectionPerpage">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <Pagination
          :pageTotal="Math.ceil(relateElement.totalCount / relateElement.perPage)"
          :perPage="relateElement.perPage"
          :pageNow="relateElement.page"
          @goPage="handlePagination"
          @pagePrev="handlePagination"
          @pageNext="handlePagination"
        />
        <ProductWrapper
          class="carousel-cell"
          v-for="element in relateElement.data"
          :key="element.id"
          :value="element.id"
          :element="element"
          :options="{
                cardType: 'list',
                expand: true,
                favorites: false,
                checkbox: false,
                tagsInput: false,
                // new options
                enablePlayer: true,
                hoverEvent: true,
                showFavoritesIcon: false,
                showSimilarIcon: false,
                showMediaTypeBadge: false,
                layoutDetailExpand: false,
                layoutCheckbox: false,
                layoutTagsInput: false,
              }"
        />
      </div>

    </SectionProductInfo>
    -->
  </div>
</template>


<script>
import { mapState } from 'vuex';

import { searchElements } from '@/services/search.service.js';

export default {
  name: 'product-recommendations',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    SectionProductInfo: () => import('@/views/product/components/SectionProductInfo.vue'),
    RecommendationTabPane: () => import('@/views/product/sections/RecommendationTabPane.vue'),

  },
  data() {
    return {
      isRemoved: false,
      isNotFound: false,
      relateElement: {
        data: [],
      },
      page: 0,
      perPage: 0,
      modalParam: '',
      // mediatype: '',
      collectionPage: 1,
      collectionPerpage: 20,
      metaInfo: {
        title: '',
        description: '',
      },
      showTab: 'similar',
      isShow: 'similar',
      recommendations: {
        similar: [],
        sameCategory: [],
        sameArtist: [],
        samePlugin: [],
      },
      isFree: false,
      includedFiles: [],
      expandMoods: false,
      expandCategories: false,
      expandKeywords: false,
      maxKeywords: 5,
    };
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      member: state => state.member,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
    }),
    element() {
      return this.product;
    },
    activeTab() {
      if (this.showTab) {
        const elements = _.get(this.recommendations, this.showTab);
        if (elements && elements.length) {
          return this.showTab;
        }
      }

      Object.keys(this.recommendations).forEach((recommendType) => {
        if (this.recommendations[recommendType].length) {
          return recommendType;
        }
      });

      return null;
    },
    hasRecommendations() {
      Object.keys(this.recommendations).forEach((recommendType) => {
        if (this.recommendations[recommendType].length) {
          return true;
        }
      });

      return true;
    },
    mediaType() {
      return _.get(this.element, 'mediaType');
    },
    recommendPlugin() {
      try {
        if (this.mediaType === 'ae_template') {
          const plugins = _.get(this.element, 'mediaTypeDetails.pluginsRequired');

          if (plugins && plugins.length) {
            // look for Element 3D

            const plugin = plugins.find(x => x.code.toLowerCase() === 'videocopilot_3darray');

            if (plugin) {
              return plugin;
            }
          }
        }
      } catch (e) {
        // eat errors
        console.error(e);
      }
      return null;
    },
  },
  mounted() {
    if (this.product) {
      this.initRecommendations();
    }
  },
  methods: {
    initRecommendations() {
      const element = this.product;

      const mediaType = element.mediaType;

      // const artistUsername = element.artist.username.toLowerCase();

      try {
        searchElements(mediaType, {
          perPage: 6,
          similar: element.id,
          // '-artist': artistUsername,
        }).then((response) => {
          console.log('search1', response);
          const data = response.data.data;
          // remove current selection from it
          this.recommendations.similar = Array.isArray(data) ? data : [];
        }).catch(error => console.error(error.message));

        // if element categories, then get same cat elements
        if (element.categories.length) {
          searchElements(mediaType, {
            perPage: 6,
            cat: element.categories[0].id,
          }).then((response) => {
            const data = response.data.data;
            this.recommendations.sameCategory = Array.isArray(data) ? data : [];
          }).catch(error => console.error(error.message));
        }

        // get elements by same artist
        searchElements(mediaType, {
          perPage: 6,
          artist: element.artist.username,
        }).then((response) => {
          const data = response.data.data;
          this.recommendations.sameArtist = Array.isArray(data) ? data : [];
        }).catch(error => console.error(error.message));

        if (this.recommendPlugin) {
          // if ae, get elements with same plugin
          // check plugins used
          searchElements(mediaType, {
            perPage: 6,
            plugin: this.recommendPlugin.code.toLowerCase(),
          }).then((response) => {
            const data = response.data.data;
            this.recommendations.samePlugin = Array.isArray(data) ? data : [];
          }).catch(error => console.error(error.message));
        }
      } catch (e) {
        // eat errors
        console.error(e);
      }
    },
    handlePagination(event) {
      if (event === 'prev') {
        this.collectionPage -= 1;
      } else if (event === 'next') {
        this.collectionPage += 1;
      } else if (Number.isInteger(event)) {
        this.collectionPage = event;
      }
    },
  },
  watch: {
    product: function () {
      this.initRecommendations();
    },
  },
};
</script>

<style lang="scss" scoped>
  .btn-keywords {
    &:not(:last-child) {
      margin-right: map-get($spacers, 1)
    }
  }

  .pre-formatted {
    white-space: pre-wrap;
  }

  // // SIZING RECOMMENDED ELEMENTS

  // .card-element-recommended {
  //   width: 100%;

  //   @include media-breakpoint-between(sm,lg) {
  //     width: calc(50% - #{$spacer}) !important;
  //   }

  //   @include media-breakpoint-up(xl) {
  //     width: calc(33% - #{$spacer}) !important;
  //   }
  // }
</style>
