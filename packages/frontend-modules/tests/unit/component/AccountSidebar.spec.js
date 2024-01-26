// TODO: Check NavBar render all link correct, link i18n test in site.js/siteurl.js
// @ts-nocheck
/* eslint-disable */

import { config, createLocalVue, shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import Vuex from 'vuex';
import store from '@/store/index.js';

import meUrl from '~/library/meUrl.js';
import AccountSidebar from '@/components/AccountSidebar.vue';

/* mock data */
// import Blank from '~/tests/mock/Blank.vue';
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

localVue.prototype.$siteUrl = meUrl.siteUrl;
localVue.prototype.$site = meUrl.site;
// meUrl
meUrl.defaultLang.set('en');

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

const wrapper = shallowMount(AccountSidebar, mountOptions);
const wrapperMember = shallowMount(AccountSidebar, mountIsMember);

describe('test account sidebar render', () => {
  it('test header is rendered and visible', () => {
    const aside = wrapper.find('aside')
    expect(aside.is('aside')).to.be.true;
    expect(aside.isVisible()).to.be.true;
  });
});

describe('test AccountSidebar link (no-login)', () => {
  const navLink = wrapper.find('#account-sidebar').findAll('a[href*="/"]');
  // console.log(navLink.length);
  // for (let i = 0; i < navLink.length; i++) {
  //   console.log(navLink.at(i).element.href);
  // }
  it('test AccountSidebar link /favorites', () => {
    expect(navLink.at(0).element.href).is.equal('https://www.motionelements.com/favorites');
  });
  it('test AccountSidebar link /checkout', () => {
    expect(navLink.at(1).element.href).is.equal('https://www.motionelements.com/checkout');
  });
  it('test AccountSidebar link /pricing', () => {
    expect(navLink.at(2).element.href).is.equal('https://www.motionelements.com/pricing');
  });
  it('test AccountSidebar link /begin', () => {
    expect(navLink.at(3).element.href).is.equal('https://www.motionelements.com/begin');
  });
  it('test AccountSidebar link /artists', () => {
    expect(navLink.at(4).element.href).is.equal('https://www.motionelements.com/artists');
  });
});

describe('test AccountSidebar link (no-login)', () => {
  const navLink = wrapperMember.find('#account-sidebar').findAll('a[href*="/"]');
  // console.log(navLink.length);
  // for (let i = 0; i < navLink.length; i++) {
  //   console.log(navLink.at(i).element.href);
  // }
  it('test AccountSidebar link /favorites', () => {
    expect(navLink.at(0).element.href).is.equal('https://www.motionelements.com/favorites');
  });
  it('test AccountSidebar link /checkout', () => {
    expect(navLink.at(1).element.href).is.equal('https://www.motionelements.com/checkout');
  });
  it('test AccountSidebar link /account', () => {
    expect(navLink.at(2).element.href).is.equal('https://www.motionelements.com/account');
  });
  it('test AccountSidebar link /download', () => {
    expect(navLink.at(3).element.href).is.equal('https://www.motionelements.com/download');
  });
  it('test AccountSidebar link /account/purchase-history', () => {
    expect(navLink.at(4).element.href).is.equal('https://www.motionelements.com/account/purchase-history');
  });
  it('test AccountSidebar link /account/credits', () => {
    expect(navLink.at(5).element.href).is.equal('https://www.motionelements.com/account/credits');
  });
  it('test AccountSidebar link /account/subscription', () => {
    expect(navLink.at(6).element.href).is.equal('https://www.motionelements.com/account/subscription');
  })
  it('test AccountSidebar link /history/list', () => {
    expect(navLink.at(7).element.href).is.equal('https://www.motionelements.com/history/list');
  })
  it('test AccountSidebar link /artist', () => {
    expect(navLink.at(8).element.href).is.equal('https://www.motionelements.com/artist');
  });
  it('test AccountSidebar link /reseller', () => {
    expect(navLink.at(9).element.href).is.equal('https://www.motionelements.com/reseller');
  });
  it('test AccountSidebar link /account/logout', () => {
    expect(navLink.at(10).element.href).is.equal('https://www.motionelements.com/account/logout');
  });
});
