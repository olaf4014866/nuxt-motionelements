import api from '@motionelements/core/src/api/base-api-v2';

export const listChannelTitleDescription = async () => {
  const request = await api.request('get', '/v2/channels', {
    params: api.getLocaleParams(),
  });
  return request;
};

export const getChannelBanners = async () => {
  const request = api.request('get', '/v2/channel/banners', {
    params: api.getLocaleParams(),
  });
  return request;
};

export const getChannelPosts = async () => {
  const request = api.request('get', '/v2/channel/posts', {
    params: api.getLocaleParams(),
  });
  return request;
};
