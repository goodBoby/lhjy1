import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Simple translations for initial load
const resources = {
  en: {
    translation: {
      common: {
        app_name: 'ChinaMediGuide',
        loading: 'Loading...',
      },
      home: {
        hero_title: 'Your Health, Our Priority',
        hero_subtitle: 'Access quality healthcare in China with ease',
      },
    },
  },
  zh: {
    translation: {
      common: {
        app_name: 'ChinaMediGuide',
        loading: '加载中...',
      },
      home: {
        hero_title: '您的健康，我们的首要任务',
        hero_subtitle: '轻松在中国获得优质医疗服务',
      },
    },
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh', 'ja', 'ko'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
