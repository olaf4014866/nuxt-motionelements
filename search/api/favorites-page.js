import axios from 'axios';
import cookies from 'js-cookie';
import store from '@/store/index';

const ver = 'v2';
const verHeader = '2020-02-13';

const token = cookies.get('ME_jwt');
const isEnableCredential = (process.env.NODE_ENV === 'development') ? false : true;

// export const publicRequest = axios.create({
//   withCredentials: isEnableCredential,
//   baseURL: process.env.VUE_APP_API_URL,
//   headers: { 'Cache-Control': 'no-cache' },
// });

export const siteRequest = axios.create({
  withCredentials: isEnableCredential,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  },
});

// export const getUploadSetting = () => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'ME-Version': `${verHeader}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   return request.get(`/${ver}/upload/url`);
// };

// export const doUploadMediaToS3 = (payload) => {
//   const request = axios.create({
//     baseURL: process.env.VUE_APP_AWS_S3_URL,
//     onUploadProgress(progressEvent) {
//       // trigger upload progress block when doing upload
//       const info = {
//         status: true,
//         progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
//       };
//       // console.log(info)
//       store.dispatch('site/setLoadingProgress', info);
//     },
//   });

//   return request.post('/', payload);
// };

// export const getUploadAnalyze = (info) => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'ME-Version': `${verHeader}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   const searchMode = info.mediaType;

//   return request.post(`/${ver}/upload/analyze-${searchMode}`, info);
// };

// export const getSearchTypeaheadResult = (info) => {
//   const headers = {
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   // console.log('send request - getSearchTypeaheadResult');
//   return request.get(`/${ver}/suggest`, { params: info });
// };

// export const getSearchResult = (info) => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   const currentMediaType = store.getters['site/currentMediaType'];
//   const mediaType = currentMediaType.api;

//   const params = info;

//   return request.get(`/${ver}/search/${mediaType}`, { params: params });
// };

// export const getElementInfo = (info) => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Cache-Control': 'no-cache',
//   };

//   const elememtId = info.id;

//   const params = {
//     language: info.language,
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   return request.get(`/${ver}/elements/${elememtId}`, { params: params });
// };

export const getSiteTerms = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  const lang = document.documentElement.getAttribute('lang');
  const params = new URLSearchParams();
  params.append('language', lang);

  // return request.get(`/${ver}/site/terms`, { params: params });
  return request.get(`/${ver}/terms`, { params: params });
};

// export const getSearchTerms = () => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     withCredentials: isEnableCredential,
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   const currentMediaType = store.getters['site/currentMediaType'];
//   const mediaType = currentMediaType.api;

//   const lang = document.documentElement.getAttribute('lang');
//   const params = new URLSearchParams();
//   params.append('language', lang);

//   return request.get(`/${ver}/terms/${mediaType}`, { params: params });
// };

export const getMemberInfo = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/account`);
};

export const changeMemberSetting = (params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.patch(`/${ver}/account`, params);
};

export const getCartInfo = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/cart`);
};

export const getFavoritesCount = (params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/favorites/${params.favoritesId}`);
};

// favorites page
export const getFavoritesSidebarList = (info) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const params = {
    language: info.language,
    // timestamp: new Date().getTime(),
  };

  console.log('getFavoritesSidebarList', params);

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/favorites`, { params: params });
};

export const getFavoritesHistoryProductList = (params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/history/product-viewed/items`, { params: params });
};

export const getFavoritesContentList = (folderId, params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/favorites/${folderId}/items`, { params: params });
};


export const createFavoritesFolder = (params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.post(`/${ver}/favorites`, params);
};

export const deleteFavoritesFolder = async (folderId) => {
  const response = await siteRequest
    .delete(`/${ver}/favorites/${folderId}`)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const renameFavoritesFolder = async (folderId, params) => {
  const response = await siteRequest
    .put(`/${ver}/favorites/${folderId}`, params)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const addFavorites = (info) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  const elementId = info.id;

  return request.post(`/${ver}/favorites/default/items/${elementId}`);
};

// export const deleteFavorites = (info) => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   const folderId = info.id;
//   const params = {
//     sku: info.sku,
//   };

//   return request.delete(`/${ver}/favorites/${folderId}/items`, params);
// };

export const copyFavorites = async (toFolderId, params) => {
  const response = await siteRequest
    .post(`/${ver}/favorites/${toFolderId}/items`, params)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const moveFavorites = async (fromFolderId, params) => {
  const response = await siteRequest
    .put(`/${ver}/favorites/${fromFolderId}/items`, params)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const deleteFavorites = async (fromFolderId, params) => {
  // console.log(fromFolderId);
  // console.log(params);

  const response = await siteRequest
    .delete(`/${ver}/favorites/${fromFolderId}/items`, { data: params })
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const shareFavorites = async (folderId, params) => {
  // console.log(folderId);
  // console.log(params);

  const response = await siteRequest
    .post(`/${ver}/favorites/${folderId}/share`, params)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const addElementsToCart = async (params) => {
  const response = await siteRequest
    .post(`/${ver}/cart`, params)
    .then(res => res)
    .catch((err) => {
      console.error(err);
    });
  return response;
};
