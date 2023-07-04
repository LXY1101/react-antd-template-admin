// 包装一下ahooks的useRequest
import React from 'react';
import { useRequest as useRequestSource } from 'ahooks';
import type { Options, Service, Result } from 'ahooks/lib/useRequest/src/types';

import ConfigContext from './configContext';

export const UseRequestProvider = ConfigContext.Provider;

export const useRequest = <TData, TParams extends any[]>(
  service: Service<TData, TParams> | any,
  options: Options<TData, TParams>
): Result<TData, TParams> => {
  const contextConfig: any = React.useContext(ConfigContext);
  let finalService = service;
  const finalOptions = {
    ...contextConfig,
    ...options
  };

  // 对axios服务使用自定义的封装方式
  if (finalOptions.requestMethod != null) {
    finalService = (...args: any) => finalOptions.requestMethod(service(...args));
  }

  return useRequestSource(finalService, finalOptions);
};
