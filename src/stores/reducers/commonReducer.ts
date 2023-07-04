// 公用reducer
import localeConfig from '@/locales/config';
import { base } from '@/consts/base';

// 从本地取出默认语言locale、默认主题theme
const locale = localeConfig.defaultLocale;
const theme = base.defaultTheme;

export interface CommonStateTypes {
  theme?: 'light' | 'dark';
  locale?: string;
}

export const initialState = {
  // 主题
  theme,
  // 国际化
  locale
};

function common(state = initialState, actions: any) {
  switch (actions.type) {
    // 更新国际化
    case 'updateLocale':
      return {
        ...state,
        locale: actions.locale
      };
    // 更新主题
    case 'updateTheme':
      return {
        ...state,
        theme: actions.theme
      };
    default:
      return state;
  }
}
export default common;
