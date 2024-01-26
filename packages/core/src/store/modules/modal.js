

const state = {
  id: null,
  show: false,
  component: null,
  props: {},
  events: {},
  // store model params
  // params: {},

  // track dynamic async child component mounted
  isMounted: false,
};

const getters = {
  isShow: state => state.show,
  // isReady: state => state.isReady,
  isMounted: state => state.isMounted,
};

const actions = {

  showSignUp({ commit, state, dispatch }) {
    const Modal = () => ({
      component: import('@motionelements/core/src/components/modals/SignUp.vue'),
    });
    if (state.show) {
      dispatch('hide');
    }
    commit('show', {
      component: Modal,
      props: {
      },
    });
  },

  show({ commit, state, dispatch }, payload) {
    if (state.show) {
      dispatch('hide');
    }
    commit('show', payload);
  },

  hide({ commit }, id) {
    commit('hide', id);
    // need to force hide the root-modal
    $('#root-modal').modal('hide');
  },

  mounted({ commit }, id) {
    commit('mounted', id);
  },
};

const mutations = {

  show(state, payload) {
    state.component = payload.component;
    state.props = payload.props;
    state.show = true;
    state.events = payload.events;
    state.isMounted = false;
  },

  hide(state, id) {
    state.id = id;
    state.show = false;
    state.events = {};
    state.component = null;
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
