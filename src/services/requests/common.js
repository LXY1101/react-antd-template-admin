// 公用API

// 获取公共配置（时间戳、二手市场开放时间） - 这是JAM项目的例子
export const config = () => ({
  url: `https://japi.iyogeng.com/api/v1/market/config`,
  method: 'get'
});

// 获取接口失败例子
export const errorExample = () => ({
  url: `https://a.b.c`,
  method: 'get'
});

// 获取接口失败例子 - 不显示toast
export const errorExampleNotip = () => ({
  url: `https://a.b.c`,
  method: 'get',
  hideErrorToast: true
});
