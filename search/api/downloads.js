import api from '@motionelements/core/src/api/base-api-v2';

export const createDownload = async (payload) => {
  const url = '/v2/downloads';
  return api.request('post', url, {
    data: payload,
    params: api.getLocaleParams(),
  });
};

export const getDownload = async (id, params) => {
  const url = `/v2/downloads/${id}`;
  return api.get(url, {
    params: params,
  });
};
