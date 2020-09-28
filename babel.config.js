const IS_PROD = ['production', 'test', 'beta'].includes(process.env.NODE_ENV)
const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...plugins
  ]
}
