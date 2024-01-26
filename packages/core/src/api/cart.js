import api from '@motionelements/core/src/api/base-api-v2';

export const listItems = async () => api.get('/v2/cart/items', {
  params: api.getLocaleParams(),
});

export const addItems = (payload) => {
  const url = '/v2/cart/items';
  return api.request('post', url, {
    data: payload,
    params: api.getLocaleParams(),
  });
};

export const removeItems = (payload) => {
  const url = '/v2/cart/items';
  return api.request('delete', url, {
    data: payload,
    params: api.getLocaleParams(),
  });
};

export const updateItem = (sku, payload) => {
  const url = `/v2/cart/items/${sku}`;
  return api.request('patch', url, {
    data: payload,
    params: api.getLocaleParams(),
  });
};
