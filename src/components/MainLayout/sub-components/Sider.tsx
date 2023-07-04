import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { menu } from '../config';

import styles from '../index.module.less';

const Sider = (props: any) => {
  const navigate = useNavigate();
  const { theme, collapsed, activeKey, openKeys, setOpenKeys } = props;

  // 点击左侧菜单事件
  const doClick = ({ key }: any) => {
    const route = `/${key}`;
    navigate(route || '/');
  };

  // SubMenu 展开/关闭的回调
  const openChange = (key: string[]) => {
    setOpenKeys(key);
  };

  return (
    <Layout.Sider theme={theme === 'light' ? 'dark' : 'light'} collapsible collapsed={collapsed} trigger={null} className={styles.sider}>
      <Menu
        theme={theme === 'light' ? 'dark' : 'light'}
        selectedKeys={[activeKey]}
        openKeys={openKeys}
        mode="inline"
        items={menu}
        onClick={doClick}
        onOpenChange={openChange}
      />
    </Layout.Sider>
  );
};
export default Sider;
