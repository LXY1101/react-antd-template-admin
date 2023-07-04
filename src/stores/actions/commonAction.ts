import { browser } from 'idfe-utils';
import { CommonStateTypes } from '@/stores/reducers/commonReducer';
import { LOCAL_LANGUAGE, LOCAL_THEME } from '@/consts';

const { setItem } = browser.localStorage;

// 更新国际化
export const updateLocale = (locale: CommonStateTypes['locale']) => {
  // 存储国际化到本地
  setItem(LOCAL_LANGUAGE, locale);
  return {
    type: 'updateLocale',
    locale
  };
};

// 更新主题
export const updateTheme = (theme: CommonStateTypes['theme']) => {
  // 存储主题到本地
  setItem(LOCAL_THEME, theme);
  return {
    type: 'updateTheme',
    theme
  };
};
