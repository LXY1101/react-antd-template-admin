import { Button } from 'antd';

import styles from './index.module.less';

export const Error = (props: any) => {
  const {
    // 是否打开
    open = false,
    title = '系统异常，请稍后再试',
    // 是否绝对定位居中
    absolute = false,
    // 重试方法
    retry = () => null
  } = props;

  return (
    <div className={[styles.wrap, open ? styles.show : '', absolute ? styles.absolute : ''].join(' ')}>
      <div className={['u-icon-error', styles.icon].join(' ')} />
      <div className={styles.title}>{title}</div>
      <div className={styles.btnWrap}>
        <Button className={styles.btn} onClick={retry}>
          刷新
        </Button>
      </div>
    </div>
  );
};
