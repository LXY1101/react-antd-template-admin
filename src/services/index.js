import CONFIG from '@/configs';
import * as common from './requests/common';
import * as account from './requests/account';
import * as folders from './requests/folders';

const { apiBase } = CONFIG;

// 一些接口地址
const urls = {
  fbRedirectUrl: `${apiBase}/auth`
};

const API = {
  common,
  account,
  folders,
  urls
};

export default API;
