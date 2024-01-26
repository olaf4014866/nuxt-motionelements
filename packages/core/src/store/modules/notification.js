const state = {
  notifications: {
    flash: {
      status: false,
      contents: [],
    },
    alert: {
      status: false,
      contents: [],
    },
    // announcement: {
    //   status: false,
    //   contents: [],
    // },
  },
};

const getters = {
  notifications: state => state.notifications,
  alert: state => state.notifications.alert,
  flash: state => state.notifications.flash,
  flashMessages: state => state.notifications.flash.contents,
  alertMessages: state => state.notifications.alert.contents,
};

const actions = {

  addFlashMessage({ commit }, message) {
    const flash = state.notifications.flash;
    // flash.status = true;
    // flash.contents.push(params);
    // deduplicate flash

    if (flash.contents.find(x => x.title === _.get(message, 'title') && _.get(x, 'detail') === _.get(message, 'detail'))) {
      // existing, skip
      return false;
    }

    // random uniqid id
    message.id = (new Date()).getTime() + _.get(message, 'title', '') + _.get(message, 'detail', '');

    flash.status = true;
    flash.contents.push(message);
    commit('setFlashMessage', flash);
  },

  clearFlashMessages({ commit }) {
    commit('setFlashMessage', {
      status: false,
      contents: [],
    });
  },

  clearAlertMessages({ commit }) {
    commit('setAlertMessage', {
      status: false,
      contents: [],
    });
  },
};

const mutations = {
  setFlashMessage: (state, info) => {
    state.notifications.flash = info;
  },

  setAlertMessage: (state, info) => {
    state.notifications.alert = info;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
