import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';

const Index = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const dataKeys = {
    a: '交易手续费（%）',
    b: '违规罚款手续费（%）',
    c: '上架商品上限（Steam价x%）',
    d: '上架商品下限（Steam价x%）',
    f: '求购商品上限（Steam价x%）',
    g: '求购商品下限（Steam价x%）'
  };

  useEffect(() => {}, []);

  // 请求列表
  const { data, run, loading } = useRequest(API.common.config, {
    manual: true
  });

  useEffect(() => {
    run({ ...tableParams });
  }, [JSON.stringify(tableParams)]);

  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        <div className={styles.columns}>
          <div className={styles.col}>配置名称</div>
          <div className={styles.col}>配置参数</div>
        </div>
        {Object.values(dataKeys).map((item, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>{item}</div>
            <div className={styles.col}>
              <Input></Input>
            </div>
          </div>
        ))}

        <div className={styles.row}></div>
        <div className={styles.row}></div>
        <div className={styles.row}></div>
        <div className={styles.row}></div>
      </div>
    </div>
  );
};

export default Index;
