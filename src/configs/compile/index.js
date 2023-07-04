// 编译配置 - 改动这里的配置需要重启项目
const configCommon = require('./env/common');
const configDev = require('./env/development');
const configTest = require('./env/test');
const configPro = require('./env/production');
// 获取环境
const getEnv = require('./modules/env');
const merge = require('./modules/merge');

const env = getEnv();

// 根据环境合并配置
let result = {};
if (env === 'test') {
  result = merge({}, configCommon, configTest);
} else if (env === 'development') {
  result = merge({}, configCommon, configDev);
} else {
  result = merge({}, configCommon, configPro);
}

module.exports = result;
