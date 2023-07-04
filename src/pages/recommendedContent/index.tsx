import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table } from 'antd';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';

const Index = () => {
  const [form] = Form.useForm();

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

  // 查询
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  // 重置
  const onReset = () => {
    form.resetFields();
  };
  // 列表参数改变时触发
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(pagination, sorter);
    setTableParams({
      pagination,
      ...sorter
    });
  };

  // 表格列的配置描述
  const columns = [
    {
      title: '手机号',
      dataIndex: 'mobile',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '姓名',
      dataIndex: 'username'
    },
    {
      title: '积分A',
      sorter: true,
      dataIndex: 'a'
    },
    {
      title: '积分B',
      sorter: true,
      dataIndex: 'b'
    },
    {
      title: '积分C',
      sorter: true,
      dataIndex: 'c'
    },
    {
      title: '积分D',
      sorter: true,
      dataIndex: 'd'
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <span className="u-link mr-small" onClick={() => {}}>
            移除
          </span>
          <span className="u-link mr-small">上移</span>
          <span className="u-link mr-small">下移</span>
          <span className="u-link mr-small">移到最后</span>
        </div>
      )
    }
  ];
  // 表格选择功能的配置
  const rowSelection: any = {
    type: 'checkbox',
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="SPU_ID" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="SPU名称" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item>
          <Button className="mr-16 s-btn-unloading" type="primary" htmlType="submit">
            查询
          </Button>
          <Button className="s-btn-unloading" type="default" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>

      <div className="m-more-action">
        <Button className="s-btn-unloading" type="primary">
          添加
        </Button>
      </div>

      <Table
        rowSelection={{
          ...rowSelection
        }}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        bordered
      />
    </div>
  );
};

export default Index;
