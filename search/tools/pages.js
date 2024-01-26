const flattenDepth = require('lodash/flattenDepth');

// get langs from lang file
// const { languages } = require('../lang/index.js');

// const langs = Object.keys(languages).filter(lang => lang !== 'en');
// filter en for generate url path
const langs = ['ja', 'de', 'es', 'fr', 'ko', 'th', 'zh-hant'];
// const langs = ['en'];

// get page path from route file
const routes = require('../router/routes.js');
// filter pages in routes.js have name
const rnames = routes.filter(r => r.name);
// filter pages no lang in lang, filter artist, dlp, category, lightbox
const noRenderRouteName = /lang|artist|login|dlp|product|collection|lightbox|category|credits|demo/;
const routesFile = rnames.filter(r => !r.name.match(noRenderRouteName));
// eslint-disable-next-line prefer-const
let route = [];
routesFile.forEach((r) => { route.push(`/${r.name.replace('home', '')}`); });

// route = [
//   // '/',
//   // '/video',
//   // '/animation',
//   // '/music', '/lottie',
//   // '/premiere-pro-templates', '/apple-motion-templates',
//   '/after-effects-templates',
//   // '/free/stock-footage',
// ];

// generate all page routes w/ langs
const generatePages = langs.map(lang => route.map(route => `/${lang}${route}`));

generatePages.push(route);

module.exports = {
  langs,
  route,
  pages: flattenDepth(generatePages, 2),
};
