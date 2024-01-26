import axios from 'axios';
import cookies from 'js-cookie';
import store from '@/store/index';

const ver = 'v2';
const verHeader = '2020-02-13';

const token = cookies.get('ME_jwt');
const isEnableCredential = (process.env.NODE_ENV === 'development') ? false : true;

// export const publicRequest = axios.create({
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

export const getUploadSetting = () => {
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

  return request.get(`/${ver}/upload/url`);
};

export const doUploadMediaToS3 = (payload) => {
  const request = axios.create({
    baseURL: process.env.VUE_APP_AWS_S3_URL,
    onUploadProgress(progressEvent) {
      // trigger upload progress block when doing upload
      const info = {
        status: true,
        progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
      };
      // console.log(info)
      store.dispatch('site/setLoadingProgress', info);
    },
  });

  return request.post('/', payload);
};

export const getUploadAnalyze = (info) => {
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

  const searchMode = info.mediaType;

  return request.post(`/${ver}/upload/analyze-${searchMode}`, info);
};

export const getSearchTypeaheadResult = (info) => {
  const headers = {
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  // console.log('send request - getSearchTypeaheadResult');
  return request.get(`/${ver}/suggest`, { params: info });
};

export const getSearchResult = (info) => {
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

  const currentMediaType = store.getters['site/currentMediaType'];
  const mediaType = currentMediaType.api;

  const params = info;

  return request.get(`/${ver}/search/${mediaType}`, { params: params });
};

export const getElementInfo = (info) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'ME-Version': `${verHeader}`,
    'Cache-Control': 'no-cache',
  };

  const elememtId = info.id;

  const params = {
    language: info.language,
  };

  const request = axios.create({
    withCredentials: isEnableCredential,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/elements/${elememtId}`, { params: params });
};

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

export const getMediaTypesInfo = () => {
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
  return request.get(`/${ver}/app/media-types`, { params: params });
};

export const getSearchTerms = () => {
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

  const currentMediaType = store.getters['site/currentMediaType'];
  const mediaType = currentMediaType.api;

  const lang = document.documentElement.getAttribute('lang');
  const params = new URLSearchParams();
  params.append('language', lang);

  return request.get(`/${ver}/terms/${mediaType}`, { params: params });
};

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

  return request.get(`/${ver}/account?include=favorites`);
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

export const getFavoritesCount = async (params) => {
  const favoritesId = params.favoritesId;

  const response = await siteRequest
    .get(`/${ver}/favorites/${favoritesId}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

// export const getFavoritesCount = (params) => {
//   const token = store.getters['cookie/getApiToken'];
//   const headers = {
//     'Authorization': `Bearer ${token}`,
//     'Cache-Control': 'no-cache',
//   };

//   const request = axios.create({
//     baseURL: process.env.VUE_APP_API_URL,
//     headers: headers,
//   });

//   return request.get(`/${ver}/favorites/${params.favoritesId}`);
// };

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

export const getProductDetails = async (sku) => {
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

  return request.get(`/${ver}/elements/${sku}?fields[elemenets]=details&language=${lang}`)
    .then(res => res.data.data)
    .catch((err) => {
      console.error(err);
    });
};

export const getArtist = async (username) => {
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

  return request.get(`/${ver}/artists/${username}`)
    .then(res => res.data.data)
    .catch((err) => {
      console.error(err);
    });
};
