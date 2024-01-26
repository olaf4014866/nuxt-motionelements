// import { getUnlimitedSubscriptionPlan } from '@/services/order.service.js';
import { listSubscriptionPlans } from '@/api/subscription-plans.js';
import { listSubscriptionFaqs } from '@/api/faqs.js';

const state = {
  plans: null,
  faqs: null,
};

const getters = {

  getPlanById: state => (id) => {
    if (state.plans === null) {
      return null;
    }

    if (!id) {
      return null;
    }

    id = id.replace('-', '_').toLowerCase();

    return state.plans.find(plan => plan.id === id);
  },

};

const actions = {

  async getPlans({ commit }) {
    return listSubscriptionPlans().then((response) => {
      commit('setPlans', response.data.data);
      return response;
    });
  },

  async getFaqs({ commit }) {
    listSubscriptionFaqs().then((response) => {
      commit('setFaqs', response.data.data);
    });
  },

};

const mutations = {

  setPlans(state, data) {
    state.plans = data;
  },

  setFaqs(state, data) {
    state.faqs = data;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
