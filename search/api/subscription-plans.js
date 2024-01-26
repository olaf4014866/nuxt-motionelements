import api from '@motionelements/core/src/api/base-api-v2';

export const listSubscriptionPlans = async () => api.get('/v2/subscription-plans', {
  params: api.getLocaleParams(),
});

export const getSubscriptionPlan = async sku => api.get(`/v2/subscription-plans/${sku}`, {
  params: api.getLocaleParams(),
});
