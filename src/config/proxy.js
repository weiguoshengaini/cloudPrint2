// 配置本地开发代理

module.exports = {
  proxy: {
    '/admin': {
      target: 'http://120.238.131.30:8166',
      changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      pathRewrite: {
        '^/admin': ''
      }
    },
    '/print': {
      target: 'http://appxx.com/',
      changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      pathRewrite: {
        '^/print': ''
      }
    }
  },
  typeList: [// 设置前缀名称
    'admin', 'print'
  ]
}
