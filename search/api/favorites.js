import api from '@motionelements/core/src/api/base-api-v2';
// import { siteRequest } from '@/api/favorites-page.js';

export const addDefaultFavoriteItem = async (sku) => {
  const url = `/v2/favorites/default/items/${sku}`;

  const request = await api.request('post', url, {
    params: api.getLocaleParams(),
  })
    .then(res => res.data)
    .catch((err) => {
      console.error(err);
    });

  return request;
};


export const getFavoritesFolder = async (id) => {
  const url = `/v2/favorites/${id}`;

  const request = await api.get(url, {
    params: api.getLocaleParams(),
  })
    .then(res => res.data)
    .catch((err) => {
      console.error(err);
    });

  return request;
};


export const addFavoriteItem = (sku, folderId) => {
  folderId = folderId || 'default';
  const url = `/v2/favorites/${folderId}/items/${sku}`;
  return api.request('post', url, {
    params: api.getLocaleParams(),
  });
};

export const addFavoriteItems = (skus, folderId) => {
  folderId = folderId || 'default';
  const url = `/v2/favorites/${folderId}/items`;
  return api.request('post', url, {
    params: api.getLocaleParams(),
    data: {
      skus: skus,
    },
  });
};

export const listFolderItems = (folderId, params) => {
  folderId = folderId || 'default';
  return api.get(`/v2/favorites/${folderId}/items`, {
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};

// favorites page
export const listFolders = params => api.get('/v2/favorites', {
  params: {
    ...api.getLocaleParams(),
    ...params,
  },
});
