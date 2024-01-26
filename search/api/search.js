import api from '@motionelements/core/src/api/base-api-v2';
import { snakeCaseKeys } from '@motionelements/core/src/helpers/string.js';


export const searchElements = async (mediaType, params, axiosConfig) => {
  params = params || {};
  mediaType = mediaType.replace('_', '-');
  return api.get(`/v2/search/${mediaType}`, {
    ...(axiosConfig || {}),
    params: {
      ...api.getLocaleParams(),
      ...snakeCaseKeys(params),
      type: 'element',
    },
  });
};

export const searchCollections = async (mediaType, params, axiosConfig) => {
  params = params || {};
  mediaType = mediaType.replace('_', '-');
  return api.get(`/v2/search/${mediaType}`, {
    ...(axiosConfig || {}),
    params: {
      ...api.getLocaleParams(),
      ...snakeCaseKeys(params),
      type: 'collection',
    },
  });
};

export const listSuggestions = async (mediaType, params, axiosConfig) => {
  params = params || {};
  mediaType = mediaType.replace('_', '-');
  return api.get(`/v2/search/${mediaType}/suggestions`, {
    ...(axiosConfig || {}),
    params: {
      ...api.getLocaleParams(),
      ...snakeCaseKeys(params),
    },
  });
};

export const listAutoCompleteKeywords = async (mediaType, params) => {
  const locale = api.getLocaleParams();

  const query = {
    language: _.get(locale, 'language', 'en'),
    mt: mediaType.replace('_', '-'),
    q: params.q,
  };

  return api.get('/v2/suggest', {
    withCredentials: false,
    params: query,
  });
};


export const analyzeVisualFeature = async params => api.request('post', '/v2/search/video/analyze-visual', {
  params: api.getLocaleParams(),
  data: params,
});

export const analyzeAuralFeature = async params => api.request('post', '/v2/search/music/analyze-aural', {
  params: api.getLocaleParams(),
  data: params,
});

export const getAnalyzeVisualFeatureResult = async params => api.get('/v2/search/video/analyze-visual', {
  params: {
    ...params,
    ...api.getLocaleParams(),
  },
});

export const getAnalyzeAuralFeatureResult = async params => api.get('/v2/search/music/analyze-aural', {
  params: {
    ...params,
    ...api.getLocaleParams(),
  },
});
