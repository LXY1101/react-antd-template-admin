// 公共配置
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const output = require('../modules/output');
// 获取环境
const getEnv = require('../modules/env');
const antdTheme = require('../antdTheme');

const env = getEnv();
const { npm_package_name, npm_package_version } = process.env;

// 路由基础路径（可放二级域名）
const BASENAME = '/';

module.exports = {
  // 别名
  alias: {
    // 将src目录用别名记录
    '@': path.join(__dirname, '../../../../src')
  },
  output,
  BASENAME,
  antdTheme,
  // webpack插件
  webpackPlugins: [
    new webpack.DefinePlugin({
      // 全局变量
      'process.env': {
        BUILD_TIME: String(new Date().getTime()),
        NODE_ENV: JSON.stringify(env),
        PACKAGE_NAME: JSON.stringify(npm_package_name),
        VERSION: JSON.stringify(npm_package_version),
        BASENAME: JSON.stringify(BASENAME)
      }
    }),
    // 把翻译文件放在`src`目录下
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/locales',
          to: 'locales'
        }
      ]
    })
  ]
};
