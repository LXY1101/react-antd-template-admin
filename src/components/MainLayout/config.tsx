import { LineChartOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Translation } from 'react-i18next';
import { getMenuItem } from '@/utils';
import { theme } from 'antd';
import { IRouter, MenuItem } from './types';

// 菜单翻译
const renderTranslation = (val: any) => {
  return <Translation ns={['common']}>{(t) => <p>{t(val)}</p>}</Translation>;
};

// 路由key和菜单key
const routerKeyMap: IRouter = {
  dashboard: 'dashboard',
  userInfo: 'userInfo',
  accountChange: 'accountChange',
  transactionOrder: 'transactionOrder',
  saleOrder: 'saleOrder',
  purchaseOrder: 'purchaseOrder',
  spuManage: 'spuManage',
  skuManage: 'skuManage',
  bannerConfig: 'bannerConfig',
  businessParameter: 'businessParameter',
  mailConfig: 'mailConfig',
  editMail: 'editMail',
  addMail: 'addMail',
  workOrder: 'workOrder',
  recommendedContent: 'recommendedContent'
};

// 路由字典
// 格式：url: key，
// 其中，key和左侧菜单的key一一对应，必须相同。即：Menu组件的selectedKeys和Tabs组件的activeKey，因为它们都绑定了同一个属性activeKey
const routerMap: IRouter = {
  // ------------首页相关------------
  '/dashboard': routerKeyMap.dashboard,

  // ------------用户管理相关------------
  '/userInfo': routerKeyMap.userInfo,
  '/accountChange': routerKeyMap.accountChange,

  // ------------订单管理相关------------
  '/transactionOrder': routerKeyMap.transactionOrder,
  '/saleOrder': routerKeyMap.saleOrder,
  '/purchaseOrder': routerKeyMap.purchaseOrder,

  // ------------商品管理相关------------
  '/spuManage': routerKeyMap.spuManage,
  '/skuManage': routerKeyMap.skuManage,

  // ------------运营管理相关------------
  '/bannerConfig': routerKeyMap.bannerConfig,
  '/businessParameter': routerKeyMap.businessParameter,
  '/mailConfig': routerKeyMap.mailConfig,
  '/editMail': routerKeyMap.editMail,
  '/addMail': routerKeyMap.addMail,
  '/workOrder': routerKeyMap.workOrder,
  '/recommendedContent': routerKeyMap.recommendedContent
};

// 左侧菜单
const menu: MenuItem[] = [
  // getMenuItem返回格式： {label,key,icon,children}
  getMenuItem(renderTranslation('menu.homePage'), routerKeyMap.dashboard, <LineChartOutlined />),
  getMenuItem(renderTranslation('menu.user'), 'point', <AppstoreOutlined />, [
    getMenuItem(renderTranslation('menu.userInfo'), routerKeyMap.userInfo),
    getMenuItem(renderTranslation('menu.accountChanges'), routerKeyMap.accountChange)
  ]),
  getMenuItem(renderTranslation('menu.order'), 'order', <AppstoreOutlined />, [
    getMenuItem(renderTranslation('menu.transactionOrder'), routerKeyMap.transactionOrder),
    getMenuItem(renderTranslation('menu.salesOrder'), routerKeyMap.saleOrder),
    getMenuItem(renderTranslation('menu.purchaseOrder'), routerKeyMap.purchaseOrder)
  ]),
  getMenuItem(renderTranslation('menu.commodity'), 'goods', <AppstoreOutlined />, [
    getMenuItem(renderTranslation('menu.SPU'), routerKeyMap.spuManage),
    getMenuItem(renderTranslation('menu.sku'), routerKeyMap.skuManage)
  ]),
  getMenuItem(renderTranslation('menu.operation'), 'operation', <AppstoreOutlined />, [
    getMenuItem(renderTranslation('menu.banner'), routerKeyMap.bannerConfig),
    getMenuItem(renderTranslation('menu.businessConfig'), routerKeyMap.businessParameter),
    getMenuItem(renderTranslation('menu.mailConfig'), routerKeyMap.mailConfig),
    getMenuItem(renderTranslation('menu.editMail'), routerKeyMap.editMail, null, null, 'hideMenu'),
    getMenuItem(renderTranslation('menu.addMail'), routerKeyMap.addMail, null, null, 'hideMenu'),
    getMenuItem(renderTranslation('menu.workOrder'), routerKeyMap.workOrder),
    getMenuItem(renderTranslation('menu.recommended'), routerKeyMap.recommendedContent)
  ])
];

// 暗黑主题
const themeDark = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#c9a86b'
  }
};

// 默认主题
const themeLight = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#3B50DF',
    colorBgLayout: '#ffffff'
  }
};

export { menu, routerMap, themeDark, themeLight, routerKeyMap };
