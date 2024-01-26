import * as cartApi from '@motionelements/core/src/api/cart';
import Money from '@motionelements/money';
// import store from '@/store/index.js';

const state = {
  count: false,
  items: [],
};

const getters = {
  getItems: state => state.items,
  getCount: state => state.count,
  // cartItemsInfo: () => state.cart.items,
  // cartItemsCount: state => state.cart.count,
  // cartItemsInfo: () => state.cart.items,
};

const actions = {

  // setCart({ commit }, result) {
  //   commit('setCart', result);
  // },

  setItems({ commit }, result) {
    commit('setItems', result);
  },

  listItems({ commit }) {
    return cartApi.listItems().then((response) => {
      const cartItems = response.data.data;

      Object.keys(cartItems).map((key) => {
        const item = cartItems[key];
        const price = Money({ amount: item.price, currency: item.currency });
        // cartItems[key].priceString = `${symbol} ${price}`;
        cartItems[key].priceString = price.toFormat('$0,0');
      });

      commit('setItems', cartItems);

      // response.data.data = cartItems;

      // @deprecated
      // store.dispatch('site/setCart', response.data);
    });
  },

  removeItem({ commit }, sku) {
    const params = {
      skus: [sku],
    };
    return cartApi.removeItems(params).then((response) => {
      const cartItems = response.data.data;
      //
      // Object.keys(cartItems).map((key) => {
      //   const item = cartItems[key];
      //   const price = Money({ amount: item.price, currency: item.currency });
      //   // cartItems[key].priceString = `${symbol} ${price}`;
      //   cartItems[key].priceString = price.toFormat('$0,0');
      // });
      //
      commit('setItems', cartItems);
    });
  },

  updateProductVariant({ commit }, payload) {
    const currentSku = payload.currentSku;
    const params = {
      sku: payload.newSku,
    };
    return cartApi.updateItem(currentSku, params).then((response) => {
      const cartItems = response.data.data;
      //
      // Object.keys(cartItems).map((key) => {
      //   const item = cartItems[key];
      //   const price = Money({ amount: item.price, currency: item.currency });
      //   // cartItems[key].priceString = `${symbol} ${price}`;
      //   cartItems[key].priceString = price.toFormat('$0,0');
      // });
      //
      commit('setItems', cartItems);
    });
  },

};

const mutations = {

  // setCart(state, result) {
  //   state.count = _.size(result.data);
  //   state.items = result.data;
  // },

  setItems(state, items) {
    state.count = _.size(items);
    state.items = items;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
