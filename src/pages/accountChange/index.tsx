import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, DatePicker, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';
import { type } from './config';

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
      title: '用户id',
      dataIndex: 'mobile',
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
      title: '第三方账户号',
      dataIndex: 'b'
    },
    {
      title: '第三方订单号',
      dataIndex: 'c'
    },
    {
      title: '变动方向',
      dataIndex: 'd',
      render: (text: any) => <span>{text}</span>
    },
    {
      title: '变动金额',
      dataIndex: 'f'
    },
    {
      title: '钱包余额',
      dataIndex: 'g'
    },
    {
      title: '变动时间',
      dataIndex: 'status'
    }
  ];

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="用户ID" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="昵称" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="邮箱" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="三方账户号" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="三方订单号" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="变动方向" name="type">
          <Select placeholder="请选择" allowClear>
            <Option value="male">充值</Option>
            <Option value="other">提现</Option>
            <Option value="other">收入</Option>
            <Option value="other">消费</Option>
            {type.map((item, index) => (
              <Option value={item.value} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="选择日期" name="time">
          <RangePicker />
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
