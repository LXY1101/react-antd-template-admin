import { browser } from 'idfe-utils';
import axios, { InternalAxiosRequestConfig } from 'axios';
import JSONBigint from 'json-bigint';

import CONFIG from '@/configs';
import { LOCAL_TOKEN } from '@/consts';
import { getUrlParam } from '@/utils';

const JSONbig = JSONBigint({ storeAsString: true });
const { apiBase } = CONFIG;
const { getItem } = browser.localStorage;

export interface AxionsRequestConfig extends InternalAxiosRequestConfig {
  // 是mock路由
  isMockApi?: false;
  // 需要转换大整数
  needTransformBigInt?: Boolean;
  // 是否需要隐藏toast错误提示
  hideErrorToast?: Boolean;
}

const axiosConfig = () => {
  // axios请求拦截器
  axios.interceptors.request.use(
    (config: AxionsRequestConfig) => {
      // 请求头处理
      const { headers, method = 'get', needTransformBigInt = true } = config;
      headers['content-type'] = 'application/json';
      // 本地存储如果有token，请求头中携带
      const authorization = getItem(LOCAL_TOKEN, null);
      if (authorization) {
        headers['authorization'] = authorization;
      }

      // post数据大整数处理
      if (needTransformBigInt && Array.isArray(config.transformRequest)) {
        config.transformRequest.push((data) => {
          // 对post中的data生成的JSON字符串，清除大整数的双引号，使其以保留精度的number类型传递
          if (method.toLocaleLowerCase() === 'post' && typeof data === 'string') {
            data = data.replace(/"(\d{16,})"/gi, '$1');
          }
          return data;
        });
      }

      // 接口请求基础路径
      const env = getUrlParam(window.location.search, 'env') || 'dev1';
      config.baseURL = apiBase[env];

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 转换接口返回数据，将大整数转换成字符串，避免精度丢失
  axios.defaults.transformResponse = [
    (data) => {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONbig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        };
      }
    }
  ];

  // axios响应拦截器
  axios.interceptors.response.use(
    (response) => {
      // 状态码返回200时
      const { data } = response;
      // 当返回status为true，则返回数据，否则抛出错误
      if (data.status === true) {
        return data.data || null;
      }
      data.type = 'fromBack';
      return Promise.reject(data);
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axios;
};

export default axiosConfig;
