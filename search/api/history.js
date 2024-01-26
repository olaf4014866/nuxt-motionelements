import api from '@motionelements/core/src/api/base-api-v2';

// eslint-disable-next-line import/prefer-default-export
export const listHistoryItems = (type, params) => {
  type = type || 'product-viewed';
  return api.get(`/v2/history/${type}/items`, {
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};
