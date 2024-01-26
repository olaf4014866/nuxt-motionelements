import api from '@motionelements/core/src/api/base-api-v2';

export const listCreditPacks = async (params) => {
  // const params = new URLSearchParams();
  // params.set('currency', base.defaultCurrency());
  // params.set('language', base.defaultLang());
  // sort for caching
  // params.sort();
  // const url = `/${base.ver}/credit-packs`;
  // append params to url
  params = params || {};
  return api.get('/v2/credit-packs', {
    withCredentials: false,
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};

export const getCustomCreditPack = async (params) => {
  // sanitize params
  params = params || {};
  return api.get('/v2/credit-packs/custom', {
    withCredentials: false,
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};
