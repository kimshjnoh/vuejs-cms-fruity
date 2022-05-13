const { mergeSassVariables } = require('@vuetify/cli-plugin-utils')

module.exports = {
  // devServer: {
  //   open: process.platform === 'darwin',
  //   host: '0.0.0.0',
  //   port: 8080, // CHANGE YOUR PORT HERE!
  //   https: true,
  //   hotOnly: false,
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    const modules = ['vue-modules', 'vue', 'normal-modules', 'normal']
    modules.forEach(match => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss'"))
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => mergeSassVariables(opt, "'@/styles/variables.scss';"))
    })
  },
}
