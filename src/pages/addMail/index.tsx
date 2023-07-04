import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, message, Upload, Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './index.module.less';
import { useRequest } from '@/hooks';
import API from '@/services';

const { Option } = Select;

// 获取图片的Base64地址
const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

// 图片上传前执行
const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Index = (props: any) => {
  const [form] = Form.useForm();

  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [radioStatus, setRadioStatus] = useState(1);

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

  // 图片更改时触发
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url: any) => {
        setUploadLoading(false);
        setImageUrl(url);
      });
    }
  };

  // 上传按钮样式
  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className="u-title">创建商品</div>

      <Form onFinish={onFinish} form={form} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
        <Form.Item label="商品名称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="商品图片">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={[]}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%'
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="描述图片" name="mobile">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%'
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="积分类型" name="status">
          <Radio.Group value={radioStatus}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="兑换价格" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="发行方名称" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="发行方头像" name="mobile">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%'
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="发行份数" name="username">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="商品类型" name="status">
          <Radio.Group value={radioStatus}>
            <Radio value={1}>藏品</Radio>
            <Radio value={2}>实物</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-16">
            查询
          </Button>
          <Button type="default" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
