import { browser } from 'idfe-utils';
import { LOCAL_TOKEN, LOCAL_USERINFO } from '@/consts';
import { AccoutStateTypes } from '@/stores/reducers/accountReducer';

const { removeItem, setItem } = browser.localStorage;

// 登录后回调方法
export const updateAfterLoginCallback = (afterLoginCallback: AccoutStateTypes['afterLoginCallback']) => {
  return {
    type: 'updateAfterLoginCallback',
    afterLoginCallback
  };
};

// 登录
export const login = (userInfo: AccoutStateTypes['userInfo'], token: AccoutStateTypes['token']) => {
  // 存储用户token到本地
  setItem(LOCAL_TOKEN, token);
  // 存储用户信息到本地
  setItem(LOCAL_USERINFO, userInfo);
  return {
    type: 'login',
    userInfo,
    token
  };
};

// 更新用户资料
export const updateUserInfo = (userInfo: AccoutStateTypes['userInfo']) => {
  // 更新用户信息到本地
  setItem(LOCAL_USERINFO, userInfo);
  return {
    type: 'updateUserInfo',
    userInfo
  };
};

// 退出登录
export const logout = () => {
  // 清除本地存储的token
  removeItem(LOCAL_TOKEN);
  // 清除本地存储的用户信息
  removeItem(LOCAL_USERINFO);
  return {
    type: 'logout'
  };
};
