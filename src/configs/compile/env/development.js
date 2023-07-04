module.exports = {
  // 静态资源url前缀路径
  publicPath: '/',
  devServer: {
    port: 3001,
    proxy: {
      '/dev1/admin': {
        target: 'http://vr-plain-config-operation-dev.fanbook.mobi',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dev1': ''
        }
      },
      '/dev2/admin': {
        target: 'http://vr-plain-config-operation-dev.fanbook.mobi',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dev2': ''
        }
      },
      '/uat/admin': {
        target: 'http://vr-plain-config-operation-dev.fanbook.mobi',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/uat': ''
        }
      },
      '/pro/admin': {
        target: 'http://vr1-plain-config-operation-dev.fanbook.mobi',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/pro': ''
        }
      }
    }
  }
};
