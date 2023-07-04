import { LOCAL_LANGUAGE } from '@/consts';

const localeConfig = {
  defaultLocale: window.localStorage.getItem(LOCAL_LANGUAGE) || 'zhCN',
  itemsLanguage: [
    {
      key: 'zhCN',
      label: '简体中文'
    },
    {
      key: 'en',
      label: 'English'
    }
  ]
};

export default localeConfig;
