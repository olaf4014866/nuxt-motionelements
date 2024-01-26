// const logEndpoint = process.env.VUE_APP_TELEPORT_LOG_URL;

const eventEndpoint = process.env.VUE_APP_TELEPORT_EVENT_URL || 'https://stage.motionelements.com/teleport2/event';

// private
// const getSkus = function (data) {
//   var skus = [];

//   var products = _.get(data, 'products');

//   if (products) {
//     for (var i = 0; i < products; i += 1) {
//       // skus.push(order.products[i].id);
//     }
//   }

//   return skus;
// };

// https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
// private
const trackFb = function (eventCode, data) {
  console.log('trackFb', eventCode, data);
  // var self = this;

  var fbq = window.fbq;

  if (typeof fbq !== 'undefined') {
    // var skus = [];

    switch (eventCode) {
      // subscribe mailing list
      case 'lead':
        // fbq('track', 'Lead');
        break;

      case 'search':
        // fbq('track', 'Search');
        break;

      case 'product_viewed':
        // fbq('track', 'ViewContent');
        break;

      case 'product_added_to_wishlist':
        // skus = getSkus(data);

        // fbq('track', 'AddToWishlist', {
        //   content_ids: skus,
        //   content_type: 'product',
        // });
        break;

      case 'product_added':
        // var products = data.products;

        // skus = getSkus(data);

        // fbq('track', 'AddToCart', {
        //   content_ids: skus,
        //   content_type: 'product',
        // });
        break;

      case 'checkout_started':
        // fbq('track', 'InitiateCheckout');
        break;

      case 'order_completed':
        // var order = data;

        // skus = getSkus(data);

        // fbq('track', 'Purchase', {
        //   currency: _.get(order, 'currency', 'USD'),
        //   value: _.get(order, 'total', 0),
        //   content_ids: skus,
        //   content_type: 'product',
        // });
        break;

      case 'subscribed':
        // fbq('track', 'Subscribe');
        break;

      case 'signed_up':
        // fbq('track', 'CompleteRegistration');
        break;

      default:
        break;
    }
  }
};

// private
// const handleLog = function (eventCode) {
//   try {
//     // var endpoint = 'https://log.motionelements.com/motionelements/';

//     // var eventCode = _.snakeCase(eventName); //.toLowerCase().split(' ').join('_');

//     var clientId = '';

//     const ga = window.ga;
//     if (typeof ga !== 'undefined') {
//       if (typeof ga.getAll !== 'undefined') {
//         clientId = ga.getAll()[0].get('clientId');
//       }
//     }

//     var info = {};
//     info.event = eventCode;
//     info.cid = clientId;

//     if (typeof window.dataLayer !== 'undefined') {
//       var data = window.dataLayer;

//       info.mid = _.get(data[3], 'userId', '');
//       info.aid = _.get(data[3], 'contributorId', '');
//       info.hl = _.get(data[3], 'language', '');
//       info.cc = _.get(data[3], 'countryCode', '');

//       data = window.dataLayer.filter(item => typeof item.mediaType !== 'undefined');

//       if (data.length) {
//         info.mt = data[3].mediaType;
//       }

//       data = window.dataLayer.filter(item => typeof item.ecommerce !== 'undefined');

//       if (data.length) {
//         info.sku = _.get(data[3], 'ecommerce.detail.products.0.id');
//       }
//     }

//     const url = $.param(info);
//     var r = document.createElement('img');
//     r.src = `${logEndpoint}?${url}`;
//   } catch (e) {
//     console.log('handleLog - error');
//     console.log(e);
//   }
// };

// private
const handleEvent = function (eventCode, postData) {
  // var self = this;
  try {
    // make sure all eventCode as snake_case
    // var eventCode = _.snakeCase(eventName);

    // log it
    // skip
    // handleLog(eventCode);

    // no need to track event
    switch (eventCode) {
      case 'product_clicked':
      // case 'product_viewed':
        return true;
      default:
        break;
    }

    // var endpoint = 'https://www.motionelements.com/teleport';

    // get google clientId
    var clientId = '';

    var ga = window.ga;
    if (typeof ga !== 'undefined') {
      if (typeof ga.getAll !== 'undefined') {
        clientId = ga.getAll()[0].get('clientId');
      }
    }

    // ga(function (tracker) {
    //
    //     var clientId = tracker.get('clientId');

    var getData = {};

    getData.event = eventCode;
    getData.cid = clientId;

    var data = {};

    if (typeof window.dataLayer !== 'undefined') {
      data = window.dataLayer;

      getData.mid = _.get(data[3], 'userId', '');
      getData.aid = _.get(data[3], 'contributorId', '');
      getData.hl = _.get(data[3], 'language', '');
      getData.cc = _.get(data[3], 'countryCode', '');
      // getData.signature = _.get(data[3], 'eventSignature', '');
      // getData.time = _.get(data[3], 'timestamp', '');

      // getData.mid = (typeof data[3].userId !== 'undefined') ? data[3].userId : '' ;
      // getData.aid = (typeof data[3].contributorId !== 'undefined') ? data[3].contributorId : '' ;
      // getData.hl = (typeof data[3].language !== 'undefined') ? data[3].language : '' ;
      // getData.cc = (typeof data[3].countryCode !== 'undefined') ? data[3].countryCode : '' ;
      // getData.signature = (typeof data[3].eventSignature !== 'undefined') ? data[3].eventSignature : '' ;
      // getData.time = (typeof data[3].timestamp !== 'undefined') ? data[3].timestamp : '' ;
    }

    // for ES6
    // toQueryString: function (params) {
    //   return Object.keys(params).map(key => key + '=' + params[key]).join('&');
    // },

    // for jQuery
    var query = $.param(getData);

    var endpoint = eventEndpoint;

    var url = `${endpoint}?${query}`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.onload = function() {
    //     if (xhr.status === 200) {};
    // };

    // this.trackFb(eventCode, data);
    // console.log(postData);

    // xhr.send(JSON.stringify(ecommerce.purchase));
    xhr.send(JSON.stringify(postData));

    console.log('handleEvent - trackFb : ', eventCode, data);
    trackFb(eventCode, data);
  } catch (e) {
    console.log('handleEvent - error');
    console.log(e);
  }
};

// @depreacted, to remove
export function log(eventName) {
  console.log('teleport log @depreacted : ', eventName);
  // // var self = this;
  // // var eventCode = _.snakeCase(eventName).toLowerCase().split(' ').join('_');
  // // var eventCode = _.snakeCase(eventName);
  // var eventCode = eventName;

  // const ga = window.ga;
  // if (typeof window.ga !== 'undefined' && ga.create) {
  //   ga(() => {
  //     // wait for ga to load to get clientId
  //     handleLog(eventCode);
  //   });
  // } else {
  //   handleLog(eventCode);
  // }
}

export function event(eventName, postData) {
  // var self = this;
  if (process.env.VUE_APP_ENV === 'development') {
    return true;
  }
  console.log(eventName, postData);

  function isMember() {
    if (typeof window.dataLayer !== 'undefined') {
      return _.get(window.dataLayer[0], 'userId', '');
    }
    return false;
  }
  const ga = window.ga;

  // if (typeof window.ga !== 'undefined' && ga.create) {
  if (!isMember() && typeof window.ga !== 'undefined') {
    // wait for ga to load to get clientId
    ga(() => {
      handleEvent(eventName, postData);
    });
  } else {
    handleEvent(eventName, postData);
  }
}
