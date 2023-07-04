import { LOCAL_THEME } from '@/consts';

const base = {
  // 后台名称
  siteName: 'baseName',
  // 默认主题
  defaultTheme: window.localStorage.getItem(LOCAL_THEME) || 'light'
};
export { base };
