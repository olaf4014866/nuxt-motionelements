import kebabCase from 'lodash/kebabCase';

export const mediatypeConverter = (mt) => {
  let mediatype = mt || '';
  if (mediatype.match('_')) {
    mediatype = kebabCase(mediatype);
  }
  if (!mt) {
    console.error('[api/formatter]: no mediatype!');
  }
  return mediatype;
};

export const singleElementFormatter = (el) => {
  const element = el;
  if (el.mediaType) {
    element.mediaType = mediatypeConverter(el.mediaType);
  }
  // if (el.currency) {
  //   element.currency = el.currency.toLowerCase();
  // }
  if (el.artist) {
    element.mediaType = mediatypeConverter(el.mediaType);
  }
  return element;
};

export const artistFormatter = (at) => {
  const artist = at;
  return artist;
};

export const currenciesFormatter = (obj) => {
  const apiTerms = obj;
  const currencyMap = {};

  obj.currencies.forEach((element) => {
    const currencyName = element.code;
    // const currencyName = element.code.toLowerCase();
    currencyMap[currencyName] = element;
    // currencyMap[currencyName.toLowerCase()] = element;
  });

  apiTerms.currencies = currencyMap;

  return apiTerms;
};
