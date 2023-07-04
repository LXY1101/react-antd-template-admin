import { lazy, Suspense } from 'react';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { KeepAlive } from 'react-activation';
import { RootStateOrAny, useSelector } from 'react-redux';
import { MainLayout } from '@/components';
import { themeDark, themeLight } from '@/components/MainLayout/config';

// webpackChunkName是用于在webpack打包后，给组件的分割代码命名
const Example = lazy(() => import(/* webpackChunkName: "Example" */ '@/pages/example'));
const SpuManage = lazy(() => import(/* webpackChunkName: "SpuManage" */ '@/pages/spuManage'));
const SkuManage = lazy(() => import(/* webpackChunkName: "SkuManage" */ '@/pages/skuManage'));
const TransactionOrder = lazy(() => import(/* webpackChunkName: "TransactionOrder" */ '@/pages/transactionOrder'));
const SaleOrder = lazy(() => import(/* webpackChunkName: "SaleOrder" */ '@/pages/saleOrder'));
const PurchaseOrder = lazy(() => import(/* webpackChunkName: "PurchaseOrder" */ '@/pages/purchaseOrder'));
const UserInfo = lazy(() => import(/* webpackChunkName: "UserInfo" */ '@/pages/userInfo'));
const AccountChange = lazy(() => import(/* webpackChunkName: "AccountChange" */ '@/pages/accountChange'));
const Login = lazy(() => import(/* webpackChunkName: "Login" */ '@/pages/login'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ '@/pages/notFound'));
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ '@/pages/dashboard'));
const EditMail = lazy(() => import(/* webpackChunkName: "EditMail" */ '@/pages/editMail'));
const AddMail = lazy(() => import(/* webpackChunkName: "AddMail" */ '@/pages/addMail'));
const BannerConfig = lazy(() => import(/* webpackChunkName: "BannerConfig" */ '@/pages/bannerConfig'));
const BusinessParameter = lazy(() => import(/* webpackChunkName: "BusinessParameter" */ '@/pages/businessParameter'));
const MailConfig = lazy(() => import(/* webpackChunkName: "MailConfig" */ '@/pages/mailConfig'));
const WorkOrder = lazy(() => import(/* webpackChunkName: "WorkOrder" */ '@/pages/workOrder'));
const RecommendedContent = lazy(() => import(/* webpackChunkName: "RecommendedContent" */ '@/pages/recommendedContent'));

// 如果对整个页面使用懒加载的话，切换路由时会出现闪屏的问题，
// 所以只对组件进行Suspense异步加载，
// MainLayout无需懒加载
const lazyLoad = (children: any) => {
  return <Suspense fallback={<Spin />}>{children}</Suspense>;
};

// 需要缓存的路由
const KeepAliveRoute = ({ path, element }: any) => {
  return (
    <Route
      path={path}
      element={
        // 开发的时候可以先关掉缓存，这样页面能实时刷新
        process.env.NODE_ENV === 'development' ? (
          element
        ) : (
          <KeepAlive id={path} name={path}>
            {element}
          </KeepAlive>
        )
      }
    />
  );
};

export const RouteProvider = () => {
  const { theme } = useSelector((store: RootStateOrAny) => store.common);

  return (
    <Router basename={process.env.BASENAME}>
      <ConfigProvider theme={theme === 'dark' ? themeDark : themeLight}>
        <Routes>
          <Route path="/example" element={lazyLoad(<Example />)} />
          <Route path="/login" element={lazyLoad(<Login />)} />
          <Route path="*" element={lazyLoad(<NotFound />)} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/" element={<MainLayout />}>
            {KeepAliveRoute({ path: 'dashboard', element: lazyLoad(<Dashboard />) })}
            {KeepAliveRoute({ path: 'spuManage', element: lazyLoad(<SpuManage />) })}
            {KeepAliveRoute({ path: 'skuManage', element: lazyLoad(<SkuManage />) })}
            {KeepAliveRoute({ path: 'transactionOrder', element: lazyLoad(<TransactionOrder />) })}
            {KeepAliveRoute({ path: 'saleOrder', element: lazyLoad(<SaleOrder />) })}
            {KeepAliveRoute({ path: 'purchaseOrder', element: lazyLoad(<PurchaseOrder />) })}
            {KeepAliveRoute({ path: 'userInfo', element: lazyLoad(<UserInfo />) })}
            {KeepAliveRoute({ path: 'accountChange', element: lazyLoad(<AccountChange />) })}
            {KeepAliveRoute({ path: 'editMail', element: lazyLoad(<EditMail />) })}
            {KeepAliveRoute({ path: 'addMail', element: lazyLoad(<AddMail />) })}
            {KeepAliveRoute({ path: 'bannerConfig', element: lazyLoad(<BannerConfig />) })}
            {KeepAliveRoute({ path: 'businessParameter', element: lazyLoad(<BusinessParameter />) })}
            {KeepAliveRoute({ path: 'mailConfig', element: lazyLoad(<MailConfig />) })}
            {KeepAliveRoute({ path: 'workOrder', element: lazyLoad(<WorkOrder />) })}
            {KeepAliveRoute({ path: 'recommendedContent', element: lazyLoad(<RecommendedContent />) })}
          </Route>
        </Routes>
      </ConfigProvider>
    </Router>
  );
};
