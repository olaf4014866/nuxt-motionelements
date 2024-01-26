import * as uploadsApi from '@motionelements/core/src/api/uploads.js';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
const getS3UploadSettings = async type => uploadsApi.createS3UploadSettings({
  type: type,
});

// eslint-disable-next-line import/prefer-default-export
export async function uploadToS3Temp(uploadType, file, filename, axoisConfig) {
  // this.$store.dispatch('site/getUploadSetting').then((result) => {
  return getS3UploadSettings(uploadType).then((response) => {
    const result = response.data.data;

    const formData = new FormData();

    // const fileName = file.name;
    // const fileExtensions = fileName.split('.').pop().toLowerCase();
    // const randomName = 'xxx';
    // const uploadFilename = `${randomName}.${fileExtensions}`;

    const niceFilename = filename || file.name;

    console.log('FILES SETT', result);

    formData.append('policy', result.policy);
    formData.append('signature', result.signature);
    formData.append('AWSAccessKeyId', result.accessKey);
    // formData.append('key', `search/test/${uploadFilename}`);
    formData.append('key', `${result.path}/${niceFilename}`);
    formData.append('Content-Type', 'binary/octet-stream');
    formData.append('x-amz-storage-class', 'STANDARD');
    // formData.append('acl', 'public-read');
    formData.append('acl', ['search'].includes(uploadType) ? 'public-read' : 'private');
    formData.append('file', file);

    // set progress bar ON
    // this.$store.dispatch('site/setLoadingProgress', {
    //   status: true,
    //   message: this.$t('search.progressing'),
    //   progress: 0,
    // });

    const client = axios.create({
      // baseURL: settings.url,
      // headers: {
      // 'Content-Type': 'application/json',
      // },
      withCredentials: false,
    });

    return client.post(result.url, formData, axoisConfig || {}).then((response) => {
      if (response.status === 204) {
        return {
          url: `${result.url}/${result.path}/${niceFilename}`,
        };
      }
      return null;
    });
    //
    // this.$store
    //     .dispatch('site/doUploadMediaToS3', formData)
    //     .then(() => {
    //         // console.log(result)
    //
    //     })
  });
}

// const request = await base.meAPI.post(`/${base.ver}/upload/analyze-${searchMode}`, info);
// const request = await base.pure({
//     method: 'post',
//     baseURL: process.env.VUE_APP_AWS_S3_URL,
//     data: payload,
//     onUploadProgress(progressEvent) {
//         // trigger upload progress block when doing upload
//         const info = {
//             status: true,
//             progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
//         };
//         // console.log(info)
//         store.dispatch('site/setLoadingProgress', info);
//     },
// });
