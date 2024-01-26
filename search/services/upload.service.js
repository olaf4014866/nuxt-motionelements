import * as uploadApi from '@/api/upload.js';

// eslint-disable-next-line import/prefer-default-export
export async function createS3PresignedUploadUrl() {
  return uploadApi.createS3PresignedUploadUrl();
}

export async function uploadMediaToS3(url, payload, onUploadProgress) {
  return uploadApi.uploadMediaToS3(url, payload, onUploadProgress);
}
