/* eslint-disable import/prefer-default-export */
import * as jobApi from '@motionelements/core/src/api/jobs.js';

export async function getJobStatus(payload) {
  return jobApi.getJobStatus(payload);
}
