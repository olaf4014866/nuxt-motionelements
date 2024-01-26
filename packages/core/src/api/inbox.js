import api from '@motionelements/core/src/api/base-api-v2';
// import base from './base';
// refactor to base-api-v2

/**
 * MEMBER /account
 */

// list Notifiactions
export const listMemberNotifications = async () => api.request('get', '/v2/notifications', {
  params: {
    ...api.getLocaleParams(),
    // ...params,
  },
});

export const getMemberNotification = async (id) => {
  const request = api.request('get', `/v2/notifications/${id}`, {
    params: {
      ...api.getLocaleParams(),
    },
  });
  return request;
};

export const markMemberNotificationAsViewed = async (id) => {
  const request = await api.request('post', `/v2/notifications/${id}/mark_viewed`);
  return request;
};

/**
 * ARTIST /artist
 */

// list Notifiactions
export const listArtistNotifications = async () => {
  const request = await api.request('get', '/v2/artist/notifications', {
    params: {
      ...api.getLocaleParams(),
      // ...params,
    },
  });
  return request;
};

export const getArtistNotification = async (id) => {
  const request = api.request('get', `/v2/artist/notifications/${id}`, {
    params: {
      ...api.getLocaleParams(),
    },
  });
  return request;
};

export const markArtistNotificationAsViewed = async (id) => {
  const request = await api.request('post', `/v2/artist/notifications/${id}/mark_viewed`);
  return request;
};
