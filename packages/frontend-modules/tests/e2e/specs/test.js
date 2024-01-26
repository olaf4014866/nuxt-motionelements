// https://docs.cypress.io/api/introduction/api.html
// @ts-ignore
/* eslint-ignore */
const flattenDepth = require('lodash/flattenDepth');
const langs = [ 'ja', 'ko', 'zh-hant'];
const routes = [
  '/', '/video', '/animation', '/music',
  '/after-effects-templates', '/premiere-pro-templates', '/apple-motion-templates',
];
const generatePages = langs.map(lang => routes.map(route => `/${lang}${route}`));
let allPaths = flattenDepth(generatePages, 2);

// describe('My screenshot', () => {
//   allPaths.forEach(path => {
//     it('Visits the app root url', () => {
//       // cy.viewport(1200, 3600);
//       cy.visit(`https://www.motionelements.com${path}`);
//       cy.wait(2000);
//       cy.get('#launcher').invoke('css', 'position', 'absolute')
//       cy.screenshot(`page-${path.replace('/', '-')}`);
//     });
//   });
// });
