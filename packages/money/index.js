import Dinero from 'dinero.js';

const money = (params) => {
  const amount = params.amount;
  const currency = params.currency;

  const obj = {
    toFormat(format, roundingMode) {
      let precision = 2;

      // toFixed to handle javacript floating point issues
      let subunitAmount = parseInt((amount * 100).toFixed(10), 10);
      if (['JPY', 'KRW'].includes(currency)) {
        precision = 0;
        subunitAmount = parseInt(amount, 10);
        if (format.endsWith('.00')) {
          format = format.substring(0, format.length - 3);
        }
      } else if (['TWD'].includes(currency)) { // JPY, KRW, TWD
        // precision = 0;
        // subunitAmount = parseInt(amount, 10);
        if (format.endsWith('.00')) {
          format = format.substring(0, format.length - 3);
        }
      } else if (!format.endsWith('.00') && subunitAmount % 100 > 0) { // value has decimal places
        format = `${format}.00`;
      }

      const dinero = Dinero({ amount: subunitAmount, currency: currency, precision });

      return dinero.toFormat(format, roundingMode);
    },
    getCurrency() {
      return currency;
    },
    toUnit() {
      // numberFormat(num) {
      // return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      // },
      return amount;
    },
    getSymbol() {
      switch (currency) {
        case 'USD':
          return 'US$';
        case 'SGD':
          return 'S$';
        case 'JPY':
          return '¥';
        case 'EUR':
          return '€';
        case 'KRW':
          return '₩';
        case 'THB':
          return '฿';
        case 'TWD':
          return 'NT$';
        case 'AUD':
          return 'A$';
        default:
          return '$';
      }
    },
  };
  return obj;
};

export default function (params) {
  return money(params);
}
