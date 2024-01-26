/**
 * FAVORITES ROUTES
 */

const library = [
  {
    path: '/:lang?/favorites/edit/:folderId',
    name: 'view-favorites-folder',
    component: () => import(/* webpackChunkName: "library" */ '@/views/Library.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/history/list',
    name: 'view-favorites-history',
    component: () => import(/* webpackChunkName: "history" */ '@/views/Library.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/favorites',
    redirect: '/favorites/edit/default',
  },
  {
    path: '/:lang?/favorites',
    redirect: '/:lang?/favorites/edit/default',
  },
];

module.exports = library;
