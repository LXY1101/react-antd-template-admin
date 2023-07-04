// 配置项
import envDevelopment from './env/development';
import envTest from './env/test';
import envProducetion from './env/production';

export interface ConfigProps {
  apiBase?: string;
  debugSalt?: string;
}

// 这里是编译环境
// 判断是开发环境
// const isDevelopment = process.env.NODE_ENV === 'development';
// 判断是测试环境
// const isTest = process.env.NODE_ENV === 'test';
// 判断是生产环境
// const isProduction = process.env.NODE_ENV === 'production';

// 编译环境名称
const compileEnv = process.env.NODE_ENV;

// 公共配置
const configCommon: ConfigProps = {
  // 调试盐，加在访问url里，可以访问vConsole，方便调试
  debugSalt: 'yonglaitiaoshi'
};

// 环境配置字典
const config = {
  // 开发环境配置
  development: Object.assign({}, configCommon, envDevelopment),
  // 测试环境配置
  test: Object.assign({}, configCommon, envTest),
  // 生产环境配置
  production: Object.assign({}, configCommon, envProducetion)
};

// 最终应用的环境 - 编译环境
// process.env.NODE_ENV: development | test | production
let finalConfig = config[compileEnv];

export default finalConfig;
