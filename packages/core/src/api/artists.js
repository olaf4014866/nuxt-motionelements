import api from '@motionelements/core/src/api/base-api-v2';

/**
 * get artists profile
 * @param {String} username
 */
// eslint-disable-next-line import/prefer-default-export
export const getArtist = async (username) => {
  const response = await api.get(`/v2/artists/${username}`, {
    params: api.getLocaleParams(),
  });
  return response;
};
