import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AliveScope } from 'react-activation';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import idfeUtils from 'idfe-utils';
import AxiosRequestProvider from '@/components/AxiosRequestProvider';
import { RouteProvider } from '@/routes';
import stores from '@/stores';

import './locales/index';
import './index.less';

// 打包时间
if (process.env.BUILD_TIME) {
  const buildTime = idfeUtils.date.format(process.env.BUILD_TIME);
  console.log(['process.env.NODE_ENV:', process.env.NODE_ENV, '|', 'buildTime:', buildTime, '|', 'version', process.env.VERSION].join(' '));
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // 这里去掉了严格模式，原因：
  // 一是会产生 关于已弃用的 findDOMNode 的使用的警告。antd@5x Sider使用了findDOMNode
  // 二是react-activation不支持严格模式，建议关闭
  <Provider store={stores}>
    <AxiosRequestProvider>
      {/* 全局设置中文 */}
      <ConfigProvider locale={locale}>
        {/* 缓存范围，需要确保 KeepAlive 被渲染在 AliveScope 内部。 */}
        <AliveScope>
          <RouteProvider />
        </AliveScope>
      </ConfigProvider>
    </AxiosRequestProvider>
  </Provider>
);
