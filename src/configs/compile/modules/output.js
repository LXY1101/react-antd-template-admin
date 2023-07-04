const getEnv = require('./env');

const { npm_package_name, npm_package_version } = process.env;

const env = getEnv();

// 出口路径
const output = `dist/${npm_package_name}-${env}-v${npm_package_version}`;

module.exports = output;
