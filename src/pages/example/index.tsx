import { Button } from 'antd';

import { useRequest } from '@/hooks';
import API from '@/services';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '@/stores/actions/accountAction';

import styles from './index.module.less';
import { DataBox } from '@/components';

const Example = () => {
  // ---------- redux
  const dispatch = useDispatch();
  const accountStore = useSelector((state: any) => state.account);
  // ---------- redux end

  // 调用接口成功
  const { data, run, loading } = useRequest(API.common.config, {
    // true代表不会默认执行，需要通过 run 来触发执行
    manual: true
  });

  // 调用接口失败示例 - toast方式
  const { run: runErrorExample, loading: loadingErrorExample } = useRequest(API.common.errorExample, {
    // true代表不会默认执行，需要通过 run 来触发执行
    manual: true
  });

  // 调用接口失败示例 - toast方式
  const {
    data: dataErrorExampleNoTip,
    run: runErrorExampleNotip,
    loading: loadingErrorExampleNotip,
    error: errorErrorExampleNotip
  } = useRequest(API.common.errorExampleNotip, {
    // true代表不会默认执行，需要通过 run 来触发执行
    manual: true
  });

  const doGetData = () => {
    run();
  };

  // 调用dispatch(action)，更新用户信息示例
  const update = () => {
    dispatch(
      updateUserInfo({
        username: 'test'
      })
    );
    console.log(accountStore);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>现在这个div，是在750px设计稿下，宽375px X 高375px的红色背景盒子</div>
      <div className={styles.btnWrap}>
        <Button className={styles.button} color="primary" loading={loading} onClick={doGetData}>
          获取接口
        </Button>
        <Button className={styles.button} color="primary" loading={loadingErrorExample} onClick={runErrorExample}>
          获取接口失败例子 - toast方式
        </Button>
      </div>
      <DataBox loading={loading} loadingDelay={0} className={styles.dataShow}>
        {JSON.stringify(data)}
      </DataBox>
      <div className={styles.btnWrap}>
        <Button className={styles.button} color="primary" loading={loadingErrorExampleNotip} onClick={runErrorExampleNotip}>
          获取接口失败例子 - 错误组件方式
        </Button>
      </div>
      <div className={styles.btnWrap}>
        <Button className={styles.button} color="primary" onClick={update}>
          更新store示例 - 用户信息
        </Button>
      </div>
      <DataBox
        loading={loadingErrorExampleNotip}
        error={errorErrorExampleNotip}
        errorTitle="出错了"
        errorRetry={runErrorExampleNotip}
        className={styles.dataShow}
      >
        {JSON.stringify(dataErrorExampleNoTip)}
      </DataBox>
    </div>
  );
};

export default Example;
