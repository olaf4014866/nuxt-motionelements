import api from '@motionelements/core/src/api/base-api-v2';

export const getElement = async (sku, params) => {
  params = params || {};
  return api.get(`/v2/elements/${sku}`, {
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};

export const listElementArchiveEntries = async (sku) => {
  const url = `/v2/elements/${sku}/archive-entries`;
  return api.get(url);
};

// get element compitable software version
export const listCompatibleSoftwares = async (id) => {
  const url = `/v2/elements/${id}/compatible`;
  return api.get(url);
};

// get element compitable software version
export const getEmbedCode = async (id) => {
  const url = `/v2/elements/${id}/embed-code`;
  return api.get(url);
};
