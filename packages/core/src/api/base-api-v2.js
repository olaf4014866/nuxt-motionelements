import axios from 'axios';
import cookies from 'js-cookie';
import { camelCaseKeys, snakeCaseKeys } from '@motionelements/core/src/helpers/string.js';
import notificationService from '@motionelements/core/src/services/notification.service.js';

/* const axios = require('axios')
const cookies = require('js-cookie')
const axios = require('axios')
const notificationService = require('@motionelements/core/src/services/notification.service.js') */

import store from '@/store/index.js';

const base = (function base() {
  // API VERSION
  // const ver = 'v2';
  // API VERSION DATE
  const verDate = '2020-02-12';

  // const token = cookies.get('ME_jwt');
  const isEnableCredential = process.env.NODE_ENV !== 'development';
  // const token = cookies.get('ME_jwt');
  // const token = store.getters['cookie/getApiToken'];

  // get currency from vuex
  // const userCurrency = store.getters['app/currency'];
  // const userLanguage = store.getters['app/language'];

  /** me api w cookie for header and withCredentials setting */
  // const meAPI = axios.create({
  //   baseURL: process.env.VUE_APP_API_URL,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     'Cache-Control': 'no-cache',
  //     'ME-Version': verDate,
  //   },
  //   withCredentials: isEnableCredential,
  // });

  /** me api w cookie for header and withCredentials setting */
  const pureAPI = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      'ME-Version': verDate,
    },
    withCredentials: false,
    // transform response data to camelCase
    transformResponse: [
      // data => (data ? camelCaseKeys(JSON.parse(data), { deep: true }) : {}),
      data => (data ? camelCaseKeys(JSON.parse(data)) : {}),
    ],
  });
  // intercept APIs response handle message
  pureAPI.interceptors.response.use(
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

  // const getLanguage = () => (userLanguage ? userLanguage : 'en');
  //
  // const getCurrency = () => (userCurrency ? userCurrency : 'USD');


  const getLocaleParams = () => {
    // const userCurrency = store.state.user.currencyCode || store.getters['user/getCurrencyCode'];
    // const userLanguage = store.getters['user/getLanguageCode'];

    const userCurrency = 'USD'
    const userLanguage = 'en'

    return {
      currency: userCurrency,
      language: userLanguage,
    };
  };

  // const addLocaleParams = (relativeUrl) => {
  //   console.log(relativeUrl);
  //   return relativeUrl;
  //   /*
  //   const baseUrl = 'https://dummy.motionelements.com';
  //   const url = new URL(relativeUrl, baseUrl);
  //   // return
  //   const searchParams = url.searchParams;
  //
  //   const userCurrency = 'USD';
  //   const userLanguage = 'en';
  //
  //   // get currency from vuex
  //   // dont cache it
  //   const userCurrency = store.getters['site/currentCurrency'];
  //   const userLanguage = store.getters['site/currentLanguage'];
  //
  //   searchParams.set('currency', userCurrency);
  //   searchParams.set('language', userLanguage);
  //   // sort for caching
  //   searchParams.sort();
  //   return `${url.pathname}?${searchParams.toString()}${url.hash}`;
  //    */
  // };


  //
  // const post = (url, data, config) => {
  //   if (_.get(config, 'withCredentials') === false) {
  //     // pureAPI don't send Bearer ME_jwt and cookie ME_jwt_sig
  //     return pureAPI.post(url, data);
  //   }
  //   return meAPI.post(url, data);
  // };
  //
  // const patch = (url, data, config) => {
  //   if (_.get(config, 'withCredentials') === false) {
  //     // pureAPI don't send Bearer ME_jwt and cookie ME_jwt_sig
  //     return pureAPI.patch(url, data);
  //   }
  //   return meAPI.patch(url, data);
  // };


  const request = (method, url, config) => {
    if (typeof config === 'undefined') {
      config = {};
    }

    let client;
    if (_.get(config, 'withCredentials') === false) {
      client = pureAPI;
    } else {
      // else create client with current token
      const token = cookies.get('ME_jwt');
      // console.log(`token:${token}`);
      // const token = store.getters['cookie/getApiToken'];
      // get new
      client = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'ME-Version': verDate,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: isEnableCredential,
        // transform response data to camelCase
        transformResponse: [
          // data => (data ? camelCaseKeys(JSON.parse(data), { deep: true }) : {}),
          data => (data ? camelCaseKeys(JSON.parse(data)) : {}),
          // data => camelcaseKeys(JSON.parse(data), { deep: true }),
        ],
        // transformRequest: [(data, headers) => {
        //   if (data && headers['Content-Type'].includes('application/json')) {
        //     return JSON.stringify(snakeCaseKeys(data));
        //   }
        // }],
      });

      client.interceptors.response.use(
        (response) => {
          notificationService.handleResponseNotification(response);
          return response;
        },
        (error) => {
          // pass error response to handler

          // if (error.response.status === 401) {
          //   // test
          //   notificationService.handleResponseNotification({
          //     data: {
          //       messages: [
          //         {
          //           type: 'alert',
          //           level: 'info',
          //           title: 'Login again',
          //           details: 'Please login again.',
          //         },
          //       ],
          //     },
          //   });
          // } else {
          notificationService.handleResponseNotification(error.response);
          // }
          return Promise.reject(error);
        },
      );
    }

    // get new
    /*
    const client = _.get(config, 'withCredentials') === false
      ? pureAPI
      // else create client with current token
      : axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'ME-Version': verDate,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: isEnableCredential,
      });
     */

    config.method = method;
    config.url = url;

    // lowercase for axois, so no need to convert
    switch (method) {
      case 'get':
      case 'delete':
        return client.request(config);
      case 'patch':
      case 'post':
      case 'put':
        // transform request data from camelCase to snake_case
        // headers is case-sensitive (axios bug?)
        config.transformRequest = [(data, headers) => {
          if (data && headers['Content-Type'].includes('application/json')) {
            return JSON.stringify(snakeCaseKeys(data));
          }
        }];
        return client.request(config);
      default:
        return false;
    }
  };

  const get = (url, config) => request('get', url, config);

  return {
    get,
    request,
    getLocaleParams,
  };
}());

export default base;
