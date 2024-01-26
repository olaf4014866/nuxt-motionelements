<template>
  <section>
    <div class="container py-5">
      <h3>Alert</h3>
      <button class="button" @click="pureApiTestGet('alert', 'info')">test alert info</button>
      <button class="button" @click="pureApiTestGet('alert', 'success')">test alert success</button>
      <button class="button" @click="pureApiTestGet('alert', 'warning')">test alert warning</button>
      <button class="button" @click="pureApiTestGet('alert', 'danger')">test alert danger</button>
      <button class="button" @click="pureApiTestPost('alert', 'info')">test alert post info</button>
      <button class="button" @click="pureApiTestPatch('alert', 'danger')">test alert patch danger</button>
      <h3>Flash</h3>
      <button class="button" @click="pureApiTestGet('flash', 'info')">test flash info</button>
      <button class="button" @click="pureApiTestGet('flash', 'success')">test flash success</button>
      <button class="button" @click="pureApiTestGet('flash', 'warning')">test flash warning</button>
      <button class="button" @click="pureApiTestGet('flash', 'danger')">test flash danger</button>
      <button class="button" @click="pureApiTestPost('flash', 'info')">test flash post info</button>
      <button class="button" @click="pureApiTestPatch('flash', 'danger')">test flash patch danger</button>
      <!-- <h3>get, post, put, patch</h3>
      <button class="button" @click="pureApiTestGet()">get</button>
      <button class="button" @click="pureApiTestPost()">post</button>
      <button class="button" @click="pureApiTestPut()">put</button>
      <button class="button" @click="pureApiTestPatch()">patch</button> -->
    </div>
  </section>
</template>

<script>

import axios from 'axios';
// import appConst from '@/tools/appConst';

// import { getSingleCookie } from '@/tools/index';
import notificationService from '@motionelements/core/src/services/notification.service.js';

// api testing code
// const memberApiTestUrl = '/v2/account?include=favorites';
// const memberApiTestUrl = '/v2/artists/myread02?language=zh_hant&currency=TWD';
// const memberApiTestUrl = '/v2/account/validate-username?username=stevwang';

// const testMeApi = axios.create({
//   baseURL: process.env.VUE_APP_API_URL,
//   headers: {
//     Authorization: `Bearer ${getSingleCookie(appConst.ME_TOKEN)}`,
//     'Cache-Control': 'no-cache',
//     'ME-Version': 'v2',
//   },
//   withCredentials: true,
//   method: 'get',
//   url: memberApiTestUrl,
// });
// testMeApi.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     notificationService.handleResponseNotification(error);
//     return Promise.reject(error);
//   },
// );

const testPureApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // baseURL: 'https://api-stage.motionelements.com',
  headers: {
    'Cache-Control': 'no-cache',
    'ME-Version': 'v2',
    'ME-INTERNAL-API-SECRET': process.env.VUE_APP_ME_ENV === 'stage' ? process.env.ME_INTERNAL_API_SECRET : null,
  },
  // withCredentials: true,
});
testPureApi.interceptors.response.use(
  (response) => {
    notificationService.handleResponseNotification(response);
    return response;
  },
  (error) => {
    // pass error response to handler
    notificationService.handleResponseNotification(error.response);
    return Promise.reject(error);
  },
);

export default {
  name: 'notifications-demo',
  methods: {
    pureApiTestGet(type = 'alert', level = 'info') {
      testPureApi.get(
        `/v2/test/${type}?level=${level}`,
      ).then((data) => {
        console.log('api test get', data);
      });
    },
    pureApiTestPost(type = 'alert', level = 'info') {
      testPureApi.post(
        `/v2/test/${type}?level=${level}`,
      ).then((data) => {
        console.log('api test post', data);
      });
    },
    pureApiTestPatch(type = 'alert', level = 'info') {
      testPureApi.patch(
        `/v2/test/${type}?level=${level}`,
      ).then((data) => {
        console.log('api test patch', data);
      });
    },
    pureApiTestPut(type = 'alert', level = 'info') {
      testPureApi.put(
        `/v2/test/${type}?level=${level}`,
      ).then((data) => {
        console.log('api test put', data);
      });
    },
    // meApiTest() {
    //   testMeApi().then((data) => {
    //     console.log(data);
    //   });
    // },
  },
};
</script>
