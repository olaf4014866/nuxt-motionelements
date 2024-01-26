// import Vue from 'vue';
// import Vuex from 'vuex';

// import user from './modules/user';
// import route from './modules/route';

import user from '@motionelements/core/src/store/modules/user';
import route from '@motionelements/core/src/store/modules/route';
import cart from '@motionelements/core/src/store/modules/cart';
import notification from '@motionelements/core/src/store/modules/notification';
import modal from '@motionelements/core/src/store/modules/modal';
import cookie from '@motionelements/core/src/store/modules/cookie';
import blocker from '@motionelements/core/src/store/modules/blocker';
import site from './modules/site';

import audioPlayer from './modules/audioPlayer';
import member from './modules/member';
import product from './modules/product';
import payment from './modules/payment';

import search from './modules/search/search';
// import modal from './modules/modal';
import favorites from './modules/favorites';
// import favorites from './modules/favorites/favorites.js';
import library from './modules/library/index.js';
import credits from './modules/credits';
import subscription from './modules/subscription';
export default {
  modules: {
    blocker,
    cookie,
    site,
    route,
    cart,
    audioPlayer,
    member,
    modal,
    user,
    product,
    search,
    payment,
    favorites,
    library,
    credits,
    subscription,
    notification,
  },
}
// Vue.use(Vuex);
// export default new Vuex.Store({
//   modules: {
//     blocker,
//     cookie,
//     site,
//     route,
//     cart,
//     audioPlayer,
//     member,
//     modal,
//     user,
//     product,
//     search,
//     payment,
//     favorites,
//     library,
//     credits,
//     subscription,
//     notification,
//   },
// });
