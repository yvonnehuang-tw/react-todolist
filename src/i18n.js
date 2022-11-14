import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './assets/i18n/en.json';
import jp from './assets/i18n/ja-JP.json';
import tw from './assets/i18n/zh-TW.json';

const resources = {
  en: {
    translation: en,
  },
  'ja-JP': {
    translation: jp,
  },
  'zh-TW': {
    translation: tw,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;