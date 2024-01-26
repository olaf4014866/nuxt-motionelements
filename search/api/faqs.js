import api from '@motionelements/core/src/api/base-api-v2';

export const listCreditFaqs = async () => api.get('/v2/faqs?type=credits', {
  withCredentials: false,
  params: api.getLocaleParams(),
});

export const listSubscriptionFaqs = async () => api.get('/v2/faqs?type=subscription', {
  withCredentials: false,
  params: api.getLocaleParams(),
});
