// TODO: Check NavBar render all link correct, link i18n test in site.js/siteurl.js
// @ts-nocheck
/* eslint-disable */

import { config, createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import Vuex from 'vuex';
import store from '@/store/index.js';

// import meUrl from '~/library/meUrl.js';
import meHelper from '~/library/meHelper.js';

import NavBar from '@/components/NavBar.vue';

/* mock data */
// import Blank from '~/tests/mock/Blank.vue';
// import route from '~/tests/mock/route.js';
// import lang from '~/tests/mock/lang.js';

import $ from 'jquery'
global.$ = $;

// localVue mount component to test
const localVue = createLocalVue();
localVue.use(Vuex)
// stop transition
config.stubs.transition = false;
// stub font-awesome-icon
config.stubs['font-awesome-icon'] = '<div />';
// default mock
config.mocks['$t'] = (msg) => msg;
// config.mocks['$site'] = (msg) => msg;
// config.mocks['$siteUrl'] = (msg) => msg;

// meUrl
// localVue.prototype.$siteUrl = meUrl.siteUrl;
// localVue.prototype.$site = meUrl.site;
// meUrl.defaultLang.set('en');

// meHelper
localVue.prototype.$siteUrl = meHelper.siteUrl;
localVue.prototype.$site = meHelper.site;

meHelper.defaultLang.set('en');

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
    isAdmin: () => false,
    isLogin: () => false,
    isArtist: () => false,
    isReseller: () => false,
    userAvatar: () => null,
    userEmail: () => 'example@motionelements.com',
    currentLanguage: () => 'en',
    supportedLanguages: () => [],
  },
};

const mountIsMember = {
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
    isMember: () => true,
    isLogin: () => true,
    isArtist: () => true,
    isReseller: () => true,
    userAvatar: () => null,
    userEmail: () => 'example@motionelements.com',
    currentLanguage: () => 'en',
    supportedLanguages: () => [],
  },
};

const wrapper = shallowMount(NavBar, mountOptions);
const wrapperMember = shallowMount(NavBar, mountIsMember);

describe('test navbar render', () => {
  it('test header is rendered and visible', () => {
    const header = wrapper.find('header')
    expect(header.is('header')).to.be.true;
    expect(header.isVisible()).to.be.true;
  });
});

describe('test Navbar top link (mobile)', () => {
  const navbar = wrapper.find('.navbar-brand');
  const navLink = wrapper.find('.navbar-top').findAll('a[href*="/"]');
  it('test navbar logo link', () => {
    expect(navbar.element.href).to.equal('https://www.motionelements.com/');
  });
  it('test navbar-top link video', () => {
    expect(navLink.at(0).element.href).is.equal('https://www.motionelements.com/video');
  });
  it('test navbar-top link music', () => {
    expect(navLink.at(1).element.href).is.equal('https://www.motionelements.com/music');
  });
  it('test navbar-top link ae', () => {
    expect(navLink.at(2).element.href).is.equal('https://www.motionelements.com/after-effects-templates');
  });
  it('test navbar-top link pr', () => {
    expect(navLink.at(3).element.href).is.equal('https://www.motionelements.com/premiere-pro-templates');
  });
  it('test navbar-top link motion', () => {
    expect(navLink.at(4).element.href).is.equal('https://www.motionelements.com/apple-motion-templates');
  });
});

describe('test Navbar top link (login)', () => {
  const navLink = wrapperMember.find('#user-nav').findAll('a[href*="/"]');
  // console.log(navLink.length);
  // for (let i = 0; i < navLink.length; i++) {
  //   console.log(navLink.at(i).element.href);
  // }
  it('test login #user-nav link /account', () => {
    expect(navLink.at(0).element.href).is.equal('https://www.motionelements.com/account');
  });
  it('test login #user-nav link /download', () => {
    expect(navLink.at(1).element.href).is.equal('https://www.motionelements.com/download');
  });
  it('test login #user-nav link /account/purchase-history', () => {
    expect(navLink.at(2).element.href).is.equal('https://www.motionelements.com/account/purchase-history');
  });
  it('test login #user-nav link /account/credits', () => {
    expect(navLink.at(3).element.href).is.equal('https://www.motionelements.com/account/credits');
  });
  it('test login #user-nav link /account/subscription', () => {
    expect(navLink.at(4).element.href).is.equal('https://www.motionelements.com/account/subscription');
  });
  it('test login #user-nav link /history/list', () => {
    expect(navLink.at(5).element.href).is.equal('https://www.motionelements.com/history/list');
  });
  it('test login #user-nav link /affiliate/report', () => {
    expect(navLink.at(6).element.href).is.equal('https://www.motionelements.com/affiliate/report');
  });
  it('test login #user-nav link airtable question', () => {
    expect(navLink.at(7).element.href).is.equal('https://airtable.com/shrwG9spdLuaahm47?prefill_Email=example%40motionelements.com');
  });
  it('test login #user-nav link /account/logout', () => {
    expect(navLink.at(8).element.href).is.equal('https://www.motionelements.com/account/logout');
  });
  it('test login #user-nav link /reseller', () => {
    expect(navLink.at(9).element.href).is.equal('https://www.motionelements.com/reseller');
  });
  it('test login #user-nav link /artist', () => {
    expect(navLink.at(10).element.href).is.equal('https://www.motionelements.com/artist');
  });
  it('test login #user-nav link /artist/upload', () => {
    expect(navLink.at(11).element.href).is.equal('https://www.motionelements.com/artist/upload');
  });
  it('test login #user-nav link /artist/element/manage', () => {
    expect(navLink.at(12).element.href).is.equal('https://www.motionelements.com/artist/element/manage');
  });
  it('test login #user-nav link /artist/collection/manage', () => {
    expect(navLink.at(13).element.href).is.equal('https://www.motionelements.com/artist/collection/manage');
  });
  it('test login #user-nav link /artist/category/manage', () => {
    expect(navLink.at(14).element.href).is.equal('https://www.motionelements.com/artist/category/manage');
  });
  it('test login #user-nav link /artist/release/list', () => {
    expect(navLink.at(15).element.href).is.equal('https://www.motionelements.com/artist/release/list');
  });
  it('test login #user-nav link /artist/metadata/import', () => {
    expect(navLink.at(16).element.href).is.equal('https://www.motionelements.com/artist/metadata/import');
  });
  it('test login #user-nav link /artist/template', () => {
    expect(navLink.at(17).element.href).is.equal('https://www.motionelements.com/artist/template');
  });
  it('test login #user-nav link /artist/promo/list', () => {
    expect(navLink.at(18).element.href).is.equal('https://www.motionelements.com/artist/promo/list');
  });
  it('test login #user-nav link /artist/sales', () => {
    expect(navLink.at(19).element.href).is.equal('https://www.motionelements.com/en/artist/sales');
  });
  it('test login #user-nav link artists.zendesk.com/hc/en-us/', () => {
    expect(navLink.at(20).element.href).is.equal('https://artists.zendesk.com/hc/en-us/');
  });
  it('test login #user-nav link /pricing', () => {
    expect(navLink.at(21).element.href).is.equal('https://www.motionelements.com/pricing');
  });
});

describe('test Navbar top link (desktop)', () => {
  const navLink = wrapper.find('#navbar-mt').findAll('a[href*="/"]');
  it('test #navbar-mt link /video', () => {
    // console.log(navLink.length);
    expect(navLink.at(0).element.href).to.equal('https://www.motionelements.com/video');
  });
  it('test #navbar-mt link /animation', () => {
    expect(navLink.at(1).element.href).to.equal('https://www.motionelements.com/animation');
  });
  it('test #navbar-mt link /music', () => {
    expect(navLink.at(2).element.href).to.equal('https://www.motionelements.com/music');
  });
  it('test #navbar-mt link /after-effects-templates', () => {
    expect(navLink.at(3).element.href).to.equal('https://www.motionelements.com/after-effects-templates');
  });
  it('test #navbar-mt link /premiere-pro-templates', () => {
    expect(navLink.at(4).element.href).to.equal('https://www.motionelements.com/premiere-pro-templates');
  });
  it('test #navbar-mt link /appple-motion-templates', () => {
    expect(navLink.at(5).element.href).to.equal('https://www.motionelements.com/apple-motion-templates');
  });
  it('test #navbar-mt link /stock-image', () => {
    expect(navLink.at(6).element.href).to.equal('https://www.motionelements.com/stock-image');
  });

  it('test #navbar-more dropdown /davinci-resolve-templates', () => {
    expect(navLink.at(7).element.href).to.equal('https://www.motionelements.com/davinci-resolve-templates');
  });
  it('test #navbar-more dropdown /sound-effects', () => {
    // console.log(navLink.length);
    expect(navLink.at(8).element.href).to.equal('https://www.motionelements.com/sound-effects');
  });
  it('test #navbar-more dropdown /3d', () => {
    expect(navLink.at(9).element.href).to.equal('https://www.motionelements.com/3d');
  });
  it('test #navbar-more dropdown /lottie', () => {
    expect(navLink.at(10).element.href).to.equal('https://www.motionelements.com/lottie');
  });
  it('test #navbar-mt link /favorites', () => {
    expect(navLink.at(11).element.href).to.equal('https://www.motionelements.com/favorites');
  });
  it('test #navbar-mt link /checkout', () => {
    expect(navLink.at(12).element.href).to.equal('https://www.motionelements.com/checkout');
  });
});
