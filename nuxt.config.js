
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'h5专题页生成' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
    // '~/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // https://axios.nuxtjs.org/setup
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.env.NODE_ENV == "development" ? "http://git.itcast.cn/api/v4" : "http://157.122.54.189:9095"
    baseURL: process.env.NODE_ENV == "development" ? "http://localhost:3000" : "http://157.122.54.189:9095",
    proxy: false
  },
  proxy: {
    // '/api/': 'http://git.itcast.cn',
  },

  serverMiddleware: [
    // Will register redirect-ssl npm package
    // 'redirect-ssl',

    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api/index.js' },

    // We can create custom instances too
    // { path: '/static2', handler: serveStatic(__dirname + '/static2') }
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
