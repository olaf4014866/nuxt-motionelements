/**
 * CHECKOUT ROUTES
 */

const checkout = [
  {
    path: '/:lang?/checkout-summary',
    name: 'checkout',
    component: () => import('@/views/Checkout.vue'),
    meta: { layout: 'default' },
  },
];

module.exports = checkout;
