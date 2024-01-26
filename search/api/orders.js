import api from '@motionelements/core/src/api/base-api-v2';

export const getOrderPreview = async (params) => {
  const url = '/v2/orders/preview';
  return api.get(url, {
    withCredentials: false,
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};

export const createOrder = async (params) => {
  const url = '/v2/orders';
  return api.request('post', url, {
    data: params,
    params: api.getLocaleParams(),
  });
};

export const createCheckoutSession = async (params) => {
  const url = '/v2/orders/checkout-session';
  return api.request('post', url, {
    data: params,
    params: api.getLocaleParams(),
  });
};

/*
export const createStripeSetupIntent = async (params) => {
  const url = '/v2/orders/setup-intent';
  return api.request('post', url, {
    data: {
      paymentGateway: 'stripe',
      ...params,
    },
    params: api.getLocaleParams(),
  });
};
 */

export const createPaymentIntent = async (params) => {
  const url = '/v2/orders/payment-intent';
  return api.request('post', url, {
    data: {
      paymentGateway: 'stripe',
      ...params,
    },
    params: api.getLocaleParams(),
  });
};

export const completeOrder = async (id, params) => {
  const url = `/v2/orders/${id}/complete`;
  return api.request('patch', url, {
    data: params,
    params: api.getLocaleParams(),
  });
};

export const trackOrder = async (id) => {
  const url = `/v2/orders/${id}/track`;
  return api.request('patch', url, {
    params: api.getLocaleParams(),
  });
};


/*
async function withPolling(callback, interval) {
  const data = await callback();

  // If no polling interval is given we
  // return a regular object with the data.
  if (!interval) return { data };

  // Otherwise, we create a new `Vue.observable()`
  // instance and refetch the data according to
  // the specified polling interval.
  const observableData = Vue.observable({ data });
  const poll = () => setTimeout(async () => {
    observableData.data = { ...(await callback()) };
    poll();
  }, interval);

  const timerID = poll();

  console.log('timer', timerID);

  return observableData;
}

export const pollOrderCompleted = async (id, params) => {
  const url = `/v2/orders/${id}/completed`;
  const interval = 2000;
  const response = withPolling(() => api.request('patch', url, {
    data: params,
    params: api.getLocaleParams(),
  }), interval);
  console.log(response);
  return response;
};
 */

export const checkoutOrderWithStripePaymentMethod = async (id, params) => {
  const url = `/v2/orders/${id}/checkout`;
  return api.request('patch', url, {
    data: params,
    params: api.getLocaleParams(),
  });
};


export const createOrderAndCheckout = async (params) => {
  const url = '/v2/orders/checkout';
  return api.request('post', url, {
    data: params,
    params: api.getLocaleParams(),
  });
};


export const getOrder = async (id, params) => api.get(`/v2/orders/${id}`, {
  params: {
    ...api.getLocaleParams(),
    ...params,
  },
});
