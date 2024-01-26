import siteUrl from '~/src/helper/siteUrl';
import defaultLang from '~/src/helper/lang';

/* mock data */
import { supportedLanguages } from '~/tests/mock/lang';

const langs = Object.keys(supportedLanguages);

const { expect } = require('chai');

const mediatypeWord = [
  'animation', 'video', '3d', 'music', 'sfx', 'vr',
  'ae', 'ae-template', 'ae-preset',
  // 'ae-plugin',
  'pr', 'pr-template', 'pr-preset', 'mg-template',
  'motion',
  'lottie',
  'image', 'photo', 'vector', 'gif',
];

const searchRoutes = {
  video: 'video',
  animation: 'animation',
  'video-live': 'video-live',
  vr: 'video-vr',
  ae: 'ae',
  'ae-template': 'ae-template',
  'ae-preset': 'ae-preset',
  music: 'music',
  pr: 'pr',
  'pr-template': 'pr-template',
  'pr-preset': 'pr-preset',
  'mg-template': 'mg-template',
  motion: 'motion-template',
  image: 'image',
  photo: 'photo',
  vector: 'vector',
  gif: 'gif',
  sfx: 'sfx',
  '3d': '3d-model',
  lottie: 'lottie',
};

// TODO: test number mediatype convert

/**
 * test search URL
 * EX: $siteUrl('').search().url()
 * usage: return search.motionelements.com url
 */

describe('test return search url w/ lang & mediatype', () => {
  langs.forEach((lang) => {
    mediatypeWord.forEach((mediatype) => {
      it(`test search ${lang} ${mediatype}`, async () => {
        const searchUrl = process.env.VUE_APP_SITE_SEARCH_URL;
        // console.log(lang);
        // console.log(defaultLang.get());
        // console.log(site(blogUrl).url());
        defaultLang.set(lang);
        // console.log(siteUrl(mediatype).search().url());
        // console.log(searchRoutes[mediatype]);
        expect(siteUrl(mediatype).search().url()).to.equal(`${searchUrl}/${lang}/search/${searchRoutes[mediatype]}`);
      });
    });
  });
});

/**
 * test www URL
 * EX: $siteUrl('').www().url()
 * usage: return www.motionelements.com url
 */

describe('test return www url w/ lang', () => {
  langs.forEach((lang) => {
    it(`test www ${lang}`, async () => {
      const prodUrl = process.env.VUE_APP_SITE_URL;
      const path = '/articles/10-amazing-ver?number=1';
      // console.log(lang);
      // console.log(defaultLang.get());
      // console.log(site(blogUrl).url());
      defaultLang.set(lang);
      expect(siteUrl(path).www().url()).to.equal(`${prodUrl}${lang === 'en' ? '' : `/${lang}`}${path}`);
    });
  });
});

/**
 * test router URL
 * EX: $siteUrl('').router().url()
 * usage: return lang + path for <router-link>
 */

describe('test return router url w/ lang', () => {
  langs.forEach((lang) => {
    it(`test router ${lang}`, async () => {
      const path = '/articles/10-amazing-ver?number=1';
      defaultLang.set(lang);
      expect(siteUrl(path).router().url()).to.equal(`${lang === 'en' ? '' : `/${lang}`}${path}`);
    });
  });
});
