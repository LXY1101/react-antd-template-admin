import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';
import { type, accountStatus } from './config';

const { Option } = Select;

const Index = () => {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  // ------------------------------------- api请求 ------------------------------------
  // 请求列表
  const { data, run, loading } = useRequest(API.common.config, {
    manual: true
  });

  //  ------------------------------------- useEffect ---------------------------------
  useEffect(() => {
    run({ ...tableParams });
  }, [JSON.stringify(tableParams)]);

  //  ------------------------------------- function  ---------------------------------
  // 查询
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  // 重置
  const onReset = () => {
    form.resetFields();
  };

  // 解封/封禁账号
  const doBanAccount = () => {};

  // 解冻/冻结钱包
  const doFreezeWallet = () => {};

  // 列表参数改变时触发
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    console.log(pagination, sorter);
    setTableParams({
      pagination,
      ...sorter
    });
  };

  // 表格选择功能的配置
  const rowSelection: any = {
    type: 'checkbox',
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    }
  };

  //  ----------------------------- const  ---------------------------
  // 表格列的配置描述
  const columns: ColumnsType<any> = [
    {
      title: '用户ID',
      dataIndex: 'id',
      fixed: 'left'
    },
    {
      title: '昵称',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'a'
    },
    {
      title: 'Steam ID',
      dataIndex: 'b'
    },
    {
      title: '库存数',
      dataIndex: 'c'
    },
    {
      title: '钱包余额',
      dataIndex: 'd'
    },
    {
      title: '钱包状态',
      dataIndex: 'f',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '类型',
      dataIndex: 'g',
      render: (text: any) => <a>{text}</a>
    },
    {
      title: '账号状态',
      dataIndex: 'h',
      render: (text: any) => <a>{text}</a>
    }
  ];

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="姓名" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机号" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Select placeholder="请选择" allowClear>
            {type.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Select placeholder="请选择" allowClear>
            {accountStatus.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
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
        <Button className="s-btn-unloading" onClick={() => doFreezeWallet()}>
          解冻钱包
        </Button>
        <Button className="s-btn-unloading" type="primary" onClick={() => doFreezeWallet()}>
          冻结钱包
        </Button>
        <Button className="s-btn-unloading" onClick={() => doBanAccount()}>
          解除封禁
        </Button>
        <Button className="s-btn-unloading" type="primary" onClick={() => doBanAccount()}>
          封禁账号
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
