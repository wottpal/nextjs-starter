import { getRequestConfig } from 'next-intl/server'
import { env } from './config/environment'

export default getRequestConfig(async () => {
  const defaultLocale = 'en'
  const locale = env.SITE_LOCALE || defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
