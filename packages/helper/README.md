# MotionElements Frontend project common modules

1. test `.js`: run test, rollup will convert to IE11 compatible js and min, from /src/helper to /library

## Install
at root folder `npm run lerna`
or in this folder `npm i`

## Unit Test
at this folder `npm run test:unit`
or run global use `lerna run test:unit`

### how to use

#### import all
`import meHelper from '@motionelements/helper';`

in your project `main.js`

```
Vue.prototype.$siteUrl = meHelper.siteUrl;
Vue.prototype.$site = meHelper.site;
Vue.prototype.$term = meHelper.term;
```
#### import seperate
`import siteUrl from '@motionelements/helper/siteUrl';`
`import site from '@motionelements/helper/site';`
`import term from '@motionelements/helper/term';`

**MUST sync url lang with your vuex lang in your vue-router**

```
router.beforeEach((to, from, next) => {

  meHelper.defaultLang.set(language);

});
```

if not use global import, use import lang.js to sync all helper module lang

```
import lang from '@motionelements/helper/lang';

router.beforeEach((to, from, next) => {

  lang.defaultLang.set(language);

});
```

*meUrl are deprecated, please update project, meUrl will not update in future*
