import { resolve } from 'path';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  telemetry: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sound-solution',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1.0',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap',
      },
      // {
      //   rel: 'preload',
      //   type: 'font/ttf',
      //   as: 'font',
      //   href: '/fonts/Montserrat-Regular.ttf',
      //   crossorigin: true,
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'swiper/src/swiper.scss',
    'normalize.css/normalize.css',
    '~/assets/scss/main.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vuelidate.js',
      mode: 'all',
    },
    {
      src: '~/plugins/VScrollLock.js',
      mode: 'client',
    },
    {
      src: '~/plugins/swiper.js',
      mode: 'client',
      ssr: false,
    },
    {
      src: '~/plugins/debounce.js',
      mode: 'client',
    },
    {
      src: '~/plugins/vue-scrollto.js',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    //https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    'nuxt-leaflet',
    'nuxt-fingerprint2',
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true,
      },
    ],
    'cookie-universal-nuxt',
  ],

  styleResources: {
    // scss: ['~/assets/scss/main.scss'],
    scss: ['~/assets/scss/_variables.scss', '~/assets/scss/_mixins.scss'],
  },

  i18n: {
    locales: [
      {
        code: 'ua',
        file: 'ua-UA.js',
        name: 'Ukraine',
      },
      {
        code: 'ru',
        file: 'ru-RU.js',
        name: 'Russian',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'ru',
    vueI18n: {
      fallbackLocale: 'ru',
      messages: {
        ru: {
          welcome: 'Добро пожаловать',
        },
        ua: {
          welcome: 'Ласкаво просимо',
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
  alias: {
    style: resolve(__dirname, './assets/scss'),
    images: resolve(__dirname, './static/images'),
  },
  env: {
    API_URL: process.env.SERVER_API,
  },
};
