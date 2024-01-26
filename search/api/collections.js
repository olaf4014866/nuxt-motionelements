import api from '@motionelements/core/src/api/base-api-v2';
import { snakeCaseKeys } from '@motionelements/core/src/helpers/string.js';

export const getCollection = async (sku, params) => {
  params = params || {};
  return api.get(`/v2/collections/${sku}`, {
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};

export const listCollectionItems = async (sku, params) => {
  params = params || {};
  return api.get(`/v2/collections/${sku}/items`, {
    params: {
      ...api.getLocaleParams(),
      ...snakeCaseKeys(params),
    },
  });
};
