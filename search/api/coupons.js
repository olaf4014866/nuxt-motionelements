import api from '@motionelements/core/src/api/base-api-v2';

export const getCoupon = async id => api.get(`/v2/coupons/${id}`);

export const redeemCoupon = async id => api.get(`/v2/coupons/${id}`);
