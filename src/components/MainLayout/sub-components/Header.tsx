// import { useAliveController } from 'react-activation';
import { Layout, Switch, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { RootStateOrAny, useSelector /* , useDispatch */ } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined, GlobalOutlined } from '@ant-design/icons';

// import { updateTheme } from '@/stores/actions/commonAction';
import { useChangeLocale } from '@/hooks';
import localeConfig from '@/locales/config';
import { LOCAL_THEME } from '@/consts';

import darkIcon from '@/assets/images/icon/dark.png';
import lightIcon from '@/assets/images/icon/light.png';
import styles from '../index.module.less';

const Header = (props: any) => {
  // const { clear} = useAliveController();
  // const dispatch = useDispatch();
  const { updateLocaleRedux } = useChangeLocale();
  const { locale } = useSelector((store: RootStateOrAny) => store.common);
  const { userInfo } = useSelector((store: RootStateOrAny) => store.account);
  const { collapsed, onCollapseChange, theme } = props;

  // 头部右侧菜单
  const itemsMenu: MenuProps['items'] = [
    {
      key: '1',
      label: <a>退出登录</a>
    }
  ];

  // 切换主题
  const onChangeTheme = (val: any) => {
    val = val ? 'dark' : 'light';
    window.localStorage.setItem(LOCAL_THEME, val);

    // 清空所有缓存中的 KeepAlive，切换样式
    // clear无法清空当前页面的缓存，包括样式，先用重新加载的方法
    // clear()
    // dispatch(updateTheme(val));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  // 切换语言
  const onClickLanguage = ({ key }: any) => {
    updateLocaleRedux(key);
  };

  // 点击右侧下拉菜单
  const handleClickMenu = ({ key }: any) => {
    // key === 'SignOut' &&
  };

  return (
    <Layout.Header className={styles.header}>
      {/* 菜单展开收起 */}
      <div className={styles.button} onClick={() => onCollapseChange(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightContainer}>
        {/* 主题切换 */}
        <Switch
          checkedChildren={<img style={{ paddingTop: '3.4px' }} src={lightIcon} />}
          unCheckedChildren={<img src={darkIcon} />}
          defaultChecked={theme === 'dark' ? true : false}
          onChange={onChangeTheme}
          className="mr-10"
        />
        {/* 菜单 */}
        <Dropdown
          menu={{
            items: itemsMenu,
            onClick: handleClickMenu
          }}
          placement="bottomRight"
          className={styles.menu}
          arrow
        >
          <span className={styles.activeItem}>hi，{userInfo.username || 'admin'}</span>
        </Dropdown>
        {/* 语言切换 */}
        <Dropdown
          menu={{
            items: localeConfig.itemsLanguage,
            activeKey: locale,
            onClick: onClickLanguage
          }}
          placement="bottomRight"
          className={styles.menu}
          arrow
        >
          <span className={styles.activeItem}>
            <GlobalOutlined />
            {localeConfig.itemsLanguage.filter((item) => item.key === locale)[0]?.label}
          </span>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;
