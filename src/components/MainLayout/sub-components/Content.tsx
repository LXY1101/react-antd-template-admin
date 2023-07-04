import { Layout, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAliveController } from 'react-activation';

import styles from '../index.module.less';

const Content = (props: any) => {
  const { dropScope } = useAliveController();
  const navigate = useNavigate();
  const { items, activeKey, setActiveKey, setItems } = props;

  // 点击tab页签触发，跳转指定路由
  const onChange = (key: any) => {
    const item = items.filter((item: any) => item.key === key)?.[0];
    setActiveKey(key);
    navigate(item?.route || '/');
  };

  // 移除tab页签 ------------- start
  const onEdit = (targetKey: any, action: any) => {
    if (action === 'remove') {
      remove(targetKey);
    }
  };

  const remove = (targetKey: any) => {
    let targetIndex = items.findIndex((item: any) => item.key === targetKey);
    let newItems = items.filter((item: any) => item.key !== targetKey);
    let targetItem = items.filter((item: any) => item.key === targetKey)?.[0];

    if (newItems.length && targetKey === activeKey) {
      let { key } = newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex];
      targetItem = newItems.filter((item: any) => item.key === key)?.[0];
      setActiveKey(key);
      navigate(targetItem?.route || '/');
    } else if (newItems.length < 1) {
      setActiveKey('');
    }
    setItems(newItems);

    // 按 name 卸载缓存状态下的 <KeepAlive> 节点
    // <KeepAlive>封装在routes/index.js文件里
    dropScope(targetKey);
  };
  // 移除tab页签 ------------- end

  return (
    <Layout.Content className={styles.content}>
      <Tabs items={items} activeKey={activeKey} onChange={onChange} type="editable-card" onEdit={onEdit} hideAdd />
    </Layout.Content>
  );
};

export default Content;
