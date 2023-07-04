// 用户API

// fanbook授权后获取用户信息
export const postFbLogin = (data) => ({
  url: '/auth',
  method: 'post',
  data
});
