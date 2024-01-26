import api from '@motionelements/core/src/api/base-api-v2';


// eslint-disable-next-line import/prefer-default-export
export const listMediaTypeTerms = async mediaType => api.get(`/v2/terms/${mediaType.replace('_', '-')}`, {
  params: api.getLocaleParams(),
});
