const search = require('./search');
const credits = require('./credits');
const subscribe = require('./subscribe');
const product = require('./product');
const library = require('./library');
const checkout = require('./checkout');
const demo = require('./demo');

const routes = [
  ...search,
  ...credits,
  ...subscribe,
  ...product,
  ...library,
  ...checkout,
  ...demo,

  // ...langPrefix([
  //   ...search,
  //   ...product,
  // ]),
  // {
  //   path: '/notfound',
  //   // redirect: '/',
  //   name: 'notfound',
  //   component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue'),
  // },
];
// export default routes;
module.exports = routes;
