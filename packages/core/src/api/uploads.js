import api from '@motionelements/core/src/api/base-api-v2';

// eslint-disable-next-line import/prefer-default-export
export const createS3UploadSettings = async params => api.request('post', '/v2/uploads/url', {
  data: params,
});
