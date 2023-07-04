import styles from './index.module.less';

export const Loading = (props: any) => {
  const {
    // 是否打开
    open = false,
    // 是否遮罩不让操作
    mask = true,
    title = '正在加载'
  } = props;

  return (
    <div className={[styles.wrap, mask ? styles.mask : '', open ? styles.show : ''].join(' ')}>
      <div className={styles.loadingWrap}>
        <div className={styles.icon} />
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};
