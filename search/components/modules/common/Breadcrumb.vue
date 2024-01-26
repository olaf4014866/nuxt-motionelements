<template>
  <section class="section-breadcrumb breadcrumb-dark d-flex">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="d-none d-md-block col-md-5 pr-0">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb small">
              <li class="breadcrumb-item">
                <a :href="$link('/').url()">
                  <span>MotionElements</span>
                </a>
              </li>
              <template v-if="['dlp', 'category', 'product'].indexOf(mediatype) > -1">
                <li class="breadcrumb-item">
                  <a :href="$link(`/${routeConst.STOCK_IMAGE}`).url()" v-if="isProductType('image', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.image') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.VIDEO}`).url()" v-else-if="submediatype.match('collection')">
                    <span style="color: #bcc1c3">{{ $t('header.artist_collection_manage') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.ANIMATION}`).url()" v-else-if="submediatype.match('animation')">
                    <span style="color: #bcc1c3">{{ $t('header.animation') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.VIDEO}`).url()" v-else-if="isProductType('video', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.video') }}</span>
                  </a>
                  <a :href="$link(`/${ routeConst.PR_TEMPLATES}`).url()" v-else-if="isProductType('pr', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.pr') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.AE_TEMPLATES}`).url()" v-else-if="isProductType('ae', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.ae') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.MOTION_TEMPLATES}`).url()" v-else-if="isProductType('fcp', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.motion') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.MUSIC}`).url()" v-else-if="isProductType('music', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.music') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.SFX}`).url()" v-else-if="isProductType('sfx', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.sfx') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.THREE_D}`).url()" v-else-if="isProductType('3d', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.3d') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.LOTTIE}`).url()" v-else-if="isProductType('lottie', submediatype)">
                    <span style="color: #bcc1c3">{{ $t('header.lottie') }}</span>
                  </a>
                </li>
              </template>
              <template v-if="isShowFree">
                <li class="breadcrumb-item">
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.STOCK_FOOTAGE}`).url()" v-if="$route.path.match('free/stock') || isProductType('video', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'video').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.video') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.GIFS}`).url()" v-if="$route.path.match('free/gifs') || isProductType('image', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'gif').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.image') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.PR_TEMPLATES}`).url()" v-if="$route.path.match('free/premiere') || isProductType('pr', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'pr').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.pr') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.AE_TEMPLATES}`).url()" v-if="$route.path.match('free/after-effect') || isProductType('ae', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'ae').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.ae') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.FCPX_TEMPLATES}`).url()" v-if="$route.path.match('free/fcpx') || isProductType('fcp', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'fcp').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.motion') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.BG_MUSIC}`).url()" v-if="$route.path.match('free/background-music') || isProductType('music', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'music').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.music') }}</span>
                  </a>
                  <a :href="$link(`/${routeConst.FREE}/${routeConst.SFX}`).url()" v-if="$route.path.match('free/sound-effects') || isProductType('sfx', submediatype)">
                    <span v-if="mediatype.match('product')" style="color: #bcc1c3">
                      {{ $term('mediaType', 'sfx').seo().free().text() }}
                    </span>
                    <span v-else style="color: #bcc1c3">{{ $t('header.sfx') }}</span>
                  </a>
                </li>
              </template>
              <template v-else-if="$route.path.match('artists')">
                <li class="breadcrumb-item">
                  <a :href="$link(`/${routeConst.ARTISTS}`).url()">
                    <span style="color: #bcc1c3">{{ $t('term.artists') }}</span>
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a :href="$link(`/${routeConst.ARTISTS}/${title}`).url()">
                    <span style="color: #bcc1c3">{{ title }}</span>
                  </a>
                </li>
              </template>
              <!-- show product page category -->
              <li class="breadcrumb-item" v-else-if="getCategories">
                <a :href="getCategories.url" v-if="getCategories.id">
                  <span style="color: #bcc1c3">{{ getCategories.name }}</span>
                </a>
              </li>
              <!-- show title when provide title -->
              <li class="breadcrumb-item" v-if="title && ['dlp', 'category', 'product'].indexOf(mediatype) > -1">
                <a :href="$route.path">
                  <span style="color: #bcc1c3" v-html="title"></span>
                </a>
              </li>
              <li class="breadcrumb-item" v-if="mediatype && !title">
                <span style="color: #bcc1c3">
                  {{ $term('mediaType', this.mediatype).text() }}
                </span>
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-12 col-md-2 text-center">
          <a class="btn btn-block btn-link py-2" title="Back to Top" @click="$scrollTo('#app')">
            <font-awesome-icon :icon="['fas','angle-double-up']" fixed-width size="lg"></font-awesome-icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import routeConst from '@/router/const.js';

import {
  isProductType,
} from '@motionelements/core/src/services/catalog.service.js';


export default {
  name: 'breadcrumb',
  props: {
    mediatype: String,
    submediatype: {
      type: String,
      default: '',
    },
    title: String,
    element: Object,
  },
  data() {
    return {
      routeConst: routeConst,
    };
  },
  computed: {
    isShowFree() {
      // if (this.$route.path.match('/free/')) {
      //   return true;
      // }
      if (this.mediatype === 'product' && this.element.free) {
        return true;
      }
      return false;
    },
    getCategories() {
      if (this.mediatype === 'product' && this.element.categories) {
        return this.element.categories[0];
      }
      return null;
    },
    breadcrumbList() {
      // build list?
      return [];
    },
  },
  methods: {
    getPageName() {
      return this.mediatype.match('free')
        ? this.$term('mediaType', this.mediatype).text()
        : this.$t(`header.${this.mediatype.replace('_template', '')}`);
    },
    isProductType(productType, subMediaType) {
      return isProductType(productType, subMediaType);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-breadcrumb {
  background: map-get(map-get($theme-colors-variants,"black"),"1");
  min-height: 2rem;
}

.breadcrumb {
  flex-wrap: nowrap;

  .breadcrumb-item {
    white-space: nowrap;

    &:last-child {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.breadcrumb-dark {
  a {
    color: $link-color-dark;
  }
}
</style>
