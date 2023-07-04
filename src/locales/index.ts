import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import CONFIG from './config';

i18n
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: CONFIG.defaultLocale,
    // 预设语言
    lng: CONFIG.defaultLocale,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json'
        }
      ]
    }
  });

export default i18n;
