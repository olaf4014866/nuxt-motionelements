import { listCreditPacks } from '@/services/order.service.js';
import { listCreditFaqs } from '@/api/faqs.js';

const state = {
  creditPacks: null,
  faqs: null,
};

const getters = {
};

const actions = {

  async getCreditPacks({ commit }) {
    listCreditPacks().then((response) => {
      console.log('listCreditPacks', response);
      commit('setCreditPacks', response.data.data);
    });
  },

  async getFaqs({ commit }) {
    listCreditFaqs().then((response) => {
      commit('setFaqs', response.data.data);
    });
  },

};

const mutations = {

  setCreditPacks(state, data) {
    state.creditPacks = data;
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
