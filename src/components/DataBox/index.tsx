// 数据获取盒
import { ReactNode, useEffect, useState } from 'react';
import { Spin } from 'antd';

import { Error } from '@/components';
import styles from './index.module.less';

// 延迟加载动画定时器
let timer: any = null;

export interface DataBoxProps {
  className?: string;
  loading?: boolean;
  loadingDelay?: number;
  isEmpty?: boolean;
  emptyType?: string;
  emptyDemo?: ReactNode;
  error?: boolean | Error;
  loadingTitle?: string;
  errorTitle?: string;
  errorAbsolute?: boolean;
  errorRetry?: () => void;
  children: ReactNode;
}

export const DataBox = (props: DataBoxProps) => {
  const {
    // 父组件名称，调试用
    // parentName = '',
    className = '',
    // 是否读取中
    loading = true,
    // 等待延迟加载时间。即默认不加载，超过此时间还未返回数据才加载
    loadingDelay = 300,
    // 是否空状态
    isEmpty = false,
    // 空状态代码类型，和空状态代码只能选一个。暂时还没写空组件，先注释
    // emptyType = '',
    // 空状态代码
    emptyDemo = null,
    // 是否报错
    error = false,
    // 读取中文案
    loadingTitle = '正在加载',
    // 报错文案
    errorTitle = '系统异常，请稍后再试',
    // 报错dom是否绝对定位居中
    errorAbsolute = false,
    // 报错重试方法
    errorRetry = () => null,
    children
  } = props;

  // 是否初始化数据（调用一次接口后）。或者说执行一次完整的loading从true到false的过程
  // 初始化状态 ready | start | end
  const [initStatus, setInitStatus] = useState('ready');
  // 组件内等待状态
  const [curLoading, setCurLoading] = useState(false);

  useEffect(() => {
    clearTimeout(timer);
    if (loading) {
      // 如果初始化状态是准备状态，loading为true，则开始初始化
      if (initStatus === 'ready') {
        setInitStatus('start');
      }
      // 延迟显示等待组件
      timer = setTimeout(() => {
        setCurLoading(true);
      }, loadingDelay);
    } else {
      // 读取完成,设置不显示组件内等待组件
      setCurLoading(false);
      // 如果初始化状态是开始状态，loading为false，则结束初始化
      if (initStatus === 'start') {
        // 初始化完成
        setInitStatus('end');
      }
    }

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [loading, loadingDelay]);

  // console.log(curIsSpining, parentName + 'curIsSpining')

  // 不在等待状态时的代码
  const NotLoadingDemo = () => {
    if (error) {
      return <Error open title={errorTitle} retry={errorRetry} absolute={errorAbsolute} />;
    }
    if (isEmpty) {
      return emptyDemo || null;
    }
    return children || null;
  };

  return (
    <Spin spinning={curLoading} tip={loadingTitle}>
      <div className={[styles.wrap, className ? className : ''].join(' ')}>
        {/* 组件内等待组件 */}
        {/* <Loading open={curLoading} title={loadingTitle} /> */}
        {NotLoadingDemo()}
      </div>
    </Spin>
  );
};
