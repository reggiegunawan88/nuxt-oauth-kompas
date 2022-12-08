export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kompas.id',
    htmlAttrs: {
      lang: 'id',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Kompas.id Login Page',
      },
      /* JANGAN SEKALI2 KE REPLACE */
      { hid: 'robots', name: 'robots', content: 'noindex' },
    ],
    script: [
      {
        type: 'text/javascript',
        src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
        body: true,
        async: true,
        defer: true,
      },
      {
        type: 'module',
        src: 'https://unpkg.com/@kompas/web-components@latest',
        async: true,
        defer: true,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/kompas-id.png' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' },
    ],
    src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
    async: true,
    defer: true,
  },
  server: {
    port: process.env.PORT || 5000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/repositories.ts', '~/plugins/axios', '~/plugins/kompas-account-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-property-in-object', { loose: true }]],
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    loaders: {
      vue: {
        prettify: false,
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/svg',
    '@nuxtjs/markdownit',
    'cookie-universal-nuxt',
    '@nuxtjs/sentry',
    '@nuxtjs/gtm',
    'nuxt-stencil',
    '@nuxtjs/moment',
    '@nuxtjs/universal-storage',
    // nuxt-fontawesome
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['far'],
          },
        ],
      },
    ],
  ],
  markdownit: {
    runtime: true, // Support `$md()`
  },
  moment: {
    locales: ['id'],
  },

  stencil: {
    lib: '@kompas/web-components',
    prefix: 'kompas-',
    renderOptions: {},
    hydratePath: '@kompas/web-components/hydrate',
    loaderPath: '@kompas/web-components/loader',
    ignoredElements: null,
  },

  router: {},

  /**
   * google tag manager config
   * See https://github.com/nuxt-community/gtm-module
   */
  gtm: {
    enabled: true,
    id: 'GTM-NF6Q8TC',
    autoInit: true,
    scriptDefer: true,
    respectDoNotTrack: false,
  },

  sentry: {
    dsn: process.env.APP_ENV === 'local' ? '' : process.env.SENTRY_DSN, // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      environment: 'production',
    },
  },
  env: {
    baseURL: process.env.KOMPAS_API,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: false,
  },
  proxy: {
    // Simple proxy
    '/api/': {
      target: process.env.KOMPAS_API,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
    '/epaper/': {
      target: process.env.KOMPAS_EPAPER_API,
      pathRewrite: { '^/epaper/': '' },
    },
    '/api2/': {
      target: process.env.KOMPAS_API_WCM,
      pathRewrite: { '^/api2/': '' },
      changeOrigin: true,
    },
    '/cds/': {
      target: process.env.KOMPAS_CDS_API,
      pathRewrite: { '^/api/': '' },
      changeOrigin: true,
    },
  },
  publicRuntimeConfig: {
    googleRecaptchaKey: process.env.GOOGLE_RECAPTCHA_KEY,
    fbAppid: process.env.FB_APP_ID,
    homepageKompasAuth: process.env.HOMEPAGE_KOMPAS_AUTH,
    homepageKompasEvent: process.env.HOMEPAGE_KOMPAS_EVENT,
    redirect: process.env.REDIRECT_URL_LOGIN,
    cookieDomain: process.env.COOKIE_DOMAIN,
    redirect_applesignin: process.env.REDIRECT_APPLE_SIGNIN,
    googleappid: process.env.GOOGLE_APP_ID,
    googlesecret: process.env.GOOGLE_APP_SECRET,
    fbsecret: process.env.FB_APP_SECRET,
    kompasCDSAPI: process.env.KOMPAS_CDS_API,
    kompasEventAPI: process.env.KOMPAS_EVENT_API,
  },
  auth: {
    redirect: {
      login: false,
      logout: '/login',
      callback: '/redirect',
      home: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/v1/login/email',
            method: 'post',
            propertyName: 'success.token',
          },
          logout: false,
          user: false,
        },
      },
      facebook: {
        endpoints: {
          authorization_endpoint: 'https://facebook.com/v2.12/dialog/oauth',
          userInfo: 'https://graph.facebook.com/me?fields=id,name,email&access_token',
        },
        scope: ['public_profile', 'email'],
        client_id: process.env.FB_APP_ID,
      },
      google: {
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
        },
        scope: ['email'],
        client_id: process.env.GOOGLE_APP_ID,
      },
    },
  },
  tailwindcss: {},
}
