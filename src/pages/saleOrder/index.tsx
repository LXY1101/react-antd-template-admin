import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import { status } from './config';
import API from '@/services';

const { Option } = Select;
const { RangePicker } = DatePicker;

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
      title: 'sku_名称',
      dataIndex: 'username',
      fixed: 'left'
    },
    {
      title: 'sku_id',
      dataIndex: 'mobile'
    },
    {
      title: '持有人昵称',
      dataIndex: 'a'
    },
    {
      title: '持有人ID',
      dataIndex: 'b'
    },
    {
      title: '挂单金额',
      dataIndex: 'c'
    },
    {
      title: '挂单时间',
      dataIndex: 'd'
    },
    {
      title: '挂单状态',
      dataIndex: 'd',
      fixed: 'right'
    }
  ];

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="sku名称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="sku_ID" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="持有人昵称" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="持有人ID" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="挂单时间" name="time">
          <RangePicker />
        </Form.Item>
        <Form.Item label="订单状态" name="status">
          <Select placeholder="请选择" allowClear>
            {status.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
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
