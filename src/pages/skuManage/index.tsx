import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';

const { Option } = Select;

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

  // 表格列的配置描述
  const columns: ColumnsType<any> = [
    {
      title: 'sku_id',
      dataIndex: 'username',
      fixed: 'left'
    },
    {
      title: 'sku_名称',
      dataIndex: 'mobile',
      fixed: 'left'
    },
    {
      title: '持有人',
      dataIndex: 'a',
      fixed: 'left'
    },
    {
      title: '类型',
      dataIndex: 'b'
    },
    {
      title: '品质',
      dataIndex: 'c'
    },
    {
      title: '分类',
      dataIndex: 'd'
    },
    {
      title: '颜色',
      dataIndex: 'e'
    },
    {
      title: '印花',
      dataIndex: 'ee'
    },
    {
      title: '皮肤颜色',
      dataIndex: 'cw'
    },
    {
      title: '图案模板',
      dataIndex: 'cew'
    },
    {
      title: '名称标签',
      dataIndex: 'cwew'
    }
  ];

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="sku_ID" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="sku名称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="类型" name="status">
          <Select placeholder="请选择" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="品质" name="status">
          <Select placeholder="请选择" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="分类" name="status">
          <Select placeholder="请选择" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="颜色" name="status">
          <Select placeholder="请选择" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="价格区间" name="username">
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-16 s-btn-unloading">
            查询
          </Button>
          <Button className="s-btn-unloading" type="default" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>

      <Table rowKey="id" columns={columns} dataSource={dataSource} loading={loading} pagination={tableParams.pagination} bordered />
    </div>
  );
};

export default Index;
