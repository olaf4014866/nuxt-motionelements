import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: routes,
  // scrolls to top on route to next page
  // https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
  // scrollBehavior(to, from, savedPosition) {
  scrollBehavior(to) {
    const position = { x: 0, y: 0 };
    console.log('scroll top');
    // eslint-disable-next-line
    if (to.hash) {
      // allow scroll to '#fragment'
      return new Promise((resolve) => {
      // return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
          });
        }, 1000);
      });
    }
    // return new Promise((resolve, reject) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(position);
      }, 0);
    });
  },
});
