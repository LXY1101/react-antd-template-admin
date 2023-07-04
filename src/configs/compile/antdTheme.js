// 所有antd主题变量链接 https://ant.design/docs/react/customize-theme-cn#%E9%9D%99%E6%80%81%E6%B6%88%E8%B4%B9%E5%A6%82-less
const { theme } = require('antd/lib');
const { defaultAlgorithm, defaultSeed, darkAlgorithm } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

module.exports = mapToken;
