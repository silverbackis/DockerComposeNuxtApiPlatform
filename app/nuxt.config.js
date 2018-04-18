module.exports = {
  /**
   * Headers of the page
   */
  head: {
    titleTemplate: '%s - New Website',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  /**
   * Global CSS
   */
  css: ['~/assets/css/main.sass'],
  /**
   * Add globally
   */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options : {
            fix : true
          }
        })
      }
    }
  },
  /**
   * Cache settings
   */
  cache: true,
  /**
   * Plugins
   */
  plugins: [
    // Without ssr we get a warning ssr and browser rendering do not match as of 19 Jan 18
    { src: '~/plugins/fontawesome', ssr: true }
  ],
  /**
   * Modules
   */
  modules: [
    '@nuxtjs/component-cache',
    [
      '@nuxtjs/pwa',
      {
        icon: {
          iconSrc: 'static/icons/logo-1024x1024.png',
          sizes: [1024, 512, 144]
        },
        manifest: true,
        meta: false,
        workbox: {
          runtimeCaching: [
            {
              urlPattern: process.env.API_URL_BROWSER + '/.*',
              handler: 'networkFirst',
              method: 'GET'
            }
          ]
        },
        optimize: {
          cssnano: {
            zindex: false
          }
        }
      }
    ],
    [
      '@nuxtjs/axios',
      {
        credentials: true,
        debug: false
      }
    ],
    [
      '@nuxtjs/google-tag-manager',
      {
        id: 'GTM-XXXXX00'
      }
    ],
  ],
  /**
   * Manifest for mobile app
   */
  manifest: {
    name: 'New Website',
    short_name: 'NewWebsite',
    description: 'A new Nuxt website',
    lang: 'en',
    background_color: '#FFFFFF',
    theme_color: '#4770fb'
  },
  /**
   * Router
   */
  router: {
    middleware: []
  }
}
