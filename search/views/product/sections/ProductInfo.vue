<template>
  <div>
          <!-- GIF Creator Preview: for GIFs only -->
    <SectionProductInfo
      v-if="Object.keys(element).length && element.mediaType === 'gif'"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product_page.create_gif_heading') }}
        <br />
        <span class="small text-muted">
            {{ $t('product_page.create_gif_preview_disclaimer') }}
          </span>
      </template>

      <div class="mb-3">
        <PreviewGifSmall
          :element="element"
        />
      </div>

    </SectionProductInfo>

    <!-- Detail Specs Section -->
    <SectionProductInfo
      v-if="Object.keys(product).length"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product_page.details') }}
      </template>

      <ElementDetails
        v-if="isElement"
        :element="element"
      />
      <CollectionDetails
        v-else-if="isCollection"
        :collection="collection"
      />

    </SectionProductInfo>

    <ProductDescription
      :product="product"
    />

    <!-- Tutorial Video -->
    <!-- <SectionProductInfo
      class="section-product-info"
      v-if="element.tutorial"
      :isColumn="true"
    >
      <template #heading>
        <a name="tutorial"></a>
        {{ $t('product_page.tutorial_video') }}
      </template>

      <div class="mb-3 small d-flex justify-content-center">
        <div class="rounded overflow-hidden preview-wrapper">
          <img
            class="img-fluid"
            src="@/assets-mockup/img/placeholder-640x360-light.jpg"
            alt="PLACEHOLDER FOR TUTORIAL VIDEO"
          />
        </div>
      </div>
    </SectionProductInfo> -->

    <!-- Only show stills when there are more than 1 -->
    <!-- This should auto-exclude the album artwork from the music media type -->
    <SectionProductInfo
      class="section-product-info"
      :isColumn="true"
      v-if="element.thumbnails && element.thumbnails.jpgs && element.thumbnails.jpgs.length > 1 && previewType === 'template'"
    >
      <template #heading>
        {{ $t('product_page.stills') }}
      </template>

      <SectionStills
        :element="element"
      />

    </SectionProductInfo>

    <!-- Artist's Profile Section -->
    <SectionProductInfo
      v-if="true"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product_page.artist') }}
      </template>

      <SectionArtist
        :artist="product.artist"
      />

    </SectionProductInfo>

    <SectionProductInfo
      v-if="genres.length > 0"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product.genres') }}
      </template>

      <div class="mb-3">
        <nuxt-link
          v-for="category in displayGenres"
          :key="`keyword-${category.id}`"
          class="btn btn-sm btn-simple-secondary btn-keywords"
          :to="'$link(`/search/${mediaType.replace(_, -)}`).param(genre, category.id).fullPath()'"
        >
          {{ category.name }}
        </nuxt-link>
        <a
          v-if="expandGenres || (genres > displayGenres)"
          @click="expandGenres = !expandGenres"
          class="small font-weight-bold">
          <template v-if="!expandGenres">
            {{ $t('cta.show_less') }}
          </template>
          <template v-else>
            {{ $t('cta.show_more') }}
          </template>
        </a>
      </div>
    </SectionProductInfo>

    <SectionProductInfo
      v-if="moods.length > 0"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product.moods') }}
      </template>

      <div class="mb-3">
        <nuxt-link
          v-for="category in displayMoods"
          :key="`keyword-${category.id}`"
          class="btn btn-sm btn-simple-secondary btn-keywords"
          :to="'$link(`/search/${mediaType.replace(_, -)}`).param(mood, category.id).fullPath()'"
        >
          {{ category.name }}
        </nuxt-link>
        <a
          v-if="expandMoods || (moods > displayMoods)"
          @click="expandMoods = !expandMoods"
          class="small font-weight-bold">
          <template v-if="!expandMoods">
            {{ $t('cta.show_less') }}
          </template>
          <template v-else>
            {{ $t('cta.show_more') }}
          </template>
        </a>
      </div>
    </SectionProductInfo>

    <!-- Categories (for Music Only) -->
    <!-- If genres exist (for music), show the categories here -->
    <SectionProductInfo
      v-if="categories.length > 0"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product.categories') }}
      </template>

      <div class="mb-3">
        <nuxt-link
          v-for="category in displayCategories"
          :key="`keyword-${category.id}`"
          class="btn btn-sm btn-simple-secondary btn-keywords"
          :to="'$link(`/search/${mediaType.replace(_, -)}`).param(category, category.id).fullPath()'"
        >
          {{ category.name }}
        </nuxt-link>
        <a
          v-if="expandCategories || categories > displayCategories"
          @click="expandCategories = !expandCategories"
          class="small font-weight-bold">
          <template v-if="!expandCategories">
            {{ $t('cta.show_less') }}
          </template>
          <template v-else>
            {{ $t('cta.show_more') }}
          </template>
        </a>
      </div>

    </SectionProductInfo>

    <SectionProductInfo
      v-if="styles.length > 0"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product.styles') }}
      </template>

      <div class="mb-3">
        <nuxt-link
          v-for="category in displayStyles"
          :key="`keyword-${category.id}`"
          class="btn btn-sm btn-simple-secondary btn-keywords"
          :to="'$link(`/search/${mediaType.replace(_, -)}`).param(style, category.id).fullPath()'"
        >
          {{ category.name }}
        </nuxt-link>
        <a
          v-if="expandStyles || (styles > displayStyles)"
          @click="expandStyles = !expandStyles"
          class="small font-weight-bold">
          <template v-if="!expandStyles">
            {{ $t('cta.show_less') }}
          </template>
          <template v-else>
            {{ $t('cta.show_more') }}
          </template>
        </a>
      </div>
    </SectionProductInfo>

    <!-- Keywords -->
    <SectionProductInfo
      v-if="element.keywords"
      class="section-product-info"
    >
      <template #heading>
        {{ $t('product_page.keywords') }}
      </template>

      <div class="mb-3">
        <nuxt-link
          v-for="keyword in displayKeywords"
          :key="`keyword-${keyword}`"
          class="btn btn-sm btn-simple-secondary btn-keywords"
          :to="'$link(`/search/${mediaType.replace(_, -)}`).param(s, keyword).fullPath()'"
        >
          {{ keyword }}
        </nuxt-link>
        <a v-if="expandKeywords || element.keywords > displayKeywords"
          @click="expandKeywords = !expandKeywords"
          class="small font-weight-bold">
          <template v-if="!expandKeywords">
            {{ $t('cta.show_less') }}
          </template>
          <template v-else>
            {{ $t('cta.show_more') }}
          </template>
        </a>
      </div>

    </SectionProductInfo>

    <!-- Tutorial section -->

    <SectionProductInfo
      class="section-product-info"
      v-if="hasVideoTutorial"
      :isColumn="true"
      id="section-tutorial"
    >
      <template #heading>
        {{ $t('product_page.tutorial_video') }}
      </template>

      <div class="mb-3" >
        <PlayerTutorial :element="element" :url="isTutorial.url"/>
      </div>
    </SectionProductInfo>

    <SectionProductInfo
      v-if="isPartOfCollection"
      class="section-product-info"
    >
      <template #heading>
        Is Part of collection
        {{ $t('product_page.tutorial_video') }}
      </template>

      <div class="mb-3" >
        Show collection
      </div>
    </SectionProductInfo>

    <!-- Recommendations -->
    <SectionProductInfo
      v-if="Object.keys(element).length && hasRecommendations"
      class="section-product-info"
      :isColumn="true"
    >
      <template #heading>
        {{ $t('product_page.you_may_also_like') }}
      </template>

      <div class="mb-3">
        <ul class="nav nav-pills" id="myTab" role="tablist">
          <li class="nav-item" v-if="similar.length">
            <a class="nav-link small"
               :class="{ active: isShow === 'similar' }"
               @click="isShow = 'similar'"
               id="similar-tab" data-toggle="tab" role="tab" aria-controls="similar" aria-selected="true">{{ $t('product.similar') }}</a>
          </li>
          <!-- <li class="nav-item" v-if="sameCategory.length">
            <a class="nav-link small" @click="isShow = 'sameCat'" id="sameCat-tab" data-toggle="tab" role="tab" aria-controls="sameCat" aria-selected="false" >{{ $t('product.same_category') }}</a>
          </li> -->
          <li class="nav-item">
            <a
              class="nav-link small"
              :class="{ active: isShow === 'sameArtist' }"
              @click="isShow = 'sameArtist'" id="sameArtist" data-toggle="tab" role="tab" aria-controls="sameArtist" aria-selected="true">Other Elements by {{ element.artist.username }}</a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">

          <transition name="fade" mode="out-in">
            <template v-if="isShow === 'similar'">
              <div
                class="tab-pane show active"
                id="similar"
                role="tabpanel"
                aria-labelledby="similar-tab"
                v-if="similar.length"
                key="similar"
              >
                <ProductWrapper
                  :class="['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'card-element-recommended-music' : 'card-element-recommended'"
                  v-for="element in similar"
                  :key="element.id"
                  :value="element.id"
                  :element="element"
                  :options="{
                      cardType: ['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'list' : 'card',
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
                ></ProductWrapper>
              </div>
            </template>
            <!-- <template v-if="isShow === 'sameCat'">
              <div
                class="tab-pane show active"
                id="sameCat"
                role="tabpanel"
                aria-labelledby="sameCat-tab"
                v-if="sameCategory.length"
                key="sameCat"
              >
                <ProductWrapper
                  :class="['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'card-element-recommended-music' : 'card-element-recommended'"
                  v-for="element in sameCategory"
                  :key="element.id"
                  :value="element.id"
                  :element="element"
                  :options="{
                    cardType: ['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'list' : 'card',
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
                ></ProductWrapper>
              </div>
            </template> -->
            <template v-if="isShow === 'sameArtist'">
              <div
                class="tab-pane show active"
                id="sameArtist"
                role="tabpanel"
                aria-labelledby="sameArtist-tab"
                v-if="sameArtist.length"
                key="sameArtist"
              >
                <ProductWrapper
                  :class="['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'card-element-recommended-music' : 'card-element-recommended'"
                  v-for="element in sameArtist"
                  :key="element.id"
                  :value="element.id"
                  :element="element"
                  :options="{
                      cardType: ['sfx', 'music'].indexOf(element.mediaType) > -1 ? 'list' : 'card',
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

    <!-- Also in collection -->
    <SectionProductInfo
      v-if="isCollection"
      class="section-product-info"
      :isColumn="true"
    >
      <CollectionElements
        :collection="collection"
      />
    </SectionProductInfo>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { format, fromUnixTime } from 'date-fns';
import { isProductType } from '@/services/catalog.service';

export default {
  name: 'product-info',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    ProductWrapper: () => import('@motionelements/core/src/components/product/ProductWrapper.vue'),
    // Pagination: () => import('@/components/modules/search/Pagination.vue'),

    SectionProductInfo: () => import('@/views/product/components/SectionProductInfo.vue'),

    ElementDetails: () => import('@/views/product/element/ElementDetails.vue'),
    CollectionDetails: () => import('@/views/product/collection/CollectionDetails.vue'),
    SectionStills: () => import('@/views/product/sections/ProductStills.vue'),
    SectionArtist: () => import('@/views/product/sections/ProductArtist.vue'),
    ProductDescription: () => import('@/views/product/sections/ProductDescription.vue'),

    PreviewGifSmall: () => import('@/views/product/preview/PreviewGifSmall.vue'),

    CollectionElements: () => import('@/views/product/collection/CollectionElements.vue'),
    PlayerTutorial: () => import('@/views/product/preview/players/PlayerTutorial.vue'),
  },
  data() {
    return {
      taxonomyTypes: ['genre', 'mood', 'category', 'style', 'type'],
      isRemoved: false,
      isNotFound: false,
      relateElement: {
        data: [],
      },
      page: 0,
      perPage: 0,
      modalParam: '',
      mediatype: '',
      // collectionItems: [],
      collectionPage: 1,
      collectionPerpage: 20,
      metaInfo: {
        title: '',
        description: '',
      },
      similar: [],
      sameCategory: [],
      sameArtist: [],
      isShow: 'similar',
      isFree: false,
      includedFiles: [],
      expandMoods: false,
      expandGenres: false,
      expandStyles: false,
      expandTypes: false,
      expandCategories: false,
      expandKeywords: false,
      maxKeywords: 5,
    };
  },
  created() {
    console.log(this.product)
  },
  computed: {
    ...mapState({
      isMember: state => state.member.isMember,
      member: state => state.member,
      collectionItems: state => state.product.collectionItems,
    }),
    ...mapGetters({
      userLanguage: 'user/languageCode',
    }),
    element() {
      return this.product;
    },
    collection() {
      return this.product.object === 'collection' ? this.product : null;
    },
    mediaType() {
      return _.get(this.element, 'mediaType');
    },
    isElement() {
      //zeus
      return true;
      return this.product.object === 'element';
    },
    isCollection() {
      return this.product.object === 'collection';
    },
    isPartOfCollection() {
      return false;
    },
    // usageRights() {
    //   return _.get(this.element, 'usageRights');
    // },
    // details() {
    //   return _.get(this.element, 'mediaTypeDetails');
    // },
    // by marksun
    hasVideoTutorial() {
      if (_.has(this.element, 'tutorials')) {
        return this.element.tutorials.find(x => x.format === 'video');
      }
      return false;
    },
    hasRecommendations() {
      if (this.similar.length > 0 || this.sameArtist.length > 0 || this.sameCategory.length > 0) {
        return true;
      }
      return false;
    },
    isVideoTemplate() {
      const mediaType = _.get(this.element, 'mediaType', '').replace('-', '_');
      return ['ae_template', 'ae_preset', 'pr_template', 'pr_preset', 'mg_template', 'motion_template'].includes(mediaType);
    },
    isVr() {
      const mediaType = _.get(this.element, 'mediaType', '').replace('-', '_');
      return ['video_vr', 'photo_vr'].includes(mediaType);
    },
    // end by marksun
    isTutorial() {
      if (this.element.tutorials) {
        return this.element.tutorials.find(x => x.format === 'video');
      }
      return false;
    },
    previewType() {
      switch (true) {
        case isProductType('video_template', this.mediaType):
          return 'template';
        case isProductType('vr', this.mediaType):
          return 'vr';
        case isProductType('audio', this.mediaType):
          return 'audio';
        case 'collection':
          return 'collection';
        default:
          return 'video';
      }
    },
    categories() {
      return this.isElement ? this.element.categories.filter(v => v.type === 'category') : [];
    },
    styles() {
      return this.isElement ? this.element.categories.filter(v => v.type === 'style') : [];
    },
    types() {
      return this.isElement ? this.element.categories.filter(v => v.type === 'type') : [];
    },
    genres() {
      if (this.mediaType === 'music') {
        return this.element.categories.filter(v => v.type === 'genre');
      }
      return [];
    },
    moods() {
      if (this.mediaType === 'music') {
        return this.element.categories.filter(v => v.type === 'mood');
      }
      return [];
    },
    displayCategories() {
      const limit = 10;
      if (this.categories.length) {
        if (this.expandCategories) {
          return this.categories;
        }
        return this.categories.slice(0, limit);
      }
      return [];
    },
    displayMoods() {
      const limit = 10;
      if (this.moods.length) {
        if (this.expandMoods) {
          return this.moods;
        }
        return this.moods.slice(0, limit);
      }
      return [];
    },
    displayGenres() {
      const limit = 10;
      if (this.genres.length) {
        if (this.expandGenres) {
          return this.genres;
        }
        return this.genres.slice(0, limit);
      }
      return [];
    },
    displayStyles() {
      const limit = 10;
      if (this.styles.length) {
        if (this.expandStyles) {
          return this.styles;
        }
        return this.styles.slice(0, limit);
      }
      return [];
    },
    displayTypes() {
      const limit = 10;
      if (this.types.length) {
        if (this.expandTypes) {
          return this.types;
        }
        return this.types.slice(0, limit);
      }
      return [];
    },
    displayKeywords() {
      if (this.element.keywords) {
        if (this.expandKeywords) {
          return this.element.keywords;
        }
        return this.element.keywords.slice(0, this.maxKeywords);
      }
      return [];
    },
  },
  mounted() {
  },
  methods: {
    formatDate(date) {
      return date ? format(fromUnixTime(date), 'yyyy-MM-dd') : '';
    },
    handlePagination(e) {
      if (e === 'prev') {
        this.collectionPage -= 1;
      } else if (e === 'next') {
        this.collectionPage += 1;
      } else if (Number.isInteger(e)) {
        this.collectionPage = e;
      }
    },
    /* sameCategoryLink(element) {
      const catId = [];
      element.categories.forEach((e) => {
        catId.push(e.id);
      });
      if (catId.length) {
        return this.$link(`/search/${this.mediaType.replace('_', '-')}?sort=match&page=1&cat=${catId.join(',')}`).url();
      }
    }, */
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

  // SIZING RECOMMENDED ELEMENTS

  .card-element-recommended {
    width: 100%;

    @include media-breakpoint-between(sm,lg) {
      width: calc(50% - #{$spacer}) !important;
    }

    @include media-breakpoint-up(xl) {
      width: calc(33% - #{$spacer}) !important;
    }
  }
</style>
