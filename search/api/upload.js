import axios from 'axios';
import api from '@motionelements/core/src/api/base-api-v2';
// import store from '../store';

export const createS3PresignedUploadUrl = async () => {
  const data = await api.request('post', '/v2/upload/url')
    .then(res => res.data.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  return data;
};

/**
 *
 * @param {String} url aws bucket url
 * @param {Object} payload upload data like FormData
 */
export const uploadMediaToS3 = async (url, payload, prograss) => {
  const request = axios.create({
    baseURL: url,
    onUploadProgress(event) {
      prograss(event);
    },
    // onUploadProgress(progressEvent) {
    //   // trigger upload progress block when doing upload
    //   const info = {
    //     status: true,
    //     progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
    //   };
    //   // console.log(info)
    //   store.dispatch('site/setLoadingProgress', info);
    // },
  });
  return request.post('/', payload);
};
