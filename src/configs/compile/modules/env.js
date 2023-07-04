// 获取环境
function getEnv() {
  // APP_ENV 必须前置在 NODE_ENV 逻辑前
  if (process.env.APP_ENV === 'test') {
    return 'test';
  }

  if (process.env.NODE_ENV === 'development') {
    return 'development';
  }
  return 'production';
}

module.exports = getEnv;
