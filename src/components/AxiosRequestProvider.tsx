// import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { logout } from '@/stores/actions/accountAction';
import axiosConfig, { AxionsRequestConfig } from '@/configs/axios';
import {
  UseRequestProvider
  // useAccount
} from '@/hooks';

const axios = axiosConfig();

const AxiosRequestProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  // const { goLoginJump } = useAccount();

  // 监听路由变化
  // useEffect(() => {
  //   // eslint-disable-next-line
  // }, [window?.location?.href]);

  return (
    <UseRequestProvider
      value={{
        // debounce 模式与 throttle 模式 run 返回值为 Promise<null>
        // debounceInterval: 500,
        requestMethod: (param: AxionsRequestConfig) => {
          param.method = param?.method ? param?.method : 'get';
          if (param?.method === 'get' || param?.method === 'delete') {
            param.params = param?.data;
            delete param.data;
          }
          return axios(param).catch((error) => {
            if (error.code === 'ERR_NETWORK') {
              message.error({
                content: '网络故障，请稍后重试'
              });
              return Promise.reject(error);
            }

            // 后台接口报错
            if (error?.data?.type === 'fromBack') {
              // 统一toast报错
              if (error?.data?.msg != null && !param?.hideErrorToast) {
                message.error({
                  content: error?.data?.msg
                });
              }
              return Promise.reject(error);
            }
            // 状态码不是200的错误拦截(错误类型且有response)：
            const errorRes = error?.response;
            if (['Error', 'AxiosError'].includes(error.constructor.name) && errorRes != null) {
              // 存储的是状态码，如404、500
              const status = errorRes.status;
              // 这里存储的是请求url，如果要判断特定url，则放开这里进行判断处理
              // const url = errorRes.config.url;
              // 将错误信息输出到前台
              const desc = `服务器开小差了(${status})`;
              error.desc = errorRes?.data?.msg || desc;
              // 其他情况，报服务器错误，并贴出状态码，方便找出问题，及时给后台背锅
              if (!param?.hideErrorToast) {
                message.error({
                  content: error.desc
                });
              }
              // 这种情况就不用往下走了
              return Promise.reject(error);
            }

            // ---------- 这里是处理后端定义的错误
            // 如果code是2001，代表用户：2001：token不合法 2002：token过期
            if (error.code === 2001 || error.code === 2002) {
              message.error({
                content: '请重新登录'
              });
              setTimeout(() => {
                // 清空本地数据
                dispatch(logout());
                // 跳转登录页
                // goLoginJump();
              }, 500);
            }

            // 继续返回错误
            return Promise.reject(error);
          });
        }
      }}
    >
      {children}
    </UseRequestProvider>
  );
};

export default AxiosRequestProvider;
