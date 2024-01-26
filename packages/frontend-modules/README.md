# MotionElements Frontend project common modules

modules need some test and build or copy process in normal commit (manual now)

1. `.vue`: run test, copy from /src to /shared
2. `.js`: run test, rollup will convert to IE11 compatible js and min, from /src/helper to /library

* DO NOT CHANGE FILES IN /shared folder
* UPDATE FILES IN /src/components
* run `npm run test` `npm run build` before every commit

## Install
```
npm i motionelements/frontend-modules#master
```
if there problem, run the command first and delete `package-lock.json`
```
npm install --cache /tmp/empty-cache
```

## /shared
### MotionElements cross site brand components

1. Navbar.vue
2. Footer.vue
3. AccountSidebar.vue

those components used helper site/siteUrl inside, please install to Vue.prototype before import.

shared components used '@' to get project root, means your project need use vue-cli to create.
or alias '@' to project `/src` folder and point to store.

## /library
site url helper for all motionelements.com project

### how to use

`import meHelper from 'frontend-modules/library/meHelper.min.js';`

in your project `main.js`
```
Vue.prototype.$siteUrl = meHelper.siteUrl;
Vue.prototype.$site = meHelper.site;
Vue.prototype.$term = meHelper.term;
```

uncompress version:
`import meHelper from 'frontend-modules/library/meHelper.js';`

**MUST sync url lang with your vuex lang in your vue-router**

```
router.beforeEach((to, from, next) => {

  meHelper.defaultLang.set(language);

});
```

*meUrl are deprecated, please update project, meUrl will not update in future*


## /src
### site helpers source files

need npm run build to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript

use rollup.js comapact the file, see `rollup.config.js` for more info.

## tests

run `npm run test:unit` to unit test shared components

### $site.js test
`/tests/unit/library/site.spec.js`
