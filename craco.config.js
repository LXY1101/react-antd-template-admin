// CRACO配置
const CracoLessPlugin = require('craco-less');
const path = require('path');

// 编译配置
const { alias, publicPath, output, webpackPlugins, devServer, antdTheme } = require('./src/configs/compile/index.js');

// 静态资源基础路径环境变量设置
process.env.PUBLIC_URL = publicPath;

module.exports = {
  webpack: {
    // 别名
    alias,
    // webpack插件
    plugins: webpackPlugins,
    configure: (webpackConfig, { env, paths }) => {
      // 这样才会生效
      webpackConfig.stats = 'errors-only';
      // 修改build的生成文件名称
      paths.appBuild = output;
      // 出口路径
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, output), // 修改输出文件目录
        publicPath
      };
      return webpackConfig;
    }
  },
  devServer: devServer || {},
  // craco插件
  plugins: [
    {
      // 在create-react-app中使用Less
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: antdTheme,
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
