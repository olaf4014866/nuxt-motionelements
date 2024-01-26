/**
 * PAYMENT ROUTES
 */

const subscribe = [
  {
    path: '/:lang?/subscribe',
    name: 'subscribe',
    component: () => import('@/views/Subscribe.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/subscribe/payment',
    name: 'subscribe-payment',
    component: () => import('@/views/subscribe/Payment.vue'),
    meta: { layout: 'default' },
  },
  {
    path: '/:lang?/subscribe/success',
    name: 'subscribe-success',
    component: () => import('@/views/subscribe/SubscribeSuccess.vue'),
    meta: { layout: 'default' },
  },
];

module.exports = subscribe;
