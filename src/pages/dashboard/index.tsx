import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

const Index = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.wrap}>
      <Result icon={null} subTitle={t('menu.homePage')} />
    </div>
  );
};

export default Index;
