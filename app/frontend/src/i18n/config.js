import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../assets/locales/en.json';
import taTranslation from '../assets/locales/ta.json';
import hiTranslation from '../assets/locales/hi.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ta: {
    translation: taTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
};

const savedLanguage = localStorage.getItem('preferredLanguage');
const initialLanguage = savedLanguage ? savedLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
