import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';
import { status } from './config';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Index = () => {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
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

  // 表格选择功能的配置
  const rowSelection: any = {
    type: 'checkbox',
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    }
  };
  // 表格列的配置描述
  const columns: ColumnsType<any> = [
    {
      title: 'SPU_名称',
      dataIndex: 'username',
      fixed: 'left'
    },
    {
      title: 'SPU_id',
      dataIndex: 'mobile'
    },
    {
      title: '发起昵称',
      dataIndex: 'a'
    },
    {
      title: '发起人ID',
      dataIndex: 'b'
    },
    {
      title: '求购金额',
      dataIndex: 'c'
    },
    {
      title: '求购数量',
      dataIndex: 'd'
    },
    {
      title: '求购时间',
      dataIndex: 'f'
    },
    {
      title: '求购状态',
      dataIndex: 'g',
      fixed: 'right'
    }
  ];

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="SPU名称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="SPU_ID" name="mobile">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="发起人昵称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="发起人ID" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="发起时间" name="time">
          <RangePicker />
        </Form.Item>
        <Form.Item label="求购状态" name="status">
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

      <Table
        rowSelection={{
          ...rowSelection
        }}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={tableParams.pagination}
        bordered
      />
    </div>
  );
};

export default Index;
