import Vue from 'vue';
import Vuex from 'vuex';

import route from './modules/route';
import cookie from './modules/cookie';
import site from './modules/site';
import audioPlayer from './modules/audioPlayer';
import member from './modules/member';

import search from './modules/search/search';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    route,
    cookie,
    site,
    audioPlayer,
    member,
    search,
  },
});
