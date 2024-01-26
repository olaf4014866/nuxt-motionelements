import axios from 'axios';
import cookies from 'js-cookie';
import store from '@/store/index';

const ver = 'v2';
const token = cookies.get('ME_jwt');

export const publicRequest = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { 'Cache-Control': 'no-cache' },
});

export const siteRequest = axios.create({
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  },
});

export const getUploadSetting = () => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
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
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  const searchMode = info.mediaType;

  return request.post(`/${ver}/upload/analyze-${searchMode}`, info);
};

export const getSearchTypeaheadResult = (info) => {
  const headers = {
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
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
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
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
    'Cache-Control': 'no-cache',
  };

  const elememtId = info.id;

  const params = {
    language: info.language,
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/elements/${elememtId}`, { params: params });
};

export const getSiteTerms = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  const lang = document.documentElement.getAttribute('lang');
  const params = new URLSearchParams();
  params.append('language', lang);

  // return request.get(`/${ver}/site/terms`, { params: params });
  return request.get(`/${ver}/terms`, { params: params });
};

export const getSearchTerms = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
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
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.get(`/${ver}/member`);
};

export const changeMemberSetting = (params) => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  return request.post(`/${ver}/member`, params);
};

export const getCartInfo = () => {
  const token = store.getters['cookie/getApiToken'];
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
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
    'Cache-Control': 'no-cache',
  };

  const request = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    headers: headers,
  });

  const elementId = info.id;

  return request.post(`/${ver}/favorites/default/items/${elementId}`);
};
