import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { RootStateOrAny, useSelector } from 'react-redux';
import { unique } from '@/utils';
import { menu, routerMap } from './config';
import { ITabsProps, MenuItem } from './types';
import Sider from './sub-components/Sider';
import Header from './sub-components/Header';
import Content from './sub-components/Content';
import styles from './index.module.less';

export const MainLayout = () => {
  const location = useLocation();

  const { theme } = useSelector((store: RootStateOrAny) => store.common);

  const [collapsed, setCollapsed] = useState(false); // 侧边栏当前收起状态
  const [openKeys, setOpenKeys] = useState<string[]>([]); // Menu展开的 SubMenu 菜单项
  const [activeKey, setActiveKey] = useState(); // Menu和Tabs活跃的项
  const [items, setItems] = useState<ITabsProps[]>([
    // Tabs选项卡数组
    // {
    //   route: '/dashboard',
    //   label: 'menu.homePage',
    //   key: 'dashboard',
    //   closable: false,
    //   children: (
    //     <div className={styles.main}>
    //       {/* 路由出口 - 显示在TabItemType的children */}
    //       <Outlet />
    //     </div>
    //   )
    // }
  ]);

  useEffect(() => {
    initItems();
  }, [location.pathname]);

  // 根据路由指定左侧菜单和tabs页签
  const initItems = () => {
    let label = '';
    let key = routerMap[location.pathname];

    const getLabel = (_menu: MenuItem[], _openKeys: string[]) => {
      if (Array.isArray(_menu)) {
        _menu?.forEach((item: any) => {
          if (item.key === key) {
            label = item.label;
            addItem({ label, key, route: location.pathname });
            setOpenKeys(unique(openKeys.concat(_openKeys)));
          }
          if (label === '' && item.children && item.children.length) {
            getLabel(item.children, item.key);
          }
        });
      }
    };
    getLabel(menu, openKeys);
  };

  // 左侧菜单收起/开启状态
  const onCollapseChange = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  // 添加tab页签
  const addItem = ({ label, key, route }: any) => {
    let _items: ITabsProps[] = items.slice();

    // 如果标签页不存在就添加一个
    if (!_items.find((i) => i.key === key)) {
      _items.push({
        route,
        label,
        key,
        children: (
          <div className={styles.main}>
            {/* 路由出口 - 显示在TabItemType的children */}
            <Outlet />
          </div>
        )
      });
    }
    // 如果标签页已存在，但路由不存在，就改变路由
    // if (_items.find((i) => i.key === key) && !_items.find((i) => i.route === route)) {
    //   try {
    //     let index = _items.findIndex((i) => i.key === key);
    //     _items[index].route = route;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    setItems(_items);
    setActiveKey(key);
  };

  const siderProps = {
    theme,
    collapsed,
    activeKey,
    openKeys,
    setOpenKeys
  };

  const headerProps = {
    collapsed,
    onCollapseChange,
    theme
  };

  const contentProps = {
    items,
    activeKey,
    setActiveKey,
    setItems
  };

  return (
    <Layout className={styles.wrap}>
      <Sider {...siderProps} />
      <Layout className="site-layout">
        <Header {...headerProps} />
        <Content {...contentProps} />
      </Layout>
    </Layout>
  );
};
