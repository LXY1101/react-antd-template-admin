// 用户相关
import { browser } from 'idfe-utils';
import { LOCAL_TOKEN, LOCAL_USERINFO } from '@/consts';
const { getItem } = browser.localStorage;

export interface AccoutStateTypes {
  afterLoginCallback?: null | Function;
  isLogin?: boolean;
  userInfo?: any;
  token?: string;
}

// 从本地取出token
const token = getItem(LOCAL_TOKEN, null);
// 从本地取出用户信息
const userInfo = getItem(LOCAL_USERINFO, {});

// 初始state
export const initialState = {
  // 登录后回调
  afterLoginCallback: null,
  // 是否登录
  isLogin: token != null,
  // 用户信息
  userInfo,
  // 用户token
  token
};

function account(state = initialState, actions: any) {
  switch (actions.type) {
    // 更新登录后回调
    case 'updateAfterLoginCallback':
      return {
        ...state,
        afterLoginCallback: actions.afterLoginCallback
      };
    // 登录
    case 'login':
      return {
        ...state,
        isLogin: true,
        userInfo: actions.userInfo,
        token: actions.token
      };
    // 更新用户资料
    case 'updateUserInfo':
      return {
        ...state,
        userInfo: actions.userInfo
      };
    // 退出登录
    case 'logout':
      return {
        isLogin: false,
        userInfo: {},
        token: null
      };
    default:
      return state;
  }
}
export default account;
