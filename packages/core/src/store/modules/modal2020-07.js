

const state = {
  // id: null,
  show: false,
  component: null,
  props: {},
  events: {},
  // isReady: false,
  // track dynamic async child component mounted
  isMounted: false,
  // store model params
  // params: {},
};

const getters = {
  isShow: state => state.show,
  // isReady: state => state.isReady,
  isMounted: state => state.isMounted,
};

const actions = {

  showSignUp({ commit }) {
    const Modal = () => ({
      component: import('@motionelements/core/src/components/modals/SignUp.vue'),
    });
    commit('show', {
      component: Modal,
      props: {
      },
    });
  },

  show({ commit }, payload) {
    commit('show', payload);
  },

  hide({ commit }, id) {
    commit('hide', id);
  },

  ready({ commit }, id) {
    commit('ready', id);
  },

  mounted({ commit }, id) {
    commit('mounted', id);
  },

};

const mutations = {

  show(state, payload) {
    // console.log('COMPONENT', payload.component);
    // state.id = payload.id;
    state.component = payload.component;
    state.props = payload.props;
    state.show = true;
    state.events = payload.events;
    state.isMounted = false;
  },

  hide(state) {
    // state.id = null;
    state.show = false;
    state.events = {};
    state.conponent = null;
    state.props = {};
    state.isMounted = false;
  },

  mounted(state, id) {
    console.log('mounted', id);
    state.isMounted = true;
    // state.isMounted = id === state.id;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
