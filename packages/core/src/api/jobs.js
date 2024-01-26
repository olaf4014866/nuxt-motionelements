/* eslint-disable import/prefer-default-export */
import api from './base-api-v2';

export const getJobStatus = async (id) => {
  const request = await api.request('get', `/v2/jobs/${id}`, {
  });
  return request;
};
