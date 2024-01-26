import api from './base-api-v2';

export const getAccount = async () => api.get('/v2/account?include=favorites');

export const updateAccount = async (params) => {
  const request = api.request('patch', '/v2/account', {
    params: api.getLocaleParams(),
    data: params,
  });
  return request;
};

export const refreshJwt = async () => {
  const request = api.request('post', '/v2/account/refresh-jwt', {
    // data: params,
  });
  return request;
};

export const getFreeDownloadsRemaining = async () => api.get('/v2/account/free-download');

export const signUp = async (payload) => {
  const request = await api.request('post', '/v2/account', {
    withCredentials: false,
    data: payload,
  });
  return request;
};

export const logIn = async (payload) => {
  const request = await api.request('post', '/v2/account/login', {
    withCredentials: false,
    data: payload,
  });
  return request;
};

export const listMemberSubscriptions = async () => {
  const request = await api.request('get', '/v2/subscriptions', {
  });
  return request;
};

export const cancelMemberSubscriptions = async (id) => {
  const request = await api.request('delete', `/v2/subscriptions/${id}`);
  return request;
};

// PROFILE

export const getAccountProfileCompletion = async () => {
  const request = await api.request('get', '/v2/account/profile', {
  });
  return request;
};

export const getAccountProfileDetails = async () => {
  const request = await api.request('get', '/v2/account?fields[member]=billing_details,artist_details,address,phone,tools', {
  });
  return request;
};

export const getMemberNotifications = async () => {
  const request = await api.request('get', '/v2/notifications', {
  });
  return request;
};

export const getPayoneerPayee = async () => {
  const request = await api.request('get', '/v2/account/payoneer', {
  });
  return request;
};

// export const getPayoneerJobStatus = async (id) => {
//   const request = await api.request('get', `/v2/jobs/${id}`, {
//   });
//   return request;
// };

export const createPayoneerPayee = async (payload) => {
  const request = await api.request('post', '/v2/account/payoneer', {
    data: payload,
  });
  return request;
};

export const listSubscriptionPlans = async () => {
  const request = await api.request('get', '/v2/subscription-plans', {
    params: {
      ...api.getLocaleParams(),
    },
  });
  return request;
};

export const getSubscriptionPlan = async (payload) => {
  const request = await api.request('get', '/v2/subscription-plans', {
    params: {
      ...api.getLocaleParams(),
    },
    data: payload,
  });
  return request;
};

// export const updateProfileImage = async ({ type, blob }) => {
//   const url = '/v2/artist/pages/image';
//   return api.request('put', url, {
//     data: {
//       type: type,
//       blob: blob,
//     },
//   });
// };

export const updateAvatar = async ({ blob }) => {
  const request = await api.request('put', '/v2/account/avatar', {
    data: {
      blob: blob,
    },
  });
  return request;
};
