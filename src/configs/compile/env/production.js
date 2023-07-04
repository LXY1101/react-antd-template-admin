const CompressionPlugin = require('compression-webpack-plugin');
const { BASENAME } = require('./common');

module.exports = {
  // 静态资源url前缀路径
  publicPath: BASENAME,
  webpackPlugins: [
    // gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240, // 对超过10k的数据进行压缩
      minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
    })
  ]
};
