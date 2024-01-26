/**
 * CATEGORY PAGE ROUTES
 * * ROUTE FILE NAME NEED SAME WITH REAL PATH! EXCEPT HOME
 * NORMAL CHANNEL PAGE: home, video, animation ...
 * CATEGORY PAGE: after-effects/{some-slug-from-title}-{id}
 * after-effects/slideshow-templates-199
 */

// const productRegex = '(3d-model|stock-video|stock-animation|stock-music|stock-image|premiere-pro-template|after-effects-template|apple-motion-template|motion-graphics-template|davinci-resolve-template|davinci-resolve-macro|after-effects-plugins|sound-effect|lottie-animation)';

//  mediatype base regex
// const productRegex = '(3d-model|stock-video|stock-music|stock-image|premiere-pro-template|after-effects-template|apple-motion-template|motion-graphics-template|after-effects-plugins|sound-effect|lottie-animation)';
// const productSlashRegex = '(3d-model|stock-animation)';
// const productSlashRegex2 = '(davinci-resolve-template)';

// const routeConst = require('./const.js');

const product = [
  {
    path: '/:lang?/(stock-video|stock-animation)([-/]):id(\\d+)([-/]):slug',
    name: 'product-video-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'video',
    },
  },
  {
    path: '/:lang?/(stock-music)([-/]):id(\\d+)([-/]):slug',
    name: 'product-music-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'music',
    },
  },
  {
    path: '/:lang?/(after-effects-template)([-/]):id(\\d+)([-/]):slug',
    name: 'product-ae-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'ae',
    },
  },
  {
    path: '/:lang?/(premiere-pro-template|motion-graphics-template)([-/]):id(\\d+)([-/]):slug',
    name: 'product-pr-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'pr',
    },
  },

  {
    path: '/:lang?/(apple-motion-template)([-/]):id(\\d+)([-/]):slug',
    name: 'product-fcp-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'fcp',
    },
  },
  {
    path: '/:lang?/(davinci-resolve-template|davinci-resolve-macro)([-/]):id(\\d+)([-/]):slug',
    name: 'product-resolve-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'resolve',
    },
  },
  {
    path: '/:lang?/(stock-image)([-/]):id(\\d+)([-/]):slug',
    name: 'product-image-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'image',
    },
  },
  {
    path: '/:lang?/(3d-model)([-/]):id(\\d+)([-/]):slug',
    name: 'product-3d-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: '3d',
    },
  },
  {
    path: '/:lang?/(sound-effect)([-/]):id(\\d+)([-/]):slug',
    name: 'product-sfx-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'sfx',
    },
  },
  {
    path: '/:lang?/(lottie-animation)([-/]):id(\\d+)([-/]):slug',
    name: 'product-lottie-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
      channel: 'lottie',
    },
  },
  // {
  //   path: `/:lang?/${productRegex}-:id(\\d+)([-/]):slug`,
  //   name: 'element-page',
  //   component: () => import(/* webpackChunkName: "product-page" */ '@/pages/index.vue'),
  //   meta: {
  //     layout: 'default',
  //     productType: 'element',
  //   },
  // },
  // {
  //   path: `/:lang?/${productRegex}/:id(\\d+)([-/]):slug`,
  //   name: 'element-page',
  //   component: () => import(/* webpackChunkName: "product-page" */ '@/pages/index.vue'),
  //   meta: {
  //     layout: 'default',
  //     productType: 'element',
  //   },
  // },
  {
    path: '/:lang?/c-:id(\\d+)-:slug',
    name: 'collection-page',
    component: () => import(
      /* webpackChunkName: "product-page" */
      /* webpackPrefetch: true */
      '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'collection',
    },
  },
  {
    path: '/:lang?/after-effects-plugins/*-:id',
    name: 'ae-plugin-page',
    // name: `${routeConst.PRODUCT}/${routeConst.AE_PLUGIN}`,
    component: () => import(/* webpackChunkName: "product-page" */ '@/pages/index.vue'),
    meta: {
      layout: 'default',
      productType: 'element',
    },
  },
];

module.exports = product;
