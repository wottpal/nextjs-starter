import { getRequestConfig } from 'next-intl/server'
import { locale } from './config/locales'

export default getRequestConfig(async () => {
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
