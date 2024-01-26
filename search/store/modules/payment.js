import { getOrder } from '@/api/orders.js';

const state = {
  coupon: {
    code: null,
    discount: 0,
  },
  order: null,
  // blocker: {
  //   show: false,
  //   message: '',
  // },
};

const getters = {
  getCouponCode: state => state.coupon.code,
};

const actions = {
  setCoupon({ commit }, coupon) {
    commit('setCoupon', coupon);
  },

  async getOrder({ commit }, payload) {
    getOrder(payload.id).then((response) => {
      commit('setOrder', response.data.data);
    });
  },

  // showBlocker({ commit }, payload) {
  //   commit('showBlocker', payload);
  // },
  //
  // hideBlocker({ commit }) {
  //   commit('hideBlocker');
  // },
};

const mutations = {

  // setCouponCode: (state, couponCode) => {
  //   state.couponCode = couponCode;
  // },

  setCoupon: (state, coupon) => {
    console.log('setCoupon', coupon);
    state.coupon.code = coupon.code;
    state.coupon.discount = coupon.discount;
  },

  setOrder: (state, order) => {
    state.order = order;
  },

  // showBlocker: (state, payload) => {
  //   state.blocker = {
  //     show: true,
  //     message: _.get(payload, 'message', ''),
  //   };
  // },
  //
  // hideBlocker: (state) => {
  //   state.blocker = {
  //     show: false,
  //     message: '',
  //   };
  // },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
