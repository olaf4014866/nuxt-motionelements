<template>
  <div>

    <AdminBar v-if="product && isOwner"
      :product="product"
    />

    <ProductGone v-if="isGone"
      :product="product"
    />
    <ProductNotFound v-else-if="isNotFound"
    />
    <div v-else-if="isLoaded">
      <ElementPageContent v-if="element"
        :element="element"
        style="min-height: 500px"
      />
      <CollectionPageContent v-if="collection"
        :collection="collection"
        style="min-height: 500px"
      />

      <PageSchema
        v-if="product"
        :breadcrumbs="breadcrumbList"
        :product="product"
        :mediatype="'product'"
        :submediatype="mediaType"
        :title="pageTitle"
        :description="pageDescription"
      />

      <Breadcrumbs
        :breadcrumbs="breadcrumbList"
      />
    </div>
    <PageLoader v-else />

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Money from '@motionelements/money';

import PageLoader from '@motionelements/core/src/components/ui/PageLoader.vue';
import ElementPageContent from '@/views/product/Element.vue';

import routeConst from '@/router/const.js';

export default {
  name: 'product-page',
  components: {
    ProductGone: () => import('@/views/product/ProductGone.vue'),
    ProductNotFound: () => import('@/views/product/ProductNotFound.vue'),
    AdminBar: () => import('@/views/product/sections/AdminBar.vue'),
    ElementPageContent,
    // ElementPageContent: () => import('@/views/product/Element.vue'),
    CollectionPageContent: () => import('@/views/product/Collection.vue'),
    // PageSchema: () => import('@/components/modules/common/PageSchema.vue'),
    PageSchema: () => import('@/views/product/ProductPageSchema.vue'),
    // Breadcrumb: () => import('@/components/modules/common/Breadcrumb.vue'),
    // Breadcrumbs: () => import('@/views/product/sections/ProductBreadcrumbs.vue'),
    Breadcrumbs: () => import('@motionelements/core/src/components/ui/BaseBreadcrumbs.vue'),
    PageLoader,
    // PageLoader: () => import('@motionelements/core/src/components/ui/PageLoader.vue'),
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.isLoggedIn,
      isMember: state => state.user.isMember,
      member: state => state.user.member,
      mediaTypeIcon: state => state.site.currentMediaType.iconClassDefault,
      currentMediaType: state => state.site.currentMediaType.id,
      isGone: state => state.product.current.isGone,
      isNotFound: state => state.product.current.isNotFound,
    }),
    ...mapGetters({
      element: 'product/currentElement',
      collection: 'product/currentCollection',
    }),
    isElement() {
      return this.$route.meta.productType === 'element';
    },
    isCollection() {
      return this.$route.meta.productType === 'collection';
    },
    product() {
      if (this.element) {
        return this.element;
      }
      if (this.collection) {
        return this.collection;
      }
      return null;
    },
    price() {
      const price = _.get(this.product, 'price');

      if (price > 0) {
        return Money({ amount: price, currency: this.product.currency });
      }

      return null;
    },
    isOwner() {
      return this.isLoggedIn
        && this.member.artist
        && this.member.username
        && this.member.username === _.get(this.element, 'artist.username');
    },
    relateType() {
      switch (this.$route.params.pathMatch) {
        case 'stock-video':
        case 'stock-image':
        case 'stock-animation':
          return 'related_elements';
        case 'after-effects-template':
        case 'premiere-pro-template':
        case 'apple-motion-template':
        case 'motion-graphics-template':
          return 'recommended_music';
        default:
          return null;
      }
    },
    mediaType() {
      return this.element ? this.element.mediaType : null;
    },
    pageTitle() {
      if (this.product) {
        return _.get(this.product, 'html.title', this.product.id);
      }
      return '';
    },
    pageDescription() {
      if (this.product) {
        return _.get(this.product, 'html.description', this.product.id);
      }

      return '';
    },
    artistUsername() {
      if (this.product) {
        return _.get(this.product, 'artist.username', '');
      }
      return '';
    },
    primaryCategory() {
      if (this.element) {
        if (_.size(this.element.categories)) {
          let category;

          if (this.mediaType === 'music') {
            // get genre for music
            category = this.element.categories.find(x => x.type === 'genre');

            if (category) {
              return category;
            }
          }

          // return first category
          return this.element.categories[0];
        }
      }

      return null;
    },
    descriptionLength() {
      const descriptions = _.get(this.element, 'descriptions');

      if (Array.isArray(descriptions) && descriptions.length) {
        let length = 0;

        descriptions.forEach((obj) => {
          const html = _.get(obj, 'html');
          if (html && html.length > length) {
            length = obj.html.length;
          }
        });

        return length;
      }

      return _.get(this.element, 'description', '').length;
    },
    breadcrumbList() {
      // generate breadcrumbs data
      const list = [];

      if (this.element) {
        const channel = this.$route.meta.channel;

        list.push({
          name: channel === 'ae' ? this.$i18n.t(`header.${channel}`) : this.$term('mediaType', channel).short().text(),
          // nameSeo overwrites name for display in jsonLd
          nameSeo: this.$term('mediaType', channel).seo().text(),
          link: this.getChannelUrl(channel),
        });

        /*
      // show artist is search is artist
      if (this.$route.path.match('artists') && this.artistUsername) {
        list.push({
          name: this.artistUsername,
          link: this.$link(`/${routeConst.ARTISTS}/${this.artistUsername.toLowerCase()}`).url(),
        });
      }
      */

        if (this.primaryCategory && _.get(this.primaryCategory, 'name')) {
          list.push({
            name: this.primaryCategory.name,
            link: _.get(this.primaryCategory, 'html.url'),
          });
        }

        // finally show this product
        list.push({
          active: true,
          name: this.element.name,
          nameSeo: this.element ? `${this.product.name} ${this.$term('mediaType', this.element.mediaType).seo().text()}` : null,
          link: _.get(this.element, 'html.url'),
        });
      }


      // finally show this product
      if (this.collection) {
        list.push({
          name: this.$i18n.t('search.bundles'),
          link: this.$link('/browse/collections').url(),
        });

        list.push({
          active: true,
          name: this.collection.name,
          link: _.get(this.collection, 'html.url'),
        });
      }

      return list;
    },
    metaInfo() {
      return {
        /* link: [
            { rel: 'amphtml',
              href: this.$router.resolve(localizedRoute({
                name: this.product.type_id + '-product-amp',
                params: {
                  parentSku: this.product.parentSku ? this.product.parentSku : this.product.sku,
                  slug: this.product.slug,
                  childSku: this.product.sku
                }
              }, storeView.storeCode)).href
            }
          ], */
        title: this.pageTitle,
        meta: this.pageDescription ? [{
          name: 'description',
          content: this.pageDescription,
        }] : [],
      };
    },
  },
  methods: {
    getChannelUrl(channel) {
      switch (channel) {
        case 'animation':
          return `/${routeConst.ANIMATION}`;
        case 'ae':
          return `/${routeConst.AE_TEMPLATES}`;
        case 'pr':
          return `/${routeConst.PR_TEMPLATES}`;
        case 'fcp':
          return `/${routeConst.MOTION_TEMPLATES}`;
        case 'resolve':
          return `/${routeConst.DAVINCHI_RESOLVE_TEMPLATES}`;
        case 'music':
          return `/${routeConst.MUSIC}`;
        case 'sfx':
          return `/${routeConst.SFX}`;
        case '3d':
          return `/${routeConst.THREE_D}`;
        case 'image':
          return `/${routeConst.STOCK_IMAGE}`;
        case 'lottie':
          return `/${routeConst.LOTTIE}`;
        case 'video':
        default:
          return `/${routeConst.VIDEO}`;
      }
    },

    // if (isProductType('video', this.mediaType)) {
    //   item.name = this.$i18n.t('header.video');
    //   item.url = this.$link(`/${routeConst.STOCK_FOOTAGE}`).url();
    // }

    filterSimilar(element) {
      // @temp
      // load search page
      if (!this.isElement) {
        return false;
      }

      if (!this.mediaType) {
        return false;
      }

      console.log(element);

      // const searchUrl = `/search/${this.mediaType.replace('_', '-')}`).param('similar', this.element.id).url();

      // console.log('emitpush:', this.$link(`/search/${this.mediaType.replace('_', '-')}`).param('similar', this.element.id).fullPath());
      this.$router.push({
        path: this.$link(`/search/${this.mediaType.replace('_', '-')}`).param('similar', this.element.id).fullPath(),
      });
    },
    initProductPage() {
      console.log('INIT PRODUCT PAGE-----');
      const id = this.$route.params.id;

      this.isLoaded = false;

      const isPreviewMode = !!this.$route.query.preview;

      if (id) {
        if (this.isElement) {
          this.$store.dispatch('product/getElementDetails', {
            sku: id,
            relationType: this.relateType,
            preview: isPreviewMode, // preview mode
          }).then((response) => {
            const element = response.data.data;

            this.setCurrentMediaType(element.mediaType);
            this.isLoaded = true;

            this.$store.dispatch('product/getElementSchema', {
              mediaType: element.mediaType,
            });

            this.fireTeleportForProductPage();
          });
        } else if (this.isCollection) {
          this.$store.dispatch('product/getCollectionDetails', {
            sku: `c-${id}`,
            preview: isPreviewMode, // preview mode
          }).then((response) => {
            console.log('collectionDetails', response);
            this.isLoaded = true;

            this.fireTeleportForProductPage();
          });
        }
      }
    },
    setCurrentMediaType(mediaType) {
      const mapSupportedMediaTypes = this.$store.getters['site/mapMediaTypes'];

      console.log('mapMt', mapSupportedMediaTypes);

      let info = _.find(mapSupportedMediaTypes, { id: this.$tools.convertRouteMediatypeShort(mediaType) });
      // app no mediatype match fallback
      if (!info) {
        info = _.find(mapSupportedMediaTypes, { id: this.$tools.convertRouteMediatypeShort('video') });
      }

      console.log('currentMt', info);

      this.$store.dispatch('site/setCurrentMediaType', info);
    },
    fireTeleportForProductPage() {
      const teleportData = {
        product: this.element,
      };
      this.$teleport.event('product_viewed', teleportData);
    },
  },
  created() {
    // this.initProductPage();
  },
  mounted() {
    this.$root.$on('filterSimilar', this.filterSimilar);
  },
  beforeDestroy() {
    this.$root.$off('filterSimilar', this.filterSimilar);

    this.$store.commit('product/clearCurrentProduct');
  },
  watch: {
    // init only if id is different
    '$route.params.id': {
    // $route(to, from) {
      handler(to, from) {
        console.log('route change', to, from);
        // init only if id is different
        this.initProductPage();
      },
      // deep: true,
      immediate: true,
    },
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.pageDescription,
        },
        {
          vmid: 'robots',
          name: 'robots',
          content: this.descriptionLength > 400 ? 'index nofollow' : 'noindex nofollow',
        },
      ],
    };
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
