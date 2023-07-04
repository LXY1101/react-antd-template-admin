import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { updateLocale } from '@/stores/actions/commonAction';
import CONFIG from '@/locales/config';

export interface UseChangeLocaleProps {}

// 语言相关
export const useChangeLocale = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  // 切换语言redux
  const updateLocaleRedux = (targetLocale = CONFIG.defaultLocale) => {
    i18n.changeLanguage(targetLocale);
    dispatch(updateLocale(targetLocale));
  };

  return {
    updateLocaleRedux
  };
};
