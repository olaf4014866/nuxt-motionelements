import site from '../../site';
import defaultLang from '../../lang';

/* mock data */
// import route from '~/tests/mock/route';
import { supportedLanguages } from '../mock/lang';

const langs = Object.keys(supportedLanguages);

const { expect } = require('chai');

/**
 * site url basic how to use
 * * EX: $site('').url()
*/

describe('help.motionelements.com, artists.zendesk/motionelements.com lang (zendesk)', () => {
  langs.forEach((lang) => {
    it(`test ${lang}`, async () => {
      const zHelpUrl = 'https://help.motionelements.com/hc/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-';
      const zHelpUrlLang = {
        en: 'https://help.motionelements.com/hc/en-us/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        ja: 'https://help.motionelements.com/hc/ja/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        ko: 'https://help.motionelements.com/hc/ko/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        'zh-hant': 'https://help.motionelements.com/hc/zh-tw/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        th: 'https://help.motionelements.com/hc/en-us/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        de: 'https://help.motionelements.com/hc/en-us/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        es: 'https://help.motionelements.com/hc/en-us/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
        fr: 'https://help.motionelements.com/hc/en-us/articles/115000034521-How-do-I-use-the-GIF-Creator-to-edit-my-GIFs-',
      };
      defaultLang.set(lang);
      expect(site(zHelpUrl).url()).to.equal(zHelpUrlLang[lang]);
    });
  });
});

describe('helpx.adobe lang', () => {
  langs.forEach((lang) => {
    it(`test ${lang}`, async () => {
      const article = '/kb/failed-install-creative-cloud-desktop.html';
      const adobeUrl = `https://helpx.adobe.com/download-install${article}`;
      const adobeUrlLang = {
        en: `https://helpx.adobe.com/download-install${article}`,
        ja: `https://helpx.adobe.com/jp/download-install${article}`,
        ko: `https://helpx.adobe.com/kr/download-install${article}`,
        'zh-hant': `https://helpx.adobe.com/tw/download-install${article}`,
        th: `https://helpx.adobe.com/${lang}/download-install${article}`,
        de: `https://helpx.adobe.com/${lang}/download-install${article}`,
        es: `https://helpx.adobe.com/${lang}/download-install${article}`,
        fr: `https://helpx.adobe.com/${lang}/download-install${article}`,
      };
      defaultLang.set(lang);
      expect(site(adobeUrl).url()).to.equal(adobeUrlLang[lang]);
    });
  });
});

describe('motionelements.com/blog lang no article (wordpress)', () => {
  langs.forEach((lang) => {
    it(`test ${lang}`, async () => {
      const blogUrl = 'https://www.motionelements.com/blog';
      const blogUrlLang = {
        en: 'https://www.motionelements.com/blog/',
        ja: 'https://www.motionelements.com/blog/ja/',
        ko: 'https://www.motionelements.com/blog/ko/',
        'zh-hant': 'https://www.motionelements.com/blog/zt/',
        th: 'https://www.motionelements.com/blog/',
        de: 'https://www.motionelements.com/blog/',
        es: 'https://www.motionelements.com/blog/',
        fr: 'https://www.motionelements.com/blog/',
      };
      // console.log(lang);
      // console.log(defaultLang.get());
      console.log(site(blogUrl).url());
      defaultLang.set(lang);
      expect(site(blogUrl).url()).to.equal(blogUrlLang[lang]);
    });
  });
});

describe('motionelements.com/blog lang w/ article(wordpress)', () => {
  langs.forEach((lang) => {
    it(`test with search ${lang}`, async () => {
      const article = '/articles/10-amazing-ver?number=1';
      const blogUrl = `https://www.motionelements.com/blog${article}`;
      const blogUrlLang = {
        en: `https://www.motionelements.com/blog${article}`,
        ja: `https://www.motionelements.com/blog/ja${article}`,
        ko: `https://www.motionelements.com/blog/ko${article}`,
        'zh-hant': `https://www.motionelements.com/blog/zt${article}`,
        th: `https://www.motionelements.com/blog${article}`,
        de: `https://www.motionelements.com/blog${article}`,
        es: `https://www.motionelements.com/blog${article}`,
        fr: `https://www.motionelements.com/blog${article}`,
      };
      // console.log(lang);
      // console.log(defaultLang.get());
      // console.log(site(blogUrl).url());
      defaultLang.set(lang);
      expect(site(blogUrl).url()).to.equal(blogUrlLang[lang]);
    });
    it(`test no search ${lang}`, async () => {
      const article = '/interview/25th-17';
      const blogUrl = `https://www.motionelements.com/blog${article}`;
      const blogUrlLang = {
        en: `https://www.motionelements.com/blog${article}`,
        ja: `https://www.motionelements.com/blog/ja${article}`,
        ko: `https://www.motionelements.com/blog/ko${article}`,
        'zh-hant': `https://www.motionelements.com/blog/zt${article}`,
        th: `https://www.motionelements.com/blog${article}`,
        de: `https://www.motionelements.com/blog${article}`,
        es: `https://www.motionelements.com/blog${article}`,
        fr: `https://www.motionelements.com/blog${article}`,
      };
      // console.log(lang);
      // console.log(defaultLang.get());
      // console.log(site(blogUrl).url());
      defaultLang.set(lang);
      expect(site(blogUrl).url()).to.equal(blogUrlLang[lang]);
    });
  });
});

describe('go, tuts, press.motionelements.com test lang (wordpress)', () => {
  langs.forEach((lang) => {
    it(`test go ${lang}`, async () => {
      const article = '/seminars/japan-1904/';
      const goMeUrl = `https://go.motionelements.com${article}`;
      const goMeUrlLang = {
        en: `https://go.motionelements.com${article}`,
        ja: `https://go.motionelements.com/ja${article}`,
        ko: `https://go.motionelements.com/ko${article}`,
        'zh-hant': `https://go.motionelements.com/zt${article}`,
        th: `https://go.motionelements.com${article}`,
        de: `https://go.motionelements.com${article}`,
        es: `https://go.motionelements.com${article}`,
        fr: `https://go.motionelements.com${article}`,
      };
      defaultLang.set(lang);
      expect(site(goMeUrl).url()).to.equal(goMeUrlLang[lang]);
    });
    // https://tuts.motionelements.com/qa/
    // https://tuts.motionelements.com/qa/ja/questions/categories/premiere-pro/
    it(`test tuts ${lang}`, async () => {
      // const qaArticle = '/seminars/japan-1904/';
      const article = '/seminar-jp-1808-video';
      const tutsMeUrl = `https://tuts.motionelements.com${article}`;
      const tutsMeUrlLang = {
        en: `https://tuts.motionelements.com${article}`,
        ja: `https://tuts.motionelements.com/ja${article}`,
        ko: `https://tuts.motionelements.com/ko${article}`,
        'zh-hant': `https://tuts.motionelements.com/zt${article}`,
        th: `https://tuts.motionelements.com${article}`,
        de: `https://tuts.motionelements.com${article}`,
        es: `https://tuts.motionelements.com${article}`,
        fr: `https://tuts.motionelements.com${article}`,
      };
      defaultLang.set(lang);
      expect(site(tutsMeUrl).url()).to.equal(tutsMeUrlLang[lang]);
    });
  });
});

describe('motionelements.com/artists test lang (motionelements)', () => {
  langs.forEach((lang) => {
    it(`test ${lang}`, async () => {
      const article = '/nash';
      const artistMeUrl = `https://www.motionelements.com/artists${article}`;
      const artistMeUrlLang = {
        en: `https://www.motionelements.com/artists${article}`,
        ja: `https://www.motionelements.com/${lang}/artists${article}`,
        ko: `https://www.motionelements.com/${lang}/artists${article}`,
        'zh-hant': `https://www.motionelements.com/${lang}/artists${article}`,
        th: `https://www.motionelements.com/${lang}/artists${article}`,
        de: `https://www.motionelements.com/${lang}/artists${article}`,
        es: `https://www.motionelements.com/${lang}/artists${article}`,
        fr: `https://www.motionelements.com/${lang}/artists${article}`,
      };
      defaultLang.set(lang);
      expect(site(artistMeUrl).url()).to.equal(artistMeUrlLang[lang]);
    });
  });
});
