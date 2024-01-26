/**
 * SEARCH ROUTES
 */

const search = [
  {
    path: '/:lang?/search/:mediatype',
    name: 'view-search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
    meta: { layout: 'search' },
  },
  {
    path: '/',
    redirect: '/search/video',
    meta: { layout: 'search' },
  },
  {
    path: '*',
    redirect: '/search/video',
    meta: { layout: 'search' },
  },
];

module.exports = search;
