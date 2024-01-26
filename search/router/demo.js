/**
 * TEST ROUTES
 */

const demo = [
  {
    path: '/:lang?/demo',
    name: 'demo',
    component: () => import('@/views/Demo.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/lerna-import',
    name: 'demo-core-js',
    component: () => import('@/views/demo/LernaImport.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/core-js',
    name: 'demo-core-js',
    component: () => import('@/views/demo/CoreJs.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/input-mask',
    name: 'demo-input-mask',
    component: () => import('@/views/demo/InputVMask.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/vuelidate',
    name: 'demo-vuelidate',
    component: () => import('@/views/demo/Vuelidate.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/modal',
    name: 'demo-modal',
    component: () => import('@/views/demo/ModalDemo.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/font',
    name: 'demo-font',
    component: () => import('@/views/demo/Font.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/demo/flickity-alternatives',
    name: 'demo-flickity-alternatives',
    component: () => import('@/views/demo/FlickityAlternatives.vue'),
    meta: { layout: 'default' },
  },
  // {
  //   path: '/:lang?/demo/checkout',
  //   name: 'checkout',
  //   component: () => import('@/views/demo/Checkout.vue'),
  //   meta: { layout: 'default' },
  // },
];

module.exports = demo;
