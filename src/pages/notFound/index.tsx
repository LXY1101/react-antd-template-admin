import { Result } from 'antd';
import styles from './index.module.less';

const Index = () => {
  return (
    <div className={styles.wrap}>
      <Result status="404" title="404" subTitle="抱歉，您访问的的页面迷路了~" />
    </div>
  );
};

export default Index;
