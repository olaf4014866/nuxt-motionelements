import * as creditPacksApi from '@/api/credit-packs.js';
import * as subscriptionPlansApi from '@/api/subscription-plans.js';
import * as ordersApi from '@/api/orders.js';
import * as couponsApi from '@/api/coupons.js';
// import store from '@/store/index.js';


// Government Uniform Invoice
export function isValidTwGovernmentUniformInvoiceId(value) {
  // confirm is a number
  if (/^\d{8}$/.test(value) === false) {
    return false;
  }

  // # 各數字分別乘以 1,2,1,2,1,2,4,1
  const validateOperator = [1, 2, 1, 2, 1, 2, 4, 1];
  let sum = 0;
  // # Step2 將所得值取出十位數及個位數
  // # 並將十位數與個位數全部結果值加總
  function calculate(idNumber) {
    const ones = idNumber % 10;
    const tens = (idNumber - ones) / 10;
    return ones + tens;
  }
  // add all to sum
  validateOperator.forEach((x, i) => {
    sum += calculate(value[i] * x);
  });
  // # Step3 判斷結果
  // # 第一種:加總值取10的餘數為0
  // # 第二種:加總值+1除以10的餘數為0且第6碼為7
  // console.log(sum % 10 === 0 || (this.formData.taxId[6] === '7' && (sum + 1) % 10 === 0));
  return sum % 10 === 0 || (value[6] === '7' && (sum + 1) % 10 === 0);
}

function addCouponCode(params) {
  const couponCode = store.getters['payment/getCouponCode'];
  if (couponCode) {
    params.coupon = couponCode;
  }
}

export async function getOrderPreview(params) {
  addCouponCode(params);
  return ordersApi.getOrderPreview(params);
}

export async function listCreditPacks() {
  const params = {};
  addCouponCode(params);
  return creditPacksApi.listCreditPacks(params);
}

export async function getCustomCreditPack(credits) {
  const params = {
    credits: parseInt(credits, 10),
  };
  addCouponCode(params);
  // return (await creditPacksApi.getCustomCreditPack(params)).data.data;
  return creditPacksApi.getCustomCreditPack(params);
}


export async function getSubscriptionPlan(sku) {
  return (await subscriptionPlansApi.getSubscriptionPlan(sku)).data.data;
  // return subscriptionPlansApi.getSubscriptionPlan(sku);
}


export async function createCreditsCheckoutSession(paymentGateway, data) {
  // infer order_type from products?
  console.log('createCreditsCheckoutSession', data);

  const params = {
    paymentGateway: paymentGateway,
    orderType: 'credits',
    products: data.products,
    billing: _.get(data, 'billing'),
    intendedUrl: _.get(data, 'intendedUrl', null),
  };
  addCouponCode(params);

  return ordersApi.createCheckoutSession(params);
}


// stripe paymentIntent
export async function createCreditsPaymentIntent(data) {
  // infer order_type from products?
  console.log('createCreditsPaymentIntent', data);

  const params = {
    paymentGateway: 'stripe',
    orderType: 'credits',
    products: data.products,
    billing: _.get(data, 'billing'),
    intendedUrl: _.get(data, 'intendedUrl', null),
  };
  addCouponCode(params);

  return ordersApi.createPaymentIntent(params);
}

// stripe paymentIntent
export async function createSubscriptionPaymentIntent(data) {
  // infer order_type from products?
  console.log('createSubscriptionPaymentIntent', data);

  const params = {
    paymentGateway: 'stripe',
    paymentMethod: 'credit_card',
    orderType: 'subscription',
    products: data.products,
    billing: _.get(data, 'billing'),
    intendedUrl: _.get(data, 'intendedUrl', null),
  };

  return ordersApi.createPaymentIntent(params);
}

export async function checkoutOrderWithStripePaymentMethod(data) {
  // infer order_type from products?
  console.log('checkoutCreditsWithStripePaymentMethod', data);

  const id = data.orderId;

  const params = {
    paymentGateway: 'stripe',
    paymentMethodId: _.get(data, 'paymentMethodId'), // stripe payment method id
    paymentIntentId: _.get(data, 'paymentIntentId'), // stripe payment intent id
  };
  // addCouponCode(params);

  // if (_.has(data, 'returnUrl')) {
  //   params.returnUrl = data.returnUrl;
  // }

  return ordersApi.checkoutOrderWithStripePaymentMethod(id, params);
}


export async function createSubscriptionCheckoutSession(paymentGateway, data) {
  // infer order_type from products?
  const params = {
    paymentGateway: paymentGateway,
    paymentMethod: 'credit_card',
    orderType: 'subscription',
    products: data.products,
    billing: _.get(data, 'billing', null),
    intendedUrl: _.get(data, 'intendedUrl', null),
  };

  return ordersApi.createCheckoutSession(params);
}

export async function createCreditsOrder(paymentGateway, data) {
  console.log('createCreditsOrder', data);

  const params = {
    paymentGateway: paymentGateway,
    orderType: 'credits',
    products: data.products,
    billing: _.get(data, 'billing', null),
  };
  addCouponCode(params);

  // infer order_type from products?
  return ordersApi.createOrder(params);
}

export async function trackOrder(id) {
  console.log('trackOrder');
  return ordersApi.trackOrder(id);
}

export async function completeOrder(id, data) {
  console.log('completeOrder', data);
  return ordersApi.completeOrder(id, data);
}

export async function getOrder(id, data) {
  console.log('pollOrderCompleted', data);
  return ordersApi.getOrder(id, data);
}

// export async function pollOrderCompleted(id, data) {
//   console.log('pollOrderCompleted', data);
//   return ordersApi.pollOrderCompleted(id, data);
// }

export async function createSubscriptionOrder(paymentGateway, data) {
  console.log('createCreditsOrder', data);

  const params = {
    paymentGateway: paymentGateway,
    paymentMethod: 'credit_card',
    orderType: 'subscription',
    products: data.products,
    billing: _.get(data, 'billing', null),
  };

  // infer order_type from products?
  return ordersApi.createOrder(params);
}


export async function getCoupon(couponCode) {
  // return (await couponsApi.getCoupon(couponCode)).data.data;
  return couponsApi.getCoupon(couponCode);
}

function loadStripeCheckout(version = 'v3', callback) {
  const e = document.createElement('script');
  e.src = `https://js.stripe.com/${version}`;
  e.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(e);
  e.addEventListener('load', callback);
}


export async function redirectToStripeCheckout(publishableKey, data) {
  loadStripeCheckout('v3', () => {
    // try {
    console.log(`session:${data.sessionId}`);
    const stripe = window.Stripe(publishableKey);
    stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });
  });
}


export async function checkoutCredits(paymentMethod, data) {
  console.log('checkoutCredits', data);

  // console.log(paymentMethod);
  // console.log(products);
  // POST to checkout
  // let response;
  let params = {};

  switch (paymentMethod) {
    case 'paypal':
    case 'bank_transfer':
    case 'konbini':
      params = {
        payment_method: paymentMethod,
        order_type: 'credits',
        products: data.products,
        billing: _.get(data, 'billing'),
      };

      addCouponCode(params);

      // if (_.has(data, 'billing')) {
      //   params.billing = _.mapKeys(data.billing, (v, k) => _.snakeCase(k));
      // }

      return ordersApi.createOrderAndCheckout(params);
      // return (await ordersApi.createOrderAndCheckout(params)).data.data;

    default:
      return false;
  }
  // const redirectUrl = _.get(response, 'redirect.url');
  // if (redirectUrl) {
  //   window.location.href = redirectUrl;
  // } else {
  //   return response;
  // }
}
