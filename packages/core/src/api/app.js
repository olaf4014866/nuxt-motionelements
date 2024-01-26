import api from '@motionelements/core/src/api/base-api-v2.js';


// @todo move API to /v2/app
export const listTerms = async () => api.get('/v2/terms', {
  params: api.getLocaleParams(),
});

export const listCurrencies = async () => api.get('/v2/app/currencies', {
  params: api.getLocaleParams(),
});

export const listMediaTypes = async () => {
  const data = await api.get('/v2/app/media-types')
    .then(res => res.data.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  return data;
};

export const listPros = async () => api.get('/v2/app/performance-rights-organisations', {
  params: api.getLocaleParams(),
});


export const listProductSchema = async (params) => {
  // sanitize params
  params = params || {};
  return api.get('/v2/app/product-schema', {
    withCredentials: false,
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};


export const listMediatypesSeoName = async () => api.request('get', '/v2/app/media-types', {
  params: api.getLocaleParams(),
});
