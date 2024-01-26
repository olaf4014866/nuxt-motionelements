/**
 * PAYMENT ROUTES
 */

const credits = [
  {
    path: '/:lang?/credits',
    name: 'credits',
    component: () => import('@/views/Credits.vue'),
    meta: { layout: 'default' },
  },
  // {
  //   path: '/:lang?/checkout-credit-card',
  //   name: 'checkout-credit-card',
  //   component: () => import('@/views/credits/CheckoutCreditCard.vue'),
  //   meta: { layout: 'default' },
  // },
  {
    path: '/:lang?/payment/credit-card',
    name: 'payment-credit-card',
    component: () => import('@/views/payment/CheckoutCreditCard.vue'),
    meta: { layout: 'default' },
  },
];

module.exports = credits;
