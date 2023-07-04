import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';

const Index = () => {
  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  // 请求列表
  const { data, run, loading } = useRequest(API.common.config, {
    manual: true
  });

  useEffect(() => {
    run({ ...tableParams });
  }, [JSON.stringify(tableParams)]);

  // 表格列的配置描述
  const columns = [
    {
      title: '序号',
      dataIndex: 'a',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: 'Banner图',
      dataIndex: 'b'
    },
    {
      title: '跳转链接',
      dataIndex: 'c'
    },
    {
      title: '配置时间',
      dataIndex: 'd'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <span className="u-link mr-small" onClick={() => {}}>
            编辑
          </span>
          <span className="u-link mr-small">删除</span>
          <span className="u-link mr-small">上移</span>
          <span className="u-link mr-small">下移</span>
        </div>
      )
    }
  ];

  return (
    <div className={styles.wrap}>
      <div className="m-more-action">
        <Button className="s-btn-unloading" type="primary">
          新建
        </Button>
      </div>

      <Table rowKey="id" columns={columns} dataSource={dataSource} loading={loading} pagination={tableParams.pagination} bordered />
    </div>
  );
};

export default Index;
