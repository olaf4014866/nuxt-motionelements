import webpack from 'webpack'
import lang from './lang';

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'MotionElements',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: "https://static.motionelements.com/lib/flowplayer/7.2.7/skin/skin.css"
      }
    ],
    script: [
      {
        src: "https://static.motionelements.com/lib/flowplayer/7.2.7/flowplayer.min.js?v=1543908999"
      },
      {
        src: "https://static.motionelements.com/lib/js/soundmanager2/2.97a.20170601/script/soundmanager2-nodebug-jsmin.js"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/index.js',
    '~/plugins/font-awesome-plugins.js',
    '~/plugins/utils.js',
    // {src: '~/middleware/link.js', mode: 'client'}
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  env: {
    VUE_APP_API_URL: process.env.VUE_APP_API_URL,
    VUE_APP_FLOWPLAYER_KEY: process.env.VUE_APP_FLOWPLAYER_KEY,
    VUE_APP_TELEPORT_EVENT_URL: process.env.VUE_APP_TELEPORT_EVENT_URL,
    VUE_APP_TELEPORT_LOG_URL: process.env.VUE_APP_TELEPORT_LOG_URL,
  },

  build: {
    publicPath: (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? process.env.VUE_APP_ASSET_URL : '/',
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    ['@nuxtjs/dotenv', { filename: '.env.' + process.env.NODE_ENV }],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n'
  ],

  // i18n configuration
  i18n: {
    locales: lang.languageList,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: lang.languages
    }
  },

  axios: {
    proxy: true
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache',
      'ME-Version': '2020-02-12',
    },
  },

  proxy: {
    '/me-api-mockup': {
      target: 'https://a2380b55-6271-4dda-a4d1-62366a7efd08.mock.pstmn.io',
      secure: true,
      pathRewrite: {
        '^/me-api-mockup': '/',
      },
    },
    '/me-api-stage': {
      target: 'https://stage-search.motionelements.com',
      secure: true,
      pathRewrite: {
        '^/me-api-stage': '/',
      },
    },
    '/me-api': {
      target: 'https://market.api-stage.motionelements.com',
      secure: true,
      pathRewrite: {
        '^/me-api': '/',
      },
    },
  },

  styleResources: {
    scss: [
      '@motionelements/assets/src/scss/bootstrap-custom/_variables.scss',
      '@motionelements/assets/src/scss/me-custom/_mixins.scss',
      '@motionelements/assets/src/scss/me-icon-font/style.scss',
    ]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
        $: 'jquery',
      })
    ],
    // enable compile js files as es6
    transpile: [
      '@motionelements/core',
      '@motionelements/assets',
      '@motionelements/helper',
      '@motionelements/old-modules',
      '@motionelements/money'
    ]
  }
}
