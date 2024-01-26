import api from '@motionelements/core/src/api/base-api-v2';

export const getAccount = async () => api.get('/v2/account?include=favorites');

export const updateAccount = async (params) => {
  const request = api.request('patch', '/v2/account', {
    data: params,
  });
  return request;
};

export const getFreeDownloadsRemaining = async () => api.get('/v2/account/free-download');
