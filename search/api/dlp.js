import api from '@motionelements/core/src/api/base-api-v2.js';
import { snakeCaseKeys } from '@motionelements/core/src/helpers/string.js';

// eslint-disable-next-line import/prefer-default-export
export const getDynamicPage = async (id, params) => {
  params = params || {};
  return api.get(`/v2/dlp/${id}`, {
    params: {
      ...api.getLocaleParams(),
      ...snakeCaseKeys(params),
    },
  });
};
