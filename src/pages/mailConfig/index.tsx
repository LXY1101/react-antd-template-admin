import { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';
const { RangePicker } = DatePicker;

const { Option } = Select;

const Index = (props: any) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  useEffect(() => {
    run({ ...tableParams });
  }, [JSON.stringify(tableParams)]);

  // 请求列表
  const { data, run, loading } = useRequest(API.common.config, {
    manual: true
  });

  // 查询
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  // 重置
  const onReset = () => {
    form.resetFields();
  };

  // 表格列的配置描述
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'username'
    },
    {
      title: '商品图片',
      dataIndex: 'mobile'
    },
    {
      title: '创建时间',
      dataIndex: 'a'
    },
    {
      title: '兑换金额',
      dataIndex: 'b'
    },
    {
      title: '兑换/库存',
      dataIndex: 'c'
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <div>
          <span className="u-link mr-small" onClick={() => {}}>
            查看
          </span>
          <span className="u-link mr-small">编辑</span>
        </div>
      )
    }
  ];

  // 点击创建商品触发
  const createGoods = () => {
    navigate('/addMail');
  };

  return (
    <div className={styles.wrap}>
      <Form layout="inline" onFinish={onFinish} form={form}>
        <Form.Item label="标题" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="提交时间" name="time">
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

      <div className="m-more-action">
        <Button className="s-btn-unloading" type="primary" onClick={() => createGoods()}>
          新建
        </Button>
      </div>

      <Table rowKey="id" columns={columns} dataSource={dataSource} loading={loading} pagination={tableParams.pagination} bordered />
    </div>
  );
};

export default Index;
