// * Check NavBar render all link correct, test lang in site.js/siteurl.js
// @ts-nocheck
/* eslint-disable */

import { config, createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import Vuex from 'vuex';
import store from '@/store/index.js';

import meUrl from '~/library/meUrl.js';
import Footer from '@/components/Footer.vue';

import $ from 'jquery'
global.$ = $;

// localVue mount component to test
const localVue = createLocalVue();
localVue.use(Vuex)
// stop transition
config.stubs.transition = false;
// mock i18n
config.mocks['$t'] = (msg) => msg;

localVue.prototype.$siteUrl = meUrl.siteUrl;
localVue.prototype.$site = meUrl.site;

const mountOptions = {
  store,
  localVue,
  stubs: {
    NavTheme: true,
    FontAwesomeIcon: true,
  },
  mocks: {
    $route: {
      path: '/',
      name: 'home',
    },
    $i18n: {
      locale: 'en',
    },
  },
  computed: {
    isMobile: () => false,
    isMember: () => false,
    isLogin: () => false,
    isArtist: () => false,
    isReseller: () => false,
    userAvatar: () => null,
    userEmail: () => 'example@motionelements.com',
    currentLanguage: () => 'ja',
    supportedLanguages: () => [],
  },
};

describe('test footer link is right', () => {
  // meUrl en set must before wrapper
  meUrl.defaultLang.set('en');
  // en wrapper
  const wrapper = shallowMount(Footer, mountOptions);

  it('footer rendered and visible.', () => {
    const footer = wrapper.find('footer');
    expect(footer.is('footer')).to.be.true;
    expect(footer.isVisible()).to.be.true;
  });

  const footerLink = wrapper.findAll('a');

  it('test footer link to /legal/license', () => {
    // console.log(footerLink.length);
    // expect(wrapper.find('a[href*="/legal/license"]')).to.equal('https://www.motionelements.com/legal/license');
    expect(footerLink.at(0).element.href).to.equal('https://www.motionelements.com/legal/license');
  });

  it('test footer link to /begin', () => {
    expect(footerLink.at(1).element.href).to.equal('https://www.motionelements.com/begin');
  });

  it('test footer link to /pricing', () => {
    expect(footerLink.at(2).element.href).to.equal('https://www.motionelements.com/pricing');
  });

  it('test footer link to go.motionelements.com', () => {
    expect(footerLink.at(3).element.href).to.equal('https://go.motionelements.com/');
  });

  it('test footer link to tuts.motionelements.com', () => {
    expect(footerLink.at(4).element.href).to.equal('https://tuts.motionelements.com/');
  });

  it('test footer link to /covid19', () => {
    expect(footerLink.at(5).element.href).to.equal('https://www.motionelements.com/covid19');
  });

  it('test footer link to /free/stock-footage', () => {
    expect(footerLink.at(6).element.href).to.equal('https://www.motionelements.com/free/stock-footage');
  });

  it('test footer link to /banner', () => {
    expect(footerLink.at(7).element.href).to.equal('https://www.motionelements.com/banner');
  });

  it('test footer link to /video-converter', () => {
    expect(footerLink.at(8).element.href).to.equal('https://www.motionelements.com/video-converter');
  });

  it('test footer link to artists.zendesk.com/hc/en-us', () => {
    expect(footerLink.at(9).element.href).to.equal('https://artists.zendesk.com/hc/en-us/');
  });

  it('test footer link to /artists', () => {
    expect(footerLink.at(10).element.href).to.equal('https://www.motionelements.com/artists');
  });

  it('test footer link to /referral', () => {
    expect(footerLink.at(11).element.href).to.equal('https://www.motionelements.com/referral');
  });

  it('test footer link to /about', () => {
    expect(footerLink.at(12).element.href).to.equal('https://www.motionelements.com/about');
  });

  it('test footer link to /blog', () => {
    expect(footerLink.at(13).element.href).to.equal('https://www.motionelements.com/blog/');
  });

  it('test footer link to /careers', () => {
    expect(footerLink.at(14).element.href).to.equal('https://www.motionelements.com/careers');
  });

  it('test footer link to /partners', () => {
    expect(footerLink.at(15).element.href).to.equal('https://www.motionelements.com/partners');
  });

  it('test footer link to help.motionelements.com/hc/en-us', () => {
    expect(footerLink.at(16).element.href).to.equal('https://help.motionelements.com/hc/en-us');
  });

  it('test footer link to facebook.com/motionelements', () => {
    expect(footerLink.at(17).element.href).to.equal('https://www.facebook.com/motionelements');
  });

  it('test footer link to youtube.com/channel/UCoM7M80fQE6XoVFo4NaiaGg', () => {
    expect(footerLink.at(18).element.href).to.equal('https://www.youtube.com/channel/UCoM7M80fQE6XoVFo4NaiaGg');
  });

  it('test footer link to twitter.com/motionelements', () => {
    expect(footerLink.at(19).element.href).to.equal('https://twitter.com/motionelements');
  });

  it('test footer link to /legal/privacy', () => {
    expect(footerLink.at(20).element.href).to.equal('https://www.motionelements.com/legal/privacy');
  });

  it('test footer link to /legal/terms', () => {
    expect(footerLink.at(21).element.href).to.equal('https://www.motionelements.com/legal/terms');
  });

  it('test footer link to /legal/copyright', () => {
    expect(footerLink.at(22).element.href).to.equal('https://www.motionelements.com/legal/copyright');
  });

  // meUrl ja set must before wrapper
  meUrl.defaultLang.set('ja');
  // ja wrapper
  const wrapperJa = shallowMount(Footer, mountOptions);

  it('test footer link /ja/legal/ecommerce', () => {
    const footerLinkJa = wrapperJa.findAll('a');
    expect(footerLinkJa.at(23).element.href).to.equal('https://www.motionelements.com/ja/legal/ecommerce');
  });
});
