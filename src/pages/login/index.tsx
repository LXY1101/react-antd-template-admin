import React, { Fragment } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Row, Input, Form, Dropdown } from 'antd';
import { RootStateOrAny, useSelector /* , useDispatch */ } from 'react-redux';

import localeConfig from '@/locales/config';
import { base } from '@/consts/base';
import { useRequest, useChangeLocale } from '@/hooks';
import API from '@/services';

import styles from './index.module.less';

const FormItem = Form.Item;

const Index = () => {
  const { locale } = useSelector((store: RootStateOrAny) => store.common);
  const { updateLocaleRedux } = useChangeLocale();
  const { t } = useTranslation('login');

  const { data, run, loading } = useRequest(API.common.config, {
    manual: true
  });

  const handleOk = (values: any) => {
    run({
      username: values.username,
      password: values.password
    });
  };

  // 切换语言
  const onClickLanguage = ({ key }: any) => {
    updateLocaleRedux(key);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.form}>
        <div className={styles.language}>
          <Dropdown
            menu={{
              items: localeConfig.itemsLanguage,
              activeKey: locale,
              onClick: onClickLanguage
            }}
          >
            <span>
              <span className={styles.languageText}>{localeConfig.itemsLanguage.filter((item) => item.key === locale)[0]?.label}</span>
              <CaretDownOutlined />
            </span>
          </Dropdown>
        </div>
        <div className={styles.content}>
          <div className={styles.logo}>
            <span>{t(base.siteName)}</span>
          </div>
          <Form onFinish={handleOk}>
            <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
            >
              <Input placeholder={t('login.username') || ''} />
            </FormItem>
            <FormItem
              name="password"
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
            >
              <Input.Password placeholder={t('login.password') || ''} />
            </FormItem>
            <Row>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t('btn.login')}
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;
