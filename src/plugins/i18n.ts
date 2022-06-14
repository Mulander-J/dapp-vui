import { createI18n } from 'vue-i18n'
import en from '@/locales/en/messages.json'
import zhCN from '@/locales/zh_cn/messages.json'

// const messageImports = import.meta.glob('../locales/*.json')
// console.log(messageImports)

export const SUPPORT_LOCALES = ['en-US', 'zh-CN']

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en-US',
  fallbackLocale: 'zh-CN',
  messages: {
    'en-US': en,
    'zh-CN': zhCN,
  },
})

export default i18n
