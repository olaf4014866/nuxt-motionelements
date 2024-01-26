import api from '@motionelements/core/src/api/base-api-v2.js';
import { snakeCaseKeys } from '@motionelements/core/src/helpers/string.js';


// eslint-disable-next-line import/prefer-default-export
export const listChannelCurations = async (mediaType, params) => {
  mediaType = mediaType.replace('_', '-');
  params = params ? snakeCaseKeys(params) : {};
  return api.get(`/v2/channels/${mediaType}/curations`, {
    withCredentials: false,
    params: {
      ...api.getLocaleParams(),
      ...params,
    },
  });
};
